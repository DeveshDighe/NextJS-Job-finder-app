import User from "../models/user.model";

const getUserWithToken = async (token) =>{
  try {
    const user =await User.findById(token)

    if (!user) {
      throw new Error('User did not found with token')
    }

    return user;
  } catch (error) {
    throw error
  }
}

export {
  getUserWithToken
}