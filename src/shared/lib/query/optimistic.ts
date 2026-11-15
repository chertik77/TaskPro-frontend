import type {
  InferDataFromTag,
  QueryClient,
  QueryKey
} from '@tanstack/react-query'

export const setOptimisticData = async <
  TTaggedQueryKey extends QueryKey,
  TData = InferDataFromTag<unknown, TTaggedQueryKey>
>(
  queryClient: QueryClient,
  queryKey: TTaggedQueryKey,
  updater: (data: TData) => TData
) => {
  await queryClient.cancelQueries({ queryKey })

  const previous = queryClient.getQueryData<TData>(queryKey)

  queryClient.setQueryData<TData>(queryKey, data =>
    data === undefined ? data : updater(data)
  )

  return {
    rollback: () => queryClient.setQueryData<TData>(queryKey, previous)
  }
}
