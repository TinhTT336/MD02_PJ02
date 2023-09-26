import React, { useEffect, useState } from 'react'
import CheckUser from './form-add-edit-user/CheckUser';
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveUser, getUser, getUserById } from '../../../redux/useSlice/userSlice';
import { Button, Pagination, Select } from 'antd';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { debounce } from 'lodash';
import { formatDate } from '../../../utils/formatData';

export default function ManagerUser() {
    const [showCheck, setShowCheck] = useState(false);
    const [idCheck, setIdCheck] = useState();
    const [searchText, setSearchText] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [sort, setSort] = useState("desc");

    //ham hien form check
    const handleShowCheck = (id) => {
        setShowCheck(true);
        setIdCheck(id);
    }
    //ham dong form check
    const handleCloseCheck = () => {
        setShowCheck(false);
    }

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data)
    const isLoadingChange = useSelector((state) => state.user.isLoadingChange);

    //ham khoa/mo khoa tai khoan
    useEffect(() => {
        dispatch(getUser({ searchText: "" }))
    }, [isLoadingChange])
    // useEffect(() => {
    //     dispatch(getUser())
    // }, [])

    //ham lay du lieu loc ============================
    const handleChange = (value) => {
        dispatch(getUser({ searchText, sort: value }));
    }

    //goi API lay du lieu tat ca user-tim kiem theo ten
    useEffect(() => {
        const delaySearch = debounce(() => {
            dispatch(getUser({ searchText }));
        }, 500);
        delaySearch();

        return () => {
            delaySearch.cancel();
        };
    }, [searchText]);



    // ham phan trang san pham=========================
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    //tinh vi tri san pham bat dau va ket thuc cua moi trang
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayUser = user.slice(startIndex, endIndex);

    //ham xu ly su kien khi thay doi trang
    const handleChangePage = (page) => {
        setCurrentPage(page);
    }

    return (

        <>
            {showCheck && (<CheckUser handleCloseCheck={handleCloseCheck} idCheck={idCheck} />)}
            <div className='p-5 mb-3'>
                <div className="cart_container mb-4">
                    <h3 > <i className="fas fa-user-tie" /> QUẢN LÝ TÀI KHOẢN</h3>
                </div>
                <div>
                    <div className='d-flex justify-content-between mb-4'>
                        <div className='d-flex  div-search justify-content-between'>
                            <input type="text" name="" id="" placeholder='Tìm kiếm theo tên người dùng'
                                className='p-1 input-search-product' onChange={(e) => setSearchText(e.target.value)}
                                value={searchText} />
                            <button className='py-1 rounded btn-search-product'><i className="fa-solid fa-magnifying-glass fs-4"></i> </button>
                        </div>
                        <div className='d-flex gap-3 align-items-center'>
                            <div className="btn-group">
                                <Select
                                    defaultValue="asc"
                                    style={{
                                        width: 220,
                                    }}
                                    onChange={handleChange}
                                    options={[
                                        {
                                            value: "asc",
                                            label: "Sắp xếp tài khoản từ A-Z",
                                        },
                                        {
                                            value: "desc",
                                            label: "Sắp xếp tài khoản từ Z-A",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='product-content-table'>
                    <table className="table table-hover border table-content ">
                        <thead >
                            <tr >
                                <th scope="col" className='p-3'>STT</th>
                                <th scope="col" className='p-3'>Avatar</th>
                                <th scope="col" className='p-3'>Họ và tên</th>
                                <th scope="col" className='p-3'>Email</th>
                                <th scope="col" className='p-3'>Số điện thoại</th>
                                <th scope="col" className='p-3'>Ngày sinh</th>
                                <th scope="col" className='p-3'>Địa chỉ</th>
                                <th scope="col" className='p-3'>Vai trò</th>
                                <th scope="col" className='p-3'>Trạng thái</th>
                                <th colSpan={2} scope="col" className='p-3'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayUser.map((u, index) => (
                                <tr key={u.id * 100}>
                                    < td className='p-3'> {index + 1}</td>
                                    < td className='p-3'> <img src={u.image} width={45} height={45} className='rounded-circle' alt="" /></td>
                                    <td className='p-3'> {u.fullname}</td>
                                    <td className='p-3'> {u.email}</td>
                                    <td className='p-3'> {u.phone}</td>
                                    <td className='p-3'>{u.dateOfBirth ? (formatDate(u.dateOfBirth)) : (<></>)}</td>
                                    <td className='p-3'>{u.address}</td>
                                    <td className='p-3'>{u.role === 0 ? ("Admin") : ("User")}</td>
                                    < td className='p-3'>{u.active === true ? ("Hoạt động") : ("Bị khoá")}</td>
                                    <td className='p-3' ><button onClick={() => handleShowCheck(u.id)} className='btn border-primary d-flex align-items-center gap-1 justify-content-center'><i className="fa-solid fa-book-open-reader fs-6 text-primary"></i>Xem</button></td>
                                    {u.role === 1 ? (u.active === true ?
                                        (< td className='p-3'><button onClick={() => dispatch(changeActiveUser(u))} className='btn border-danger d-flex align-items-center gap-1 justify-content-center'><i className="fa-solid fa-user-lock fs-6 text-danger"></i>Khoá</button ></td>)
                                        : (< td className='p-3'><button onClick={() => dispatch(changeActiveUser(u))} className='btn border-primary d-flex align-items-center gap-1 justify-content-center'><i className="fa-solid fa-unlock fs-6 text-primary"></i>Mở khoá</button></td>)) : <></>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='text-center mt-5 pagination-wrapper'>
                    {currentPage > 0 && (<Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={user.length}
                        onChange={handleChangePage}
                    />)}
                </div>
            </div>

        </>
    )
}

