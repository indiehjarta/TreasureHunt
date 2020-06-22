window.addEventListener('DOMContentLoaded', () => {      // Fires when the DOM content is loaded, without waiting for images and stylesheets to finish loading

  // Global variables
  const wrapper = document.getElementById('game-wrapper');  // Retrieving game-wrapper from HTML
  const divChests = document.getElementById('chests');      // Retrieving chests from HTML

  let score = 0;                      // Award points, start from 0
  let generatedNumber = null;         // Unknown value
  let chestOpened = false;            // Ensures that you cannot open more than one chest
  
  // Three objects with value = id
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

  const chestArray = [firstChest, secondChest, thirdChest];  // Array of the objects

  // Function that initiates the whole Game application
  function init() {
    initRandom();
    initGameUI();
  };

  // Function randomizes a number between 1-3
  function initRandom() {
    generatedNumber = Math.floor(Math.random() * 3 + 1);
  }

  // Call functions that creates the Game UI
  function initGameUI(){
    initChests();
    initScoreBoard();
    initRefreshButton();
  };

  /**
   * @desc Creating clickable images and give them an id
   */
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

  // Creates the scoreboard
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

  /**
   * @desc Updates score by 5 when the chest contains the random number
   * @param {number} newScore - Sending param updates the scores
   */
  function changeScore(newScore) {
    score += newScore;
    document.getElementById('score-result').innerText = `Score: ${score}`;
  };

  // Calling the refresh-button
  function initRefreshButton(){
    const refreshBtn = document.getElementById('refresh-button');
    refreshBtn.addEventListener('click', refresh);
  };

  /**
   * @desc Function handles if or not the chest id matches with the random number
   * @param {string} e 
   * @boolean - Closes the other chests after clicking at one
   */
  function chestClicked(e){
    if (chestOpened === false) {
      chestOpened = true;
      if (e.target.id == generatedNumber) {
        e.target.diamond = true;
        e.target.src = getImageFromPexels(e);
        changeScore(5);
      } else {
        e.target.src = 'images/chest-open.png';
      }
    }
  };
  /**
   * @desc Make a request towards pexels API and get 1 Diamond image
   * @param {string} e 
   */
  function getImageFromPexels(e){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.pexels.com/v1/search?query=diamonds+query&per_page1&page=1', true);
    xhr.setRequestHeader('Authorization','563492ad6f917000010000011f096ba6d98b4432b2ba612bc0bc4c25');
  
    xhr.addEventListener('load', function() {
      let imagePexels = JSON.parse(this.response);
      let randomPic = Math.floor(Math.random() * imagePexels.photos.length) + 1;
      e.target.src = imagePexels.photos[randomPic].src.small;
    });

    xhr.send();
  };

  // Calling all the functions needed to start over, refresh
  function refresh(){
    removeChests();
    initChests();
    initRefreshButton();
    initRandom();
  };

  // Removes the round of chestgame
  function removeChests(){
    chestArray.forEach(chest => {
      divChests.removeChild(document.getElementById(chest.value));
    });
  };

window.onload = init;
});