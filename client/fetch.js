const url = "http://localhost:3000/data"
fetch(url)
  .then(resp => resp.json())
  .then(data => console.log(data))
/*   .then(data => for(let i=0; i < data.length; i++) displayStory(data[i]);)
  .catch(err => console.warn('Woops-a-daisy!', err)); */

//for(let i=0; i < data.length; i++) displayStory(data[i]);

function displayStory(data){
        
    const timestamp = data.timestamp
    const title = data.title
    const story = data.story
    console.log('okey dokey')
    
    const newtitle = document.createElement('h4');
    newtitle.className = "postTitle";
    newtitle.textContent = title;
    
    const newstory = document.createElement('p');
    newstory.className = "theStory";
    newstory.textContent = story;
    

    const newdiv = document.createElement('div')
    const main = document.querySelector('main')
    newdiv.className = "apost";
    main.append(newdiv);
    newdiv.appendChild(newtitle);
    newdiv.appendChild(newstory);
}
