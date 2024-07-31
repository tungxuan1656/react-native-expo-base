import { AppColors } from '@/app/assets'
import { TagTheme } from 'packages/core/components/Tag'

const select: TagTheme = {
  container: {
    borderColor: AppColors.buttonFocus,
    backgroundColor: AppColors.buttonFocus,
  },
  label: {
    color: AppColors.white,
  },
}

export default {
  select,
}
