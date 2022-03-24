# My Random Story
![image](https://user-images.githubusercontent.com/59448947/159898362-65c3f067-9007-4773-8fe6-9ec65d9a708a.png)


## LAP 1 Project: Community Journaling Website

### Contributors
- [Nowshad Ahmed](https://github.com/Nowshad10)
- [Evie Ball](https://github.com/evelyn516)
- [Sami Tanveer](https://github.com/Sami1600)

### Project Description
The brief described an anonymous journal post that allowed for emoji reactions, gifs and comments.
We took inspiration from www.fmylife.com
To differentiate ours to avoid copyright legal action from FML, we decided to gear towards 'randomness' of stories. In short, something unusual that happened to you in a small way that you were unable to share with your friends for whatever reason, and search for validation on the internet.

## Installation & Usage

### Installation
- Fork and clone the repo.
- Navigate to the `server` folder.
- Run `npm install` to install dependencies.

### Usage
- In the `server` folder, run `npm run dev` to start the server.
- Open `index.html` with your browser to use the website.

### Wins and Challenges
challenges of different styles to write the same functions of code (snippet below)
challenges of working with Git and merge conflicts

Wins of finally understanding certain functionality of uploading API data to JSON files
Useful code that we can keep for future projects





Code example 1

`const url = "http://localhost:3000/entries"
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
}`

Code example 2

`let list = document.querySelector('#story-show');
function createStory(resp) {
    
    resp.forEach(item => {
        // console.log(item)
        let thisid = (item.storyTitle).replace(/\s/g, '');
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
                <button class="btn btn-success" style="width:100%" onclick="emojiIncrease('${item.storyTitle}', 'like')">&#128077; ${item.emojiCount[0]}</button>
            </div>
            <div class="col text-center">
            <button class="btn btn-danger" style="width:100%" onclick="emojiIncrease('${item.storyTitle}', 'dislike')">&#128078; ${item.emojiCount[1]}</button>
            </div>
            <div class="col text-center">
            <button class="btn btn-primary" style="width:100%" onclick="emojiIncrease('${item.storyTitle}', 'love')">&#10084; ${item.emojiCount[2]}</button>
            </div>
        </div>
        <form onsubmit="pushComment()">
            <input id=${thisid} type='text' class="commentForm" placeholder="Enter your comment here">
            <input class=${thisid} type="button" value="submit">
        </form >     
    </div>`
list.prepend(li)
    })
}`
