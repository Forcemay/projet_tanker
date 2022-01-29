// redirect
function go_back_home(){
    document.location.href = "/homepage.html";
}
// login request
function login(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", window.location.href, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE){
        go_back_home();
    }
    }
    xhr.send(JSON.stringify({
    login:'on'
    }));
}


