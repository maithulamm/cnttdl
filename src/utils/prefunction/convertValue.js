export const convertCategory = (category) => {
    switch (category) {
        case 'tailieu':
            return 'Tài liệu - Học liệu';
        case 'thongbaosv':
            return 'Thông báo (SV)';
        case 'thongbaogv':
            return 'Thông báo (GV)';
        case 'bieumau':
            return 'Biểu mẫu - Văn bản';
        default:
            return 'Khác';
    }
};

export const getClassCategory = (category) => {
    switch (category) {
        case 'tailieu':
            return 'badge bg-interest_docs';
        case 'thongbaosv':
            return 'badge bg-warning';
        case 'thongbaogv':
            return 'badge bg-danger';
        case 'bieumau':
            return 'badge bg-form';
        default:
            return 'badge bg-secondary';
    }
};

export const convertDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    if (day < 10 && month < 10) {
        return `0${day}/0${month}/${year}`;
    } else if (day < 10) {
        return `0${day}/${month}/${year}`;
    } else if (month < 10) {
        return `${day}/0${month}/${year}`;
    }
};
