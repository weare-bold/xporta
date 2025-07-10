/**
 * calculadora.js for XPORTA - Cost Calculator SPA
 * This script handles form submission, calculates export costs,
 * and displays a detailed breakdown with a dynamic doughnut chart.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Get references to all the necessary elements from the HTML.
    const form = document.getElementById('cost-calculator-form');
    const resultsContainer = document.getElementById('results-container');
    const resultsPlaceholder = document.getElementById('results-placeholder');
    const resultsContent = document.getElementById('results-content');
    const costBreakdownDiv = document.getElementById('cost-breakdown');
    
    // Get the canvas context for Chart.js
    const chartCanvas = document.getElementById('cost-chart').getContext('2d');
    let costChart = null; // Variable to hold the chart instance

    // Add an event listener for the 'submit' event on the form.
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default browser behavior.

        // --- 1. GATHER DATA & CONVERT TO NUMBERS ---
        const formData = new FormData(form);
        const productValue = parseFloat(formData.get('product-value')) || 0;
        const unitCount = parseInt(formData.get('unit-count')) || 0;
        const freightCost = parseFloat(formData.get('freight-cost')) || 0;
        const insuranceCost = parseFloat(formData.get('insurance-cost')) || 0;
        const agentFees = parseFloat(formData.get('agent-fees')) || 0;
        const importTariffPercent = parseFloat(formData.get('import-tariff')) || 0;

        // --- 2. PERFORM CALCULATIONS ---
        if (unitCount === 0) {
            alert('El número de unidades debe ser mayor a cero.');
            return;
        }

        const totalMerchandiseValue = productValue * unitCount;
        const importTariffAmount = totalMerchandiseValue * (importTariffPercent / 100);
        const totalExportCost = freightCost + insuranceCost + agentFees + importTariffAmount;
        const grandTotal = totalMerchandiseValue + totalExportCost;
        const costPerUnit = grandTotal / unitCount;

        // --- 3. GENERATE HTML FOR TEXT BREAKDOWN ---
        const formatCurrency = (value) => {
            return value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
        };

        const breakdownHTML = `
            <div class="space-y-3 text-sm mt-4">
                <div class="flex justify-between items-center"><span class="text-gray-400">Valor de la Mercancía:</span><span class="font-semibold text-white">${formatCurrency(totalMerchandiseValue)}</span></div>
                <div class="flex justify-between items-center"><span class="text-gray-400">Costo de Flete:</span><span class="font-semibold text-white">${formatCurrency(freightCost)}</span></div>
                <div class="flex justify-between items-center"><span class="text-gray-400">Costo de Seguro:</span><span class="font-semibold text-white">${formatCurrency(insuranceCost)}</span></div>
                <div class="flex justify-between items-center"><span class="text-gray-400">Gastos Aduanales:</span><span class="font-semibold text-white">${formatCurrency(agentFees)}</span></div>
                <div class="flex justify-between items-center pb-3 border-b border-gray-600"><span class="text-gray-400">Arancel (${importTariffPercent}%):</span><span class="font-semibold text-white">${formatCurrency(importTariffAmount)}</span></div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-600 text-center">
                <p class="text-gray-400 text-sm uppercase tracking-wider">Costo Final por Unidad</p>
                <p class="text-4xl font-bold text-orange-400 my-1">${formatCurrency(costPerUnit)}</p>
                <p class="text-gray-500 text-xs mt-2">Este es el costo total para poner una unidad de tu producto en el país de destino.</p>
            </div>
        `;
        
        // --- 4. CREATE/UPDATE THE CHART ---
        // Destroy the previous chart instance if it exists
        if (costChart) {
            costChart.destroy();
        }

        costChart = new Chart(chartCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Valor Mercancía', 'Flete', 'Seguro', 'Agente Aduanal', 'Aranceles'],
                datasets: [{
                    label: 'Desglose de Costos',
                    data: [totalMerchandiseValue, freightCost, insuranceCost, agentFees, importTariffAmount],
                    backgroundColor: [
                        '#374151', // gray-700
                        '#F97316', // orange-500
                        '#FB923C', // orange-400
                        '#FDBA74', // orange-300
                        '#4B5563'  // gray-600
                    ],
                    borderColor: '#1F2937', // bg-gray-800
                    borderWidth: 2,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#D1D5DB', // text-gray-300
                            boxWidth: 12,
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });

        // --- 5. DISPLAY RESULTS ---
        costBreakdownDiv.innerHTML = breakdownHTML;
        resultsPlaceholder.classList.add('hidden');
        resultsContent.classList.remove('hidden');
    });
});
