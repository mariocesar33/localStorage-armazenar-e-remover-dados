/**
 * converter o "favorites" em um array usando o JSON.parse() porque o localStorage é string
 * tenho que guarda-lo como array tambem (pegar num array e guarda-lo como array e não como string)
 * usando o JSON.strigify() -> vai ser uma etrutura guardado estilo array.
 */

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// pegar image externa
async function getExternalImage() {
  const response = await fetch('https://source.unsplash.com/random');

  document.querySelector('.image').innerHTML = `<img src="${response.url}" />`;
};

getExternalImage();


// clicar no botão, pegar imagem externa
document.querySelector('button').onclick = () => {
    getExternalImage();
};


// clicar em cima da image
document.querySelector('.image').onclick = () => {
  // pegar a imagem de estrela
  const imageContainer = document.querySelector('.image');

  // pegar url da imagem
  const imageSource = document.querySelector('.image img').src;
  console.log(imageSource);


  // remover -> verificar se a imagem esta na localStorage se estiver remova
  const index = favorites.indexOf(imageSource);
  const existsInLocalStorage = index != -1;

  if(existsInLocalStorage) {
    favorites.splice(index, 1);
    imageContainer.classList.remove('fav');
  } else {
    // introduzir as url das imagens dentro do array
    favorites.push(imageSource);
    imageContainer.classList.add('fav');
  }

  // salvar o array de imagens no localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

