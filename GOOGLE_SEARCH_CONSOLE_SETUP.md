# Google Search Console Setup Guide

## 🎯 Purpose
Submit your site to Google Search Console so Google knows it exists and can start indexing your pages for search results.

---

## ✅ Step 1: Access Google Search Console

1. Go to: https://search.google.com/search-console
2. Sign in with your Google account (or create one if needed)

---

## ✅ Step 2: Add Your Property

1. Click **"Add Property"** button
2. Choose **"Domain"** property type (recommended)
3. Enter: `subtracking.app`
4. Click **Continue**

---

## ✅ Step 3: Verify Ownership

Google will show you several verification methods. Choose one:

### **Method A: DNS Verification (Recommended - Most Reliable)**

1. Google will provide a TXT record like: `google-site-verification=ABC123XYZ`
2. Log into your domain registrar (where you bought subtracking.app)
   - Namecheap, GoDaddy, Cloudflare, etc.
3. Find DNS settings
4. Add a new TXT record:
   - **Type**: TXT
   - **Name**: @ (or leave blank)
   - **Value**: The verification code Google gave you
5. Save the DNS record
6. Wait 5-10 minutes for DNS propagation
7. Go back to Google Search Console and click **"Verify"**

### **Method B: HTML File Upload (Easier if you have access to your repo)**

1. Google will provide a file like: `google123abc.html`
2. Download the file
3. Upload it to: `/public/google123abc.html` in your repo
4. Commit and push to GitHub
5. Wait for Vercel to deploy
6. Verify at: `https://subtracking.app/google123abc.html`
7. Go back to Google Search Console and click **"Verify"**

### **Method C: Meta Tag (Requires code change)**

1. Google will provide a meta tag like:
   ```html
   <meta name="google-site-verification" content="ABC123XYZ" />
   ```
2. Add this to your `layout.tsx` metadata:
   ```typescript
   verification: {
     google: 'ABC123XYZ',  // Just the code part
   },
   ```
3. Commit, push, and deploy
4. Click "Verify" in Google Search Console

---

## ✅ Step 4: Submit Your Sitemap

Once verified:

1. In Google Search Console sidebar, click **"Sitemaps"**
2. Enter: `sitemap.xml`
3. Click **"Submit"**

Google will show:
- Status: Success
- URLs discovered: 4 (homepage, dashboard, privacy, terms)

---

## ✅ Step 5: Request Indexing

Speed up the process:

1. Go to **"URL Inspection"** in the sidebar
2. Enter each URL to index:
   - `https://subtracking.app`
   - `https://subtracking.app/privacy-subscription-tracker`
   - `https://subtracking.app/no-bank-login`
   - `https://subtracking.app/vs-rocket-money`
   - `https://subtracking.app/blog/find-unused-subscriptions`
3. Click **"Request Indexing"** for each

Google will prioritize indexing these pages.

---

## 📊 What to Monitor (After 1-2 Weeks)

### **Performance Tab**
- **Impressions**: How many times your site appeared in search
- **Clicks**: How many people clicked through
- **Average Position**: Where you rank (lower is better)
- **Top Queries**: What keywords people used to find you

### **Coverage Tab**
- **Indexed Pages**: Pages Google successfully indexed
- **Errors**: Pages that failed to index (fix these!)

### **Search Results (Rich Snippets)**
Look for:
- Star ratings (from your aggregateRating schema)
- FAQ dropdowns (when you add FAQ schema)
- Price display (from your SoftwareApplication schema)

---

## 🎯 Expected Timeline

| Timeframe | What Happens |
|-----------|--------------|
| **Week 1** | Google discovers and crawls your site |
| **Week 2-3** | Pages start appearing in search (brand searches first) |
| **Month 1-2** | Long-tail keywords start ranking |
| **Month 3-6** | Medium-competition keywords rank |
| **Month 6+** | Traffic grows steadily, higher rankings |

---

## 🚨 Common Issues & Fixes

### "Site not verified"
- Wait 24 hours after DNS changes
- Check DNS propagation: https://dnschecker.org
- Try a different verification method

### "Sitemap couldn't be read"
- Make sure `https://subtracking.app/sitemap.xml` loads
- Check for XML syntax errors

### "Page not indexed"
- Wait 2-4 weeks (Google is slow)
- Check robots.txt isn't blocking it
- Request indexing manually

---

## 📝 Next Steps After Setup

1. **Week 1**: Submit sitemap, request indexing for key pages
2. **Week 2**: Check which pages are indexed
3. **Week 3**: Monitor first search queries
4. **Month 1**: Analyze top-performing keywords
5. **Month 2+**: Create more content targeting those keywords

---

## 🔗 Helpful Resources

- **Google Search Console**: https://search.google.com/search-console
- **Search Console Help**: https://support.google.com/webmasters
- **DNS Checker**: https://dnschecker.org
- **Rich Results Test**: https://search.google.com/test/rich-results

---

## ✅ Checklist

- [ ] Created Google Search Console account
- [ ] Added subtracking.app as property
- [ ] Verified ownership (DNS/HTML/Meta tag)
- [ ] Submitted sitemap.xml
- [ ] Requested indexing for key pages:
  - [ ] Homepage
  - [ ] /privacy-subscription-tracker
  - [ ] /no-bank-login
  - [ ] /vs-rocket-money
  - [ ] /blog/find-unused-subscriptions
- [ ] Set up email alerts for critical issues
- [ ] Bookmarked Search Console dashboard

---

**Note**: This is a one-time setup. After this, Google Search Console runs automatically and you just check it weekly to monitor performance.

Last Updated: 2026-01-19
