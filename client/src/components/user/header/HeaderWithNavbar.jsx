import React, { useEffect, useState } from 'react';
import "./header.css";
import { Avatar, Badge, Modal } from 'antd';
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import NavbarTop0 from '../navbar/NavbarTop0';
import Login from '../../../pages/public/login/Login';

export default function HeaderWithNavbar({ }) {
    const navigate = useNavigate();
    // lay thong tin userLogin tu local ve
    const userLogin = JSON.parse(localStorage.getItem('userLogin'));
    const [count, setCount] = useState();
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cartLocal")) || []);

    const showCount = () => {
        setCount(cart.length)
        console.log(count);
    }
    useEffect(() => {
        showCount();
    }, [cart.length])

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
            <div className="row align-items-center py-3 px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <Link to={"/"} className="text-decoration-none">
                        <h1 className="m-0 display-5 font-weight-semi-bold">
                            <span className="text-primary font-weight-bold border px-3 mr-1">
                                T
                            </span>
                            mestics
                        </h1>
                    </Link>
                </div>
                <div className="col-lg-6 col-6 text-left t-search">
                    <form action="">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm sản phẩm"
                            />
                            <div className="input-group-append">
                                <span className="input-group-text bg-transparent text-primary">
                                    <i className="fa fa-search" />
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-lg-3 col-6 text-right">
                    <NavLink to={"/wishlist"} className=" border px-3 py-2">
                        <Badge size="small" count={0} offset={[7, 1]}>
                            <i className="fas fa-heart text-primary" style={{ fontSize: "18px" }} />
                        </Badge>
                    </NavLink>
                    <NavLink to={"/cart"} className="border px-3 py-2">
                        <Badge size="small" count={count} offset={[7, 1]}>
                            <i className="fas fa-shopping-cart text-primary" style={{ fontSize: "18px" }} />
                        </Badge>
                    </NavLink>
                </div>

            </div>

            <div className="container-fluid t-container-navbar">
                <div className="row border-top px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <div
                            className="h-100 shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                            data-toggle="collapse"
                            href="#navbar-vertical"
                            style={{ height: 65, marginTop: "-1px", padding: "0 30px" }}
                        >
                            <h6 className="m-0 text-white">Danh mục sản phẩm</h6>
                            <i className="fa fa-angle-down text-white float-right" />
                        </div>
                        <nav
                            className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 py-0 border border-top-0 border-bottom-0 bg-light"
                            id="navbar-vertical"
                            style={{ width: "calc(100% - 30px)", zIndex: 1 }}
                        >
                            <div
                                className="navbar-nav w-100 overflow-hidden "
                                style={{ height: "fit-content" }}
                            >
                                <div className="nav-item dropdown">
                                    <NavLink to={"/list-product"} className="nav-link text-dark" data-toggle="dropdown">
                                        Trang điểm <i className="fa fa-angle-down float-right" />
                                    </NavLink>
                                    <div className="dropdown-menu rounded-0 m-0">
                                        <NavLink to={"/list-product"} className="dropdown-item ">
                                            Trang điểm mặt
                                        </NavLink>
                                        <NavLink to={"/list-product"} className="dropdown-item">
                                            Trang điểm môi
                                        </NavLink>
                                        <NavLink to={"/list-product"} className="dropdown-item">
                                            Trang điểm mắt
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="nav-item dropdown">
                                    <NavLink to={"/list-product"} className="nav-link text-dark" data-toggle="dropdown">
                                        Dưỡng da <i className="fa fa-angle-down float-right" />
                                    </NavLink>
                                    <div className="dropdown-menu rounded-0 m-0">
                                        <NavLink to={"/list-product"} className="dropdown-item">
                                            Dưỡng da mặt
                                        </NavLink>
                                        <NavLink to={"/list-product"} className="dropdown-item">
                                            Làm sạch
                                        </NavLink>
                                        <NavLink to={"/list-product"} className="dropdown-item">
                                            Mặt nạ
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="nav-item dropdown">
                                    <NavLink to={"/list-product"} className="nav-link text-dark" data-toggle="dropdown">
                                        Chăm sóc cơ thể <i className="fa fa-angle-down float-right" />
                                    </NavLink>
                                    <div className="dropdown-menu rounded-0 m-0">
                                        <NavLink to={"/list-product"} className="dropdown-item">
                                            Chăm sóc body
                                        </NavLink>
                                        <NavLink to={"/list-product"} className="dropdown-item">
                                            Chăm sóc tóc
                                        </NavLink>
                                        <NavLink to={"/list-product"} className="dropdown-item">
                                            Chăm sóc tay/chân
                                        </NavLink>
                                    </div>
                                </div>

                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                            <a href="" className="text-decoration-none d-block d-lg-none">
                                <h1 className="m-0 display-5 font-weight-semi-bold">
                                    <span className="text-primary font-weight-bold border px-3 mr-1">
                                        T
                                    </span>
                                    mestics
                                </h1>
                            </a>
                            <button
                                type="button"
                                className="navbar-toggler"
                                data-toggle="collapse"
                                data-target="#navbarCollapse"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div
                                className="collapse navbar-collapse justify-content-between"
                                id="navbarCollapse"
                            >
                                <div className="navbar-nav mr-auto py-0">
                                    <NavLink to={"/"} className="nav-item nav-link">
                                        <i className="fas fa-home"></i> Trang chủ
                                    </NavLink>

                                    <div className="nav-item dropdown">
                                        <NavLink to={"/list-product"}
                                            href="#"
                                            className="nav-link "
                                            data-toggle="dropdown"
                                        >
                                            <i className="fa-brands fa-product-hunt"></i>  Sản phẩm
                                        </NavLink>
                                    </div>
                                    <NavLink to={"/contact"} className="nav-item nav-link">
                                        <i className="fa-solid fa-id-badge"></i> Liên hệ
                                    </NavLink>
                                    <NavLink to={"/blog"} className="nav-item nav-link ">
                                        <i className="fa-solid fa-blog"></i>  Về Tmestics
                                    </NavLink>
                                </div>
                                <div className="navbar-nav ml-auto py-0">
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
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

        </>

    )
}
