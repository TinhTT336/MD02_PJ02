import React from 'react'
import Footer from '../../../components/user/footer/Footer'
import Banner from '../../../components/user/banner/Banner'
import HeaderWithNavbar from '../../../components/user/header/HeaderWithNavbar'
import HeaderCopy from '../../../components/user/header/HeaderCopy';
import "./blog.css";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import BackToTop from '../../../components/base/backToTop/BackToTop';

export default function Blog({ title, cartLength }) {
    return (
        <>
            {/* <HeaderWithNavbar /> */}
            <HeaderCopy cartLength={cartLength} />
            <Banner title={title} />
            <section className="blog spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="blog__item">
                                <div
                                    className="blog__item__pic large__item set-bg-1"

                                />
                                <div className="blog__item__text">
                                    <h6>
                                        <Link to={"https://biocosmetics.vn/giai-phap/son-moi-la-gi-nhung-kien-thuc-ve-son-can-biet.html"}>
                                            Son môi là gì? Những kiến thức về son cần biết!
                                        </Link>
                                    </h6>
                                    <ul>
                                        <li>
                                            <span>Tmestics</span>
                                        </li>
                                        <li>21/09/2023</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="blog__item">
                                <div
                                    className="blog__item__pic set-bg-2"
                                />
                                <div className="blog__item__text">
                                    <h6>
                                        <Link to={"https://vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/lam-dep/cac-thanh-phan-cua-son-moi/"}>
                                            Các thành phần của son môi...
                                        </Link>
                                    </h6>
                                    <ul>
                                        <li>
                                            <span>Tmestics</span>
                                        </li>
                                        <li>21/09/2023</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="blog__item">
                                <div
                                    className="blog__item__pic set-bg-3"
                                />
                                <div className="blog__item__text">
                                    <h6>
                                        <Link to={"https://www.bachhoaxanh.com/kinh-nghiem-hay/ban-da-biet-cach-phan-biet-cac-loai-son-moi-thong-1137581"}>
                                            Bạn đã biết cách phân biệt các loại son môi thông dụng hiện nay chưa?...
                                        </Link>
                                    </h6>
                                    <ul>
                                        <li>
                                            <span>Tmestics</span>
                                        </li>
                                        <li>21/09/2023</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="blog__item">
                                <div
                                    className="blog__item__pic set-bg-4"
                                />
                                <div className="blog__item__text">
                                    <h6>
                                        <Link to={"https://www.happyskin.vn/cach-doc-thanh-phan-cua-son-moi"}>
                                            Bí mật của các thành phần trong một thỏi son môi...
                                        </Link>
                                    </h6>
                                    <ul>
                                        <li>
                                            <span>Tmestics</span>
                                        </li>
                                        <li>21/09/2023</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="blog__item">
                                <div
                                    className="blog__item__pic set-bg-5"
                                    data-setbg="img/blog/blog-4.jpg"
                                />
                                <div className="blog__item__text">
                                    <h6>
                                        <Link to={"https://vietcetera.com/vn/son-moi-lien-quan-gi-den-thay-doi-tam-trang"}>
                                            Son môi liên quan gì đến thay đổi tâm trạng? ...
                                        </Link>
                                    </h6>
                                    <ul>
                                        <li>
                                            <span>Tmestics</span>
                                        </li>
                                        <li>21/09/2023</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="blog__item">
                                <div
                                    className="blog__item__pic set-bg-6"
                                    data-setbg="img/blog/blog-8.jpg"
                                />
                                <div className="blog__item__text">
                                    <h6>
                                        <Link to={"https://www.elle.vn/xu-huong-lam-dep/son-moi-tot-va-cau-noi-bat-hu"}>
                                            17 CÂU NÓI HAY VÀ BẤT HỦ VỀ SON MÔI TRONG LỊCH SỬ NGÀNH LÀM ĐẸP...
                                        </Link>
                                    </h6>
                                    <ul>
                                        <li>
                                            <span>Tmestics</span>
                                        </li>
                                        <li>21/09/2023</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="blog__item">
                                <div
                                    className="blog__item__pic set-bg-7"
                                    data-setbg="img/blog/blog-10.jpg"
                                />
                                <div className="blog__item__text">
                                    <h6>
                                        <Link to={"https://knbeauty.net/chi-voi-mot-thoi-son-moi-ban-co-the-lam-nhung-gi/"}>
                                            CHỈ VỚI MỘT THỎI SON MÔI BẠN CÓ THỂ LÀM NHỮNG GÌ..
                                        </Link>
                                    </h6>
                                    <ul>
                                        <li>
                                            <span>Tmestics</span>
                                        </li>
                                        <li>21/09/2023</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="blog__item">
                                <div
                                    className="blog__item__pic set-bg-8"
                                />
                                <div className="blog__item__text">
                                    <h6>
                                        <Link to={"https://beautybox.com.vn/blogs/cach-trang-diem/sau-khi-phun-moi-co-danh-son-duoc-khong"}>
                                            Giải đáp thắc mắc: Sau khi phun môi có đánh son được không?...
                                        </Link>
                                    </h6>
                                    <ul>
                                        <li>
                                            <span>Tmestics</span>
                                        </li>
                                        <li>21/09/2023</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="blog__item">
                                <div
                                    className="blog__item__pic set-bg-9"
                                    data-setbg="img/blog/blog-5.jpg"
                                />
                                <div className="blog__item__text">
                                    <h6>
                                        <Link to={"https://juno.vn/blogs/dep/1000093133-chi-trong-son-khong-phai-la-nguyen-nhan-gay-tham-moi"}>
                                            Chì trong son không phải là nguyên nhân gây thâm môi!...
                                        </Link>
                                    </h6>
                                    <ul>
                                        <li>
                                            <span>Tmestics</span>
                                        </li>
                                        <li>21/09/2023</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="blog__item">
                                <div
                                    className="blog__item__pic large__item set-bg-10"
                                    data-setbg="img/blog/blog-6.jpg"
                                />
                                <div className="blog__item__text">
                                    <h6>
                                        <Link to={"https://polangflower.vn/1001-su-that-ve-son-duong-moi-chong-nang"}>
                                            1001 Sự Thật Về Son Dưỡng Môi Chống Nắng...
                                        </Link>
                                    </h6>
                                    <ul>
                                        <li>
                                            <span>Tmestics</span>
                                        </li>
                                        <li>21/09/2023</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 text-center">
                            <a href="#" className="primary-btn load-btn">
                                Xem thêm
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <BackToTop />
            <Footer />
        </>

    )
}
