// elementos html
const salesForm = document.getElementById('sales-form');
const monthInput = document.getElementById('month');
const amountInput = document.getElementById('amount');
const salesList = document.getElementById('sales-list');
const chartContainer = document.querySelector('.chart-container');

// datos para el gráfico
const initialData = {
    labels: [],
    datasets: [{
        label: 'Ventas Mensuales',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
    }],
};

// configuración del gráfico
const chartConfig = {
    type: 'bar',
    data: initialData,
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
};

// gráfico con datos iniciales
const ctx = document.getElementById('monthly-chart').getContext('2d');
const chart = new Chart(ctx, chartConfig);

// array ventas
const salesData = [];

// agregar ventas
function addSale(month, amount) {
    const sale = { month, amount };
    salesData.push(sale);
    updateChart();
    updateSalesList();
}

// actualizar el gráfico
function updateChart() {
    const months = [];
    const amounts = [];
    
    salesData.forEach((sale) => {
        months.push(sale.month);
        amounts.push(sale.amount);
    });

    chart.data.labels = months;
    chart.data.datasets[0].data = amounts;
    chart.update();
}

// actualizar lista de ventas
function updateSalesList() {
    salesList.innerHTML = '';
    salesData.forEach((sale, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${sale.month}: ${sale.amount} <button onclick="deleteSale(${index})">Eliminar</button>`;
        salesList.appendChild(listItem);
    });
}

// eliminar ventas
function deleteSale(index) {
    salesData.splice(index, 1);
    updateChart();
    updateSalesList();
}

// envío del formulario
salesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const month = monthInput.value;
    const amount = parseInt(amountInput.value);

    if (!isNaN(amount) && month.trim() !== '') {
        addSale(month, amount);
        monthInput.value = '';
        amountInput.value = '';
    }
});

      // api ficticia
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
async function loadSales() {
    try {
        const response = await fetch(apiUrl);
        const salesData = await response.json();
        // datos de respuesta
    } catch (error) {
        console.error('Error al cargar las ventas:', error);
    }
}
