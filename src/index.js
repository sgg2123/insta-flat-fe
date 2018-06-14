const imgAPI = `http://localhost:3000/api/v1/images`

const likesAPI = `http://localhost:3000/api/v1/likes`

const imgContainer = document.getElementById('container')

function getImgs(apiURL){
  fetch(apiURL).then(r=>r.json()).then(renderImgs)
}

function renderImgs(imgObjs) {
  imgObjs.forEach(renderImg)
}

function renderImg(imgObj) {
  const div = `<div class="image-container">
     <img id="${imgObj.id}" src="${imgObj.url}">
     <p>
         <img data-action="like-image" data-image-id="${imgObj.id}" class="like-button" src="./images/like.png"><br>
         <span id="likes-count-for-image-${imgObj.id}">${imgObj.likes_count}</span>
     </p>
  </div>`
  imgContainer.innerHTML += div
}

getImgs(imgAPI)

imgContainer.addEventListener('click', addLikeOnDOMthenPersist)

function addLikeOnDOMthenPersist(event) {
  event.preventDefault()
  const imgId = event.target.dataset.imageId
  if (event.target.dataset.action){
    const span = document.getElementById(`likes-count-for-image-${imgId}`)
    const likeCount = span.innerText
    span.innerText = parseInt(likeCount) + 1
  }

  const body = {image_id: imgId}
  const config = {
    method: 'POST',
    headers: {"Content-type":"application/json"},
    body: JSON.stringify(body)
  }
  persistLike(likesAPI, config)
}

function persistLike(apiURL, config) {
  fetch(apiURL, config)
}

function persistPhoto(apiURL, config) {
  return fetch(apiURL, config).then(r=>r.json())
}

const newImgForm = document.getElementById('post-image-form')

const newImgURL = document.getElementById('post-image-form-url')

newImgForm.addEventListener('submit', PersistThenAddPhotoOnDOM)

function PersistThenAddPhotoOnDOM(event) {
  event.preventDefault()
  const userInput = newImgURL.value
  const body = {url: userInput}
  const config = {
    method: 'POST',
    headers: {"Content-type":"application/json"},
    body: JSON.stringify(body)
  }
  persistPhoto(imgAPI, config).then(renderImg).then(clearInput)
}

function clearInput() {
  newImgURL.value = ''
}
