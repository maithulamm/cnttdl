export const validatePhone = (phone) => {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phone);
};

export const validateEmail = (email, domain) => {
    // validate email with regex pattern
    if (!domain) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    } else {
        return new RegExp(`^[a-zA-Z0-9._-]+@${domain}`).test(email);
    }
};
