window.addEventListener('DOMContentLoaded', () => {             

  // Global variables
  const wrapper = document.getElementById('game-wrapper');    
  const divChests = document.getElementById('chests');        
  let counter = 0;

  let score = 0;                
  let generatedNumber = null;   
  let chestOpened = false;     
  
  const firstChest = {
    name: 'first',
    value: 1,
    diamond: false,
    image: 'images/chest-closed.png'
  };
  
  const secondChest = {
    name: 'second',
    value: 2,
    diamond: false,
    image: 'images/chest-closed.png'
  };
  
  const thirdChest = {
    name: 'third',
    value: 3,
    diamond: false,
    image: 'images/chest-closed.png'
  };

  const chestArray = [firstChest, secondChest, thirdChest];  

  function init() {
    initRandom();
    initGameUI();
  };

  function initRandom() {
    generatedNumber = Math.floor(Math.random() * 3 + 1);
  }

  // Call functions that creates the Game UI
  function initGameUI(){
    initChests();
    initScoreBoard();
    initRefreshButton();
  };

  function initChests(){
    chestOpened = false;

    chestArray.forEach(chest => {
      var img = document.createElement('img');
      img.style.padding = '10px';
      img.src = chest.image;
      img.setAttribute('id', chest.value);
      divChests.appendChild(img);
      img.addEventListener('click', chestClicked);
    });
  };

  function initScoreBoard() {
    let scoreBoard = document.createElement('div');
    scoreBoard.id = 'score-board';
    wrapper.appendChild(scoreBoard);

    let scoreText = document.createElement('p');
    scoreText.id = 'score-result';
    scoreText.style.textAlign = 'center';
    scoreText.style.color = 'white';
    scoreText.style.fontFamily = 'Verdana, Geneva, Tahoma, sans-serif';
    scoreText.style.fontSize = '1.5em';    
    scoreBoard.appendChild(scoreText);
    scoreText.innerText = `Score: ${score}`;
  };

  function changeScore(newScore) {
    score += newScore;
    document.getElementById('score-result').innerText = `Score: ${score}`;
  };

  function initRefreshButton(){
    const refreshBtn = document.getElementById('refresh-button');
    refreshBtn.addEventListener('click', refresh);
  };

  function chestClicked(e){
    if (chestOpened === false) {
      chestOpened = true;
      if (e.target.id === generatedNumber) {
        e.target.diamond = true;
        e.target.src = 'images/chest-jewel.png';
        changeScore(5);
      } else {
        e.target.src = 'images/chest-open.png';
      }
    }
  };

  /*
  // make a request towards pexels API and get 1 Diamond image
  function getImageFromPexels(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','https://api.pexels.com/v1/search?query=diamonds', true);
  
    xhr.onload = function(){
      if(this.status == 200){
        console.log("Worked");
      } else {
        console.log(this.status);
      }
    }
    xhr.onerror = function(){
      console.log("Request Error");
    }
    
    // Fake API Key
    xhr.setRequestHeader('Authorization','563492ad6f917000010000011f096ba6d98b4432b2ba612bc0bc4c25');
    xhr.send();
  };
  */

  function refresh(){
    removeChests();
    initChests();
    initRefreshButton();
    initRandom();
    counter++;
    console.log(counter);
  };

  function removeChests(){
    chestArray.forEach(chest => {
      divChests.removeChild(document.getElementById(chest.value));
    });
  };

window.onload = init;
});