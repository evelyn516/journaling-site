/* const { response } = require("../server/app"); */

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
// let APIKey = 'ct8cd1r1ee3fUNlCSMP9VKWNg0e13CwG';

// const giffyBtn = document.getElementById('find-gif');
// const giffyText = document.getElementById('gif-search');


// giffyBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=10&q=`;
//     let str = giffyText.value.trim();
//     url = url.concat(str);
//     console.log(url);
//     fetch(url)
//     .then(response => response.json())
//     .then(content => {
//         console.log(content.data)
//         console.log('META', content.meta)
//         let fig = document.createElement('figure');
//         let img = document.createElement('img');
//         let rndm = Math.floor(Math.random()*5)
//         img.src = content.data[rndm].images.fixed_height.url
//         fig.appendChild(img)
//         let out = document.querySelector('#gifImg')
//         out.appendChild(fig)
            
//     })
//     .catch(error => {
//         console.log(error)
//     })

// });

const formEl = document.querySelector('form');
formEl.addEventListener('submit', postStoryData)

async function postStoryData(e) {
  e.preventDefault();
  const current = new Date().toLocaleString() 
  const formData = new FormData(formEl)
  const formDataSerialised = Object.fromEntries(formData)
  const jsonObject = {...formDataSerialised, dateTime: current, comments: "", emojiCount: [0,0,0]}
  console.log(jsonObject)
  try{
    const response = await fetch ("http://localhost:3000/test", {
      method: 'POST', 
      body: JSON.stringify(jsonObject),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json();
    console.log(json)
  }catch(e){
    console.error(e);
    alert('There was an error')
  }
}


