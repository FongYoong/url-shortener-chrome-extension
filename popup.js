
/*
let button = document.getElementById('btn');

  chrome.storage.sync.get('color', function(data) {
    button.style.backgroundColor = data.color;
    button.setAttribute('value', data.color);
  });
button.onclick = function(element) {
    
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {

        if(tabs.length > 0 && tabs[0].hasOwnProperty("url")){
            //https://www.youtube.com/watch?v=3iCifD8gZ0Q
            //console.log(tab[0]["url"].split("https://www.")[1]);
            let newUrl = "https://www.pwn" + tabs[0]["url"].split("https://www.")[1]; //append 'pwn' to the Youtube url
            //console.log(newUrl);
            chrome.tabs.update(tabs.id, {url: newUrl});
        }
    });
};
*/
let inputDiv = document.getElementById("inputDiv");
let progressDiv = document.getElementById("progressDiv");
let progress = document.getElementById("progress");
let output = document.getElementById("output");
let submitBtn = document.getElementById("submitBtn");
let inputUrl = document.getElementById("inputUrl");
submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    output.innerHTML = ""
    inputDiv.style.display = "none";
    function successListener () {
        console.log(this.responseText);
        if(JSON.stringify(JSON.parse(this.responseText)["validUrl"]) === "true"){
            output.innerHTML = JSON.stringify(JSON.parse(this.responseText)["outputUrl"]);
        }
        else{
            output.innerHTML = "Invalid URL!";
        }
        end();
    }
    function progressListener (oEvent) {
        if (oEvent.lengthComputable) {
          var percentComplete = oEvent.loaded / oEvent.total * 100;
          //progressDiv.style.display = "block";
          output.innerHTML = percentComplete + "%";
        } else {
            output.innerHTML = "Loading...";
        }
    }
    function errorListener(evt) {
        end();
        console.log("An error occurred!")
    }
    function abortListener(evt) {
        end();
        console.log("An error occurred!")
    }
    function end(){
        inputDiv.style.display = "block";
        //progressDiv.style.display = "none";
    }

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", successListener);
    xhr.addEventListener("progress", progressListener);
    xhr.addEventListener("error", errorListener);
    xhr.addEventListener("abort", abortListener);
    xhr.open("POST", "https://url-shortener-chrome.herokuapp.com");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ "inputUrl":inputUrl.value}));
    return false;
});