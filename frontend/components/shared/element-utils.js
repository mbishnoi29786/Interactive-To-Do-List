export function createElement(tag, className, id, options = {}) {
    const element = document.createElement(tag);
    element.className = className;
    element.id = id;
    Object.assign(element, options);
    return element;
}

export function createTextInput(placeholder, className, id) {
    return createElement('input', className, id, { type: 'text', placeholder });
}

export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function displayError(element, message) {
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error')

    if (errorElement) {
        errorElement.innerText = message;
    }
    inputGroup.classList.add('error')
    inputGroup.classList.remove('success')
}

export function clearError(inputElement) {
    const errorElement = inputElement.parentElement.querySelector('.error');
    if (errorElement) {
        errorElement.innerText = '';
    }
    inputElement.parentElement.classList.remove('error');
    inputElement.parentElement.classList.add('success');
}

export function isEmpty(value) {
    return value.trim() === '';
}

export function isPasswordValid(password) {
    return password.length >= 8;
}