---
title: "Building a Cursor Follower with Images in React"
status: draft
type: development
publishedAt: 2026-05-30T12:00:00.000Z
timeToRead: 8
author: "Lucas Oliveira"
---

# Building a Cursor Follower with Images in React

I've always loved those portfolio sites where pictures trail behind your cursor. It's one of those small details that makes an interface feel alive. This component does exactly that: as you move your mouse, photos spawn at your cursor position in sequence and fade out over time. The most recently spawned image also keeps following the cursor until the next one appears, adding a subtle elasticity to the effect.

In this tutorial we'll build the whole thing from scratch, including the distance-based spawning logic, the GSAP entrance and follow animations, and the CSS fade-out.

## Prerequisites

- React hooks (`useState`, `useEffect`, `useRef`)
- Basic TypeScript
- CSS Modules / SCSS

**Dependencies:**

- `gsap` ^3.x - for the entrance scale animation and the smooth mouse-following

## Project Structure

```
cursor-follower-pictures/
  CursorFollower.tsx         # Main component and PictureItem sub-component
  CursorFollower.module.scss # Styles and the fadeOut keyframe
  images.ts                  # The list of image sources to cycle through
  useMouseMovement.ts        # Custom hook: emits a new position every N pixels of movement
```

## Step 1: Define the image list

Before any component code, we need to know what images we're working with. We keep this in a separate file so it's easy to swap out without touching the component logic.

```ts
// images.ts
export const FOLLOWER_IMAGES = [
  '/assets/images/unsplash/orange_picture_unsplash.jpg',
  '/assets/images/unsplash/blue_sky.jpg',
  '/assets/images/unsplash/green_sky.jpg',
  // ... more images
];
```

We export a plain array. The component will cycle through it in order using a modulo index, so images always appear in the same sequence rather than randomly.

## Step 2: Track mouse movement with a spawn distance

We don't want a new image on every single `mousemove` event — that would spawn hundreds of pictures per second. Instead, we only emit a new position after the cursor has travelled a minimum distance from the last spawn point. We put this logic in a custom hook.

```ts
// useMouseMovement.ts
export const useMouseMovement = ({ spawnDistance = 80 } = {}) => {
  const [spawnPosition, setSpawnPosition] = useState<{ x: number; y: number } | null>(null);
  const lastSpawnRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const current = { x: e.clientX, y: e.clientY };

      if (!lastSpawnRef.current) {
        lastSpawnRef.current = current;
        return;
      }

      const distance = Math.hypot(
        current.x - lastSpawnRef.current.x,
        current.y - lastSpawnRef.current.y
      );

      if (distance >= spawnDistance) {
        setSpawnPosition({ ...current });
        lastSpawnRef.current = current;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [spawnDistance]);

  return { spawnPosition };
};
```

`lastSpawnRef` stores the last position where a spawn happened. We use a ref here (not state) because we never want updating it to trigger a re-render. `Math.hypot` gives us the straight-line distance between two points cleanly. The first `mousemove` only initialises the ref so we don't get a spawn at position (0,0) before the cursor has moved.

## Step 3: Set up the main component and its data model

Now we build the `CursorFollower` component. The first thing to nail down is the shape of a picture — each one is just a snapshot of position, a timestamp, and which image to show.

```tsx
interface Picture {
  id: number;
  x: number;
  y: number;
  createdAt: number;
  imageSrc: string;
}

const CursorFollower = ({ opacity, lifespan, pictureSize, spawnDistance }: CursorFollowerProps) => {
  const pictureIdRef = useRef(0);
  const imageIndexRef = useRef(0);
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const { spawnPosition } = useMouseMovement({ spawnDistance });
  // ...
};
```

A few things worth calling out: `pictureIdRef` is a monotonically increasing counter — we never reset it, so every picture that ever existed has a unique id. `imageIndexRef` drives the sequential cycling through `FOLLOWER_IMAGES`. `timersRef` is a `Map` that stores each picture's removal timer by id. We keep timers in a ref rather than state so that changing the timer map never causes a re-render.

`activeId` tracks which picture is currently "the newest one" — we'll use this to decide which image keeps following the mouse.

## Step 4: Spawn pictures and schedule their removal

Each time `spawnPosition` emits a new value from our hook, we create a picture and schedule its removal after `lifespan` milliseconds.

```tsx
useEffect(() => {
  if (!spawnPosition) return;

  const id = pictureIdRef.current++;
  setActiveId(id);

  const newPicture: Picture = {
    id,
    x: spawnPosition.x,
    y: spawnPosition.y,
    createdAt: performance.now(),
    imageSrc: FOLLOWER_IMAGES[imageIndexRef.current++ % FOLLOWER_IMAGES.length],
  };

  setPictures((prev) => [...prev, newPicture]);

  const timer = setTimeout(() => {
    setPictures((prev) => prev.filter((p) => p.id !== id));
    timersRef.current.delete(id);
  }, lifespan);

  timersRef.current.set(id, timer);
}, [spawnPosition, lifespan]);
```

Notice that `setActiveId(id)` happens right when a new picture is born. This is what causes the previous active picture to stop following the cursor and the new one to start.

The timer inside `setTimeout` captures `id` in its closure. Even if the component re-renders dozens of times between now and when the timer fires, it will always remove exactly the right picture. This is why we use a separate timer per picture rather than a single cleanup loop.

We also clean up every timer on unmount:

```tsx
useEffect(() => {
  const timers = timersRef.current;
  return () => timers.forEach((t) => clearTimeout(t));
}, []);
```

## Step 5: Build the PictureItem component with GSAP animations

Each picture renders as an `<img>` with two animations: a quick scale-up on mount (entrance) and a smooth follow of the cursor while it's the active picture. We split this into its own component so each image can hold its own ref and run its own effects independently.

```tsx
const PictureItem = ({ picture, pictureSize, opacity, lifespan, isActive }: PictureItemProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Entrance: scale from 90% to 100%
  useEffect(() => {
    if (!imgRef.current) return;
    gsap.fromTo(imgRef.current, { scale: 0.9 }, { scale: 1, duration: 0.05, ease: 'power2.out' });
  }, []);

  // Follow the mouse while this is the active picture
  useEffect(() => {
    if (!isActive || !imgRef.current) return;
    const el = imgRef.current;
    const quickX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power2.out' });
    const quickY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      quickX(e.clientX - picture.x);
      quickY(e.clientY - picture.y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive, picture.x, picture.y]);

  return (
    <img
      ref={imgRef}
      src={picture.imageSrc}
      alt=""
      style={{
        position: 'fixed',
        left: picture.x,
        top: picture.y,
        maxWidth: pictureSize,
        opacity,
        animation: `fadeOut ${lifespan}ms linear forwards`,
        pointerEvents: 'none',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        objectFit: 'cover',
        zIndex: 10,
      }}
    />
  );
};
```

`gsap.quickTo` is the right tool here instead of `gsap.to`. It creates a pre-configured setter that you call with just the new target value on every `mousemove`. This avoids creating a new GSAP tween on every event and is significantly more performant.

The offset `e.clientX - picture.x` is the key part. The image is already placed at `picture.x` via `left` in the inline style. GSAP's `x` property applies a CSS `transform: translateX(...)` on top of that. So when we pass `e.clientX - picture.x` as the target `x`, GSAP smoothly slides the image so its left edge ends up at the cursor position.

When `isActive` becomes `false` (because a new picture was spawned), the effect cleanup removes the `mousemove` listener and the image freezes in place wherever it was.

## Step 6: Add the CSS fade-out and layout

The fade-out is handled entirely in CSS with a `@keyframes` animation. We keep the image fully visible for the first 80% of its lifespan, then fade it out quickly at the end. This feels much better than a linear fade from the start.

```scss
@keyframes fadeOut {
  0%   { opacity: 1; }
  80%  { opacity: 1; }
  100% { opacity: 0; }
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.headline {
  position: absolute;
  inset: 0;
  font-size: clamp(72px, 13vw, 180px);
  font-weight: 900;
  text-transform: uppercase;
  pointer-events: none;
  z-index: 0;
}
```

The headline sits at `z-index: 0` and the images at `z-index: 10`, so pictures float above the text. Both have `pointer-events: none` so they don't interfere with cursor tracking.

The `animation` string on each image is constructed dynamically using the `lifespan` prop:

```tsx
animation: `fadeOut ${lifespan}ms linear forwards`
```

`forwards` makes sure the image stays hidden (opacity 0) after the animation ends, right until React removes it from the DOM when the timer fires.

## Step 7: Render the picture list

Back in `CursorFollower`, we map over `pictures` and pass the `isActive` flag down.

```tsx
return (
  <div ref={containerRef} className={styles.container}>
    <p className={styles.headline}>
      CURSOR<br />FOLLOWER
    </p>

    {pictures.map((picture) => (
      <PictureItem
        key={picture.id}
        picture={picture}
        pictureSize={pictureSize}
        opacity={opacity}
        lifespan={lifespan}
        isActive={picture.id === activeId}
      />
    ))}
  </div>
);
```

Only one picture at a time will have `isActive={true}` — the one whose id matches `activeId`. The rest receive `false` and their mouse-follow effect is skipped.

## Putting It All Together

The data flow is straightforward:

1. `useMouseMovement` watches `mousemove` globally and emits a new `spawnPosition` only after the cursor travels `spawnDistance` pixels.
2. `CursorFollower` reacts to each new `spawnPosition`, creates a `Picture` object, adds it to state, marks it as `activeId`, and schedules its removal.
3. Each `PictureItem` mounts, runs its GSAP entrance animation once, and — if it's the active one — starts tracking the mouse.
4. When a new picture spawns, the old active one loses its listener and freezes, while the CSS `fadeOut` animation is already counting down.

## Conclusion

We built a cursor follower effect with distance-based spawning, sequential image cycling, a GSAP entrance animation, and a smooth mouse-following behaviour for the most recent picture. The separation between spawn logic (hook), picture state management (CursorFollower), and per-image animation (PictureItem) keeps each piece focused and easy to reason about.

Some directions you could take this further:

- **Random rotation on spawn** — add a small random `rotate` in the GSAP entrance tween to make each picture feel more hand-placed.
- **Velocity-based image size** — measure cursor speed between spawns and scale the image size up when the cursor is moving fast.
- **Touch support** — swap `mousemove` for `touchmove` in `useMouseMovement` and you have a mobile-friendly version.
