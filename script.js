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

// Get Quote From API
async function getQuote() {
    const apiURL = `https://dw-quote-api.herokuapp.com/quotes?amount=1`;
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const characterName = data[0].character;
        if (characterName === 'The Doctor') {
            authorName.innerText = `${DoctorMap[data[0].timeline]} ${characterName.slice(4)}`;
        } else {
            authorName.innerText = data[0].character;
        }

        quoteText.innerText = data[0].quote;
    } catch (error) {
        getQuote();
        console.log(`Ooops, no quote ${error}`);
    }
}

// onLoad
getQuote();