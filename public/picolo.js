// define questions
var questions = ["Never have I ever gone skinny-dipping/0",
"Never have I ever had sex in public/1",
"Never have I ever tried to enter the wrong house while being drunk/0",
"Never have I ever had sex during my period/1",
"Never have I ever been drunk at work/0",
"Never have I ever had anal sex/1",
"Never have I ever been high around my family/0",
"Never have I ever re-gifted a present/1",
"Never have I ever lied about seeing my friend s ex behind their back/0",
"Never have I ever photoshopped a picture of myself/1"
];
// global variable
var response = 1;
// wait functio
function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }
// end game process
async function end_game(){
    document.getElementById('question').innerHTML = "La partie est finie";
    await sleep(2000);
    go_back_home();
}
// redirect
function go_back_home(){
    document.location.href = "/homepage.html";
}
// extract and plot a new question
function plot_question(){
  //select random number
  var index = Math.floor(Math.random()*(questions.length));
  // if question exist
  if (questions[index]) {
     // get corresponding sentence
     var sentence = questions[index].split('/');
     // get question
     var question = sentence[0];
     // get response (global variable)
     response = sentence[1];
     // plot question
     document.getElementById('question').innerHTML = question;
     // if index is not -1 security
     if (index > -1) {
        // remove this question
        questions.splice(index, 1);
        }
     }
     // no more question end game
     else {
       end_game();}
}
// send drink request
function send_drink(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", window.location.href, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
    // call back function
    if(xhr.readyState === XMLHttpRequest.DONE){
        var json_info = JSON.parse(xhr.response);
        // not main user
        if (json_info['main']==0){
            document.location.href = "/index.html";
        }
        // reset button true and false and plot a new question
        else {
        button_reset("true_id");
        button_reset("false_id");
        plot_question();}
    }
    }
    // send drink request
    xhr.send(JSON.stringify({
    drink: 1
    }));
}
// true respond as been proposed
async function true_response(){
    // button inactive (not clickable)
    control_drink("inactive","true_id");
    control_drink("inactive","false_id");
    // if it's the correct answer
    if (response == 1) {
        // green button
        button_green("true_id");
        await sleep(2000);
        // reset and new question
        button_reset("true_id");
        button_reset("false_id");
        plot_question();
    }
    // false respond, red + ask for a drink
    else {
        button_red("true_id");
        send_drink();
    }
}
// false respond
async function false_response(){
    // button inactive (not clickable)
    control_drink("inactive","true_id");
    control_drink("inactive","false_id");
    // if correct answer
    if (response == 0) {
        // green
        button_green("false_id");
        await sleep(2000);
        //reset and new question
        button_reset("true_id");
        button_reset("false_id");
        plot_question();
    }
    // false answer
    else {
        //red
        button_red("false_id");
        // ask for a drink
        send_drink();
    }
}

// button becomes red
function button_red(id){
  var button = document.getElementById(id);
  button.style.backgroundColor = "black";
  button.style.color = "red";
}
// button become green
function button_green(id){
  var button = document.getElementById(id);
  button.style.backgroundColor = "black";
  button.style.color = "green";
}
// original state of the button
function button_reset(id){
  var button = document.getElementById(id);
  button.style.backgroundColor = "transparent";
  button.style.color = "black";
  control_drink("active",id)
}
// control whether a button is clickable
function control_drink(state,id){
  let button = document.getElementById(id);
  if (state=="active"){
    button.disabled = false;
  }
  else {
    button.disabled = true;
  }
}
