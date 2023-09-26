import React from 'react';
import "./slide.css";
import { Link } from 'react-router-dom';

export default function Slide() {
    return (
        <div id="header-carousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active" style={{ height: 500 }}>
                    <img className="img-fluid" src="img/carousel-1.jpg" alt="Image" />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3" style={{ maxWidth: 700 }}>
                            <h4 className="text-light text-uppercase font-weight-medium mb-3">
                                Giảm 10% cho đơn hàng đầu tiên
                            </h4>
                            <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                                Môi xinh đón mùa về
                            </h3>
                            <Link to={"/list-product"}><button className=" btn-light py-2 px-3 t-btn-banner">
                                MUA NGAY
                            </button></Link>
                        </div>
                    </div>
                </div>
                <div className="carousel-item" style={{ height: 500 }}>
                    <img className="img-fluid" src="img/carousel-2.jpg" alt="Image" />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3" style={{ maxWidth: 700 }}>
                            <h4 className="text-light text-uppercase font-weight-medium mb-3">
                                Khuyến mãi lên tới 30%
                            </h4>
                            <h3 className="display-4 text-white font-weight-semi-bold mb-4">
                                Khuyến mãi ngập tràn
                            </h3>
                            <Link to={"/list-product"}><button className=" btn-light py-2 px-5 t-btn-banner">
                                MUA NGAY
                            </button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <a
                className="carousel-control-prev"
                href="#header-carousel"
                data-slide="prev"
            >
                <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
                    <span className="carousel-control-prev-icon mb-n2" />
                </div>
            </a>
            <a
                className="carousel-control-next"
                href="#header-carousel"
                data-slide="next"
            >
                <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
                    <span className="carousel-control-next-icon mb-n2" />
                </div>
            </a>
        </div>

    )
}
