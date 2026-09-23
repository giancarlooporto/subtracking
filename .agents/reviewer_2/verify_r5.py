import os
import re

r5_dir = "/Users/giancarlooportousa/Documents/Antigravity/Digital Declutter/marketing_playbook/05_grassroots_launch_copy"
hn_path = os.path.join(r5_dir, "hacker_news_show_hn.md")
reddit_path = os.path.join(r5_dir, "reddit_community_playbooks.md")
twitter_path = os.path.join(r5_dir, "twitter_x_viral_thread.md")

print(f"hacker_news_show_hn.md exists: {os.path.exists(hn_path)}")
print(f"reddit_community_playbooks.md exists: {os.path.exists(reddit_path)}")
print(f"twitter_x_viral_thread.md exists: {os.path.exists(twitter_path)}")

# 1. Audit Hacker News
with open(hn_path, "r", encoding="utf-8") as f:
    hn_content = f.read()

# Check title variants
hn_titles = re.findall(r"(?:Variant \d+|Title \d+).*?`([^`]+)`", hn_content)
if not hn_titles:
    hn_titles = re.findall(r"Show HN:.*", hn_content)
print(f"\nHN Title Variants ({len(hn_titles)}):")
for t in hn_titles:
    print(f"  - {t}")

has_tech_arch = "Architecture" in hn_content or "Technical Stack" in hn_content or "Local-first" in hn_content
has_no_hype = "zero marketing hype" in hn_content.lower() or "anti-hype" in hn_content.lower() or "factual" in hn_content.lower()
print(f"HN Technical Architecture present: {has_tech_arch}")
print(f"HN Zero Hype / Factual Tone guidelines: {has_no_hype}")

# 2. Audit Reddit Playbooks
with open(reddit_path, "r", encoding="utf-8") as f:
    reddit_content = f.read()

subreddits = ["r/personalfinance", "r/privacy", "r/frugal"]
for sub in subreddits:
    sub_block_match = re.search(rf"(## (?:Playbook \d+: )?{re.escape(sub)}.*?(?=\n## |\Z))", reddit_content, re.S | re.I)
    if sub_block_match:
        block = sub_block_match.group(1)
        titles = re.findall(r"(?:Variant \d+|Title \d+).*?`([^`]+)`", block)
        has_antiban = "anti-ban" in block.lower() or "moderator" in block.lower() or "rule" in block.lower()
        has_ratio = "9:1" in block or "nine-to-one" in block.lower()
        has_copy = "body copy" in block.lower() or "complete post copy" in block.lower()
        print(f"\nReddit {sub}:")
        print(f"  Found {len(titles)} title variants: {titles}")
        print(f"  Anti-ban rules: {has_antiban}")
        print(f"  9:1 ratio mentioned: {has_ratio}")
        print(f"  Complete body copy: {has_copy}")
    else:
        print(f"\nReddit {sub}: NOT FOUND")

# 3. Audit Twitter/X Thread
with open(twitter_path, "r", encoding="utf-8") as f:
    twitter_content = f.read()

# Count tweets
tweet_matches = re.findall(r"(?m)^### Tweet (\d+)(?:/(\d+))?", twitter_content)
print(f"\nTwitter/X Thread:")
print(f"  Found {len(tweet_matches)} tweets: {[t[0] for t in tweet_matches]}")
has_hook = "hook" in twitter_content.lower()
has_math = "math" in twitter_content.lower() or "ghost" in twitter_content.lower()
has_cta = "cta" in twitter_content.lower() or "call to action" in twitter_content.lower()
print(f"  Has hook: {has_hook} | Has math: {has_math} | Has CTA: {has_cta}")
