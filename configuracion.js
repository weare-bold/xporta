/**
 * configuracion.js for XPORTA - Account Settings Page
 * This script handles populating user data and simulating form submissions.
 */

document.addEventListener('DOMContentLoaded', () => {

    // Get references to the input fields
    const fullNameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');

    // --- Populate User Data on Page Load ---
    const loadUserData = () => {
        // Retrieve the user's name from localStorage (saved during login/register)
        const userName = localStorage.getItem('xportaUserName');
        
        // For simulation, we'll derive an email from the name.
        // In a real app, this would also be stored.
        const userEmail = userName ? `${userName.toLowerCase().replace(/\s/g, '.')}@xporta.com` : 'usuario@xporta.com';

        if (fullNameInput && userName) {
            fullNameInput.value = userName;
        }

        if (emailInput && userEmail) {
            emailInput.value = userEmail;
        }
    };

    // --- Event Listeners for Form Buttons (Simulation) ---
    // In a real application, these would trigger API calls to a server.

    const profileForm = document.querySelector('#settings-form fieldset:nth-of-type(1)');
    const passwordForm = document.querySelector('#settings-form fieldset:nth-of-type(2)');

    if (profileForm) {
        const saveProfileBtn = profileForm.querySelector('button');
        saveProfileBtn.addEventListener('click', () => {
            const newName = fullNameInput.value;
            // Save the updated name back to localStorage
            localStorage.setItem('xportaUserName', newName);
            alert('Perfil actualizado con éxito.');
        });
    }

    if (passwordForm) {
        const savePasswordBtn = passwordForm.querySelector('button');
        savePasswordBtn.addEventListener('click', () => {
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (!newPassword || newPassword !== confirmPassword) {
                alert('La nueva contraseña no coincide. Por favor, inténtalo de nuevo.');
                return;
            }
            if (newPassword.length < 8) {
                alert('La nueva contraseña debe tener al menos 8 caracteres.');
                return;
            }

            alert('Contraseña actualizada con éxito.');
            // Clear password fields after submission
            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-password').value = '';
        });
    }

    // --- Initial Load ---
    loadUserData();

});
