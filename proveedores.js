/**
 * proveedores.js for XPORTA - Provider Network
 * This script handles the real-time search and filtering functionality
 * for the provider directory.
 */

document.addEventListener('DOMContentLoaded', () => {

    // Get references to all the interactive elements
    const searchInput = document.getElementById('search-input');
    const serviceFilter = document.getElementById('service-filter');
    const locationFilter = document.getElementById('location-filter');
    const providerGrid = document.getElementById('provider-grid');
    const providerCards = document.querySelectorAll('.provider-card');
    const noResultsMessage = document.getElementById('no-results');

    // This is the main function that will be called whenever a filter changes
    const filterProviders = () => {
        // Get the current values from the filters
        const searchTerm = searchInput.value.toLowerCase();
        const selectedService = serviceFilter.value;
        const selectedLocation = locationFilter.value;
        
        let visibleProviders = 0;

        // Loop through each provider card to decide if it should be shown or hidden
        providerCards.forEach(card => {
            // Get the data attributes from the card element
            const cardName = card.dataset.name.toLowerCase();
            const cardService = card.dataset.service;
            const cardLocation = card.dataset.location;

            // Check if the card matches all the selected filters
            const matchesSearch = cardName.includes(searchTerm);
            const matchesService = selectedService === 'all' || cardService === selectedService;
            const matchesLocation = selectedLocation === 'all' || cardLocation === selectedLocation;

            // If the card matches all criteria, show it. Otherwise, hide it.
            if (matchesSearch && matchesService && matchesLocation) {
                card.classList.remove('hidden');
                visibleProviders++;
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Show or hide the "No results" message
        if (visibleProviders === 0) {
            noResultsMessage.classList.remove('hidden');
        } else {
            noResultsMessage.classList.add('hidden');
        }
    };

    // Add event listeners to all the filter elements.
    // The 'input' event fires immediately when the user types.
    searchInput.addEventListener('input', filterProviders);
    // The 'change' event fires when the user selects a new option.
    serviceFilter.addEventListener('change', filterProviders);
    locationFilter.addEventListener('change', filterProviders);

});
