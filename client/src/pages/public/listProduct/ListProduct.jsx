import React, { useEffect, useState } from 'react'
import HeaderWithNavbar from '../../../components/user/header/HeaderWithNavbar'
import { formatMoney } from '../../../utils/formatData';
import "./listProduct.css";
import Footer from '../../../components/user/footer/Footer';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Pagination, Select, notification } from 'antd';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderCopy from '../../../components/user/header/HeaderCopy';
import Banner from '../../../components/user/banner/Banner';
import { debounce } from 'lodash';
import BackToTop from '../../../components/base/backToTop/BackToTop';
import instance from '../../../api/axios';

export default function ListProduct({ title, cartLength, setIsLoadCartLength }) {
    //xu ly an/hien chi tiet loc ben sidebar-left
    const [formCategories, setFormCategories] = useState(true);
    const [carts, setCarts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [sort, setSort] = useState("desc");
    // const [cartLocal, setCartLocal] = useState(JSON.parse(localStorage.getItem("cartLocal")) || []);

    const handleFormCategories = () => {
        setFormCategories(!formCategories);
    }

    //hien categories, products va loc products theo categories
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [categoryId, setCategoryId] = useState(0);

    // goi API lay thong tin tat ca category
    useEffect(() => {
        instance.get("categories")
            .then(response => setCategories(response.data))
            .catch(error => console.log(error))
    }, [])
    //lay id cua category
    const getCategoryId = (id) => {
        setCategoryId(id)
    }

    // goi API lay tat ca thong tin san pham va render giao dien================================================================
    const loadData = () => {
        instance.get(`products?_sort=price&_order=${sort}&product_name_like=${searchText}`)
            .then(response => {
                if (categoryId === 0) {
                    setProducts(response.data);
                } else {
                    //loc san pham theo category_id
                    const listProductById = response.data.filter(product => product.category_id === categoryId)
                    setProducts(listProductById);
                }
            })
            .catch(error => console.log(error))
    }
    useEffect(() => {
        const delaySearch = debounce(loadData, 500);
        delaySearch();
        return () => {
            delaySearch.cancel()
        };
    }, [sort, searchText]);

    useEffect(() => {
        loadData();
    }, [categoryId])

    //=========================================
    // Nội dung của toast message
    const notify = () =>
        toast.success("Đã thêm sản phẩm vào giỏ hàng.", {
            position: "top-right",
        });
    const notifyLogin = () =>
        toast.warning("Vui lòng đăng nhập để mua hàng", {
            position: "top-right",
        });

    //lay du lieu cart tren gio hang ve================================================================
    const getAllCarts = () => {
        instance.get("carts")
            .then(response => setCarts(response.data))
            .catch(error => console.log(error))
    }
    useEffect(() => {
        getAllCarts();
    }, [])

    //ham Add to cart
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    const handleAddToCart = async (id) => {
        if (userLogin) {
            try {
                //tim kiem gio hang cua nguoi dung
                const userCart = carts.find(c => c.userId === userLogin.id);
                //neu nguoi dung da co gio hang
                if (userCart) {
                    //kiem tra xem san pham da co trong gio hang chua
                    const existedProduct = userCart?.cartDetails.find(p => p.productId === id);
                    //neu san pham da co trong gio hang thi tang so luong len 1
                    if (existedProduct) {
                        existedProduct.quantity += 1;
                        // notify();
                    }
                    //neu san pham chua co trong gio hang thi them vao gio hang
                    else {
                        userCart?.cartDetails.push({
                            productId: id,
                            quantity: 1
                        })
                    }
                    //cap nhat gio hang len server
                    instance.put(`carts/${userCart.id}`, userCart)
                    notify();
                } else {
                    //neu nguoi dung chua co gio hang
                    const newCart = {
                        userId: userLogin.id,
                        cartDetails: []
                    }
                    //goi API post gio hang moi cua nguoi dung
                    const response = await instance.post("carts", newCart);
                    //cap nhat gio hang tren DB
                    setCarts([...carts, response.data])
                }
                setIsLoadCartLength(pre => !pre)
                //luu thong tin userCart.cartDetail len local de hien thi so luong sp tren thanh navbar
                localStorage.setItem("cartLocal", JSON.stringify(userCart?.cartDetails));
                // console.log(cartLocal, "cartLocal");
            }
            catch (error) {
                console.log(error);
            }
        } else {
            notifyLogin();
        }
    }

    //================================================
    // ham phan trang san pham
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);

    //tinh vi tri san pham bat dau va ket thuc cua moi trang
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const totalPages = products.length / pageSize;
    const displayProducts = products.slice(startIndex, endIndex);

    // ham xu ly su kien khi thay doi trang
    const handleChangePage = (page) => {
        setCurrentPage(page);
    }

    //============================================================
    return (
        <>
            {/* <HeaderWithNavbar /> */}
            <HeaderCopy cartLength={cartLength} />
            <Banner title={title} />
            <ToastContainer />

            {/* Shop Start */}
            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    {/* Shop Sidebar Start */}
                    <div className="col-lg-3 col-md-12">
                        {/* Product Start */}
                        <div className="border-bottom mb-3 list-product">
                            <h5 className="font-weight-semi-bold mb-4">Danh mục sản phẩm  <i className="fa fa-angle-down  float-right" onClick={handleFormCategories} /></h5>
                            {formCategories ?
                                (<>
                                    <div className='form-categories' >
                                        <div onClick={() => setCategoryId(0)}
                                            className="custom-control d-flex align-items-center justify-content-between mb-1 category-items"
                                            // className={`custom-control d-flex align-items-center justify-content-between mb-1  ${categoryId === 0 && "category-items"}`}
                                            style={categoryId === 0 ? {
                                                backgroundColor: "#d29c97", color: "#fff", boxShadow: ("rgba(50, 50, 93, 0.25) 0px 13px 27px -5px",
                                                    "rgba(0, 0, 0, 0.3) 0px 8px 16px -8px ")
                                            } : {}}
                                        >
                                            <label className="control-label" htmlFor="price-all">
                                                Tất cả sản phẩm
                                            </label>
                                        </div>
                                        {categories.map((cat, index) => (
                                            <div key={index} onClick={() => getCategoryId(cat.id)}
                                                className="custom-control d-flex align-items-center justify-content-between mb-1 category-items"
                                                style={categoryId === cat.id ? {
                                                    backgroundColor: "#d29c97", color: "#fff", boxShadow: ("rgba(50, 50, 93, 0.25) 0px 13px 27px -5px",
                                                        "rgba(0, 0, 0, 0.3) 0px 8px 16px -8px ")
                                                } : {}}
                                            >
                                                <label className="control-label" >
                                                    {cat.category_name}
                                                </label>
                                            </div>
                                        ))}

                                    </div>
                                </>)
                                : (<></>)}
                        </div>
                    </div>
                    {/* Product End */}
                    {/* Shop Sidebar End */}
                    {/* Shop Product Start */}
                    <div className="col-lg-9 col-md-12">
                        <div className="row pb-3">
                            <div className="col-12 pb-1">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <form className='' style={{ width: "40%" }}>
                                        <div className="input-group ">
                                            <input
                                                type="text"
                                                className="form-control "
                                                placeholder="Tìm kiếm theo tên sản phẩm"
                                                onChange={(e) => setSearchText(e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-transparent text-primary">
                                                    <i className="fa fa-search" />
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                    <div className='d-flex gap-3 align-items-center'>
                                        <div className="btn-group">
                                            <Select
                                                defaultValue="asc"
                                                style={{
                                                    width: 220, height: 40, fontSize: "1rem"
                                                }}
                                                onChange={(value) => setSort(value)}
                                                options={[
                                                    {
                                                        value: "asc",
                                                        label: "Sắp xếp theo giá tăng dần",
                                                    },
                                                    {
                                                        value: "desc",
                                                        label: "Sắp xếp theo giá giảm dần",
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {displayProducts.map((pro, index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-12 pb-1 product-list-item">
                                    <div className="card product-item border-0 mb-4">
                                        <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                            <img
                                                className="img-fluid w-100"
                                                src={pro.image}
                                                alt=""
                                            />
                                        </div>
                                        <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                            <h6 className=" mb-3 px-2" style={{ lineHeight: "1.8rem" }}>{pro.product_name.length > 70 ? (`${(pro.product_name).substring(0, 40)}...`) : (pro.product_name)}</h6>
                                            <div className="d-flex justify-content-center">
                                                {pro.beforeDiscount ? (<> <h6>{formatMoney(pro.price)}</h6>
                                                    <h6 className="text-muted ml-2">
                                                        <del>{formatMoney(pro.beforeDiscount)}</del>
                                                    </h6></>) : (<><h6>{formatMoney(pro.price)}</h6></>)}
                                            </div>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between bg-light border">
                                            <Link to={`/product-detail/${pro.id}`} href="" className=" btn-sm text-dark p-0 ">
                                                <i className="fas fa-eye text-primary mr-1" />
                                                Xem chi tiết
                                            </Link>
                                            <div href="" className="btn btn-sm text-dark p-0" onClick={() => handleAddToCart(pro.id)}>
                                                <i className="fas fa-shopping-cart text-primary mr-1" />
                                                Thêm vào giỏ
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    {/* Shop Product End */}
                    {(totalPages > 1) && (<div className="col-12 pb-1">
                        <div className='text-center mt-4 '>
                            <Pagination current={currentPage}
                                pageSize={pageSize}
                                total={products.length}
                                onChange={handleChangePage}
                            />
                        </div>
                    </div>)}
                </div>
            </div >
            {/* Shop End */}
            <BackToTop />
            < Footer />
        </>
    )
}
