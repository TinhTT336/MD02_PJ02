import React, { useEffect, useState } from 'react';
import "./managerProduct.css";
import { useDispatch, useSelector } from 'react-redux';
import AddProduct from './form-add-edit-product/AddProduct';
import EditProduct from './form-add-edit-product/EditProduct';
import { Image, Modal, Pagination, Select } from 'antd';
import { formatMoney } from '../../../utils/formatData';
import { debounce } from 'lodash';
import { deleteProductById, getAllProducts } from '../../../redux/useSlice/ManagerProductSlice';

export default function ManagerProduct() {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [idEdit, setIdEdit] = useState();
    const [idDelete, setIdDelete] = useState();
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [sort, setSort] = useState("esc")

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.data);
    const isLoadingChange = useSelector((state) => state.products.isLoadingChange);
    // console.log(products);
    //================================================================
    //ham hien form add
    const handleShowAdd = () => {
        setShowAdd(true);
    }
    //ham dong form add
    const handleCloseAdd = () => {
        setShowAdd(false);
    }

    //ham hien form edit
    const handleShowEdit = (id) => {
        setShowEdit(true);
        setIdEdit(id);
    }
    //ham dong form edit
    const handleCloseEdit = () => {
        setShowEdit(false);
    }
    //=========================================================
    //lay thong tin tat ca san pham
    useEffect(() => {
        dispatch(getAllProducts());
    }, [isLoadingChange]);

    //========================================================
    //lay thong tin trong o select-option loc san pham
    const handleChange = (value) => {
        dispatch(getAllProducts({ searchText, sort: value }));
    }

    //========================================================
    //tim kiem san pham va cai dat do tre
    useEffect(() => {
        const delaySearch = debounce(() => {
            dispatch(getAllProducts({ searchText }))
        }, 500);
        delaySearch();
        return () => {
            delaySearch.cancel()
        };
    }, [searchText])

    //xoa========================================================
    // ham hien modal xac nhan xoa
    const handleShowModalDelete = (id) => {
        setIdDelete(id)
        setIsModalOpenDelete(true);
    };
    const handleOkDelete = () => {
        dispatch(deleteProductById(idDelete))
        dispatch(getAllProducts({ searchText: "" }));// =========
        setIdDelete()
        setIsModalOpenDelete(false);
    };
    const handleCancelDelete = () => {
        setIdDelete()
        setIsModalOpenDelete(false);
    };

    //ham show more thong tin===================================================
    const [showFullInfo, setShowFullInfo] = useState(false);

    const toggleShowFullInfo = () => {
        setShowFullInfo(!showFullInfo);
    };

    //phan trang================================================================
    // ham phan trang san pham
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);

    //tinh vi tri san pham bat dau va ket thuc cua moi trang
    const totalPage = products.length / pageSize;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const listProduct = products.slice(startIndex, endIndex);
    //ham xu ly su kien khi thay doi trang
    const handleChangePage = (page) => {
        setCurrentPage(page);
    }

    return (
        <>
            {/* Modal xoa*/}
            <Modal title="Xoá sản phẩm" open={isModalOpenDelete} onOk={handleOkDelete} onCancel={handleCancelDelete}>
                <p>Bạn có chắc chắn muốn xoá không?</p>
            </Modal>

            {showAdd && (<AddProduct handleCloseAdd={handleCloseAdd} />)}
            {showEdit && (<EditProduct handleCloseEdit={handleCloseEdit} idEdit={idEdit} />)}
            <div className='p-5 mb-3'>
                <div className="cart_container mb-4">
                    <h3 > <i className="bi bi-bag-check" /> QUẢN LÝ SẢN PHẨM</h3>
                </div>
                <div>
                    <div className='d-flex justify-content-between mb-4'>
                        <div className='d-flex  div-search justify-content-between'>
                            <input type="text" name="" id="" placeholder='Tìm kiếm theo tên sản phẩm'
                                className='p-1 input-search-product' onChange={(e) => setSearchText(e.target.value)}
                                value={searchText} />
                            <button className='py-1 rounded btn-search-product'><i className="fa-solid fa-magnifying-glass fs-4 "></i> </button>
                        </div>
                        <div className='d-flex gap-3 align-items-center'>
                            <div><button className='py-2 px-4 rounded btn-add-product' onClick={handleShowAdd} type="button"><i className="fa-solid fa-plus"></i> Thêm mới</button></div>
                            <div className="btn-group">
                                <Select
                                    defaultValue="asc"
                                    style={{
                                        width: 220, height: 40
                                    }}
                                    onChange={handleChange}
                                    options={[
                                        {
                                            value: "asc",
                                            label: " Sắp xếp theo giá tăng dần",
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
                <div className='product-content-table'>
                    <table className="table table-hover table-content ">
                        <thead >
                            <tr >
                                <th scope="col" className='p-3'>STT</th>
                                <th scope="col" className='p-3'>Hình ảnh</th>
                                <th scope="col" className='p-3'>Sản phẩm</th>
                                <th scope="col" className='p-3'>Tồn kho</th>
                                <th scope="col" className='p-3'>Giá bán</th>
                                <th scope="col" className='p-3'>Giá gốc</th>
                                <th scope="col" className='p-3'>Thương hiệu</th>
                                <th scope="col" className='p-3'>Xuất xứ</th>
                                <th scope="col" className='p-3'>Danh mục SP</th>
                                <th scope="col" className='p-3'>Mô tả sản phẩm</th>
                                <th scope="col" className='p-3'>Cách sử dụng</th>
                                <th colSpan={2} scope="col" className='p-3'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listProduct.map((product, index) => (
                                <tr key={product.id * 101}>
                                    <td className='p-3'> {index + 1}</td>
                                    < td className='p-3'> <Image src={product.image} alt="" width={36} height={36} className='rounded-circle' /></td>
                                    <td className='p-3'>
                                        {product.product_name && typeof product.product_name === 'string' && product.product_name.length > 20 ? (
                                            <span>
                                                {showFullInfo ? product.product_name : `${product.product_name.substring(0, 20)}`}
                                                <span
                                                    className="clickable-text ms-2"
                                                    onClick={toggleShowFullInfo}
                                                >
                                                    {showFullInfo ? '(ẩn)' : ' ...'}
                                                </span>
                                            </span>
                                        ) : (
                                            product.product_name
                                        )}
                                    </td>
                                    <td scope="col" className='p-3'>{product.stock}</td>
                                    <td className='p-3' >{formatMoney(product.price)}</td>
                                    {product.beforeDiscount ? (<td className='p-3' >{formatMoney(product.beforeDiscount)}</td>) : (<><td></td></>)}
                                    <td className='p-3'>{product.brand}</td>
                                    <td className='p-3'>{product.from}</td>
                                    < td className='p-3'>{product.category_id}</td>
                                    <td className='p-3'>
                                        {product.description && typeof product.description === 'string' && product.description.length > 20 ? (
                                            <span>
                                                {showFullInfo ? product.description : `${product.description.substring(0, 20)}`}
                                                <span
                                                    className="clickable-text ms-2"
                                                    onClick={toggleShowFullInfo}
                                                >
                                                    {showFullInfo ? '(ẩn)' : ' ...'}
                                                </span>
                                            </span>
                                        ) : (
                                            product.description
                                        )}
                                    </td>
                                    {/* <td className='p-3'>{product.usage && typeof product.usage === 'string' && product.usage.length > 20 ? `${product.usage.substring(0, 20)}...` : product.usage}</td> */}
                                    <td className='p-3'>
                                        {product.usage && typeof product.usage === 'string' && product.usage.length > 20 ? (
                                            <span>
                                                {showFullInfo ? product.usage : `${product.usage.substring(0, 20)}`}
                                                <span
                                                    className="clickable-text ms-2"
                                                    onClick={toggleShowFullInfo}
                                                >
                                                    {showFullInfo ? '(ẩn)' : ' ...'}
                                                </span>
                                            </span>
                                        ) : (
                                            product.usage
                                        )}
                                    </td>
                                    <td className='p-3' ><i onClick={() => handleShowEdit(product.id)} className="fa-solid fa-pen-to-square text-warning fs-4"></i></td>
                                    < td className='p-3' ><i onClick={() => handleShowModalDelete(product.id)} className="fa-solid fa-trash text-danger fs-4"></i></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {(totalPage > 1) && (<Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={products.length}
                    onChange={handleChangePage}
                    className='pagination-wrapper'
                />)}
            </div>
        </>
    )
}
