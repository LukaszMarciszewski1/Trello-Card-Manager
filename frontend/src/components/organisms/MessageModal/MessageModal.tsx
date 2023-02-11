import React from 'react'
import Modal from 'components/common/Modal/Modal'
import Success from 'components/common/Messages/Success/Success'
import Error from 'components/common/Messages/Error/Error'
import Loading from 'components/common/Loading/Loading'

interface MessageModalProps {
  trigger: boolean
  closeModal: () => void
  boardName: string
  success?: boolean
  error?: boolean
  loading?: boolean
}

const MessageModal: React.FC<MessageModalProps> = (
  {
    trigger,
    closeModal,
    boardName,
    success,
    error,
    loading
  }) => {

  return (
    <Modal trigger={trigger} closeModal={closeModal}>
      <>
        {loading && !error && !success ? (<Loading size={80}/>) : null}
        {success && <Success title={boardName} />}
        {error && <Error />}
      </>
    </Modal>
  )
}

export default MessageModal