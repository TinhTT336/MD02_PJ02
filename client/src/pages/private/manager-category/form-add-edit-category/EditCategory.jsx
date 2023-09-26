import React from 'react'

export default function EditCategory({ handleCloseEdit, idEdit }) {
    return (
        <>
            <div className='form-container-admin-crud'>
                <form className='p-4' >
                    <h3>Cập nhật danh mục</h3>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="category_name">Danh mục</label>
                        <input type="text" name="category_name" id="category_name" />
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="category_image">Hình ảnh</label>
                        <input type="file" name="category_image" id="category_image" />
                        <img src='' />
                    </div>
                    {/* <div className='d-flex justify-content-between align-items-center'>
                        <label htmlFor="description">Mô tả danh mục</label>
                        <textarea type="text" name="description" id="description" />
                    </div> */}
                    <div className='d-flex justify-content-end gap-2 mt-2'>
                        <button onClick={handleCloseEdit} className='btn-form-admin bg-secondary'><i className="fa-solid fa-xmark"></i> Huỷ bỏ</button>
                        <button className='btn-form-admin btn-add-product'><i className="fa-solid fa-plus"></i> Cập nhật</button>
                    </div>
                </form>
            </div>
        </>
    )
}
