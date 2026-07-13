/** Red Dead Online ability cards — official EN/RU names, grouped by in-game category. */
window.ABILITY_CARDS = {
  /** Prefer bundled PNGs; external mirrors are fallbacks only. */
  localBase: "assets/ability-cards",
  remoteBase: "https://rockstarnews.ru/weazel/static/cards/img/cards",
  categories: {
    deadeye: {
      labels: { en: "Dead Eye", ru: "Меткий глаз" },
      order: 1,
      theme: { bg: "#5c1820", accent: "#d45a52", glow: "rgba(212, 90, 82, 0.35)" },
      cards: [
        "focus_fire",
        "a_moment_to_recuperate",
        "paint_it_black",
        "slow_and_steady",
        "quite_an_inspiration",
        "slippery_bastard",
      ],
    },
    combat: {
      labels: { en: "Combat", ru: "Бой" },
      order: 2,
      theme: { bg: "#5a4a12", accent: "#e8c84a", glow: "rgba(232, 200, 74, 0.38)" },
      cards: [
        "horseman",
        "gunslingers_choice",
        "sharpshooter",
        "necessity_breeds",
        "landons_patience",
        "the_short_game",
        "hangman",
        "winning_streak",
      ],
    },
    recovery: {
      labels: { en: "Recovery", ru: "Восстановление" },
      order: 3,
      theme: { bg: "#26442a", accent: "#6fbf62", glow: "rgba(111, 191, 98, 0.35)" },
      cards: [
        "iron_lung",
        "live_for_the_fight",
        "ride_like_the_wind",
        "kick_in_the_butt",
        "come_back_stronger",
        "peak_condition",
        "eye_for_an_eye",
        "the_gift_of_focus",
        "strange_medicine",
        "cold_blooded",
      ],
    },
    defense: {
      labels: { en: "Defense", ru: "Защита" },
      order: 4,
      theme: { bg: "#1f3554", accent: "#5f95dc", glow: "rgba(95, 149, 220, 0.35)" },
      cards: [
        "friends_for_life",
        "fool_me_once",
        "strength_in_numbers",
        "hunker_down",
        "to_fight_another_day",
        "the_unblinking_eye",
        "take_the_pain_away",
        "of_single_purpose",
        "never_without_one",
      ],
    },
  },
  cards: {
    paint_it_black: {
      set: "ability_cards_set_a",
      names: { en: "Paint It Black", ru: "Раскрасьте в черное" },
    },
    slow_and_steady: {
      set: "ability_cards_set_a",
      names: { en: "Slow and Steady", ru: "Медленно, но верно" },
    },
    focus_fire: {
      set: "ability_cards_set_a",
      names: { en: "Focus Fire", ru: "Концентрация огня" },
    },
    a_moment_to_recuperate: {
      set: "ability_cards_set_a",
      names: { en: "A Moment to Recuperate", ru: "Минутка отдыха" },
    },
    quite_an_inspiration: {
      set: "ability_cards_set_a",
      names: { en: "Quite an Inspiration", ru: "Источник вдохновения" },
    },
    slippery_bastard: {
      set: "ability_cards_set_a",
      names: { en: "Slippery Bastard", ru: "Пронырливый гадёныш" },
    },
    winning_streak: {
      set: "ability_cards_set_c",
      names: { en: "Winning Streak", ru: "Полоса побед" },
    },
    gunslingers_choice: {
      set: "ability_cards_set_c",
      names: { en: "Gunslinger's Choice", ru: "Выбор стрелка" },
    },
    eye_for_an_eye: {
      set: "ability_cards_set_b",
      names: { en: "Eye for an Eye", ru: "Око за око" },
    },
    sharpshooter: {
      set: "ability_cards_set_c",
      names: { en: "Sharpshooter", ru: "Меткий стрелок" },
    },
    cold_blooded: {
      set: "ability_cards_set_b",
      names: { en: "Cold Blooded", ru: "Хладнокровие" },
    },
    the_gift_of_focus: {
      set: "ability_cards_set_b",
      names: { en: "The Gift of Focus", ru: "Дар концентрации" },
    },
    hangman: {
      set: "ability_cards_set_c",
      names: { en: "Hangman", ru: "Душитель" },
    },
    horseman: {
      set: "ability_cards_set_c",
      names: { en: "Horseman", ru: "Всадник" },
    },
    landons_patience: {
      set: "ability_cards_set_c",
      names: { en: "Landon's Patience", ru: "Терпение Лэндона" },
    },
    necessity_breeds: {
      set: "ability_cards_set_c",
      names: { en: "Necessity Breeds", ru: "Отчаянные меры" },
    },
    the_short_game: {
      set: "ability_cards_set_c",
      names: { en: "The Short Game", ru: "Игра на короткой дистанции" },
    },
    strange_medicine: {
      set: "ability_cards_set_b",
      names: { en: "Strange Medicine", ru: "Странное лекарство" },
    },
    peak_condition: {
      set: "ability_cards_set_b",
      names: { en: "Peak Condition", ru: "На пике формы" },
    },
    to_fight_another_day: {
      set: "ability_cards_set_d",
      names: { en: "To Fight Another Day", ru: "Тактическое отступление" },
    },
    come_back_stronger: {
      set: "ability_cards_set_b",
      names: { en: "Come Back Stronger", ru: "Что нас не убивает…" },
    },
    kick_in_the_butt: {
      set: "ability_cards_set_b",
      names: { en: "Kick in the Butt", ru: "Пинок под зад" },
    },
    live_for_the_fight: {
      set: "ability_cards_set_b",
      names: { en: "Live for the Fight", ru: "Жизнь ради битв" },
    },
    ride_like_the_wind: {
      set: "ability_cards_set_b",
      names: { en: "Ride Like the Wind", ru: "Лети как ветер" },
    },
    take_the_pain_away: {
      set: "ability_cards_set_d",
      names: { en: "Take the Pain Away", ru: "Избавление от боли" },
    },
    the_unblinking_eye: {
      set: "ability_cards_set_d",
      names: { en: "The Unblinking Eye", ru: "Немигающий взгляд" },
    },
    never_without_one: {
      set: "ability_cards_set_d",
      names: { en: "Never Without One", ru: "Всегда с собой" },
    },
    friends_for_life: {
      set: "ability_cards_set_d",
      names: { en: "Friends for Life", ru: "Друзья на всю жизнь" },
    },
    fool_me_once: {
      set: "ability_cards_set_d",
      names: { en: "Fool Me Once", ru: "Единожды обманутый" },
    },
    iron_lung: {
      set: "ability_cards_set_b",
      names: { en: "Iron Lung", ru: "Железное легкое" },
    },
    hunker_down: {
      set: "ability_cards_set_d",
      names: { en: "Hunker Down", ru: "В укрытии" },
    },
    of_single_purpose: {
      set: "ability_cards_set_d",
      names: { en: "Of Single Purpose", ru: "Целеустремленность" },
    },
    strength_in_numbers: {
      set: "ability_cards_set_d",
      names: { en: "Strength in Numbers", ru: "Сила в количестве" },
    },
  },
};

window.getAbilityCardCategory = function getAbilityCardCategory(cardId) {
  const cats = window.ABILITY_CARDS?.categories || {};
  for (const [key, meta] of Object.entries(cats)) {
    if ((meta.cards || []).includes(cardId)) return key;
  }
  return "deadeye";
};

window.getAbilityCardTheme = function getAbilityCardTheme(cardId) {
  const cat = window.getAbilityCardCategory(cardId);
  return window.ABILITY_CARDS.categories[cat]?.theme || window.ABILITY_CARDS.categories.deadeye.theme;
};

window.ABILITY_CARD_MANIFEST = null;

window.loadAbilityCardManifest = async function loadAbilityCardManifest() {
  if (window.ABILITY_CARD_MANIFEST) return window.ABILITY_CARD_MANIFEST;
  try {
    const res = await fetch(`${window.ABILITY_CARDS.localBase}/manifest.json?v=1`, { cache: "no-store" });
    if (!res.ok) throw new Error("manifest missing");
    window.ABILITY_CARD_MANIFEST = await res.json();
  } catch {
    window.ABILITY_CARD_MANIFEST = {};
  }
  return window.ABILITY_CARD_MANIFEST;
};

window.getAbilityCardImage = function getAbilityCardImage(cardId, source, lang) {
  if (!window.ABILITY_CARDS?.cards?.[cardId]) return "";
  const manifest = window.ABILITY_CARD_MANIFEST;
  if ((!source || source === "local") && manifest && manifest[cardId]) {
    return `${window.ABILITY_CARDS.localBase}/${cardId}.png`;
  }
  if (source === "remote") {
    const fileName = `ABILITY_CARD_${String(cardId).toUpperCase()}.png`;
    return `${window.ABILITY_CARDS.remoteBase}/${fileName}`;
  }
  return window.getAbilityCardFallbackSvg(cardId, lang || (window.APP_LANG === "ru" ? "ru" : "en"));
};

window.getAbilityCardFallbackSvg = function getAbilityCardFallbackSvg(cardId, lang) {
  const name = window.getAbilityCardName(cardId, lang);
  const theme = window.getAbilityCardTheme(cardId);
  const bg = theme.bg;
  const accent = theme.accent;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="192" viewBox="0 0 128 192">` +
    `<rect width="128" height="192" rx="10" fill="${bg}" stroke="${accent}" stroke-width="3"/>` +
    `<rect x="10" y="12" width="108" height="108" rx="6" fill="rgba(0,0,0,0.25)" stroke="${accent}" stroke-width="1"/>` +
    `<text x="64" y="150" text-anchor="middle" fill="#f2e8dc" font-family="Segoe UI, sans-serif" font-size="11">${name.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text>` +
    `</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

window.getAbilityCardName = function getAbilityCardName(cardId, lang) {
  const card = window.ABILITY_CARDS.cards[cardId];
  if (!card) return cardId;
  const l = lang === "ru" ? "ru" : "en";
  return card.names[l] || card.names.en;
};

window.formatAbilityCardSlot = function formatAbilityCardSlot(slot, lang) {
  const l = lang === "ru" ? "ru" : "en";
  if (!slot) return "";
  if (slot.any) {
    return l === "ru" ? "Любая (часто не нужна)" : "Any (often unused)";
  }
  const ids = slot.cards || [];
  if (!ids.length) return "";
  const orWord = l === "ru" ? " или " : " or ";
  return ids.map((id) => window.getAbilityCardName(id, l)).join(orWord);
};
