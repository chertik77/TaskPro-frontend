import { useSettings } from '@/entities/setting/@x/task'

export const useCardDensity = () => {
  const { data } = useSettings(state => state.task.cardDensity)

  return data ?? 'comfortable'
}
