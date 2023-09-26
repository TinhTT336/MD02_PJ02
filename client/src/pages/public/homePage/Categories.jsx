import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../../api/axios';

export default function Categories() {
    //hien categories
    const [categories, setCategories] = useState([]);

    // goi API lay thong tin tat ca category
    useEffect(() => {
        instance.get("categories")
            .then(response => setCategories(response.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            <div className="container-fluid pt-2 ">
                <div className="row px-xl-5 pb-1 t-category">
                    <div className="text-center mb-4">
                        <h2 className="section-title px-5 text-center">
                            <span className="px-2">Danh mục sản phẩm</span>
                        </h2>
                    </div>
                    {categories.map((cat, index) => (
                        <div key={index} className="col-lg-4 col-md-6 pb-1 ">
                            <div
                                className="cat-item d-flex flex-column border mb-4 rounded category-item "
                                style={{ padding: 30 }}
                            >
                                <div className="cat-img position-relative overflow-hidden mb-3">
                                    <img className="img-fluid rounded" src={cat.image} alt="" />
                                </div>
                                <h5 className="font-weight-semi-bold m-0 category-title"><Link to={"/list-product"}>{cat.category_name}</Link></h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
