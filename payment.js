const salaryInput = document.getElementById("salaryInput");
const expenseInput = document.getElementById("expenseInput");
const dateInput = document.getElementById("dateInput");
const expenseType = document.getElementById("expenseType");
const addButton = document.getElementById("addButton");
const editButton = document.getElementById("editButton");
const deleteButton = document.getElementById("deleteButton");

let expenses = [];
let chartInitialized = false;

addButton.addEventListener("click", () => {
    const expense = {
        amount: parseFloat(expenseInput.value),
        type: expenseType.value,
        date: dateInput.value,
    };

    if (expense.type && expense.amount && expense.date) {
        expenses.push(expense);
        updateCharts();
        clearInputs();
    } else {
        alert("Please enter a valid amount, select an expense type, and choose a date.");
    }
});

editButton.addEventListener("click", () => {
    const dateToEdit = dateInput.value;
    const expenseIndex = expenses.findIndex(exp => exp.date === dateToEdit);

    if (expenseIndex !== -1) {
        expenses[expenseIndex].amount = parseFloat(expenseInput.value);
        expenses[expenseIndex].type = expenseType.value;
        updateCharts();
        clearInputs();
    } else {
        alert("Expense entry not found for the selected date.");
    }
});

deleteButton.addEventListener("click", () => {
    const dateToDelete = dateInput.value;
    const expenseIndex = expenses.findIndex(exp => exp.date === dateToDelete);

    if (expenseIndex !== -1) {
        expenses.splice(expenseIndex, 1);
        updateCharts();
        clearInputs();
    } else {
        alert("Expense entry not found for the selected date.");
    }
});

function updateCharts() {
    if (!chartInitialized) {
        initializeCharts();
    }
    updateBarChart();
    updatePieChart();
}

function clearInputs() {
    salaryInput.value = "";
    expenseInput.value = "";
    dateInput.value = "";
    expenseType.value = ""; // Clear the selected expense type
}

let barChart, pieChart;

function initializeCharts() {
    const ctxBar = document.getElementById("barChart").getContext("2d");
    const ctxPie = document.getElementById("pieChart").getContext("2d");

    barChart = new Chart(ctxBar, {
        type: "bar",
        data: {
            labels: ["Food", "Rent", "Utilities", "Transport", "Groceries"],
            datasets: [{
                label: "Monthly Expenses",
                data: [0, 0, 0, 0, 0], // Initial data
                backgroundColor: ["#4BC0C0", "#FF6384", "#FFCE56", "#36A2EB", "#9966FF"],
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    pieChart = new Chart(ctxPie, {
        type: "pie",
        data: {
            labels: ["Food", "Rent", "Utilities", "Transport", "Groceries"],
            datasets: [{
                label: "Monthly Expenses Overview",
                data: [0, 0, 0, 0, 0], // Initial data
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            }],
        },
    });

    chartInitialized = true;
}

function updateBarChart() {
    const categories = ["Food", "Rent", "Utilities", "Transport", "Groceries"];
    const data = [0, 0, 0, 0, 0];

    expenses.forEach(expense => {
        const index = categories.indexOf(expense.type);
        if (index > -1) {
            data[index] += expense.amount;
        }
    });

    barChart.data.datasets[0].data = data;
    barChart.update();
}

function updatePieChart() {
    const data = [0, 0, 0, 0, 0];

    expenses.forEach(expense => {
        const index = ["Food", "Rent", "Utilities", "Transport", "Groceries"].indexOf(expense.type);
        if (index > -1) {
            data[index] += expense.amount;
        }
    });

    pieChart.data.datasets[0].data = data;
    pieChart.update();
}

