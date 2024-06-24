import "./modal.css";
const Modal = ({
  title,
  text,
  modalOk,
  modalCancel,
  modalBtOk,
  modalBtCancel,
}) => {
  return (
    <div className="modal-wrap">
      <div className="modal-content">
        <header>
          <h1>{title}</h1>
        </header>
        <main>
          <p>{text}</p>
        </main>
        <footer>
          {modalBtOk ? (
            <button
              onClick={() => {
                modalOk();
              }}
            >
              확인
            </button>
          ) : null}

          {modalBtCancel ? (
            <button
              onClick={() => {
                modalCancel();
              }}
            >
              취소
            </button>
          ) : null}
        </footer>
      </div>
    </div>
  );
};

export default Modal;
