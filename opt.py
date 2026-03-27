import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add loading lazy to all images that don't already have it
html = re.sub(r'<img (?![^>]*loading=)', r'<img loading="lazy" ', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
