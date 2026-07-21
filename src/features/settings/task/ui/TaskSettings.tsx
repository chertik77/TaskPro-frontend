import { Settings, useSettings } from '@/entities/setting'

import { useUpdateTaskSettings } from '../api/useUpdateTaskSettings'
import { SORT_TASK_BY_OPTIONS } from '../config/sort-task-by-options'
import { SelectControl } from './SelectControl'

export const TaskSettings = () => {
  const { data: taskSettings, isPending } = useSettings(select => select.task)

  const { mutate: update } = useUpdateTaskSettings()

  return (
    <Settings
      title='Task'
      isLoading={isPending}>
      <Settings.Item>
        <Settings.Content>
          <Settings.Title>Sort tasks by</Settings.Title>
          <Settings.Description>
            Choose the default order for displaying tasks within columns.
          </Settings.Description>
        </Settings.Content>
        <Settings.Control>
          <SelectControl
            value={taskSettings?.sortTasksBy}
            onChange={v => update({ body: { sortTasksBy: v! } })}
            options={SORT_TASK_BY_OPTIONS}
          />
        </Settings.Control>
      </Settings.Item>
    </Settings>
  )
}
