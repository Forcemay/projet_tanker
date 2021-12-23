function go_back_home(){
    document.location.href = "/index.html";
}
function send_strength(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", window.location.href, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE){
        document.getElementById("strength").value = "";
        get_strength();
    }
    }
    var strength_value = document.getElementById("strength").value;
    xhr.send(JSON.stringify({
    strength:strength_value
    }));
}
function control_valve(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", window.location.href, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE){
    }
    }
    var strength_value = document.getElementById("strength").value;
    xhr.send(JSON.stringify({
    valve:'switch'
    }));
}

function get_strength(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", window.location.href, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE){
        var json_info = JSON.parse(xhr.response);
        document.getElementById("strength_label").innerHTML = "Force ( "+json_info["strength_value"]+" s ) ";
    }
    }
    var strength_value = document.getElementById("strength").value;
    xhr.send(JSON.stringify({
    ask_strength: 1
    }));
}
