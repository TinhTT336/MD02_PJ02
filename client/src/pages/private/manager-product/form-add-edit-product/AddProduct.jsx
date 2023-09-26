import React, { useState, useEffect } from 'react';
import "./addProduct.css";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getAllProducts } from '../../../../redux/useSlice/ManagerProductSlice';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../../firebase/firebaseConfig';
import { Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getAllCategory, getCategory } from '../../../../redux/useSlice/categorySlice';

export default function AddProduct({ handleCloseAdd }) {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.data);
    console.log(categories);
    const [product, setProduct] = useState({});

    useEffect(() => {
        dispatch(getAllCategory()) // ========
    }, [])// dung form can su dung useEffect, neu khong load lai trang la mat du lieu

    //lay du lieu tu o option
    const handleChangeSelect = (value) => {
        setProduct({ ...product, category_id: value })
    }

    //lay du lieu tu o input
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product, [name]: value
        });
    }

    const [imageURL, setImageURL] = useState(null);
    // console.log("imageURL", imageURL);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProduct({ ...product, image: imageURL }));
        dispatch(getAllProducts({ searchText: "" }))
        handleCloseAdd();
    }

    //up anh len firebase================================================
    //   // Tạo một them chiếu đến thư mục chưa kho ảnh trên firebase
    const imageListRef = ref(storage, "users/");

    // Props của Upload
    const props = {
        name: "file",
        headers: {
            authorization: "authorization-text",
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                // Lấy đường dẫn của ảnh sau khi hoàn tất quá trình tải
                const downloadURL = info.file.response.url;
                // Lưu đường dẫn vào trong một state
                setImageURL(downloadURL);
                // Hiển
                // message.success("Tải lên hình ảnh thành công.");
            } else if (info.file.status === "error") {
                message.error("Tải lên hình ảnh thất bại.");
            }
        },
        customRequest: async ({ file, onSuccess, onError }) => {
            try {
                // Tạo một tham chiếu đến kho ảnh trên firebase
                const imageRef = ref(imageListRef, file.name);

                // Tải ảnh lên firebase
                await uploadBytes(imageRef, file);

                // Lấy url từ firebase về sau khi upload thành công
                const downloadURL = await getDownloadURL(imageRef);

                onSuccess({ url: downloadURL });
            } catch (error) {
                onError(error);
            }
        },
    };

    return (
        <>
            <div className='form-container-admin-crud'>
                <form className='p-4' onSubmit={handleSubmit}>
                    <h3>Thêm mới sản phẩm</h3>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="image">Hình ảnh</label>
                        {/* <input type="file" name="image" id="image" onChange={handleChangeInput} /> */}
                        <div className="text-start mt-2">
                            <Upload {...props} className='ms-4'>
                                <img src={imageURL} alt="" width={40} height={40} className='rounded-circle' />
                                <Button icon={<UploadOutlined />}>Tải hình ảnh</Button>
                            </Upload>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="product_name">Sản phẩm</label>
                        <input type="text" name="product_name" id="product_name" onChange={handleChangeInput} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="stock">Tồn kho</label>
                        <input type="text" name="stock" id="stock" onChange={handleChangeInput} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="price">Giá bán</label>
                        <input type="text" name="price" id="price" onChange={handleChangeInput} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="beforeDiscount">Giá gốc</label>
                        <input type="text" name="beforeDiscount" id="beforeDiscount" onChange={handleChangeInput} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="brand">Thương hiệu</label>
                        <input type="text" name="brand" id="brand" onChange={handleChangeInput} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="from">Xuất xứ</label>
                        <input type="text" name="from" id="from" onChange={handleChangeInput} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="category_id">Danh mục sản phẩm</label>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Chọn danh mục"
                            optionFilterProp="children"
                            options={
                                categories.map((item) => ({ value: item.id, label: item.category_name }))
                            }
                            onChange={handleChangeSelect}
                            name="category_id"
                            value={product.category_id}
                        />
                    </div>

                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="description">Mô tả sản phẩm</label>
                        <textarea type="text" name="description" id="description" onChange={handleChangeInput} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="usage">Cách sử dụng</label>
                        <textarea type="text" name="usage" id="usage" onChange={handleChangeInput} />
                    </div>
                    <div className='d-flex justify-content-end gap-2 mt-2'>
                        <button onClick={handleCloseAdd} className='btn-form-admin bg-secondary'><i className="fa-solid fa-xmark"></i> Huỷ bỏ</button>
                        <button className='btn-form-admin btn-add-product'><i className="fa-solid fa-plus"></i> Thêm mới</button>
                    </div>
                </form>
            </div>
        </>
    )
}
