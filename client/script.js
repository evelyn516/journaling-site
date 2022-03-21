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
    const title = document.getElementById('story-title')
    const story = document.getElementById('story-entry')
    console.log(title.value)
    console.log(story.value)
    
    const newtitle = document.createElement('h3')
    newtitle.className = storyTitle
    newtitle.textContent = title.value
    
    const newstory = document.createElement('p')
    newstory.textContent = story.value - /* or inner HTML? */
    newstory.className = newStory

    const newdiv = document.createElement('div'); /* class=blogpost */
    newdiv.className = "apost"
    document.main.appendChild(newdiv)
    newdiv.appendChild(newtitle)
    newdiv.appendChild(newstory)
}

//function for timestamp
/* we need another function that saves data to .JSON file */
//we need a function that fetches data to json file and foreach creates new div/card
// need a function that sorts all the posts by descending order of most recent date - can choose most commented or most emoji-ed sort?
//function for count emoji reactions - add to HTML


module.exports = { charCount };

