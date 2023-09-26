import React from 'react'
import "./sidebar.css"
import { Link, NavLink, useParams } from 'react-router-dom'

export default function Sidebar() {
    const filed = useParams()
    const urlLength = window.location.pathname.length
    return (
        <>
            <div className="ad-sidebar">
                <div className="ad-sidebar-logo">
                    <h2 className="m-0 display-5 font-weight-semi-bold text-white">
                        <span className="text-white font-weight-bold border px-2 mr-1 ms-2">
                            T
                        </span>
                        <span className='title-hidden'>mestics</span>
                    </h2>
                </div>
                <div className="ad-sidebar-list">
                    <div className="ad-sidebar-item">
                        <NavLink to={"home"}
                            className={`ad-item-router ${urlLength < 10 ? "active" : ""}}`}
                        >
                            <i className="fa-solid fa-house"></i>
                            <div className="ad-item-title">Tổng quan</div>
                        </NavLink>
                    </div>
                    <div className="ad-sidebar-item">
                        <NavLink to={"manager-category"} className="ad-item-router">
                            <i className="bi bi-journal-text" />
                            <div className="ad-item-title">Quản lý danh mục</div>
                        </NavLink>
                    </div>
                    <div className="ad-sidebar-item">
                        <NavLink to={"manager-product"} className="ad-item-router">
                            <i className="bi bi-bag-check" />
                            <div className="ad-item-title">Quản lý sản phẩm</div>
                        </NavLink>
                    </div>
                    <div className="ad-sidebar-item">
                        <NavLink to={"manager-user"} className="ad-item-router">
                            <i className="fas fa-user-tie" />
                            <div className="ad-item-title">Quản lý tài khoản</div>
                        </NavLink>
                    </div>
                    <div className="ad-sidebar-item">
                        <NavLink to={"manager-order"} className="ad-item-router">
                            <i className="bi bi-cart-check" />
                            <div className="ad-item-title">Quản lý đơn hàng</div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
