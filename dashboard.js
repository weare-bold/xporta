/**
 * dashboard.js for XPORTA
 * This script personalizes the dashboard by displaying the user's name,
 * which is retrieved from localStorage.
 */

document.addEventListener('DOMContentLoaded', () => {

    // Get the span element where the user's name will be displayed.
    const userNameElement = document.getElementById('user-name');

    // Retrieve the user's name from localStorage.
    const userName = localStorage.getItem('xportaUserName');

    // Check if a name was found in localStorage.
    if (userName && userNameElement) {
        // If a name exists, display it.
        userNameElement.textContent = userName;
    } else if (userNameElement) {
        // If no name is found, display a generic fallback.
        userNameElement.textContent = 'Exportador';
    }

});
