/** Free Roam Events schedule and metadata (community schedule data). */
window.FME_DATA = {
  source: "community",
  displayPeriodMinutes: { general: 30, role: 60 },
  schedule: {
    general: [
      ["00:00", "fme_hot_property"],
      ["00:45", "fme_king_of_the_rail"],
      ["01:30", "fme_wild_animal_kills"],
      ["02:15", "fme_golden_hat"],
      ["03:00", "fme_random"],
      ["03:45", "fme_role_wildlife_photographer"],
      ["04:30", "fme_king_of_the_castle"],
      ["05:15", "fme_fishing_challenge"],
      ["06:00", "fme_dead_drop"],
      ["06:45", "fme_random"],
      ["07:30", "fme_role_wildlife_photographer"],
      ["08:15", "fme_king_of_the_rail"],
      ["09:00", "fme_archery"],
      ["09:45", "fme_role_wildlife_photographer"],
      ["10:30", "fme_fishing_challenge"],
      ["11:15", "fme_king_of_the_castle"],
      ["12:00", "fme_hot_property"],
      ["12:45", "fme_king_of_the_rail"],
      ["13:30", "fme_wild_animal_kills"],
      ["14:15", "fme_golden_hat"],
      ["15:00", "fme_random"],
      ["15:45", "fme_role_wildlife_photographer"],
      ["16:30", "fme_king_of_the_castle"],
      ["17:15", "fme_fishing_challenge"],
      ["18:00", "fme_dead_drop"],
      ["18:45", "fme_random"],
      ["19:30", "fme_role_wildlife_photographer"],
      ["20:15", "fme_king_of_the_rail"],
      ["21:00", "fme_archery"],
      ["21:45", "fme_role_wildlife_photographer"],
      ["22:30", "fme_fishing_challenge"],
      ["23:15", "fme_king_of_the_castle"],
    ],
    role: [
      ["00:22", "fme_role_protect_legendary_animal"],
      ["01:52", "fme_role_greatest_bounty_hunter"],
      ["03:22", "fme_role_animal_tagging"],
      ["04:52", "fme_role_round_up"],
      ["06:22", "fme_role_supply_train"],
      ["07:52", "fme_role_condor_egg"],
      ["09:22", "fme_role_greatest_bounty_hunter"],
      ["10:52", "fme_role_protect_legendary_animal"],
      ["12:22", "fme_role_round_up"],
      ["13:52", "fme_role_wreckage"],
      ["15:22", "fme_role_greatest_bounty_hunter"],
      ["16:52", "fme_role_animal_tagging"],
      ["18:22", "fme_role_round_up"],
      ["19:52", "fme_role_supply_train"],
      ["21:22", "fme_role_condor_egg"],
      ["22:52", "fme_role_greatest_bounty_hunter"],
    ],
  },
  /** primary = guaranteed legendary; secondary = possible legendary bonus */
  legendaryIds: ["fme_role_protect_legendary_animal", "fme_role_animal_tagging"],
  events: {
    fme_hot_property: {
      legendary: false,
      names: { en: "Cold Dead Hands", ru: "Позиционная война" },
      descriptions: {
        en: "Fight other players for a bag of valuables. The longer you hold it while alive, the more points you earn.",
        ru: "Сражайтесь с другими игроками за мешок с ценностями. Чем дольше вы держите его, будучи живым, тем больше очков.",
      },
    },
    fme_king_of_the_rail: {
      legendary: false,
      names: { en: "Railroad Baron", ru: "Железнодорожный барон" },
      descriptions: {
        en: "Capture and hold control of a train car.",
        ru: "Захватите и удерживайте контроль над вагоном поезда.",
      },
    },
    fme_wild_animal_kills: {
      legendary: false,
      names: { en: "Wild Animal Kills", ru: "Охота на диких зверей" },
      descriptions: {
        en: "Compete to kill the most wild animals within the time limit.",
        ru: "Соревнуйтесь — кто убьёт больше диких животных за отведённое время.",
      },
    },
    fme_golden_hat: {
      legendary: false,
      names: { en: "Fool's Gold", ru: "Золотой костюм" },
      descriptions: {
        en: "Put on golden armor and eliminate other players to score points.",
        ru: "Наденьте золотой костюм и устраняйте других игроков ради очков.",
      },
    },
    fme_random: {
      legendary: false,
      names: { en: "Random Challenge", ru: "Случайное событие" },
      descriptions: {
        en: "One of several PvP challenges (see list below). The exact mode is chosen at random when the event starts.",
        ru: "Одно из нескольких PvP-испытаний (см. список ниже). Конкретный режим выбирается случайно в момент старта.",
      },
    },
    fme_challenge_bow_kills: {
      legendary: false,
      names: { en: "Bow Kills Challenge", ru: "Испытание: убийства с лука" },
      descriptions: {
        en: "Compete to get the most player kills with a bow.",
        ru: "Соревнование — кто больше убьёт игроков из лука.",
      },
    },
    fme_challenge_headshot_kills: {
      legendary: false,
      names: { en: "Headshot Kills Challenge", ru: "Испытание: выстрелы в голову" },
      descriptions: {
        en: "Compete to get the most headshot kills on other players.",
        ru: "Соревнование — кто больше сделает убийств выстрелом в голову.",
      },
    },
    fme_challenge_horseback_kills: {
      legendary: false,
      names: { en: "Horseback Kills Challenge", ru: "Испытание: убийства верхом" },
      descriptions: {
        en: "Compete to get the most kills while on horseback.",
        ru: "Соревнование — кто больше убьёт игроков верхом на лошади.",
      },
    },
    fme_challenge_longarm_kills: {
      legendary: false,
      names: { en: "Longarm Kills Challenge", ru: "Испытание: крупноразмерное оружие" },
      descriptions: {
        en: "Compete to get the most kills with rifles or repeaters.",
        ru: "Соревнование — кто больше убьёт из винтовки или карабина.",
      },
    },
    fme_challenge_sidearm_kills: {
      legendary: false,
      names: { en: "Sidearm Kills Challenge", ru: "Испытание: убийства от бедра" },
      descriptions: {
        en: "Compete to get the most kills with pistols or revolvers (from the hip).",
        ru: "Соревнование — кто больше убьёт из пистолета или револьвера (в т.ч. от бедра).",
      },
    },
    fme_role_wildlife_photographer: {
      legendary: false,
      names: { en: "Wildlife Photographer", ru: "Фотоохотник" },
      descriptions: {
        en: "Photograph animals in the wild. Score points for variety, proximity, and photo quality.",
        ru: "Фотографируйте животных в дикой природе. Очки за разнообразие, близость и качество кадра.",
      },
    },
    fme_king_of_the_castle: {
      legendary: false,
      names: { en: "King of the Castle", ru: "Царь горы" },
      descriptions: {
        en: "Capture and hold designated areas to earn points.",
        ru: "Захватывайте и удерживайте контрольные точки на карте.",
      },
    },
    fme_fishing_challenge: {
      legendary: false,
      names: { en: "Fishing Challenge", ru: "Рыбалка" },
      descriptions: {
        en: "Compete to catch the biggest fish (lake, river, or swamp).",
        ru: "Соревнуйтесь — кто поймает самую крупную рыбу (озеро, река или болото).",
      },
    },
    fme_dead_drop: {
      legendary: false,
      names: { en: "Dispatch Rider", ru: "Экспресс-доставка" },
      descriptions: {
        en: "Race other players to deliver a horse to the drop-off point.",
        ru: "Соревнуйтесь — доставьте лошадь до точки сдачи первым.",
      },
    },
    fme_archery: {
      legendary: false,
      names: { en: "Master Archer", ru: "Мастер лучник" },
      descriptions: {
        en: "Use a bow to hit targets and score the most points.",
        ru: "Стреляйте из лука по мишеням и набирайте максимум очков.",
      },
    },
    fme_role_protect_legendary_animal: {
      legendary: "primary",
      names: { en: "Protect Legendary Animal", ru: "Защитите легендарное животное" },
      descriptions: {
        en: "Co-op: free a Legendary Animal from poachers and escort it to safety. Do not get too close or it may flee. After the event you can often study or sample the animal in free roam.",
        ru: "Кооператив: освободите легендарное животное от браконьеров и сопроводите до безопасного места. Не подходите слишком близко — испугается. После события часто можно осмотреть или взять образец в свободном режиме.",
      },
    },
    fme_role_greatest_bounty_hunter: {
      legendary: false,
      names: { en: "Day of Reckoning", ru: "Час расплаты" },
      descriptions: {
        en: "Capture bounty targets in a town and deliver them to the sheriff. Most points wins. Others can steal hogtied targets.",
        ru: "Ловите цели в городе и сдавайте шерифу. Побеждает тот, у кого больше очков. Можно «украсть» уже связанную цель.",
      },
    },
    fme_role_animal_tagging: {
      legendary: "secondary",
      names: { en: "Wild Animal Tagging", ru: "Маркировка диких животных" },
      descriptions: {
        en: "Sedate and tag animals of specific species within about 10 minutes. A bonus Legendary Animal may appear, but it is not guaranteed.",
        ru: "Усыпляйте и маркируйте животных нужных видов за ~10 минут. Может появиться бонусное легендарное животное, но гарантии нет.",
      },
    },
    fme_role_round_up: {
      legendary: false,
      names: { en: "Manhunt", ru: "Облава" },
      descriptions: {
        en: "Co-op bounty hunt: multiple targets spread over a large area. Deliver alive for full reward.",
        ru: "Кооперативная охота: несколько целей на большой территории. Живым — полная награда.",
      },
    },
    fme_role_supply_train: {
      legendary: false,
      names: { en: "Trade Route", ru: "Торговый путь" },
      descriptions: {
        en: "Defend a goods train from bandits across several stops.",
        ru: "Защищайте поезд с товарами от бандитов на нескольких остановках.",
      },
    },
    fme_role_condor_egg: {
      legendary: false,
      names: { en: "Condor Egg", ru: "Яйцо кондора" },
      descriptions: {
        en: "Find one Condor Egg on the map. First to pick it up wins.",
        ru: "Найдите яйцо кондора на карте. Кто первый подберёт — победил.",
      },
    },
    fme_role_wreckage: {
      legendary: false,
      names: { en: "Salvage", ru: "Обломки" },
      descriptions: {
        en: "Search an area for collectibles while bandits attack. One life only.",
        ru: "Ищите коллекционные предметы в зоне, пока нападают бандиты. Одна жизнь.",
      },
    },
  },
  /** Subtypes that can appear when schedule shows fme_random */
  randomSubtypeIds: [
    "fme_challenge_bow_kills",
    "fme_challenge_headshot_kills",
    "fme_challenge_horseback_kills",
    "fme_challenge_longarm_kills",
    "fme_challenge_sidearm_kills",
    "fme_wild_animal_kills",
    "fme_fishing_challenge",
  ],
  iconBase: "https://jeanropke.github.io/RDOMap/assets/images/fme/",
};
