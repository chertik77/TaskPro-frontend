import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import ReactHook from 'alova/react'

export const alovaInstance = createAlova({
  statesHook: ReactHook,
  baseURL: import.meta.env.VITE_API_BASE_URL,
  requestAdapter: GlobalFetch(),
  cacheLogger: false,
  responded: {
    onSuccess: async r => {
      if (r.status >= 400) {
        throw new Error(r.statusText)
      }
      const json = await r.json()
      return json
    }
  }
})
