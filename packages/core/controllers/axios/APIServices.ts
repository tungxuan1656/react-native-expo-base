import axios, { AxiosResponse } from 'axios'

axios.defaults.timeout = 60 * 1000

type Handle = {
  success: boolean
  failed: boolean
}

const handleResponse = (response: AxiosResponse, handle: Handle) => {
  const message = response.data?.message
  if (message) {
    if (response.data?.status) {
      // if (handle.success) GToast.show({ message: message })
    } else {
      // if (handle.failed) GToast.error({ message: message })
    }
  }
}

const handleRequestError = (error: any) => {
  if (error.response && error.response.status === 401) {
  } else {
    console.log(error)
  }
}

const prepareSendRequest = async () => {
  // const token = store.getState().auth?.token ?? ''
  // setAuthorizationToken(token)
  // setAxiosHeader('Accept-Language', I18n.language)
}

export const setAxiosHeader = (key: string, value: string) => {
  axios.defaults.headers.common[key] = value
}
export const setAuthorizationToken = (token: string) => {
  setAxiosHeader('Authorization', 'Bearer '.concat(token))
}
setAxiosHeader('Accept-Encoding', 'gzip')

async function sendRequest(
  method: 'get' | 'post' | 'del' | 'put',
  url: string,
  params: { [k: string]: any } = {},
  config: object = {},
  handle: Handle = { success: false, failed: true },
) {
  Object.keys(params).forEach((key) => params[key] === undefined && delete params[key])
  await prepareSendRequest()
  try {
    const response =
      method === 'get'
        ? await axios.get(url, { params: params, ...config })
        : method === 'post'
          ? await axios.post(url, params, config)
          : method === 'del'
            ? await axios.delete(url, { params: params, ...config })
            : await axios.put(url, params, config)

    if (handle.success || handle.failed) {
      handleResponse(response, handle)
    }
    console.log(method, url, response.status, response.data?.message)
    return response.data
  } catch (error) {
    console.log(method, url, error)
    handleRequestError(error)
    return {}
  }
}
export const post = (url: string, params = {}, isHandle = { success: false, failed: true }) =>
  sendRequest('post', url, params, {}, isHandle)

export const get = (url: string, params = {}, isHandle = { success: false, failed: true }) =>
  sendRequest('get', url, params, {}, isHandle)

export const del = (url: string, params = {}, isHandle = { success: false, failed: true }) =>
  sendRequest('del', url, params, {}, isHandle)
