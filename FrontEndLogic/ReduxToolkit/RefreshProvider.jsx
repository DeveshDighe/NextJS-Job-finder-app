'use client'

import {Provider, useDispatch} from 'react-redux'
import { store } from './store/store'
import { MyContext } from '../Context/AuthContext'
import { api } from '../Configer/config'
import { addJobs } from './reducers/JobsReducer'
import { useContext, useEffect } from 'react'



const RefreshProvider = () => {
  const {dispatch} = useContext(MyContext)
  const dispatchR = useDispatch()

  const getJobs =async () =>{
    try {
      const response = await api.get('admin/get-job')
      dispatchR(addJobs(response.data.allJobs))
    } catch (error) {
      
    }
  }

  const getUser =async () => {
    try {
      const response = await api.get('apiuser/profile')
      if (response.data.success) {
        dispatch({type : "ADD_USER" , payload : response.data.user})
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    getUser();
    // getJobs()
  }, [])
  
  return(
    <>
    </>
  )
}

export default RefreshProvider