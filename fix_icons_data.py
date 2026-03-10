import re
import os

file_path = r'c:\Users\lyan1\Documents\new web\svgviewer.html'

if not os.path.exists(file_path):
    print(f"Error: {file_path} not found")
    exit(1)

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find objects like:
# {
#     "icons": "...",
#     "code": "..."
# }
# And change them to:
# {
#     "name": "...",
#     "cat": "icons",
#     "code": "..."
# }

pattern = r'\{\s+"icons":\s+"([^"]+)",\s+"code":\s+"(<svg[^"]+)"\s+\}'

def replacement(match):
    name = match.group(1)
    code = match.group(2)
    return '{\n                "name": "' + name + '",\n                "cat": "icons",\n                "code": "' + code + '"\n            }'

new_content = re.sub(pattern, replacement, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Finished fixing asset data.")
