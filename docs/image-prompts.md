# 대표 이미지 프롬프트 시트

GPT 이미지 생성으로 글마다 실사 스타일 대표 이미지를 만들 때 쓰는 프롬프트입니다. **공통 스타일 문단을 먼저 붙이고, 그 뒤에 글별 장면 문단을 이어 붙여** 한 번에 입력합니다.

## 생성 규격과 파일 저장

- 크기: **1536×1024** (16:9에 가까운 가로형). `pnpm images` 가 1600×900으로 중앙을 잘라 맞춥니다.
- 저장: `assets/images-src/posts/<slug>.png` (파일 이름은 아래 표의 slug와 동일하게)
- 변환: `pnpm images` → `public/images/posts/<slug>.jpg` 생성 → 글의 frontmatter `image: /images/posts/<slug>.jpg`
- 카테고리 기본 이미지: `assets/images-src/categories/<living|digital|travel>.png` → `pnpm images` → `src/lib/categories.ts` 의 `fallbackImage` 경로를 `/images/categories/<slug>.jpg` 로 변경

## 공통 스타일 (모든 프롬프트 맨 앞에 붙임)

```
Editorial documentary-style photograph for a Korean lifestyle magazine. Shot on a full-frame camera with a 35mm f/2 lens, soft natural window light from one side, shallow depth of field, true-to-life slightly muted colors. Props quietly echo a cream, navy and coral palette (a navy notebook, a coral mug, cream linen) without looking styled. Ordinary Korean apartment or everyday Korean setting. Candid, unstaged feel with one small imperfection (a crumb, a wrinkled cloth, an uneven stack). No faces — hands or a partial figure from behind at most. Absolutely no readable text anywhere: all printed or on-screen text is illegible blur. No logos or brand marks: plain unbranded packaging, no maker logo on laptops or phones, generic heavily blurred app UI, no car badges or emblems, blank license plates. No watermark. Not an illustration, no HDR glow, no perfect symmetry, no floating objects. Aspect ratio 16:9.
```

### AI처럼 보이지 않게 하는 요령

1. 얼굴을 넣지 않습니다. 손, 뒷모습, 어깨까지만.
2. 렌즈와 조명을 구체적으로 지정합니다(위 공통 문단에 포함).
3. 결점을 한 가지 명시합니다. 부스러기, 구겨진 천, 삐뚤게 쌓인 물건.
4. 사물은 3~5개로 제한합니다. 많을수록 합성 느낌이 납니다.
5. 색은 "muted, true-to-life"로 고정합니다.
6. 결과가 지나치게 대칭이거나 광택이 강하면 같은 프롬프트 끝에 `Less polished, more like a real snapshot taken quickly.` 를 덧붙여 다시 생성합니다.
7. 글자나 로고가 나오면 `Remove all text and logos; blur any screen content further.` 를 덧붙여 다시 생성합니다.

## 글별 장면 프롬프트

### 생활비 (living)

| slug | 장면 프롬프트 |
| --- | --- |
| `weekly-meal-plan-without-waste` | An open fridge door seen from the side in a small Korean kitchen; a hand holds a small paper list (writing illegible), a few unlabeled glass containers and half a bunch of spring onions on the shelf, a navy pen clipped to the list. |
| `fixed-expense-review` | A kitchen table with a plain white printed statement (all text blurred, no bank marks), a highlighter, a simple calculator and a coral mug; a hand circles one line. |
| `grocery-unit-price` | Supermarket shelf with two sizes of the same staple in plain unbranded bags (rice), a hand holding a phone with a blurred calculator screen, price tags out of focus and unreadable. |
| `budget-tracking-five-items` | A simple paper ledger with five handwritten columns (illegible), a pencil, a few receipts folded once with blurred print, a navy mug on a cream tablecloth, evening lamp light. |
| `mobile-plan-checkup` | A phone showing a heavily blurred ring-shaped usage chart, held above a kitchen counter, a plain folded paper bill (no logo, text blurred) and a pen beside it, morning light. |
| `selling-used-items-prep` | A cleaned unbranded electric kettle on a plain cream cloth by a window, a phone on a small tripod photographing it, a lint roller nearby. |
| `delivery-spending-rules` | A kitchen counter with a simple home-cooked bowl of rice and two side dishes in plain white dishes, a phone face-down beside it, a small paper calendar with a few hand-drawn marks (illegible), evening light. |

### 디지털 (digital)

| slug | 장면 프롬프트 |
| --- | --- |
| `smartphone-notification-reset` | A smartphone face-down on a wooden desk beside a closed unbranded laptop and a cooling cup of coffee, late afternoon light, a paper notebook open to a short handwritten list (illegible). |
| `photo-backup-three-step` | A phone connected by cable to an unbranded laptop on a desk, a small plain external SSD beside it, soft window light, a plant leaf entering the frame edge. |
| `password-manager-start` | A closed navy notebook with an elastic band, a small hardware security key on a plain keyring, and a phone showing a blurred lock screen, on a desk, side light. |
| `smartphone-storage-cleanup` | A phone on a desk showing a blurred horizontal storage bar, a cable, a small cardboard box of old accessories, tidy but lived-in desk, side window light. |
| `smishing-check-before-tap` | A phone held at arm's length showing a blurred unread message bubble, thumb hovering without touching the screen, out-of-focus living room behind, cautious mood. |
| `unused-accounts-cleanup` | An unbranded laptop on a dining table with a blurred inbox, a sticky note with a short handwritten list (illegible), a pen, a cooling tea cup, quiet morning. |
| `parents-phone-basic-setup` | Two pairs of hands at a dining table: an older hand holding a phone with a blurred large-text settings screen, a younger hand pointing at it, a cup of barley tea nearby, warm afternoon light, no faces. |

### 여행 (travel)

| slug | 장면 프롬프트 |
| --- | --- |
| `weekend-trip-light-packing` | A small navy backpack half-packed on a bed, two folded shirts, one pair of jeans, a compact toiletry pouch and a coiled charger cable in a loose row on cream bedding, morning light. |
| `rainy-day-travel-plan` | A rainy city street seen from under a café awning; a folded compact umbrella and a paper map (unreadable) with a phone on a small round table, drops on the glass, soft grey light. |
| `hotel-booking-checklist` | A hand holding a phone with a heavily blurred lodging photo and blurred text, above a paper notebook with a short checklist (illegible), a small card wallet and keys on a wooden table. |
| `first-rental-car-guide` | A plain compact car seen from the rear quarter in a parking lot, no badge or emblem, blank license plate; a hand photographing a small scuff on the bumper with a phone, overcast even light. |
| `day-trip-by-train` | A train window seat seen from behind, a small tote bag and a folded paper sheet (unreadable) on the fold-down tray, Korean countryside blurred outside, morning light. |
| `travel-phone-battery-data` | A café table by a window with a phone charging from a small plain power bank, a folded paper map (unreadable), a backpack strap at the edge of frame, soft daylight. |

### 카테고리 기본 이미지 (선택)

글별 이미지가 없을 때 쓰이는 폴백입니다. 현재는 기존 일러스트 3장이 쓰이고 있으며, 아래로 교체할 수 있습니다.

| 파일 이름 | 장면 프롬프트 |
| --- | --- |
| `living` | Kitchen table with a plain folded receipt (blurred), a simple calculator and a coral mug, nothing else. |
| `digital` | A phone face-down beside a closed navy notebook on a clean desk. |
| `travel` | A packed small suitcase by an apartment door with keys on top. |

## 생성 후 확인

- 글자·로고·브랜드 흔적이 없는가 (화면, 종이, 포장, 차량)
- 얼굴이 나오지 않았는가
- 손가락 개수, 물건의 그림자와 반사가 자연스러운가
- 장면이 글 내용과 맞는가 (예: 렌터카 글에 번호판이 보이면 안 됨)
- `imageAlt` 는 장면을 있는 그대로 한 문장으로 쓴다. "사진", "이미지", "AI" 같은 단어는 넣지 않는다.
