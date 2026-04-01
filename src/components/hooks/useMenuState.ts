"use client"

import { useState } from 'react'

/**
 * Hook to manage menu open/close state
 * @param initialState - Initial open state (default: false)
 * @returns Tuple of [isOpen, setIsOpen]
 */
export function useMenuState(initialState: boolean = false): [boolean, (isOpen: boolean) => void] {
  const [isOpen, setIsOpen] = useState(initialState);

  return [isOpen, setIsOpen];
}
