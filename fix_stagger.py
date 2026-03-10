import re

with open('svgviewer.html', 'r') as f:
    content = f.read()

# We need to replace all instances of `getWrapperGroup().classList.add('anim-...')`
# with a call to `applyClassToTargets('anim-...')`

# We also need to add the `applyClassToTargets` function inside `applyCustomAnimation`

apply_class_func = """
            function applyClassToTargets(cls, additionalSetup = null) {
                if (staggerTargets.length > 0) {
                    staggerTargets.forEach((el, idx) => {
                        if (additionalSetup) additionalSetup(el);
                        applyAnimationToElement(el, cls, idx, staggerTargets.length);
                    });
                } else {
                    const wrapper = getWrapperGroup();
                    if (additionalSetup) additionalSetup(wrapper);
                    applyAnimationToElement(wrapper, cls, 0, 1);
                }
            }
"""

# Insert applyClassToTargets before animProps
content = content.replace('const animProps =', apply_class_func + '\n            const animProps =')

# For the simple ones: getWrapperGroup().classList.add('CLASS'); -> applyClassToTargets('CLASS');
content = re.sub(r"getWrapperGroup\(\)\.classList\.add\('([^']+)'\);", r"applyClassToTargets('\1');", content)

# For ones that do more (like setting filter or mask on the wrapper):
# e.g.,
# const wrapper = getWrapperGroup();
# wrapper.setAttribute('filter', 'url(#animNeonFilter)');
# wrapper.classList.add('anim-neon-pulse');
# ->
# applyClassToTargets('anim-neon-pulse', (el) => el.setAttribute('filter', 'url(#animNeonFilter)'));

pattern_wrapper_attr_cls = re.compile(
    r"const wrapper = getWrapperGroup\(\);\s*(wrapper\.setAttribute\([^)]+\);\s*)+\s*wrapper\.classList\.add\('([^']+)'\);"
)

def replace_wrapper_attr_cls(match):
    attrs = re.findall(r"wrapper\.(setAttribute\([^)]+\));", match.group(0))
    cls = match.group(2)
    setup = "el => { " + " ".join([f"el.{attr};" for attr in attrs]) + " }"
    return f"applyClassToTargets('{cls}', {setup});"

content = pattern_wrapper_attr_cls.sub(replace_wrapper_attr_cls, content)

# Some use `getWrapperGroup().setAttribute('filter', ...)` directly
pattern_wrapper_attr = re.compile(
    r"getWrapperGroup\(\)\.(setAttribute\([^)]+\));"
)
def replace_wrapper_attr(match):
    attr = match.group(1)
    return f"applyClassToTargets('', el => el.{attr});"

content = pattern_wrapper_attr.sub(replace_wrapper_attr, content)

# And for the ones doing multiple setAttributes directly on `getWrapperGroup()`?
# e.g.
# const wrapper = getWrapperGroup();
# wrapper.setAttribute('mask', 'url(#cyberMask)');
# wrapper.setAttribute('fill', '#E5FF00');
pattern_wrapper_attr_only = re.compile(
    r"const wrapper = getWrapperGroup\(\);\s*(wrapper\.(setAttribute|classList\.add)\([^)]+\);\s*)+"
)

def replace_wrapper_attr_only(match):
    # This might match things we already processed or are slightly different.
    block = match.group(0)
    if "applyClassToTargets" in block: return block

    cls = ""
    attrs = []

    for line in block.split('\n'):
        if 'classList.add' in line:
            m = re.search(r"classList\.add\('([^']+)'\)", line)
            if m: cls = m.group(1)
        elif 'setAttribute' in line:
            m = re.search(r"(setAttribute\([^)]+\))", line)
            if m: attrs.append(f"el.{m.group(1)};")

    setup = "el => { " + " ".join(attrs) + " }" if attrs else "null"
    return f"applyClassToTargets('{cls}', {setup});"

content = pattern_wrapper_attr_only.sub(replace_wrapper_attr_only, content)


# Fix the stroke animations, they already loop over shapes:
# They do shape.classList.add('anim-draw');
# We can just change that to applyAnimationToElement(shape, 'anim-draw', idx, shapes.length);
pattern_stroke = re.compile(
    r"const shapes = svg\.querySelectorAll\([^)]+\);\s*shapes\.forEach\(shape => \{"
)
content = content.replace(
    "shapes.forEach(shape => {",
    "shapes.forEach((shape, idx) => {"
)
content = re.sub(
    r"shape\.classList\.add\('([^']+)'\);",
    r"applyAnimationToElement(shape, '\1', idx, shapes.length);",
    content
)


# Then finally, updateEditorFromPreview();
content = content.replace('const animProps =', 'const animProps =')

with open('svgviewer.html', 'w') as f:
    f.write(content)

print("Done")
