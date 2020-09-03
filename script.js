// variaveis
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const imageContainer = document.querySelector('.image');
const imageList = document.querySelector('.favorios');


// eventos
document.querySelector('button').onclick = () => updateImage();
imageContainer.onclick = () => updateAll();

// ---- Metodos -----

function getState() {
  const imageSource = document.querySelector('.image img').src;
  console.log(imageSource);

  const index = favorites.indexOf(imageSource);
  const existsInLocalStorage = index != -1;

  return { imageSource, index, existsInLocalStorage };
}

function updateAll() {
  updateFavorites();
  updateClasses();
}

function updateFavorites() {
  const { existsInLocalStorage, index, imageSource } = getState();

  existsInLocalStorage ? favorites.splice(index, 1) : favorites.push(imageSource);
 
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function updateClasses() {
  const { existsInLocalStorage } = getState();

  imageContainer.classList.remove('fav');

  if(existsInLocalStorage) {
    imageContainer.classList.add('fav');
  } 

  Refresh();
}

async function updateImage() {
  await getExternalImage();
  updateClasses();
}

async function getExternalImage() {
  const response = await fetch('https://source.unsplash.com/random');

  imageContainer.innerHTML = `<img src="${response.url}" />`;
};

function renderImage(item, index) {
  imageList.innerHTML += `<img class="demo cursor" src="${item}" style="width:100%" onclick="myFunction(this)" alt="The Woods"/>`;
}

// percorrer Array de favoritos
function listFavorites() {
  let listFavorites = JSON.parse(localStorage.getItem('favorites'));

  listFavorites.forEach(renderImage);

  console.log(listFavorites);
}

function myFunction(imgs) {
  imageContainer.innerHTML = `<img src="${imgs.src}" />`;
}

function Refresh() {
  window.parent.location = window.parent.location.href;
}

getExternalImage();

listFavorites();




