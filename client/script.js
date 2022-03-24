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
        const li = document.createElement('div')
        idTitle = item.storyTitle.replace(/\s/g, "")
        console.log(idTitle);
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
        <div class="col text-center">z""r
        <button class="btn btn-danger" style="width:100%" onclick="emojiIncrease('${item.id}', 'dislike')">&#128078; ${item.emojiCount[1]}</button>
        </div>
        <div class="col text-center">
        <button class="btn btn-primary" style="width:100%" onclick="emojiIncrease('${item.id}', 'love')">&#10084; ${item.emojiCount[2]}</button>
        </div>
        </div>

    </div>`
    
    
    const submitComment = document.createElement('form')
    submitComment.setAttribute('class', 'commentEnterHere')

    const commentText = document.createElement('input')
    commentText.id = item.id
    commentText.type = 'text'
    commentText.placeholder = 'Add your comment here'
    const commentSubmit = document.createElement('input')
    commentSubmit.type = 'submit'
    commentSubmit.value = 'Submit'
    commentSubmit.addEventListener('click', function() { 
        sendComment(item.id);
    });
    
    submitComment.appendChild(commentText);
    submitComment.appendChild(commentSubmit);
    
    
    comment = document.createElement('div');
    for(let i=0; i<item.comments.length; i++) {
        newP = document.createElement('p');
        newP.textContent = item.comments[i];
        comment.appendChild(newP);
    }
    li.appendChild(comment)
    li.appendChild(submitComment)

list.prepend(li)
    })
}


function sendComment(idx) {
    const commentEntry = document.getElementById(idx);
    console.log(commentEntry.value);
    const comment = commentEntry.value
    fetch('http://localhost:3000/comments', {
        method: 'PUT',
        body: JSON.stringify({ comment: comment, id: idx}),
        headers: { 'Content-Type': 'application/json' },
      })
}





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
