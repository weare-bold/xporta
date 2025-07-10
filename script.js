/**
 * script.js for XPORTA - Diagnóstico Exportador SPA
 * This script handles form submission, analyzes input, calculates a score,
 * generates a visual meter, displays a report, AND saves key answers
 * to localStorage for other modules to use.
 */

document.addEventListener('DOMContentLoaded', () => {

    // Get references to all the necessary elements from the HTML.
    const form = document.getElementById('diagnostic-form');
    const resultsSection = document.getElementById('results-section');
    const scoreMeterContainer = document.getElementById('score-meter-container');
    const resultsContent = document.getElementById('results-content');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent page reload.

        // --- 1. GATHER DATA ---
        const formData = new FormData(form);
        const data = {
            companyName: formData.get('company-name'),
            productName: formData.get('product-name'),
            packaging: formData.get('packaging'),
            rfc: formData.get('rfc'),
            tariff: formData.get('tariff'),
            production: formData.get('production'),
        };

        // --- NEW: SAVE DIAGNOSTIC RESULTS TO LOCALSTORAGE ---
        // This makes the data available to other pages, like the Roadmap.
        if (data.rfc) localStorage.setItem('xporta-diagnostic-rfc', data.rfc);
        if (data.packaging) localStorage.setItem('xporta-diagnostic-packaging', data.packaging);
        if (data.tariff) localStorage.setItem('xporta-diagnostic-tariff', data.tariff);
        if (data.production) localStorage.setItem('xporta-diagnostic-production', data.production);
        // --- END OF NEW SECTION ---


        // --- 2. ANALYZE DATA & CALCULATE SCORE ---
        let strengths = [];
        let recommendations = [];
        let score = 0;
        const maxScore = 100;

        // RFC Analysis (Value: 35 points)
        if (data.rfc === 'si') {
            score += 35;
            strengths.push('✅  **Registro Fiscal (RFC):** ¡Excelente! Ya cuentas con tu RFC, un paso indispensable para cualquier trámite de exportación.');
        } else {
            recommendations.push('⚠️ **Registro Fiscal (RFC):** Es fundamental que te des de alta en el SAT. El RFC es necesario para inscribirte en el padrón de exportadores. ¡Podemos guiarte en el proceso!');
        }

        // Packaging Analysis (Value: 25 points)
        if (data.packaging === 'si') {
            score += 25;
            strengths.push('✅  **Empaque y Etiqueta:** Muy bien. Tener un empaque listo para la venta te acerca a los estándares internacionales.');
        } else if (data.packaging === 'en_proceso') {
            score += 10;
            recommendations.push('💡 **Empaque y Etiqueta:** Vas por buen camino. Asegúrate de que tu empaque proteja bien el producto y que la etiqueta cumpla con las normas del país de destino.');
        } else if (data.packaging === 'no') {
            recommendations.push('⚠️ **Empaque y Etiqueta:** Este es un punto crítico. Necesitarás un empaque resistente y una etiqueta con información clave (ingredientes, peso, origen, etc.).');
        }

        // Tariff Classification Analysis (Value: 20 points)
        if (data.tariff === 'si') {
            score += 20;
            strengths.push('✅  **Fracción Arancelaria:** ¡Felicidades! Conocer tu fracción arancelaria te permite saber qué impuestos y regulaciones aplican. Has avanzado mucho.');
        } else {
            recommendations.push('💡 **Fracción Arancelaria:** No te preocupes, es un tema complejo. Identificar la fracción arancelaria de tu producto es un paso clave. En XPORTA tenemos herramientas para ayudarte.');
        }

        // Production Capacity Analysis (Value: 20 points)
        if (data.production === 'si_facilmente') {
            score += 20;
            strengths.push('✅  **Capacidad Productiva:** Tu capacidad para escalar la producción es una gran ventaja competitiva para atender pedidos más grandes.');
        } else if (data.production === 'con_inversion') {
            score += 10;
            recommendations.push('💡 **Capacidad Productiva:** Es bueno que identifiques la necesidad de inversión. Planificar cómo aumentar tu producción será clave para tu crecimiento internacional.');
        } else {
            recommendations.push('⚠️ **Capacidad Productiva:** Ser consciente de tus límites actuales es importante. Explora opciones para optimizar tu producción o buscar socios que te ayuden a escalar.');
        }

        // --- 3. GENERATE HTML FOR SCORE METER ---
        let scoreTitle = '';
        let scoreColorClass = '';

        if (score < 40) {
            scoreTitle = 'Un Buen Comienzo';
            scoreColorClass = 'bg-red-500';
        } else if (score < 75) {
            scoreTitle = 'Camino Sólido';
            scoreColorClass = 'bg-yellow-500';
        } else {
            scoreTitle = '¡Excelente Preparación!';
            scoreColorClass = 'bg-green-500';
        }

        const meterHTML = `
            <div class="text-center">
                <p class="text-lg font-semibold text-gray-300">Tu Potencial Exportador:</p>
                <p class="text-2xl font-bold ${scoreColorClass.replace('bg-', 'text-')}">${scoreTitle}</p>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-4 mt-2">
                <div class="${scoreColorClass} h-4 rounded-full transition-all duration-1000 ease-out" style="width: ${score}%"></div>
            </div>
        `;

        // --- 4. GENERATE HTML FOR TEXT RESULTS ---
        let resultsHTML = `<p class="mb-6 mt-8">Hola, ${data.companyName || 'emprendedor(a)'}. Basado en tus respuestas, aquí tienes un resumen detallado:</p>`;

        if (strengths.length > 0) {
            resultsHTML += '<h4 class="text-lg font-semibold text-green-400 mb-2">Tus Fortalezas:</h4><ul class="list-disc list-inside space-y-2 mb-6">';
            strengths.forEach(item => {
                resultsHTML += `<li>${item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`;
            });
            resultsHTML += '</ul>';
        }

        if (recommendations.length > 0) {
            resultsHTML += '<h4 class="text-lg font-semibold text-yellow-400 mb-2">Recomendaciones y Siguientes Pasos:</h4><ul class="list-disc list-inside space-y-2">';
            recommendations.forEach(item => {
                resultsHTML += `<li>${item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`;
            });
            resultsHTML += '</ul>';
        }
        
        resultsHTML += `<p class="mt-8 pt-4 border-t border-gray-600 text-center font-bold text-orange-400">¡Estás en el lugar correcto! XPORTA te guiará en cada uno de estos pasos.</p>`;

        // --- 5. DISPLAY RESULTS ---
        scoreMeterContainer.innerHTML = meterHTML;
        resultsContent.innerHTML = resultsHTML;
        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
