import os
import re

twitter_path = "/Users/giancarlooportousa/Documents/Antigravity/Digital Declutter/marketing_playbook/05_grassroots_launch_copy/twitter_x_viral_thread.md"

with open(twitter_path, "r", encoding="utf-8") as f:
    text = f.read()

tweets = re.findall(r"### Tweet \d+.*?\n```text\n(.*?)\n```", text, re.S)
print(f"Total extracted tweets: {len(tweets)}")
all_pass = True
for i, tw in enumerate(tweets, start=1):
    tw_clean = tw.strip()
    char_len = len(tw_clean)
    status = "PASS (<=280)" if char_len <= 280 else "EXCEEDS 280 (needs X Premium or thread split)"
    print(f"Tweet {i}: {char_len} chars -> {status}")
    if char_len > 280:
        all_pass = False

print(f"All tweets <= 280 standard limit: {all_pass}")
