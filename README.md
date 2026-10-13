# Pranshu & Nishtha — Engagement Invitation

A 3-page web invite in the same design family as the wedding invite (Playfair Display /
EB Garamond / Prata / Great Vibes, gold-filigree tiles, damask envelope, poured wax seal,
side borders, rose-petal shower, background music with a subtle mute button) in a
daylight palette — ivory & champagne gold with deep rose.

**Opening:** damask envelope → tap → seal bursts, flap opens, letter rises → burgundy velvet
curtains fall shut, then part, gather and roll up to reveal the invite.

**Pages:** 1 Cover (carved ivory-and-gold arch, chandeliers, roses — drawn in code) ·
2 Details (host line, date/time/venue, dress code, directions, add-to-calendar, countdown) ·
3 RSVP (Priya & Gaurav) and closing.

## Edit content
Everything lives in `src/data/config.ts` — names, date, time, venue, Maps link, dress code,
host line, RSVP contacts, music, link-preview text.

## Run / preview
```bash
npm install
npm run dev      # live preview
npm run build    # production build into dist/
```
Or double-click **Preview Invitation.command** (serves `dist/` on localhost).

## Deploy (GitHub Pages)
Same as the wedding invite: push to a public repo, Settings → Pages → Source: GitHub Actions.
