import axios from 'axios'

export type FileUpload = {
  key: string
  file: { uri: string; type: string; name: string }
}

export const uploadFiles = async (url: string, files: FileUpload[]) => {
  const formData = new FormData()
  files.forEach((f) => {
    // @ts-ignore
    formData.append(f.key, f.file)
  })
  try {
    const res = await axios({
      url: url,
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  } catch (error: any) {
    console.log(error, Object.keys(error), error.message)
    return {}
  }
}
