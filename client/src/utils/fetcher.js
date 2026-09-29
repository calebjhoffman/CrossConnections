import { emitFlash } from './flashBus'

const API_BASE = import.meta.env.VITE_API_BASE_URL

export async function rawFetch(path, options = {}, token = null, retry = true) {
  const {
    noRefresh,
    showFlash = true,
    ...opts
  } = options

  const url = `${API_BASE}${path}`
  const isForm = opts.body instanceof FormData

  const doRequest = async (authToken) => {
    const headers = {
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(opts.headers || {}),
    }

    if (!isForm && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json'
    }

    return fetch(url, {
      credentials: 'include',
      ...opts,
      headers,
    })
  }

  let res = await doRequest(token)

  if (res.status === 204) {
    return {}
  }

  if (res.status === 401 && retry && !noRefresh) {
    const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })

    if (refreshRes.ok) {
      const refreshData = await refreshRes.json()

      if (refreshData?.accessToken) {
        window.dispatchEvent(
          new CustomEvent('tokenRefreshed', {
            detail: { accessToken: refreshData.accessToken },
          })
        )

        res = await doRequest(refreshData.accessToken)
      }
    }
  }

  const isJson = (res.headers.get('content-type') || '').includes('application/json')
  const data = isJson ? await res.json().catch(() => null) : await res.text()

  if (!res.ok) {
    const msg = isJson
      ? data?.error || data?.message || 'API Error'
      : data || 'API Error'

    if (showFlash !== false) {
      emitFlash({ message: msg, severity: 'error' })
    }

    const error = new Error(msg)
    error.status = res.status
    throw error
  }

  if (showFlash !== false && isJson && data?.flash?.message) {
    emitFlash(data.flash)
  }

  return data
}