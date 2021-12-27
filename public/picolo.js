var questions = ["Never have I ever gone skinny-dipping",
"Never have I ever had sex in public",
"Never have I ever tried to enter the wrong house while being drunk",
"Never have I ever had sex during my period",
"Never have I ever been drunk at work",
"Never have I ever had anal sex",
"Never have I ever been high around my family",
"Never have I ever re-gifted a present",
"Never have I ever lied about seeing my friend s ex behind their back",
"Never have I ever photoshopped a picture of myself"
];
function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }
async function end_game(){
    document.getElementById('question').innerHTML = "La partie est finie";
    await sleep(2000);
    go_back_home();
}
function go_back_home(){
    document.location.href = "/homepage.html";
}
function plot_question(){
  var index = Math.floor(Math.random()*(questions.length));
  var item = questions[index];

  if (item) {
     document.getElementById('question').innerHTML = item ;
     if (index > -1) {
        questions.splice(index, 1);
    }
     }
  else {
   end_game();}
}
function send_drink(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", window.location.href, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE){
        var json_info = JSON.parse(xhr.response);
        if (json_info['main']==0){
            document.location.href = "/index.html";
        }
        else {
        drink_button_off();}

    }
    }
    xhr.send(JSON.stringify({
    drink: 1
    }));
    drink_button_on();


}
