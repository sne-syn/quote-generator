const DoctorMap = {
  'One': 'First',
  'Two': 'Second',
  'Three': 'Third',
  'Four': 'Fourth',
  'Five': 'Fifth',
  'Six': 'Sixth',
  'Seven': 'Seventh',
  'Eight': 'Eighth',
  'Nine': 'Ninth',
  'Ten': 'Tenth',
  'Eleven': 'Eleventh',
  'Twelve': 'Twelfth',
  'Thirteen': 'Thirteenth'
};

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
  const apiURL = `https://dw-quote-api.herokuapp.com/quotes`;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    const characterName = data[0].character;
    if (characterName === 'The Doctor') {
      authorName.innerText = `${DoctorMap[data[0].timeline]} ${characterName.slice(4)}`;
    } else {
      authorName.innerText = data[0].character;
    }
    // Reduce font-size for long quotes
    if (data[0].quote.length > 150) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data[0].quote;
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