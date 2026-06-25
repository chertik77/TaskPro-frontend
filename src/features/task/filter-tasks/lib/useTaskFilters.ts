import { useNavigate, useSearch } from '@tanstack/react-router'

type ParamKey = 'priority' | 'deadline' | 'search'

export const useTaskFilters = () => {
  const { priority, deadline, search } = useSearch({
    from: '/dashboard/$boardId'
  })

  const navigate = useNavigate({ from: '/dashboard/$boardId' })

  const handleParamsChange = (key: ParamKey, v: string) => {
    navigate({ search: prev => ({ ...prev, [key]: v }) })
  }

  return { priority, deadline, search, handleParamsChange }
}
