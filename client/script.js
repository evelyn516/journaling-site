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
let APIKey = 'ct8cd1r1ee3fUNlCSMP9VKWNg0e13CwG';

const giffyBtn = document.getElementById('find-gif');
const giffyText = document.getElementById('gif-search');


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


const submitButton = document.getElementById('s/button')
submitButton.addEventListener('click', saveNewPost) //click vs submit?


 const url = "http://localhost:3000/entries"
fetch(url)
  .then(resp => resp.json())
  .then(data => {
      for (let i=0; i < data.length; i++) displayStory(data[i]);
  })
  .then(console.log("done"))
  .catch(err => console.warn('Woops-a-daisy!', err)); 

function displayStory(data){
        
    const dateTime = data.timestamp
    const title = data.title
    const story = data.story
    console.log('okey dokey')
    
    const newtitle = document.createElement('h4');
    newtitle.className = "postTitle";
    newtitle.textContent = title;
    
    const newstory = document.createElement('p');
    newstory.className = "theStory";
    newstory.textContent = story;
    
    const newDateTime = document.createElement('p');
    newDateTime.className = "timestamp";
    newDateTime.textContent = dateTime;

    const emojibuttons = document.createElement('div')
    
    const like = document.createElement('button')
    like.className = 'like';
    like.innerHTML = `&#128077 ${data.likes}`
    emojibuttons.appendChild(like);
    
    const hate = document.createElement('button')
    hate.className = 'hate';
    hate.innerHTML = `&#10084 ${data.hates}`
    emojibuttons.appendChild(hate);

    const love = document.createElement('button')
    love.className = "love";
    love.innerHTML = `&#10084 ${data.loves}`
    emojibuttons.appendChild(love);
    

    const newdiv = document.createElement('div')
    const main = document.querySelector('main')
    newdiv.className = "apost";
    main.prepend(newdiv);
    newdiv.appendChild(newtitle);
    newdiv.appendChild(newDateTime);
    newdiv.appendChild(newstory);
    newdiv.appendChild(emojibuttons);  
}

//FOR EACH STORY IN JSON - addDivStory

function saveNewPost(e) {
    e.preventDefault(); // stops form submitting
    
    let newPost = {
        timestamp: new Date().toLocaleString(),
        title: document.getElementById('story-title').value,
        story: document.getElementById('story-entry').value,
        likes: 0,
        hates: 0,
        loves: 0,
        comments: []
    }
    
    fetch('http://localhost:3000/entries', {
        method: 'POST', 
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newPost)})
    .then(resp => resp.text())
    .then(text => console.log(text)) //can coment this linne out later
    .catch(error => console.error(error));

    
    document.querySelector('form').reset(); //to clear form for new entries

    //for display purposes only
    console.warn('added a new post');
}



//function for count emoji reactions - add to HTML


/* module.exports = { charCount };  */

