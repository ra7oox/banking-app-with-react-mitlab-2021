const initialState = {
    users: [],
    loggedInUser: null,
    error: "",
    submitted: false,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CREATE_ACCOUNT":
        const emailExists = state.users.some(
          (user) => user.email === action.payload.email
        );
        if (emailExists) {
          return {
            ...state,
            error: "This email is already used by another account.",
          };
        }
        return {
          ...state,
          users: [
            ...state.users,
            { ...action.payload, balance: 0, transactions: [] },
          ],
          error: "",
          submitted: true,
        };
  
      case "RESET_ACCOUNT_FORM":
        return {
          ...state,
          error: "",
          submitted: false,
        };
  
      case "WITHDRAW":
        const withdrawAmount = action.payload.amount;
        if (withdrawAmount <= 0 || isNaN(withdrawAmount)) {
          return {
            ...state,
            error: "Please enter a valid amount greater than 0",
          };
        }
        if (state.loggedInUser.balance - withdrawAmount < 0) {
          return {
            ...state,
            error: "You cannot withdraw an amount greater than your balance",
          };
        }
  
        const updatedUserWithdraw = {
          ...state.loggedInUser,
          balance: state.loggedInUser.balance - withdrawAmount,
          transactions: [
            ...state.loggedInUser.transactions,
            {
              operation: "Withdraw",
              amount: withdrawAmount,
              createdDate: new Date().toISOString(),
            },
          ],
        };
  
        return {
          ...state,
          loggedInUser: updatedUserWithdraw,
          users: state.users.map((user) =>
            user.email === state.loggedInUser.email ? updatedUserWithdraw : user
          ),
          error: "",
        };
  
      case "DEPOSIT":
        const depositAmount = action.payload.amount;
        if (depositAmount <= 0 || isNaN(depositAmount)) {
          return {
            ...state,
            error: "You must deposit an amount greater than 0",
          };
        }
  
        const updatedUserDeposit = {
          ...state.loggedInUser,
          balance: state.loggedInUser.balance + depositAmount,
          transactions: [
            ...state.loggedInUser.transactions,
            {
              operation: "Deposit",
              amount: depositAmount,
              createdDate: new Date().toISOString(),
            },
          ],
        };
  
        return {
          ...state,
          loggedInUser: updatedUserDeposit,
          users: state.users.map((user) =>
            user.email === state.loggedInUser.email ? updatedUserDeposit : user
          ),
          error: "",
        };
  
      case "LOGIN":
        const { email, password } = action.payload;
        const foundUser = state.users.find((user) => user.email === email);
  
        if (!foundUser || foundUser.password !== password) {
          return {
            ...state,
            error: "Incorrect email or password",
          };
        }
  
        return {
          ...state,
          loggedInUser: foundUser,
          error: "",
          submitted: true,
        };
  
      case "LOGOUT":
        return {
          ...state,
          loggedInUser: null,
          error: "",
        };
  
      default:
        return state;
    }
  };
  
  export default userReducer;
  