  

const url = "http://localhost:3000/entries"
fetch(url)
.then(resp => resp.json())
.then(data => {
    for (let i=0; i < data.length; i++) displayStory(data[i]);
})
.then(console.log("done"))
.catch(err => console.warn('Woops-a-daisy!', err)); 




class aStoryEntry {
    
    constructor(title, story, gifURL) {
        this.dateTime = new Date().toLocaleString();
        //this.id = entries.length +1; - in backend
        this.title = title;
        this.story = story;
        this.emoji = {likes:0, hates:0, loves:0};
        this.gif = gifURL;
    }

    displayStory(){
        
        console.log('MAKING A CLASS')
        
        const newtitle = document.createElement('h4');
        newtitle.className = "postTitle";
        newtitle.textContent = this.title;
        
        const newstory = document.createElement('p');
        newstory.className = "theStory";
        newstory.textContent = this.story;
        
        const newDateTime = document.createElement('p');
        newDateTime.className = "timestamp";
        newDateTime.textContent = this.dateTime;
    
        const emojibuttons = document.createElement('div')
        
        const like = document.createElement('button')
        like.className = 'like';
        like.innerHTML = `&#128077 ${this.emoji[likes]}`
        emojibuttons.appendChild(like);
        
        const hate = document.createElement('button')
        hate.className = 'hate';
        hate.innerHTML = `&#10084 ${this.emoji[hates]}`
        emojibuttons.appendChild(hate);
    
        const love = document.createElement('button')
        love.className = "love";
        love.innerHTML = `&#10084 ${this.emoji[loves]}`
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

    saveNewPost(e) {
        e.preventDefault(); // stops form submitting
    
        let newPost = {
            //id: entries.length + 1ok
            timestamp: new Date().toLocaleString(),
            title: document.getElementById('story-title').value,
            story: document.getElementById('story-entry').value,
            likes: 0,
            hates: 0,
            loves: 0,
            comments: [],
           // gif: gifUrl
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

};


class Tamagotchi extends Pet {
    speak(){ console.log(`POWowK`); };
} 


let Gary = new Tamagotchi("Gary", 6)

console.log(Gary.name, Gary.happiness, Gary.hunger)
Gary.feed('banana');
Gary.playWith();
Gary.check();
Gary.speak();
console.log(Gary instanceof Pet);
console.log(Gary instanceof Tamagotchi);



server.post('/entries', (req, res) => {
    const newCat = req.body;
    const newCatId = entries.length + 1 //not def?
    cats.push({ id: newCatId, ...newCat});
    res.send({message: `${newCat.name} successfully added to our collection.`})
})








/////////////////////////
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

/* const formEl = document.querySelector('form');
formEl.addEventListener('submit', postStoryData)

async function postStoryData(e) {
  e.preventDefault();
  const current = new Date().toLocaleString();
  let gifUrl;
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=10&q=`;
    let str = giffyText.value.trim();
    url = url.concat(str)
    await fetch(url)
    .then(response => response.json())
    .then(content => {
        gifUrl = content.data[0].images.fixed_height.url
    })
​
​
​
​
​
​
​
  const formData = new FormData(formEl)
  const formDataSerialised = Object.fromEntries(formData)
  const jsonObject = {...formDataSerialised, dateTime: current, comments: "", gifSearch: gifUrl, emojiCount: [0,0,0]}
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
  */

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

   /*  let gifUrl;
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=10&q=`;
    let str = giffyText.value.trim();
    url = url.concat(str)
    await fetch(url)
    .then(response => response.json())
    .then(content => {
        gifUrl = content.data[0].images.fixed_height.url
    })
     */
    let newPost = {
        //id: entries.length + 1ok
        timestamp: new Date().toLocaleString(),
        title: document.getElementById('story-title').value,
        story: document.getElementById('story-entry').value,
        likes: 0,
        hates: 0,
        loves: 0,
        comments: [],
       // gif: gifUrl
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




