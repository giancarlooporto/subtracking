import os
import re

base_dir = "/Users/giancarlooportousa/Documents/Antigravity/Digital Declutter/marketing_playbook"
index_path = os.path.join(base_dir, "PLAYBOOK_INDEX.md")

with open(index_path, "r", encoding="utf-8") as f:
    text = f.read()

# Extract table lines: | **XX** | `dir` | `file` | ...
rows = re.findall(r"\|\s*\*\*\d+\*\*\s*\|\s*`([^`]+)`\s*\|\s*`([^`]+)`", text)
print(f"Total deliverables listed in master table: {len(rows)}")

all_found = True
for mod_dir, filename in rows:
    # combine
    if mod_dir == "marketing_playbook/":
        full_path = os.path.join(base_dir, filename)
    else:
        full_path = os.path.join(base_dir, mod_dir, filename)
    
    exists = os.path.exists(full_path)
    if not exists:
        all_found = False
    print(f"[{'FOUND' if exists else 'MISSING'}] {mod_dir}{filename} ({full_path})")

print(f"\nAll deliverables exist: {all_found}")
