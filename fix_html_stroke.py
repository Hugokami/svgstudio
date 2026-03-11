with open("svgviewer.html", "r", encoding="utf-8") as f:
    html = f.read()

# I want to add Stroke controls inside the Element Control Panel (ecp) right under "Stroke W"
stroke_controls = """
<div class="ecp-row" style="margin-top:4px;">
<span class="ecp-label" title="stroke-dasharray (e.g. 5,5)">Dash</span>
<input class="ecp-input" id="ecpStrokeDash" style="flex:1;" type="text" placeholder="e.g. 5,5"/>
<span class="ecp-label" style="margin-left:8px;" title="stroke-dashoffset">Offset</span>
<input class="ecp-input" id="ecpStrokeOffset" style="width: 50px;" type="number" placeholder="0"/>
</div>
<div class="ecp-row" style="margin-top:4px; margin-bottom: 8px;">
<span class="ecp-label">Linecap</span>
<select class="ecp-input" id="ecpStrokeLinecap" style="flex:1;">
<option value="butt">Butt</option>
<option value="round">Round</option>
<option value="square">Square</option>
</select>
<span class="ecp-label" style="margin-left:8px;">Join</span>
<select class="ecp-input" id="ecpStrokeLinejoin" style="flex:1;">
<option value="miter">Miter</option>
<option value="round">Round</option>
<option value="bevel">Bevel</option>
</select>
</div>
"""

insert_target = '<input class="ecp-input" id="ecpStrokeWidth" min="0" step="0.5" style="width:60px;" type="number" value="1"/>\n</div>'
if insert_target in html:
    html = html.replace(insert_target, insert_target + stroke_controls)
    with open("svgviewer.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("Stroke UI HTML injected successfully.")
else:
    print("Could not find insertion target.")
