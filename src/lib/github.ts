const REPO_BASE =
  "https://github.com/lukaskunn/personal-stuff/tree/master/src/app/project";

export function getProjectGithubUrl(slug: string): string {
  return `${REPO_BASE}/${slug}`;
}
