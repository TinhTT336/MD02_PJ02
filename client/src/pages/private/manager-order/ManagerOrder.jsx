import React, { useEffect, useState } from 'react'
import { Button, Modal, Pagination, Select } from 'antd';
import axios from 'axios';
import { formatMoney } from '../../../utils/formatData';
import "./managerOrder.css";
import instance from '../../../api/axios';
import { debounce } from 'lodash';

export default function ManagerOrder() {
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState();
    const [searchText, setSearchText] = useState("");
    const [sort, setSort] = useState("desc");

    //kiem tra va hien thi trang thai don hang
    const handleStatusCodeOrder = (statusCode) => {
        switch (statusCode) {
            case 1:
                return (<><span className='text-secondary'>Đang chờ xác nhận </span></>)
            case 2:
                return (<><span className='text-primary'>Đã xác nhận </span></>)
            case 3:
                return (<><span className='text-danger'>Đã huỷ </span></>)
        }
    }



    //lay tat ca order tren DB ve - ket hop tim kiem+loc
    const getOrder = async () => {
        try {
            const orderDB = await instance.get(`orders?_sort=totalPrice&_order=${sort}&status_like=${searchText}`);
            setOrders(orderDB.data)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const delaySearch = debounce(getOrder, 500);
        delaySearch();
        return () => {
            delaySearch.cancel()
        }
    }, [sort, searchText]);

    useEffect(() => {
        getOrder()
    }, [])

    //mo modal chi tiet don hang
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
            await instance.patch(`orders/${id}`, {
                status: 3
            });
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
                    // console.log(products.data[indexProduct]);
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

    //ham xac nhan don hang - neu status=1
    const handleAccept = async (id) => {
        try {
            await instance.patch(`orders/${id}`, {
                status: 2
            });
            setOrderDetail({ ...orderDetail, status: 2 });
            getOrder();
        }
        catch (err) {
            console.log(err);
        }
    }

    //ham xoa don hang da huy================================
    const handleDeleteOrder = async (id) => {
        try {
            await instance.delete(`orders/${id}`);
            // setOrderDetail({});
            getOrder();
        }
        catch (err) {
            console.log(err);
        }
    }

    //phan trang================================================================
    // ham phan trang san pham
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);

    //tinh vi tri san pham bat dau va ket thuc cua moi trang
    const totalPage = orders.length / pageSize;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const listOrder = orders.slice(startIndex, endIndex);
    //ham xu ly su kien khi thay doi trang
    const handleChangePage = (page) => {
        setCurrentPage(page);
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
                footer={
                    <><button className='py-2 px-4 rounded' onClick={handleCloseModal}>Đóng</button></>
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
                                                <span>{orderDetail?.userOrder?.fullname}</span>
                                                <span>{orderDetail?.userOrder?.address}</span>
                                                <span>{orderDetail?.userOrder?.phoneNumber}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='mt-2 fw-bolder text-decoration-underline'>
                                {orderDetail && (
                                    <p >Người đặt hàng: <span className=' fst-italic'>{orderDetail?.userLogin?.fullname}</span> - ID: <span className=' fst-italic' >{orderDetail?.userLogin?.id}</span> </p>
                                )}
                            </div>
                            <div className='mt-2 fw-bolder text-decoration-underline'>
                                {orderDetail?.userOrder?.note && (
                                    <p>Ghi chú đơn hàng: <span className=' fst-italic'>{orderDetail?.userOrder?.note}</span> </p>
                                )}
                            </div>

                            <table className="table table-hover mt-4 ">
                                <thead>
                                    <tr className='' style={{ backgroundColor: "#efefef" }}>
                                        <th scope="col">#</th>
                                        <th scope="col">Hình ảnh</th>
                                        <th scope="col">Sản phẩm</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderDetail ? (orderDetail?.cart?.map((order, index) => (
                                        <tr>
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
            <div className='p-5 mb-3'>
                <div className="cart_container mb-4">
                    <h3 > <i className="bi bi-cart-check" /> QUẢN LÝ ĐƠN HÀNG</h3>
                </div>
                <div>
                    <form className='d-flex justify-content-between mb-4'>
                        <div className='d-flex  div-search w-50 justify-content-between'>
                            <input type="text" name="" id="" placeholder='Tìm kiếm theo trạng thái đơn hàng (1/2/3)'
                                onChange={(e) => setSearchText(e.target.value)}
                                className=' input-search-product w-100' style={{ fontSize: "8" }} />
                            <button className='py-1 rounded btn-search-product'><i className="fa-solid fa-magnifying-glass fs-4 "></i> </button>
                        </div>
                        <div className='d-flex gap-3 align-items-center'>
                            <div className="btn-group">
                                <Select
                                    defaultValue="asc"
                                    style={{
                                        width: 300, height: 40, fontSize: "1rem"
                                    }}
                                    onChange={(value) => setSort(value)}
                                    options={[
                                        {
                                            value: "asc",
                                            label: "Sắp xếp theo giá trị đơn hàng tăng dần",
                                        },
                                        {
                                            value: "desc",
                                            label: "Sắp xếp theo giá trị đơn hàng giảm dần",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div className='product-content-table'>
                    <table className="table table-hover table-content ">
                        <thead >
                            <tr >
                                <th scope="col" className='p-3'>#</th>
                                <th scope="col" className='p-3'>Mã đơn hàng</th>
                                <th scope="col" className='p-3'>Ngày tạo đơn hàng</th>
                                <th scope="col" className='p-3'>Tổng tiền</th>
                                <th scope="col" className='p-3'>Trạng thái đơn hàng</th>
                                <th scope="col" className='p-3'>Chi tiết đơn hàng</th>
                                <th scope="col" className='p-3'> Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOrder && listOrder.length > 0 ?
                                (listOrder.map((o, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{o.id}</td>
                                        <td>{o.order_at}</td>
                                        <td>{o.totalPrice && (formatMoney(o.totalPrice))}</td>
                                        <td>{handleStatusCodeOrder(o.status)}</td>
                                        <td><button className='p-2 rounded ' onClick={() => handleShowModal(o.id)}><i className="fa-solid fa-circle-info"></i>  Xem chi tiết</button></td>
                                        {/* <td>{o.status === 1 ? (<><button onClick={() => handleAccept(o.id)} className='p-2 rounded bg-primary text-white btn-action'> Xác nhận đơn hàng</button> <button onClick={() => handleCancelOrder(o.id)} className='p-2 rounded bg-danger text-white btn-action'>  Huỷ đơn hàng</button></>) : (<></>)}</td> */}
                                        <td>
                                            {o.status === 1 ? (
                                                <>
                                                    <button onClick={() => handleAccept(o.id)} className='p-2 rounded bg-primary text-white btn-action me-2'> Xác nhận đơn hàng</button>
                                                    <button onClick={() => handleCancelOrder(o.id)} className='p-2 rounded bg-danger text-white btn-action'> Huỷ đơn hàng</button>
                                                </>
                                            ) : (
                                                o.status === 3 ? (
                                                    <>
                                                        <button onClick={() => handleDeleteOrder(o.id)} className='p-2 rounded bg-warning text-white btn-action'> Xoá đơn hàng</button>
                                                    </>
                                                ) : (
                                                    <></>
                                                )
                                            )}
                                        </td>

                                    </tr>
                                ))
                                ) :
                                (<><tr><td colSpan={6}>Chưa có đơn hàng nào</td></tr></>)}
                        </tbody>
                    </table>
                </div>
                {(totalPage > 1) && (<Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={orders.length}
                    onChange={handleChangePage}
                    className='pagination-wrapper'
                />)}
            </div>

        </>
    )
}
