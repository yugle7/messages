export function checkPassword(password) {
    if (password !== '' && password.length < 8) {
        return 'должно быть не меньше 8 символов';
    }
    return null;
}

export function checkEmail(email) {
    if (email === '') {
        return null;
    }
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return '';
    }
    return 'некорректная почта';
}

