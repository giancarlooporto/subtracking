# Short-Form Video Production & Algorithmic Distribution Guide

> **Target Platforms**: TikTok, Instagram Reels, YouTube Shorts  
> **Applicable Creative Assets**: `ghost_meter_scripts.md` and `audit_wizard_scripts.md`  
> **Core Objective**: Maximizing organic viewer retention (>85% completion), comment velocity, and bio-link click-through rate (CTR) to `https://www.subtracking.app` at zero paid ad spend.  
> **Pricing Invariant**: Free local vault (single profile, 100% offline, zero bank logins), optional $8.99/year Pro Pass for encrypted multi-device cloud sync. Absolutely no legacy pricing references.

---

## 1. Camera Framing, Visual Composition & Safe Zones

Short-form platforms overlay interactive buttons, usernames, audio titles, and search bars directly on top of videos. If key UI elements (like the Ghost Meter 10-year counter or Audit Wizard swipe card) fall underneath these native interface elements, viewers scroll away instantly.

### The 9:16 Vertical Safe Zone Blueprint (1080 x 1920 px)

```
+-------------------------------------------------------------+ 0px (Top)
|  [DANGER ZONE: 0 - 220px]                                   |
|  Search Bar, Following/For You tabs, Notch, System Status   |
+-------------------------------------------------------------+ 220px
|                                                             |
|  [PRIMARY HOOK & TITLE ZONE: 220 - 450px]                   |
|  High-contrast text overlays, problem statement, big stat   |
|                                                             |
|  [HERO ACTION ZONE: 450 - 1350px]             +-----------+ |
|  SubTracking Mobile Screen Recording,         | DANGER:   | |
|  Tinder Swipe Animations, Ghost Meter Counter | Right 140px|
|  Creator Face & Gestures                      | Like,     | |
|                                               | Comment,  | |
|                                               | Bookmark, | |
|                                               | Share     | |
|                                               +-----------+ |
+-------------------------------------------------------------+ 1350px
|  [DANGER ZONE: 1350 - 1920px (Bottom 30%)]                  |
|  Creator Username, Full Caption, Pinned Audio Bar,          |
|  Progress Scrubber, In-App Comment Drawer                   |
+-------------------------------------------------------------+ 1920px (Bottom)
```

### Visual Production Checklist
1. **Aspect Ratio & Resolution**: Strictly **9:16 vertical** (1080 x 1920 pixels, 30fps or 60fps). Avoid letterboxing or horizontal 16:9 framing with blur borders.
2. **Safe Margin Rules**:
   - **Top Margin**: Keep all captions and heads at least **220px below the top border**.
   - **Bottom Margin**: Keep all interactive buttons, cards, and critical UI at least **570px above the bottom border**.
   - **Right Margin**: Keep text and critical focal points at least **140px away from the right edge** to prevent collision with like/share icons.
3. **Lighting & Palette**:
   - **Key Light**: 45-degree angle softbox or diffused ring light at 5500K (daylight balanced).
   - **Rim / Background Accent**: Cool blue or purple LED backlighting to mirror SubTracking’s modern indigo/slate dark-mode palette (`#0F172A` and `#4F46E5`).
   - **Contrast**: Run SubTracking exclusively in **Dark Mode**; the crisp white text, emerald savings badges, and red Ghost Meter alert text provide maximum optical contrast on OLED mobile screens.
4. **Hardware Setup**:
   - Camera: iPhone 13 Pro or newer (or equivalent Android) using the 1x rear lens (4K at 60fps, downsampled to 1080p for ultra-sharp mobile rendering). Avoid wide 0.5x lens for screen capture to prevent fisheye distortion of ledger numbers.
   - Screen Recording: iOS native screen recorder with **Do Not Disturb** active and battery icon charged >80% to eliminate distraction cues.

---

## 2. Pacing Rules & The 0–3 Second Hook Engine

Short-form algorithms determine video distribution within the first **2.0 seconds**. If a viewer swipes before second 3, the video is classified as low-quality and suppressed.

### The 3 Golden Rules of Pacing

#### Rule 1: The "No Greeting" Law
- **Banned Openers**: *"Hey guys"*, *"Welcome back"*, *"Today I'm going to show you"*, *"I made an app"*, *"So basically..."*
- **Mandatory First Frame**: The first frame must already contain high-contrast movement, a shocking dollar amount, or an emotional accusation:
  - *"Netflix isn't $15. Look at this."*
  - *"Never give budgeting apps your bank password."*
  - *"This $4.99 app just stole an M3 MacBook from you."*
  - *"I just played Tinder with my subscriptions."*

#### Rule 2: The 1.8-Second Cut Frequency
- Never hold a static shot for longer than **1.8 to 2.2 seconds**.
- Maintain constant visual momentum using **Pattern Interrupts**:
  - Cut from Creator Face -> Screen Zoom -> Macro Finger Tap -> Counter Spin -> Creator Reaction.
  - Apply **Digital Zoom Punches** (1.15x punch-in on key words like *"thirty-three hundred dollars"* or *"Ghost Cost"*).

#### Rule 3: Elimination of Dead Air & Breath Removal
- In your video editor (CapCut, Premiere Pro, or DaVinci Resolve), truncate all pauses between sentences to **<0.05 seconds**.
- Each sentence should overlap the tail end of the preceding sentence's decay. The voiceover should feel energetic, urgent, and conversational.

---

## 3. Audio Selection, Sound Design & Voiceover Mixing

Sound represents 50% of the emotional impact in viral short-form video. The soundscape must combine clear spoken voiceover, tactical foley sound effects (SFX), and subtle background music.

### Sound Hierarchy & Decibel Balancing

```
[Voiceover / Spoken Word]:      -3 dB to -1 dB   (Crisp, center channel, compressed)
[Foley SFX (Cash, Swipes, Pops)]: -6 dB to -4 dB   (Punchy, synchronized to exact visual frame)
[Background Music / Phonk]:     -22 dB to -18 dB (Ducked under speech, never competing with vocals)
```

### Essential Sound Design Library for SubTracking Videos

| Sound Event | Recommended SFX File / Profile | Timing & Execution |
|:---|:---|:---|
| **Negative Shock / Danger** | Deep 808 Sub-Bass Drop + Vinyl Record Scratch | Trigger exactly on the 0:00 hook frame when introducing the high cost. |
| **Card Swipe Left (Toss)** | Snappy Air Whoosh + Comic 'Pop' | Sync to the exact frame the subscription card exits screen left. |
| **Card Swipe Right (Keep)** | Subtle Wooden Click + Soft Bell Ding | Sync to card exit screen right; gives psychological confirmation. |
| **Ghost Meter Counter Spin**| Mechanical Typewriter Chatter / Fast Ratchet Ticks | Runs continuously for 0.8s while the 10-year dollar counter spins upward. |
| **Shock Number Lock** | Heavy Anvil Hit + Cash Register Ring (`Cha-Ching`) | Fires the millisecond the counter locks on `$3,297` or `$50,160`. |
| **Audit Celebration** | Party Popper (`Pop-Cheer`) + High-Frequency Chime | Trigger on completion modal reveal when total savings are calculated. |

### Background Music Strategy
- **Trending Audio Pairing**: On TikTok and Instagram Reels, always select a trending background sound directly inside the platform's audio library, but dial its platform volume down to **3% to 6%** while keeping your original edited audio at **100%**. This attaches your video to the trending audio's algorithmic distribution cluster without drowning out your spoken hook.
- **Audio Mood Archetypes**:
  - *For Ghost Meter Videos*: Low-tempo dark phonk or cinematic suspense drone that drops into a driving beat.
  - *For Audit Wizard Videos*: Mellow chillhop, lo-fi aesthetic jazz, or crisp tech-house (115–122 BPM).

---

## 4. Algorithmic Optimization: TikTok, Reels & Shorts

Each short-form platform employs distinct algorithmic signals, but all prioritize **Completion Rate**, **Average Percentage Viewed (APV)**, and **Re-watches**.

### Algorithmic Performance Benchmarks

| Metric | Minimum Target | Viral Breakout Threshold | Algorithmic Consequence |
|:---|:---|:---|:---|
| **Average Percentage Viewed (APV)** | >75% | >95% (or >110% with re-loops) | Pushes video to 100k+ broad audience feeds. |
| **3-Second Retention** | >60% | >75% | Passes the initial 200-viewer test pool. |
| **Rewatch / Loop Rate** | >12% | >25% | Triggers explosive viral distribution. |
| **Saves / Bookmarks** | 1 per 100 views | 3+ per 100 views | Signal of evergreen utility; extends video lifespan by weeks. |
| **Comments** | 1 per 200 views | 1 per 50 views | Elevates video in search ranking and For You tabs. |

### The "Infinite Loop" Secret
Design the video so the ending audio and visual transition seamlessly back into the opening hook:
- *Ending Line*: "...which is why the first thing you need to realize is that—"
- *Opening Hook*: "—Netflix isn't $15 a month!"
- When a viewer fails to notice the video ended and watches 3 seconds of the loop, your **Average Percentage Viewed surpasses 100%**, signaling to the algorithm that the content is extraordinarily captivating.

### Search-Optimized Captions & Hashtags (TikTok/Reels SEO)
Platforms now function as search engines for Gen Z. Captions must embed explicit search keywords:

- **Caption Template**:
  > *"Calculating how much your streaming subscriptions actually cost over 10 years with the Ghost Meter 💀 It turns out a $15/mo subscription is over $1,800 in cash. Tested this on SubTracking (it’s an offline-first tracker with zero bank logins). Link in bio to run your own audit free. #personalfinance #subscriptiontracker #ghostmeter #budgetingapps #nobanklogin #savingmoney"*
- **Hashtag Matrix (Exact 5-6 tags)**:
  - 2 High-Volume Category Tags: `#personalfinance`, `#moneytok` (or `#productivity`)
  - 2 Niche Problem Tags: `#subscriptiontracker`, `#nobanklogin`
  - 2 Feature / Brand Tags: `#ghostmeter`, `#subtracking`

---

## 5. Posting Cadence & A/B Hook Testing Framework

Consistent posting velocity feeds platform recommendation engines with audience affinity data.

### The 14-Day Launch Sprint Cadence
- **Frequency**: **2 videos per day** for the first 14 days (28 total assets).
- **Posting Windows (Targeting US Viewers)**:
  - *Slot 1 (Morning Commute / Coffee)*: **7:30 AM – 9:00 AM EST**
  - *Slot 2 (Evening Wind-Down)*: **6:30 PM – 8:30 PM EST**
  - *Sunday Special*: **11:00 AM – 1:00 PM EST** (Prime window for "Sunday Reset" Audit Wizard videos).

### The 3-Hook Multiplier System (A/B Testing)
Every high-performing core video should be recorded with **3 distinct opening hooks** while keeping the middle demonstration and ending CTA identical:

```
Core Body: [Screen capture of SubTracking Audit Wizard swiping 3 subs, saving $84/mo]
  ├── Variant A (Curiosity Hook): "I just played Tinder with my monthly bills..."
  ├── Variant B (Negative Hook):   "Stop paying $12/month for budgeting apps to track your bills..."
  └── Variant C (Question Hook):   "When was the last time you checked your Apple ID subscriptions?"
```

- Post all 3 variants spaced **48 hours apart**.
- Compare 3-second retention rates in analytics. The winning hook format becomes the template for subsequent video batches.

---

## 6. The "Comment-to-Bio" Conversion Funnel

Views without link visits generate zero growth. To funnel viewers from a short-form video into active users on `https://www.subtracking.app`:

### Step 1: The Pinned Comment Spark
Immediately upon publishing, pin a comment containing a provocative prompt that encourages peer calculation:
> *"Drop your monthly subscription total below and I’ll reply with your 10-year Ghost Cost 👻 (Or test it yourself for free at the link in bio—zero bank logins required)."*

### Step 2: Video Reply Hijacking
When a viewer comments with their monthly spend (e.g., *"Mine is $145 a month"*):
1. Record a quick **10-second video reply** directly on TikTok/Reels.
2. Type "$145" into SubTracking’s Ghost Meter on camera.
3. Show the result: **$17,400 Lost Wealth**.
4. Say: *"Replying to @user: Over 10 years you are burning seventeen thousand four hundred dollars. Run the Audit Wizard to cut at least $40 of that today."*
5. This creates a high-converting content feedback loop where user comments generate the next viral videos.

### Step 3: Bio Link Optimization
- Keep the bio link pristine, direct, and non-cluttered:
  - *Bio Copy*:  
    > *"Find your 10-year subscription Ghost Cost 👻  
    > 100% private. No bank logins. Free web app ⬇️  
    > subtracking.app"*
- Direct linking to `https://www.subtracking.app` outperforms third-party link-in-bio trees (Linktree/Beacons) by **35% higher direct activation**, as users land directly in the interactive web demo without intermediary clicks.
- Reinforce that SubTracking has a **100% Free local vault** (no account or credit card required), with an optional **$8.99/year Pro Pass** for multi-device encrypted cloud sync.
