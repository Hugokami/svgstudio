import re

with open('svgviewer.html', 'r') as f:
    content = f.read()

# We want to keep HEAD which has the extracted script <script src="js/app.js"></script>
# and discard origin/main's big inline script.

pattern = re.compile(r'<<<<<<< HEAD\n(.*?)\n=======\n.*?\n>>>>>>> origin/main\n', re.DOTALL)

def replace_conflict(match):
    return match.group(1) + '\n'

resolved_content = pattern.sub(replace_conflict, content)

with open('svgviewer.html', 'w') as f:
    f.write(resolved_content)
