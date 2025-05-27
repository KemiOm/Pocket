document.addEventListener('DOMContentLoaded', async () => {
  const articlesContainer = document.getElementById('articles');

  try {
      // Fetch articles from Finnhub
      const response = await fetch('https://finnhub.io/api/v1/news?category=general&token=csfa4l9r01qnrj2u24s0csfa4l9r01qnrj2u24sg');
      const articles = await response.json();

      // Limit to 3 articles
      const limitedArticles = articles.slice(0, 3);

      for (const article of limitedArticles) {
          // Fetch an image from Pexels based on the article headline
          const imageResponse = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(article.headline)}&per_page=1`, {
              headers: {
                  Authorization: 'xzuBYUZa6rsI96hblPMXgTKhmiIxMCCTNdh0J6i7eRODn82VaukjAC8R'
              }
          });
          const imageData = await imageResponse.json();

          // Use the first image from the search results or a default image
          const imageUrl = imageData.photos.length > 0 ? imageData.photos[0].src.medium : 'default-image-url.jpg';

          const articleCard = document.createElement('div');
          articleCard.classList.add('article-card');

          articleCard.innerHTML = `
              <img src="${imageUrl}" alt="${article.headline}">
              <h2>${article.headline}</h2>
              <p>${article.summary}</p>
              <a href="${article.url}" target="_blank" class="read-more-button">Read More</a>
          `;

          articlesContainer.appendChild(articleCard);
      }
  } catch (error) {
      console.error("Error fetching articles:", error);
  }
});

// Selecting elements
const subscribeButton = document.getElementById('subscribeButton');
const emailInput = document.getElementById('emailInput');
const confirmationMessage = document.getElementById('confirmationMessage');

// Adding functionality to the subscribe button
subscribeButton.addEventListener('click', () => {
    const email = emailInput.value; // Get email value

    if (email) {
        // You can replace the alert below with actual functionality, like sending the email to a server
        console.log('Subscribed with:', email);  // Example action: logging the email

        // Show confirmation message
        confirmationMessage.style.display = 'block';

        // Optionally, clear the input field
        emailInput.value = '';
    } else {
        // If the email input is empty, show an alert
        alert('Please enter a valid email address.');
    }
});

