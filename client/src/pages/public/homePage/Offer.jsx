import React from 'react'
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
export default function Offer() {
    return (
        <>
            <div className="container-fluid offer-container">
                <div className="row px-xl-5">
                    <div className='offer-slider'>
                        <Carousel autoplay className=''>
                            <div className="banner__text">
                                <span>Giảm giá lên tới 20%</span>
                                <h1>Bộ sưu tập son MAC</h1>
                                <Link to={"/list-product"}><button className="  t-btn-offer">
                                    MUA NGAY
                                </button></Link>
                            </div>
                            <div className="banner__text">
                                <span>Giảm giá lên tới 20%</span>
                                <h1>Bộ sưu tập son LEMONADE</h1>
                                <Link to={"/list-product"}><button className="t-btn-offer">
                                    MUA NGAY
                                </button></Link>
                            </div>
                            <div className="banner__text">
                                <span>Giảm giá lên tới 20%</span>
                                <h1>Bộ sưu tập son dưỡng DHC</h1>
                                <Link to={"/list-product"}><button className="t-btn-offer">
                                    MUA NGAY
                                </button></Link>
                            </div>
                            <div className="banner__text">
                                <span>Giảm giá lên tới 20%</span>
                                <h1>Bộ sưu tập son Innisfree</h1>
                                <Link to={"/list-product"}><button className="t-btn-offer">
                                    MUA NGAY
                                </button></Link>
                            </div>
                        </Carousel>
                    </div>

                </div>
            </div>

        </>

    )
}
