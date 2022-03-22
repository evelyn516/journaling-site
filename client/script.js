// navbar javascript
const toggleButton = document.getElementById('toggle-button')
const navbarLinks = document.getElementById('navbar-links')

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
});

// character count 
const characterCount = document.querySelector('#storyEntry');
characterCount.addEventListener('keyup', charCount)
function charCount(e){
    if(e.key){
        document.querySelector('#current').textContent=document.querySelector('#storyEntry').value.length
    }
}


// Giphy search
let APIKey = 'ct8cd1r1ee3fUNlCSMP9VKWNg0e13CwG';
const giffyBtn = document.getElementById('find-gif');
const giffyText = document.getElementById('gif-search');


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
  const current = new Date().toLocaleString();
  
  
  let gifUrl;
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&q=`;
    let str = giffyText.value.trim();
    url = url.concat(str)
    await fetch(url)
    .then(response => response.json())
    .then(content => {
        const idx = Math.floor(Math.random()*content.data.length)
        gifUrl = content.data[idx].images.fixed_height.url
    })

    
    const formData = new FormData(formEl)
    const formDataSerialised = Object.fromEntries(formData)
    const jsonObject = {...formDataSerialised, dateTime: current, comments: "", gifSearch: gifUrl, emojiCount: [0,0,0]}
    console.log(jsonObject)
    try{
        const response = await fetch ("http://localhost:3000/entries", {
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
 



// fetching data from backend
fetch('http://localhost:3000/entries')
.then(resp => resp.json())
.then(resp => {
    console.log(resp)
    createStory(resp)
})

let list = document.querySelector('#story-show');
function createStory(resp) {
    
    resp.forEach(item => {
        // console.log(item)
        const li = document.createElement('li')
        li.innerHTML = `
        <div class="apost">
        <h4 class="postTitle">${item.storyTitle}</h4>
        <div class="container">
            <p class="my-1 dateTime">${item.dateTime}</p>
        </div>
        <img class="gifInsert" src=${item.gifSearch} alt="a rubber duck" alt="gify">
        <p class="theStory">${item.storyEntry}</p>
    </div>
    <div class="container">
        <div class="row">
            <div class="col text-center">
                <button class="btn btn-success" style="width:100%">&#128077; ${item.emojiCount[0]}</button>
            </div>
            <div class="col text-center">
            <button class="btn btn-danger" style="width:100%">&#128078; ${item.emojiCount[1]}</button>
            </div>
            <div class="col text-center">
            <button class="btn btn-primary" style="width:100%">&#10084; ${item.emojiCount[2]}</button>
            </div>
        </div>
        <form class="comment my-2">
            <label for = "comments">
            </label>
            <input type="text" id="form-search" placeholder="Add your comment here">
        </form>
    </div>`
list.prepend(li)
    })
}
