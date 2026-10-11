# বাজার দর (Bazar Dor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম দেখানোর একটি ওয়েবসাইট। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার দাম এক জায়গা থেকে দেখা যায়, এবং কোন পণ্যের দাম বেড়েছে বা কমেছে সেটাও বোঝা যায়।

## প্রযুক্তি

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS ও DaisyUI
- Better Auth — ইমেইল/পাসওয়ার্ড, Google, GitHub, এবং `@better-auth/infra` dash plugin
- react-hot-toast

## মূল ফিচার

1. হোমপেজে আজ দাম বেড়েছে, দাম কমেছে, এবং সব পণ্যের কার্ড।
2. ক্যাটাগরি অনুযায়ী ফিল্টার, এবং দামের সংখ্যা অনুযায়ী সর্ট।
3. লগইন করা ব্যবহারকারীর জন্য পণ্যের বিস্তারিত ও বাজারভিত্তিক দাম।
4. সাইন ইন, সাইন আপ, সোশ্যাল লগইন, টোস্ট, এবং প্রোটেক্টেড রুট।
5. আমার প্রোফাইল থেকে নাম আপডেট।
6. মোবাইল, ট্যাবলেট ও ডেস্কটপে রেসপন্সিভ লেআউট।

## চালু করার নিয়ম

```bash
npm install
cp .env.example .env.local
npm run dev
```

`.env.local`-এ এই মানগুলো দিন:

- `BETTER_AUTH_SECRET` — কমপক্ষে ৩২ অক্ষরের সিক্রেট
- `BETTER_AUTH_URL` — লোকালে `http://localhost:3000`, ডিপ্লয়ে `https://ecom.eklas.tech`
- `BETTER_AUTH_API_KEY` — Better Auth ড্যাশবোর্ডের API key
- `GOOGLE_CLIENT_ID` ও `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID` ও `GITHUB_CLIENT_SECRET`

সোশ্যাল লগইনের রিডাইরেক্ট URL: `{BETTER_AUTH_URL}/api/auth/callback/google` এবং `{BETTER_AUTH_URL}/api/auth/callback/github`।

## Cloudflare Workers

Next.js অ্যাপটি Cloudflare Workers-এ চলে, আর স্ট্যাটিক পেজগুলো Worker-এর asset হিসেবে সার্ভ হয়। Auth ডেটা Cloudflare D1-এ থাকে। `ecom.eklas.tech` এই Worker-এর custom domain।

```bash
npx wrangler login
npx wrangler d1 create bazar-dor
```

`wrangler.jsonc`-এর `database_id` ফিল্ডে তৈরি হওয়া id বসান। তারপর:

```bash
npx wrangler d1 migrations apply bazar-dor --local
npx wrangler d1 migrations apply bazar-dor --remote
npx wrangler secret put BETTER_AUTH_SECRET
npx wrangler secret put BETTER_AUTH_API_KEY
npm run deploy
```

লোকাল প্রিভিউ: `npm run preview`। সাধারণ ডেভেলপমেন্ট: `npm run dev` (`.dev.vars` থেকে লোকাল D1 ও সিক্রেট নেয়)।
