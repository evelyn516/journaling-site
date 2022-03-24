// navbar javascript
const toggleButton = document.getElementById('toggle-button')
const navbarLinks = document.getElementById('navbar-links')

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
});

// character count 
const characterCount = document.querySelector('#storyEntry');
const currentCount = document.getElementById('currentCount');

characterCount.addEventListener('keyup', (e) => {
    if (e.key) {
        currentCount.textContent = characterCount.value.length
    }
})


// Giphy search
let APIKey = 'ct8cd1r1ee3fUNlCSMP9VKWNg0e13CwG';
const giffyBtn = document.getElementById('find-gif');
const giffyText = document.getElementById('gif-search');

let currentGifUrl;


giffyBtn.addEventListener('click', function getGif(e) {
        e.preventDefault();
        let out = document.querySelector('#gifImg');
        out.innerHTML = "";
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
        let rndm = Math.floor(Math.random()*content.data.length)
        img.src = content.data[rndm].images.fixed_height.url
        fig.appendChild(img)
        out.appendChild(fig)
        currentGifUrl = img.src
            
    })
    .catch(error => {
        console.log(error)
    })

});

let count = 0;

const formEl = document.querySelector('form');
formEl.addEventListener('submit', postStoryData)

async function postStoryData(e) {
  e.preventDefault();
  const current = new Date().toLocaleString();
  
  
  let gifUrl = currentGifUrl

    
    const formData = new FormData(formEl)
    const formDataSerialised = Object.fromEntries(formData)
    const jsonObject = {...formDataSerialised, id: count, dateTime: current, comments: [], gifSearch: gifUrl, emojiCount: [0,0,0]}
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
        count++
        // console.log(item)
        const li = document.createElement('li')
        console.log(item.comments);
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
        <button class="btn btn-success" style="width:100%" onclick="emojiIncrease('${item.id}', 'like')">&#128077; ${item.emojiCount[0]}</button>
        </div>
        <div class="col text-center">
        <button class="btn btn-danger" style="width:100%" onclick="emojiIncrease('${item.id}', 'dislike')">&#128078; ${item.emojiCount[1]}</button>
        </div>
        <div class="col text-center">
        <button class="btn btn-primary" style="width:100%" onclick="emojiIncrease('${item.id}', 'love')">&#10084; ${item.emojiCount[2]}</button>
        </div>
        </div>
        <button class="btn btn-warning my-2" data-toggle="modal" data-target="#myModal">Show Comments!</button>
        <p>${item.comments}</p>

        <div class="modal fade" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Comment Section:</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                <div class="modal-body">
                    <p>${item.comments}</p>
                </div>
                <form id="commentForm" class="comment my-2">
                    <label for = "comments">
                    </label>
                    <input id="${item.id}" type="text" class="comment-form-search" placeholder="Add your comment here">
                    <input onclick="sendComment(${item.id})" type="button" value="Add comment" class="btn btn-primary mx-1">
                </form>
                    <div class="modal-footer">
                        <button class="btn btn-danger" data-dismiss="modal">Hide Comments!</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`
list.prepend(li)
    })
}



// function loopThrough(array, id) {
//     setTimeout(() => {
//         const commentDiv = getElementById(`comment${id}`)
//         for(let i=0; i<array.length; i++) {
//             newP = document.createElement('p');
//             newP.textContent = array[i];
//             commentDiv.appendChild(newP);
        
//         }
//     }, 1000)
// };

function emojiIncrease(id,emoji){
    console.log(id)
    fetch('http://localhost:3000/emojiUpdate', {
      method: 'PUT',
      body: JSON.stringify({ id: id, emoji: emoji }),
      headers: { 'Content-Type': 'application/json' },
    })
    location.reload();
};



function sendComment(id) {
    const textboxValue = document.getElementById(`${id}`).value
    console.log(textboxValue);
    fetch('http://localhost:3000/comments', {
      method: 'PUT',
      body: JSON.stringify({ comment: textboxValue, id: id}),
      headers: { 'Content-Type': 'application/json' },
    })
}
