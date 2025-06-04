import React from "react";
import { useThemeStore } from "../../../Shared/Stores/ThemeStore";
import {
  ModalContainer,
  ModalHeader,
} from "../../../Shared/Utils/ModalUtils";

const AlarmCreateModal = ({ isOpen, onClose }) => {
  const { isDark } = useThemeStore();

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <ModalContainer isOpen={isOpen}>
        <ModalHeader title="새 알람 추가" onClose={handleClose} />
      </ModalContainer>
    </>
  );
};

export default AlarmCreateModal;
