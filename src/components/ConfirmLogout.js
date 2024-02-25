import React from 'react';
import Modal from 'react-modal';
import { HiOutlineLogout } from "react-icons/hi";

const ConfirmLogout = ({ isOpen, onClose, onLogout }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Confirm Logout"
            className="modal"
            overlayClassName="overlay"
        >
            <div className="modal-content">
                <h2>Bạn có chắc chắn muốn đăng xuất?</h2>
                <div className="button-container">
                    <button className="cancel-button" onClick={onClose}>Hủy</button>
                    <button className="logout-button" onClick={onLogout}><HiOutlineLogout /> Đăng xuất</button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmLogout;