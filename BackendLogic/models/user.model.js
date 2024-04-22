const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  date : {
    type : Date,
    default : Date.now()
  },
  role :{
    type : String,
    default : 'Applicant'
  },
  appliedJobs : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'applications'
  }],
})


const User = mongoose.models?.users || mongoose.model('users', userSchema);
export default User;