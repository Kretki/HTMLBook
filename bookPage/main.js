function savePage(){
    var file = new window.Blob([document.documentElement.innerHTML], { type: "text/html" })
    var URL = window.webkitURL || window.URL

    var downloadUrl = URL.createObjectURL(file)

    var a = document.createElement("a")
    a.download = "source.html"
    a.href = downloadUrl

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

function addTextHint(){
    var selection = getSelection()
    var selectionText = selection.toString()

    var span = document.createElement('SPAN')
    span.textContent = selectionText
    span.classList.add("hint")

    var range = selection.getRangeAt(0)
    range.deleteContents()
    range.insertNode(span)
}

function retValParam(name){
    return document.getElementById(name).getBoundingClientRect()
}

function resizeOutlinerStart(){
    var height = window.screen.height*0.6
    var width = height/108*82
    document.getElementById("header-liner-u").style.width = width+"px"
    document.getElementById("header-liner-b").style.width = width+"px"
    document.getElementById("header-liner-u").style.top = (-retValParam("left-corner-u").height+retValParam("left-corner-u").width)+"px"
    document.getElementById("header-bubbles").style.left = width/2-2*retValParam("left-corner-u").width+"px"
    document.getElementById("header-bubbles").style.top = -retValParam("header-bubbles").height+retValParam("header-liner-u").height-5+"px"
    document.getElementById("canvas").style.width = width-2*retValParam("left-corner-u").width+"px"
    document.getElementById("canvas").style.height = height+"px"
    document.getElementById("canvas").style.left = retValParam("left-corner-u").width+"px"
    document.getElementById("canvas").style.top = (-retValParam("left-corner-u").height+retValParam("header-liner-u").height)+"px"
    document.getElementById("text-bottom-outliner").style.top = (-retValParam("left-corner-u").height+retValParam("header-liner-u").height)+(-retValParam("left-corner-b").height+retValParam("header-liner-b").height+5)+"px"    
    document.getElementById("main-container").style.left = 50+"%"
    document.getElementById("main-container").style.left = retValParam("main-block").left-retValParam("main-block").width/2 + "px"
    document.getElementById("main-container").style.top = retValParam("main-menu").height+50+"px"
    document.getElementById("block-notes").style.width = retValParam("canvas").width+60+"px"
}

function resizeSaved(){
    document.getElementById("header-liner-u").style.width = hluW
    document.getElementById("header-liner-b").style.width = hlbW
    document.getElementById("header-bubbles").style.left = hbL
    document.getElementById("canvas").style.width = canvW
    document.getElementById("canvas").style.height = canvH
    document.getElementById("canvas").style.left = canvL
    document.getElementById("right-corner-u").style.left = rcuL
    document.getElementById("right-corner-b").style.left = rcbL
    document.getElementById("main-block").style.left = mbL
}

function changeReading(){
    var text = document.getElementById("set-reading").textContent
    if(text == "Start reading"){
        document.getElementById("set-reading").textContent = "Stop reading"
    }
    else{
        document.getElementById("set-reading").textContent = "Start reading"
    }
}

function openBook(){
    document.getElementById("header-liner-u").style.transform = "scaleX(2) translateX(-8px)"
    document.getElementById("header-liner-b").style.transform = "scaleX(2) translateX(-8px)"
    document.getElementById("right-corner-u").style.transform = "translateX("+(retValParam("header-liner-u").width/2-16)+"px)"
    document.getElementById("left-corner-u").style.transform = "translateX("+(-retValParam("header-liner-u").width/2-16)+"px)"
    document.getElementById("canvas").style.transform = "translateX("+(retValParam("header-liner-u").width/2-17)+"px)"
    document.getElementById("right-corner-b").style.transform = "translateX("+(retValParam("header-liner-b").width/2-16)+"px)"
    document.getElementById("left-corner-b").style.transform = "translateX("+(-retValParam("header-liner-b").width/2-16)+"px)"
    document.getElementById("block-notes").style.transform = "translateX("+(retValParam("header-liner-u").width/2-retValParam("right-corner-b").width+5)+"px)"
}

function closeBook(){
    document.getElementById("right-corner-u").style.transform = "translateX(0px)"
    document.getElementById("left-corner-u").style.transform = "translateX(0px)"
    document.getElementById("right-corner-b").style.transform = "translateX(0px)"
    document.getElementById("left-corner-b").style.transform = "translateX(0px)"
    document.getElementById("header-liner-u").style.transform = "scaleX(1) translateX(0px)"
    document.getElementById("header-liner-b").style.transform = "scaleX(1) translateX(0px)"
    document.getElementById("block-notes").style.transform = "translateX(0px)"
}

function openNotes(){
    if(document.getElementById("dropdown-notes").getBoundingClientRect().width < 50){
        var li = document.getElementById("dropdown-notes").getElementsByTagName("li")
        for(var i = 0; i<li.length; i++){
            li[i].style.width = retValParam("canvas").width+30+"px"
        }
        document.getElementById("main-container").style.transform = "translateX(-40%)"
        document.getElementById("open-notes").style.backgroundColor = "#2E1F49"
        document.getElementById("notes-arrow").style.transform = "rotate(180deg)"
    }
    else{
        var li = document.getElementById("dropdown-notes").getElementsByTagName("li")
        for(var i = 0; i<li.length; i++){
            li[i].style.width = "0px"
        }
        document.getElementById("main-container").style.transform = "translateX(0%)"
        document.getElementById("open-notes").style.backgroundColor = "#1b112c"
        document.getElementById("notes-arrow").style.transform = "rotate(0deg)"
    }
}

resizeOutlinerStart()

let hluW = retValParam("header-liner-u").width
let hlbW = retValParam("header-liner-b").width
let hbL = retValParam("header-bubbles").left
let canvW = retValParam("canvas").width
let canvH = retValParam("canvas").height
let canvL = retValParam("canvas").left
let rcuL = retValParam("right-corner-u").left
let rcbL = retValParam("right-corner-b").left
let mbL = retValParam("main-block").left

window.addEventListener('resize', function(event){
    resizeSaved()
}, true) //не работает

document.getElementById("set-reading").onclick = changeReading
document.getElementById("set-hint").onclick = addTextHint
document.getElementById("save-file").onclick = savePage
document.getElementById("open-notes").onclick = openNotes