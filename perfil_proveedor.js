/**
 * perfil_proveedor.js for XPORTA - Provider Profile Page
 * This script handles the functionality for the quote request modal
 * and the success confirmation modal.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Get all necessary elements from the DOM ---
    const openModalBtn = document.getElementById('open-quote-modal-btn');
    const quoteModal = document.getElementById('quote-modal');
    const successModal = document.getElementById('success-modal');
    
    // Quote Modal Elements
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cancelModalBtn = document.getElementById('cancel-modal-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const quoteForm = document.getElementById('quote-form');
    const quoteSubjectInput = document.getElementById('quote-subject');
    const providerName = document.getElementById('provider-name').textContent;

    // Success Modal Elements
    const closeSuccessModalBtn = document.getElementById('close-success-modal-btn');

    // --- Functions to control modals ---

    const openQuoteModal = () => {
        // Pre-fill the subject line with the provider's name
        quoteSubjectInput.value = `Solicitud de Cotización para ${providerName}`;
        quoteModal.classList.remove('hidden');
        quoteModal.classList.add('flex');
        document.body.classList.add('modal-open'); // Prevent background scrolling
    };

    const closeQuoteModal = () => {
        quoteModal.classList.add('hidden');
        quoteModal.classList.remove('flex');
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

    // Open the quote modal
    if(openModalBtn) {
        openModalBtn.addEventListener('click', openQuoteModal);
    }

    // Close the quote modal with 'X' button, 'Cancel' button, or by clicking the backdrop
    if(closeModalBtn) {
        closeModalBtn.addEventListener('click', closeQuoteModal);
    }
    if(cancelModalBtn) {
        cancelModalBtn.addEventListener('click', closeQuoteModal);
    }
    if(modalBackdrop) {
        modalBackdrop.addEventListener('click', closeQuoteModal);
    }

    // Handle the quote form submission
    if(quoteForm) {
        quoteForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission
            
            // In a real application, you would send the form data to a server here.
            console.log('Quote request submitted:', {
                provider: providerName,
                name: event.target.name.value,
                email: event.target.email.value,
                details: event.target.details.value,
            });

            closeQuoteModal(); // Close the request form
            openSuccessModal(); // Show the success message
            quoteForm.reset(); // Clear the form fields for next time
        });
    }

    // Close the success modal
    if(closeSuccessModalBtn) {
        closeSuccessModalBtn.addEventListener('click', closeSuccessModal);
    }
    
    // Allow closing modals with the Escape key for better accessibility
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (!quoteModal.classList.contains('hidden')) {
                closeQuoteModal();
            }
            if (!successModal.classList.contains('hidden')) {
                closeSuccessModal();
            }
        }
    });
});
