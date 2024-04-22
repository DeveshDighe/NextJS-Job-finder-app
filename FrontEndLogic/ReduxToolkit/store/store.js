import JobsReducer from "../reducers/JobsReducer";
import allJobApplication from "../reducers/allJobApplication";
import userJobAplliedApp from "../reducers/userJobAplliedApp";


const { configureStore } = require("@reduxjs/toolkit");


export const store = configureStore({
  reducer : {
    JobsReducer,
    userJobAplliedApp,
    allJobApplication
  }
})