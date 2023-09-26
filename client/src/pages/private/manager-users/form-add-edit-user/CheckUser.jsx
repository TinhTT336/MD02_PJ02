import { Radio, Image } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveUser, getUser } from '../../../../redux/useSlice/userSlice';

export default function CheckUser({ handleCloseCheck, idCheck }) {
    const [user, setUser] = useState({})
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.data)
    const isLoadingChange = useSelector(state => state.user.isLoadingChange)

    // //ham lay du lieu tu o input
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, gender: gender })
    }

    //lay thong tin san pham theo id
    // const getUserById = () => {
    //     const user = users.find(u => u.id === idCheck)
    //     setUser(user);
    //     // console.log(user);
    // }
    // useEffect(() => {
    //     getUserById()
    // }, [])

    //cach 2:
    const findUser = users.find(u => u.id === idCheck);
    useEffect(() => {
        setUser(findUser)
    }, [])

    //===========================================
    //ham khoa/mo khoa tai khoan
    useEffect(() => {
        dispatch(getUser())
    }, [isLoadingChange])


    return (
        <>
            <div className='form-container-admin-crud' style={{ width: "450" }}>
                <form className='p-4' >
                    <h3>Thông tin người dùng</h3>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="fullname">Họ và tên</label>
                        <input type="text" name="fullname" id="fullname" onChange={handleChangeInput}
                            value={user.fullname} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="image">Avatar</label>
                        <img src={findUser.image} width={30} height={30} className='rounded' />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" onChange={handleChangeInput} value={user.email} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="phoneNumber">Số điện thoại</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" onChange={handleChangeInput} value={user.phoneNumber} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="address">Địa chỉ</label>
                        <input type="text" name="address" id="address" onChange={handleChangeInput} value={user.address} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="dateOfBirth">Ngày sinh</label>
                        <input type="text" name="dateOfBirth" id="dateOfBirth" onChange={handleChangeInput} value={user.dateOfBirth} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="role">Vai trò</label>
                        <input type="text" name="role" id="role" onChange={handleChangeInput} value={user.role === 0 ? "Admin" : "User"} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="active">Trạng thái</label>
                        <input type="text" name="active" id="active" onChange={handleChangeInput} value={user.active === true ? "Hoạt động" : "Bị khoá"} />
                    </div>
                    <div className='d-flex justify-content-end gap-2 mt-2'>
                        <button className='btn-form-admin bg-secondary' onClick={handleCloseCheck}><i className="fa-solid fa-xmark  "></i> Huỷ bỏ</button>
                        {user.role === 1 ? (user.active === true ?
                            (<><button className='btn-form-admin btn-add-product bg-danger' onClick={() => dispatch(changeActiveUser(user))}><i className="fa-solid fa-user-lock  "></i>  Khoá tài khoản</button></>)
                            : (<><button className='btn-form-admin btn-add-product' onClick={() => dispatch(changeActiveUser(user))}><i className="fa-solid fa-unlock  "></i>  Mở khoá tài khoản</button></>)) : (<></>)}
                    </div>
                </form>
            </div>
        </>
    )

}
