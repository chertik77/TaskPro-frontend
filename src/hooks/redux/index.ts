import type { AppDispatch, RootState } from 'redux/store'

// eslint-disable-next-line no-restricted-imports
import { useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
