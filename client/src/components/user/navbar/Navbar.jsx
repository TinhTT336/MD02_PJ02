import { Modal } from 'antd';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';



export default function Navbar() {
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

        <div className="container-fluid t-navbar">
            <div className="row border-top px-xl-5">
                <div className="w-100">
                    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0 ">
                        <div
                            className="collapse navbar-collapse justify-content-between"
                        >
                            <div className="navbar-nav mr-auto py-0">
                                <NavLink to={"/"} className="nav-item nav-link active">
                                    <i className="fas fa-home"></i> Trang chủ
                                </NavLink>
                                <div className="nav-item dropdown">
                                    <NavLink to={"/list-product"}
                                        className="nav-link dropdown-toggle"
                                        data-toggle="dropdown"
                                    >
                                        <i className="fa-brands fa-product-hunt"></i> Sản phẩm
                                    </NavLink>
                                    <div className="dropdown-menu rounded-0 m-0">
                                        <NavLink to={"/list-product"} className="dropdown-item">
                                            <i className="fas fa-lipstick me-2"></i>Trang điểm
                                        </NavLink>
                                        <NavLink to={"/list-product"} className="dropdown-item">
                                            <i className="fas fa-spa me-2"></i>Dưỡng da
                                        </NavLink>
                                        <NavLink to={"/list-product"} className="dropdown-item">
                                            <i className="fas fa-spray-can me-2"></i>Chăm sóc cơ thể
                                        </NavLink>
                                    </div>
                                </div>
                                <NavLink to={"/contact"} className="nav-item nav-link">
                                    <i className="fa-solid fa-id-badge"></i> Liên hệ
                                </NavLink>
                                <NavLink to={"/blog"} className="nav-item nav-link">
                                    <i className="fa-solid fa-blog"></i>  Về Tmestics
                                </NavLink>
                            </div>
                            <div className="navbar-nav ml-auto py-0">
                                <div className="nav-item dropdown d-flex " >

                                    {userLogin !== null ?
                                        //neu da co thong tin userLogin kiem tra active va role
                                        (userLogin.active === true && userLogin.role === 1 ?
                                            (<><div className="nav-item dropdown  " >
                                                <span
                                                    className="nav-link dropdown-toggle account-dropdown"
                                                    data-toggle="dropdown"
                                                    data-bs-display="static" aria-expanded="false"
                                                >
                                                    <img src={userLogin.image} width={30} height={30} className='rounded-circle' /> {userLogin.fullname}
                                                </span>
                                                <div className="dropdown-menu rounded m-0  custom-dropdown-menu dropdown-menu-right">
                                                    <NavLink to={"/profile"} className="dropdown-item ">
                                                        <i className="fa-solid fa-user me-2"></i>  Thông tin tài khoản
                                                    </NavLink>
                                                    <NavLink to={"/order-history"} className="dropdown-item">
                                                        <i className="fa-solid fa-money-bills me-2"></i>  Lịch sử mua hàng
                                                    </NavLink>
                                                    <span className="dropdown-item" onClick={showModalLogout}>
                                                        <i className="fa-solid fa-right-from-bracket me-2" ></i>  Đăng xuất
                                                    </span>
                                                </div>
                                            </div></>) : (<> <NavLink to={"/login"} className="nav-item nav-link">
                                                <i className="fas fa-sign-in-alt"></i>   Đăng nhập
                                            </NavLink>
                                                <NavLink to={"/register"} className="nav-item nav-link">
                                                    <i className="fa-solid fa-user-plus"></i>  Đăng ký
                                                </NavLink></>)) :
                                        //neu chua co thong tin thi hien dang nhap+ dang ky
                                        (<> <NavLink to={"/login"} className="nav-item nav-link">
                                            <i className="fas fa-sign-in-alt"></i>   Đăng nhập
                                        </NavLink>
                                            <NavLink to={"/register"} className="nav-item nav-link">
                                                <i className="fa-solid fa-user-plus"></i>  Đăng ký
                                            </NavLink></>)
                                    }

                                    {/* {userLogin !== null ?
                                        //neu da co thong tin userLogin thi hien thi
                                        (<><div className="nav-item dropdown  " >
                                            <span
                                                className="nav-link dropdown-toggle account-dropdown"
                                                data-toggle="dropdown"
                                                data-bs-display="static" aria-expanded="false"
                                            >
                                                <img src={userLogin.image} width={30} height={30} className='rounded-circle' /> {userLogin.fullname}
                                            </span>
                                            <div className="dropdown-menu rounded m-0  custom-dropdown-menu dropdown-menu-right">
                                                <NavLink to={"/profile"} className="dropdown-item ">
                                                    <i className="fa-solid fa-user me-2"></i>  Thông tin tài khoản
                                                </NavLink>
                                                <NavLink to={"/order-history"} className="dropdown-item">
                                                    <i className="fa-solid fa-money-bills me-2"></i>  Lịch sử mua hàng
                                                </NavLink>
                                                <span className="dropdown-item" onClick={showModalLogout}>
                                                    <i className="fa-solid fa-right-from-bracket me-2"></i>  Đăng xuất
                                                </span>
                                            </div>
                                        </div></>)
                                        //neu chua co thong tin thi hien dang nhap+ dang ky
                                        : (<> <NavLink to={"/login"} className="nav-item nav-link">
                                            <i className="fas fa-sign-in-alt"></i>   Đăng nhập
                                        </NavLink>
                                            <NavLink to={"/register"} className="nav-item nav-link">
                                                <i className="fa-solid fa-user-plus"></i>  Đăng ký
                                            </NavLink></>)} */}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>


    )
}
