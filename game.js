function audioOnClick(randomChosenColor) {
    switch (randomChosenColor) {
      case "green":
        let audioGreen = new Audio("./sounds/green.mp3");
        audioGreen.play();
        break;
      case "red":
        let audioRed = new Audio("./sounds/red.mp3");
        audioRed.play();
        break;
      case "yellow":
        let audioYellow = new Audio("./sounds/yellow.mp3");
        audioYellow.play();
        break;
      case "blue":
        let audioBlue = new Audio("./sounds/blue.mp3");
        audioBlue.play();
        break;
  
      case "Wrong":
        let audioWrong = new Audio("./sounds/wrong.mp3");
        audioWrong.play();
    }
}

  function nextSequence() {
    userChosenColour=[];
    level++;
    $("h1").text("LEVEL " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    audioOnClick(randomChosenColor);
   
    
  }
  
  function checkAnswer(currentLevel)
  {
    if (gamePattern[currentLevel]===userChosenColour[currentLevel])
    {
        console.log("Success");

        if(userChosenColour.length===gamePattern.length)
        {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else
    {
        console.log("Wrong");
        audioOnClick("Wrong");
        $("body").addClass("game-over");
        $("h1").html("GAME OVER 💀 <br> <small><small>Press Any Key To Restart</small></small>");
        setTimeout(() => {
            $("body").removeClass("game-over"); 
        }, 1000);
        startOver();
    }

  }

  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    $(document).one("keydown", nextSequence);  // Restart on key press
}

let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userChosenColour = [];
let level = 0;
let started = false;

$(document).one("keydown", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});




$(".btn").on("click", function () {
  userChosenColour.push(this.id);
  console.log(userChosenColour);
  $("#" + this.id).addClass("pressed");
  audioOnClick(this.id);
  
  setTimeout(() => {
    $("#" + this.id).removeClass("pressed");
  }, 100);

  checkAnswer((userChosenColour.length)-1);

  

});

