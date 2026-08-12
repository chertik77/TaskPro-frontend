export const parseDeadline = (deadline: Date | string | null | undefined) => {
  if (!deadline) return undefined

  const date = new Date(deadline)

  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
}

export const serializeDeadline = (date: Date) =>
  new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  ).toISOString()
