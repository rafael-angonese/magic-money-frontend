import { useEffect } from 'react'

const useTitle = (title: string): void => {
  useEffect(() => {
    const prevTitle = document.title
    window.document.title = 'App - ' + title
    return () => {
      window.document.title = prevTitle
    }
  })
}

export default useTitle
