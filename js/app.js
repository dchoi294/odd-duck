'use strict';

let imgContainer = document.querySelector('section');
let button = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let count = 0;
let maxCount = 25;

oddDuct.allProducts = [];

function oddDuct(name, src) {
  this.name = name;
  this.src = src;
  this.votes = 0;
  this.count = 0;
  oddDuct.allProducts.push(this);
}

function getRandomImage() {
  return Math.floor(Math.random() * oddDuct.allProducts.length);
}

function renderImg() {
  let img1 = getRandomImage();
  let img2 = getRandomImage();
  let img3 = getRandomImage();

  while(img1 === img2 || img1 === img3 || img2 === img3) {
    img2 = getRandomImage();
    img3 = getRandomImage();
  }

  image1.src = oddDuct.allProducts[img1].src;
  image1.alt = oddDuct.allProducts[img1].name;
  image2.src = oddDuct.allProducts[img2].src;
  image2.alt = oddDuct.allProducts[img2].name;
  image3.src = oddDuct.allProducts[img3].src;
  image3.alt = oddDuct.allProducts[img3].name;

  oddDuct.allProducts[img1].votes++;
  oddDuct.allProducts[img2].votes++;
  oddDuct.allProducts[img3].votes++;
}

function click(event) {
  if (event.target === imgContainer) {
    alert('Please click on an image');
  }
  count++;
  let clickImg = event.target.alt;
  for (let i = 0; i < oddDuct.allProducts.length; i++) {
    if (clickImg === oddDuct.allProducts[i].name) {
      oddDuct.allProducts[i].count++;
      break;
    }
  }
  if (count === maxCount) {
    imgContainer.removeEventListener('click', click);
    button.addEventListener('click', renderResult);
    button.className = 'clicks-allowed';
    imgContainer.className = 'no-voting';
  } else {
    renderImg();
  }
}

function renderResult() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < oddDuct.allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${oddDuct.allProducts[i].name}: ${oddDuct.allProducts[i].votes} votes and ${oddDuct.allProducts[i].count} views.`;
    ul.appendChild(li);
  }
}

new oddDuct('bag', 'img/bag.jpg');
new oddDuct('banana', 'img/banana.jpg');
new oddDuct('bathroom', 'img/bathroom.jpg');
new oddDuct('boots', 'img/boots.jpg');
new oddDuct('breakfast', 'img/breakfast.jpg');
new oddDuct('bubblegum', 'img/bubblegum.jpg');
new oddDuct('chair', 'img/chair.jpg');
new oddDuct('dog-duck', 'img/dog-duck.jpg');
new oddDuct('dragon', 'img/dragon.jpg');
new oddDuct('pen', 'img/pen.jpg');
new oddDuct('pet-sweep', 'img/pet-sweep.jpg');
new oddDuct('scissors', 'img/scissors.jpg');
new oddDuct('shark', 'img/shark.jpg');
new oddDuct('sweep', 'img/sweep.png');
new oddDuct('tauntaun', 'img/tauntaun.jpg');
new oddDuct('unicorn', 'img/unicorn.jpg');
new oddDuct('water-can', 'img/water-can.jpg');
new oddDuct('wine-glass', 'img/wine-glass.jpg');

renderImg();

imgContainer.addEventListener('click', click);
