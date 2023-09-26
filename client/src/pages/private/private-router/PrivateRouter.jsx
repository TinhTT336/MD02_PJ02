import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import Header from '../../../components/admin/header/Header';
import "./private.css";
import { notification } from 'antd';

export default function PrivateRouter() {
    const navigate = useNavigate();
    const userLogin = JSON.parse(localStorage.getItem("userLogin")) || [];

    // const isLogin = false;

    useEffect(() => {
        if (userLogin && userLogin.role === 0) {
            navigate("/admin/home")
            // notification.success({
            //     message: "Thành công!",
            //     description: "Đăng nhập thành công vào trang quản trị"
            // })
        } else {
            navigate('/login')
            notification.warning({
                message: "Cảnh báo:",
                description: "Vui lòng đăng nhập tài khoản admin!"
            });
        }
    }, [])

    return (
        // isLogin ? <Outlet /> : <Navigate to={"/login"} />
        // isLogin ? (
        <>
            <div className="d-flex">
                <div className='sidebar'>
                    <Sidebar />
                </div>
                <div className='content-container w-100'>
                    <div className="d-flex flex-column" style={{ flex: 1 }}>
                        <Header />
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
    //     :
    //         null
    // )
}
