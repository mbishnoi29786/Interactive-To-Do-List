// Function to handle focus trap
export function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'input, button, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (event)=>
    {
        if (event.key === 'Tab') {
            if (event.shiftKey) { // Shift + Tab
                // If the first element is focused and user presses Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    event.preventDefault();
                    lastFocusableElement.focus(); // Focus the last element
                }
            } else { // Tab
                // If the last element is focused and user presses Tab
                if (document.activeElement === lastFocusableElement) {
                    event.preventDefault();
                    firstFocusableElement.focus(); // Focus the first element
                }
            }
        }
    })
    
    return { firstFocusableElement, lastFocusableElement };
}


// Function to handle modal closing
export function setupModalClose(overlayDiv, modalDiv) {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal(overlayDiv, modalDiv);
        }
    });

    overlayDiv.addEventListener('click', () => closeModal(overlayDiv, modalDiv));
}

// Function to close the modal and overlay
function closeModal(overlayDiv, modalDiv) {
    modalDiv.classList.remove('active');
    overlayDiv.classList.remove('active');
    modalDiv.remove();
    overlayDiv.remove();
}