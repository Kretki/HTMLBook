const nextPageBtn = document.getElementById("right-arrow")
const prevPageBtn = document.getElementById("left-arrow")
const canvas = document.getElementById("canvas")
const mainBlock = document.getElementById("main-block")

const paper1 = document.getElementById("p1")
const paper2 = document.getElementById("p2")
const paper3 = document.getElementById("p3")
const paper4 = document.getElementById("p4")
const frontH1 = document.getElementById("front-h1")
const frontH3 = document.getElementById("front-h3")
const backP1 = document.getElementById("back1-p")
const frontP2 = document.getElementById("front2-p")
const backP2 = document.getElementById("back2-p")
const frontP3 = document.getElementById("front3-p")
const backP3 = document.getElementById("back3-p")
const frontP4 = document.getElementById("front4-p")
const backP4 = document.getElementById("back4-p")
const allFront = document.getElementsByClassName("front")
const allBack = document.getElementsByClassName("back")

const liTextData = document.getElementById("text-for-book").getElementsByTagName("li")

let currentLocation = 1
let numOfPapers = 4
let maxLocation = numOfPapers+1
let curBookPage = 0

var splitted_text = []
var writable_p = [backP1, frontP2, backP2, frontP3, backP3, frontP4]

function catchText(text){
    return text
}

setTimeout(()=>{
    bookHandle().then((res)=>{
        splitted_text = res
    })
}, 100)

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

async function bookHandle(){
    var main_all_text = []
    var ann_rest_text = []
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

    var splitted_text = []
    console.log("start")
    var splitted_text = await splitTextBetweenPages(ann_rest_text)
    const splitted_main = splitTextBetweenPages(main_all_text)
    splitted_text.push.apply(splitted_text, splitted_main)
    console.log("end")
    nextPageBtn.addEventListener("click", goNextPage)
    prevPageBtn.addEventListener("click", goPrevPage)
    return splitted_text
}

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

function skipToPrevPage(pages, textList){
    currentLocation--
    setTimeout(()=>{
        for(var i = 0; i<pages.length-2; ++i){
            pages[i].innerHTML = textList[curBookPage+i-2]
        }
    }, 300)
    setTimeout(()=>{
        disableTransition()
        paper3.classList.remove("flipped")
        paper3.style.zIndex = 3
    }, 400)
    setTimeout(()=>{
        placeTextOnPages(pages, textList)
    }, 500)
    setTimeout(()=>{
        enableTransition()
    }, 600)
}

function skipToNextPage(pages, textList){
    currentLocation++
    setTimeout(()=>{
        for(var i = 0; i<pages.length-2; ++i){
            pages[i+2].innerHTML = textList[curBookPage+i]
        }
    }, 300)
    setTimeout(()=>{
        disableTransition()
        paper3.classList.add("flipped")
        paper3.style.zIndex = 3
    }, 400)
    setTimeout(()=>{
        placeTextOnPages(pages, textList)
    }, 500)
    setTimeout(()=>{
        enableTransition()
    }, 600)
}

function placeTextOnPages(pages, textList){
    if(currentLocation == 1 | currentLocation == 2){
        for(var i = 0; i<pages.length; ++i){
            pages[i].innerHTML = textList[i]
        }
    }
    else if(currentLocation == 5 | currentLocation == 4){
        for(var i = 0; i<pages.length; ++i){
            pages[pages.length-i-1].innerHTML = textList[textList.length-i-1]
        }
    }
    else{
        for(var i = 0; i<pages.length; ++i){
            pages[i].innerHTML = textList[curBookPage+i-2]
        }
    }
}

function goNextPage(){
    if(currentLocation<maxLocation){
        switch(currentLocation){
            case 1:
                placeTextOnPages(writable_p, splitted_text)
                paper1.classList.add("flipped")
                setTimeout(()=>{
                    paper1.style.zIndex = 1
                }, 200)
                openBook()
                break
            case 2:
                paper2.classList.add("flipped")
                setTimeout(()=>{
                    paper2.style.zIndex = 2
                }, 200)
                curBookPage+=2
                break
            case 3:
                paper3.classList.add("flipped")
                setTimeout(()=>{
                    paper3.style.zIndex = 3
                }, 200)
                curBookPage+=2
                if(curBookPage < splitted_text.length-2){
                    skipToPrevPage(writable_p, splitted_text)
                }
                break
            case 4:
                paper4.classList.add("flipped")
                paper4.style.zIndex = 4
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
                paper1.style.zIndex = 5
                closeBook()
                document.getElementById("canvas").style.transform = "translateX(0px)"
                break
            case 3:
                paper2.classList.remove("flipped")
                setTimeout(()=>{
                    paper2.style.zIndex = 4
                }, 200)
                curBookPage-=2
                if(curBookPage > 2){
                    console.log(currentLocation)
                    skipToNextPage(writable_p, splitted_text)
                }
                break
            case 4:
                paper3.classList.remove("flipped")
                setTimeout(()=>{
                    paper3.style.zIndex = 3
                }, 200)
                curBookPage-=2
                break
            case 5:
                placeTextOnPages(writable_p, splitted_text)
                paper4.classList.remove("flipped")
                setTimeout(()=>{
                    paper4.style.zIndex = 2
                }, 200)
                openBook()
                break
        }
        currentLocation--
    }
}


// function setTextForPages(all_text, pages, curpage, direction){
//     if(curpage == -2){
//         pages[0].innerHTML = all_text[curpage+2]
//         pages[1].innerHTML = all_text[curpage+3]
//         pages[2].innerHTML = all_text[curpage+4]
//         pages[3].innerHTML = all_text[curpage+5]
//     }
//     else if(curpage>=all_text.length-1){
//         pages[2].innerHTML = all_text[curpage]
//         pages[3].innerHTML = all_text[curpage+1]
//     }
//     else if(direction=="front"){
//         pages[0].innerHTML = all_text[curpage]
//         pages[1].innerHTML = all_text[curpage+1]
//         pages[2].innerHTML = all_text[curpage+2]
//         pages[3].innerHTML = all_text[curpage+3]
//     }
//     else{
//         pages[0].innerHTML = all_text[curpage-2]
//         pages[1].innerHTML = all_text[curpage-1]
//         pages[2].innerHTML = all_text[curpage]
//         pages[3].innerHTML = all_text[curpage+1]
//     }
// }


// function skipToNextPage(){
//     currentLocation++
//     setTimeout(()=>{
//         disableTransition()
//         backP2.innerHTML = backP1.textContent
//         frontP3.innerHTML = frontP2.textContent
//         paper2.classList.add("flipped")
//         paper2.style.zIndex = 2
//     }, 600)
//     setTimeout(()=>{
//         enableTransition()
//     }, 700)
// }