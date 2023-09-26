import React from 'react'
import { Link } from 'react-router-dom';
import "./adminHomepage.css";

export default function AdminHomePage() {
    return (
        <>
            <div>
                <div className=' d-flex flex-column  gap-3 p-5 mx-5 my-5' style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius: 4 }}>
                    <div style={{ height: "30px" }}
                        className="progress"
                        role="progressbar"
                        aria-label="Success example"
                        aria-valuenow={25}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        <div className="progress-bar bg-success" style={{ width: "25%" }}>
                            25%
                        </div>
                    </div>
                    <div style={{ height: "30px" }}
                        className="progress"
                        role="progressbar"
                        aria-label="Info example"
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        <div className="progress-bar bg-info text-dark" style={{ width: "50%" }}>
                            50%
                        </div>
                    </div>
                    <div style={{ height: "30px" }}
                        className="progress"
                        role="progressbar"
                        aria-label="Warning example"
                        aria-valuenow={75}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        <div className="progress-bar bg-warning text-dark" style={{ width: "75%" }}>
                            75%
                        </div>
                    </div>
                    <div style={{ height: "30px" }}
                        className="progress"
                        role="progressbar"
                        aria-label="Danger example"
                        aria-valuenow={100}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        <div className="progress-bar bg-danger" style={{ width: "100%" }}>
                            100%
                        </div>
                    </div>

                </div>
                <div className='p-5 mx-5 my-5 manager-card'>
                    <h3>Các chức năng chính</h3>
                    <div className='d-flex align-item-center justify-content-between pt-4' >
                        <div className="card" style={{ width: "14rem" }}>
                            <img src="https://camo.githubusercontent.com/b5e66b2fe616886bb21a4808bfb18c14e1c028f0c2a5db5cbe972c0c9cb29ab0/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313735393739342f313237373639342f30313234646530302d326564392d313165332d386132342d3431346431363639386237332e676966" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quản lý danh mục</h5>
                                <p className="card-text">
                                    Quản lý danh mục sản phẩm với các chức năng: thêm mới, sửa, xoá, tìm kiếm
                                </p>
                                <Link to={"/admin/manager-category"} className="btn btn-primary">
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                        <div className="card" style={{ width: "14rem" }}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK8PzRgB7YjLi-X1cl6hdj1u5ahUo4lOu3ug&usqp=CAU" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quản lý sản phẩm</h5>
                                <p className="card-text">
                                    Quản lý sản phẩm với các chức năng: thêm mới, sửa, xoá, tìm kiếm
                                </p>
                                <Link to={"/admin/manager-product"} className="btn btn-primary">
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                        <div className="card" style={{ width: "14rem" }}>
                            <img src="https://cdn-icons-png.flaticon.com/512/1170/1170577.png" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quản lý tài khoản</h5>
                                <p className="card-text">
                                    Quản lý tài khoản với các chức năng: khoá, mở khoá, tìm kiếm theo tên tài khoản
                                </p>
                                <Link to={"admin/manager-user"} className="btn btn-primary">
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                        <div className="card" style={{ width: "14rem" }}>
                            <img src="https://static-00.iconduck.com/assets.00/cart-shopping-list-icon-986x1024-n4ktyo8p.png" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quản lý đơn hàng</h5>
                                <p className="card-text">
                                    Quản lý đơn hàng với các chức năng: xác nhận, huỷ bỏ đơn hàng, tìm kiếm đơn hàng
                                </p>
                                <Link to={"admin/manager-order"} className="btn btn-primary">
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
