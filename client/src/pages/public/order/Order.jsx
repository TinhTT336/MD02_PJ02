import React, { useEffect, useState } from 'react'
import HeaderCopy from '../../../components/user/header/HeaderCopy'
import Banner from '../../../components/user/banner/Banner'
import Footer from '../../../components/user/footer/Footer'
import axios from 'axios';
import { Button, Modal } from 'antd';
import { formatMoney } from '../../../utils/formatData';
import instance from '../../../api/axios';
import BackToTop from '../../../components/base/backToTop/BackToTop';

export default function Order({ title, cartLength }) {
    const [orders, setOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState();
    const [open, setOpen] = useState(false);
    const [idDetail, setIdDetail] = useState();
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));

    //kiem tra va hien thi trang thai don hang
    const handleStatusCodeOrder = (statusCode) => {
        switch (statusCode) {
            case 1:
                return `Đang chờ xác nhận`
            case 2:
                return ` Đã xác nhận`
            case 3:
                return ` Đã huỷ`
        }
    }

    //lay tat ca order tren DB ve================================================================
    const getOrder = async () => {
        try {
            const orderDB = await instance.get("orders");
            //tim kiem tat ca cac don hang cua useLogin
            const userLoginOrder = orderDB.data.filter(c => c.userId === userLogin.id);
            // console.log(userLoginOrder);
            setOrders(userLoginOrder)
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getOrder()
    }, [])

    //mo modal chi tiet don hang================================
    const handleShowModal = async (id) => {
        try {
            setOpen(true);
            const response = await instance.get(`orders/${id}`);
            setOrderDetail(response.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    //ham dong modal
    const handleCloseModal = () => {
        setOpen(false);
    }

    //ham huy don hang - neu status -1
    const handleCancelOrder = async (id) => {
        try {
            // orderDetail.status === 3;
            const response = await instance.put(`orders/${id}`, {
                ...orderDetail,
                status: 3
            });
            console.log("cancel: ", orderDetail);
            // console.log(response.data);
            setOrderDetail({ ...orderDetail, status: 3 });
            getOrder();

            //sau khi huy don hang thi phai tang so luong ton kho tuong ung cua cac san pham trong order
            await Promise.all(
                orderDetail.cart.map(async (item) => {
                    console.log(item.productId);
                    //kiem tra vi tri cua tung san pham o gio hang nguoi dung trong mang products tren DB=>giam so luong tuong ung so luong mua
                    const products = await instance.get("products");
                    const indexProduct = products.data.findIndex(p => p.id === item.productId);
                    console.log(indexProduct);
                    //tang so luong ton kho tuong ung so luong san pham trong order huy
                    products.data[indexProduct].stock += item.quantity;
                    console.log(products.data[indexProduct]);
                    // console.log(product);
                    //cap nhat du lieu len DB
                    await instance.put(`products/${item.productId}`, products.data[indexProduct]);
                    return { ...item }
                })
            )
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {/* Modal xem chi tiet don hang */}
            <Modal
                // title="Chi tiết đơn hàng"
                centered
                open={open}
                onOk={() => handleCloseModal()}
                onCancel={handleCloseModal}
                width={900}
                footer={<>
                    {/* {orderDetail?.status === 1 ? (
                        <> <button className='bg-danger py-2 rounded btn-action me-2 text-white' onClick={handleCancelOrder}> Huỷ đơn hàng</button>
                            <button className='bg-secondary py-2 rounded btn-action' onClick={handleCloseModal}>Đóng</button></>
                    ) : (<button className='bg-secondary' onClick={handleCloseModal}>Đóng</button>)} */}
                    <button className='bg-secondary py-2 px-3 rounded btn-action' onClick={handleCloseModal}>Đóng</button>
                </>
                }
            >
                {orderDetail && (
                    <div>
                        <h3 className='text-center'>Chi tiết đơn hàng</h3>
                        <hr />
                        <div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                    <h6>Tổng quan đơn hàng</h6>
                                    <div className='d-flex'>
                                        <div className='d-flex flex-column me-1 gap-2'>
                                            <span>Mã đơn hàng: </span>
                                            <span>Ngày đặt hàng: </span>
                                            <span>Trạng thái đơn hàng: </span>
                                        </div>
                                        {orderDetail && (
                                            <div className='d-flex flex-column gap-2'>
                                                <span>{orderDetail.id}</span>
                                                <span>{orderDetail.order_at}</span>
                                                <span>{handleStatusCodeOrder(orderDetail.status)}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* <div>
                                    <h6>Thông tin đặt hàng</h6>
                                    <div className='d-flex'>
                                        <div className='d-flex flex-column me-1 gap-2'>
                                            <span>Người đặt hàng: </span>
                                            <span>Email: </span>
                                            <span>Số điện thoại: </span>
                                        </div>
                                        {orderDetail && (
                                            <div className='d-flex flex-column gap-2'>
                                                <span>{orderDetail.userLogin.fullname}</span>
                                                <span>{orderDetail.userLogin.email}</span>
                                                <span>{orderDetail.userLogin.phoneNumber}</span>
                                            </div>
                                        )}
                                    </div>
                                </div> */}
                                <div>
                                    <h6>Thông tin nhận hàng</h6>
                                    <div className='d-flex'>
                                        <div className='d-flex flex-column me-1 gap-2'>
                                            <span>Người nhận hàng: </span>
                                            <span>Địa chỉ nhận hàng: </span>
                                            <span>Số điện thoại: </span>
                                        </div>
                                        {orderDetail && (
                                            <div className='d-flex flex-column me-3 gap-2'>
                                                <span>{orderDetail.userOrder.fullname}</span>
                                                <span>{orderDetail.userOrder.address}</span>
                                                <span>{orderDetail.userOrder.phoneNumber}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='mt-2 fw-bolder text-decoration-underline'>
                                {orderDetail?.userOrder?.note && (
                                    <p>Ghi chú đơn hàng: <span className=' fst-italic'>{orderDetail.userOrder.note}</span> </p>
                                )}
                            </div>

                            <table className="table table-hover mt-4 ">
                                <thead>
                                    <tr className='bg-secondary'>
                                        <th scope="col">#</th>
                                        <th scope="col">Hình ảnh</th>
                                        <th scope="col">Sản phẩm</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderDetail ? (orderDetail.cart.map((order, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td><img src={order.datas.image} alt="" width={36} height={36} /></td>
                                            <td>{order.datas.product_name}</td>
                                            <td>{formatMoney(order.datas.price)}</td>
                                            <td>{order.quantity}</td>
                                            <td>{formatMoney(order.datas.price * order.quantity)}</td>
                                        </tr>
                                    ))) : (<></>)}
                                    <tr>
                                        <th scope="row" colSpan="4">Tổng giá trị đơn hàng</th>
                                        <th colSpan="2">{orderDetail.totalPrice && (formatMoney(orderDetail.totalPrice))}</th>
                                    </tr>

                                </tbody>
                            </table>

                        </div>

                    </div>
                )}
            </Modal>

            <HeaderCopy cartLength={cartLength} />
            <Banner title={title} />
            <div className="container-fluid pt-5 mt-4">
                <div className="row px-xl-5">
                    <div className=" table-responsive mb-5">
                        <table className="table table-bordered text-center mb-0 table-hover" >
                            <thead className=" text-dark card-header ">
                                <tr>
                                    <th>#</th>
                                    <th>Mã đơn hàng</th>
                                    <th>Ngày đặt hàng</th>
                                    <th>Giá trị đơn hàng</th>
                                    <th>Trạng thái đơn hàng</th>
                                    <th>Chi tiết đơn hàng</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {orders && orders.length > 0 ?
                                    (orders.map((o, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{o.id}</td>
                                            <td>{o.order_at}</td>
                                            <td>{o.totalPrice && (formatMoney(o.totalPrice))}</td>
                                            <td>{handleStatusCodeOrder(o.status)}</td>
                                            <td><button className='p-2 rounded bg-secondary btn-action ' onClick={() => handleShowModal(o.id)}><i className="fa-solid fa-circle-info"></i>  Xem chi tiết</button></td>
                                            <td>{o.status === 1 ? (<button onClick={() => handleCancelOrder(o.id)} className='p-2 rounded bg-danger btn-action text-white'> &times; Huỷ đơn hàng</button>) : (<></>)}</td>
                                        </tr>
                                    ))
                                    ) :
                                    (<><tr><td colSpan={7}>Chưa có đơn hàng nào</td></tr></>)}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <BackToTop />
            <Footer />
        </>
    )
}
