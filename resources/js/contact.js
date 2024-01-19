function calculate(){
    let select = document.getElementById("reason").value;
    let email = document.getElementById("email").value;
   
    let cost = 0;
    if(select == "fun"){
        cost = 5;
    } else if(select == "adopt"){
        cost = 10;
    } else if(select == "idk"){
        cost = 15;
    }

    if(email.includes("umn.edu")){
        cost *= 0.9;
        document.getElementById("umnEmails").removeAttribute("hidden");
    } else{
        document.getElementById("umnEmails").setAttribute("hidden", true);
    }

    document.getElementById("costCalc").innerHTML = cost;

}

function initialize() {
    document.getElementById("reason").addEventListener("change", calculate);
    document.getElementById("email").addEventListener("keyup", calculate);
}

window.addEventListener("load", initialize);