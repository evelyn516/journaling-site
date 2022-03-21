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


const submitButton = document.getElementById('s/button')
submitButton.addEventListener('click', addStory)

function addStory(e){
    e.preventDefault(); // stops form submitting
   
    const title = document.getElementById('story-title');
    const story = document.getElementById('story-entry');
    console.log(title.value);
    console.log(story.value);
    
    const newtitle = document.createElement('h4');
    newtitle.className = "postTitle";
    newtitle.textContent = title.value;
    
    const newstory = document.createElement('p');
    newstory.className = "theStory";
    newstory.textContent = story.value;
    

    const newdiv = document.createElement('div')
    const main = document.querySelector('main')
    newdiv.className = "apost";
    main.append(newdiv);
    newdiv.appendChild(newtitle);
    newdiv.appendChild(newstory);

    document.querySelector('form').reset(); //to clear form for new entries
}

//FOR EACH STORY IN JSON - addDivStory

/* function saveNewPost(e) {
    e.preventDefault(); // stops form submitting
    let newPost = {
        id: Date.now(),
        title: document.getElementById('story-title'),
        story: document.getElementById('story-entry'),
        comments: []
    }
    fetch('http://localhost:3000/data' {
    method: 'post',
    body: newPost})
    .then(resp => resp.text())
    .then(text => console.log(text))
    .catch(error => console.error(error));
    /* entries.push(newPost); // need to use link to JSON 
    
    document.querySelector('form').reset(); //to clear form for new entries

    //for display purposes only
    console.warn('added a new post'); */



//function for timestamp
/* we need another function that saves data to .JSON file */
//we need a function that fetches data to json file and foreach creates new div/card
// need a function that sorts all the posts by descending order of most recent date - can choose most commented or most emoji-ed sort?
//function for count emoji reactions - add to HTML

/* 
module.exports = { charCount }; */

