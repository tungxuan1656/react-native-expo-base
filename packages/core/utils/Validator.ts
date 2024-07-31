import I18n from '@/app/controllers/languages/I18n'
import * as yup from 'yup'

export const ValidateRegex = {
  phoneNumber: /^([0][3|5|7|8|9])+([0-9]{8})$\b/u,
  // password: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
  passwordRegister: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, //Minimum eight characters, at least one letter and one number:
  password: /^[A-Za-z0-9]{6,}$/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}

export const Validator = {
  email: yup.string().trim().matches(ValidateRegex.email, I18n.t('validate.email')),
  phone: yup.string().trim().matches(ValidateRegex.phoneNumber, I18n.t('validate.phone')),
  password: yup.string().trim().matches(ValidateRegex.password, I18n.t('validate.password')),
  confirmedPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password'), null], I18n.t('validate.invalidConfirmPassword')),
}
