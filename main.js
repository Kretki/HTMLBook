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
    document.getElementById("main-block").style.left = 50+"%"
    document.getElementById("main-block").style.left = retValParam("main-block").left-retValParam("main-block").width/1.5 + "px"
    document.getElementById("main-block").style.top = retValParam("main-menu").height+50+"px"
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

function resizeOutlinerUp(){
    document.getElementById("header-liner-u").style.transform = "scaleX(2)"
    document.getElementById("header-liner-b").style.transform = "scaleX(2)"
    document.getElementById("right-corner-u").style.transform = "translateX("+retValParam("header-liner-u").width/2+"px)"
    document.getElementById("left-corner-u").style.transform = "translateX("+(-retValParam("header-liner-u").width/2)+"px)"
    document.getElementById("canvas").style.transform = "translateX("+retValParam("header-liner-u").width/2+"px)"
    document.getElementById("right-corner-b").style.transform = "translateX("+retValParam("header-liner-b").width/2+"px)"
    document.getElementById("left-corner-b").style.transform = "translateX("+(-retValParam("header-liner-b").width/2)+"px)"
}

function resizeOutlinerDown(){
    document.getElementById("right-corner-u").style.transform = "translateX(0px)"
    document.getElementById("left-corner-u").style.transform = "translateX(0px)"
    document.getElementById("right-corner-b").style.transform = "translateX(0px)"
    document.getElementById("left-corner-b").style.transform = "translateX(0px)"
    document.getElementById("header-liner-u").style.transform = "scaleX(1)"
    document.getElementById("header-liner-b").style.transform = "scaleX(1)"
}

function openBook(){
    resizeOutlinerUp()
}

function closeBook(){
    resizeOutlinerDown()
}

resizeOutlinerStart()

let hluW = document.getElementById("header-liner-u").style.width
let hlbW = document.getElementById("header-liner-b").style.width
let hbL = document.getElementById("header-bubbles").style.left
let canvW = document.getElementById("canvas").style.width
let canvH = document.getElementById("canvas").style.height
let canvL = document.getElementById("canvas").style.left
let rcuL = document.getElementById("right-corner-u").style.left
let rcbL = document.getElementById("right-corner-b").style.left
let mbL = retValParam("main-block").left

window.addEventListener('resize', function(event){
    resizeSaved()
}, true) //не работает

document.getElementById("set-reading").onclick = changeReading
document.getElementById("set-hint").onclick = addTextHint
document.getElementById("save-file").onclick = savePage