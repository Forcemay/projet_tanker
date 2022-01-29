//drink button css when on
function drink_button_on(){
  var button = document.getElementById('drink_button_object');
  button.style.backgroundColor = "black";
  button.style.color = "red";
  control_drink("inactive")
}
//drink button css when off
function drink_button_off(){
  var button = document.getElementById('drink_button_object');
  button.style.backgroundColor = "transparent";
  button.style.color = "black";
  control_drink("active")
}
// define whether the button should be clickable
function control_drink(state){
  let button = document.getElementById("drink_button_object");
  if (state=="active"){
    button.disabled = false;
  }
  else {
    button.disabled = true;
  }
}
