import React from 'react';
import "./notFound.css";
import { Link } from 'react-router-dom';


export default function NotFound() {
    return (
        <>
            {/* <div className="d-flex align-items-center text-center error-page pt-5 pb-4 h-100">
                <div className="row flex-grow t-flex-row w-100">
                    <div className="col-lg-8 mx-auto text-white w-100">
                        <div className="row align-items-center d-flex flex-row justify-content-center  w-100">
                            <div className="col-lg-6 text-lg-right pr-lg-4">
                                <h1 className="display-1 mb-0 text-primary-color">404</h1>
                            </div>
                            <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                                <h2 className='text-primary-color'>THÔNG BÁO!</h2>
                                <h3 className="font-weight-light text-primary-color">Trang bạn đang tìm không tồn tại.</h3>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-12 text-center mt-xl-2">
                                <Link className=" font-weight-medium text-color-404 fs-4" >Quay lại trang chủ</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="container-xxl container-p-y">
                <div className="misc-wrapper">
                    <h2 className="mb-2 mx-2">Page Not Found 🙁 </h2>
                    <p className="mb-4 mx-2">
                        Oops! 😖 The requested URL was not found on this server.
                    </p>
                    <Link to={"/"} className="btn btn-primary rounded btn-bact-to-home">
                        Back to home
                    </Link>
                    <div className="mt-3">
                        <img
                            src='../../../../public/images/404.png'
                            alt="page-misc-error-light"
                            width={500}
                            className="img-fluid"
                            data-app-dark-img="illustrations/page-misc-error-dark.png"
                            data-app-light-img="illustrations/page-misc-error-light.png"
                        />
                    </div>
                </div>
            </div>

        </>

    )
}
