import { dashboardApi } from './dashboard'

export const taskApi = dashboardApi.injectEndpoints({
  endpoints: ({ mutation }) => ({
    addNewTask: mutation({
      query: ({ boardName, columnId, body }) => ({
        url: `/dashboard/${boardName}/${columnId}`,
        method: 'POST',
        body
      })
    }),
    editTask: mutation({
      query: ({ boardName, columnId, taskId, body }) => ({
        url: `/dashboard/${boardName}/${columnId}/${taskId}`,
        method: 'PATCH',
        body
      })
    }),
    deleteTask: mutation({
      query: ({ boardName, taskId, columnId }) => ({
        url: `/dashboard/${boardName}/${columnId}/${taskId}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useAddNewTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation
} = taskApi
