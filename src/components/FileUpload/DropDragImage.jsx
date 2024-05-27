import { IoCloudUploadOutline } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { form_inputStart, addFormData } from '../../redux/formSlice';
import './dropDragImg.css';

import axios from 'axios';
import { toastTrigger } from '~/utils/trigger/swal';

const baseURL = process.env.REACT_APP_API_URL;
const pathFileUpload = 'api/cnttdl/file/uploadfile';
const removeFileUploaded = 'api/cnttdl/file/deletefilewithuri';

export const DropDragImage = ({ fileType }) => {
    const dropzoneBox = document.getElementsByClassName('dropzone-box');
    const [dragOver, setDragOver] = useState(false);
    const [fileMessage, setFileMessage] = useState('Không có tệp nào được chọn');
    const inputFileElement = useRef(null);
    const dropzoneArea = document.getElementsByClassName('dropzone-area');
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const selector = useSelector((state) => state.form.form_input?.currentForm);
    const handleChange = (event, field) => {
        dispatch(form_inputStart());
        dispatch(addFormData({ [field]: event }));
    };
    const showFileUpload = () => {
        var fileName = selector.filename;
        if (fileName) {
            return `Đã chọn: ${fileName} - ${selector.fileSize} bytes`;
        } else {
            return 'Không có tệp nào được chọn';
        }
    };
    const updateDropzoneFileList = (dropzoneArea, file) => {
        let dropzoneFileMessage = document.getElementsByClassName('file-info');
        setFileMessage(`${file.name}, ${file.size} bytes`);
        handleChange(file.size, 'fileSize');
        setFile(file);
        console.log(file);
        if (selector.attachment) {
            callAPIRemoveThumbnail(selector.attachment, file);
        } else {
            callAPIUploadThumbnail(file);
        }
    };

    const callAPIUploadThumbnail = async (file) => {
        handleChange(file.name, 'filename');
        const body = new FormData();
        body.append('photo', file);
        await axios
            .post(`${baseURL}/${pathFileUpload}`, body)
            .then((res) => {
                handleChange(res.data.linkUri, 'attachment');
            })
            .catch((error) => {
                console.log(error);
                toastTrigger('Tải ảnh lên thất bại! Vui lòng liên hệ bộ phận CNTT để được hỗ trợ.', 'error');
            });
    };
    const callAPIRemoveThumbnail = async (uri, file) => {
        await axios
            .post(`${baseURL}/${removeFileUploaded}`, {
                src: uri,
            })
            .then((res) => {
                console.log(res);
                callAPIUploadThumbnail(file);
            })
            .catch((error) => {
                console.log(error);
                toastTrigger('Cập nhật ảnh thất bại! Vui lòng liên hệ bộ phận CNTT để được hỗ trợ.', 'error');
            });
    };
    useEffect(() => {
        console.log(fileMessage);
    }, []);

    return (
        <form className="dropzone-box">
            <h2>Vui lòng cung cấp thẻ sinh viên/thẻ cán bộ hoặc giấy tờ cần thiết</h2>
            <p>Nhấn để tải lên hoặc kéo thả</p>
            <div
                className={`dropzone-area ${dragOver ? 'dropzone--over' : ''}`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                }}
                onDragEnd={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files.length) {
                        inputFileElement.current.files = e.dataTransfer.files;
                        updateDropzoneFileList(dropzoneArea, e.dataTransfer.files);
                        setDragOver(false);
                    }
                }}
            >
                <div className="file-upload-icon">
                    <IoCloudUploadOutline />
                </div>
                <input
                    type="file"
                    required
                    id="upload-file"
                    name="uploaded-file"
                    ref={inputFileElement}
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            updateDropzoneFileList(dropzoneArea, file);
                        }
                    }}
                />
                <p className="file-info">{showFileUpload()}</p>
                <img src={file ? URL.createObjectURL(file) : ''} alt="" className="file-preview" />
            </div>
        </form>
    );
};
