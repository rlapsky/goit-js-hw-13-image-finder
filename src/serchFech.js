import PixabayService from './apiService.js'
import imageCardTmpl from './templates/imageCard.hbs'
import debounce from 'lodash/debounce.js'


const ref = {
        form: document.querySelector('.search-form'),
        ul: document.querySelector('.gallery'),
        button:document.querySelector('.more')
}
        ref.button.style.display = "none";
const pixabayService = new PixabayService()

function findPicture(e) {
    setTimeout(scrollPage, 500)
    pixabayService.query = e.target.value
    clearePictures();
    pixabayService.fetchHits()
     .then(hits => {
       renderPictures(hits)
       console.log(this.page);
     });
     ref.button.style.display = "";
}

function clearePictures() {
  ref.ul.innerHTML=''
}
function renderPictures(data) {
  ref.ul.insertAdjacentHTML('beforeend', imageCardTmpl(data))
}

function onMore() {
    pixabayService.incrementPage()
    pixabayService.fetchHits()
     .then(hits => {
       renderPictures(hits)
       setTimeout(scrollPage, 500)
     });
}

function scrollPage() {
    let position = 0;
    window.scrollTo({
      top: document.querySelector('body').scrollHeight,
      left: 0,
      behavior:'smooth',
    })
}

ref.button.addEventListener('click',onMore)
ref.form.addEventListener('input', debounce(findPicture, 500))