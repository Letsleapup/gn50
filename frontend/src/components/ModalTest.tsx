"use client";

import { FunctionComponent, useState } from "react";
import { Modal } from "./Modal";

export const ModalTest: FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigatePage = () => {
    //이동
  };

  return (
    <div>
      <h1>모달 sample</h1>
      <button onClick={openModal}>모달 열기</button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onNavigate={navigatePage}
        btnName={"웹툰 그리기"}
      >
        <h2>모달 내용</h2>
        <img src="/letsleapup-logo(dall-e).PNG" width={"100px"} />
        <p>이곳에 원하는 내용을 넣을 수 있습니다.</p>
      </Modal>
    </div>
  );
};
