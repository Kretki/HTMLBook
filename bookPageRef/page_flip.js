const nextPageBtn = document.getElementById("right-arrow")
const prevPageBtn = document.getElementById("left-arrow")
const canvas = document.getElementById("canvas")
const mainBlock = document.getElementById("main-block")

const paper1 = document.getElementById("p1")
const paper2 = document.getElementById("p2")
const paper3 = document.getElementById("p3")
const frontH1 = document.getElementById("front-h1")
const frontH3 = document.getElementById("front-h3")
const backP1 = document.getElementById("back1-p")
const frontP2 = document.getElementById("front2-p")
const backP2 = document.getElementById("back2-p")
const frontP3 = document.getElementById("front3-p")
const backP3 = document.getElementById("back3-p")
const allFront = document.getElementsByClassName("front")
const allBack = document.getElementsByClassName("back")

const liTextData = document.getElementById("text-for-book").getElementsByTagName("li")

function splitTextBetweenPages(rest_text){
    var all_text = []
    while(rest_text.length != 0){
        var stop = false
        var textToWrite = ""
        backP1.innerHTML = ""
        while(backP1.scrollHeight+20<=paper1.getBoundingClientRect().height){
            if(rest_text.length == 0){
                stop = true
                break
            }
            textToWrite = rest_text.shift()
            backP1.innerHTML = backP1.textContent+" "+textToWrite
            if(textToWrite == "\f"){
                stop = true
                break
            }
        }
        backP1.innerHTML = backP1.textContent.slice(0, -(textToWrite.length+1))
        all_text.push(backP1.textContent)
        if(!stop){
            rest_text.unshift(textToWrite)
        }
    }
    return all_text
}

// function setTextForPages(all_text){

// }

var main_all_text = []
var ann_rest_text = []
var writable_p = [backP1, frontP2, backP2, frontP3]
var ifNewTitle = false
for(var i = 0; i<liTextData.length; i++){
    var spli = liTextData[i].textContent.split("0x1x0")
    if(spli[0] == "author"){
        frontH3.innerHTML = spli[1]
    }
    if(spli[0] == "book-title"){
        frontH1.innerHTML = spli[1]
    }
    if(spli[0] == "annotation"){
        ann_rest_text.push.apply(ann_rest_text, spli[1].split(" "))
    }
    else{
        if(spli[0].substring(0,6) == "title" && !ifNewTitle){
            main_all_text.push("\f")
            ifNewTitle = true
        }
        if(spli[0].substring(0,6) != "title"){
            ifNewTitle = false
        }
        main_all_text.push.apply(main_all_text, spli[1].split(" "))
        main_all_text.push("\n")
    }
}

var all_text = []
var all_text = splitTextBetweenPages(ann_rest_text)
all_text.push.apply(all_text, splitTextBetweenPages(main_all_text))
console.log(all_text.length)
backP1.innerHTML = all_text[1]


nextPageBtn.addEventListener("click", goNextPage)
prevPageBtn.addEventListener("click", goPrevPage)

let currentLocation = 1
let numOfPapers = 3
let maxLocation = numOfPapers+1

function disableTransition(){
    for(var i = 0; i<allFront.length; i++){
        allFront[i].classList.add('notransition')
        allBack[i].classList.add('notransition')
    }
}

function enableTransition(){
    for(var i = 0; i<allFront.length; i++){
        allFront[i].classList.remove('notransition')
        allBack[i].classList.remove('notransition')
    }
}

function skipToPrevPage(){
    currentLocation--
    setTimeout(()=>{
        disableTransition()
        backP1.innerHTML = backP2.textContent
        frontP2.innerHTML = frontP3.textContent
        paper2.classList.remove("flipped")
        paper2.style.zIndex = 3
    }, 600)
    setTimeout(()=>{
        enableTransition()
    }, 700)
}

function skipToNextPage(){
    currentLocation++
    setTimeout(()=>{
        disableTransition()
        backP2.innerHTML = backP1.textContent
        frontP3.innerHTML = frontP2.textContent
        paper2.classList.add("flipped")
        paper2.style.zIndex = 2
    }, 600)
    setTimeout(()=>{
        enableTransition()
    }, 700)
}

function goNextPage(){
    if(currentLocation<maxLocation){
        switch(currentLocation){
            case 1:
                paper1.classList.add("flipped")
                setTimeout(()=>{
                    paper1.style.zIndex = 1
                }, 500)
                openBook()
                break
            case 2:
                paper2.classList.add("flipped")
                setTimeout(()=>{
                    paper2.style.zIndex = 2
                }, 500)
                // skipToPrevPage()
                break
            case 3:
                paper3.classList.add("flipped")
                setTimeout(()=>{
                    paper3.style.zIndex = 3
                }, 500)
                closeBook()
                document.getElementById("canvas").style.transform = "translateX("+(document.getElementById("header-liner-u").getBoundingClientRect().width/2-5)+"px)"
                break
        }
        currentLocation++
    }
}

function goPrevPage(){
    if(currentLocation>1){
        switch(currentLocation){
            case 2:
                paper1.classList.remove("flipped")
                paper1.style.zIndex = 4
                closeBook()
                document.getElementById("canvas").style.transform = "translateX(0px)"
                break
            case 3:
                paper2.classList.remove("flipped")
                setTimeout(()=>{
                paper2.style.zIndex = 3
                })
                // skipToNextPage()
                break
            case 4:
                paper3.classList.remove("flipped")
                paper3.style.zIndex = 2
                openBook()
                break
        }
        currentLocation--
    }
}