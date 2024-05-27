import Swal from 'sweetalert2';

// Trigger sweetalert2 => swalTrigger(<message>, <type of toast>);
export function toastTrigger(message, type, position, timer) {
    const typeOfToast = type;
    if (!typeOfToast) {
        console.log('typeOfToast', 'Missing type of toast value!');
    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: position ? position : 'top-end',
            showConfirmButton: false,
            timer: timer ? timer : 5000,
            timerProgressBar: true,
        });
        Toast.fire({
            icon: type,
            title: message,
        });
    }
}

// Trigger sweetalert2 => swalTrigger(<message>, <type of toast>, <function>==>do something);
export function swalTimeOut({ func, ...attr }) {
    const typeOfToast = attr.type;
    if (!typeOfToast) {
        console.log('typeOfToast', 'Missing type of toast value!');
    } else {
        Swal.fire({
            icon: attr.type,
            html: `<p>${attr.message}</p><br/><p>${attr.funcMess}</p>`,
            showConfirmButton: false,
            timer: 3000,
            willClose: () => {
                func && func();
            },
        });
    }
}

// Trigger sweetalert2 => swalAsk(<message>, <type of toast>, <function>==>do something);
export const swalAsk = (message, type, func) => {
    Swal.fire({
        title: 'Bạn chắc muốn thực hiện?',
        text: message,
        icon: type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý!',
    }).then((result) => {
        if (result.isConfirmed) {
            func && func();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Đã hủy', 'Thao tác xóa bài đăng đã được hủy', 'error');
        }
    });
};

export const swalAskDirect = ({ message, type, link }) => {
    Swal.fire({
        title: 'Chỉnh sửa bài viết thành công!',
        text: message,
        icon: type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Hủy bỏ!',
        confirmButtonText: 'Đồng ý!',
    }).then((result) => {
        if (result.isConfirmed) {
            link();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return;
        }
    });
};
