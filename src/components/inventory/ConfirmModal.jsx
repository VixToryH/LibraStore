function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
      <div>
        <div>
          <p>{message}</p>
          <button onClick={onConfirm}>Так, видалити</button>
          <button onClick={onCancel}>Скасувати</button>
        </div>
      </div>
    )
  }
  
  export default ConfirmModal