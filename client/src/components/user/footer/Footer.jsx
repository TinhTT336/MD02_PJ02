import React from 'react';
import "./footer.css";

export default function Footer() {
    return (
        <>
            {/* Footer Start */}
            <div className="container-fluid bg-secondary text-dark mt-5 pt-5 t-footer">
                <div className="row px-xl-5 pt-5">
                    <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                        <a href="" className="text-decoration-none">
                            <h1 className="mb-4 display-5 font-weight-semi-bold">
                                <span className="text-primary font-weight-bold border border-white px-3 mr-1">
                                    T
                                </span>
                                mestics
                            </h1>
                        </a>
                        <p className="mb-2">
                            <i className="fa fa-map-marker-alt text-primary mr-3" />
                            Toà nhà Sông Đà, Mỹ Đình 1, Nam Từ Liêm, Hà Nội
                        </p>
                        <p className="mb-2">
                            <i className="fa fa-envelope text-primary mr-3" />
                            info@tmestics.com
                        </p>
                        <p className="mb-0">
                            <i className="fa fa-phone-alt text-primary mr-3" />
                            +012 345 67890
                        </p>
                    </div>
                    <div className="col-lg-8 col-md-12">
                        <div className="row">
                            <div className="col-md-4 mb-5">
                                <h5 className="font-weight-bold text-dark mb-4">DANH MỤC SẢN PHẨM</h5>
                                <div className="d-flex flex-column justify-content-start">
                                    <a className="text-dark mb-2" href="index.html">
                                        <i className="fa fa-angle-right mr-2" />
                                        Trang điểm
                                    </a>
                                    <a className="text-dark mb-2" href="shop.html">
                                        <i className="fa fa-angle-right mr-2" />
                                        Dưỡng da
                                    </a>
                                    <a className="text-dark mb-2" href="detail.html">
                                        <i className="fa fa-angle-right mr-2" />
                                        Chăm sóc cơ thể
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5 className="font-weight-bold text-dark mb-4 ">CHÍNH SÁCH</h5>
                                <div className="d-flex flex-column justify-content-start">
                                    <a className="text-dark mb-2" href="index.html">
                                        <i className="fa fa-angle-right mr-2" />
                                        Chính sách giao hàng
                                    </a>
                                    <a className="text-dark mb-2" href="shop.html">
                                        <i className="fa fa-angle-right mr-2" />
                                        Chính sách thành viên
                                    </a>
                                    <a className="text-dark mb-2" href="detail.html">
                                        <i className="fa fa-angle-right mr-2" />
                                        Chính sách đổi trả
                                    </a>
                                    <a className="text-dark mb-2" href="checkout.html">
                                        <i className="fa fa-angle-right mr-2" />
                                        Chính sách bảo mật thông tin
                                    </a>
                                    <a className="text-dark" href="contact.html">
                                        <i className="fa fa-angle-right mr-2" />
                                        Hướng dẫn đăng ký thẻ thành viên
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5 className="font-weight-bold text-dark mb-4">KẾT NỐI VỚI CHÚNG TÔI</h5>
                                <form action="">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control border-0 py-4"
                                            placeholder="Họ và tên"
                                            required="required"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control border-0 py-4"
                                            placeholder="Email của bạn"
                                            required="required"
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-primary btn-block border-0 py-3"
                                            type="submit"
                                        >
                                            KẾT NỐI NGAY
                                        </button>
                                    </div>
                                </form>
                                <div className='d-flex mt-3 t-footer-icon'>
                                    <img style={{ width: 32, height: 32, borderRadius: "50%" }} src="//theme.hstatic.net/1000303351/1001070461/14/b1.jpg?v=680"></img>
                                    <img style={{ width: 32, height: 32, borderRadius: "50%" }} src="//theme.hstatic.net/1000303351/1001070461/14/b2.jpg?v=680"></img>
                                    <img style={{ width: 32, height: 32, borderRadius: "50%" }} src="//theme.hstatic.net/1000303351/1001070461/14/b3.jpg?v=680"></img>
                                    <img style={{ width: 32, height: 32, borderRadius: "50%" }} src="//theme.hstatic.net/1000303351/1001070461/14/b4.jpg?v=680"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row border-top border-light mx-xl-5 py-4">
                    <div className="col-md-6 px-xl-0">
                        <p className="mb-md-0 text-center text-md-left text-dark">
                            ©{" "}
                            <a className="text-dark font-weight-semi-bold" href="#">
                                Tmestics
                            </a>
                            . All Rights Reserved.
                            <br />

                        </p>
                    </div>
                    <div className="col-md-6 px-xl-0 text-center text-md-right">
                        <img className="img-fluid" src="img/payments.png" alt="" />
                    </div>
                </div>
            </div>
            {/* Footer End */}
        </>

    )
}
