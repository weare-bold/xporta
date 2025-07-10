/**
 * producto.js for XPORTA - Product Detail Page
 * This script handles:
 * 1. The image gallery functionality.
 * 2. The "Contact Seller" modal form.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Image Gallery Logic ---
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail-image');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const newImageSrc = thumbnail.getAttribute('src');
                mainImage.setAttribute('src', newImageSrc.replace('200x200', '600x600'));
                
                thumbnails.forEach(thumb => {
                    thumb.classList.remove('border-orange-500', 'opacity-100');
                    thumb.classList.add('border-transparent', 'opacity-75');
                });

                thumbnail.classList.add('border-orange-500', 'opacity-100');
                thumbnail.classList.remove('border-transparent', 'opacity-75');
            });
        });
    }

    // --- Contact Modal Logic ---
    const openModalBtn = document.getElementById('open-contact-modal-btn');
    const contactModal = document.getElementById('contact-modal');
    const successModal = document.getElementById('success-modal');

    // Contact Modal Elements
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelModalBtn = document.getElementById('cancel-modal-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const contactForm = document.getElementById('contact-form');
    const contactSubjectInput = document.getElementById('contact-subject');
    const productName = document.getElementById('product-name').textContent;

    // Success Modal Elements
    const closeSuccessModalBtn = document.getElementById('close-success-modal-btn');

    // --- Functions to control modals ---
    const openContactModal = () => {
        contactSubjectInput.value = `Consulta sobre el producto: ${productName}`;
        contactModal.classList.remove('hidden');
        contactModal.classList.add('flex');
        document.body.classList.add('modal-open');
    };

    const closeContactModal = () => {
        contactModal.classList.add('hidden');
        contactModal.classList.remove('flex');
        document.body.classList.remove('modal-open');
    };
    
    const openSuccessModal = () => {
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
        document.body.classList.add('modal-open');
    };

    const closeSuccessModal = () => {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
        document.body.classList.remove('modal-open');
    };

    // --- Event Listeners ---
    if(openModalBtn) {
        openModalBtn.addEventListener('click', openContactModal);
    }
    if(closeModalBtn) {
        closeModalBtn.addEventListener('click', closeContactModal);
    }
    if(cancelModalBtn) {
        cancelModalBtn.addEventListener('click', closeContactModal);
    }
    if(modalBackdrop) {
        modalBackdrop.addEventListener('click', closeContactModal);
    }

    if(contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('Contact form submitted:', {
                product: productName,
                name: event.target.name.value,
                email: event.target.email.value,
                message: event.target.message.value,
            });
            closeContactModal();
            openSuccessModal();
            contactForm.reset();
        });
    }

    if(closeSuccessModalBtn) {
        closeSuccessModalBtn.addEventListener('click', closeSuccessModal);
    }
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (!contactModal.classList.contains('hidden')) {
                closeContactModal();
            }
            if (!successModal.classList.contains('hidden')) {
                closeSuccessModal();
            }
        }
    });
});
