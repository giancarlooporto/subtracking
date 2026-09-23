import os
import glob
import re

matrix_dir = "/Users/giancarlooportousa/Documents/Antigravity/Digital Declutter/marketing_playbook/03_programmatic_seo_matrix"
competitors = ["mint_replacements.md", "bobby_app.md", "rocket_money_price_hike.md", "copilot_money.md", "excel_google_sheets.md"]
cancellations = ["planet_fitness.md", "new_york_times.md", "audible.md", "siriusxm.md", "adobe_creative_cloud.md"]

all_files = [(os.path.join(matrix_dir, "competitor_comparisons", c), "competitor") for c in competitors] + \
            [(os.path.join(matrix_dir, "cancellation_guides", c), "cancellation") for c in cancellations]

print(f"{'FILE':<26} | {'TITLE LEN':<10} | {'DESC LEN':<10} | {'KEYS':<6} | {'INTENT':<7} | {'OUTLINE':<8} | {'BRIDGE':<7}")
print("-" * 85)

all_passed = True
for p, category in all_files:
    fname = os.path.basename(p)
    with open(p, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Extract Meta Title inside backticks
    m_title = re.search(r"Meta Title.*?:[ \t]*`([^`]+)`", content)
    title_str = m_title.group(1).strip() if m_title else "NOT FOUND"
    title_len = len(title_str)
    
    # Extract Meta Description inside backticks
    m_desc = re.search(r"Meta Description.*?:[ \t]*`([^`]+)`", content)
    desc_str = m_desc.group(1).strip() if m_desc else "NOT FOUND"
    desc_len = len(desc_str)
    
    has_keywords = bool(re.search(r"Keyword", content, re.I))
    has_intent = bool(re.search(r"Search Intent", content, re.I))
    has_outline = bool(re.search(r"Outline|Page Architecture", content, re.I))
    has_bridge = bool(re.search(r"Bridge|Conversion", content, re.I))
    
    title_pass = title_len < 60 and title_len > 0
    desc_pass = desc_len < 155 and desc_len > 0
    
    if not (title_pass and desc_pass and has_keywords and has_intent and has_outline and has_bridge):
        all_passed = False
        
    t_status = f"{title_len} ({'OK' if title_pass else 'FAIL'})"
    d_status = f"{desc_len} ({'OK' if desc_pass else 'FAIL'})"
    
    print(f"{fname:<26} | {t_status:<10} | {d_status:<10} | {str(has_keywords):<6} | {str(has_intent):<7} | {str(has_outline):<8} | {str(has_bridge):<7}")

print("-" * 85)
print(f"Overall R3 Structural Compliance: {'ALL PASSED' if all_passed else 'FAILURES DETECTED'}")
