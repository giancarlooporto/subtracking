import os
import re

scripts_dir = "/Users/giancarlooportousa/Documents/Antigravity/Digital Declutter/marketing_playbook/04_viral_video_scripts"
ghost_path = os.path.join(scripts_dir, "ghost_meter_scripts.md")
audit_path = os.path.join(scripts_dir, "audit_wizard_scripts.md")
prod_path = os.path.join(scripts_dir, "production_and_distribution_guide.md")

print(f"ghost_meter_scripts.md exists: {os.path.exists(ghost_path)}")
print(f"audit_wizard_scripts.md exists: {os.path.exists(audit_path)}")
print(f"production_and_distribution_guide.md exists: {os.path.exists(prod_path)}")

def audit_file(filepath, expected_prefix):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Find scripts by Header (e.g. ## Script 1:, Script 2:, etc.)
    script_blocks = re.split(r"(?m)^## Script \d+:", content)
    header = script_blocks[0]
    scripts = script_blocks[1:]
    
    print(f"\nAuditing {os.path.basename(filepath)}: found {len(scripts)} scripts.")
    
    for idx, s in enumerate(scripts, start=1):
        lines = s.strip().split("\n")
        title = lines[0].strip()
        
        # Target duration
        dur_match = re.search(r"Target Duration.*?(\d+)\s*(?:seconds|s|-|\s*to\s*|\s*–\s*)*(\d*)\s*(?:seconds|s)?", s, re.I)
        dur_str = dur_match.group(0) if dur_match else "UNKNOWN DURATION"
        
        # Check second-by-second table
        has_table = "| **Timestamp** | **Visual Action & Camera Cue** | **On-Screen Text Overlay** | **Spoken Voiceover Script** | **Audio / Sound Effect Cue** |" in s or \
                    "| **Timestamp** |" in s
        
        # Check timestamps
        # Extract all timestamps like 0:00 – 0:04 or 0:00 - 0:03
        timestamps = re.findall(r"(\d+:\d+)\s*(?:–|-)\s*(\d+:\d+)", s)
        start_time = timestamps[0][0] if timestamps else "None"
        end_time = timestamps[-1][1] if timestamps else "None"
        
        # Calculate total seconds from end_time
        if end_time != "None":
            m, sec = end_time.split(":")
            total_seconds = int(m) * 60 + int(sec)
        else:
            total_seconds = -1
            
        dur_pass = 15 <= total_seconds <= 45
        
        # Check for required elements
        has_visual = "Visual" in s
        has_text_overlay = "Text Overlay" in s or "On-Screen Text" in s
        has_voiceover = "Voiceover" in s
        has_sound = "Sound" in s or "Audio" in s
        has_pinned = "Pinned Comment" in s or "CTA" in s
        
        print(f"\n  Script {idx}: {title}")
        print(f"    Stated Duration: {dur_str.strip()}")
        print(f"    Timestamp Range: {start_time} to {end_time} -> {total_seconds} seconds total")
        print(f"    Duration valid (15 <= s <= 45): {dur_pass}")
        print(f"    Breakdown Table: {has_table}")
        print(f"    Elements: Visual={has_visual}, Overlay={has_text_overlay}, Voiceover={has_voiceover}, Sound={has_sound}, PinnedCTA={has_pinned}")

audit_file(ghost_path, "Ghost Meter")
audit_file(audit_path, "Audit Wizard")
