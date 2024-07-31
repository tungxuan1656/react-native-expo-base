import os

f_icons = list(filter(lambda i: i.find('-') == -1 and i.find('.DS_Store') == -1, os.listdir('./icons')))
p_icons = []

a = list(filter(lambda x: x.endswith('.png'), f_icons))
b = set(map(lambda x: x.replace('@2x', '').replace('@3x', ''), a))

icons = list(map(lambda x: f'{x.replace(".png", "")}: require("./icons/{x}")', b))
icons.sort()
print(icons)

out = ',\n\t'.join(icons)
out = "export const AppIcons = {\n\t" + out + "\n}"
with open('AppIcons.ts', 'w') as file:
    file.write(out)
