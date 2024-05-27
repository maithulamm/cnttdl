import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { form_inputStart, form_inputSuccess, addFormData, deleteFormData } from '../../redux/formSlice';

const Step1 = () => {
    const dispatch = useDispatch();

    const handleChanged = (event, field) => {
        dispatch(form_inputStart());
        dispatch(addFormData({ [field]: event.target?.value }));
        // dispatch(deleteFormData());
    };
    const selector = useSelector((state) => state.form.form_input?.currentForm);
    return (
        <Col className="text-center">
            {window.innerWidth < 768 ? (
                <h2 className="mb-4">Bạn là?</h2>
            ) : (
                <h2 className="mb-4">Vui lòng chọn đối tượng cần hỗ trợ</h2>
            )}
            <Row className="justify-content-center gap-5 pt-3 pb-5">
                <Col lg={3} md={3} sm={3} xs="auto" className="px-0">
                    <label className="obj_select me-2">
                        <input
                            className=""
                            type="radio"
                            onChange={(event) => handleChanged(event, 'obj')}
                            value={'Sinh viên'}
                            name="obj"
                            id="sv"
                            checked={selector.obj === 'Sinh viên'}
                        />
                        <span htmlFor="sv">Sinh viên</span>
                    </label>
                </Col>
                <Col lg={3} md={3} sm={3} xs="auto" className="px-0">
                    <label className="obj_select ms-2">
                        <input
                            className=""
                            type="radio"
                            onChange={(event) => handleChanged(event, 'obj')}
                            value={'Cán bộ / viên chức'}
                            name="obj"
                            id="cb"
                            checked={selector.obj === 'Cán bộ / viên chức'}
                        />
                        <span htmlFor="cb">Cán bộ / viên chức</span>
                    </label>
                </Col>
            </Row>
        </Col>
    );
};
// Step 2 start here
const step2_sv = [
    ['Cấp lại email sinh viên', 'prob', 'p1'],
    ['Cấp lại tài khoản LMS ', 'prob', 'p2'],
    ['Hỗ trợ kỹ thuật', 'prob', 'p3'],
    ['Vấn đề sv 4', 'prob', 'p4'],
    ['Vấn đề sv 5', 'prob', 'p5'],
];

const step2_cb = [
    ['Vấn đề cb 1', 'prob', 'p1'],
    ['Vấn đề cb 2', 'prob', 'p2'],
    ['Vấn đề cb 3', 'prob', 'p3'],
    ['Vấn đề cb 4', 'prob', 'p4'],
    ['Vấn đề cb 5', 'prob', 'p5'],
];

const Step2 = () => {
    const dispatch = useDispatch();
    const handleChanged = (event, field) => {
        dispatch(form_inputStart());
        dispatch(addFormData({ [field]: event.target?.value }));
    };

    const selector = useSelector((state) => state.form.form_input?.currentForm);
    return (
        <Col>
            {selector.obj == null ? (
                <h2>Bạn chưa chọn đối tượng cần hỗ trợ</h2>
            ) : window.innerWidth < 768 ? (
                <h2> 2. Vấn đề cần hỗ trợ </h2>
            ) : (
                <h2> Bạn cần hỗ trợ gì?</h2>
            )}
            <Row>
                {selector.obj === 'Sinh viên'
                    ? step2_sv.map((item, index) => (
                          <label key={index} className="cont">
                              <input
                                  className=""
                                  type="radio"
                                  onChange={(event) => handleChanged(event, 'prob')}
                                  value={item[0]}
                                  name="prob"
                                  id={item[1]}
                                  checked={selector.prob === item[0]}
                              />
                              <span htmlFor={item[1]}>{item[0]}</span>
                          </label>
                      ))
                    : selector.obj === 'Cán bộ/nhân viên'
                    ? step2_cb.map((item, index) => (
                          <label key={index} className="cont">
                              <input
                                  className=""
                                  type="radio"
                                  onChange={(event) => handleChanged(event, 'prob')}
                                  value={item[0]}
                                  name="prob"
                                  id={item[1]}
                                  checked={selector.prob === item[0]}
                              />
                              <span htmlFor={item[1]}>{item[0]}</span>
                          </label>
                      ))
                    : null}
            </Row>
        </Col>
    );
};

const Step3 = () => {
    const dispatch = useDispatch();

    const handleChanged = (event, field) => {
        dispatch(form_inputStart());
        dispatch(addFormData({ [field]: event.target?.value }));
    };
    const selector = useSelector((state) => state.form.form_input?.currentForm);
    return (
        <Col>
            {selector.prob == null ? (
                <h2>Bạn chưa chọn vấn đề cần hỗ trợ</h2>
            ) : window.innerWidth < 768 ? (
                <h2> 3. Thông tin liên hệ </h2>
            ) : (
                <h2> Thông tin liên hệ</h2>
            )}
            {selector.prob != null ? (
                <div className="mid">
                    <div class="coolinput">
                        <label for="input_info" className="text">
                            Họ và tên
                        </label>
                        <input
                            type="search"
                            placeholder="Nguyễn Văn A..."
                            name="input_info"
                            className="form_info"
                            onChange={(event) => handleChanged(event, 'name')}
                            value={selector.name}
                            autocomplete="on"
                        />
                    </div>
                    <div class="coolinput">
                        <label for="input_info" className="text">
                            {selector.obj === 'Sinh viên' ? 'Mã số sinh viên' : 'Mã cán bộ'}
                        </label>
                        <input
                            type="search"
                            placeholder="123..."
                            name="input_info"
                            className="form_info"
                            onChange={(event) => handleChanged(event, 'id')}
                            value={selector.id}
                            autocomplete="on"
                        />
                    </div>
                    <div class="coolinput">
                        <label for="input_info" className="text">
                            Số điện thoại
                        </label>
                        <input
                            type="search"
                            placeholder="012..."
                            name="input_info"
                            className="form_info"
                            onChange={(event) => handleChanged(event, 'phone')}
                            value={selector.phone}
                            autocomplete="on"
                        />
                    </div>
                </div>
            ) : null}
        </Col>
    );
};

const Step4 = () => {
    const dispatch = useDispatch();

    const handleChanged = (event, field) => {
        dispatch(form_inputStart());
        dispatch(addFormData({ [field]: event.target?.value }));
    };
    const selector = useSelector((state) => state.form.form_input?.currentForm);
    return (
        <Col>
            {selector?.name === '' ||
            selector?.id === '' ||
            selector?.phone === '' ||
            selector?.name === null ||
            selector?.id === null ||
            selector?.phone === null ? (
                <h2>Bạn chưa điền đủ thông tin</h2>
            ) : window.innerWidth < 768 ? (
                <h2> 4. Mô tả (nếu có) </h2>
            ) : (
                <h2> Mô tả (nếu có)</h2>
            )}
            {selector?.name !== '' ||
            selector?.id !== '' ||
            selector?.phone !== '' ||
            selector?.name !== null ||
            selector?.id !== null ||
            selector?.phone !== null ? (
                <div className="mid">
                    <div class="coolinput">
                        <label for="input_info" className="text">
                            Mô tả
                        </label>
                        <textarea
                            placeholder="Viết mô tả..."
                            name="input_info"
                            className="description"
                            onChange={(event) => handleChanged(event, 'description')}
                            value={selector.description}
                        />
                    </div>
                </div>
            ) : null}
        </Col>
    );
};

const Step5 = () => {
    const dispatch = useDispatch();
    const handleChanged = () => {
        dispatch(form_inputStart());
        dispatch(addFormData({ step: selector.step === true ? null : true }));
        console.log(selector); // axios data here
    };
    const selector = useSelector((state) => state.form.form_input?.currentForm);

    return (
        <Col>
            {selector?.name === '' ||
            selector?.id === '' ||
            selector?.phone === '' ||
            selector?.name === null ||
            selector?.id === null ||
            selector?.phone === null ? (
                <h2>Bạn chưa điền đủ thông tin</h2>
            ) : window.innerWidth < 768 ? (
                <h2> 5. Gửi yêu cầu </h2>
            ) : null}

            {selector?.name === '' ||
            selector?.id === '' ||
            selector?.phone === '' ||
            selector?.name === null ||
            selector?.id === null ||
            selector?.phone === null ? null : (
                <Col>
                    <Row>
                        <div className="mid2">
                            <h3>
                                Đối tượng cần hỗ trợ:
                                <strong>
                                    <p>{selector?.obj}</p>
                                </strong>
                            </h3>
                            <h3>
                                Vấn đề cần hỗ trợ:
                                <strong>
                                    <p>{selector?.prob}</p>
                                </strong>
                            </h3>
                            <h3>
                                Họ và tên:
                                <strong>
                                    <p>{selector?.name}</p>
                                </strong>
                            </h3>
                            <h3>
                                {selector?.obj === 'Sinh viên' ? 'Mã số sinh viên' : 'Mã cán bộ'}:
                                <strong>
                                    <p>{selector?.id}</p>
                                </strong>
                            </h3>
                            <h3>
                                Số điện thoại:
                                <strong>
                                    <p>{selector?.phone}</p>
                                </strong>
                            </h3>
                            {selector?.description === '' || selector?.description == null ? null : (
                                <h3>
                                    Mô tả:
                                    <strong>
                                        <p>{selector?.description}</p>
                                    </strong>
                                </h3>
                            )}
                        </div>
                    </Row>
                    <Row>
                        <div class="container_check">
                            <input
                                type="checkbox"
                                id="cbx2"
                                onChange={(event) => handleChanged(event)}
                                checked={selector.step}
                            />
                            <label for="cbx2" class="check">
                                <svg width="18px" height="18px" viewBox="0 0 18 18">
                                    <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                                    <polyline points="1 9 7 14 15 4"></polyline>
                                </svg>
                            </label>
                            <label for="cbx2" className="_text">
                                Đã kiểm tra thông tin và đồng ý gửi yêu cầu
                            </label>
                        </div>
                    </Row>
                </Col>
            )}
        </Col>
    );
};

export { Step1, Step2, Step3, Step4, Step5 };
