// redirect function
function go_back_home(){
    document.location.href = "/homepage.html";
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
            // button css off
            else{
            drink_button_off();}
        }
    }
    // ask for a drink
    xhr.send(JSON.stringify({
    drink: 1
    }));
    drink_button_on();
}
