import { Carousel, Modal } from 'antd';
import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from 'react-slick';

export default function NavbarTop0() {
    //================================================
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.data);
    console.log(categories);
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
            <div className="container-fluid t-navbar">
                <div className="row border-top pl-4">
                    <div className="w-100">
                        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 pl-2">
                            <div className="collapse navbar-collapse justify-content-between">
                                <div className='d-flex gap-5'>
                                    <div className="navbar-nav py-0">
                                        <a href="" className="text-decoration-none">
                                            <h1 className="m-0 display-5 font-weight-semi-bold">
                                                <span className="text-primary font-weight-bold border px-3 mr-1">
                                                    T
                                                </span>
                                                mestics
                                            </h1>
                                        </a>
                                    </div>
                                    <div className="navbar-nav mr-auto py-0">
                                        <NavLink to={"/"} className="nav-item nav-link">
                                            <i className="fas fa-home"></i>  Trang chủ
                                        </NavLink>
                                        <div className="nav-item dropdown">
                                            <NavLink to={"/list-product"}
                                                href="#"
                                                className="nav-link dropdown-toggle"
                                                data-toggle="dropdown"
                                            >
                                                <i className="fa-brands fa-product-hunt"></i>  Sản phẩm
                                            </NavLink>
                                            <div className="dropdown-menu rounded-0 m-0">
                                                <Link to={"/list-product"} className="dropdown-item">
                                                    <i className="fas fa-spray-can me-2"></i>Chăm sóc cơ thể
                                                </Link>
                                            </div>
                                        </div>
                                        <NavLink to={"/contact"} className="nav-item nav-link">
                                            <i className="fa-solid fa-id-badge"></i> Liên hệ
                                        </NavLink>
                                        <NavLink to={"/blog"} className="nav-item nav-link">
                                            <i className="fa-solid fa-blog"></i>  Về Tmestics
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="navbar-nav ml-auto py-0">
                                    {userLogin !== null && userLogin.role === 1 ?
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
                                            </NavLink></>)}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>

    )
}
