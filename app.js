var express = require("express");
 //use the application off of express.
var app = express();
app.use(express.json());
app.set('trust proxy', true)
app.use(express.static("public"));
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var Pump_GPIO = new Gpio(23, 'out'); //use GPIO pin 23, and specify that it is output
var time_step = 3;
var state_pump = Pump_GPIO.readSync();
var main_ip = "0";
var mutex_pump=false;

function not_main_user(res) {
   console.log("user not allowed");
   res.send(not_main_json());    // echo the result back
}

function check_main_user(user_ip,res){
  if (user_ip==main_ip){
    return true;}
  not_main_user(res);
}
function empty_json(){
  return {main :1}
}
function not_main_json(){
  return {main :0}
}
function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }
function control_valve(bool) {
  if (Pump_GPIO.readSync() != bool) { 
    if (bool==true) {
        Pump_GPIO.writeSync(1);
    }
    else if (bool==false) {
        Pump_GPIO.writeSync(0);
    }
    console.log("pump state");
    console.log(Pump_GPIO.readSync());

  }
}

async function run_pump(times,response){
  if (!mutex_pump) {
    mutex_pump=true;
    for (let i = 0; i < times; i++) {
      control_valve(true);
      await sleep(time_step*1000);
      control_valve(false);
    }
    sleep(2000);
    mutex_pump=false;
  }
  else{
      console.log("command avoid (already in process)");

  }
  response.send(empty_json());    // echo the result back
}


app.post('/', function(request, response){
  if (request.body.hasOwnProperty('login')){
    main_ip = request.ip;
    console.log("new_user");
    console.log(main_ip);
    response.send(empty_json());

  }
});
app.post('/', function(request, response){
  if (request.body.hasOwnProperty('login')){
    main_ip = request.ip;
    console.log("new_user");
    console.log(main_ip);
    response.send(empty_json());

  }
});
app.post('/index.html', function(request, response){
  if (request.body.hasOwnProperty('login')){
    main_ip = request.ip;
    console.log("new_user");
    console.log(main_ip);
    response.send(empty_json());

  }
});
app.post('/picolo.html', function(request, response){
  if (check_main_user(request.ip,response)){
    if (request.body.hasOwnProperty('drink')){
      console.log(request.body);      // your JSON
      run_pump(request.body.drink,response);
  }}
});
app.post('/shot.html', function(request, response){
  if (check_main_user(request.ip,response)){
    if (request.body.hasOwnProperty('drink')){
      console.log(request.body);      // your JSON
      run_pump(request.body.drink,response);
  }}
});
app.post('/roulette.html', function(request, response){
  if (check_main_user(request.ip,response)){
    if (request.body.hasOwnProperty('drink')){
      console.log(request.body);      // your JSON
      run_pump(request.body.drink,response);
    }}
});
app.post('/parameter.html', function(request, response){
  if (check_main_user(request.ip,response)){
    if (request.body.hasOwnProperty('ask_strength')){
      let time_value = {main :1,"strength_value" : time_step};
      console.log(time_value);      // your JSON
      response.send(time_value);
    }
    if (request.body.hasOwnProperty('strength')){
      console.log(request.body.strength);      // your JSON
      time_step = request.body.strength;
      response.send(empty_json());
    }
    if (request.body.hasOwnProperty('valve')){
      control_valve(!Pump_GPIO.readSync());
      response.send(empty_json());
  }}
});
 //start the server
 app.listen(3000);
 
 console.log("Something awesome to happen at http://localhost:3000");
