export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function displayError(element, message) {
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error')

    errorElement.innerText = message;
    inputGroup.classList.add('error')
    inputGroup.classList.remove('success')
}

export function clearError(inputElement) {
    const errorElement = inputElement.parentElement.querySelector('.error');
    errorElement.innerText = '';
    inputElement.parentElement.classList.remove('error');
    inputElement.parentElement.classList.add('success');
}

