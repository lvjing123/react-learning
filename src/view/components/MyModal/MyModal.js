/**
 * Created by djz on 2023/3/27.
 */
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Outlet } from "react-router-dom"


const MyModal = (modalInfo) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal
        title={modalInfo.title}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
       <div>{modalInfo.content}</div>
      </Modal>
    </>
  );
};

export default MyModal;