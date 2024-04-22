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
      console.log('Hit getJob');
      const response = await api.get('admin/get-job')
      dispatchR(addJobs(response.data.allJobs))
      console.log(response);
    } catch (error) {
      
    }
  }

  const getUser =async () => {
    try {
      const response = await api.get('apiuser/profile')
      console.log(response , 'responce');
      if (response.data.success) {
        dispatch({type : "ADD_USER" , payload : response.data.user})
      }
    } catch (error) {
      console.log(error.response.data.error);
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