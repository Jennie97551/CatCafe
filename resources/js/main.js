function toggleStyle(){
    let body = document.getElementsByTagName("body")[0];
    body.classList.toggle("dark");
    if(localStorage.getItem("theme") == "dark"){
        localStorage.setItem("theme", "light");
    } else{
        localStorage.setItem("theme", "dark");
    }
}

function initialize() {
    // setInterval(updateSale, 1000);
    document.getElementById("themeButton").addEventListener("click", toggleStyle);
    if(localStorage.getItem("theme") == "dark"){
        let body = document.getElementsByTagName("body")[0];
        body.classList.add("dark");
    }
}

// async function updateSale(){
//     let response = await fetch("/api/sale", {method: "GET"});
//     let responseJSON = await response.json();
//     //console.log(json["message"]);
//     let banner = document.getElementById("saleBanner");
//     if(responseJSON["active"]){
//         banner.innerHTML = responseJSON["message"];
//         banner.style.display = '';
//     } else{
//         banner.style.display = 'none';
//     }
// }

window.addEventListener("load", initialize);

