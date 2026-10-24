import type { Ref, RefCallback } from 'react'

export const mergeRefs =
  <T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> =>
  node => {
    const cleanups = refs.map(ref => {
      if (typeof ref === 'function') return ref(node)

      if (ref) ref.current = node
    })

    return () => {
      refs.forEach((ref, index) => {
        const cleanup = cleanups[index]

        if (typeof cleanup === 'function') cleanup()
        else if (typeof ref === 'function') ref(null)
        else if (ref) ref.current = null
      })
    }
  }
