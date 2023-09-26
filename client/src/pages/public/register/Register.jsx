import React, { useState } from 'react';
import { Radio, notification } from 'antd';
import "./register1.css";
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../../utils/validateData';
import axios from 'axios';
import instance from '../../../api/axios';

export default function Register() {
    const navigate = useNavigate();

    const [isDisable, setIsDisable] = useState(false);
    // Xử lý sự kiện checked trong ô checkbox (check thi moi duoc dang ky)
    const handleChecked = (e) => {
        setIsDisable(e.target.checked);
    };

    const [fullnameErr, setFullnameErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
    const [userRegister, setUserRegister] = useState({
        email: "",
        password: "",
        fullname: "",
        dateOfBirth: "",
        address: "",
        image: "../../../public/images/avatar.jpeg",
        role: 1,
        active: true
    })
    // ham validate du lieu 
    const validateData = (nameInput, valueInput) => {
        switch (nameInput) {
            case "fullname":
                if (!valueInput) {
                    setFullnameErr("Họ và tên không được để trống")
                } else {
                    setFullnameErr("");
                    break;
                }
            case "email":
                if (!valueInput) {
                    setEmailErr("Email không được để trống")
                } else if (!validateEmail(valueInput)) {
                    setEmailErr("Email không đúng định dạng")
                } else {
                    setEmailErr("");
                    break;
                }
            case "password":
                if (!valueInput) {
                    setPasswordErr("Mật khẩu không được để trống")
                } else if (!validatePassword(valueInput)) {
                    setPasswordErr("Mật khẩu ít nhất 5 ký tự, gồm số, chữ cái và ký tự đặc biệt")
                } else {
                    setPasswordErr("");
                    break;
                }
            case "confirmPassword":
                if (!valueInput) {
                    setConfirmPasswordErr("Vui lòng nhập lại mật khẩu");
                    return;
                } else if (valueInput !== userRegister.password) {
                    setConfirmPasswordErr("Mật khẩu không trùng khớp");
                    return;
                } else {
                    setConfirmPasswordErr("");
                    break;
                }
            default:
                break;
        }
    }

    // ham lay du lieu tu o input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        validateData(name, value);
        setUserRegister({ ...userRegister, [name]: value });
        console.log(userRegister);
    }

    // ham submit la gui du lieu len
    const handleSubmit = (e) => {
        e.preventDefault();
        validateData(userRegister.fullname);
        validateData(userRegister.email);
        validateData(userRegister.password);
        validateData(userRegister.confirmPassword);

        if (userRegister.fullname && userRegister.email && userRegister.password && userRegister.confirmPassword) {
            const newUser = {
                email: userRegister.email,
                password: userRegister.password,
                fullname: userRegister.fullname,
                phoneNumber: userRegister.phoneNumber,
                address: userRegister.address,
                image: "../../../public/images/avatar.jpeg",
                role: 1,
                active: true,
                // cart: []
            }
            console.log(newUser);
            // goi API dang ky
            instance.post("users", newUser)
                .then((response) => {
                    if (response.status === 201) {
                        localStorage.setItem("userRegister", JSON.stringify(newUser));
                        console.log(response.data);
                        // thong bao dang ky thanh cong
                        notification.success({
                            message: "Thông báo:",
                            description: "Đăng ký tài khoản thành công!",
                        })

                        // chuyen trang dang nhap
                        navigate("/login");
                    }
                })
                .catch((error) => {
                    if (error.response.data === "Email already exists") {
                        notification.error({
                            message: "Cảnh báo:",
                            description: "Email đã tồn tại",
                        })
                    } else {
                        notification.error({
                            message: "Cảnh báo:",
                            description: "Lỗi hệ thống"
                        })
                    }
                })
        }

    }

    return (
        <>
            <div className='t-form-container d-flex justify-content-center align-items-center'>
                <div className="form-container-item w-100">
                    <div className="form-container-content d-flex justify-content-center align-items-center">
                        <div className='form-container-left-up'>
                            <div className="form-left-content-up">
                                <h1>Đăng ký</h1>
                                <p>Bạn đã có tài khoản?</p>
                                <Link to={"/login"}> <button className="t-btn btn-signin" >Đăng nhập</button></Link>
                                <div className="d-flex w-100 justify-content-center align-items-center gap-5 fs-3  mt-2 fw-semibold">
                                    <Link to={"/"} className='text-white mt-2 fw-semibold text-color'>Quay lại trang chủ</Link>
                                </div>
                            </div>
                        </div>
                        <div className='form-container-right-up'>
                            <form onSubmit={handleSubmit} className="form-content d-flex flex-column">
                                <div>
                                    <input onChange={handleInputChange} name="fullname" type="text" placeholder="Họ và tên *"
                                        onBlur={handleInputChange} />
                                    {fullnameErr && (<div className='text-danger text-err'>{fullnameErr}</div>)}
                                </div>
                                <div>
                                    <input onChange={handleInputChange} name="email" type="text" placeholder="Email *"
                                        onBlur={handleInputChange} />
                                    {emailErr && (<div className='text-danger text-err'>{emailErr}</div>)}
                                </div>
                                <div>
                                    <input onChange={handleInputChange} name="address" type="text" placeholder="Địa chỉ" />
                                </div>
                                <div>
                                    <input onChange={handleInputChange} name="phoneNumber" type="text" placeholder="Số điện thoại" />
                                </div>
                                <div>
                                    <input onChange={handleInputChange} name="password" type="password" placeholder="Mật khẩu *"
                                        onBlur={handleInputChange} />
                                    {passwordErr && (<div className='text-danger text-err'>{passwordErr}</div>)}
                                </div>
                                <div>
                                    <input onChange={handleInputChange} name="confirmPassword" type="password" placeholder="Nhập lại mật khẩu *"
                                        onBlur={handleInputChange} />
                                    {confirmPasswordErr && (<div className='text-danger text-err'>{confirmPasswordErr}</div>)}
                                </div>
                                <div className="form-check form-check-inline d-flex align-items-center justify-content-center mt-1 mb-1">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="inlineCheckbox1"
                                        value="option1"
                                        onChange={handleChecked}
                                    />
                                    <label className="form-check-label" htmlFor="inlineCheckbox1" style={{ fontSize: 14 }}>
                                        Bạn có đồng ý với <a href="#" className='text-primary'>điều khoản</a> của chúng tôi?
                                    </label>
                                </div>
                                <button type='submit' disabled={!isDisable} className="t-btn btn-register">Đăng ký</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
