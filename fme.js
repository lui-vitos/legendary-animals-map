/**
 * Free Roam Events — schedule, banners, sound alerts.
 * Schedule data: community FME dataset. Logic adapted from public schedule tools.
 */
(function () {
  const FME_SETTINGS_KEY = "legendary-map-fme-settings";
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  const ONE_MIN_MS = 60 * 1000;

  const FME_DEFAULT_SETTINGS = {
    soundEnabled: true,
    alertAtStart: true,
    minutesBefore: 10,
    alertProtect: true,
    alertTagging: true,
    showAllBanner: true,
    showLegendaryBanner: true,
  };

  const FME_I18N = {
    en: {
      general: "General",
      role: "Role",
      startsIn: "Starts in {time}",
      startsAt: "at {time}",
      lessThanMinute: "less than a minute",
      minute: "{n} min",
      minutes: "{n} min",
      allEventsTitle: "Free Roam Events",
      legendaryTitle: "Free Roam Events with legendary animals",
      nearestLabel: "(Nearest)",
      nextGeneral: "General",
      nextRole: "Role",
      fullSchedule: "Full schedule",
      legendarySchedule: "Legendary schedule",
      timezone: "Your time zone",
      utcNote: "Schedule source uses UTC; times below are converted automatically.",
      today: "Today",
      tomorrow: "Tomorrow",
      in: "In",
      passed: "Started",
      primaryBadge: "Legendary animal",
      secondaryBadge: "Possible legendary animal",
      soundSettings: "Event sounds",
      soundEnabled: "Sound alerts",
      alertAtStart: "Sound at event start",
      minutesBefore: "Sound before (minutes)",
      alertProtect: "Protect Legendary Animal",
      alertTagging: "Wild Animal Tagging",
      testSoundBefore: "Test warning sound",
      testSoundStart: "Test start sound",
      credits:
        "Event schedule based on community data. Red Dead Redemption 2 © Rockstar Games.",
      noUpcoming: "No upcoming events in display window",
      dayPlan: "Free Roam Events with legendary animals today",
    },
    ru: {
      general: "Общее",
      role: "Роль",
      startsIn: "Начнётся через {time}",
      startsAt: "в {time}",
      lessThanMinute: "несколько секунд",
      minute: "{n} мин",
      minutes: "{n} мин",
      allEventsTitle: "События свободного режима",
      legendaryTitle: "События свободного режима с участием легендарных животных",
      nearestLabel: "(Ближайшее)",
      nextGeneral: "Общее",
      nextRole: "Роль",
      fullSchedule: "Полное расписание",
      legendarySchedule: "Расписание легендарных",
      timezone: "Ваш часовой пояс",
      utcNote: "Исходное расписание в UTC; ниже — автоматически в вашем времени.",
      today: "Сегодня",
      tomorrow: "Завтра",
      in: "Через",
      passed: "Началось",
      primaryBadge: "Легендарное животное",
      secondaryBadge: "Возможно легендарное животное",
      soundSettings: "Звук событий",
      soundEnabled: "Звуковые оповещения",
      alertAtStart: "Звук при начале",
      minutesBefore: "За сколько минут (звук)",
      alertProtect: "Защитите легендарное животное",
      alertTagging: "Маркировка диких животных",
      testSoundBefore: "Проверить предупреждение",
      testSoundStart: "Проверить начало",
      credits:
        "Расписание событий — по данным сообщества. Red Dead Redemption 2 © Rockstar Games.",
      noUpcoming: "Нет событий в окне отображения",
      dayPlan: "События свободного режима с участием легендарных животных на сегодня",
    },
  };

  let lang = window.APP_LANG === "ru" ? "ru" : "en";
  let L = FME_I18N[lang];
  let settings = loadSettings();
  const sentAlerts = new Set();
  let audioCtx = null;

  function t(key, vars) {
    let s = L[key] || key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        s = s.replace(`{${k}}`, vars[k]);
      });
    }
    return s;
  }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(FME_SETTINGS_KEY);
      if (!raw) return { ...FME_DEFAULT_SETTINGS };
      return { ...FME_DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      return { ...FME_DEFAULT_SETTINGS };
    }
  }

  function saveSettings() {
    localStorage.setItem(FME_SETTINGS_KEY, JSON.stringify(settings));
  }

  function getTimezoneLabel() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "local";
    } catch {
      return "local";
    }
  }

  function getEventMeta(id) {
    return window.FME_DATA?.events?.[id] || {
      legendary: false,
      names: { en: id, ru: id },
      descriptions: { en: "", ru: "" },
    };
  }

  function getEventName(id) {
    const meta = getEventMeta(id);
    return meta.names[lang] || meta.names.en || id;
  }

  function getEventIcon(id) {
    return `${window.FME_DATA.iconBase}${id}.png`;
  }

  function getDateTimeUtc(baseMs, timeStr) {
    const [h, m] = timeStr.split(":").map(Number);
    const base = new Date(baseMs);
    return new Date(
      Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate(), h, m, 0, 0)
    ).getTime();
  }

  function buildOccurrencesForDay(dayStartMs, scheduleKey) {
    const slots = window.FME_DATA.schedule[scheduleKey] || [];
    const dayEnd = dayStartMs + ONE_DAY_MS;
    const out = [];

    slots.forEach(([timeStr, id]) => {
      let dateTime = getDateTimeUtc(dayStartMs, timeStr);
      if (dateTime < dayStartMs) dateTime += ONE_DAY_MS;
      if (dateTime >= dayStartMs && dateTime < dayEnd) {
        out.push({
          id,
          timeStr,
          scheduleKey,
          dateTime,
          eta: dateTime - Date.now(),
        });
      }
    });
    return out.sort((a, b) => a.dateTime - b.dateTime);
  }

  function getTodayStartLocal() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  }

  function getTomorrowStartLocal() {
    return getTodayStartLocal() + ONE_DAY_MS;
  }

  function formatLocalTime(dateTimeMs) {
    return new Date(dateTimeMs).toLocaleTimeString(lang === "ru" ? "ru-RU" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatUtcTime(timeStr) {
    const now = Date.now();
    const ms = getDateTimeUtc(now, timeStr);
    return `${timeStr} UTC`;
  }

  function formatEta(ms) {
    if (ms < ONE_MIN_MS) return t("lessThanMinute");
    const mins = Math.round(ms / ONE_MIN_MS);
    return t(mins === 1 ? "minute" : "minutes", { n: String(mins) });
  }

  function enrichSlot(slot) {
    const meta = getEventMeta(slot.id);
    return {
      ...slot,
      name: getEventName(slot.id),
      icon: getEventIcon(slot.id),
      legendary: meta.legendary,
      description: meta.descriptions[lang] || meta.descriptions.en || "",
    };
  }

  function findNextOccurrenceInSlots(slots, nowMs, maxWindowMs, filterId) {
    let best = null;

    slots.forEach(([timeStr, id]) => {
      if (filterId && !filterId(id)) return;

      let dateTime = getDateTimeUtc(nowMs, timeStr);
      let eta = dateTime - nowMs;
      if (eta <= 0) {
        dateTime += ONE_DAY_MS;
        eta = dateTime - nowMs;
      }
      if (eta > 0 && eta <= maxWindowMs) {
        const candidate = { id, timeStr, dateTime, eta };
        if (!best || candidate.eta < best.eta) best = candidate;
      }
    });

    return best;
  }

  function clearBannerSlot(container) {
    if (!container) return;
    container.hidden = true;
    container.innerHTML = "";
    container.classList.remove(
      "fme-has-tip",
      "fme-nearest",
      "fme-row-legendary-primary",
      "fme-row-legendary-secondary"
    );
    container.removeAttribute("data-fme-tip");
  }

  function findNextInSchedule(scheduleKey, nowMs) {
    const maxWindow =
      (window.FME_DATA.displayPeriodMinutes[scheduleKey] || 60) * ONE_MIN_MS;
    const slots = window.FME_DATA.schedule[scheduleKey] || [];
    const best = findNextOccurrenceInSlots(slots, nowMs, maxWindow);
    return best ? enrichSlot({ ...best, scheduleKey }) : null;
  }

  function findNextLegendary(nowMs) {
    const ids = window.FME_DATA.legendaryIds;
    const maxWindow = 24 * ONE_MIN_MS;
    let best = null;

    ["general", "role"].forEach((scheduleKey) => {
      const slots = window.FME_DATA.schedule[scheduleKey] || [];
      const candidate = findNextOccurrenceInSlots(slots, nowMs, maxWindow, (id) =>
        ids.includes(id)
      );
      if (candidate && (!best || candidate.eta < best.eta)) {
        best = { ...candidate, scheduleKey };
      }
    });

    return best ? enrichSlot(best) : null;
  }

  function getLegendaryDayPlan(nowMs) {
    const today = getTodayStartLocal();
    const slots = [
      ...buildOccurrencesForDay(today, "role"),
    ]
      .filter((s) => window.FME_DATA.legendaryIds.includes(s.id))
      .map(enrichSlot);
    return slots;
  }

  function getFullDaySchedule(dayStartMs) {
    const general = buildOccurrencesForDay(dayStartMs, "general").map(enrichSlot);
    const role = buildOccurrencesForDay(dayStartMs, "role").map(enrichSlot);
    return [...general, ...role].sort((a, b) => a.dateTime - b.dateTime);
  }

  function getLegendarySchedule(dayStartMs) {
    return buildOccurrencesForDay(dayStartMs, "role")
      .filter((s) => window.FME_DATA.legendaryIds.includes(s.id))
      .map(enrichSlot);
  }

  function shouldAlertForEvent(id) {
    if (id === "fme_role_protect_legendary_animal") return settings.alertProtect;
    if (id === "fme_role_animal_tagging") return settings.alertTagging;
    return false;
  }

  function ensureAudio() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
    return audioCtx;
  }

  async function unlockAudio() {
    const ctx = ensureAudio();
    if (!ctx) return null;
    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch (err) {
        console.warn("[FME] AudioContext resume failed:", err);
        return null;
      }
    }
    return ctx.state === "running" ? ctx : null;
  }

  function playTone(freqs, duration, type, noteGap) {
    const ctx = audioCtx;
    if (!ctx || ctx.state !== "running") return false;
    const gap = noteGap || 0.22;
    const t0 = ctx.currentTime;
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type || "sine";
      osc.frequency.value = freq;
      const start = t0 + i * gap;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.38, start + 0.05);
      gain.gain.setValueAtTime(0.32, start + duration * 0.55);
      gain.gain.linearRampToValueAtTime(0, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration + 0.08);
    });
    return true;
  }

  async function playBeforeSound() {
    const ctx = await unlockAudio();
    if (!ctx) return false;
    return playTone([523, 659, 784], 0.85, "triangle", 0.32);
  }

  async function playStartSound() {
    const ctx = await unlockAudio();
    if (!ctx) return false;
    return playTone([392, 494, 587, 740, 880], 0.9, "sine", 0.28);
  }

  function flashSoundStatus(ok, isTest) {
    const el = document.getElementById("fme-sound-status");
    if (!el) return;
    if (ok) {
      el.textContent = isTest
        ? lang === "ru"
          ? "Звук проигран ✓"
          : "Sound played ✓"
        : "";
      el.className = "fme-sound-status fme-sound-ok";
    } else {
      el.textContent =
        lang === "ru"
          ? "Кликните по карте, затем «Тест»"
          : "Click the map, then Test";
      el.className = "fme-sound-status fme-sound-warn";
    }
    if (ok && isTest) {
      setTimeout(() => {
        el.textContent = "";
        el.className = "fme-sound-status";
      }, 2500);
    }
  }

  function checkSoundAlerts(nowMs) {
    if (!settings.soundEnabled) return;

    window.FME_DATA.legendaryIds.forEach((id) => {
      if (!shouldAlertForEvent(id)) return;

      (window.FME_DATA.schedule.role || []).forEach(([timeStr, eventId]) => {
        if (eventId !== id) return;

        let dateTime = getDateTimeUtc(nowMs, timeStr);
        let eta = dateTime - nowMs;
        if (eta <= 0) {
          dateTime += ONE_DAY_MS;
          eta = dateTime - nowMs;
        }

        const alertKeyBase = `${id}-${dateTime}`;

        if (settings.minutesBefore > 0) {
          const target = settings.minutesBefore * ONE_MIN_MS;
          const key = `${alertKeyBase}-before-${settings.minutesBefore}`;
          // 90-second window around the target minute (poll every 1s)
          if (eta <= target && eta > target - 90000 && !sentAlerts.has(key)) {
            sentAlerts.add(key);
            playBeforeSound();
          }
        }

        if (settings.alertAtStart) {
          const key = `${alertKeyBase}-start`;
          if (eta <= 12000 && eta > -15000 && !sentAlerts.has(key)) {
            sentAlerts.add(key);
            playStartSound();
          }
        }
      });
    });
  }

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setBannerVisible(el, visible) {
    if (!el) return;
    el.classList.toggle("fme-is-hidden", !visible);
  }

  function getNearestLegendaryDateTime(plan, nowMs) {
    let nearest = null;
    plan.forEach((ev) => {
      const eta = ev.dateTime - nowMs;
      if (eta > 0 && (!nearest || ev.dateTime < nearest)) nearest = ev.dateTime;
    });
    if (nearest !== null) return nearest;
    plan.forEach((ev) => {
      if (!nearest || ev.dateTime < nearest) nearest = ev.dateTime;
    });
    return nearest;
  }

  function renderBannerContent(container, event, badge, prefix, options) {
    const isNearest = options && options.isNearest;
    if (!event) {
      clearBannerSlot(container);
      return;
    }

    const eta = event.dateTime - Date.now();
    if (eta <= 0) {
      clearBannerSlot(container);
      return;
    }

    container.hidden = false;
    const legendaryType =
      event.legendary === "primary" || event.legendary === "secondary"
        ? event.legendary
        : badge === "primary" || badge === "secondary"
          ? badge
          : null;
    const badgeType = badge || legendaryType;
    container.classList.toggle("fme-nearest", Boolean(isNearest));
    container.classList.toggle("fme-row-legendary-primary", legendaryType === "primary");
    container.classList.toggle("fme-row-legendary-secondary", legendaryType === "secondary");
    const localTime = formatLocalTime(event.dateTime);
    const etaText = formatEta(eta);
    const badgeHtml = badgeType
      ? `<span class="fme-badge fme-badge-${badgeType}">${t(badgeType === "primary" ? "primaryBadge" : "secondaryBadge")}</span>`
      : "";
    const prefixHtml = prefix ? `<span class="fme-prefix">${prefix}:</span> ` : "";
    const nearestHtml = isNearest
      ? ` <span class="fme-nearest-tag">${t("nearestLabel")}</span>`
      : "";
    const tip = event.description || "";
    const legendMarkHtml = legendaryType
      ? `<span class="fme-legend-mark" aria-hidden="true" title="${escapeHtml(t(legendaryType === "primary" ? "primaryBadge" : "secondaryBadge"))}">!</span>`
      : "";

    container.classList.toggle("fme-has-tip", Boolean(tip));
    if (tip) container.setAttribute("data-fme-tip", tip);
    else container.removeAttribute("data-fme-tip");

    container.innerHTML = `
      <span class="fme-icon-wrap">
        <img class="fme-icon" src="${event.icon}" alt="" width="32" height="32">
        ${legendMarkHtml}
      </span>
      <div class="fme-body">
        <div class="fme-name">${prefixHtml}${escapeHtml(event.name)}${nearestHtml}${badgeHtml}</div>
        <div class="fme-eta">${t("startsIn", { time: etaText })} <span class="fme-local">${t("startsAt", { time: localTime })}</span></div>
      </div>
      ${tip ? `<div class="fme-tooltip" role="tooltip">${escapeHtml(tip)}</div>` : ""}
    `;
  }

  function renderLegendaryDayList(container) {
    const plan = getLegendaryDayPlan(Date.now());
    if (!plan.length) {
      container.innerHTML = "";
      return;
    }
    const now = Date.now();
    const nearestDt = getNearestLegendaryDateTime(plan, now);
    const rows = plan
      .map((ev) => {
        const local = formatLocalTime(ev.dateTime);
        const eta = ev.dateTime - now;
        const isNearest = ev.dateTime === nearestDt;
        const status =
          eta <= 0 && eta > -30 * ONE_MIN_MS
            ? t("passed")
            : eta > 0
              ? `${t("in")} ${formatEta(eta)}`
              : "—";
        const badge =
          ev.legendary === "primary"
            ? t("primaryBadge")
            : t("secondaryBadge");
        const nearestTag = isNearest
          ? `<span class="fme-nearest-tag">${t("nearestLabel")}</span>`
          : "";
        const rowClass = [
          eta > 0 && eta < 60 * ONE_MIN_MS ? "fme-soon" : "",
          isNearest ? "fme-plan-nearest" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return `<li class="${rowClass}">
          <span class="fme-plan-time">${local}</span>
          <span class="fme-plan-name">${escapeHtml(ev.name)}${nearestTag}</span>
          <span class="fme-plan-badge">${badge}</span>
          <span class="fme-plan-in">${status}</span>
        </li>`;
      })
      .join("");
    container.innerHTML = `<div class="fme-day-title">${t("dayPlan")}</div><ul class="fme-day-list">${rows}</ul>`;
  }

  function updateMapBanners() {
    const now = Date.now();
    const allGeneral = findNextInSchedule("general", now);
    const allRole = findNextInSchedule("role", now);
    const legendary = findNextLegendary(now);

    const allBanner = document.getElementById("fme-all-banner");
    const legendaryBanner = document.getElementById("fme-legendary-banner");
    const generalSlot = document.getElementById("fme-all-general");
    const roleSlot = document.getElementById("fme-all-role");
    const legendarySlot = document.getElementById("fme-legendary-next");
    const dayList = document.getElementById("fme-legendary-day");

    if (allBanner) {
      const showAll = settings.showAllBanner && (allGeneral || allRole);
      setBannerVisible(allBanner, showAll);
      if (generalSlot) renderBannerContent(generalSlot, allGeneral, null, t("nextGeneral"));
      if (roleSlot) renderBannerContent(roleSlot, allRole, null, t("nextRole"));
    }

    if (legendaryBanner) {
      setBannerVisible(legendaryBanner, settings.showLegendaryBanner);
      if (legendarySlot) {
        if (legendary) {
          renderBannerContent(
            legendarySlot,
            legendary,
            legendary.legendary === "primary" ? "primary" : "secondary",
            null,
            { isNearest: true }
          );
        } else {
          clearBannerSlot(legendarySlot);
        }
      }
      if (dayList) renderLegendaryDayList(dayList);
    }
  }

  function syncWarnBeforeUI() {
    const enabled = document.getElementById("fme-sound-enabled");
    const minutes = document.getElementById("fme-minutes-before");
    if (minutes && enabled) minutes.disabled = !enabled.checked;
  }

  function bindSettingsPanel() {
    const panel = document.getElementById("fme-settings-panel");
    if (!panel) return;

    const fields = {
      "fme-sound-enabled": (el) => {
        settings.soundEnabled = el.checked;
        syncWarnBeforeUI();
      },
      "fme-alert-at-start": (el) => {
        settings.alertAtStart = el.checked;
      },
      "fme-minutes-before": (el) => {
        let v = parseInt(el.value, 10);
        if (Number.isNaN(v) || v < 1) v = 10;
        if (v > 60) v = 60;
        el.value = v;
        settings.minutesBefore = v;
      },
      "fme-alert-protect": (el) => {
        settings.alertProtect = el.checked;
      },
      "fme-alert-tagging": (el) => {
        settings.alertTagging = el.checked;
      },
      "fme-show-all-banner": (el) => {
        settings.showAllBanner = el.checked;
      },
      "fme-show-legendary-banner": (el) => {
        settings.showLegendaryBanner = el.checked;
      },
    };

    Object.keys(fields).forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.type === "checkbox") {
        if (id === "fme-sound-enabled") el.checked = settings.soundEnabled;
        else if (id === "fme-alert-at-start") el.checked = settings.alertAtStart;
        else if (id === "fme-alert-protect") el.checked = settings.alertProtect;
        else if (id === "fme-alert-tagging") el.checked = settings.alertTagging;
        else if (id === "fme-show-all-banner") el.checked = settings.showAllBanner;
        else if (id === "fme-show-legendary-banner") el.checked = settings.showLegendaryBanner;
      } else if (el.type === "number") {
        el.value = settings.minutesBefore;
      }
      el.addEventListener("change", () => {
        fields[id](el);
        saveSettings();
        updateMapBanners();
      });
      if (el.type === "number") {
        el.addEventListener("input", () => {
          fields[id](el);
          saveSettings();
        });
      }
    });

    document.getElementById("fme-test-before")?.addEventListener("click", async () => {
      const ok = await playBeforeSound();
      flashSoundStatus(ok, true);
    });
    document.getElementById("fme-test-start")?.addEventListener("click", async () => {
      const ok = await playStartSound();
      flashSoundStatus(ok, true);
    });

    syncWarnBeforeUI();
  }

  function renderEventDescriptions(containerId) {
    const box = document.getElementById(containerId);
    if (!box || !window.FME_DATA?.events) return;

    const title = lang === "ru" ? "Описания событий" : "Event descriptions";
    box.innerHTML = `<h2>${title}</h2>`;

    Object.entries(window.FME_DATA.events).forEach(([id, ev]) => {
      if (id.startsWith("fme_challenge_")) return;
      const item = document.createElement("div");
      item.className = "fme-desc-item";
      item.innerHTML = `<h3>${escapeHtml(ev.names[lang] || ev.names.en)}</h3><p>${escapeHtml(ev.descriptions[lang] || ev.descriptions.en || "")}</p>`;
      box.appendChild(item);
    });

    const randomIds = window.FME_DATA.randomSubtypeIds || [];
    if (randomIds.length) {
      const randomEv = window.FME_DATA.events.fme_random;
      const subTitle =
        lang === "ru"
          ? "Варианты «Случайного события»"
          : "Random Challenge variants";
      const subLead =
        lang === "ru"
          ? "Когда в расписании указано «Случайное событие», при старте может выпасть один из режимов:"
          : "When the schedule shows Random Challenge, one of these modes is picked at start:";
      const subBlock = document.createElement("div");
      subBlock.className = "fme-desc-subgroup";
      subBlock.innerHTML = `<h3>${subTitle}</h3><p class="fme-desc-sublead">${subLead}</p>`;
      randomIds.forEach((sid) => {
        const ev = window.FME_DATA.events[sid];
        if (!ev) return;
        const item = document.createElement("div");
        item.className = "fme-desc-item fme-desc-item-sub";
        item.innerHTML = `<h4>${escapeHtml(ev.names[lang] || ev.names.en)}</h4><p>${escapeHtml(ev.descriptions[lang] || ev.descriptions.en || "")}</p>`;
        subBlock.appendChild(item);
      });
      box.appendChild(subBlock);
    }
  }

  function renderScheduleTable(tbody, dayStartMs, filterLegendaryOnly) {
    const now = Date.now();
    let rows = filterLegendaryOnly
      ? getLegendarySchedule(dayStartMs)
      : getFullDaySchedule(dayStartMs);

    let nextId = null;
    let nextDt = Infinity;
    rows.forEach((r) => {
      if (r.dateTime >= now && r.dateTime < nextDt) {
        nextDt = r.dateTime;
        nextId = `${r.id}-${r.dateTime}`;
      }
    });

    tbody.innerHTML = rows
      .map((r) => {
        const local = formatLocalTime(r.dateTime);
        const utc = r.timeStr;
        const eta = r.dateTime - now;
        let status;
        if (eta <= 0 && eta > -30 * ONE_MIN_MS) status = t("passed");
        else if (eta > 0) status = `${t("in")} ${formatEta(eta)}`;
        else status = "—";

        const rowKey = `${r.id}-${r.dateTime}`;
        const isNext = rowKey === nextId;
        const cat = t(r.scheduleKey);
        let badge = "";
        if (r.legendary === "primary") badge = t("primaryBadge");
        else if (r.legendary === "secondary") badge = t("secondaryBadge");

        const typeCol = filterLegendaryOnly
          ? ""
          : `<td>${cat}</td>`;

        return `<tr class="${isNext ? "fme-row-next" : ""}${eta > 0 && eta < 60 * ONE_MIN_MS ? " fme-row-soon" : ""}">
          <td>${local}</td>
          <td class="fme-col-utc">${utc}</td>
          <td><img src="${r.icon}" alt="" width="24" height="24" class="fme-table-icon">${r.name}${badge ? `<span class="fme-badge fme-badge-${r.legendary}">${badge}</span>` : ""}</td>
          ${typeCol}
          <td>${status}</td>
        </tr>`;
      })
      .join("");
  }

  function initSchedulePage(options) {
    lang = window.APP_LANG === "ru" ? "ru" : "en";
    L = FME_I18N[lang];
    settings = loadSettings();

    const tzEl = document.getElementById("fme-timezone");
    if (tzEl) tzEl.textContent = getTimezoneLabel();

    const filterLegendary =
      options?.legendaryOnly ?? document.body.dataset.fmePage === "legendary";
    const tbody = document.getElementById("fme-schedule-body");
    const dayLabel = document.getElementById("fme-day-label");

    function refresh() {
      const dayStart = getTodayStartLocal();
      if (dayLabel) dayLabel.textContent = t("today");
      if (tbody) renderScheduleTable(tbody, dayStart, filterLegendary);
    }

    refresh();
    setInterval(refresh, 10000);

    if (!filterLegendary) {
      renderEventDescriptions("fme-descriptions");
    }
  }

  let mapFmeInitialized = false;
  let mapBannerTimer = null;

  function initMapFme() {
    if (!window.FME_DATA) return;
    if (mapFmeInitialized) {
      updateMapBanners();
      return;
    }
    mapFmeInitialized = true;

    lang = window.APP_LANG === "ru" ? "ru" : "en";
    L = FME_I18N[lang];
    settings = loadSettings();
    bindSettingsPanel();
    updateMapBanners();
    if (mapBannerTimer) clearInterval(mapBannerTimer);
    mapBannerTimer = setInterval(updateMapBanners, 5000);
    setInterval(() => checkSoundAlerts(Date.now()), 1000);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) updateMapBanners();
    });
    document.addEventListener("click", () => unlockAudio(), { once: true });
    document.addEventListener("keydown", () => unlockAudio(), { once: true });
  }

  window.FME = {
    initMapFme,
    initSchedulePage,
    initLegendarySchedulePage: () => initSchedulePage({ legendaryOnly: true }),
    renderEventDescriptions,
    loadSettings,
    saveSettings,
    getTimezoneLabel,
    formatLocalTime,
    getEventName,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.getElementById("fme-all-banner")) initMapFme();
      if (document.getElementById("fme-schedule-page")) {
        const legendary = document.body.dataset.fmePage === "legendary";
        initSchedulePage({ legendaryOnly: legendary });
      }
    });
  } else {
    if (document.getElementById("fme-all-banner")) initMapFme();
    if (document.getElementById("fme-schedule-page")) {
      const legendary = document.body.dataset.fmePage === "legendary";
      initSchedulePage({ legendaryOnly: legendary });
    }
  }
})();
