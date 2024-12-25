export const findIndexById = <T extends { id: string }>(
  array: T[],
  id: string
) => array.findIndex(item => item.id === id)
