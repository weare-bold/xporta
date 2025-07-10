/**
 * marketplace.js for XPORTA - Marketplace Page
 * This script handles the real-time search and filtering functionality
 * for the product grid.
 */

document.addEventListener('DOMContentLoaded', () => {

    // Get references to all the interactive elements
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const originFilter = document.getElementById('origin-filter');
    const productGrid = document.getElementById('product-grid');
    const productCards = document.querySelectorAll('.product-card');
    const noResultsMessage = document.getElementById('no-results');

    // This is the main function that will be called whenever a filter changes
    const filterProducts = () => {
        // Get the current values from the filters, converted to lowercase for case-insensitive search
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedOrigin = originFilter.value;
        
        let visibleProducts = 0;

        // Loop through each product card to decide if it should be shown or hidden
        productCards.forEach(card => {
            // Get the data attributes from the card element
            const cardName = card.dataset.name.toLowerCase();
            const cardCategory = card.dataset.category;
            const cardOrigin = card.dataset.origin;

            // Check if the card matches all the selected filters
            const matchesSearch = cardName.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;
            const matchesOrigin = selectedOrigin === 'all' || cardOrigin === selectedOrigin;

            // If the card matches all criteria, show it. Otherwise, hide it.
            if (matchesSearch && matchesCategory && matchesOrigin) {
                card.classList.remove('hidden');
                visibleProducts++;
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Show or hide the "No results" message based on how many products are visible
        if (visibleProducts === 0) {
            noResultsMessage.classList.remove('hidden');
        } else {
            noResultsMessage.classList.add('hidden');
        }
    };

    // Add event listeners to all the filter elements.
    // The 'input' event fires immediately when the user types.
    searchInput.addEventListener('input', filterProducts);
    // The 'change' event fires when the user selects a new option from the dropdown.
    categoryFilter.addEventListener('change', filterProducts);
    originFilter.addEventListener('change', filterProducts);

});
