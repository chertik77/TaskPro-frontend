import { useSelector } from 'react-redux'
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectToken,
  selectUser
} from 'redux/slices/user/user-slice'

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isRefreshing = useSelector(selectIsRefreshing)
  const user = useSelector(selectUser)
  const token = useSelector(selectToken)

  return { isLoggedIn, isRefreshing, user, token }
}
