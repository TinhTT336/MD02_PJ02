import React, { useEffect, useState } from 'react'
import HeaderWithNavbar from '../../../components/user/header/HeaderWithNavbar'
import Banner from '../../../components/user/banner/Banner'
import Footer from '../../../components/user/footer/Footer'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { formatMoney } from '../../../utils/formatData';
import "./productDetail.css";
import { Rate } from 'antd'
import HeaderCopy from '../../../components/user/header/HeaderCopy';
import BackToTop from '../../../components/base/backToTop/BackToTop'
import { ToastContainer, toast } from 'react-toastify'
import instance from '../../../api/axios';

export default function ProductDetail({ title, cartLength, setIsLoadCartLength }) {
    const { id } = useParams();//lay param tren url
    const [product, setProduct] = useState({});
    const [listProduct, setListProduct] = useState([]);
    const [carts, setCarts] = useState([]);
    const [cartLocal, setCartLocal] = useState(JSON.parse(localStorage.getItem("cartLocal")) || []);
    // const [cartLocal, setCartLocal] = useState();

    const navigate = useNavigate();

    // Nội dung của toast message
    const notify = () =>
        toast.success("Đã thêm sản phẩm vào giỏ hàng.", {
            position: "top-right",
        });
    const notifyLogin = () =>
        toast.warning("Vui lòng đăng nhập để mua hàng", {
            position: "top-right",
        });

    //lay thong tin san pham qua id de hien thi chi tiet san pham================================================================
    const getProductById = () => {
        instance.get(`products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.log(error))
    }
    useEffect(() => {
        getProductById()
    }, [])

    //hien thi san pham lien quan =================================================================
    const getRelatedProducts = () => {
        instance.get(`products?_start=10&_limit=4 `)
            .then(response => setListProduct(response.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getRelatedProducts()
    }, [])

    //lay du lieu cart tren gio hang ve================================================================
    const getAllCarts = () => {
        instance.get("carts")
            .then(response => setCarts(response.data))
            .catch(error => console.log(error))
    }
    useEffect(() => {
        getAllCarts();
    }, [])

    //ham addToCart============================================================
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    const handleAddToCart = async (id) => {
        // if (userLogin) {
        try {
            if (userLogin) {
                //tim kiem gio hang cua nguoi dung
                const userCart = carts.find(c => c.userId === userLogin.id);
                // console.log(userCart);
                //neu nguoi dung da co gio hang
                if (userCart) {
                    //kiem tra xem san pham da co trong gio hang chua
                    const existedProduct = userCart.cartDetails.find(p => p.productId === id);
                    //neu san pham da co trong gio hang thi tang so luong len 1
                    if (existedProduct) {
                        existedProduct.quantity += 1;
                        // notify();
                    }
                    //neu san pham chua co trong gio hang thi them vao gio hang
                    else {
                        userCart.cartDetails.push({
                            productId: id,
                            quantity: 1
                        })

                    }
                    //cap nhat gio hang len server
                    await instance.put(`carts/${userCart.id}`, userCart)
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
            } else {
                notifyLogin();
                navigate("/login");
            }

        }
        catch (error) {
            console.log(error);
        }
        // } else {
        //     notifyLogin();
        //     navigate("/login");
        // }
    }

    return (
        <>
            {/* <HeaderWithNavbar /> */}
            <HeaderCopy cartLength={cartLength} />
            <Banner title={title} />
            <ToastContainer />

            {/* Shop Detail Start */}
            <div className="container-fluid py-5">
                <div className="row px-xl-5">
                    <div className="col-lg-5 pb-5">
                        <div
                            id="product-carousel"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            <div className="carousel-inner border">
                                <div className="carousel-item active">
                                    <img
                                        className="img-product-detail"
                                        src={product.image}
                                        alt="Image"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        className="img-product-detail"
                                        src={product.image}
                                        alt="Image"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        className="img-product-detail"
                                        src={product.image}
                                        alt="Image"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        className="w-100 h-100 img-product-detail"
                                        src={product.image}
                                        alt="Image"
                                    />
                                </div>
                            </div>
                            <a
                                className="carousel-control-prev"
                                href="#product-carousel"
                                data-slide="prev"
                            >
                                <i className="fa fa-2x fa-angle-left text-dark" />
                            </a>
                            <a
                                className="carousel-control-next"
                                href="#product-carousel"
                                data-slide="next"
                            >
                                <i className="fa fa-2x fa-angle-right text-dark" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-7 pb-5">
                        <h3 className="font-weight-semi-bold">{product.product_name}</h3>
                        <div className="d-flex mb-2">
                            <div className="text-primary mr-2">
                                <small className="fas fa-star" />
                                <small className="fas fa-star" />
                                <small className="fas fa-star" />
                                <small className="fas fa-star-half-alt" />
                                <small className="far fa-star" />
                            </div>
                            {/* <small className="pt-1">(50  Đánh giá)</small> */}
                        </div>
                        <div className="d-flex mb-3 me-6 justify-content-start gap-6">
                            <div className='me-5'>
                                <p className="text-dark font-weight-medium mb-0 mr-3 mb-2">Tình trạng: <span className='font-weight-light'>còn hàng</span></p>
                                <p className="text-dark font-weight-medium mb-0 mr-3 mb-2">Thương hiệu: <span className='font-weight-light'>{product.brand}</span></p>
                            </div>
                            <div style={{ width: 1, height: "50px", border: "1px solid #444" }}></div>
                            <div className='ms-5'>
                                <p className="text-dark font-weight-medium mb-0 mr-3 mb-2">Xuất xứ: <span className='font-weight-light'>{product.from}</span></p>
                                {/* <p className="text-dark font-weight-medium mb-0 mr-3 mb-2">Dòng sản phẩm: <span className='font-weight-light'>Trang điểm mắt</span></p> */}
                            </div>
                        </div>
                        <div className='d-flex gap-4 align-items-baseline'>
                            <h3 className="font-weight-semi-bold mb-4">{formatMoney(product.price)}</h3>
                            <p><del>{product.beforeDiscount ? (formatMoney(product.beforeDiscount)) : (<></>)}</del></p>
                        </div>
                        <div className="d-flex align-items-center mb-4 pt-2">
                            <button className="btn btn-primary px-3 rounded" onClick={() => handleAddToCart(product.id)}>
                                <i className="fa fa-shopping-cart mr-1" /> Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row px-xl-5">
                    <div className="col">
                        <div className="nav nav-tabs justify-content-center border-secondary mb-4">
                            <span
                                className="nav-item nav-link active"
                                data-toggle="tab"
                                href="#tab-pane-1"
                            >
                                Thông tin sản phẩm
                            </span>
                            <span className="nav-item nav-link" data-toggle="tab" href="#tab-pane-2">
                                Hướng dẫn sử dụng
                            </span>
                            {/* <span className="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">
                                Đánh giá(0)
                            </span> */}
                        </div>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="tab-pane-1">
                                <h4 className="mb-3">Thông tin sản phẩm</h4>
                                <p>
                                    {product.description}
                                </p>
                            </div>
                            <div className="tab-pane fade" id="tab-pane-2">
                                <h4 className="mb-3">Hướng dẫn sử dụng</h4>
                                <p>
                                    {product.usage}
                                </p>
                            </div>
                            {/* <div className="tab-pane fade" id="tab-pane-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4 className="mb-4">1 đánh giá cho "Colorful Stylish Shirt"</h4>
                                        <div className="media mb-4">
                                            <img
                                                src="img/user.jpg"
                                                alt="Image"
                                                className="img-fluid mr-3 mt-1"
                                                style={{ width: 45 }}
                                            />
                                            <div className="media-body">
                                                <h6>
                                                    John Doe
                                                    <small>
                                                        {" "}
                                                        - <i>01 Jan 2045</i>
                                                    </small>
                                                </h6>
                                                <div className="text-primary mb-2">
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star-half-alt" />
                                                    <i className="far fa-star" />
                                                </div>
                                                <p>
                                                    Diam amet duo labore stet elitr ea clita ipsum, tempor
                                                    labore accusam ipsum et no at. Kasd diam tempor rebum
                                                    magna dolores sed sed eirmod ipsum.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h4 className="mb-4">Đánh giá</h4>
                                        <div className="d-flex my-3">
                                            <p className="mb-0 mr-2">Đánh giá của bạn * :</p>
                                            <Rate allowHalf defaultValue={4.5} />;
                                        </div>
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="message">Để lại lời nhắn *</label>
                                                <textarea
                                                    id="message"
                                                    cols={30}
                                                    rows={5}
                                                    className="form-control"
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="name">Họ và tên *</label>
                                                <input type="text" className="form-control" id="name" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email *</label>
                                                <input type="email" className="form-control" id="email" />
                                            </div>
                                            <div className="form-group mb-0">
                                                <input
                                                    type="submit"
                                                    value="Gửi"
                                                    className="btn btn-primary px-3"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Shop Detail End */}
            {/* Products Start */}
            <div className="container-fluid py-5">
                <div className="text-center mb-4">
                    <h2 className="section-title px-5">
                        <span className="px-2">Sản phẩm tương tự</span>
                    </h2>
                </div>
                <div className="col-lg-9 col-md-12">
                    <div className="row pb-3 ms-2">
                        <div className="d-flex align-items-center justify-content-between mb-4 ">
                            {listProduct.map((pro, index) => (
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
                                            <h6 className=" mb-3 px-2" style={{ lineHeight: "1.8rem" }}>{pro.product_name.length > 60 ? (`${(pro.product_name).substring(0, 40)}...`) : (pro.product_name)}</h6>
                                            <div className="d-flex justify-content-center">
                                                {pro.beforeDiscount ? (<> <h6>{formatMoney(pro.price)}</h6>
                                                    <h6 className="text-muted ml-2">
                                                        <del>{formatMoney(pro.beforeDiscount)}</del>
                                                    </h6></>) : (<><h6>{formatMoney(pro.price)}</h6></>)}
                                            </div>
                                        </div>
                                        <div className="card-footer d-flex justify-content-center bg-light border">
                                            <Link to={`/product-detail/${pro.id}`} className=" btn-sm text-dark p-0 ">
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
                </div>
            </div>
            {/* Products End */}
            <BackToTop />
            <Footer />
        </>
    )
}
