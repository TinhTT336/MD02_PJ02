import React from 'react';
import "./header.css";
import { Avatar, Badge } from 'antd';
import { Link } from 'react-router-dom';

export default function Header() {

    return (
        <div className="row align-items-center py-3 px-xl-5">
            <div className="col-lg-3 d-none d-lg-block">
                <Link to={"/"} className="text-decoration-none">
                    <h1 className="m-0 display-5 font-weight-semi-bold">
                        <span className="text-primary font-weight-bold border px-3 mr-1">
                            T
                        </span>
                        mestics
                    </h1>
                </Link>
            </div>
            <div className="col-lg-6 col-6 text-left t-search">
                <form action="">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm sản phẩm"
                        />
                        <div className="input-group-append">
                            <span className="input-group-text bg-transparent text-primary">
                                <i className="fa fa-search" />
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-lg-3 col-6 text-right">
                <Link to={"/wishlist"} className=" border px-3 py-2">
                    <Badge size="small" count={1} offset={[7, 1]}>
                        <i className="fas fa-heart text-primary" style={{ fontSize: "18px" }} />
                    </Badge>
                </Link>
                <Link to={"/cart"} className=" border px-3 py-2">
                    <Badge size="small" count={1} offset={[7, 1]}>
                        <i className="fas fa-shopping-cart text-primary" style={{ fontSize: "18px" }} />
                    </Badge>
                </Link>
            </div>

        </div>

    )
}
