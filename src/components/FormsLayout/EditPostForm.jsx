import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { RiEdit2Line } from 'react-icons/ri';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { toastTrigger, swalTimeOut, swalAskDirect } from '~/utils/trigger/swal';
import { upperFLText, shortFileName, convertStrToSlug, getFileNameFromUri } from '~/utils/prefunction/convertString';
import { countFileSize } from '~/utils/prefunction/convertNumeric';
import { toolbar } from '~/contexts/ckeditor';
import './formsLayout.css';

//? Global variables
const baseURL = process.env.REACT_APP_API_URL;
const pathFileUpload = 'api/cnttdl/file/uploadfile';
const pathRemoveFile = 'api/cnttdl/file/deletefilewithuri';
const pathUpdatePost = 'api/cnttdl/blog/update';

export const EditPostForm = ({ userData, ...postData }) => {
    // ? useParams: get postId from URL
    const { postId } = useParams();
    //? fileUploadPreview: state to store file upload preview
    const [fileUploadPreview, setFileUploadPreview] = useState(null);
    //? fileUploadOldUri: state to store old file upload uri
    const [fileUploadOldUri, setFileUploadOldUri] = useState('');
    //? editorRef: reference to CKEditor
    const editorRef = useRef();
    //? fileupload: reference to file upload input
    const fileupload = useRef(null);
    //? navigate: useNavigate from react-router-dom
    const navigate = useNavigate();

    //? Handle submit form
    const handleSubmit = (type) => {
        // console.log(postData.postDetail);
        // get file upload from input ref
        const precheck = checkValidValueForm();
        if (precheck) {
            if (fileupload.current.files.length > 0) {
                // console.log(fileUploadOldUri);
                callAPIDeleteOldThumbnail(postData.postDetail.thumbnail, type);
            } else {
                callAPIUpdatePost(postData.postDetail, '', type);
            }
        }
    };

    //? Check valid value of form
    const checkValidValueForm = () => {
        if (!postData.postDetail.title) {
            document.getElementById('post_title').focus();
            toastTrigger('Vui lòng nhập tiêu đề bài viết', 'error');
            return false;
        }
        if (!postData.postDetail.description) {
            document.getElementById('post_description').focus();
            toastTrigger('Vui lòng nhập mô tả bài viết', 'error');
            return false;
        }
        let wordCount = postData.postDetail.description.split(' ').length;
        if (wordCount > 120) {
            document.getElementById('post_description').focus();
            toastTrigger('Mô tả bài viết không được quá 150 ký tự', 'error');
            return false;
        }
        if (!postData.postDetail.content) {
            toastTrigger('Vui lòng nhập nội dung bài viết', 'error');
            return false;
        }
        if (!postData.postDetail.category || postData.postDetail.category === 'Chọn danh mục') {
            toastTrigger('Vui lòng chọn danh mục bài viết', 'error');
            return false;
        }
        if (!postData.postDetail.thumbnail && !fileUploadPreview) {
            toastTrigger('Vui lòng chọn ảnh đại diện cho bài viết', 'error');
            return false;
        }
        return true;
    };

    // TODO: Call API handle delete postData thumbnail
    const callAPIDeleteOldThumbnail = async (uri, a) => {
        await axios
            .post(`${baseURL}/${pathRemoveFile}`, {
                src: uri,
            })
            .then((res) => {
                console.log(res);
                callAPIUploadThumbnail(fileUploadPreview, a);
            })
            .catch((error) => {
                console.log(error);
                toastTrigger('Xóa ảnh cũ thất bại! Vui lòng liên hệ bộ phận CNTT để được hỗ trợ.', 'error');
            });
    };

    const callAPIUploadThumbnail = async (file, isPublish) => {
        const body = new FormData();
        body.append('photo', file);
        await axios
            .post(`${baseURL}/${pathFileUpload}`, body)
            .then((res) => {
                callAPIUpdatePost(postData.postDetail, res.data.linkUri, isPublish);
                // call API to create new post with thumbnail (res.data.linkUri) and other data (postData)
            })
            .catch((error) => {
                console.log(error);
                toastTrigger('Tải ảnh lên thất bại! Vui lòng liên hệ bộ phận CNTT để được hỗ trợ.', 'error');
            });
    };

    const callAPIUpdatePost = async (data, thumbnail, isPublish) => {
        if (thumbnail !== '') {
            data.thumbnail = thumbnail;
        }
        if (isPublish) {
            data.status = isPublish;
        }
        await axios
            .put(`${baseURL}/${pathUpdatePost}/${postId}`, data)
            .then((res) => {
                swalAskDirect({
                    message: 'Bạn có muốn quay lại trang quản lý bài viết?',
                    type: 'success',
                    link: () => navigate('/admin/posts'),
                });
            })
            .catch((error) => {
                console.log(error);
                toastTrigger('Cập nhật bài viết thất bại!', 'error');
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
        // console.log('Post Data: ', postData?.postDetail.title);
        setFileUploadOldUri(postData?.postDetail?.thumbnail);
    }, [fileUploadOldUri]);

    return (
        <div className="newpost-form_container">
            <Container fluid className="pt-4">
                <Row>
                    <Col>
                        <h4 className="d-flex align-items-center first-title">
                            <span>
                                <RiEdit2Line />{' '}
                                {postData?.postDetail?.title ? postData?.postDetail?.title : 'Chỉnh sửa bài viết'}
                            </span>
                        </h4>
                    </Col>
                </Row>
                <Row className="justify-content-end">
                    {postData?.postDetail?.status === 'draft' ? (
                        <Fragment>
                            <Col xs="auto" className="pe-1">
                                <button
                                    type="submit"
                                    className="btn btn-primary fw-bold mx-1"
                                    onClick={(e) => handleSubmit()}
                                >
                                    Lưu thay đổi
                                </button>
                            </Col>
                            <Col xs="auto" className="ps-1">
                                <button
                                    className="btn btn-outline-primary fw-bold float-end mx-1"
                                    onClick={(e) => handleSubmit('published')}
                                >
                                    Công khai bài đăng
                                </button>
                            </Col>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Col xs="auto" className="pe-1">
                                <button
                                    type="submit"
                                    className="btn btn-primary fw-bold mx-1"
                                    onClick={(e) => handleSubmit()}
                                >
                                    Lưu thay đổi
                                </button>
                            </Col>
                            <Col xs="auto" className="ps-1">
                                <button
                                    className="btn btn-outline-primary fw-bold float-end mx-1"
                                    onClick={(e) => handleSubmit('draft')}
                                >
                                    Lưu bản nháp
                                </button>
                            </Col>
                        </Fragment>
                    )}
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
                                    value={postData.postDetail?.title ? postData.postDetail?.title : ''}
                                    onChange={(e) => {
                                        postData.handleSetPost((prev) => {
                                            return {
                                                ...prev,
                                                title: e.target.value,
                                                slug: convertStrToSlug(e.target.value),
                                            };
                                        });
                                    }}
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
                                    value={postData.postDetail?.description ? postData.postDetail?.description : ''}
                                    onChange={(e) => {
                                        postData.handleSetPost((prev) => {
                                            return { ...prev, description: e.target.value };
                                        });
                                    }}
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
                                    data={postData.postDetail?.content ? postData.postDetail?.content : ''}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        postData.handleSetPost((prev) => {
                                            return { ...prev, content: data };
                                        });
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
                                    value={postData.postDetail?.slug ? postData.postDetail?.slug : ''}
                                    onChange={(e) => {
                                        postData.handleSetPost((prev) => {
                                            return { ...prev, slug: e.target.value };
                                        });
                                    }}
                                />
                            </div>
                            {/* Danh mục bài viết */}
                            <div className="form-group mt-2">
                                <label className="input-title required-field">Danh mục bài viết</label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={postData.postDetail?.category ? postData.postDetail?.category : ''}
                                    onChange={(e) => {
                                        postData.handleSetPost((prev) => {
                                            return { ...prev, category: e.target.value };
                                        });
                                    }}
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
                                    ref={fileupload}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setFileUploadPreview(file);
                                    }}
                                />
                                {/* File Preview */}
                                <div className="preview-file-content">
                                    <img
                                        src={
                                            fileUploadPreview
                                                ? URL.createObjectURL(fileUploadPreview)
                                                : `${baseURL}/${postData.postDetail?.thumbnail}`
                                        }
                                        loading="lazy"
                                    />
                                </div>
                                <Row className="justify-content-center">
                                    {fileUploadPreview ? (
                                        <span className="col-auto pt-2">
                                            <strong>Tên File: </strong>
                                            {`${fileUploadPreview.name}`}
                                            <br />
                                            <strong>Kích thước:</strong> {countFileSize(fileUploadPreview.size)}
                                        </span>
                                    ) : (
                                        <span className="col-auto pt-2"></span>
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
