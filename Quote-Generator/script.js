const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// let apiQuotes = [];

function showLoadingSpinner() {
     loader.hidden = false;
     quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuotes array
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
// Check if author field is blank and replace it with 'unknown'
if (!quote.author) {
    authorText.textContent = 'Unknown';
} else {
    authorText.textContent = quote.author;
}
// Check Quote Length to Determine the Styling
if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
} else {
    quoteText.classList.remove('long-quote')
}
// Set Quote, Hide Loader
  quoteText.textContent = quote.text; 
  removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
 
// On Load
getQuotes();

// newQuote();
