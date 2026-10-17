# Phase Tracker — Game File Guide

Phase Tracker turns a single `.json` file into a round-by-round phase guide for any board game. Drop the file onto the page (or tap to choose it, or paste the JSON) and you're playing.

This guide covers everything a game file can do.

---

## Quick start

The smallest file that works:

```json
{
  "title": "My Game",
  "phases": [
    { "title": "Draw", "content": ["Each player draws 2 cards."] },
    { "title": "Play", "content": ["Take turns playing cards."] }
  ]
}
```

That gives you a tracker with two phases and endless rounds. Everything else below is optional.

A fuller starting point lives in `examples/template.json`, and the **Chinatown** and **Robinson Crusoe** examples show most features in real use.

---

## Using the tracker

| Control | What it does |
|---|---|
| **Next → / ← Previous** | Step through phases. After the last phase, the round goes up by 1. |
| **Phase strip** (the coloured bar on the card) | One segment per phase. Tap a segment to jump straight to that phase. |
| **Undo / Redo** (top-left arrows) | Step back and forward through your moves. |
| **Swipe** left / right on the card | Next / previous (phones). |
| **Keyboard** | `→` next, `←` previous, `Ctrl+Z` undo, `Ctrl+Shift+Z` or `Ctrl+Y` redo, `Esc` closes this guide. |
| 🔊 | Turn the sound effects on or off. |
| **Reset** | Ends the game and goes back to its setup screen. |
| 🏠 **Games** | Back to your list of games. Progress is kept. |

**Saving:** games you load and your progress are saved in this browser, so you can close the page and resume later. Nothing is uploaded anywhere. Clearing your browser data, or using a different device or browser, starts fresh. Loading a file with the same `id` (or title) replaces the old version but keeps your progress.

---

## File structure

```json
{
  "schema": 1,
  "id": "my-game",
  "title": "My Game",
  "subtitle": "Phase Tracker",
  "icon": "🎲",
  "theme": { ... },
  "settings": [ ... ],
  "rounds": { ... },
  "startLabel": "Start",
  "endLabel": "Game Over",
  "resetConfirm": "End the current game?",
  "showPhaseNumbers": true,
  "assetBase": "https://example.com/images/",
  "icons": { ... },
  "tables": { ... },
  "setup": [ ... ],
  "phases": [ ... ]
}
```

| Field | Required | What it does |
|---|---|---|
| `title` | ✅ | Game name, shown on the setup screen, nav bar and game list. |
| `phases` | ✅ | The list of phases in a round. See [Phases](#phases). |
| `schema` | | File format version. Use `1`. |
| `id` | | Unique id for saving. Defaults to the title (e.g. `"My Game"` → `my-game`). Two files with the same id replace each other. |
| `subtitle` | | Smaller line under the title. |
| `description` | | Shown under the title if there's no subtitle. |
| `icon` | | Icon for the game list. Any [icon value](#icons). |
| `theme` | | Colours. See [Theme](#theme). |
| `settings` | | Options picked before the game starts (players, rounds…). See [Settings](#settings). |
| `rounds` | | How rounds are counted and labelled. See [Rounds](#rounds). |
| `startLabel` | | Text on the start button. Default `Start`. |
| `endLabel` | | Text on the Next button when the game is over. Default `Game over`. Emojis welcome. |
| `resetConfirm` | | The question asked when Reset is tapped. |
| `showPhaseNumbers` | | `false` hides the big grey phase number. |
| `assetBase` | | A web address put in front of short image file names. See [Icons](#icons). |
| `icons` | | Named icons you can reuse. See [Icons](#icons). |
| `tables` | | Numbers that change by player count and/or round. See [Tables](#tables). |
| `setup` | | Content blocks shown on the setup screen (e.g. setup steps). Same format as phase content. |

---

## Theme

Every colour accepts any CSS colour: `"#b91c1c"`, `"rgb(185 28 28)"`, `"crimson"`.

```json
"theme": {
  "background": "#fef2f2",
  "header": "#7f1d1d",
  "accent": "#facc15",
  "button": "#b91c1c",
  "buttonText": "#facc15"
}
```

| Key | Colours | Default |
|---|---|---|
| `background` | Page background | `#f5f5f4` (light stone) |
| `header` | Nav bar and the round tracker panel. Use a dark colour. | `#1c1917` |
| `accent` | Round number, round dots and tracker labels. Use a bright colour. | `#fbbf24` (amber) |
| `button` | Next and Start buttons, focus outlines | `#1c1917` |
| `buttonText` | Text on those buttons | `#ffffff` |

> Tip: [Tailwind's colour palette](https://tailwindcss.com/docs/colors) is a handy source of hex codes that work well together.

---

## Settings

Settings are chosen on the setup screen before the game starts. Each one becomes a **variable** you can use in text, tables and conditions.

```json
"settings": [
  { "id": "players", "label": "Number of Players", "type": "select", "options": [3, 4, 5], "default": 4, "suffix": "Players" },
  { "id": "days", "label": "Total Days", "type": "number", "min": 1, "max": 99, "default": 12, "help": "See your scenario sheet." },
  { "id": "expansion", "label": "Use the expansion", "type": "toggle", "default": false }
]
```

| Field | What it does |
|---|---|
| `id` | **Required.** One word (letters, numbers, `_`). This is the variable name, e.g. `{{players}}`. |
| `label` | Label shown above the field. |
| `type` | `select` (dropdown, the default), `number` (number box) or `toggle` (checkbox → `true`/`false`). |
| `options` | *select only.* A list of values, e.g. `[3, 4, 5]`, or objects with their own labels: `[{ "value": "easy", "label": "Easy mode" }]`. |
| `suffix` | *select only.* Added after plain option values in the dropdown: `3` → `3 Players`. |
| `default` | Starting value. |
| `min`, `max` | *number only.* Limits. |
| `help` | Small grey hint under the field. |

The tracker remembers the last settings you used for each game.

Reserved names you can't use as an `id`: `round`, `roundLimit`, `roundsLeft`, `phase`, `phaseCount`, `phaseTitle`, `isFirstRound`, `isLastRound`.

---

## Rounds

```json
"rounds": {
  "label": "Day",
  "short": "Day",
  "setting": "days",
  "trackerTitle": "Survival Track",
  "trackerSubtitle": "Max {{roundLimit}} days",
  "showLimit": false,
  "showDots": true
}
```

| Field | What it does | Default |
|---|---|---|
| `label` | What a round is called (Round, Day, Year, Turn…). Used on the Resume button and game list. | `Round` |
| `short` | Short label next to the big number in the tracker, e.g. `Rnd`. | same as `label` |
| `setting` | Id of the setting that holds the number of rounds. | — |
| `limit` | A fixed number of rounds, if it's not a setting. | — |
| `trackerTitle` | Small coloured heading in the tracker badge. Can use variables. | "*label* track" |
| `trackerSubtitle` | Grey line under it. Can use variables, e.g. `"{{players}} players"`. | `of {{roundLimit}}` |
| `showLimit` | `true` shows `/6` after the round number. | `false` |
| `showDots` | `false` hides the row of round dots. | `true` |

If there's no `setting` and no `limit`, rounds go on forever: no dots, and the game never ends.

When the last phase of the last round is reached, the Next button changes to your `endLabel` and stops.

---

## Phases

Each phase is one screen. They're shown in order, every round.

```json
{
  "id": "income",
  "title": "Earn Income",
  "color": "#2563eb",
  "icon": "cash",
  "number": "IV",
  "showIf": { "round": { "min": 2 } },
  "content": [ ... ]
}
```

| Field | What it does |
|---|---|
| `title` | **Required.** Phase name. Can use variables. |
| `color` | Colour of the phase's strip segment, icon, callouts and highlights. |
| `icon` | Shown next to the title. Any [icon value](#icons). |
| `number` | Replaces the automatic phase number (1, 2, 3…). Handy for `"IV"` or `"2a"`. |
| `showIf` | Skip this phase on rounds where the [condition](#conditions-showif) is false. Next and Previous jump straight over it, and its strip segment fades out. |
| `content` | A list of [content blocks](#content-blocks). |
| `id` | Optional name for your own reference. |

---

## Content blocks

`content` is a list. Each item is either **plain text** (a string) or a **block object** with a `type`.

```json
"content": [
  "Plain text becomes a paragraph.",
  { "type": "callout", "title": "Draw {{cardsDraw}} cards", "text": "keep {{cardsKeep}}" },
  { "type": "list", "items": ["One", "Two"] }
]
```

Every block can also have `"showIf"` (only show it when a [condition](#conditions-showif) is true), and most accept `"color"` to override the phase colour.

### text
A paragraph. A plain string is the same thing.
```json
{ "type": "text", "text": "Take wood and food from your camp tile." }
```

### heading
A small bold sub-heading inside a phase.
```json
{ "type": "heading", "text": "Clean-up" }
```

### list
Bullets, or numbers with `"ordered": true`. Items can be strings or objects with their own nested `items` (shown smaller and grey) and their own `showIf`.
```json
{
  "type": "list",
  "ordered": true,
  "items": [
    {
      "text": "Draw an Event card.",
      "items": ["If it wasn't an Event card, draw another.", "Resolve any book icon."]
    },
    "Resolve the event text.",
    { "text": "Gain 1 bonus food.", "showIf": { "expansion": true } }
  ]
}
```

### callout
A big centred box in the phase colour — best for the one number players need right now.
```json
{ "type": "callout", "title": "Draw {{tilesDraw}} shop tiles", "text": "keep them face up" }
```
`title` is the big line, `text` the smaller line under it. Either can be left out.

### highlight
Bold text with a coloured bar down the left side.
```json
{ "type": "highlight", "text": "Everything is negotiable!" }
```

### note
Small grey italic text for reminders.
```json
{ "type": "note", "text": "Trading ends when all players agree to stop." }
```

### tip
Text in a soft grey box.
```json
{ "type": "tip", "text": "Strategy: keep one tile back for next round." }
```

### warning
Red text in a red box for penalties and things people forget.
```json
{ "type": "warning", "text": "Take 1 {{icon:wound}} Wound per missing token." }
```

### table
A scrollable table. Cells use the same [text formatting](#text-formatting). A cell that's empty or just `-` shows as a faint dash.
```json
{
  "type": "table",
  "headers": ["Tiles", "1", "2", "3"],
  "rows": [
    ["**Photo**", "$10,000", "$20,000", "**$50,000**"],
    ["**Florist**", "$10,000", "$20,000", "$40,000"]
  ],
  "align": ["left", "center"],
  "highlightRow": "{{round}}",
  "caption": "Income is paid for each business."
}
```
| Field | What it does |
|---|---|
| `headers` | Optional header row. |
| `rows` | **Required.** A list of rows; each row is a list of cells. |
| `align` | Per-column alignment: `left`, `center` or `right`. Columns not listed are centred. |
| `highlightRow` | Row number (starting at 1) to tint in the phase colour. `"{{round}}"` highlights the current round's row. |
| `caption` | Small note under the table. |

### image
```json
{ "type": "image", "src": "board-setup.png", "alt": "Board setup", "caption": "Starting layout", "width": 240 }
```
`src` is a web address or a file name (see [Icons](#icons) for how file names are found). `width` is in pixels and optional.

### divider
A thin line.
```json
{ "type": "divider" }
```

### group
Wraps several blocks so one `showIf` controls them all.
```json
{
  "type": "group",
  "showIf": { "players": 2 },
  "blocks": [
    { "type": "heading", "text": "Two-player rules" },
    "The dummy player takes a tile too."
  ]
}
```

---

## Text formatting

Anywhere you write text — phase titles, paragraphs, list items, table cells, callouts, tracker labels — you can use:

| Write | You get |
|---|---|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `[link text](https://example.com)` | a link (opens in a new tab) |
| `\n` | a line break |
| `{{players}}` | the value of a variable |
| `{{icon:wood}}` | an inline icon |

HTML isn't allowed in game files: it shows as plain text. This keeps files you get from other people safe to load.

---

## Variables

Put a variable's name in double curly braces: `{{round}}`.

**Always available:**

| Variable | Value |
|---|---|
| `{{round}}` | Current round number |
| `{{roundLimit}}` | Total rounds (`∞` if endless) |
| `{{roundsLeft}}` | Rounds after this one (`∞` if endless) |
| `{{phase}}` | Current phase number |
| `{{phaseCount}}` | Number of phases |
| `{{phaseTitle}}` | Current phase title |
| `{{isFirstRound}}` | `true` in round 1 |
| `{{isLastRound}}` | `true` in the final round |

**Plus:** every setting `id` (e.g. `{{players}}`) and every table name (e.g. `{{cardsDraw}}`).

A variable that doesn't exist shows up in **red** on the page, and the loader warns you about it, so typos are easy to spot.

---

## Tables

Tables are named numbers (or words) that change depending on a setting, the round, or both. Each table becomes a variable.

### By round only
A list: the 1st value is used in round 1, the 2nd in round 2, and so on. Once rounds go past the end of the list, the **last value keeps being used**.
```json
"tables": {
  "foodNeeded": { "values": [1, 1, 2, 2, 3] }
}
```

### By a setting only
```json
"tables": {
  "handSize": { "by": "players", "values": { "2": 7, "3": 6, "4": 5 } }
}
```

### By a setting and the round
Give each setting value its own list:
```json
"tables": {
  "cardsDraw": { "by": "players", "values": {
    "3": [7, 6, 6, 6, 6, 6],
    "4": [6, 5, 5, 5, 5, 5],
    "5": [5, 5, 5, 4, 4, 4]
  } }
}
```
In round 2 with 4 players, `{{cardsDraw}}` is `5`.

### By two settings
`by` can be a list. Values nest in the same order:
```json
"tables": {
  "startingGold": { "by": ["players", "difficulty"], "values": {
    "2": { "easy": 10, "hard": 6 },
    "3": { "easy": 8,  "hard": 5 }
  } }
}
```
The innermost value can still be a per-round list.

### A fixed value
```json
"tables": { "maxHand": { "values": 10 } }
```

**`default`** — used when a combination is missing: `{ "by": "players", "values": { "4": 3 }, "default": 2 }`.

Table names must be one word and can't match a setting id or a built-in variable.

---

## Conditions (`showIf`)

`showIf` goes on a phase, a block, a group, or a list item. It's checked every round.

**Equals**
```json
"showIf": { "round": 1 }
"showIf": { "players": 2 }
"showIf": { "expansion": true }
"showIf": { "isLastRound": true }
```

**One of several values**
```json
"showIf": { "players": [2, 3] }
```

**Ranges**
```json
"showIf": { "round": { "min": 2 } }
"showIf": { "round": { "min": 3, "max": 5 } }
```

**Every Nth round**
```json
"showIf": { "round": { "every": 3 } }
"showIf": { "round": { "every": 2, "start": 1 } }
```
The first means rounds 3, 6, 9… The second means rounds 1, 3, 5… (`start` is the first round it happens; it defaults to the same number as `every`).

**Not**
```json
"showIf": { "round": { "not": 1 } }
"showIf": { "players": { "not": [4, 5] } }
"showIf": { "not": { "isLastRound": true } }
```

**All of these (AND)** — put several keys in one object:
```json
"showIf": { "players": 2, "round": { "min": 3 } }
```

**Any of these (OR)**
```json
"showIf": { "any": [ { "round": { "every": 2 } }, { "isLastRound": true } ] }
```

---

## Icons

An icon value can be any of these. They're checked in this order:

1. **A name from your `icons` list** — define once, reuse everywhere.
2. **A built-in icon** — e.g. `"moon"`. You can also write `"builtin:moon"`.
3. **An image** — a full web address (`https://…png`), a `data:image/…` address, or a file name like `wood.png`.
4. **Anything else** is shown as text — perfect for emojis: `"🌙"`. (Inside text, a plain word like `{{icon:wod}}` that matches nothing shows in red instead, so typos stand out.)

Use icons as a phase `icon`, a game `icon`, or inline in any text with `{{icon:name}}`.

### Your own icons
```json
"assetBase": "https://example.com/my-game/icons/",
"icons": {
  "wood": "wood.png",
  "food": "food.png",
  "coin": "🪙",
  "night": "moon",
  "logo": "https://other-site.com/logo.png"
}
```
Then: `"Take 2 {{icon:wood}} and 1 {{icon:food}}."`

Short file names (anything ending `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`, `.avif`) get `assetBase` put in front of them. With no `assetBase`, they're looked for next to the tracker page, so you can host images alongside it (e.g. `images/wood.png`).

### Built-in icons
Line icons that take the phase colour:

`box` · `moon` · `sun` · `users` · `clock` · `star` · `bolt` · `flag` · `cash` · `map` · `fire` · `refresh` · `check` · `eye` · `shield` · `chat` · `cards` · `cloud` · `dice` · `home` · `trophy`

---

## Setup screen content

`setup` takes the same blocks as phase content and shows them above the settings — useful for a setup checklist. Variables use the current settings, and `round` is 1.
```json
"setup": [
  { "type": "heading", "text": "Before you start" },
  { "type": "list", "ordered": true, "items": ["Shuffle the Event deck.", "Give each player 3 coins."] }
]
```

---

## Full example

```json
{
  "schema": 1,
  "title": "Sky Harbour",
  "subtitle": "Turn Guide",
  "icon": "⛵",
  "theme": { "header": "#0c4a6e", "accent": "#38bdf8", "button": "#0369a1" },
  "settings": [
    { "id": "players", "label": "Players", "options": [2, 3, 4], "default": 3, "suffix": "Players" },
    { "id": "storms", "label": "Storm module", "type": "toggle" }
  ],
  "rounds": { "label": "Voyage", "limit": 8, "trackerSubtitle": "{{players}} captains", "showLimit": true },
  "endLabel": "Count your gold ⚓",
  "tables": {
    "cargo": { "by": "players", "values": { "2": [4, 4, 3], "3": [3, 3, 2], "4": [2] } }
  },
  "phases": [
    {
      "title": "Load Cargo",
      "color": "#0284c7",
      "icon": "box",
      "content": [
        { "type": "callout", "title": "Load {{cargo}} cargo", "text": "per ship" }
      ]
    },
    {
      "title": "Storm",
      "color": "#475569",
      "icon": "cloud",
      "showIf": { "storms": true, "round": { "every": 2 } },
      "content": [
        { "type": "warning", "text": "Each ship at sea loses 1 cargo." }
      ]
    },
    {
      "title": "Sell",
      "color": "#16a34a",
      "icon": "cash",
      "content": [
        "Sell cargo at any port you're docked at.",
        { "type": "highlight", "text": "Final voyage — prices double!", "showIf": { "isLastRound": true } }
      ]
    }
  ]
}
```

---

## Troubleshooting

When a file has a problem, the tracker tells you exactly what and where, e.g. `phases[2].content[1]: a list needs an "items" array.` Positions count from **0**, so `phases[2]` is the **third** phase.

**"This isn't valid JSON"** — usually one of:
- a missing comma between items or fields
- an extra comma after the last item: `[1, 2, 3,]` ❌
- curly “smart quotes” instead of straight `"quotes"` (common when copying from Word or Notes)
- text not wrapped in quotes

Paste the file into [jsonlint.com](https://jsonlint.com) to find the exact spot.

**Errors** stop the file loading. **Warnings** (unknown variables, unknown icons, bad colours, unknown block types) still load the game and are listed on the setup screen.

**Text shows `{{something}}` in red** — that variable doesn't exist. Check the spelling matches the setting `id` or table name exactly (it's case-sensitive).

**An icon is a broken image** — check the web address opens in your browser, and that `assetBase` ends with `/`.

**Examples or this guide won't load** — they're fetched from the site, so they only work when the tracker is hosted (GitHub Pages, Netlify, etc.), not when `index.html` is opened straight from your computer. Loading your own files works either way.

---

## Hosting

Put these next to each other on your site:

```
index.html
guide.md
examples/
  chinatown.json
  robinson-crusoe.json
  template.json
nav.html        (optional — your site's shared navbar)
```

If a `nav.html` sits next to `index.html`, it's loaded into the top of the page automatically.
