import React from 'react';
import { useDispatch } from 'react-redux';

export default function AddCategory({ handleCloseAdd }) {
    const formRef = useRef();
    const dispatch = useDispatch();
    const handleAdd = (value) => {

    }
    return (
        <>
            <div className='form-container-admin-crud'>
                <form className='p-4' >
                    <h3>Thêm mới danh mục</h3>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="category_name">Danh mục</label>
                        <input type="text" name="category_name" id="category_name  ref={formRef}" />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="category_image">Hình ảnh</label>
                        <input type="file" name="category_image" id="category_image" />
                        <img src='' />
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
