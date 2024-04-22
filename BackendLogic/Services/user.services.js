const { default: User } = require("../models/user.model");
import bcrypt from 'bcrypt'


const createUser = async (userData) => {
  try {
    const { name, email, password } = userData;

    const isUserExist = await User.findOne({ email });

    const hashhedPass = await bcrypt.hash(password , 10)

    if (isUserExist) {
      throw new Error('User already exists');
    }

    // Create the user if it doesn't exist
    const newUser = await User({
      name,
      email,
      password : hashhedPass,
    });

    newUser.save()

    return newUser;

  } catch (error) {
    throw error;
  }
}

const getUser =async (userData) =>{
  try {
    const {password , email} = userData;


    const user = await User.findOne({email})
    if (!user) {
      throw new Error('Email do not exist')
    }

    const isPasswordCorrect = await bcrypt.compare(password , user.password)
    if (!isPasswordCorrect) {
      throw new Error('Password is incorrect')
    }

    return user

  } catch (error) {
    throw error;

  }
}

export {
  createUser,
  getUser
}