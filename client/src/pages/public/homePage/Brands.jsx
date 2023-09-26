import React from 'react';
import Slider from "react-slick";


export default function Brands() {
    // const settings = {
    //     className: "center",
    //     infinite: true,
    //     centerPadding: "60px",
    //     slidesToShow: 5,
    //     swipeToSlide: true,
    //     afterChange: function (index) {
    //         console.log(
    //             `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    //         );
    //     }
    // };
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    return (
        <>
            <div className='py-5 w-full brand-container'>
                <div className="text-center mb-4">
                    <h2 className="section-title px-5 text-center">
                        <span className="px-2">Thương hiệu nổi bật</span>
                    </h2>
                </div>
                <Slider {...settings} className='brand-slide'>
                    <div className='slide-item'>
                        <img src="https://spartavity.pl/files/2023-06/1686134139_mac-cosmetics-logo.png" alt="" />
                    </div>
                    <div className='slide-item'>
                        <img src="https://storage.googleapis.com/twg-content/images/loreal-paris-builds-brand-love-with-search_ca.width-1200.jpg" alt="" />
                    </div>
                    <div className='slide-item'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3s_p4MY_trxSMyysKKF5LWPitYhfcO6PozQ&usqp=CAU" alt="" />
                    </div >
                    <div className='slide-item'>
                        <img src="https://file.hstatic.net/1000036599/file/666e_056e5032f2ed4d4798a92c852e848b2c.png" alt="" />
                    </div>
                    <div className='slide-item'>
                        <img src="https://brademar.com/wp-content/uploads/2022/10/Innisfree-Logo-PNG.png" alt="" />
                    </div>
                    <div className='slide-item'>
                        <img src="https://hacosmetic.vn/wp-content/uploads/2022/02/obagi_logo_nen-trong-suot.png" alt="" />
                    </div>
                </Slider>
            </div>
        </>



    )
}
