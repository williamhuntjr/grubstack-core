export interface IValidationMessage {
  createSuccess: string
  deleteSuccess: string
  updateSuccess: string
  confirmDelete: string
}

export const validationMessage = {
  isRequired: 'Required.',
  alreadyUsed: 'Already in use.',
  passwordMatch: 'Passwords do not match.',
  invalidEmail: 'Please enter a valid email address.',
}

export const validationAuthMessage = {
  createSuccess: 'Your account has been created.',
  createFailure: 'Your account could not be created. Try again later.',
  signInSuccess: 'You are now signed in.',
  signInFailure: 'Failed to sign in. Try again later.',
  signOutSuccess: 'You have signed out.',
  signOutFailure: 'Unable to sign out. Try again later.',
}

export const validationRegExp: {
  email: RegExp
} = {
  email:
    /(?!.*\.\..*)(?!.*--.*)(?!.* .*)(?!.*@@.*)(?!.*(\.|@|^)-.*)(?!.*\.(\.|@|$).*)(?!.*(\.|@)[A-Za-z0-9-]{64,}(\.|$).*)^[A-Za-z0-9][A-Za-z0-9!#$%&'*+\/=?^_`{|}~.-]{0,62}[^.]?@[A-Za-z0-9.:\-\[\]]{0,253}[A-Za-z0-9\[\]][.][A-Za-z.]{0,62}?$/,
}

export function validateEmail(email?: string): boolean {
  if (!email) {
    return false
  }
  return validationRegExp.email.test(email)
}

export function generateValidationMessages(objectType: string): IValidationMessage {
  return {
    createSuccess: `Your ${objectType} has been created.`,
    deleteSuccess: `Your ${objectType} has been deleted.`,
    updateSuccess: `Your ${objectType} has been updated.`,
    confirmDelete: `You are about to delete this ${objectType}. This cannot be undone. Do you wish to continue?`,
  }
}
