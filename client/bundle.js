(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// navbar javascript
const toggleButton = document.getElementById('toggle-button')
const navbarLinks = document.getElementById('navbar-links')

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
});

// character count 
const characterCount = document.querySelector('#story-entry');
characterCount.addEventListener('keyup', charCount)
function charCount(e){
    if(e.key){
        document.querySelector('#current').textContent=document.querySelector('#story-entry').value.length
    }
}


// Giphy search
let APIKey = 'ct8cd1r1ee3fUNlCSMP9VKWNg0e13CwG';

const giffyBtn = document.getElementById('find-gif');
const giffyText = document.getElementById('gif-search');

function giphySearch(e) {
    e.preventDefault();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=10&q=`;
    let str = giffyText.value.trim();
    url = url.concat(str);
    fetch(url)
    .then(response => console.log(response))
};

giffyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=10&q=`;
    let str = giffyText.value.trim();
    url = url.concat(str);
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(content => {
        console.log(content.data)
        console.log('META', content.meta)
        let fig = document.createElement('figure');
        let img = document.createElement('img');
        let rndm = Math.floor(Math.random()*5)
        img.src = content.data[rndm].images.fixed_height.url
        fig.appendChild(img)
        let out = document.querySelector('#gifImg')
        out.appendChild(fig)
            
    })
    .catch(error => {
        console.log(error)
    })

});


module.exports = { charCount };

},{}]},{},[1]);
