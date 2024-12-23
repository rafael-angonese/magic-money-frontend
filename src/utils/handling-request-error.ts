import axios, { AxiosError } from 'axios'
// import { toast } from 'react-toastify'

// const DEFAULT_REQUEST_ERROR_MESSAGE =
//   'Não foi possível comunicar com o servidor.'

// const DEFAULT_INTERNAL_ERROR_MESSAGE =
//   'Ocorreu um erro interno em nossos servidores, por favor tente novamente!'

const handlingRequestError = (
  error: AxiosError | Error | unknown,
  // labels?: Record<string, string>,
) => {
  // Error 😨 🚀

  if (axios.isAxiosError(error)) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { data, status } = error.response

      console.log('Error data:', data)
      return { data, status }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // toast.error(DEFAULT_REQUEST_ERROR_MESSAGE)
    } else if (axios.isCancel(error)) {
      // console.log('Request cancelled...')
    } else {
      // Something happened in setting up the request that triggered an Error
      // toast.error(DEFAULT_REQUEST_ERROR_MESSAGE)
    }
  } else {
    // toast.error(DEFAULT_REQUEST_ERROR_MESSAGE)
  }
}

export default handlingRequestError
