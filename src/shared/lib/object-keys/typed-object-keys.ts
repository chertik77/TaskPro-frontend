export const objectKeys = <Obj extends Record<string, unknown>>(
  obj: Obj
): (keyof Obj)[] => Object.values(obj) as (keyof Obj)[]
