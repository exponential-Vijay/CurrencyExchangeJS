let BaseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")


window.addEventListener("load" , ()=>{
    updateExchangeRate();
})

for(let select of dropdown){
    for(code in countryList){
        // console.log(code + " : " + countryList[code]);
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "from" && code === "USD"){
            newOption.selected = code;
        }
        else if(select.name === "to" && code === "INR"){
            newOption.selected = code
        }
        select.append(newOption);
    }
    select.addEventListener("change" , (eve)=>{
        updateFlag(eve.target);
    })
    
}

function updateFlag(element){
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newFlagURL = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newFlagURL;
}
btn.addEventListener("click" , async (eve)=>{
    eve.preventDefault();
    updateExchangeRate();
    
    
});

const updateExchangeRate = async ()=>{
    let amount = document.querySelector("form input").value;
    if(amount == "" || amount <1){
        alert("entered amount must be greater than 0 !");
    }
        console.log(fromcurr.value , tocurr.value)
        const URL = `${BaseURL}/${fromcurr.value.toLowerCase()}.json`;
        let response = await fetch(URL);
        let data = await response.json();
        console.log(data);
        let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]; 
        let finalAmount = rate * amount;
        msg.innerHTML = `${amount} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
    
}