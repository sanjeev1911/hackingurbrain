document.addEventListener('DOMContentLoaded', loadDataFromLocalStorage);

// Handle form submission
document.getElementById('recycling-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const materialSelect = document.getElementById('material');
    const material = materialSelect.value === 'others' ? document.getElementById('other-material').value : materialSelect.value;
    const weight = parseFloat(document.getElementById('weight').value);

    if (material && weight >= 0) {
        addDataToTable(material, weight);
        saveDataToLocalStorage(material, weight);
        updateChart();
        this.reset(); // Reset the form
        document.getElementById('other-material-container').style.display = 'none'; // Hide the input field
    }
});

// Show or hide the input field for "Others"
document.getElementById('material').addEventListener('change', function() {
    const otherMaterialContainer = document.getElementById('other-material-container');
    if (this.value === 'others') {
        otherMaterialContainer.style.display = 'block'; // Show input field
    } else {
        otherMaterialContainer.style.display = 'none'; // Hide input field
    }
});

// Handle material filter change
document.getElementById('filter-material').addEventListener('change', function() {
    const selectedMaterial = this.value;
    filterData(selectedMaterial);
});

// Initialize chart variable
let myChart;

// Function to add data to the table
function addDataToTable(material, weight) {
    const tableBody = document.getElementById('data-table').querySelector('tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${material}</td>
        <td>${weight}</td>
        <td><button class="delete" onclick="deleteRow(this)">Delete</button></td>
    `;

    tableBody.appendChild(newRow);
}

// Function to save data to local storage
function saveDataToLocalStorage(material, weight) {
    let recyclingData = JSON.parse(localStorage.getItem('recyclingData')) || [];
    recyclingData.push({ material, weight });
    localStorage.setItem('recyclingData', JSON.stringify(recyclingData));
}

// Function to load data from local storage
function loadDataFromLocalStorage() {
    const recyclingData = JSON.parse(localStorage.getItem('recyclingData')) || [];
    recyclingData.forEach(data => {
        addDataToTable(data.material, data.weight);
    });
    updateChart();
}

// Function to filter data based on selected material
function filterData(selectedMaterial) {
    const rows = document.querySelectorAll('#data-table tbody tr');
    rows.forEach(row => {
        const materialType = row.cells[0].textContent;
        if (selectedMaterial === '' || materialType === selectedMaterial) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    updateChart();
}

// Function to delete a row from the table
function deleteRow(button) {
    const row = button.closest('tr');
    const material = row.cells[0].textContent;
    const weight = parseFloat(row.cells[1].textContent);
    row.remove();
    removeDataFromLocalStorage(material, weight);
    updateChart();
}

// Function to remove data from local storage
function removeDataFromLocalStorage(material, weight) {
    let recyclingData = JSON.parse(localStorage.getItem('recyclingData')) || [];
    recyclingData = recyclingData.filter(data => !(data.material === material && data.weight === weight));
    localStorage.setItem('recyclingData', JSON.stringify(recyclingData));
}

// Function to update the chart
function updateChart() {
    const tableBody = document.getElementById('data-table').querySelector('tbody');
    const data = Array.from(tableBody.rows).map(row => ({
        material: row.cells[0].textContent,
        weight: parseFloat(row.cells[1].textContent)
    }));

    const labels = data.map(item => item.material);
    const weights = data.map(item => item.weight);

    if (myChart) {
        myChart.destroy();
    }

    const chartType = document.getElementById('chartType').value;
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'Weight (kg)',
                data: weights,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6 )', // Paper
                    'rgba(54, 162, 235, 0.6)', // Plastic
                    'rgba(255, 206, 86, 0.6)',  // Metal
                    'rgba(75, 192, 192, 0.6)'   // Others
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', // Paper
                    'rgba(54, 162, 235, 1)', // Plastic
                    'rgba(255, 206, 86, 1)',  // Metal
                    'rgba(75, 192, 192, 1)'   // Others
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#333',
                        font: {
                            
                            size: 14
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw} kg`;
                        }
                    }
                }
            }
        }
    });
}

// Call updateChart initially to render the chart with existing data
updateChart();