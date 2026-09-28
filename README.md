# 11 Plus Hero

Theme: a pop-star world tour with Violet the butterfly (purple, glitter,
guitars). Each nightly show has a half-time game (penalty shootout, Beat the
clock, Catch the notes, taking turns), combo bonuses for runs of right
answers, and an encore penalty shootout after the show.

A bedtime maths and English practice app for a Year 3 child working towards
the Trafford grammar school test (curriculum-based English and maths from
September 2027). It is a web app that installs on an iPhone home screen and
works offline.

## How it works

- **Missions**: 10 questions a night (5, 10 or 15 in settings): 5 maths, 3
  reading questions on one short passage, 2 spelling, vocabulary or grammar.
- **Adaptive difficulty**: every topic has its own level, from 1 (Year 3) to
  8 (Year 6). Right first time moves it up, wrong twice moves it down. About
  one question in five is a stretch question from the level above.
- **Two tries**: a wrong first answer shows a hint; right first time earns 10
  stars, right second time 5.
- **Levels and rewards**: stars fill a level bar. Level 2 unlocks the
  times-table penalty shootout; later levels open new stages (topics) and
  outfits for Violet. There are 22 stickers to collect.
- **Grown-ups area** (behind a PIN): progress by topic, a weekly summary,
  settings (mission length, bedtime, extra missions, starting year), a
  question checker for reviewing and flagging questions, backup codes and
  "Start again from the beginning" (keeps settings, PIN and flags).

Everything is stored on the phone (localStorage). Nothing is sent anywhere.

## Topics

| Stage | Topics | Unlocks at level |
|---|---|---|
| Number Arena | Times tables, adding and taking away, word problems | 1 |
| | Place value | 2 |
| | Number patterns | 5 |
| Story Studio | Reading (34 original passages, 3 questions each) | 1 |
| Spelling Stage | Spelling (national curriculum word lists) | 1 |
| | Word meanings | 3 |
| Grammar Garage | Grammar and punctuation | 4 |
| Fraction Festival | Fractions and percentages | 6 |
| Rhythm Room | Time, money and measures | 8 |
| Shape Spotlight | Shape and angles | 10 |

## Files

- `index.html`, `css/app.css`, `js/main.js`: the screens.
- `js/engine.js`: levels, rewards, difficulty, missions, badges.
- `js/state.js`: saving, reset, backup codes.
- `js/content/`: the questions (maths generators, spelling lists, grammar,
  vocabulary, reading passages).
- `sw.js`, `manifest.webmanifest`, `icons/`: offline and home-screen install.
  Bump `VERSION` in `sw.js` after changing any file.
- `fonts/`: Fredoka and Nunito (SIL Open Font License).

## Running and testing

No build step. Serve the folder with any static server:

```sh
python3 -m http.server 4321    # then open http://localhost:4321
npm test                       # content and engine tests (Node 20+)
```

## Hosting

Any static host works. On Netlify: "Add new site", import this repository,
leave the build command empty and set the publish directory to `.`.

## Installing on an iPhone

Open the site in **Safari**, tap the Share button, then **Add to Home
Screen**. It then opens full screen like an app and works offline. Progress
belongs to that phone (and the home-screen app keeps its own progress,
separate from Safari).
