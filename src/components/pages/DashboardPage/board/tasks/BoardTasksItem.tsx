import { useModal } from 'react-modal-state'
import { useParams } from 'react-router-dom'
import { useDeleteTaskMutation } from 'redux/api/dashboard/task'
import { Task } from 'redux/slices/board/board-types'

type Priorities = 'Low' | 'Medium' | 'High' | 'Without priority'

const PriorityBorderColorPicker = (priority: Priorities) => {
  switch (priority) {
    case 'Low':
      return 'border-priority-low'
    case 'Medium':
      return 'border-priority-medium'
    case 'High':
      return 'border-brand'
    default:
      return 'border-black/30 dark:border-white/30'
  }
}

const PriorityColorPicker = (priority: Priorities) => {
  switch (priority) {
    case 'Low':
      return 'bg-priority-low'
    case 'Medium':
      return 'bg-priority-medium'
    case 'High':
      return 'bg-brand'
    default:
      return 'bg-black/30 dark:bg-white/30'
  }
}

export const BoardTasksItem = ({ task }: { task: Task }) => {
  const { name } = useParams()
  const [deleteTask] = useDeleteTaskMutation()
  const { open } = useModal('edit-card-modal')

  return (
    <div
      className={`mb-[8px] h-[154px] w-[334px] rounded-[8px] border-l-[4px] ${PriorityBorderColorPicker(task.priority)} bg-white py-[14px] pl-[24px] pr-[20px] dark:bg-black`}>
      <p className='pb-[8px] text-fs-14-lh-normal-fw-600 dark:text-white'>
        {task.title}
      </p>
      <p className='mb-[14px] line-clamp-2 min-h-[38px] text-fs-12-lh-normal-fw-400 text-black/70 dark:text-white/50'>
        {task.description}
      </p>
      <div className='flex items-end border-t-[1px] border-black/10 pt-[14px] dark:border-white/10'>
        <div className='pr-[14px]'>
          <p className='pb-[4px] text-fs-8-lh-normal-fw-400 text-black/50 dark:text-white/50'>
            Priority
          </p>
          <div className='flex items-center gap-[4px]'>
            <div
              className={`size-[12px]  rounded-[50%] ${PriorityColorPicker(task.priority)}`}></div>
            <p className='text-fs-10-lh-normal-fw-400'>{task.priority}</p>
          </div>
        </div>
        <div>
          <p className='pb-[4px] text-fs-8-lh-normal-fw-400 text-black/50 dark:text-white/50'>
            Deadline
          </p>
          <p className='text-fs-10-lh-normal-fw-400'>{task.deadline}</p>
        </div>
        <div className='ml-auto flex gap-[8px]'>
          <svg className='size-[19px] stroke-brand pr-[4px]'>
            <use xlinkHref='/assets/icons.svg#icon-bell'></use>
          </svg>
          <button>
            <svg className='size-[16px] stroke-black/50 transition duration-300 ease-in-out hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
              <use xlinkHref='/assets/icons.svg#icon-arrow-btn'></use>
            </svg>
          </button>
          <button
            onClick={() => {
              open()
              localStorage.setItem(
                'ids',
                JSON.stringify({ columnId: task.column, taskId: task._id })
              )
            }}>
            <svg className='size-[16px] stroke-black/50 transition duration-300 ease-in-out hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
              <use xlinkHref='/assets/icons.svg#icon-pencil-btn'></use>
            </svg>
          </button>
          <button
            onClick={() =>
              deleteTask({
                boardName: name,
                columnId: task.column,
                taskId: task._id
              })
            }>
            <svg className='size-[16px] stroke-black/50 transition duration-300 ease-in-out hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
              <use xlinkHref='/assets/icons.svg#icon-trash-btn'></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
