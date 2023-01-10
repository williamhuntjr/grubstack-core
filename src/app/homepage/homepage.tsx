import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Homepage: FC = () => {
  let navigate = useNavigate()
  let redirectTo:string|null = null
  
  const init = (): void => {
    if (redirectTo != null) {
      navigate(redirectTo)
    }
  }

  useEffect(() => {
    init()
    // eslint-disable-next-line
  },[])
  
  return (
    <></>
  )
}