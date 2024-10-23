export function createElement(tag, className, id, options = {}) {
    const element = document.createElement(tag);
    element.className = className;
    element.id = id;
    Object.assign(element, options);
    return element;
}