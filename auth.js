/**
 * auth.js for XPORTA - Authentication Page
 * This script handles toggling between login and register forms
 * and simulates a successful login, saving the user's name to localStorage.
 */

document.addEventListener('DOMContentLoaded', () => {

    // Get references to all the necessary elements from the HTML.
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');

    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // --- Event Listeners for Toggling Forms ---

    showRegisterBtn.addEventListener('click', () => {
        loginContainer.classList.add('hidden');
        registerContainer.classList.remove('hidden');
    });

    showLoginBtn.addEventListener('click', () => {
        registerContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
    });


    // --- Event Listeners for Form Submissions ---

    // Handle the login form submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // --- SIMULATION ---
        // For this prototype, we'll get the user's name from the email
        // (e.g., "juan.perez@email.com" becomes "Juan Perez")
        // and save it to localStorage.
        const email = event.target.email.value;
        const nameFromEmail = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        localStorage.setItem('xportaUserName', nameFromEmail);
        
        console.log('Login attempt with:', { email: email });

        // Redirect to the dashboard
        window.location.href = 'dashboard.html';
    });

    // Handle the registration form submission
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // --- SIMULATION ---
        // Get the full name from the form and save it to localStorage.
        const fullName = event.target.fullname.value;
        localStorage.setItem('xportaUserName', fullName);

        console.log('Registration attempt with:', {
            fullname: fullName,
            email: event.target.email.value,
        });

        // Redirect to the dashboard
        window.location.href = 'dashboard.html';
    });

});
