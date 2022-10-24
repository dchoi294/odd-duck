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

let bag = new oddDuct('bag', 'img/bag.jpg');
let banana =new oddDuct('banana', 'img/banana.jpg');
let bathroom = new oddDuct('bathroom', 'img/bathroom.jpg');
let boots = new oddDuct('boots', 'img/boots.jpg');
let breakfast = new oddDuct('breakfast', 'img/breakfast.jpg');
let bubblegum = new oddDuct('bubblegum', 'img/bubblegum.jpg');
let chair = new oddDuct('chair', 'img/chair.jpg');
let dogDuck = new oddDuct('dog-duck', 'img/dog-duck.jpg');
let dragon = new oddDuct('dragon', 'img/dragon.jpg');
let pen = new oddDuct('pen', 'img/pen.jpg');
let petSweep = new oddDuct('pet-sweep', 'img/pet-sweep.jpg');
let scissors = new oddDuct('scissors', 'img/scissors.jpg');
let shark = new oddDuct('shark', 'img/shark.jpg');
let sweep = new oddDuct('sweep', 'img/sweep.png');
let tauntaun = new oddDuct('tauntaun', 'img/tauntaun.jpg');
let unicorn = new oddDuct('unicorn', 'img/unicorn.jpg');
let waterCan = new oddDuct('water-can', 'img/water-can.jpg');
let wineGlass = new oddDuct('wine-glass', 'img/wine-glass.jpg');

let allProducts = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass];

function getRandomImage() {
  return Math.floor(Math.random() * oddDuct.allProducts.length);
}

let arrayNumb = [];

function renderImg() {

  while(arrayNumb.length < 18) {
    let randNumb = getRandomImage();
    if(!arrayNumb.includes(randNumb)) {
      arrayNumb.push(randNumb);
    }
  }

  let img1 = arrayNumb.shift();
  let img2 = arrayNumb.shift();
  let img3 = arrayNumb.shift();

  // let img1 = getRandomImage();
  // let img2 = getRandomImage();
  // let img3 = getRandomImage();

  // while(img1 === img2 || img1 === img3 || img2 === img3) {
  //   img2 = getRandomImage();
  //   img3 = getRandomImage();
  // }

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
      // storeResult();
      break;
    }
  }
  if (count === maxCount) {
    imgContainer.removeEventListener('click', click);
    button.addEventListener('click', renderResult);
    button.className = 'clicks-allowed';
    // imgContainer.className = 'no-voting';
  } else {
    renderImg();
  }
}

function chart() {
  let imgNames = [];
  let imgViews = [];
  let imgVotes = [];
  for(let i = 0; i < allProducts.length; i++) {
    imgNames.push(allProducts[i].name);
    imgViews.push(allProducts[i].views);
    imgVotes.push(allProducts[i].count);
  }

  const data = {
    labels: imgNames,
    datasets: [{
      label: 'Views',
      backgroundColor: 'lightblue',
      borderColor: 'blue',
      data: imgViews,
      borderWidth: 1
    },
    {
      label: 'Votes',
      backgroundColor: 'lightyellow',
      borderColor: 'yellow',
      data: imgVotes,
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options:{
      scales: {
        y: {
          beginAtZero: true,
          maintainAspectRatio: false
        }
      }
    }
  };

  const newChart = new Chart(document.getElementById('newChart'), config);
  renderResult();
}

function storeResult() {
  let stringifiedOddDuct = JSON.stringify(allProducts);
  localStorage.setItem('products', stringifiedOddDuct);
}

function getResult() {
  let addingOddDuct = localStorage.getItem('products');
  if(addingOddDuct) {
    allProducts = [];
    let parsedProducts = JSON.parse(addingOddDuct);
    for (let newDuck of parsedProducts) {
      let name = newDuck.name;
      let src = newDuck.src;
      let votes = newDuck.votes;
      let views = newDuck.views;
      // addedDuct(name, src, votes, views);
      let newOddDuct = new oddDuct(name, src, votes, views);
      allProducts.push(newOddDuct);
    }
  }
}

// function addedDuct(name, src, votes, views) {
//   let newOddDuct = new oddDuct(name, src, votes, views);
//   allProducts.push(newOddDuct);
// }

function renderResult() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < oddDuct.allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${oddDuct.allProducts[i].name}: ${oddDuct.allProducts[i].votes} views and ${oddDuct.allProducts[i].count} votes.`;
    ul.appendChild(li);
  }
  chart();
  storeResult();
}




// getResult();
imgContainer.addEventListener('click', click);
renderImg();
