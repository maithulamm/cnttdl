import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { RiEdit2Line } from 'react-icons/ri';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { toastTrigger, swalTimeOut } from '../../utils/trigger/swal';
import { upperFLText, shortFileName, convertStrToSlug } from '~/utils/prefunction/convertString';
import { countFileSize } from '~/utils/prefunction/convertNumeric';
import { toolbar } from '~/contexts/ckeditor';
import './formsLayout.css';

//? Global variables
const baseURL = process.env.REACT_APP_API_URL;
const pathFileUpload = 'api/cnttdl/file/uploadfile';

export const NewPostForm = ({ placeholder, userData }) => {
    //? postData: state to store data of new post
    const [postData, setPostData] = useState({
        title: '',
        slug: '',
        description: '',
        content: '',
        category: '',
        thumbnail: '',
        createdBy: upperFLText(userData.name),
        posterAvatar: userData.avatar,
        status: '',
    });
    //? fileUploadPreview: state to store file upload preview
    const [fileUploadPreview, setFileUploadPreview] = useState(null);
    //? editorRef: reference to CKEditor
    const editorRef = useRef();
    const navigate = useNavigate();

    //* Functions for this COMPONENT
    // Handle submit form
    const handleSubmit = (type) => {
        // precheck before submit
        const precheck = checkValidValueForm();
        if (precheck) {
            // handle update the value of thumbnail before submit then call API --> See more in handleUpdateThumbnail()
            handleUpdateThumbnail(type);
        }
    };
    // Handle update thumbnail before submit
    const handleUpdateThumbnail = (postPub) => {
        // Call API to upload thumbnail then call API to create new post
        callAPIUploadThumbnail(fileUploadPreview, postPub);
    };
    // Check valid value of form
    const checkValidValueForm = () => {
        if (!postData.title) {
            document.getElementById('post_title').focus();
            toastTrigger('Vui lòng nhập tiêu đề bài viết', 'error');
            return false;
        }
        if (!postData.description) {
            document.getElementById('post_description').focus();
            toastTrigger('Vui lòng nhập mô tả bài viết', 'error');
            return false;
        }
        let wordCount = postData.description.split(' ').length;
        if (wordCount > 120) {
            document.getElementById('post_description').focus();
            toastTrigger('Mô tả bài viết không được quá 150 ký tự', 'error');
            return false;
        }
        if (!postData.content) {
            toastTrigger('Vui lòng nhập nội dung bài viết', 'error');
            return false;
        }
        if (!postData.category || postData.category === 'Chọn danh mục') {
            toastTrigger('Vui lòng chọn danh mục bài viết', 'error');
            return false;
        }
        if (!fileUploadPreview) {
            toastTrigger('Vui lòng chọn ảnh đại diện cho bài viết', 'error');
            return false;
        }
        return true;
    };

    //TODO: API Call API function
    const callAPICreateNewPost = async (postData, a, pub) => {
        postData.thumbnail = a;
        if (pub === 'publish') {
            postData.status = 'published';
        } else if (pub === 'draft') {
            postData.status = 'draft';
        }
        await axios
            .post(`${baseURL}/api/cnttdl/blog/create`, postData)
            .then((res) => {
                swalTimeOut({
                    type: 'success',
                    message: 'Thêm mới bài viết thành công!',
                    funcMess: 'Chuyển hướng đến trang quản lý bài viết...',
                    func: () => {
                        navigate('/admin/posts');
                    },
                });
            })
            .catch((error) => {
                console.log(error);
                toastTrigger('Thêm mới bài viết thất bại! Vui lòng liên hệ kỹ thuật', 'error');
            });
    };
    //TODO: API Call API to upload thumbnail
    const callAPIUploadThumbnail = async (file, isPublish) => {
        const body = new FormData();
        body.append('photo', file);
        await axios
            .post(`${baseURL}/${pathFileUpload}`, body)
            .then((res) => {
                // set state of thumbnail then call API to create new post
                setPostData({ ...postData, thumbnail: res.data.linkUri });
                // call API to create new post with thumbnail (res.data.linkUri) and other data (postData)
                callAPICreateNewPost(postData, res.data.linkUri, isPublish);
            })
            .catch((error) => {
                console.log(error);
                toastTrigger('Tải ảnh lên thất bại! Vui lòng liên hệ bộ phận CNTT để được hỗ trợ.', 'error');
            });
    };

    //! Upload Adapter for CKEditor ==> Example Code - Start here
    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append('photo', file);
                        axios
                            .post(`${baseURL}/${pathFileUpload}`, body)
                            .then((res) => {
                                resolve({
                                    default: `${baseURL}/${res.data.linkUri}`,
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                                reject('Tải ảnh lên thất bại! Vui lòng liên hệ bộ phận CNTT để được hỗ trợ.');
                            });
                    });
                });
            },
            abort: () => {
                console.log('Upload aborted');
            },
        };
    }
    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }
    //! Upload Adapter for CKEditor ==> Example Code - End here
    useEffect(() => {
        // dependency: postData (to check if postData has been updated for re-rendering)
    }, [postData]);

    return (
        <div className="newpost-form_container">
            <Container fluid className="pt-4">
                <Row>
                    <Col>
                        <h4 className="d-flex align-items-center first-title">
                            <span>
                                <RiEdit2Line /> {postData.title ? postData.title : 'Bài viết mới'}{' '}
                            </span>
                        </h4>
                    </Col>
                </Row>
                <Row className="justify-content-end">
                    <Col xs="auto" className="pe-1">
                        <button
                            type="submit"
                            className="btn btn-primary fw-bold mx-1"
                            onClick={(e) => handleSubmit('publish')}
                        >
                            Hoàn thành
                        </button>
                    </Col>
                    <Col xs="auto" className="ps-1">
                        <button
                            className="btn btn-outline-primary fw-bold float-end mx-1"
                            onClick={(e) => handleSubmit('draft')}
                        >
                            Lưu nháp
                        </button>
                    </Col>
                </Row>
                <form>
                    <Row className="mt-3">
                        <Col lg={7} md={12} sm={12}>
                            {/* Tiêu đề bài viết  */}
                            <div className="form-group mt-2">
                                <label htmlFor="post_title" className="input-title required-field">
                                    Tiêu đề bài viết:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="post_title"
                                    placeholder="Nhập tiêu đề bài viết..."
                                    spellCheck="false"
                                    onChange={(e) =>
                                        setPostData({
                                            ...postData,
                                            title: e.target.value,
                                            slug: convertStrToSlug(e.target.value),
                                        })
                                    }
                                />
                            </div>
                            {/* Mô tả bài viết */}
                            <div className="form-group mt-2">
                                <label htmlFor="post_description" className="input-title required-field">
                                    Mô tả bài viết: <span className="fw-normal">(tối đa 120 từ)</span>
                                </label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="post_description"
                                    spellCheck="false"
                                    placeholder="Mô tả bài viết..."
                                    rows="2"
                                    onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                                />
                            </div>
                            {/* Nội dung bài viết */}
                            <div className="form-group mt-2">
                                <label htmlFor="post-content" className="input-title required-field">
                                    Nội dung bài viết:
                                </label>
                                <CKEditor
                                    config={{
                                        extraPlugins: [uploadPlugin],
                                        removePlugins: ['MediaEmbedToolbar'],
                                        toolbar: toolbar,
                                    }}
                                    editor={Editor}
                                    ref={editorRef}
                                    data={placeholder ? placeholder : '<p>...</p>'}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setPostData({ ...postData, content: data });
                                    }}
                                />
                            </div>
                        </Col>
                        <Col lg={5} md={12} sm={12}>
                            {/* Slug  */}
                            <div className="form-group mt-2">
                                <label htmlFor="post_slug" className="input-title">
                                    Slug bài viết:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="post_slug"
                                    placeholder="Slug bài viết được tạo tự động từ tiêu đề...(có thể chỉnh sửa)"
                                    spellCheck="false"
                                    value={postData.slug}
                                    onChange={(e) => setPostData({ ...postData, slug: e.target.value })}
                                />
                            </div>
                            {/* Danh mục bài viết */}
                            <div className="form-group mt-2">
                                <label className="input-title required-field">Danh mục bài viết</label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={(e) => setPostData({ ...postData, category: e.target.value })}
                                >
                                    <option selected>Chọn danh mục</option>
                                    <option value="bieumau">Biểu mẫu</option>
                                    <option value="thongbaosv">Thông báo - Sinh viên</option>
                                    <option value="thongbaogv">Thông báo - Giảng viên</option>
                                    <option value="tailieu">Tài liệu hay (Góc chia sẻ)</option>
                                </select>
                            </div>
                            {/* Ảnh bài viết */}
                            <div className="form-group mt-2">
                                <label className="input-title required-field">
                                    Ảnh bài viết <span className="fw-normal">(tối đa 5MB)</span>
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="post-title"
                                    // ref={fileupload}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setFileUploadPreview(file);
                                    }}
                                />
                                {/* File Preview */}
                                <div className="preview-file-content">
                                    {fileUploadPreview && (
                                        <img src={URL.createObjectURL(fileUploadPreview)} alt="Uploaded Content" />
                                    )}
                                </div>
                                <Row className="justify-content-center">
                                    {fileUploadPreview ? (
                                        <span className="col-auto pt-2">
                                            <strong>Tên File: </strong> {shortFileName(fileUploadPreview.name)}
                                            <br />
                                            <strong>Kích thước:</strong> {countFileSize(fileUploadPreview.size)}
                                        </span>
                                    ) : (
                                        <i className="w-100 text-start col" style={{ color: 'gray' }}>
                                            Không có ảnh/file nào được chọn
                                        </i>
                                    )}
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </form>
            </Container>
        </div>
    );
};
