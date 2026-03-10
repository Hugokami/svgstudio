import re
import os

file_path = r'c:\Users\lyan1\Documents\new web\svgviewer.html'

if not os.path.exists(file_path):
    print(f"Error: {file_path} not found")
    exit(1)

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern 1: Replace "icons": "..." with "name": "...", "cat": "icons",
# Only for those that don't already have "cat": "icons"
# We'll use a regex that matches the start of the object property
# This version matches the exact structure we saw in the view_file output.
pattern = r'\"icons\":\s+\"([^"]+)\",\s+\"code\":'
replacement = r'"name": "\1",\n                "cat": "icons",\n                "code":'

new_content = re.sub(pattern, replacement, content)

# Also fix the opening brace if needed, though they seem fine.
# We'll just check if we made any changes.
if new_content == content:
    print("No matches found for 'icons' key in the expected format.")
else:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced asset keys and added 'cat' property.")
