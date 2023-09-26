import React from 'react'

export default function StayUpdate() {
    return (
        <div className="container-fluid bg-secondary ">
            <div className="row justify-content-md-center py-1 px-xl-5">
                <div className=" col-12 py-4 d-flex w-full justify-content-between align-items-center">
                    <div className="mb-2 pb-2">
                        <h2 className=" mb-3">
                            <span className="bg-secondary ">Nhận bản tin làm đẹp</span>
                        </h2>
                        <p>
                            Đừng bỏ lỡ hàng ngàn sản phẩm và khuyến mãi siêu hấp dẫn
                        </p>
                    </div>
                    <form className='w-50'>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control border-white p-4"
                                placeholder="Điền email của bạn"
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary px-4">Đăng ký</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
