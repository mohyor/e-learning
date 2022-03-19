export const LoginStart = (userCredentials) => ({ 
 type: "LOGIN_START" 
})
export const LoginSuccess = (user) => ({ 
 type: "LOGIN_SUCCESS", payload: user 
})        
/*
export const LoggedInUserData = (user, id) => ({ 
 type: "LOGGED_IN_USER_DATA", payload: user: { id: user.id } 
})    
*/
export const LoginFailure = (error) => ({ 
 type: "LOGIN_FAILURE", payload: error 
})
export const Logout = (user) => ({
 type: "LOGOUT", payload: user
})
export const Follow = (userId) => ({ 
 type: "FOLLOW", payload: userId 
})
export const UnFollow = (userId) => ({ 
 type: "UNFOLLOW", payload: userId 
})