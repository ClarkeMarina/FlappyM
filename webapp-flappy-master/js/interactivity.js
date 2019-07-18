var highScore = 0;
var scoreEntry = "";

jQuery("#scoresbtn").on('click', function(){
  jQuery('#content').empty();
  jQuery('#content').append('<p>' + 'Scores:' + '</p>' + scoreEntry);
})

jQuery('#creditsbtn').on('click', function() {
  jQuery('#content').empty();
  jQuery('#content').append(
    '<p>' + 'Game created by Marina'+'</p>'
  )
})

jQuery('#helpbtn').on('click', function() {
  jQuery('#content').empty();
  jQuery('#content').append(
    '<p>' + 'Press SPACE to flap your wings'+'</p>' + '<p>' + 'Avoid the pipes'+'</p>'+'If you lose, try again'+ '</p>'
  )
})

function registerScore (score) {
  var playerName = prompt("To record your score, put your name here:");
  if (score>highScore) {
    highScore=score;
    scoreEntry="<li>" + playerName + ": " + score.toString() + "</li>";
  }
}
