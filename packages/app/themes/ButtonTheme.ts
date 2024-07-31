import { AppColors } from '@/app/assets'
import { AppTypo } from '@/app/constants'
import { ButtonTheme } from 'packages/core/components/Button'

const filled: ButtonTheme = {}

const outline: ButtonTheme = {
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: AppColors.buttonFocus,
  },
  title: { color: AppColors.textFocus },
}

const tinted: ButtonTheme = {
  button: {
    backgroundColor: AppColors.bgFocus,
    borderWidth: 0,
  },
  title: { color: AppColors.textFocus },
}

const plain: ButtonTheme = {
  button: {
    backgroundColor: 'transparent',
    height: 'auto',
    width: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: undefined,
  },
  title: { ...AppTypo.body.semiBold, color: AppColors.textFocus },
  iconLeft: {
    width: 20,
    height: 20,
    tintColor: AppColors.textFocus,
  },
  iconRight: {
    width: 20,
    height: 20,
    tintColor: AppColors.textFocus,
  },
}

const miniPlained: ButtonTheme = {
  button: {
    backgroundColor: 'transparent',
    height: 'auto',
    width: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: undefined,
  },
  title: { ...AppTypo.caption.semiBold, color: AppColors.textFocus },
  iconLeft: {
    width: 16,
    height: 16,
    tintColor: AppColors.textFocus,
  },
  iconRight: {
    width: 16,
    height: 16,
    tintColor: AppColors.textFocus,
  },
}

const disabled: ButtonTheme = {
  button: { backgroundColor: AppColors.bgDisabled },
  title: { color: AppColors.buttonDisabled },
}

const plainDisabled: ButtonTheme = {
  button: {
    backgroundColor: 'transparent',
    height: 'auto',
    width: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: undefined,
  },
  title: { ...AppTypo.body.semiBold, color: AppColors.buttonDisabled },
}

const navigate: ButtonTheme = {
  button: {
    justifyContent: 'space-between',
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
  title: {
    ...AppTypo.headline.regular,
  },
}

const validate: ButtonTheme = {
  button: { backgroundColor: AppColors.buttonValidate },
}

const tintedValidate: ButtonTheme = {
  button: { backgroundColor: AppColors.bgValidate },
  title: { color: AppColors.buttonValidate },
}

const validateOutline: ButtonTheme = {
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: AppColors.buttonValidate,
  },
  title: { color: AppColors.textValidate },
}

const add: ButtonTheme = {
  button: {
    width: 52,
    height: 52,
    backgroundColor: AppColors.buttonFocus,
    borderRadius: 64,
    position: 'absolute',
    right: 16,
    bottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRight: {
    width: 28,
    height: 28,
    tintColor: AppColors.white,
  },
  iconLeft: {
    width: 28,
    height: 28,
    tintColor: AppColors.white,
  },
}

export default {
  filled,
  outline,
  tinted,
  plain,
  miniPlained,
  disabled,
  plainDisabled,
  navigate,
  validate,
  tintedValidate,
  add,
  validateOutline,
}
