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

var response = 1;

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
  var question = item.split('/')[0];
  response = item.split('/')[1];
  if (item) {
     document.getElementById('question').innerHTML = question ;
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
        button_reset("true_id");
        button_reset("false_id");
        plot_question();}
    }
    }
    xhr.send(JSON.stringify({
    drink: 1
    }));
}

async function true_response(){
    control_drink("inactive","true_id");
    control_drink("inactive","false_id");
    if (response == 1) {
        button_green("true_id");
        await sleep(2000);
        button_reset("true_id");
        button_reset("false_id");
        plot_question();
    }
    else {
        button_red("true_id");
        send_drink();
    }
}

async function false_response(){
    control_drink("inactive","true_id");
    control_drink("inactive","false_id");
    if (response == 0) {
        button_green("false_id");
        await sleep(2000);
        button_reset("true_id");
        button_reset("false_id");
        plot_question();
    }
    else {
        button_red("false_id");
        send_drink();
    }
}


function button_red(id){
  var button = document.getElementById(id);
  button.style.backgroundColor = "black";
  button.style.color = "red";
}

function button_green(id){
  var button = document.getElementById(id);
  button.style.backgroundColor = "black";
  button.style.color = "green";
}

function button_reset(id){
  var button = document.getElementById(id);
  button.style.backgroundColor = "transparent";
  button.style.color = "black";
  control_drink("active",id)
}
function control_drink(state,id){
  let button = document.getElementById(id);
  if (state=="active"){
    button.disabled = false;
  }
  else {
    button.disabled = true;
  }
}
