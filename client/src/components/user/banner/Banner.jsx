import React from 'react';
import "./banner.css";
import { Link } from 'react-router-dom';

export default function Banner({ title }) {
    return (
        <>
            <div className="container-fluid  mb-5 banner">
                <div
                    className="d-flex flex-column align-items-center justify-content-center banner-inner"
                    style={{ minHeight: 300 }}
                >
                    <h1 className="font-weight-semi-bold mb-3 text-white">Tmestics</h1>
                    <div className="d-inline-flex">
                        <p className="m-0 ">
                            <Link to={"/"} className='text-white fw-semibold fs-5'>Trang chủ</Link>
                        </p>
                        <p className="m-0 px-2 text-white">-</p>
                        <p className="m-0 text-white fw-semibold fs-5">{title}</p>
                    </div>
                </div>
            </div>
        </>


    )
}
