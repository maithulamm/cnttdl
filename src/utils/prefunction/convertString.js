// This function is used to uppercase first letter each word.
export const upperFLText = (text) => {
    return text
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
};
// This function is used to shorten the file name.
export const shortFileName = (fileName) => {
    let fileType = fileName.split('.').pop();
    if (fileName.length > 20) {
        return fileName.substring(0, 20) + '...' + fileType;
    }
    return fileName;
};

export const getFileNameFromUri = (fileName) => {
    return fileName.split('/').pop();
};

// This function is used to convert string to slug in Vietnamese.
export const convertStrToSlug = (title) => {
    let slug = title.toLowerCase();
    // Chuyển ký tự có dấu thành không dấu
    slug = slug
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
    // Xóa ký tự đặc biệt
    slug = slug.replace(/[^a-z0-9]+/g, '-');
    // Xóa ký tự đầu tiên nếu là '-'
    if (slug.charAt(0) === '-') {
        slug = slug.substring(1);
    }
    // Xóa ký tự cuối cùng nếu là '-'
    if (slug.charAt(slug.length - 1) === '-') {
        slug = slug.substring(0, slug.length - 1);
    }

    return slug;
};
