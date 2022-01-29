// different choose possible
var numbers = [-3,-2, -1,1,2,3];
// global number than will be plot
var random_number=1;

// give the next number
function get_next_number(previous) {
    var index = numbers.indexOf(previous)+1
    if (index==numbers.length){
        index = 0;
    }
    return numbers[index]
}
// sleep function
function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }
// annimation
async function change_value() {
  // get random number of plot to do (min 20)
  var number_plot = 20+Math.floor(Math.random() * (numbers.length+1));
  for (let i = 0; i < number_plot; i++) {
    //get next number to plot
    random_number = get_next_number(random_number)
    // plot it
    document.getElementById('number').innerHTML = random_number;
    // wait with a time going down
    var time_step = 100 + (400*i)/number_value
    await sleep(Math.floor(time_step));
  }
  // wait at the end
  await sleep(1000);
  var color;
  var string;
  // specify what to do according to the last number plot
  if (random_number == 0){
    string = "Pas de perdant"
    color = "orange";
  }
  if (random_number < 0){
    string = "Vous distribuez : "+Math.abs(random_number)
    color = "green";
  }
  if (random_number > 0){
    string = "Vous buvez : "+Math.abs(random_number)
    color = "red";
  }
  // change the size of the element number to be able to plot a question
  var number = document.getElementById('number');
  var actual_font_size =window.getComputedStyle(number, null).getPropertyValue('font-size');
  //resize
  number.style.fontSize = Math.floor(parseInt(actual_font_size)/4) + 'px';
  // plot question
  number.innerHTML = string
  // change color
  document.getElementsByClassName('container')[0].style.backgroundColor = color;
  // button is now active
  control_drink("active");

}
// ask for a drink
function send_drink(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", window.location.href, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
    // call back function
    if(xhr.readyState === XMLHttpRequest.DONE){
        var json_info = JSON.parse(xhr.response);
        // not the main user
        if (json_info['main']==0){
            document.location.href = "/index.html";
        }
        else{
            //reset size of number div
            var number = document.getElementById('number');
            var actual_font_size =window.getComputedStyle(number, null).getPropertyValue('font-size');
            number.style.fontSize = Math.floor(parseInt(actual_font_size)*4) + 'px';
            document.getElementsByClassName('container')[0].style.backgroundColor = "white";
            // change value (launch roulette)
            change_value();
            // button is off (css)
            drink_button_off();
            // inactive (not clickable)
            control_drink("inactive");
        }
    }
}
    // ask for a drink
    xhr.send(JSON.stringify({
    drink: Math.abs(random_number)
    }));
    // button on (css)
    drink_button_on();
}
// redirect function
function go_back_home(){
    document.location.href = "/homepage.html";
}
