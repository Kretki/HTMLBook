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
const allFront = document.getElementsByClassName("front")
const allBack = document.getElementsByClassName("back")

const liTextData = document.getElementById("text-for-book").getElementsByTagName("li")
for(var i = 0; i<liTextData.length; i++){
    var spli = liTextData[i].textContent.split(":")
    if(spli[0] == "author"){
        frontH3.innerHTML = spli[1]
    }
    if(spli[0] == "book-title"){
        frontH1.innerHTML = spli[1]
    }
    if(spli[0] == "annotation"){
        backP1.innerHTML = spli[1]
    }
}


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
        paper2.classList.remove("flipped")
        paper2.style.zIndex = 3
        }, 600)
    enableTransition()
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
                paper2.style.zIndex = 3
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