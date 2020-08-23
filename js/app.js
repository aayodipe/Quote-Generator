const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const author = document.getElementById('author')
const quoteWrapper = document.getElementById('quote-container')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')
// Get Quote API
const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const hideLoadingSpinner = ()=> {
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;

    }
}
async function getQuote(){
    showLoadingSpinner()
    const proxyUrl = "https://cryptic-headland-45513.herokuapp.com/"
    const apiURL = "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
    try{
        const response = await fetch(proxyUrl + apiURL);
        const data = await response.json();
        console.log(data)
       quoteText.innerText = data.quoteText;
       //If author is black, add author unknown
       if(!data.quoteAuthor || data.quoteAuthor ===""){
        author.innerText = "Author Unknown"
       }else {
        author.innerText = data.quoteAuthor
       }
       //Stop Loader and Show Quote
       hideLoadingSpinner()
    }catch (error){
        getQuote()
        console.log("Oh no! No Quote?", error)
    }

}

// On Load
getQuote()


    const tweetQuote = ()=>{
        const quote = quoteText.innerText;
        const tweetAuthor = author.innerText;
        const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${tweetAuthor}`;
        window.open(twitterURL, "_blank" )
    }

// Generate New Quote
newQuoteBtn.addEventListener('click',getQuote )

// Tweet this Quote
twitterBtn.addEventListener('click',tweetQuote)

