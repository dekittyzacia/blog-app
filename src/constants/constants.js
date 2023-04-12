export const apiBase = 'https://blog.kata.academy/api/'

export const statuses = {
  loading: 'loading',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
}

export const validateOptions = {
  username: {
    required: 'This is the required field!',
    minLength: {
      value: 3,
      message: 'The username should be 3-20 symbols',
    },
    maxLength: {
      value: 20,
      message: 'The username should be 3-20 symbols',
    },
    validate: (value) => value.trim().length !== 0 || 'Username should not be empty!',
  },
  email: {
    required: 'This is the required field!',
    pattern: {
      value: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
      message: 'The email should be a correct email adress',
    },
    validate: (value) => value.trim().length !== 0 || 'Email should not be empty!',
  },
  password: {
    required: 'This is the required field!',
    minLength: {
      value: 6,
      message: 'The password should be 6-40 symbols',
    },
    maxLength: {
      value: 40,
      message: 'The password should be 6-40 symbols',
    },
    validate: (value) => value.trim().length !== 0 || 'Password should not be empty!',
  },
  repeatPassword: {
    required: 'This is the required field!',
    validate: {
      similarToPassword: (value, formValues) =>
        value === formValues.password || 'Password and repeat password fields should be similar',
      notEmpty: (value) => value.trim().length !== 0 || 'Repeat password field should not be empty!',
    },
  },
  agreement: {
    required: 'You should agree to the processing!',
    validate: (value) => value || 'You should agree to the processing!',
  },
}

export const loginValidateOptions = {
  email: {
    required: 'This is the required field!',
    pattern: {
      value: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
      message: 'The email should be a correct email adress',
    },
  },
  password: {
    required: 'This is the required field!',
  },
}

export const editProfileValidateOptions = {
  username: {
    minLength: {
      value: 3,
      message: 'The username should be 3-20 symbols',
    },
    maxLength: {
      value: 20,
      message: 'The username should be 3-20 symbols',
    },
    validate: (value) => {
      if (!value) return true
      return value.trim().length !== 0 || 'Username shoud not be empty!'
    },
  },
  email: {
    pattern: {
      value: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
      message: 'The email should be a correct email adress',
    },
    validate: (value) => {
      if (!value) return true
      return value.trim().length !== 0 || 'Email shoud not be empty!'
    },
  },
  password: {
    minLength: {
      value: 6,
      message: 'The password should be 6-40 symbols',
    },
    maxLength: {
      value: 40,
      message: 'The password should be 6-40 symbols',
    },
    validate: (value) => {
      if (!value) return true
      return value.trim().length !== 0 || 'Password shoud not be empty!'
    },
  },
  avatar: {
    validate: (value) => isURL(value) || 'Avatar URL should be a correct URL adress',
  },
}

export const signUpFormStatuses = {
  empty: 'empty',
  filled: 'filled',
  rejected: 'rejected',
  ok: 'ok',
}

function isURL(str) {
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}
