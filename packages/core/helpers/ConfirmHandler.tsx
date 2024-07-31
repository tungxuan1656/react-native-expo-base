import I18n from '@/app/controllers/languages/I18n'
import { GAlert } from 'packages/core/components/Dialog'

export type ConfirmHandlerDismissType = 'close' | 'skip'

const dismissForm = ({
  type,
  label,
  isShow,
  action,
  onDismiss,
}: {
  type: 'close' | 'skip' | string
  label: string
  action: string
  isShow: boolean
  onDismiss: () => void
}) => {
  if (isShow) {
    const message = I18n.t(type === 'close' ? 'confirm.closeDisplay' : 'confirm.skipOperation', {
      operationName: action.toLowerCase(),
      listName: label.toLowerCase(),
    })
    GAlert.show({
      title: I18n.t('confirm.title'),
      message: message,
      actions: [
        { text: I18n.t('label.skip'), type: 'cancel' },
        { text: I18n.t('label.yes'), onPress: onDismiss },
      ],
    })
  } else {
    onDismiss()
  }
}

const deleteElement = ({ name, onDelete }: { name: string; onDelete: () => void }) => {
  GAlert.show({
    title: I18n.t('confirm.title'),
    message: I18n.t('confirm.delete', {
      itemName: name,
    }),
    actions: [
      { text: I18n.t('confirm.textButtonSkip'), type: 'cancel' },
      {
        text: I18n.t('confirm.textButtonAccept'),
        type: 'destructive',
        onPress: onDelete,
      },
    ],
  })
}

export default { dismissForm, deleteElement }
