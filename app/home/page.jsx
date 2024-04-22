"use client"

import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const {name} = useSelector((state)=> state.userReducer.user)
  return (
    <div>
      <p>{name}</p>
    </div>
  )
}

export default Home