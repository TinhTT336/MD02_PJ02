import React from 'react'
import { MenuOutlined, BellOutlined, MessageOutlined, LogoutOutlined, KeyOutlined, AccountBookOutlined } from "@ant-design/icons";
import "./header.css"
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

export default function Header() {
    const navigate = useNavigate();
    // lay thong tin userLogin tu local ve
    const userLogin = JSON.parse(localStorage.getItem('userLogin'));

    // ham dang xuat
    const handleLogout = () => {
        localStorage.removeItem('userLogin');
        navigate("/");
    }

    // ham hien modal xac nhan dang xuat
    const showModalLogout = () => {
        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có chắc chắn muốn đăng xuất?",
            onOk() {
                handleLogout();
            },
            onCancel() {
                cancelText: "Huỷ bỏ";
                okText: "Đăng xuất";
            }
        }

        )
    }
    return (
        <>
            <div>
                <div className="header-admin d-flex justify-content-between align-items-center">
                    <div>
                        <MenuOutlined style={{ fontSize: 20 }} />
                    </div>
                    <div className='d-flex gap-4 align-items-center'>
                        <BellOutlined style={{ fontSize: 20 }} />
                        <MessageOutlined style={{ fontSize: 20 }} />
                        <div className="dropdown  " >
                            {userLogin !== null ?
                                (userLogin.active === true && userLogin.role === 0 ? (<><span
                                    className="dropdown-toggle account-dropdown"
                                    data-toggle="dropdown"
                                    data-bs-display="static" aria-expanded="false"
                                >
                                    <img src={userLogin.image} width={30} height={30} className='rounded-circle' />  {userLogin.fullname}
                                </span>
                                    <div className="dropdown-menu m-0  custom-dropdown-menu dropdown-menu-right mt-3 rounded">
                                        <a className="dropdown-item ">
                                            <i className="fa-solid fa-user me-2"></i>  Thông tin tài khoản
                                        </a>
                                        <a className="dropdown-item" onClick={showModalLogout}>
                                            <i className="fa-solid fa-right-from-bracket me-2"></i>  Đăng xuất
                                        </a>
                                    </div></>)
                                    : (<></>)) : (<></>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
