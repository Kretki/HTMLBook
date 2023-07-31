const changePageBtn = document.getElementById("set-reading")
const canvas = document.getElementById("canvas")

const paper1 = document.getElementById("p1")
const paper2 = document.getElementById("p2")
const paper3 = document.getElementById("p3")

changePageBtn.addEventListener("click", goNextPage)

let currentLocation = 1
let numOfPapers = 3
let maxLocation = numOfPapers+1

function openBook(){
}

function closeBook(){

}

function goNextPage(){
    if(currentLocation<maxLocation){
        switch(currentLocation){
            case 1:
                paper1.classList.add("flipped")
                paper1.style.zIndex = 1
                break
            case 2:
                paper2.classList.add("flipped")
                paper2.style.zIndex = 2
                break
            case 3:
                paper3.classList.add("flipped")
                paper3.style.zIndex = 3
                break
        }
        currentLocation++
    }
}

function goPrevPage(){

}