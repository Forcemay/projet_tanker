// redirect
function go_back_home(){
    document.location.href = "/homepage.html";
}
// send strength through post method
function send_strength(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", window.location.href, true);
    // content is json
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
    // call back function to trigger
    if(xhr.readyState === XMLHttpRequest.DONE){
        var json_info = JSON.parse(xhr.response);
        // if you are not the main user
        if (json_info['main']==0){
            document.location.href = "/index.html";
        }
        // refresh strength
        else {
        document.getElementById("strength").value = "";
        get_strength();}
    }
    }
    //send new strength
    var strength_value = document.getElementById("strength").value;
    xhr.send(JSON.stringify({
    strength:strength_value
    }));
}
// control the valve with a post request
function control_valve(){
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
    }
    }
    // send to switch the valve
    xhr.send(JSON.stringify({
    valve:'switch'
    }));
}
// get method for strength through post method
function get_strength(){
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
        // redefine the strength label
        else{
        document.getElementById("strength_label").innerHTML = "Force ( "+json_info["strength_value"]+" s ) ";
    }}
    }
    // ask for strength
    xhr.send(JSON.stringify({
    ask_strength: 1
    }));
}
