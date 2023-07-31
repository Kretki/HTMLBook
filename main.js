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
    var width = window.screen.width-2*(document.getElementById("left-corner-u").getBoundingClientRect().width+document.getElementById("left-corner-u").getBoundingClientRect().left)
    document.getElementById("header-liner-u").style.width = width+"px"
    document.getElementById("header-liner-b").style.width = width+"px"
    var bookWidth = width-document.getElementById("canvas").getBoundingClientRect().left
    document.getElementById("canvas").style.width = bookWidth/2.1+"px"
    var left = document.getElementById("canvas").getBoundingClientRect().left
    console.log(bookWidth, left)
    var height = document.getElementById("canvas").getBoundingClientRect().width/84*108
    document.getElementById("canvas").style.height = height+"px"
    document.getElementById("canvas").style.left = bookWidth/2+left+"px"
    console.log(bookWidth, document.getElementById("canvas").style.left)
    left = 2*document.getElementById("left-corner-u").getBoundingClientRect().width+width
    document.getElementById("right-corner-u").style.left = left+"px"
    document.getElementById("right-corner-b").style.left = left+"px"
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
window.addEventListener('resize', function(event){
    resizeOutliner()
}, true)

// document.getElementById("set-reading").onclick = changeReading
document.getElementById("set-hint").onclick = addTextHint
document.getElementById("save-file").onclick = savePage