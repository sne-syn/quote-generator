const quoteContainer = document.getElementById('quote-container');
const quoteText = quoteContainer.querySelector('#quote');
const authorContainer = document.querySelector('.quote-author');
const authorName = authorContainer.querySelector('#author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

const addLoadingAnimation = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const hideLoadingAnimation = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

// Get Quote From API
async function getQuote() {
  addLoadingAnimation();
  const apiURL = `https://api.whatdoestrumpthink.com/api/v1/quotes/random`;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    // Reduce font-size for long quotes
    if (data.message.length > 150) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.message;
    // Stop loading Animation
    hideLoadingAnimation();
  } catch (error) {
    alert('Please, reload your page');
    console.log(`Ooops, no quote ${error}`);
  }
}

const tweeQuote = () => {
  const quote = quoteText.innerText;
  const author = authorName.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
};

// Event Listener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweeQuote);

// onLoad
getQuote();
