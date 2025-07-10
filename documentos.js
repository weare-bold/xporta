/**
 * documentos.js for XPORTA - Document Manager
 * This script handles the interactivity of the document checklist,
 * updating the progress bar and item styles based on their status.
 */

document.addEventListener('DOMContentLoaded', () => {

    // Get all the necessary elements from the DOM
    const statusDropdowns = document.querySelectorAll('.document-status');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const totalDocuments = statusDropdowns.length;

    // Function to update the progress bar and text
    const updateProgress = () => {
        let completedCount = 0;
        
        // Count how many documents are marked as 'completado'
        statusDropdowns.forEach(dropdown => {
            if (dropdown.value === 'completado') {
                completedCount++;
            }
        });

        // Calculate the completion percentage
        const percentage = totalDocuments > 0 ? (completedCount / totalDocuments) * 100 : 0;

        // Update the progress bar width and the text
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${Math.round(percentage)}%`;
    };

    // Function to update the style of a document item based on its status
    const updateItemStyle = (dropdown) => {
        const parentItem = dropdown.closest('.document-item');
        
        // Remove all previous color classes
        parentItem.classList.remove('border-green-500', 'bg-green-900/20', 'border-yellow-500', 'bg-yellow-900/20');

        if (dropdown.value === 'completado') {
            parentItem.classList.add('border-green-500', 'bg-green-900/20');
        } else if (dropdown.value === 'en_revision') {
            parentItem.classList.add('border-yellow-500', 'bg-yellow-900/20');
        }
    };

    // Add an event listener to each status dropdown
    statusDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', () => {
            updateProgress();
            updateItemStyle(dropdown);
        });

        // Apply initial style on page load
        updateItemStyle(dropdown);
    });

    // Initial calculation of progress when the page loads
    updateProgress();
});
