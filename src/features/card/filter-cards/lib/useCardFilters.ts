import { useNavigate, useSearch } from '@tanstack/react-router'

type ParamKey = 'priority' | 'deadline' | 'search'

export const useCardFilters = () => {
  const {
    priority: priorityParam,
    deadline: deadlineParam,
    search: searchParam
  } = useSearch({
    from: '/dashboard/$boardId'
  })

  const navigate = useNavigate({ from: '/dashboard/$boardId' })

  const handleParamsChange = (key: ParamKey, v: string) => {
    navigate({ search: prev => ({ ...prev, [key]: v }) })
  }

  return { priorityParam, deadlineParam, searchParam, handleParamsChange }
}
