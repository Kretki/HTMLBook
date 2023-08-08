import xml.etree.ElementTree as EL
import json

tree = EL.parse('Aristotel_Politika.fb2')
root = tree.getroot()
prefix = root.tag[:root.tag.find("}")+1] 
desc = root.find(prefix+"description").find(prefix+"title-info")
author = desc.find(prefix+"author")
book_title = desc.find(prefix+"book-title")
ann = desc.find(prefix+"annotation")
annot = ""
for text in ann.findall(prefix+"p"):
    annot += text.text.replace("\xa0", " ") + " "
body = root.find(prefix+"body")
authors = ""
if(author.find(prefix+"first-name").text is not None):
    authors += author.find(prefix+"first-name").text + " "
if(author.find(prefix+"last-name").text is not None):
    authors += author.find(prefix+"last-name").text
deep = {"author":authors, "book-title":[book_title.text], "annotation": annot}
title = ""
text = ""
title_count = 0
text_count = 0
rest_p = 0
for elem in body.iter():
    if elem.tag == prefix+"title":
        if(text != ""):
            deep[f"text-{text_count}"] = text
        text = ""
        text_count += 1
        for tex in elem.findall(prefix+"p"):
            title += tex.text.replace("\xa0", " ")+" "
        rest_p = len(elem.findall(prefix+"p"))
    if elem.tag == prefix+"p":
        if rest_p != 0:
            rest_p -= 1
            if(rest_p == 0):
                if(title != ""):
                    deep[f"titile-{title_count}"] = title
                    title = ""
                    title_count += 1
            continue
        if(title != ""):
            deep[f"titile-{title_count}"] = title
            title = ""
            title_count += 1
        text += elem.text.replace("\xa0", " ")+"\n"
if(text != ""):
    deep[f"text-{text_count}"] = text
print(json.dumps(deep))