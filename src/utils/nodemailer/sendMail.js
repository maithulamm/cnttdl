import axios from 'axios';
import { swalTimeOut } from '../../utils/trigger/swal';

const baseURL = process.env.REACT_APP_API_URL;
const pathSendMail = 'api/cnttdl/support/sendmail';
export const sendMailAPI = async (data) => {
    await axios
        .post(`${baseURL}/${pathSendMail}`, data)
        .then((res) => {
            swalTimeOut({
                type: 'success',
                message: 'Yêu cầu hỗ trợ của bạn đã được gửi thành công!',
                funcMess: 'Chúng tôi sẽ phản hồi trong thời gian sớm nhất.',
                func: () => {
                    window.location.reload();
                },
            });
        })
        .catch((error) => {
            console.log(error);
        });
};
