import birthdayWishes from "./jason.js"

const newBirthdayInfo = document.querySelector(".add-birth")
const formCont = document.querySelector(".form-cont")
const save = document.querySelector(".save-btn")
const nickname = document.querySelector(".info-inp1")
const number = document.querySelector(".info-inp2")
const month = document.querySelector(".info-inp3")
const day = document.querySelector(".info-inp4")
const year = document.querySelector(".info-inp5")
const totalBirthdays = document.querySelector(".made-birthday")
const today = new Date()
const currentDay = today.getDate()
const currentMonth = today.getMonth() + 1
const currentYear = today.getFullYear()
let birthdayInfo = [];
let addBirthdayInfo = [];
const candle = document.querySelector(".candles")
const message = document.querySelector(".message")
const calender = document.querySelector(".calender")
const cancel = document.querySelector(".x-mark")
const notification = document.querySelector(".notifiction")
const notificationText = document.querySelector(".not-p")
const WishCont = document.querySelector(".wishesandmore")
const socialsCont = document.querySelector(".lists")
const socials = document.querySelector(".socials")
const gitCont = document.getElementById("git-cont")

function passFunction(show) {
    let birthdayObject = {
        nameValue : nickname.value,
        numberValue : number.value,
        monthValue : month.value,
        dayValue : day.value,
        yearValue : year.value
     }

     show.push(birthdayObject)

     console.log(show);

     localStorage.setItem("birthdayKey",JSON.stringify(show))
}

function bringit(run) {  
    if (!localStorage.getItem("birthdayKey")) {
        totalBirthdays.innerHTML = `<div class="no-display">No Birthday Saved Yet!</div>`
    }
    else{
        totalBirthdays.classList.remove("hide")
    formCont.classList.remove("come")
    let get = JSON.parse(localStorage.getItem("birthdayKey"));
    let comeout = get.map((c)=>{
        let runAge = currentYear - c.yearValue
        let dom = c.nameValue.toUpperCase()
        let pronounce = c.dayValue < 3? c.dayValue : c.dayValue + "th"
        return ` <div class="almost-cont">
                    <div class="up-day">
                        <h2>${dom}</h2>
                        <img src="img/Happy-Birthday.png" class="bday-img" alt="">
                    </div>
                    <p>${c.nameValue} becomes ${runAge} on ${pronounce}</span></p>
                </div>`
    })
    totalBirthdays.innerHTML = comeout.join("")
    }
    
}


function displayCurrent() {
    notification.style.backgroundColor = "unset"
    notificationText.style.display = "none"
    if (!localStorage.getItem("birthdayKey")) {
        totalBirthdays.innerHTML = `<div class="no-display">Save a birthday</div>`
    }
    else{
        let got = JSON.parse(localStorage.getItem("birthdayKey"))
    let display = got.filter((p)=>{
            
      return p.dayValue == currentDay && p.monthValue == currentMonth     
    })
    

    let showDisplay = display.map((c)=>{
        let runAge = currentYear - c.yearValue
        let dom = c.nameValue.toUpperCase()
        
        return ` <div class="almost-cont2">
                    <div class="up-day">
                        <h2>${dom}</h2>
                        <img src="img/bday.gif" class="bday-img" alt="">
                    </div>
                    <p>Happy ${runAge} Birthday ${c.nameValue}</p>
                    <div class="call-cont">
                    <a href="sms:${c.numberValue}"><i class="fas fa-message call-icon"></i></a>
                    <a href="tel:${c.numberValue}"><i class="fa-solid fa-phone call-icon"></i></a>
                    </div>
                </div>`
   
   
    })

    totalBirthdays.innerHTML = showDisplay.join("")
   
    if (totalBirthdays.childNodes.length === 0) {
        totalBirthdays.innerHTML = `<div class="no-display">No birthdays Today</div>`
        console.log("work");
    }
   
    
    if (showDisplay.length == 0) {
        notificationText.style.display = "none"
        notification.style.backgroundColor = "unset"
    }
    else{
        notificationText.style.display = "block"
        notificationText.innerHTML = showDisplay.length
        notification.style.backgroundColor = "#fca9a8"
    }
    }
}



function remove(params) {
    totalBirthdays.classList.add("hide")
    WishCont.classList.remove("add-height")
    formCont.classList.remove("come")
    socials.classList.remove("add")
}
function wishes() {
    remove()
    WishCont.classList.add("add-height")


    let bringWishes = birthdayWishes.map((w)=>{
        return ` <div class="wishes-cont">
                    <p class="wishText">${w.wish} <span>${w.emoji1} </span>${w.emoji2} ${w.emoji3}</p>
                    <div class="copy-cont">
                        <i class="fa-regular fa-copy great"></i>
                    </div>
                </div>`
    })

  
    WishCont.innerHTML = bringWishes.join("")
    
    let btn2 = document.querySelectorAll(".great")
    let allWishes = document.querySelectorAll(".wishes-cont")
    let wishText = document.querySelectorAll(".wish-text")
    let innerWish = wishText

    allWishes.forEach((wish)=>{
        wish.addEventListener("click",(w)=>{
            if (w.target.matches("i")) {
                let saidText = wish.textContent

                navigator.clipboard.writeText(saidText)
                console.log(saidText);            
            }
        })
    })
    
    
}

save.addEventListener("click",(e)=>{
    if (!localStorage.getItem("birthdayKey")) {
        passFunction(birthdayInfo)
    }
    else{
        const add = JSON.parse(localStorage.getItem("birthdayKey"));
        console.log("worlking");
        addBirthdayInfo = [...add];
        passFunction(addBirthdayInfo)
    } 
    e.preventDefault()
    formCont.classList.remove("come") 
    WishCont.classList.remove("add-height")
    bringit()
    window.location.reload()

    // displayCurrent()
    nickname.value = ""
    number.value = ""
    month.value = ""
    day.value = ""
    year.value = ""
})


socialsCont.addEventListener("click",()=>{
    remove()
    socials.classList.add("add")
    
})
calender.addEventListener("click",()=>{
    remove()
    wishes()
})

newBirthdayInfo.addEventListener("click",()=>{
    remove()
    formCont.classList.add("come")
})

cancel.addEventListener("click",()=>{
    formCont.classList.remove("come")
    totalBirthdays.classList.remove("hide")
})



displayCurrent()

message.addEventListener("click",()=>{
    remove()
    totalBirthdays.classList.remove("hide")
    bringit()
    console.log("fun");
})

candle.addEventListener("click",()=>{
    remove()
    totalBirthdays.classList.remove("hide")
    displayCurrent()     
})

gitCont.addEventListener("click",()=>{
    alert("My github is not available for now")
})