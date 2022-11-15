import styled from "styled-components";
import { calenderStore } from "../../store/store.js";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBody = styled.div`
  position: absolute;
  width: 800px;
  height: 570px;
  padding: 40px;
  text-align: center;
  background-color: #748da6;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const ModalCloseBtn = styled.div`
  position: absolute;
  top: 15px;
  right: 5px;
  border: none;
  color: white;
  font-size: 50px;

  cursor: pointer;
`;

function DiaryModal(props) {
  const { edit, setEdit, setText, setCalendarImage, setSendingImage } =
    calenderStore();

  function closeModal() {
    if (edit === true) {
      setEdit(!edit);
    }
    props.closeModal();
    setCalendarImage(null);
    setSendingImage(null);
    setText("");
  }

  return (
    <Modal onClick={closeModal}>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        <ModalCloseBtn onClick={closeModal}>&#215;</ModalCloseBtn>
        {props.children}
      </ModalBody>
    </Modal>
  );
}

export default DiaryModal;
