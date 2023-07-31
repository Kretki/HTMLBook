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

function resizeOutliner(){
    var height = window.screen.height*0.6
    var width = height/108*164
    document.getElementById("header-liner-u").style.width = width+"px"
    document.getElementById("header-liner-b").style.width = width+"px"
    document.getElementById("header-bubbles").style.left = width/2-2*document.getElementById("left-corner-u").getBoundingClientRect().width+"px"
    var bookWidth = width-document.getElementById("canvas").getBoundingClientRect().left
    document.getElementById("canvas").style.width = bookWidth/2.1+"px" //podgon
    var left = document.getElementById("canvas").getBoundingClientRect().left
    document.getElementById("canvas").style.height = height+"px"
    document.getElementById("canvas").style.left = bookWidth/2+left+document.getElementById("right-corner-u").getBoundingClientRect().width/1.5+"px"
    left = 2*document.getElementById("left-corner-u").getBoundingClientRect().width+width
    document.getElementById("right-corner-u").style.left = left+"px"
    document.getElementById("right-corner-b").style.left = left+"px"
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

resizeOutliner()

let hluW = document.getElementById("header-liner-u").style.width
let hlbW = document.getElementById("header-liner-b").style.width
let hbL = document.getElementById("header-bubbles").style.left
let canvW = document.getElementById("canvas").style.width
let canvH = document.getElementById("canvas").style.height
let canvL = document.getElementById("canvas").style.left
let rcuL = document.getElementById("right-corner-u").style.left
let rcbL = document.getElementById("right-corner-b").style.left


window.addEventListener('resize', function(event){
    resizeSaved()
}, true)

document.getElementById("set-reading").onclick = changeReading
document.getElementById("set-hint").onclick = addTextHint
document.getElementById("save-file").onclick = savePage