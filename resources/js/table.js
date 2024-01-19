async function deleteRow(event){
    let target = event.target;
    let tableRow = target.parentElement.parentElement;
    id = -1;
    for (const child of tableRow.children) {
        id = child.innerText;
        break;
      }
    let response = await fetch("/api/contact", {method: "DELETE", body: '{"id":' + id + '}', headers: new Headers({'content-type': 'application/json'})});
    //'{"id":' + id + '}'
    if(response.status == 200 || response.status == 404){
        let table = tableRow.parentElement;
        table.removeChild(tableRow);
    }
}

async function setSale(){
    let message = document.getElementById("saleInput").value; 
    let response = await fetch("/api/sale", {method: "POST", body: '{"message":"' + message + '"}', headers: new Headers({'content-type': 'application/json'})});
    if(response.status >= 400){
        console.log("issues posting sale input to server");
    }
}

async function endSale(){
    let response = await fetch("/api/sale", {method: "DELETE"});
    if(response.status >= 400){
        console.log("issues deleting sale from server");
    }
}

function initialize() {
    list = document.getElementsByClassName("delete");
    for(button of list){
        button.addEventListener("click", deleteRow);
    }

    setButton = document.getElementById("setSale");
    setButton.addEventListener("click", setSale);

    endButton = document.getElementById("endSale");
    endButton.addEventListener("click", endSale);
}

function updateTime(){
    let list = document.getElementsByClassName("time");
    let curr = new Date().getTime();

    for(time of list){
        let appt = Date.parse(time.previousElementSibling.previousElementSibling.innerText + "T00:00:00");
        if(isNaN(appt)){
            time.innerHTML = "";
        } else if(appt < curr){
            time.innerHTML = "PAST";
        } else{
            let diff = appt - curr;

            //adapted from https://www.w3schools.com/howto/howto_js_countdown.asp
            let days = Math.floor(diff / (1000 * 60 * 60 * 24));
            let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((diff % (1000 * 60)) / 1000);
            //

            time.innerHTML = days + ":" + hours + ":" + minutes + ":" + seconds;
        }
    }
}

window.addEventListener("load", initialize);

setInterval(updateTime, 1000)