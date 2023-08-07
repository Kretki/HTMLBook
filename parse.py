import xml.etree.ElementTree as EL
import json

tree = EL.parse('Aristotel_Politika.fb2')
root = tree.getroot()
prefix = root.tag[:root.tag.find("}")+1] 
desc = root.find(prefix+"description").find(prefix+"title-info")
author = desc.find(prefix+"author")
ann = desc.find(prefix+"annotation")
body = root.find(prefix+"body")
authors = [author.find(prefix+"first-name").text, author.find(prefix+"last-name").text]
authors = [au for au in authors if au is not None]
deep = {"author":authors, "annotation": [text.text.replace("\xa0", " ") for text in ann.findall(prefix+"p")]}
title = []
text = []
title_count = 0
text_count = 0
for elem in body.iter():
    if elem.tag == prefix+"title":
        if(text != []):
            deep[f"text-{text_count}"] = text
        text = []
        text_count += 1
        title += [text.text.replace("\xa0", " ") for text in elem.findall(prefix+"p")]
    if elem.tag == prefix+"p":
        if(title != []):
            deep[f"titile-{title_count}"] = title
        title = []
        title_count += 1
        text += [elem.text.replace("\xa0", " ")]
if(text != []):
    deep[f"text-{text_count}"] = text
print(json.dumps(deep))