import * as Yup from 'yup';

export const emailValidation = Yup.string()
  .email('Please enter a valid email address.')
  .test('has-tld', 'Please enter a valid email address.', value => {
    if (!value) return false;

    const campus = value.split('@')[1];

    return !!campus && /\.[a-z]{2,}$/i.test(campus);
  })
  .required('Email is required.');

export const passwordValidation = Yup.string()
  .min(8, 'Must be at least 8 characters.')
  .matches(/[A-Z]/, 'Must contain an uppercase letter.')
  .matches(/[a-z]/, 'Must contain a lowercase letter.')
  .matches(/\d/, 'Must contain a number.')
  .required('Password is required.');

export const confirmPasswordValidation = Yup.string()
  .oneOf([ Yup.ref('password'), null ], 'Passwords must match.')
  .required('Confirm password is required.');
