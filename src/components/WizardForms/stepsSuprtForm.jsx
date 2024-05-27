import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import FormWizard from 'react-form-wizard-component';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { TextField, FormControl } from '@mui/material';
import { problems_SV, problems_CBVC } from '~/contexts/problems_support';
import { validateEmail, validatePhone } from '~/utils/prefunction/validateFnc';
import { toastTrigger } from '~/utils/trigger/swal';

import { GrContactInfo } from 'react-icons/gr';
import { MdOutlineContactPhone } from 'react-icons/md';
import { FaRegImages } from 'react-icons/fa';
import { DropDragImage } from '../FileUpload';
import './supportForm.css';
import { useSelector } from 'react-redux';

export const Step1_ObjectSel = ({ ...handleFnc }) => {
    const [browsWidth, setBrowsWidth] = useState(window.innerWidth);
    const objSelected = handleFnc.selector.obj;
    useEffect(() => {
        const handleResize = () => {
            setBrowsWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <Fragment>
            <Container fluid className="mt-3">
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <h3 className="">
                            {browsWidth > 768 ? (
                                <span>
                                    <strong>Chọn nhóm đối tượng cần hỗ trợ ?</strong>
                                </span>
                            ) : (
                                <span>
                                    <strong>Bạn thuộc nhóm đối tượng ?</strong>
                                </span>
                            )}
                        </h3>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4 mb-5">
                    <Col sm={8} md={5} lg={4}>
                        <label className={objSelected === 'Sinh viên' ? 'obj_select active mx-2' : 'obj_select mx-2'}>
                            <input
                                className=""
                                type="radio"
                                onChange={(event) => {
                                    handleFnc.handleGetData(event, 'obj');
                                }}
                                value={'Sinh viên'}
                                name="obj"
                                id="sv"
                                checked={objSelected === 'Sinh viên'}
                            />
                            <span htmlFor="sv">Sinh viên</span>
                        </label>
                    </Col>
                    <Col sm={8} md={5} lg={4}>
                        <label
                            className={
                                objSelected === 'Cán bộ / viên chức' ? 'obj_select active mx-2' : 'obj_select mx-2'
                            }
                        >
                            <input
                                className=""
                                type="radio"
                                onChange={(event) => {
                                    handleFnc.handleGetData(event, 'obj');
                                }}
                                value={'Cán bộ / viên chức'}
                                name="obj"
                                id="cb"
                                checked={objSelected === 'Cán bộ / viên chức'}
                            />
                            <span htmlFor="cb">Cán bộ / viên chức</span>
                        </label>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <button
                            className="btn btn-primary fw-bold px-4"
                            onClick={() => {
                                if (handleFnc.selector.obj) {
                                    handleFnc.nextStep();
                                } else {
                                    toastTrigger(
                                        'Vui lòng chọn nhóm đối tượng cần hỗ trợ',
                                        'error',
                                        'top-start',
                                        '3000',
                                    );
                                }
                            }}
                        >
                            Tiếp theo
                        </button>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export const Step2_Issue = ({ ...handleFnc }) => {
    const [browsWidth, setBrowsWidth] = useState(window.innerWidth);
    const objSelected = handleFnc.selector.obj;
    useEffect(() => {
        const handleResize = () => {
            setBrowsWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Fragment>
            <Container fluid className="mt-3">
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <h3 className="">
                            {browsWidth > 768 ? (
                                <span>
                                    <strong>Bạn cần hỗ trợ, giải đáp vấn đề gì ?</strong>
                                </span>
                            ) : (
                                <span>
                                    <strong>Chọn vấn đề cần hỗ trợ</strong>
                                </span>
                            )}
                        </h3>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4 mb-5">
                    {objSelected === 'Sinh viên'
                        ? problems_SV.map((problem) => {
                              return (
                                  <Col sm={8} md={5} lg={4} key={problem.value}>
                                      <Card
                                          className={
                                              handleFnc.selector.prob === problem.value
                                                  ? 'problem_select active mx-1 my-2'
                                                  : 'problem_select mx-1 my-2'
                                          }
                                          onClick={() => {
                                              handleFnc.handleGetData(problem.value, 'prob');
                                          }}
                                      >
                                          <Card.Body className="problem-card_body">
                                              <Card.Title
                                                  className="problem-title"
                                                  style={{ textDecoration: 'underline' }}
                                              >
                                                  {problem.name}
                                              </Card.Title>
                                              <Card.Text className="problem-desc">{problem.description}</Card.Text>
                                          </Card.Body>
                                      </Card>
                                  </Col>
                              );
                          })
                        : problems_CBVC.map((problem) => {
                              return (
                                  <Col sm={8} md={5} lg={4} key={problem.value}>
                                      <Card
                                          className={
                                              handleFnc.selector.prob === problem.value
                                                  ? 'problem_select active mx-1 my-2'
                                                  : 'problem_select mx-1 my-2'
                                          }
                                          onClick={() => {
                                              handleFnc.handleGetData(problem.value, 'prob');
                                          }}
                                      >
                                          <Card.Body className="problem-card_body">
                                              <Card.Title
                                                  className="problem-title"
                                                  style={{ textDecoration: 'underline' }}
                                              >
                                                  {problem.name}
                                              </Card.Title>
                                              <Card.Text className="problem-desc">{problem.description}</Card.Text>
                                          </Card.Body>
                                      </Card>
                                  </Col>
                              );
                          })}
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <button className="btn btn-secondary fw-bold px-4" onClick={() => handleFnc.prevStep()}>
                            Quay lại
                        </button>
                    </Col>
                    <Col xs="auto">
                        <button
                            className="btn btn-primary fw-bold px-4"
                            onClick={() => {
                                if (handleFnc.selector.prob) {
                                    handleFnc.nextStep();
                                } else {
                                    toastTrigger('Vui lòng chọn vấn đề cần hỗ trợ', 'error', 'top-start', '3000');
                                }
                            }}
                        >
                            Tiếp theo
                        </button>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export const Step3_ContactInfo = ({ ...handleFnc }) => {
    const [browsWidth, setBrowsWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setBrowsWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const checkValid = () => {
        if (
            !handleFnc.selector?.id ||
            !handleFnc.selector?.emailEdu ||
            !handleFnc.selector?.email ||
            !handleFnc.selector?.phone ||
            !handleFnc.selector?.name
        ) {
            return false;
        }
        if (handleFnc.selector.id.length < 10) {
            return false;
        }
        if (!validateEmail(handleFnc.selector.emailEdu, 'hcmussh.edu.vn')) {
            return false;
        }
        if (!validateEmail(handleFnc.selector.email)) {
            return false;
        }
        if (!validatePhone(handleFnc.selector.phone)) {
            return false;
        }
        return true;
    };

    const selector = useSelector((state) => state.form.form_input?.currentForm);

    return (
        <Fragment>
            <Container fluid>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <h3 className="">
                            {browsWidth > 768 ? (
                                <span>
                                    <strong>Vui lòng cung cấp các thông tin sau</strong>
                                </span>
                            ) : (
                                <span>
                                    <strong>Thông tin của bạn</strong>
                                </span>
                            )}
                        </h3>
                    </Col>
                </Row>
                {/* Thông tin cơ bản */}
                <Row className="justify-content-center mb-0 mt-3">
                    <Col sm={12} md={12} lg={8} className="mb-1 text-start">
                        <span className="text-muted fw-bold">
                            <GrContactInfo /> Thông tin cơ bản
                        </span>
                        {/* <hr className="mt-0" /> */}
                    </Col>
                </Row>
                <Row className="justify-content-center mb-2 mt-3">
                    <Col sm={12} md={12} lg={8} className="mb-2">
                        <TextField
                            className="form-control"
                            label="Họ và tên (Bắt buộc)"
                            size="small"
                            value={handleFnc.selector.name ? handleFnc.selector.name : ''}
                            required
                            onChange={(event) => {
                                handleFnc.handleGetData(event, 'name');
                            }}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center text-start mb-3 ">
                    <Col sm={12} md={6} lg={4} className="mt-2 mb-3">
                        <TextField
                            className="form-control"
                            label={selector.obj === 'Sinh viên' ? 'Mã số sinh viên' : 'Mã số cán bộ'}
                            size="small"
                            required
                            value={handleFnc.selector.id ? handleFnc.selector.id : ''}
                            error={handleFnc.selector.id ? handleFnc.selector.id.length < 10 : false}
                            onChange={(event) => {
                                handleFnc.handleGetData(event, 'id');
                            }}
                        />
                        <small>
                            {handleFnc.selector.id ? (
                                handleFnc.selector.id.length < 10 ? (
                                    <span className="text-danger">'Mã số không hợp lệ'</span>
                                ) : (
                                    ''
                                )
                            ) : (
                                ''
                            )}
                        </small>
                    </Col>
                    <Col sm={12} md={6} lg={4} className="mt-2">
                        <TextField
                            className="form-control"
                            label={
                                handleFnc.selector.emailEdu
                                    ? 'Email trường'
                                    : 'Email trường (Vd: 202xxx2733@hcmussh.edu.vn)'
                            }
                            size="small"
                            value={handleFnc.selector.emailEdu ? handleFnc.selector.emailEdu : ''}
                            error={
                                handleFnc.selector.emailEdu
                                    ? !validateEmail(handleFnc.selector.emailEdu, 'hcmussh.edu.vn')
                                    : false
                            }
                            required
                            onChange={(event) => {
                                handleFnc.handleGetData(event, 'emailEdu');
                            }}
                        />
                        <small>
                            {handleFnc.selector.emailEdu ? (
                                !validateEmail(handleFnc.selector.emailEdu, 'hcmussh.edu.vn') ? (
                                    <span className="text-danger">'Email không hợp lệ'</span>
                                ) : (
                                    ''
                                )
                            ) : (
                                ''
                            )}
                        </small>
                    </Col>
                </Row>
                {/* Thông tin liên hệ */}
                <Row className="justify-content-center mb-0">
                    <Col sm={12} md={12} lg={8} className="mb-1 text-start">
                        <span className="text-muted fw-bold">
                            <MdOutlineContactPhone /> Thông tin liên hệ
                        </span>
                        <br />
                        <small>
                            <span className="text-muted">
                                {' '}
                                (Vui lòng nhập đúng thông tin để chuyên viên có thể hỗ trợ nhanh nhất)
                            </span>
                        </small>
                    </Col>
                </Row>
                <Row className="justify-content-center text-start mb-3 mt-3">
                    <Col sm={12} md={6} lg={5} className="mb-2">
                        <TextField
                            className="form-control"
                            label="Email cá nhân"
                            size="small"
                            required
                            value={handleFnc.selector.email ? handleFnc.selector.email : ''}
                            error={handleFnc.selector.email ? !validateEmail(handleFnc.selector.email) : false}
                            onChange={(event) => {
                                handleFnc.handleGetData(event, 'email');
                            }}
                        />
                        <small>
                            {handleFnc.selector.email ? (
                                !validateEmail(handleFnc.selector.email) ? (
                                    <span className="text-danger">'Email không hợp lệ'</span>
                                ) : (
                                    ''
                                )
                            ) : (
                                ''
                            )}
                        </small>
                    </Col>
                    <Col sm={12} md={6} lg={3}>
                        <TextField
                            className="form-control"
                            label="Số điện thoại"
                            size="small"
                            required
                            value={handleFnc.selector.phone ? handleFnc.selector.phone : ''}
                            error={handleFnc.selector.phone ? !validatePhone(handleFnc.selector.phone) : false}
                            onChange={(event) => {
                                handleFnc.handleGetData(event, 'phone');
                            }}
                        />
                        <small>
                            {handleFnc.selector.phone ? (
                                !validatePhone(handleFnc.selector.phone) ? (
                                    <span className="text-danger">'Số điện thoại không hợp lệ'</span>
                                ) : (
                                    ''
                                )
                            ) : (
                                ''
                            )}
                        </small>
                    </Col>
                </Row>
                {/* Hình ảnh minh chứng */}
                {handleFnc.selector.prob === 'Vấn đề khác' ? null : (
                    <Fragment>
                        <Row className="justify-content-center mb-0">
                            <Col sm={12} md={12} lg={8} className="mb-1 text-start">
                                <span className="text-muted fw-bold">
                                    <FaRegImages /> Hình ảnh minh chứng
                                </span>
                                {/* <hr className="mt-0" /> */}
                            </Col>
                        </Row>
                        <Row className="justify-content-center mb-3">
                            <Col sm={12} md={12} lg={8} className="mb-2">
                                <DropDragImage fileType={''} />
                            </Col>
                        </Row>
                    </Fragment>
                )}
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <button className="btn btn-secondary fw-bold px-4" onClick={() => handleFnc.prevStep()}>
                            Quay lại
                        </button>
                    </Col>
                    <Col xs="auto">
                        <button
                            className="btn btn-primary fw-bold px-4"
                            onClick={() => {
                                if (checkValid()) {
                                    handleFnc.nextStep();
                                } else {
                                    toastTrigger(
                                        'Vui lòng cung cấp đầy đủ thông tin và đúng định dạng',
                                        'error',
                                        'top-start',
                                        '3000',
                                    );
                                }
                            }}
                        >
                            Tiếp theo
                        </button>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export const Step4_Description = ({ ...handleFnc }) => {
    const [browsWidth, setBrowsWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setBrowsWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <Fragment>
            <Container fluid>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <h3 className="">
                            {browsWidth > 768 ? (
                                <span>
                                    <strong>Nêu cụ thể vấn đề bạn đang gặp phải (Nếu có)</strong>
                                </span>
                            ) : (
                                <span>
                                    <strong>Mô tả thêm về vấn đề (Nếu có)</strong>
                                </span>
                            )}
                        </h3>
                    </Col>
                </Row>
                <Row className="justify-content-center mb-4 mt-4">
                    <Col sm={12} md={10} lg={8}>
                        <FormControl fullWidth>
                            <TextField
                                label="Mô tả vấn đề"
                                multiline
                                rows={4}
                                placeholder="Nhập mô tả vấn đề"
                                value={handleFnc.selector.description ? handleFnc.selector.description : ''}
                                onChange={(event) => handleFnc.handleGetData(event, 'description')}
                            />
                        </FormControl>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <button className="btn btn-secondary fw-bold px-4" onClick={() => handleFnc.prevStep()}>
                            Quay lại
                        </button>
                    </Col>
                    <Col xs="auto">
                        <button
                            className="btn btn-primary fw-bold px-4"
                            onClick={() => {
                                handleFnc.nextStep();
                            }}
                        >
                            Tiếp theo
                        </button>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export const Step5_Submit = ({ ...handleFnc }) => {
    const [browsWidth, setBrowsWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setBrowsWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const selector = useSelector((state) => state.form.form_input?.currentForm);

    return (
        <Fragment>
            <Container fluid>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <h3 className="">
                            {browsWidth > 768 ? (
                                <span>
                                    <strong>Thông tin yêu cầu hỗ trợ của bạn: </strong>
                                </span>
                            ) : (
                                <span>
                                    <strong>Yêu cầu hỗ trợ của bạn</strong>
                                </span>
                            )}
                        </h3>
                    </Col>
                </Row>
                <Row className="justify-content-center text-start mb-3 mt-4">
                    <Col sm={12} md={10} lg={6}>
                        <Card className="request-info-card">
                            <Card.Body>
                                <Card.Title className="request-info-title">
                                    <strong>
                                        Thông tin đối tượng:{' '}
                                        <span className="fw-normal">
                                            {handleFnc.selector.obj === 'Sinh viên'
                                                ? 'Sinh viên'
                                                : 'Cán bộ / viên chức'}
                                        </span>
                                    </strong>
                                </Card.Title>
                                <Card.Text className="request-info-text mt-3">
                                    <strong>Vấn đề cần hỗ trợ:</strong>{' '}
                                    {handleFnc.selector.prob === 'Khác'
                                        ? handleFnc.selector.description
                                        : handleFnc.selector.prob}
                                </Card.Text>
                                <Card.Text className="request-info-text">
                                    <strong>Họ và tên:</strong> {handleFnc.selector.name}
                                </Card.Text>
                                <Card.Text className="request-info-text">
                                    {selector.obj === "Sinh viên"
                                        ? <strong>Mã số sinh viên: </strong> 
                                        : <strong>Mã số cán bộ: </strong> 
                                    }
                                    {handleFnc.selector.id}
                                </Card.Text>
                                <Card.Text className="request-info-text">
                                    <strong>Email trường:</strong> {handleFnc.selector.emailEdu}
                                </Card.Text>
                                <Card.Text className="request-info-text">
                                    <strong>Email cá nhân:</strong> {handleFnc.selector.email} -{' '}
                                    <strong>Số điện thoại:</strong> {handleFnc.selector.phone}
                                </Card.Text>
                                <Card.Text className="request-info-text">
                                    <strong>Mô tả vấn đề:</strong> {handleFnc.selector.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <button className="btn btn-secondary fw-bold px-4" onClick={() => handleFnc.prevStep()}>
                            Quay lại
                        </button>
                    </Col>
                    <Col xs="auto">
                        <button
                            className="btn btn-primary fw-bold px-4"
                            onClick={() => {
                                handleFnc.finish();
                            }}
                        >
                            Gửi yêu cầu
                        </button>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};
