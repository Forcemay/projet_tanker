var numbers = [-3,-2, -1,1,2,3];
var random_number=1;


function get_next_number(previous) {
    var index = numbers.indexOf(previous)+1
    if (index==numbers.length){
        index = 0;
    }
    return numbers[index]
}
function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }
async function change_value() {
  var number_value = 20+Math.floor(Math.random() * (numbers.length+1));
  for (let i = 0; i < number_value; i++) {
    random_number = get_next_number(random_number)
    document.getElementById('number').innerHTML = random_number;
    var time_step = 100 + (400*i)/number_value
    await sleep(Math.floor(time_step));
  }
  await sleep(1000);
  var color;
  var string;
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
  var number = document.getElementById('number');
  var actual_font_size =window.getComputedStyle(number, null).getPropertyValue('font-size');
  number.style.fontSize = Math.floor(parseInt(actual_font_size)/4) + 'px';
  number.innerHTML = string

  document.getElementsByClassName('container')[0].style.backgroundColor = color;
  control_drink("active");

}
function send_drink(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", window.location.href, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE){
        var number = document.getElementById('number');
        var actual_font_size =window.getComputedStyle(number, null).getPropertyValue('font-size');
        number.style.fontSize = Math.floor(parseInt(actual_font_size)*4) + 'px';
        document.getElementsByClassName('container')[0].style.backgroundColor = "white";
        change_value();
        drink_button_off();
        control_drink("inactive");
    }
}
    xhr.send(JSON.stringify({
    drink: Math.abs(random_number)
    }));
    drink_button_on();


}
function go_back_home(){
    document.location.href = "/index.html";
}