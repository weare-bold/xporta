/**
 * app.js for XPORTA
 * This script contains shared functionality for the entire application, including:
 * 1. Dynamically loading reusable components (header, footer).
 * 2. Handling the light/dark theme switcher.
 * 3. Providing global navigation links like settings.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Component Injection ---
    const headerPlaceholder = document.getElementById('main-header');
    const footerPlaceholder = document.getElementById('main-footer');

    const headerHTML = `
        <header class="bg-[var(--color-bg-secondary)]/80 backdrop-blur-sm border-b border-[var(--color-border)] sticky top-0 z-40">
            <div class="container mx-auto px-6 py-3 flex justify-between items-center">
                <a href="dashboard.html" class="flex items-center">
                    <svg class="w-8 h-8 text-[var(--color-accent)] mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                    </svg>
                    <h1 class="text-2xl font-bold text-[var(--color-text-primary)]">
                        <span class="text-[var(--color-accent)]">XPORTA</span>
                    </h1>
                </a>
                <div class="flex items-center gap-2 md:gap-4">
                    <!-- New Settings Link -->
                    <a href="configuracion.html" title="Configuración de Cuenta" class="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors p-2 rounded-lg hover:bg-[color-mix(in_srgb,var(--color-border)_50%,transparent)]">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </a>
                    <button id="theme-toggle" type="button" class="text-[var(--color-text-secondary)] hover:bg-[color-mix(in_srgb,var(--color-border)_50%,transparent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border)] rounded-lg text-sm p-2.5 transition-colors">
                        <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                        <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 5.05A1 1 0 003.636 6.464l.707.707a1 1 0 001.414-1.414l-.707-.707zM3 11a1 1 0 100-2H2a1 1 0 100 2h1zM6.464 16.364a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414z"></path></svg>
                    </button>
                     <a href="login.html" class="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Cerrar Sesión</a>
                </div>
            </div>
        </header>
    `;

    const footerHTML = `
        <footer class="text-center py-6 mt-8 border-t border-[var(--color-border)]">
            <p class="text-sm text-[var(--color-text-muted)]">&copy; 2025 XPORTA. Todos los derechos reservados.</p>
        </footer>
    `;

    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
    }
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }

    // --- Theme Switcher Logic ---
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const themeToggleButton = document.getElementById('theme-toggle');

    const applyTheme = () => {
        const savedTheme = localStorage.getItem('xporta-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
            document.body.classList.add('light-mode');
            if(themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
            if(themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
        } else {
            document.body.classList.remove('light-mode');
            if(themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
            if(themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
        }
    };

    applyTheme();

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('xporta-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
            applyTheme();
        });
    }
});
