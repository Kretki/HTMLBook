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
    var width = document.getElementById("text-header-outliner").getBoundingClientRect().width*0.9
    document.getElementById("header-liner").style.width = width+"px"
}

resizeOutliner()
window.addEventListener('resize', function(event){
    resizeOutliner()
}, true)

document.getElementById("set-hint").onclick = addTextHint
document.getElementById("save-file").onclick = savePage