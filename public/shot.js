function go_back_home(){
    document.location.href = "/homepage.html";
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
        else{
        drink_button_off();}

    }
    }
    xhr.send(JSON.stringify({
    drink: 1
    }));
    drink_button_on();

}
