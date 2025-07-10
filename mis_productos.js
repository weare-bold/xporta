/**
 * mis_productos.js for XPORTA - "My Products" Page
 * This script handles the functionality for the product management page,
 * including opening/closing the modal, adding new products to the table,
 * and simulating edit/delete actions.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Get all necessary elements from the DOM ---
    const addProductBtn = document.getElementById('add-product-btn');
    const productModal = document.getElementById('product-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const productForm = document.getElementById('product-form');
    const productTableBody = document.getElementById('product-table-body');

    // --- Functions to control the modal ---
    const openModal = () => {
        productModal.classList.remove('hidden');
        productModal.classList.add('flex');
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        productModal.classList.add('hidden');
        productModal.classList.remove('flex');
        document.body.classList.remove('modal-open');
        productForm.reset(); // Reset form fields when closing
    };

    // --- Function to add a new product row to the table ---
    const addProductToTable = (productData) => {
        const newRow = document.createElement('tr');
        newRow.classList.add('border-b', 'border-[var(--color-border)]');

        const statusBadge = productData.status === 'published' 
            ? `<span class="inline-flex items-center bg-green-900 text-green-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"><span class="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>Publicado</span>`
            : `<span class="inline-flex items-center bg-yellow-900 text-yellow-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"><span class="w-2 h-2 mr-1 bg-yellow-500 rounded-full"></span>Borrador</span>`;

        newRow.innerHTML = `
            <td class="px-6 py-4 font-medium text-[var(--color-text-primary)] whitespace-nowrap">${productData.name}</td>
            <td class="px-6 py-4 text-[var(--color-text-secondary)]">${productData.sku}</td>
            <td class="px-6 py-4">${statusBadge}</td>
            <td class="px-6 py-4 text-right space-x-4">
                <button class="font-medium text-[var(--color-accent)] hover:underline">Editar</button>
                <button class="font-medium text-red-500 hover:underline">Eliminar</button>
            </td>
        `;
        productTableBody.appendChild(newRow);
    };


    // --- Event Listeners ---

    // Open the modal when "Añadir Nuevo Producto" is clicked
    if (addProductBtn) {
        addProductBtn.addEventListener('click', openModal);
    }

    // Close the modal with 'X' button or by clicking the backdrop
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }
    
    // Handle the product form submission
    if (productForm) {
        productForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Determine if "Publish" or "Draft" was clicked
            const action = event.submitter.value;

            const formData = new FormData(productForm);
            const newProduct = {
                name: formData.get('product-name'),
                sku: formData.get('product-sku'),
                status: action === 'publish' ? 'published' : 'draft',
            };

            // In a real app, you would send this data to a server.
            // Here, we just add it to the table.
            addProductToTable(newProduct);
            
            console.log('Product submitted:', newProduct);

            closeModal(); // Close the modal after submission
        });
    }
    
    // Add event listeners for dynamically created edit/delete buttons (delegation)
    productTableBody.addEventListener('click', (event) => {
        if (event.target.textContent === 'Eliminar') {
            if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                // In a real app, send a delete request to the server
                event.target.closest('tr').remove();
                alert('Producto eliminado.');
            }
        }
        if (event.target.textContent === 'Editar') {
            // In a real app, you would populate the modal with this row's data
            alert('Funcionalidad de editar próximamente.');
            // openModal(); // You could open the modal here and pre-fill it
        }
    });

    // Allow closing the modal with the Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !productModal.classList.contains('hidden')) {
            closeModal();
        }
    });
});
