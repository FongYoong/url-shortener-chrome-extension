
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
let submitBtn = document.getElementById("submitBtn");
let inputUrl = document.getElementById("inputUrl");
let outputDiv = document.getElementById("outputDiv");
let outputText = document.getElementById("outputText");
let outerCopiedDiv = document.getElementById("outerCopiedDiv");
let copyBtn = document.getElementById("copyBtn");

function copyToClipboard() {
    function listener(e) {
        e.clipboardData.setData("text/html", outputText.innerHTML);
        e.clipboardData.setData("text/plain", outputText.innerHTML);
        e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
    outerCopiedDiv.style.display = "block"
}
copyBtn.addEventListener('click', copyToClipboard);

submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    outputText.innerHTML = ""
    inputDiv.style.display = "none";
    copyBtn.style.display = "none";
    outerCopiedDiv.style.display = "none"
    function successListener () {
        outputDiv.style.display = "block";
        if(JSON.stringify(JSON.parse(this.responseText)["validUrl"]) === "true"){
            let outputUrl = JSON.stringify(JSON.parse(this.responseText)["outputUrl"]);
            outputText.innerHTML = outputUrl.substring(1, outputUrl.length - 1);
            copyBtn.style.display = "block";
        }
        else{
            outputText.innerHTML = "Invalid URL!";
        }
        end();
    }
    function progressListener (oEvent) {
        if (oEvent.lengthComputable) {
          var percentComplete = oEvent.loaded / oEvent.total * 100;
          //outputText.innerHTML = percentComplete + "%";
        } else {
            //outputText.innerHTML = "Loading...";
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
    }

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", successListener);
    xhr.addEventListener("progress", progressListener);
    xhr.addEventListener("error", errorListener);
    xhr.addEventListener("abort", abortListener);
    xhr.open("POST", "https://ushnk.herokuapp.com");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ "inputUrl":inputUrl.value}));
    return false;
});