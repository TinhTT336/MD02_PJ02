import React from 'react';
import "./notFound.css";
import { Link } from 'react-router-dom';


export default function NotFound() {
    return (
        <>
            <div className="d-flex align-items-center text-center error-page bg-primary pt-5 pb-4 h-100">
                <div className="row flex-grow t-flex-row w-100">
                    <div className="col-lg-8 mx-auto text-white w-100">
                        <div className="row align-items-center d-flex flex-row justify-content-center  w-100">
                            <div className="col-lg-6 text-lg-right pr-lg-4">
                                <h1 className="display-1 mb-0 text-white">404</h1>
                            </div>
                            <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                                <h2 className='text-white'>THÔNG BÁO!</h2>
                                <h3 className="font-weight-light text-white">Trang bạn đang tìm không tồn tại.</h3>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-12 text-center mt-xl-2">
                                <Link className="text-white font-weight-medium text-color-404" to="/">Quay lai trang chủ</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
