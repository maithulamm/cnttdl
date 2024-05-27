// This function is used to convert the file size from bytes to KB or MB.
export const countFileSize = (size) => {
    if (size < 1024) {
        return size + ' KB';
    } else {
        return (size / 1024).toFixed(2) + ' MB';
    }
};
