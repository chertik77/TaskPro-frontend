import { useMediaQuery } from '../media/useMediaQuery'

export const useShouldAutoFocus = () =>
  useMediaQuery('(hover: hover) and (pointer: fine)')
