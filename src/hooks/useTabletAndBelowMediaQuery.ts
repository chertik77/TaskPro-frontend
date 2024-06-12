import { useMediaQuery } from 'react-responsive'

export const useTabletAndBelowMediaQuery = () =>
  useMediaQuery({ query: '(max-width: 1439px)' })
