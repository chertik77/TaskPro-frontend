import { useLoaderDeps, useNavigate } from '@tanstack/react-router'

type ParamKey = 'priority' | 'deadline'

export const useCardFilters = () => {
  const { priority: priorityParam, deadline: deadlineParam } = useLoaderDeps({
    from: '/(workspace)/dashboard/$boardId'
  })

  const navigate = useNavigate({ from: '/dashboard/$boardId' })

  const handleParamsChange = (key: ParamKey, v: string) => {
    navigate({ search: prev => ({ ...prev, [key]: v }) })
  }

  return { priorityParam, deadlineParam, handleParamsChange }
}
