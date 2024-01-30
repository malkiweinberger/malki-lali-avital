import React, { FC, ReactNode, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface MyModalProps {
  title: string;
  // פונקציה שתקרא שהמודל סגור
  onClose: () => void;
  // פונקציה שתיקרא כשהמשתמש מאשר את הפעולה
  onConfirm: () => void;
  children?: ReactNode; // קובעים שה-children יכול להיות ReactNode
}


// הרכיב מקבל אביזרים התואמים את ממשק MyModalProp
const MyModal: FC<MyModalProps> = (props: MyModalProps) => {
// מצב ההצגה של המודאל. בתחילה מוגדר כאמת.
  const [show, setShow] = useState(true)
//  לעדכן את מצב ההצגה.
  const handleClose = () => setShow(false);   
  const handleShow = () => setShow(true);
  

  return <div><div
    className="modal show"
    style={{ display: 'block', position: 'initial' }}>
       <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          close
        </Button>
        <Button variant="primary" onClick={props.onConfirm}>
          delete user
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
  </div>
};

export default MyModal;

