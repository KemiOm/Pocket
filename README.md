Pocket-Watchers 

Pocket Watchers is a personal finance web application designed to help users track their spending, monitor financial trends, and build better budgeting habits. With an intuitive design and real-time updates, Pocket Watchers empowers individuals to take control of their financial well-being. Website built completely frontend with 

## Project Overview

This project appears to be a web application with several features, including:

-   **Stock Data Visualization:** On the page (`market.html`), users can select a stock symbol and view its historical price data as a line chart. The chart can display data for the last week, the last six months (default), or the last year, fetched using the Polygon.io API.

-   **General News Feed:** The `news.html` page displays a limited number of recent general news articles fetched from the Finnhub API. It also attempts to fetch relevant images for these articles using the Pexels API. There's also a basic email subscription feature.

-   **Expense Tracking:** The project includes functionality for tracking personal expenses on what seems to be another page `payment.html` Users can add, edit, and delete expense entries with details like amount, type, and date. These expenses are then visualized using bar and pie charts.

- **Finance Journal**: Log reflections and goals to track your financial growth over time.

## Built With

This project is built using the following core technologies:

-   **HTML:** For structuring the web pages and their content.
-   **CSS:** For styling the visual presentation of the application, including layout and aesthetics.
-   **JavaScript:** For adding interactivity, handling API calls, and dynamic content manipulation within the browser. Libraries like Chart.js are used for creating visualizations.

The project also integrates with the following external APIs:

-   **Polygon.io API:** To fetch real-time and historical stock market data.
-   **Finnhub API:** To retrieve general news articles.
-   **Pexels API:** To fetch images related to news articles.


## Project Directory Overview

-   `index.html`: The main landing page of the application.
    -   `styles.css`: general styling for the main page and shared styles across the application.
    -   `script.js`: Probably includes the main JavaScript logic for the landing page.

-   `journal.html`: A page dedicated to journal feature with boxes for inputs 
    -   `journal.css`: Styles specific to the journal page.
    -   `journal.js`: JavaScript functionality for the journal page.

-   `market.html`: page for displaying stock market history on users specificed company 
    -   `market.css`: Styles specific to the marketplace page.
    -   `market.js`: JavaScript functionality for market (generating the graph and pulling from API)

-   `news.html`: news page for latest financial news 
    -   `newscript.js`: JavaScript file,    
    -   `newstyle.css`: CSS file

-   `payment.html`: monthly spending page 
    -   `payment.css`: Styles 
    -   `payment.js`: JavaScript 
-   `.env`: Contains environment variables 
-   `package-lock.json` and `package.json`: Files used by npm (Node Package Manager) to manage project dependencies.
-   `README.md`: This file, providing an overview of the project.
-   `dist`: the distribution or build output directory.

## Future Improvements
- reorganize directory
- account synchronization with banks (potentially using Plaid)
- fix bug on home page 
- Graph visualizations of spending over time not just monthly 
- Personalized AI budgeting tips

## How to Run This Project

This project uses a development server for a better development experience with features like live reloading. Here's how to run it:

1.  **Clone the Repository:** If you haven't already, clone the project repository to your local machine using Git:
    ```bash
    git clone <repository_url>
    ```
2.  **Navigate to the Project Directory:**
    ```bash
    cd Pocket
    ```

3.  **Install Dependencies:** Install the necessary npm packages:
    ```bash
    npm install
    ```

4.  **Start the Development Server:** Run the start script defined in `package.json`:
    ```bash
    npm start
    ```

    I've been running this on stackblitz, so I didn't need to manually set up a local server. This is because StackBlitz automatically provides a development server environment for your project. When you open your StackBlitz project, it's already running on a hosted URL provided by StackBlitz.

**Note on API Keys:**

This project uses API keys for Polygon.io and potentially Finnhub and Pexels. These keys are currently hardcoded in the JavaScript files (`script.js` and `newscript.js`). For others to run this, they would ideally replace these with their own API keys for the application to function correctly.

Now, running the project involves using `npm start` after installing the dependencies. This is a more standard way to run web projects with development servers.
