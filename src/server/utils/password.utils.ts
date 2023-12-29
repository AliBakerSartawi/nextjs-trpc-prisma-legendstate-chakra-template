function validate(password: string) {
  const errors: string[] = [];

  // Minimum 8 characters
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long.');
  }

  // // At least one uppercase letter
  // if (!/[A-Z]/.test(password)) {
  //   errors.push('Password must contain at least one uppercase letter.');
  // }

  // // At least one lowercase letter
  // if (!/[a-z]/.test(password)) {
  //   errors.push('Password must contain at least one lowercase letter.');
  // }

  // // At least one digit
  // if (!/\d/.test(password)) {
  //   errors.push('Password must contain at least one digit.');
  // }

  // // At least one special character
  // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
  //   errors.push('Password must contain at least one special character.');
  // }

  return errors;
}

export const passwordUtils = {
  validate,
};
