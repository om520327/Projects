import React, { useState } from 'react';
import { Button, Modal, Progress } from 'antd';
import { AiOutlinePicture } from 'react-icons/ai';
import ReactQuill from 'react-quill';
import './index.scss';

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  sendStatus,
  setStatus,
  status,
  isEdit,
  updateStatus,
  uploadPostImage,
  setPostImage,
  postImage,
  currentPost,
  setCurrentPost
}) => {
  return (
    <>
      <Modal
        title='Create a post'
        centered
        open={modalOpen}
        onOk={() => {
          setStatus('');
          setModalOpen(false);
          //setPostImage('');
          //setCurrentPost({});
        }}
        onCancel={() => {
          setStatus('');
          setModalOpen(false);
          //setPostImage('');
          //setCurrentPost({});
        }}
        footer={[
          <Button
            onClick={isEdit ? updateStatus : sendStatus}
            key='submit'
            type='primary'
            disabled={status.length > 0 ? false : true}
          >
            {isEdit ? 'Update' : 'Post'}
          </Button>
        ]}
      >
        <input
          className='modal-input'
          placeholder='Say it wit yo ches'
          onChange={event => setStatus(event.target.value)}
          value={status}
        />
      </Modal>
    </>
  );
};

export default ModalComponent;
