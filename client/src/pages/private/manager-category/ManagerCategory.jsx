import React, { useEffect, useMemo, useRef, useState } from 'react'
import AddCategory from './form-add-edit-category/AddCategory';
import EditCategory from './form-add-edit-category/EditCategory';
import { Button, Form, Image, Input, Modal, Pagination, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategoryById, getAllCategory, getCategory, updateCategory } from '../../../redux/useSlice/categorySlice';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebase/firebaseConfig';
import { debounce } from 'lodash';

export default function ManagerCategory() {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [idEdit, setIdEdit] = useState();
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [idDelete, setIdDelete] = useState();
    const [searchText, setSearchText] = useState("");
    const [sort, setSort] = useState("desc");


    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.data);
    // console.log(categories);
    const isLoadingChange = useSelector(state => state.category.isLoadingChange)

    //ham lay du lieu loc ============================
    const handleChange = (value) => {
        dispatch(getCategory({ searchText, sort: value }));
    }

    //goi API lay du lieu tat ca user-tim kiem theo ten
    useEffect(() => {
        const delaySearch = debounce(() => {
            dispatch(getCategory({ searchText }));
        }, 500);
        delaySearch();

        return () => {
            delaySearch.cancel();
        };
    }, [searchText]);

    //ham goi API lay tat ca du lieu
    useEffect(() => {
        dispatch(getAllCategory());
    }, [isLoadingChange])

    // ham hien modal xac nhan xoa
    const handleShowModalDelete = (id) => {
        setIdDelete(id)
        setIsModalOpenDelete(true);
    };
    const handleOkDelete = () => {
        dispatch(deleteCategoryById(idDelete))
        setIdDelete()
        setIsModalOpenDelete(false);
        dispatch(getAllCategory());
    };
    const handleCancelDelete = () => {
        setIdDelete()
        setIsModalOpenDelete(false);
    };

    // add + update =====================================================================================
    const [formRef] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [categoryUpdate, setCatagoryUpdate] = useState({})

    // ========================================================
    const [imageUpload, setImageUpload] = useState(null)
    const [linkImage, setLinkImage] = useState("")

    const handleChoosePhoto = (e) => {
        if (!e.target.files) {
            return
        }
        setImageUpload(e.target.files[0])
        setLinkImage(URL.createObjectURL(e.target.files[0]))
    }
    // ========================================================

    const handleShowModal = (cate) => {
        setCatagoryUpdate(cate)
        if (cate && cate.image) {
            setLinkImage(cate.image)
        }
        formRef.setFieldsValue(cate)
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setCatagoryUpdate()
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        formRef.resetFields()
        setCatagoryUpdate()
        setImageUpload()
        setLinkImage()
        setIsModalOpen(false);
    };
    const onFinish = (values) => {
        if (linkImage == "") {
            message.info("Choose Photo!")
            return
        }
        // update ===========================================
        if (categoryUpdate && categoryUpdate.id) {

            if (categoryUpdate.image.includes("https")) {
                dispatch(updateCategory({
                    ...values,
                    image: linkImage,
                    id: categoryUpdate.id
                }))
                formRef.resetFields()
                handleCancel()
            } else {
                const imageRef = ref(storage, `image/${imageUpload.name}`)
                uploadBytes(imageRef, imageUpload)
                    .then((snapshot) => {
                        getDownloadURL(snapshot.ref)
                            .then((url) => {
                                return {
                                    ...values,
                                    image: url,
                                    id: categoryUpdate.id
                                }
                            })
                            .then((data) => {
                                dispatch(updateCategory(data))
                                handleCancel()
                            })
                            .catch((error) => {
                                message.info(error)
                            })
                    })

            }
            return
        }
        // ============================================================================

        // add ==============================================
        const imageRef = ref(storage, `image/${imageUpload.name}`)
        uploadBytes(imageRef, imageUpload)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        return {
                            ...values,
                            image: url
                        }
                    })
                    .then((data) => {
                        dispatch(addCategory(data))
                        handleCancel()
                    })
                    .catch((error) => {
                        message.info(error)
                    })
            })
    };
    // =======================================================================================================
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // =================================================================
    // ham phan trang san pham
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    //tinh vi tri san pham bat dau va ket thuc cua moi trang
    const totalPage = categories.length / pageSize;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayCategory = categories.slice(startIndex, endIndex);

    //ham xu ly su kien khi thay doi trang
    const handleChangePage = (page) => {
        setCurrentPage(page);
    }

    return (
        <>
            <Modal title="Xoá Danh mục sản phẩm" open={isModalOpenDelete} onOk={handleOkDelete} onCancel={handleCancelDelete}>
                <p>Bạn có chắc chắn muốn xoá không?</p>
            </Modal>

            <Modal title={categoryUpdate ? "Cập nhật danh mục" : "Thêm mới danh mục"} maskClosable={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={<></>}>
                <Form
                    name="basic"
                    form={formRef}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Danh mục"
                        name="category_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", margin: "10px 0 20px 0" }}>
                            <div style={{ margin: "10px 0" }}>
                                <label className='bg-primary rounded p-2 text-white' htmlFor='image_file' >Choose File</label>
                                <input id='image_file' style={{ display: "none" }} type="file" accept=".jpg, .jpeg, .png, .gif" onChange={(e) => handleChoosePhoto(e)} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', flexGrow: 1 }}>
                                <Image width={200} src={linkImage} />
                            </div>
                        </div>

                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            {showAdd && <AddCategory handleCloseAdd={handleCloseAdd} />}
            {showEdit && <EditCategory handleCloseEdit={handleCloseEdit} idEdit={idEdit} />}
            <div className='p-5 mb-3'>
                <div className="cart_container mb-4">
                    <h3 > <i className="bi bi-journal-text" /> QUẢN LÝ DANH MỤC </h3>
                </div>
                <div>
                    <form className='d-flex justify-content-between mb-4'>
                        <div className='d-flex  div-search justify-content-between'>
                            <input type="text" name="" id="" placeholder='Tìm kiếm theo tên danh mục'
                                className='p-1 input-search-product' onChange={(e) => setSearchText(e.target.value)} value={searchText} />
                            <button className='py-1 rounded btn-search-product'><i className="fa-solid fa-magnifying-glass fs-4 "></i> </button>
                        </div>
                        <div className='d-flex gap-3 align-items-center'>
                            <div><button className='py-2 px-4 rounded btn-add-product' onClick={() => handleShowModal()} type="button"><i className="fa-solid fa-plus"></i> Thêm mới</button></div>
                            <div className="btn-group">
                                <Select
                                    defaultValue="asc"
                                    style={{
                                        width: 220, height: 40
                                    }}
                                    onChange={handleChange}
                                    options={[
                                        {
                                            value: "asc",
                                            label: "Sắp xếp theo ID tăng dần",
                                        },
                                        {
                                            value: "desc",
                                            label: "Sắp xếp theo ID giảm dần",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className='product-content-table'>
                    <table className="table table-hover border table-content ">
                        <thead >
                            <tr >
                                <th scope="col" className='p-3'>STT</th>
                                <th scope="col" className='p-3'>ID</th>
                                <th scope="col" className='p-3'>Hình ảnh</th>
                                <th scope="col" className='p-3'>Danh mục</th>
                                <th colSpan={2} scope="col" className='p-3'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayCategory.map((cat, index) => (
                                <tr key={cat.id}>
                                    <td className='p-3'> {index + 1}</td>
                                    <td className='p-3'> {cat.id}</td>
                                    < td className='p-3'><img src={cat.image} width={45} height={45} className='rounded-circle' alt="" /></td>
                                    <td className='p-3'> {cat.category_name}</td>
                                    <td className='p-3' onClick={() => handleShowModal(cat)}><button className='btn rounded border-warning bg-warning text-white'><i className="fa-solid fa-pen-to-square fs-6 me-2"></i>Sửa</button> </td>
                                    < td className='p-3'><button onClick={() => handleShowModalDelete(cat.id)} className='btn rounded border-danger bg-danger text-white'><i className="fa-solid fa-trash  fs-6 me-2"></i> Xoá</button></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                <div className='text-center mt-5 pagination-wrapper'>
                    {(totalPage > 1) && (<Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={categories.length}
                        onChange={handleChangePage}
                    />)}
                </div>
            </div>

        </>
    )
}
