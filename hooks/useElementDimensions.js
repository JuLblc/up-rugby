import { useState, useEffect } from 'react'

export const useElementDimensions = element => {

  const [elementDimensions, setElementDimensions] = useState({
    elementWidth: undefined,
    elementHeight: undefined
  })

  useEffect(() => {
    function handleResize () {
      if (element) {
        setElementDimensions({
          elementWidth: element.offsetWidth,
          elementHeight: element.offsetHeight
        })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [element]) // Effect is only run on element change

  return elementDimensions
}
