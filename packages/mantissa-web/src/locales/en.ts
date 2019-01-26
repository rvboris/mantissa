export const en = {
  meta: {
    brand: {
      name: 'mantissa'
    }
  },
  component: {
    dashboardToolbar: {
      searchPlaceholder: 'Search operations',
      signOutButton: 'Sign out'
    },
    homeToolbar: {
      signInButton: 'Sign in',
      signOutButton: 'Sign out',
      registerButton: 'Register'
    },
    balanceList: {
      title: 'Accounts'
    },
    entryForm: {
      expense: 'Expense',
      income: 'Income',
      transfer: 'Transfer'
    },
    entryExpenseForm: {
      account: 'Account',
      accountNotFound: 'Account not found',
      amount: 'Amount',
      description: 'Description',
      addButton: 'Add',
      category: 'Category',
      categoryNotFound: 'Category not found',
      date: 'Operation date',
      cancel: 'Cancel',
      ok: 'Ok'
    }
  },
  view: {
    register: {
      title: 'Registration',
      submitButton: 'Register',
      signInButton: 'Sign in',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password'
    },
    signIn: {
      title: 'Sign in',
      submitButton: 'Login',
      registrationButton: 'Registration',
      email: 'Email',
      password: 'Password'
    },
    dashboard: {
      nav: {
        operations: 'Operations',
        accounts: 'Accounts',
        reports: 'Reports',
        categories: 'Categories',
        settings: 'Settings'
      }
    },
  },
  errorCode: {
    UNKNOWN: 'Something wrong, please try again later',
    UNAUTHORIZED: 'Authorization required',
    VALIDATION_FAILED: 'Data validation failed',
    USER_ALREADY_EXISTS: 'The user with this email already registered',
    UNSUPPORTED_LOCALE: 'Your locale is not supported',
    UNSUPPORTED_CURRENCY: 'Your currency is not supported',
    SIGN_IN_FAIL: 'Wrong email or password'
  }
}
