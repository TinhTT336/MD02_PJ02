import React from 'react'
import Footer from '../../../components/user/footer/Footer'
import HeaderWithNavbar from '../../../components/user/header/HeaderWithNavbar'

export default function Wishlist() {
    return (
        <>
            <HeaderWithNavbar />
            <div className="container-fluid-wishlist pt-5 w-100">
                <div className="px-xl-5 w-100">
                    <div className="table-responsive mb-5 w-100">
                        <table className="table table-bordered text-center mb-0 w-100">
                            <thead className=" text-dark card-header ">
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Mô tả sản phẩm</th>
                                    <th>Xem chi tiết</th>
                                    <th>Thêm vào giỏ hàng</th>
                                    <th>Mua ngay</th>
                                    <th>Xoá</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                <tr>
                                    <td className="align-middle">
                                        <img src="img/product-1.jpg" alt="" style={{ width: 50 }} />{" "}
                                        Colorful Stylish Shirt
                                    </td>
                                    <td className="align-middle">$150</td>
                                    <td className="align-middle">$150</td>
                                    <td className="align-middle">
                                        <button className="btn btn-sm btn-primary ">
                                            <i className="fas fa-eye text-primary mr-1 text-dark" />
                                        </button>
                                    </td>
                                    <td className="align-middle">
                                        <button className="btn btn-sm btn-primary">
                                            <i className="fas fa-shopping-cart text-primary mr-1 text-dark" />
                                        </button>
                                    </td>
                                    <td className="align-middle">
                                        <button className="btn btn-sm btn-primary">
                                            <i className="fa-solid fa-money-bill"></i>
                                        </button>
                                    </td>
                                    <td className="align-middle">
                                        <button className="btn btn-sm btn-primary">
                                            <i className="fa fa-times" />
                                        </button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}
