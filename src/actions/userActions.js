// actions/userActions.js
export const withdrawAmount = (amount) => ({
    type: "WITHDRAW",
    payload: { amount },
  });
  // actions/userActions.js
export const createAccount = (user) => ({
    type: "CREATE_ACCOUNT",
    payload: user,
  });
  
  export const resetAccountForm = () => ({
    type: "RESET_ACCOUNT_FORM",
  });
  
  export const setError = (message) => ({
    type: "SET_ERROR",
    payload: message,
  });
  export const login = (email, password) => ({
    type: "LOGIN",
    payload: { email, password },
  });
  
  export const logout = () => ({
    type: "LOGOUT",
  });
  export const deposit = (amount) => ({
    type: "DEPOSIT",
    payload: { amount },
  });
  