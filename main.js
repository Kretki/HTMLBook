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

function resizeOutlinerStart(){
    var height = window.screen.height*0.6
    var width = height/108*82
    document.getElementById("header-liner-u").style.width = width+"px"
    document.getElementById("header-liner-b").style.width = width+"px"
    document.getElementById("header-bubbles").style.left = width/2-2*document.getElementById("left-corner-u").getBoundingClientRect().width+"px"
    var bookWidth = width-document.getElementById("canvas").getBoundingClientRect().left
    document.getElementById("canvas").style.width = bookWidth+"px" //podgon
    document.getElementById("canvas").style.height = height+"px"
    document.getElementById("canvas").style.left = document.getElementById("canvas").style.left+"px"
    left = 2*document.getElementById("left-corner-u").getBoundingClientRect().width+width
    document.getElementById("right-corner-u").style.left = left+"px"
    document.getElementById("right-corner-b").style.left = left+"px"
    document.getElementById("main-block").style.left = 50+"%"
    document.getElementById("main-block").style.left = document.getElementById("main-block").getBoundingClientRect().left-document.getElementById("main-block").getBoundingClientRect().width/1.5 + "px"
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
    document.getElementById("right-corner-u").style.transform = "translateX("+document.getElementById("header-liner-u").getBoundingClientRect().width/2+"px)"
    document.getElementById("left-corner-u").style.transform = "translateX("+(-document.getElementById("header-liner-u").getBoundingClientRect().width/2)+"px)"
    document.getElementById("canvas").style.transform = "translateX("+document.getElementById("header-liner-u").getBoundingClientRect().width/2+"px)"
    document.getElementById("right-corner-b").style.transform = "translateX("+document.getElementById("header-liner-b").getBoundingClientRect().width/2+"px)"
    document.getElementById("left-corner-b").style.transform = "translateX("+(-document.getElementById("header-liner-b").getBoundingClientRect().width/2)+"px)"
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
let mbL = document.getElementById("main-block").getBoundingClientRect().left

window.addEventListener('resize', function(event){
    resizeSaved()
}, true)

document.getElementById("set-reading").onclick = changeReading
document.getElementById("set-hint").onclick = addTextHint
document.getElementById("save-file").onclick = savePage