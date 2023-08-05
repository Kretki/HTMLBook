const nextPageBtn = document.getElementById("right-arrow")
const prevPageBtn = document.getElementById("left-arrow")
const canvas = document.getElementById("canvas")
const mainBlock = document.getElementById("main-block")

const paper1 = document.getElementById("p1")
const paper2 = document.getElementById("p2")
const paper3 = document.getElementById("p3")

nextPageBtn.addEventListener("click", goNextPage)
prevPageBtn.addEventListener("click", goPrevPage)

let currentLocation = 1
let numOfPapers = 3
let maxLocation = numOfPapers+1

function goNextPage(){
    if(currentLocation<maxLocation){
        switch(currentLocation){
            case 1:
                paper1.classList.add("flipped")
                paper1.style.zIndex = 1
                openBook()
                break
            case 2:
                paper2.classList.add("flipped")
                paper2.style.zIndex = 2
                break
            case 3:
                paper3.classList.add("flipped")
                paper3.style.zIndex = 3
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