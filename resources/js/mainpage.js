function initialize() {
    setInterval(updateSale, 1000);
}

async function updateSale(){
    let response = await fetch("/api/sale", {method: "GET"});
    let responseJSON = await response.json();
    //console.log(json["message"]);
    let banner = document.getElementById("saleBanner");
    if(responseJSON["active"]){
        banner.innerHTML = responseJSON["message"];
        banner.style.display = '';
    } else{
        banner.style.display = 'none';
    }
}

window.addEventListener("load", initialize);