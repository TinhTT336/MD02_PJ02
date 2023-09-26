import React from 'react'

export default function Featured() {
    return (
        <div className="container-fluid pt-5">
            <div className="row px-xl-5 pb-3">
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1 featured-item">
                    <div
                        className="d-flex align-items-center border mb-4 featured-item-content"
                        style={{ padding: 30 }}
                    >
                        <h1 className="fa fa-check text-primary m-0 mr-3 featured-icon" />
                        <h5 className="font-weight-semi-bold m-0">Sản phẩm chính hãng</h5>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1 featured-item">
                    <div
                        className="d-flex align-items-center border mb-4 featured-item-content"
                        style={{ padding: 30 }}
                    >
                        <h1 className="fa fa-shipping-fast text-primary m-0 mr-3 featured-icon" />
                        <h5 className="font-weight-semi-bold m-0">Miễn phí giao hàng</h5>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1 featured-item">
                    <div
                        className="d-flex align-items-center border mb-4 featured-item-content"
                        style={{ padding: 30 }}
                    >
                        <h1 className="fas fa-exchange-alt text-primary m-0 mr-3 featured-icon" />
                        <h5 className="font-weight-semi-bold m-0">14 ngày trả hàng</h5>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 pb-1 featured-item">
                    <div
                        className="d-flex align-items-center border mb-4 featured-item-content"
                        style={{ padding: 30 }}
                    >
                        <h1 className="fa fa-phone-volume text-primary m-0 mr-3 featured-icon" />
                        <h5 className="font-weight-semi-bold m-0">Hỗ trợ 24/7</h5>
                    </div>
                </div>
                <div>
                    <span className="iconx">
                        <i className="simple-icons icon-earphones icons"></i>
                    </span>
                </div>
            </div>
        </div>


    )
}
