import React, { useState } from 'react';
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../../utils/validateData';
import axios from 'axios';
import { notification } from 'antd';
import { auth, provider } from '../../../firebase/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import instance from '../../../api/axios';

export default function Login() {
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        "email": "",
        "password": "",
        "fullname": "",
        "phoneNumber": "",
        "dateOfBirth": "",
        "address": "",
        "image": "",
        "role": 1,
        "active": true,

    })
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // ham validate du lieu form login
    const validateData = (nameInput, valueInput) => {
        switch (nameInput) {
            case "email":
                if (!valueInput) {
                    setEmailError("Email không được để trống");
                } else if (!validateEmail(valueInput)) {
                    setEmailError("Email không đúng định dạng");
                } else {
                    setEmailError("");
                }
                break;
            case "password":
                if (!valueInput) {
                    setPasswordError("Mật khẩu không được để trống");
                } else if (!validatePassword(valueInput)) {
                    setPasswordError("Mật khẩu tối thiểu 5 ký tự, gồm số, chữ cái và ký tự đặc biệt");
                } else {
                    setPasswordError("");
                }
                break;
            default:
                break;
        }
    }

    // ham lay du lieu tu  o input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        validateData(name, value);
        setUserLogin({ ...userLogin, [name]: value });
        // console.log(userLogin);
    }

    // ham submit va check validation form login
    const handleSubmit = (e) => {
        e.preventDefault();
        validateData("email", userLogin.email);
        validateData("password", userLogin.password);
        if (userLogin.email && userLogin.password) {
            const newUser = {
                ...userLogin,
                email: userLogin.email,
                password: userLogin.password,
            }
            //goi API dang nhap
            instance.post("login", { ...newUser })
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem("userLogin", JSON.stringify(response.data.user));
                        // chuyen trang
                        if (response.data.user.active === true) {
                            if (response.data.user.role === 0) {
                                navigate("/admin/home")
                                notification.success({
                                    message: "Thành công!",
                                    description: "Đăng nhập thành công vào trang quản trị"
                                })
                                // localStorage.setItem("userLoginAdmin", JSON.stringify(response.data.user));
                            } else if (response.data.user.role === 1) {
                                navigate("/");
                                notification.success({
                                    message: "Thành công!",
                                    description: "Đăng nhập thành công vào Trang chủ"
                                })
                                // localStorage.setItem("userLogin", JSON.stringify(response.data.user));
                            }
                        } else {
                            notification.warning({
                                message: "Thông báo:",
                                description: "Tài khoản đang bị khoá, vui lòng liên hệ Quản trị viên"
                            })
                        }
                    }
                })
                .catch((error) => {
                    if (error.response.data === "Cannot find user" || error.response.data === "Incorrect password") {
                        notification.error({
                            message: "Cảnh báo",
                            description: "Mật khẩu hoặc Email không đúng.",
                        });
                    }
                })
        }
    }

    // Đăng nhập với google
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((response) => {
                const userLocal = {
                    email: response.user.email,
                    fullname: response.user.displayName,
                    image: response.user.photoURL,
                    id: response.user.uid,
                    role: 1,
                    active: true,
                    phoneNumber: response.user.phoneNumber || "",
                    address: response.user.address || "",
                    dateOfBirth: response.user.dateOfBirth || "",
                };
                console.log(response.user);
                instance.get("users")
                    .then(response => {
                        // console.log(response.data);
                        const user = response.data.find(u => u.id === userLocal.id);
                        console.log(user);
                        if (user === undefined) {
                            instance.post(`users`, userLocal);
                            // Lưu thông tin lên local
                            localStorage.setItem("userLogin", JSON.stringify(userLocal));
                            // Chuyển hướng về trang home
                            navigate("/");
                            notification.success({
                                message: "Thành công!",
                                description: "Đăng nhập thành công vào Trang chủ"
                            })
                        } else {
                            if (userLocal.active & userLocal.role === 1) {
                                // Lưu thông tin lên local
                                localStorage.setItem("userLogin", JSON.stringify(userLocal));
                                // Chuyển hướng về trang home
                                navigate("/");
                                notification.success({
                                    message: "Thành công!",
                                    description: "Đăng nhập thành công vào Trang chủ"
                                })
                            }
                        }
                    })
                    .catch(error => console.log(error))
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='form-container-login d-flex justify-content-center align-items-center'>
            <div className="form-container-item w-100">
                <div className="form-container-content d-flex justify-content-center align-items-center">
                    <div className='form-container-left-in'>
                        <div className="form-left-content-in">
                            <h1>Đăng nhập</h1>
                            <p className="mb-2">Bạn chưa có tài khoản?</p>
                            <Link to={"/register"}><button className="t-btn btn-signin" >Đăng ký</button></Link>
                        </div>
                    </div>
                    <div className='form-container-right-in'>
                        <form className="form-content d-flex flex-column" onSubmit={handleSubmit}>
                            <div>
                                <input name="email" type="text" placeholder="Email *" onChange={handleInputChange} onBlur={handleInputChange} />
                                {emailError && (<div className='text-danger text-err'>{emailError}</div>)}
                            </div>
                            <div>
                                <input name="password" type="password" placeholder="Mật khẩu *" onChange={handleInputChange} onBlur={handleInputChange} />
                                {passwordError && (<div className='text-danger text-err'>{passwordError}</div>)}
                            </div>
                            <div className='w-100 mt-2'><button className="t-btn btn-signup mt-5">Đăng nhập</button></div>
                            <div className="d-flex justify-content-center align-items-center gap-5 mt-2 text-color">
                                <Link to={"/forgot-pasword"} className=' fst-italic text-dark'>Quên mật khẩu?</Link>
                                <Link to={"/"} className='fst-italic text-dark'>Quay lại trang chủ</Link>

                            </div>
                            <div className='text-center my-3'>
                                <span className=''>Hoặc</span>
                            </div>
                            <div className='login-with-gg w-100 '>
                                <button onClick={signInWithGoogle} type='button' className='t-btn btn-signin-gg mb-3' style={{ width: "80%" }}>
                                    <img height={20} width={20} className='me-2 rounded-circle'
                                        src="https://pbs.twimg.com/profile_images/1605297940242669568/q8-vPggS_400x400.jpg" alt="" />
                                    Đăng nhập với Google</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
