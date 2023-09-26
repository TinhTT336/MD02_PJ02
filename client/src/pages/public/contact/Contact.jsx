import React from 'react'
import Footer from '../../../components/user/footer/Footer'
import HeaderWithNavbar from '../../../components/user/header/HeaderWithNavbar'
import Banner from '../../../components/user/banner/Banner'
import HeaderCopy from '../../../components/user/header/HeaderCopy'
import BackToTop from '../../../components/base/backToTop/BackToTop';

export default function Contact({ title, cartLength }) {
    return (
        <>
            {/* <HeaderWithNavbar /> */}
            <HeaderCopy cartLength={cartLength} />
            <Banner title={title} />
            <div className="container-fluid pt-5">
                <div className="text-center mb-5">
                    <h2 className="section-title px-5">
                        <span className="px-2">Liên hệ với chúng tôi</span>
                    </h2>
                </div>
                <div className="row px-xl-5 d-flex justify-content-evenly mt-4">
                    <div className="col-lg-6 mb-5 w-50">
                        <div className="contact-form">
                            <div id="success" />
                            <form name="sentMessage" id="contactForm" noValidate="novalidate">
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Nhập tên của bạn"
                                        required="required"
                                        data-validation-required-message="Nhập tên của bạn"
                                    />
                                    <p className="help-block text-danger" />
                                </div>
                                <div className="control-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Nhập email của bạn"
                                        required="required"
                                        data-validation-required-message="Please enter your email"
                                    />
                                    <p className="help-block text-danger" />
                                </div>
                                <div className="control-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="subject"
                                        placeholder="Nhập tiêu đề"
                                        required="required"
                                        data-validation-required-message="Please enter a subject"
                                    />
                                    <p className="help-block text-danger" />
                                </div>
                                <div className="control-group">
                                    <textarea
                                        className="form-control"
                                        rows={6}
                                        id="message"
                                        placeholder="Tin nhắn"
                                        required="required"
                                        data-validation-required-message="Please enter your message"
                                        defaultValue={""}
                                    />
                                    <p className="help-block text-danger" />
                                </div>
                                <div>
                                    <button
                                        className="btn-primary py-2 px-5 text-white rounded" style={{ border: "none" }}
                                        type="submit"
                                        id="sendMessageButton"
                                    >
                                        GỬI
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-5 mb-5">
                        {/* <h5 className="font-weight-semi-bold mb-3">Bản đồ đường đi</h5> */}
                        <div className='w-60'>
                            <iframe src="http://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29794.956904401773!2d105.76080973476559!3d21.017891900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455c862f3aee1%3A0x53602e8d02ec1d24!2zVG_DoCBOaMOgIFPDtG5nIMSQw6A!5e0!3m2!1sen!2s!4v1694876036445!5m2!1sen!2s"
                                style={{ border: 0 }} width="550" height="300"></iframe>
                        </div>
                        <div className="d-flex flex-column mb-3 mt-2">
                            <p className="mb-2">
                                <i className="fa fa-map-marker-alt text-primary mr-3" />
                                Toà nhà Sông Đà
                            </p>
                            <p className="mb-2">
                                <i className="fa fa-envelope text-primary mr-3" />
                                info@tmestics.com
                            </p>
                            <p className="mb-2">
                                <i className="fa fa-phone-alt text-primary mr-3" />
                                +012 345 67890
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <BackToTop />
            <Footer />
        </>

    )
}
