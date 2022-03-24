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

    let gifUrl;
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=10&q=`;
    let str = giffyText.value.trim();
    url = url.concat(str)
    await fetch(url)
    .then(response => response.json())
    .then(content => {
        gifUrl = content.data[0].images.fixed_height.url
    })
    
    let newPost = {
        timestamp: new Date().toLocaleString(),
        title: document.getElementById('story-title').value,
        story: document.getElementById('story-entry').value,
        likes: 0,
        hates: 0,
        loves: 0,
        comments: [],
        gif: gifUrl
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





<{/* div class="modal fade" id="myModal" id=${idTitle}>
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
                </div> */}
                <form id="commentForm" class="comment my-2">

                    <input id="${item.id}" type="text" class="comment-form-search" placeholder="Add your comment here">
                    <input onclick="sendComment(${item.id})" type="button" value="Add comment" class="btn btn-primary mx-1">
                </form>
                    <div class="modal-footer">
                        <button class="btn btn-danger" data-dismiss="modal">Hide Comments!</button>
                    </div>
                </div>
            </div>
        </div>




        <button class="btn btn-warning my-2" data-toggle="modal" data-target="#myModal">Show Comments!</button>
        <p>${item.comments}</p>






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





        function sendComment(id) {
            const textboxValue = document.getElementById(`${id}`).value
            console.log(textboxValue);
            fetch('https://my-random-story.herokuapp.com/comments', {
              method: 'PUT',
              body: JSON.stringify({ comment: textboxValue, id: id}),
              headers: { 'Content-Type': 'application/json' },
            })
        }
