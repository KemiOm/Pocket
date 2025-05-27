const stockSelect = document.getElementById('stockSelect');
const showMeBtn = document.getElementById('showMe');
const lastWeekBtn = document.getElementById('lastWeek');
const lastSixMonthsBtn = document.getElementById('lastSixMonths');
const lastYearBtn = document.getElementById('lastYear');
const infoText = document.getElementById('infoText');
let stockChart;

// Fetch and populate stock symbols in dropdown
const fetchStockSymbols = async () => {
    const apiKey = 'Z72yYRZkqdKXgx6GESV8WU65I4B2aZpx'; // Replace with your Polygon API Key
    const url = `https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&sort=ticker&order=asc&limit=1000&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Sort and add stocks to the dropdown
        const stocks = data.results || [];
        stocks.sort((a, b) => {
            const nameA = a.name || a.ticker;
            const nameB = b.name || b.ticker;
            return nameA.localeCompare(nameB);
        });

        // Append sorted options to dropdown
        stocks.forEach(stock => {
            const option = document.createElement('option');
            option.value = stock.ticker;
            option.textContent = `${stock.name || stock.ticker} (${stock.ticker})`;
            stockSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching stock symbols:', error);
    }
};

// Fetch stock data for charting
const fetchStockData = async (symbol, range = '6m') => {
    const apiKey = 'Z72yYRZkqdKXgx6GESV8WU65I4B2aZpx'; // Polygon API Key
    const currentDate = new Date();
    let fromDate;

    // Set 'fromDate' based on the specified range
    if (range === 'lastWeek') {
        fromDate = new Date(currentDate);
        fromDate.setDate(currentDate.getDate() - 7); // 7 days ago
    } else if (range === 'lastYear') {
        fromDate = new Date(currentDate);
        fromDate.setFullYear(currentDate.getFullYear() - 1); // 1 year ago
    } else {
        fromDate = new Date(currentDate);
        fromDate.setMonth(currentDate.getMonth() - 6); // Default to 6 months ago
    }

    const from = fromDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
    const to = currentDate.toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    // Polygon aggregates endpoint for historical data
    const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${from}/${to}?apiKey=${apiKey}`;
    console.log("Fetching data from URL:", url); // Debug URL

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("API Response:", data); // Log the entire API response

        if (!data.results || data.results.length === 0) {
            console.warn("No data available or unexpected format:", data);
            throw new Error("No data available for the selected stock.");
        }

        // Transform data for charting
        return data.results.map((entry) => ({
            date: entry.t / 1000,  // Polygon returns timestamp in milliseconds; convert to seconds
            close: entry.c         // Closing price
        }));
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
};



// Render chart with stock data
const renderChart = async (symbol, range = '6m') => {
    const data = await fetchStockData(symbol, range);

    // If no data, show alert and return
    if (!data || data.length === 0) {
        alert('No data available for this stock.');
        return;
    }

    // Format data for Chart.js
    const labels = data.map(point => new Date(point.date * 1000).toLocaleDateString());
    const prices = data.map(point => point.close);

    // Destroy existing chart if any
    if (stockChart) {
        stockChart.destroy();
    }

    // Create a new chart
    const ctx = document.getElementById('stockChart').getContext('2d');
    stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${symbol} Stock Price`,
                data: prices,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
};


// Event listeners for range buttons
lastWeekBtn.addEventListener('click', () => {
    const symbol = stockSelect.value;
    if (symbol) {
        renderChart(symbol, 'lastWeek'); // Render chart for last week
        fetchCompanyInfo(symbol); // Load company info
    } else {
        alert('Please select a stock!');
    }
});

lastSixMonthsBtn.addEventListener('click', () => {
    const symbol = stockSelect.value;
    if (symbol) {
        renderChart(symbol, '6m'); // Render chart for last 6 months
        fetchCompanyInfo(symbol); // Load company info
    } else {
        alert('Please select a stock!');
    }
});

lastYearBtn.addEventListener('click', () => {
    const symbol = stockSelect.value;
    if (symbol) {
        renderChart(symbol, 'lastYear'); // Render chart for last year
        fetchCompanyInfo(symbol); // Load company info
    } else {
        alert('Please select a stock!');
    }
});

// Fetch stock symbols on page load
document.addEventListener('DOMContentLoaded', fetchStockSymbols);

// Fetch stock symbols on page load
document.addEventListener('DOMContentLoaded', fetchStockSymbols);

