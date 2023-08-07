import xml.etree.ElementTree as EL

tree = EL.parse('Aristotel_Politika.fb2')
root = tree.getroot()
prefix = root.tag[:root.tag.find("}")+1] 
desc = root.find(prefix+"description").find(prefix+"title-info")
author = desc.find(prefix+"author")
ann = desc.find(prefix+"annotation")
body = root.find(prefix+"body")
deep = body.findall(prefix+"title")+body.findall(prefix+"section")
print(len(body.findall(prefix+"title")), len(body.findall(prefix+"section")))
checker = False
for i in deep:
    if i.find(prefix+"section") != None:
        checker = True
while checker:
    deep_new = []
    for i in range(len(deep)):
        if deep[i].find(prefix+"section") != None:
            deep_new += deep[i].findall(prefix+"title")+deep[i].findall(prefix+"section")
        else:
            deep_new += deep[i]
    deep = deep_new
    checker = False
    for i in deep:
        if i.find(prefix+"section") != None:
            checker = True
deep_new = []
for i in range(len(deep)):
    if deep[i].find(prefix+"p") != None:
        deep_new += deep[i].findall(prefix+"p")
    else:
        deep_new += deep[i]
deep = deep_new
for i in range(len(deep)):
    deep[i] = deep[i].text
    deep[i] = deep[i].replace("\xa0", " ")
# for phrase in deep:
#     print(phrase)