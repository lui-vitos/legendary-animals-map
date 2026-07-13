/** Recommended ability card builds — community meta, not official Rockstar guides. */
window.BUILDS_DATA = {
  templates: {
    pvp: {
      id: "pvp",
      labels: { en: "PvP template", ru: "Шаблон PvP" },
      deadeye: { cards: ["paint_it_black"] },
      passives: [
        { cards: ["never_without_one"] },
        { cards: ["strange_medicine"] },
        { cards: ["winning_streak", "gunslingers_choice"] },
      ],
      note: {
        en: "For player-vs-player Free Roam Events and aggressive Showdown play. Upgrade all cards to Tier III. Wear a hat for Never Without One.",
        ru: "Для PvP-событий свободного режима и агрессивной игры в противоборствах. Прокачайте карты до III уровня. Наденьте шляпу для «Всегда с собой».",
      },
    },
    pve: {
      id: "pve",
      labels: { en: "PvE template", ru: "Шаблон PvE" },
      deadeye: { cards: ["slow_and_steady", "paint_it_black"] },
      passives: [
        { cards: ["strange_medicine"] },
        { cards: ["iron_lung"] },
        { cards: ["fool_me_once"] },
      ],
      note: {
        en: "For NPC combat: train defense, bounties, poachers, bandits. Slow and Steady stops instant headshot deaths from NPCs.",
        ru: "Для боя с NPC: поезд, браконьеры, бандиты, облава. «Медленно, но верно» защищает от мгновенных хедшотов NPC.",
      },
    },
    naturalist: {
      id: "naturalist",
      labels: { en: "Naturalist template", ru: "Шаблон натуралиста" },
      deadeye: { cards: ["focus_fire", "a_moment_to_recuperate"] },
      passives: [
        { cards: ["strange_medicine"] },
        { cards: ["friends_for_life"] },
        { cards: ["peak_condition", "iron_lung"] },
      ],
      note: {
        en: "Tagging and escort events: stamina, horse survivability, sustain while fighting poachers.",
        ru: "Маркировка и сопровождение: выносливость, живучесть лошади, восстановление в бою с браконьерами.",
      },
    },
    speed: {
      id: "speed",
      labels: { en: "Speed / mobility", ru: "Скорость / мобильность" },
      deadeye: { any: true },
      passives: [
        { cards: ["friends_for_life"] },
        { cards: ["to_fight_another_day"] },
        { cards: ["peak_condition"] },
      ],
      note: {
        en: "Condor Egg and Dispatch Rider: fast horse, good stamina, minimal fighting.",
        ru: "Яйцо кондора и экспресс-доставка: быстрая лошадь, выносливость, минимум боя.",
      },
    },
    showdown: {
      id: "showdown",
      labels: { en: "Showdown (general)", ru: "Противоборство (общий)" },
      deadeye: { cards: ["paint_it_black"] },
      passives: [
        { cards: ["never_without_one"] },
        { cards: ["strange_medicine"] },
        { cards: ["eye_for_an_eye"] },
      ],
      note: {
        en: "Balanced meta for most Showdown modes. Health Cure + Snake Oil. Tier I Paint It Black works to start.",
        ru: "Сбалансированный мета для большинства противоборств. Лечение + змеиное масло. Для старта хватит I уровня «Раскрасьте в черное».",
      },
    },
    solo: {
      id: "solo",
      labels: { en: "Solo survival", ru: "Соло / FFA" },
      deadeye: { cards: ["paint_it_black"] },
      passives: [
        { cards: ["fool_me_once"] },
        { cards: ["kick_in_the_butt"] },
        { cards: ["come_back_stronger"] },
      ],
      note: {
        en: "Every-player-for-themselves: Hot Property, Golden Hat, King of the Hill. Survive flanks without tonics.",
        ru: "Каждый за себя: позиционная война, золотой костюм, царь горы. Переживает фланги без тоников.",
      },
    },
    tank: {
      id: "tank",
      labels: { en: "Tank / defense", ru: "Танк / защита" },
      deadeye: { cards: ["slow_and_steady"] },
      passives: [
        { cards: ["iron_lung"] },
        { cards: ["never_without_one"] },
        { cards: ["fool_me_once"] },
      ],
      note: {
        en: "Headshot protection with hat. Can't sprint while Dead Eye active — use cover. Public Enemy, holding zones.",
        ru: "Защита от хедшотов со шляпой. Нельзя бежать с активным «Метким глазом» — укрытия. Враг общества, удержание точек.",
      },
    },
    team: {
      id: "team",
      labels: { en: "Team support", ru: "Командная поддержка" },
      deadeye: { cards: ["quite_an_inspiration", "focus_fire"] },
      passives: [
        { cards: ["take_the_pain_away"] },
        { cards: ["strength_in_numbers"] },
        { cards: ["live_for_the_fight"] },
      ],
      note: {
        en: "Heal allies, revive for defense buff. Takeover modes, Team Shootout, Round Up. Stay near teammates.",
        ru: "Лечение союзников, ревайв даёт защиту. Захват, командная перестрелка, облава. Держитесь рядом с командой.",
      },
    },
    repeater: {
      id: "repeater",
      labels: { en: "Repeater / mid-range", ru: "Карабин / средняя дистанция" },
      deadeye: { cards: ["paint_it_black"] },
      passives: [
        { cards: ["winning_streak"] },
        { cards: ["eye_for_an_eye"] },
        { cards: ["fool_me_once"] },
      ],
      note: {
        en: "Lancaster or Litchfield + Express/Split Point. Run-and-gun from medium range.",
        ru: "Lancaster или Litchfield + экспресс/разделённый. Стрельба с ходу на средней дистанции.",
      },
    },
    gunslinger: {
      id: "gunslinger",
      labels: { en: "Dual wield", ru: "Два пистолета" },
      deadeye: { cards: ["paint_it_black"] },
      passives: [
        { cards: ["gunslingers_choice"] },
        { cards: ["winning_streak"] },
        { cards: ["the_unblinking_eye"] },
      ],
      note: {
        en: "Schofield or Mauser dual wield. Sidearm kill challenges, close Shootout.",
        ru: "Schofield или Mauser в двух руках. Испытания с пистолетами, близкая перестрелка.",
      },
    },
    sniper: {
      id: "sniper",
      labels: { en: "Sniper / long range", ru: "Снайпер / дальняя дистанция" },
      deadeye: { cards: ["slippery_bastard"] },
      passives: [
        { cards: ["sharpshooter"] },
        { cards: ["landons_patience"] },
        { cards: ["peak_condition"] },
      ],
      note: {
        en: "Carcano or Rolling Block from cover. Most Wanted — hunt leaders from distance.",
        ru: "Carcano или Rolling Block из укрытия. Самые разыскиваемые — стреляйте по лидерам издалека.",
      },
    },
    shotgun: {
      id: "shotgun",
      labels: { en: "Shotgun / CQC", ru: "Дробовик / ближний бой" },
      deadeye: { cards: ["slippery_bastard", "paint_it_black"] },
      passives: [
        { cards: ["the_short_game"] },
        { cards: ["come_back_stronger"] },
        { cards: ["iron_lung"] },
      ],
      note: {
        en: "Semi-auto or Repeating Shotgun. Capture points, Plunder, Name Your Weapon (shotgun = ×3 points).",
        ru: "Semi-auto или Repeating Shotgun. Захват точек, грабеж, оружие победы (дробовик = ×3 очка).",
      },
    },
    horseman: {
      id: "horseman",
      labels: { en: "Mounted combat", ru: "Бой верхом" },
      deadeye: { cards: ["paint_it_black"] },
      passives: [
        { cards: ["horseman"] },
        { cards: ["ride_like_the_wind"] },
        { cards: ["friends_for_life"] },
      ],
      note: {
        en: "Horseback kill challenges, Dead Drop, Wild Animal Kills. Fast horse + repeater or revolvers.",
        ru: "Убийства верхом, экспресс-доставка, охота на зверей. Быстрая лошадь + карабин или револьверы.",
      },
    },
    bow: {
      id: "bow",
      labels: { en: "Bow specialist", ru: "Лук" },
      deadeye: { cards: ["slippery_bastard"] },
      passives: [
        { cards: ["landons_patience"] },
        { cards: ["fool_me_once"] },
        { cards: ["the_unblinking_eye"] },
      ],
      note: {
        en: "Archery Challenge, bow kill random event. Improved arrows for players; Poison for NPCs.",
        ru: "Мастер лучника, случайное «убийства из лука». Улучшенные стрелы по игрокам; яд — по NPC.",
      },
    },
    melee: {
      id: "melee",
      labels: { en: "Melee / tomahawk", ru: "Ближний бой / томагавк" },
      deadeye: { cards: ["slippery_bastard"] },
      passives: [
        { cards: ["of_single_purpose"] },
        { cards: ["to_fight_another_day"] },
        { cards: ["cold_blooded", "iron_lung"] },
      ],
      note: {
        en: "Name Your Weapon: tomahawk ×6, tackle kills. Charge in cover, finish with knife.",
        ru: "Оружие победы: томагавк ×6, удушение с захвата. Подбегайте из укрытия, добивайте ножом.",
      },
    },
    koth: {
      id: "koth",
      labels: { en: "Zone control", ru: "Удержание зоны" },
      deadeye: { cards: ["paint_it_black", "focus_fire"] },
      passives: [
        { cards: ["fool_me_once"] },
        { cards: ["kick_in_the_butt"] },
        { cards: ["hunker_down"] },
      ],
      note: {
        en: "King of the Hill, Hostile Territory, Overrun. Hold the circle — less damage in cover.",
        ru: "Царь горы, чужая земля, оккупация. Держите круг — меньше урона в укрытии.",
      },
    },
    survival: {
      id: "survival",
      labels: { en: "Last life / BR", ru: "Одна жизнь" },
      deadeye: { cards: ["slippery_bastard", "a_moment_to_recuperate"] },
      passives: [
        { cards: ["iron_lung"] },
        { cards: ["to_fight_another_day"] },
        { cards: ["peak_condition"] },
      ],
      note: {
        en: "Make It Count, Wreckage. Crouch, dive (□/X), bow or knives. Slow and Steady often banned.",
        ru: "Береги оружие, обломки. Присед, нырок (□/X), лук или ножи. «Медленно, но верно» часто запрещена.",
      },
    },
    train: {
      id: "train",
      labels: { en: "Train / stationary", ru: "Поезд / стационарно" },
      deadeye: { cards: ["slow_and_steady", "paint_it_black"] },
      passives: [
        { cards: ["winning_streak"] },
        { cards: ["hunker_down"] },
        { cards: ["strange_medicine"] },
      ],
      note: {
        en: "Supply Train, King of the Rail. Fight from train car — cover + sustain through NPC waves.",
        ru: "Торговый путь, железнодорожный барон. Бой из вагона — укрытие и выживание в волнах NPC.",
      },
    },
    lasso: {
      id: "lasso",
      labels: { en: "Lasso / bounty", ru: "Лasso / награда" },
      deadeye: { cards: ["paint_it_black", "focus_fire"] },
      passives: [
        { cards: ["hangman"] },
        { cards: ["to_fight_another_day"] },
        { cards: ["peak_condition"] },
      ],
      note: {
        en: "Greatest Bounty Hunter: hogtie targets, steal deliveries. Hangman boosts lasso damage.",
        ru: "Час расплаты: связывайте цели, крадите доставки. «Душитель» усиливает урон лasso.",
      },
    },
    pve_burst: {
      id: "pve_burst",
      labels: { en: "PvE sustain", ru: "PvE на выживание" },
      deadeye: { cards: ["slow_and_steady"] },
      passives: [
        { cards: ["strange_medicine"] },
        { cards: ["cold_blooded"] },
        { cards: ["iron_lung", "fool_me_once"] },
      ],
      note: {
        en: "Long NPC fights: Round Up, Wreckage. Heal on kills with Cold Blooded + Strange Medicine.",
        ru: "Длинные бои с NPC: облава, обломки. Лечение за убийства: «Хладнокровие» + «Странное лекарство».",
      },
    },
  },
  fmeEvents: [
    {
      id: "fme_hot_property",
      templates: ["pvp", "solo", "horseman", "repeater"],
      combat: "pvp",
      extra: {
        en: "Chase the bag on horseback or foot. Horseman if you fight mounted; Solo if you run with the objective.",
        ru: "Гоняйтесь за мешком верхом или пешком. «Всадник» при бое с лошади; «Соло» если несёте цель сами.",
      },
    },
    {
      id: "fme_king_of_the_rail",
      templates: ["train", "pvp", "repeater", "tank"],
      combat: "pvp",
      extra: {
        en: "Fight on and around the train. Train template for cover; Tank if holding a car under fire.",
        ru: "Бой на поезде и вокруг. Шаблон «Поезд» для укрытий; «Танк» если держите вагон под огнём.",
      },
    },
    {
      id: "fme_wild_animal_kills",
      templates: ["horseman", "pvp", "naturalist"],
      combat: "pvp",
      extra: {
        en: "Potent predator bait + fast horse. Horseman for mounted kills; repeater from saddle.",
        ru: "Приманка на хищников + быстрая лошадь. «Всадник» для убийств верхом; карабин с седла.",
      },
    },
    {
      id: "fme_golden_hat",
      templates: ["solo", "tank", "pvp", "horseman"],
      combat: "pvp",
      extra: {
        en: "Wear the hat — you're the target. Tank + hat blocks one headshot; Solo for hit-and-run.",
        ru: "Наденьте шляпу — вы цель. «Танк» + шляпа блокирует хедшот; «Соло» для выстрелов с отходом.",
      },
    },
    {
      id: "fme_random",
      templates: ["pvp", "solo", "gunslinger", "bow", "shotgun", "horseman"],
      combat: "pvp",
      extra: {
        en: "Depends on the roll — see «Random event» variants below. Swap template to match weapon type.",
        ru: "Зависит от выпавшего испытания — см. варианты ниже. Меняйте шаблон под тип оружия.",
      },
    },
    {
      id: "fme_role_wildlife_photographer",
      templates: ["speed"],
      combat: "none",
      extra: {
        en: "Cards barely matter. Fast horse, know photo list. Peak Condition optional.",
        ru: "Карты почти не важны. Быстрая лошадь, знайте список снимков. «На пике формы» по желанию.",
      },
    },
    {
      id: "fme_king_of_the_castle",
      templates: ["koth", "solo", "tank", "team"],
      combat: "pvp",
      extra: {
        en: "Hold the hill — Koth + Hunker Down in the zone. Team if allies stack the circle.",
        ru: "Держите холм — «Удержание зоны» + «В укрытии» в круге. «Командная» если союзники в зоне.",
      },
    },
    {
      id: "fme_fishing_challenge",
      templates: ["speed"],
      combat: "none",
      extra: {
        en: "No combat. Best rod + bait for location. Special river lures on the map.",
        ru: "Без боя. Лучшая удочка и наживка под локацию. Специальные приманки на карте у рек.",
      },
    },
    {
      id: "fme_dead_drop",
      templates: ["speed", "horseman", "pvp", "solo"],
      combat: "pvp",
      extra: {
        en: "Stamina horse first. PvP/Solo if others contest your mount; Horseman for delivery fights.",
        ru: "Сначала выносливость лошади. PvP/«Соло» если мешают; «Всадник» для боёв при доставке.",
      },
    },
    {
      id: "fme_archery",
      templates: ["bow", "pvp", "repeater"],
      combat: "pvp",
      extra: {
        en: "Bow template mandatory for bow kills. Switch to Repeater if you need gun backup.",
        ru: "Шаблон «Лук» для убийств из лука. Карабин — если нужна страховка огнестрелом.",
      },
    },
    {
      id: "fme_role_protect_legendary_animal",
      templates: ["naturalist", "pve", "repeater", "pve_burst"],
      combat: "pve",
      extra: {
        en: "Don't ride too close to the animal. Repeater for poachers; PvE burst for long waves.",
        ru: "Не подъезжайте близко к животному. Карабин по браконьерам; PvE на выживание в длинных волнах.",
      },
    },
    {
      id: "fme_role_greatest_bounty_hunter",
      templates: ["lasso", "pve", "horseman", "repeater"],
      combat: "pve",
      extra: {
        en: "Lasso + Hangman for hogties. No PvP damage but rivals steal targets — stay mobile.",
        ru: "Lasso + «Душитель» для связывания. Урона от игроков нет, но цели крадут — будьте мобильны.",
      },
    },
    {
      id: "fme_role_animal_tagging",
      templates: ["naturalist", "speed", "bow", "pve"],
      combat: "pve",
      extra: {
        en: "Varmint Rifle to sedate. Bow + Naturalist for samples; Speed if racing between herds.",
        ru: "Varmint Rifle для усыпления. Лук + натуралист для образцов; скорость между стадами.",
      },
    },
    {
      id: "fme_role_round_up",
      templates: ["pve", "pve_burst", "horseman", "team"],
      combat: "pve",
      extra: {
        en: "Large map co-op bounties. PvE burst for sustain; Team if posse sticks together.",
        ru: "Кооп-облава на большой карте. PvE на выживание; «Командная» если поссе держится вместе.",
      },
    },
    {
      id: "fme_role_supply_train",
      templates: ["train", "pve", "repeater", "pve_burst"],
      combat: "pve",
      extra: {
        en: "Repeater/rifle from train. Hunker Down in cars; Strange Medicine through NPC waves.",
        ru: "Карабин/винтовка с поезда. «В укрытии» в вагонах; «Странное лекарство» в волнах NPC.",
      },
    },
    {
      id: "fme_role_condor_egg",
      templates: ["speed", "horseman"],
      combat: "none",
      extra: {
        en: "Fastest horse, memorize spawns. Cards optional — Turkoman / Missouri Fox Trotter.",
        ru: "Самая быстрая лошадь, запомните точки. Карты вторичны — Turkoman / Missouri Fox Trotter.",
      },
    },
    {
      id: "fme_role_wreckage",
      templates: ["survival", "pve", "pve_burst", "tank"],
      combat: "pve",
      extra: {
        en: "One life only. Survival or Tank — play cover, clear bandits, grab collector items between waves.",
        ru: "Одна жизнь. «Одна жизнь» или «Танк» — укрытия, зачистка бандитов, сбор между волнами.",
      },
    },
  ],
  showdownSeries: [
    {
      id: "takeover",
      names: { en: "Takeover", ru: "Захват" },
      modes: [
        {
          id: "overrun",
          names: { en: "Overrun", ru: "Оккупация" },
          templates: ["team", "koth", "repeater", "shotgun"],
          tips: {
            en: "Team capture — hold zones. Shotgun for close point fights; Team for revives on objective.",
            ru: "Командный захват — держите зоны. Дробовик вблизи точек; «Командная» для ревайвов на цели.",
          },
        },
        {
          id: "hostile_territory",
          names: { en: "Hostile Territory", ru: "Чужая земля" },
          templates: ["koth", "team", "tank", "repeater"],
          tips: {
            en: "Zones tick score — Koth + cover in circles. Focus Fire when team pushes together.",
            ru: "Очки за зоны — «Удержание зоны» + укрытие в кругах. «Концентрация огня» при совместном напоре.",
          },
        },
        {
          id: "plunder",
          names: { en: "Plunder", ru: "Грабеж" },
          templates: ["horseman", "shotgun", "showdown", "team"],
          tips: {
            en: "Steal supplies — mount helps rotations. Shotgun at enemy base; Horseman for hit-and-run sacks.",
            ru: "Кража припасов — лошадь для ротаций. Дробовик у базы врага; «Всадник» для рейдов.",
          },
        },
        {
          id: "spoils_of_war",
          names: { en: "Spoils of War", ru: "Боевые трофеи" },
          templates: ["team", "tank", "koth", "showdown"],
          tips: {
            en: "Flag capture — defend base with Tank; Team for escort. Dynamite on clustered enemies.",
            ru: "Захват «флага» — «Танк» на защите базы; «Командная» на сопровождении. Динамит по скоплениям.",
          },
        },
        {
          id: "up_in_smoke",
          names: { en: "Up in Smoke", ru: "Развеять по ветру" },
          templates: ["repeater", "showdown", "shotgun", "team"],
          tips: {
            en: "Destroy enemy camp — explosives + Paint It Black. Push as a team with Focus Fire.",
            ru: "Уничтожьте лагерь — взрывчатка + «Раскрасьте в черное». Напор командой с «Концентрацией огня».",
          },
        },
      ],
    },
    {
      id: "shootout",
      names: { en: "Shootout", ru: "Перестрелка" },
      modes: [
        {
          id: "shootout_ffa",
          names: { en: "Shootout", ru: "Перестрелка" },
          templates: ["showdown", "solo", "gunslinger", "repeater"],
          tips: {
            en: "Classic FFA — Paint It Black headshots. Gunslinger for dual pistols; Solo for sustain without team.",
            ru: "Классический FFA — хедшоты через «Раскрасьте в черное». «Два пистолета» или «Соло» без команды.",
          },
        },
        {
          id: "team_shootout",
          names: { en: "Team Shootout", ru: "Командная перестрелка" },
          templates: ["team", "showdown", "repeater", "gunslinger"],
          tips: {
            en: "Team deathmatch — Quite an Inspiration + revives. Repeater mid-range; push with Focus Fire.",
            ru: "Командный дезматч — «Источник вдохновения» + ревайвы. Карабин на средней; напор с «Концентрацией огня».",
          },
        },
        {
          id: "most_wanted",
          names: { en: "Most Wanted", ru: "Самые разыскиваемые" },
          templates: ["sniper", "solo", "horseman", "showdown"],
          tips: {
            en: "Hunt leaders on minimap — Sniper from range. When leading, Solo/Tank and play defensive.",
            ru: "Охота на лидеров с карты — «Снайпер» издалека. Если лидируете — «Соло»/«Танк», играйте осторожно.",
          },
        },
        {
          id: "name_your_weapon_ffa",
          names: { en: "Name Your Weapon (Free-for-all)", ru: "Оружие победы (каждый за себя)" },
          templates: ["melee", "shotgun", "bow", "showdown"],
          tips: {
            en: "Tomahawk ×6, bow ×4, shotgun ×3 — always pick up map weapons. Melee for tackle kills in cover.",
            ru: "Томагавк ×6, лук ×4, дробовик ×3 — всегда берите оружие с карты. «Ближний бой» для удушений.",
          },
        },
        {
          id: "public_enemy",
          names: { en: "Public Enemy", ru: "Враг общества" },
          templates: ["tank", "solo", "koth", "showdown"],
          tips: {
            en: "Top scorer = everyone hunts you. Tank + tonics; never stand in open — use buildings.",
            ru: "Лидер таблицы — все охотятся на вас. «Танк» + тоники; не стойте на открытой местности.",
          },
        },
        {
          id: "name_your_weapon_teams",
          names: { en: "Name Your Weapon (Teams)", ru: "Оружие победы (команды)" },
          templates: ["team", "melee", "shotgun", "bow"],
          tips: {
            en: "Coordinate weapon picks — one tomahawk player, others cover. Team heals during risky pushes.",
            ru: "Согласуйте оружие — один с томагавком, остальные прикрывают. «Командная» при рискованных заходах.",
          },
        },
      ],
    },
    {
      id: "elimination",
      names: { en: "Elimination", ru: "Выбывание" },
      modes: [
        {
          id: "make_it_count",
          names: { en: "Make It Count", ru: "Береги оружие" },
          templates: ["survival", "bow", "melee"],
          tips: {
            en: "Bow or throwing knives only. Crouch, dive (□/X), draw bow fully. Cards help but aim skill matters most.",
            ru: "Только лук или метательные ножи. Присед, нырок (□/X), полный натяг лука. Карты помогают, но важнее прицел.",
          },
        },
      ],
    },
    {
      id: "race",
      names: { en: "Race", ru: "Гонка" },
      modes: [
        {
          id: "race",
          names: { en: "Race", ru: "Гонка" },
          templates: ["speed"],
          tips: {
            en: "Cards matter little. Fast horse, clean lines. Peak Condition + Friends for Life if you equip any.",
            ru: "Карты почти не важны. Быстрая лошадь, чистые траектории. «На пике формы» + «Друзья на всю жизнь».",
          },
        },
        {
          id: "target_race",
          names: { en: "Target Race", ru: "Гонка с мишенями" },
          templates: ["speed", "horseman"],
          tips: {
            en: "Shoot targets on the move — practice without stopping. Horse handling beats combat cards.",
            ru: "Стрельба на ходу — тренируйте без остановок. Управление лошадью важнее боевых карт.",
          },
        },
        {
          id: "open_race",
          names: { en: "Open Race", ru: "Открытая гонка" },
          templates: ["speed", "horseman"],
          tips: {
            en: "Free route — memorize shortcuts. Same stamina build as Dead Drop / Condor Egg.",
            ru: "Свободный маршрут — запомните короткие пути. Тот же билд выносливости, что для доставки/яйца.",
          },
        },
        {
          id: "open_target_race",
          names: { en: "Open Target Race", ru: "Открытая гонка с мишенями" },
          templates: ["speed", "pvp", "horseman"],
          tips: {
            en: "Open route + targets; weapons unlock later — PvP cards only if others shoot you off course.",
            ru: "Свободный маршрут + мишени; оружие позже — PvP-карты только если мешают стрелять.",
          },
        },
      ],
    },
  ],
  randomSubtypes: [
    {
      id: "fme_challenge_bow_kills",
      templates: ["bow", "pvp"],
      extra: {
        en: "Bow mandatory — Slippery Bastard + Landon's Patience.",
        ru: "Лук обязателен — «Пронырливый гадёныш» + «Терпение Лэндона».",
      },
    },
    {
      id: "fme_challenge_headshot_kills",
      templates: ["pvp", "gunslinger", "repeater"],
      extra: {
        en: "Paint It Black + headshot focus. Gunslinger's Choice if dual wielding.",
        ru: "«Раскрасьте в черное» + хедшоты. «Выбор стрелка» при двух пистолетах.",
      },
    },
    {
      id: "fme_challenge_horseback_kills",
      templates: ["horseman", "pvp", "repeater"],
      extra: {
        en: "Horseman + Friends for Life. Repeater or revolvers from saddle.",
        ru: "«Всадник» + «Друзья на всю жизнь». Карабин или револьверы с седла.",
      },
    },
    {
      id: "fme_challenge_longarm_kills",
      templates: ["repeater", "sniper", "pvp"],
      extra: {
        en: "Sharpshooter for scoped rifles; Repeater for Lancaster/Litchfield.",
        ru: "«Меткий стрелок» для винтовок с прицелом; «Карабин» для Lancaster/Litchfield.",
      },
    },
    {
      id: "fme_challenge_sidearm_kills",
      templates: ["gunslinger", "pvp", "solo"],
      extra: {
        en: "Gunslinger's Choice + Winning Streak. Schofield or Mauser recommended.",
        ru: "«Выбор стрелка» + «Полоса побед». Schofield или Mauser.",
      },
    },
    {
      id: "fme_wild_animal_kills",
      templates: ["horseman", "pvp", "naturalist"],
    },
    {
      id: "fme_fishing_challenge",
      templates: ["speed"],
    },
  ],
};

window.getItemTemplateIds = function getItemTemplateIds(item) {
  if (!item) return [];
  if (Array.isArray(item.templates) && item.templates.length) return item.templates;
  if (item.template) return [item.template, ...(item.alternatives || [])];
  return [];
};

window.getBuildCardHighlights = function getBuildCardHighlights(templateId) {
  const template = window.BUILDS_DATA.templates[templateId];
  if (!template) {
    return { required: [], choice: [], choiceGroups: [], anyDeadeye: false };
  }

  const required = [];
  const choice = [];
  const choiceGroups = [];
  let anyDeadeye = false;

  function addSlot(slot, role) {
    if (!slot) return;
    if (slot.any) {
      if (role === "deadeye") anyDeadeye = true;
      return;
    }
    const cards = slot.cards || [];
    if (!cards.length) return;
    if (cards.length === 1) {
      required.push(cards[0]);
      return;
    }
    choiceGroups.push({ role, cards: [...cards] });
    choice.push(...cards);
  }

  addSlot(template.deadeye, "deadeye");
  (template.passives || []).forEach((slot, index) => addSlot(slot, `passive-${index}`));

  const requiredSet = new Set(required);
  return {
    required: [...requiredSet],
    choice: [...new Set(choice.filter((id) => !requiredSet.has(id)))],
    choiceGroups,
    anyDeadeye,
  };
};

window.getBuildCardIds = function getBuildCardIds(templateId) {
  const { required, choice } = window.getBuildCardHighlights(templateId);
  return [...new Set([...required, ...choice])];
};
