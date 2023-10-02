var buttonColours = ["red", "blue", "green", "yellow"]; //Button Colors

var gamePattern = [];
var userClickedPattern = []; //Array to store the user Clicked button colors

var started = false; //Game not started
var level = 0; //Game not started

var seconds = 0;
var mins = 0;
var hours = 0;

// Stop Watch

function stopWatch() {
    timer = setTimeout(() => {
        seconds++;
        if (seconds > 59) {
            seconds = 0;
            mins++;
        }
        if (mins > 59) {
            mins = 0;
            hours++;
        }
        if (hours < 10) {
            $("#hours").text("0" + hours + ":");
        } else {
            $("#hours").text(hours + ":");
        }
        if (mins < 10) {
            $("#mins").text("0" + mins + ":");    
        } else {
            $("#mins").text(mins + ":");
        }
        if (seconds < 10) {
            $("#seconds").text("0" + seconds);
        } else {
            $("#seconds").text(seconds);
        }
        stopWatch();
    }, 1000);
}

// Function to detect he first keypress to start the game

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  } else if(started) {
    stopWatch();
  }
});

// Event Handler to detect user click event

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); //getting the clicked button id
  userClickedPattern.push(userChosenColour); //Adding button colors to the end of the array

  playSound(userChosenColour); //callback to play the sound on button press
  animatePress(userChosenColour); //callback to animate the button press
  checkAnswer(userClickedPattern.length-1); //callback to check the answer
});

// Function to check if the pattern is correct

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
      
    }
}

// function to go to the next level

function nextSequence() {
  userClickedPattern = [];
  level++; //incrementing levels
  $("#level-title").text("Level " + level); //updating the displayed level
  var randomNumber = Math.floor(Math.random() * 4); //Generating random number from 0 - 3
  var randomChosenColour = buttonColours[randomNumber]; //getting items from the array by passing random number as array index
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //button animation the button for the next level
  playSound(randomChosenColour); //playing the sound for the next sequence
}

// Function to animate button press

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to play sound

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to start over the game

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  clearTimeout(timer);
}