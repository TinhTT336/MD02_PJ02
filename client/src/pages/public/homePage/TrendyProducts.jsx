import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { formatMoney } from '../../../utils/formatData';
import instance from '../../../api/axios';

export default function TrendyProducts() {
    //hien categories
    const [products, setProducts] = useState([]);

    // goi API lay thong tin tat ca category
    //ham do ngau nhien cac san pham 
    const [shuffleProduct, setShuffleProduct] = useState([]);
    // console.log(shuffleProduct);
    const countProduct = 8;
    const handleFilter = () => {
        instance.get("products?_start=10&_limit=8 ")
            .then(response => {
                // console.log(response.data),
                setProducts(response.data)
                // const filterProduct = products.filter(p => p.beforeDiscount > 0);
                // console.log(filterProduct);
                // const shuffled = filterProduct.sort(() => 0.5 - Math.random());
                // console.log(shuffled);
                // const selected = filterProduct.slice(0, 8);
                // setShuffleProduct(selected);
            }
            )
            .catch(error => console.log(error))
    }
    useEffect(() => {
        handleFilter()
    }, [])

    return (
        <>
            <div className="container-fluid pt-4">
                <div className="text-center mb-4">
                    <h2 className="section-title px-5">
                        <span className="px-2">Sản phẩm nổi bật</span>
                    </h2>
                </div>
                <div className="row px-xl-5 pb-3">
                    {products.map((pro, index) => (
                        <div key={index} className="col-lg-3 col-md-6 col-sm-12 pb-1 product-list-item">
                            <div className="card product-item border-0 mb-4">
                                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <img
                                        className="img-fluid w-100"
                                        src={pro.image}
                                        alt=""
                                    />
                                </div>
                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 className=" mb-3 px-2" style={{ lineHeight: "1.8rem" }}>{pro.product_name.length > 60 ? (`${(pro.product_name).substring(0, 40)}...`) : (pro.product_name)}</h6>
                                    <div className="d-flex justify-content-center">
                                        {pro.beforeDiscount ? (<> <h6>{formatMoney(pro.price)}</h6>
                                            <h6 className="text-muted ml-2">
                                                <del>{formatMoney(pro.beforeDiscount)}</del>
                                            </h6></>) : (<><h6>{formatMoney(pro.price)}</h6></>)}
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-center bg-light border">
                                    <Link to={`/product-detail/${pro.id}`} href="" className=" btn-sm text-dark p-0 ">
                                        <i className="fas fa-eye text-primary mr-1" />
                                        Xem chi tiết
                                    </Link>
                                    {/* <div href="" className="btn btn-sm text-dark p-0" onClick={() => handleAddToCart(pro.id)}>
                                        <i className="fas fa-shopping-cart text-primary mr-1" />
                                        Thêm vào giỏ
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>

    )
}
