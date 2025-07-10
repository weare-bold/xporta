/**
 * ruta.js for XPORTA - Personalized Exporter Roadmap
 * This script dynamically generates a checklist of tasks for the user,
 * personalizes it based on previously stored data, and tracks progress.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Data Structure for the Roadmap ---
    // This defines all possible tasks, grouped by phase.
    const roadmapPhases = [
        {
            title: 'Fase 1: Preparación Legal y Fiscal',
            tasks: [
                { id: 'task-rfc', text: 'Regístrate en el SAT y obtén tu RFC', link: '#', diagnosticKey: 'rfc', completedValue: 'si' },
                { id: 'task-padron', text: 'Inscríbete en el Padrón de Exportadores', link: '#', diagnosticKey: null },
            ]
        },
        {
            title: 'Fase 2: Adaptación del Producto',
            tasks: [
                { id: 'task-diagnostico', text: 'Realiza tu Diagnóstico Exportador', link: 'index.html', diagnosticKey: null, preCompleted: true }, // Always completed as it's a prerequisite
                { id: 'task-empaque', text: 'Define tu empaque y etiquetado para exportación', link: '#', diagnosticKey: 'packaging', completedValue: 'si' },
                { id: 'task-fraccion', text: 'Identifica la Fracción Arancelaria de tu producto', link: 'articulo_fraccion.html', diagnosticKey: 'tariff', completedValue: 'si' },
            ]
        },
        {
            title: 'Fase 3: Logística y Envío',
            tasks: [
                { id: 'task-incoterms', text: 'Define los Incoterms de tu venta', link: 'articulo_incoterms.html', diagnosticKey: null },
                { id: 'task-costos', text: 'Estima tus costos de exportación', link: 'calculadora.html', diagnosticKey: null },
                { id: 'task-proveedor', text: 'Encuentra un Agente Aduanal y de Logística', link: 'proveedores.html', diagnosticKey: null },
            ]
        }
    ];

    // --- Get DOM Elements ---
    const roadmapContainer = document.getElementById('roadmap-container');
    const overallProgressBar = document.getElementById('overall-progress-bar');
    const overallProgressText = document.getElementById('overall-progress-text');

    // --- Main Functions ---

    // Function to generate the entire roadmap HTML
    const generateRoadmap = () => {
        // For this simulation, we'll create some dummy diagnostic data.
        // In a real app, this would be saved when the user completes the diagnostic form.
        // To test, you can manually set these in your browser's console:
        // localStorage.setItem('xporta-diagnostic-rfc', 'si');
        // localStorage.setItem('xporta-diagnostic-packaging', 'no');
        // localStorage.setItem('xporta-diagnostic-tariff', 'si');
        
        let totalTasks = 0;
        roadmapContainer.innerHTML = ''; // Clear previous content

        roadmapPhases.forEach(phase => {
            let phaseHTML = `
                <div class="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-6 shadow-lg">
                    <h3 class="text-xl font-bold text-white mb-4">${phase.title}</h3>
                    <div class="space-y-3">
            `;
            
            phase.tasks.forEach(task => {
                totalTasks++;
                const diagnosticData = task.diagnosticKey ? localStorage.getItem(`xporta-diagnostic-${task.diagnosticKey}`) : null;
                const isCompleted = task.preCompleted || (diagnosticData === task.completedValue);

                phaseHTML += `
                    <label for="${task.id}" class="flex items-center p-3 rounded-md transition-colors hover:bg-[color-mix(in_srgb,var(--color-border)_20%,transparent)] cursor-pointer">
                        <input type="checkbox" id="${task.id}" class="task-checkbox h-5 w-5 rounded border-gray-500 bg-gray-700 text-[var(--color-accent)] focus:ring-[var(--color-accent)]" ${isCompleted ? 'checked' : ''}>
                        <span class="ml-3 flex-grow text-[var(--color-text-primary)]">${task.text}</span>
                        <a href="${task.link}" class="text-xs font-semibold text-[var(--color-accent)] hover:underline ml-4">Ir a la herramienta &rarr;</a>
                    </label>
                `;
            });

            phaseHTML += `</div></div>`;
            roadmapContainer.innerHTML += phaseHTML;
        });

        return totalTasks;
    };

    // Function to update the overall progress bar
    const updateOverallProgress = (totalTasks) => {
        const completedCheckboxes = document.querySelectorAll('.task-checkbox:checked');
        const completedCount = completedCheckboxes.length;
        const percentage = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

        overallProgressBar.style.width = `${percentage}%`;
        overallProgressText.textContent = `${Math.round(percentage)}%`;
    };

    // --- Initial Setup and Event Listeners ---

    const totalTasks = generateRoadmap();
    updateOverallProgress(totalTasks);

    const taskCheckboxes = document.querySelectorAll('.task-checkbox');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => updateOverallProgress(totalTasks));
    });
});
