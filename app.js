const APP_LANG = window.APP_LANG === "ru" ? "ru" : "en";
const I18N = {
  en: {
    dateLocale: "en-US",
    categoryLabels: {
      dark: "Dark",
      light: "Light",
      red_and_blond: "Red and blond",
      patterned: "Patterned",
    },
    categoryOrder: ["dark", "light", "red_and_blond", "patterned"],
    progressLabels: {
      tracked: "Tracked",
      killed: "Killed",
      skinned: "Skinned",
      studied: "Studied",
      sedated: "Sedated",
      samples: "Samples",
      photo: "Photo",
      clothes: "Garment",
    },
    status: {
      available: "Available now",
      waiting: "Wrong time or weather",
      cooldown: "On cooldown",
      done: "Completed",
    },
    allDay: "all day",
    hoursShort: "h",
    minsShort: "m",
    disappearsIn: "Disappears in",
    cooldownUntil: "Cooldown until",
    cooldownEndHint: "Cooldown end will update after start is selected",
    speciesShared: "Cooldown is shared for species",
    timeLabel: "Time",
    weatherLabel: "Weather",
    statusLabel: "Status",
    progressSummary: "Completed {done} of {total}. Click an item to toggle.",
    cooldownStartLabel: "Cooldown start",
    cooldownOn: "72h",
    cooldownOff: "OFF",
    tableOnlySuffix: "table only (no map zone)",
    statsText: "Map: {map}, table: {table}. Cooldown by species.",
    statusBar: "RDO time: {time}, weather: {weather} | map v{version}",
    progressFilterIncomplete: "Incomplete",
    progressFilterNoSamples: "Missing samples",
    progressFilterNoPhoto: "Missing photo",
    fastTravelLabel: "Fast travel",
    loadFastTravelError: "Unable to load fast travel points",
    loadDataError: "Unable to load data",
    confirmReset: "Reset all animal progress?",
    runServerHint: "Run: python serve_map.py",
    noData: "No data",
    collapseTable: "Hide table (full-screen map)",
    expandTable: "Show table",
    toggleTableLabel: "Table",
  },
  ru: {
    dateLocale: "ru-RU",
    categoryLabels: {
      dark: "Тёмные",
      light: "Белые",
      red_and_blond: "Рыжие и светлые",
      patterned: "Пёстрые",
    },
    categoryOrder: ["dark", "light", "red_and_blond", "patterned"],
    progressLabels: {
      tracked: "Отслежено",
      killed: "Убито",
      skinned: "Освежевано",
      studied: "Изучено",
      sedated: "Усыплено",
      samples: "Образцы",
      photo: "Фото",
      clothes: "Одежда",
    },
    status: {
      available: "Можно искать сейчас",
      waiting: "Не подходит время или погода",
      cooldown: "На кулдауне",
      done: "Выполнено",
    },
    allDay: "круглосуточно",
    hoursShort: "ч",
    minsShort: "мин",
    disappearsIn: "Исчезнет через",
    cooldownUntil: "Кулдаун до",
    cooldownEndHint: "Конец кулдауна обновится после выбора начала",
    speciesShared: "Кулдаун общий для вида",
    timeLabel: "Время",
    weatherLabel: "Погода",
    statusLabel: "Статус",
    progressSummary: "Сделано {done} из {total}. Нажмите на пункт, чтобы отметить.",
    cooldownStartLabel: "Начало кулдауна",
    cooldownOn: "72ч",
    cooldownOff: "ВЫКЛ",
    tableOnlySuffix: "только в таблице (на карте нет зоны)",
    statsText: "Карта: {map}, таблица: {table}. Кулдаун по виду.",
    statusBar: "Время RDO: {time}, погода: {weather} | карта v{version}",
    progressFilterIncomplete: "Незавершённые",
    progressFilterNoSamples: "Без образцов",
    progressFilterNoPhoto: "Без фото",
    fastTravelLabel: "Быстрое перемещение",
    loadFastTravelError: "Не удалось загрузить точки быстрого перемещения",
    loadDataError: "Не удалось загрузить данные",
    confirmReset: "Сбросить весь прогресс по животным?",
    runServerHint: "Запустите: python serve_map.py",
    noData: "Нет данных",
    collapseTable: "Свернуть таблицу (карта на весь экран)",
    expandTable: "Показать таблицу",
    toggleTableLabel: "Таблица",
  },
};
const L10N = I18N[APP_LANG];

const CATEGORY_LABELS = L10N.categoryLabels;
const PROGRESS_LABELS = L10N.progressLabels;

const WEATHER_ANY = "any";
const PROGRESS_STORAGE_KEY = "legendary-map-progress";
const COOLDOWN_STORAGE_KEY = "legendary-map-cooldown";
const COOLDOWN_MS = 72 * 60 * 60 * 1000;
const CATEGORY_ORDER = L10N.categoryOrder;
const PROGRESS_FIELDS = [
  "tracked",
  "killed",
  "skinned",
  "studied",
  "sedated",
  "samples",
  "photo",
  "clothes",
];
const POPUP_OPTIONS = {
  minWidth: 260,
  maxWidth: 320,
  autoPan: true,
  autoPanPaddingTopLeft: L.point(24, 24),
  autoPanPaddingBottomRight: L.point(24, 48),
  autoClose: false,
  closeOnClick: false,
  className: "animal-zone-popup",
};
const ZONE_SELECTED_WEIGHT = 4;
const RDO_ICON_BASE =
  "https://jeanropke.github.io/RDOMap/assets/images/icons/game/animals/legendaries";
const RDO_ASSETS_BASE = "https://jeanropke.github.io/RDOMap/assets/images/icons";
const APP_VERSION = "33";
const TABLE_COLLAPSED_KEY = "legendary-map-table-collapsed";
const MAP_ZOOM_BASE = 3;
const SPAWN_ICON_SIZE = 18;
const SPAWN_POINT_COLOR = "#ff2d2d";
const FAST_TRAVEL_ICON_SIZE = 34;

let map;
let layerGroup;
let fastTravelLayer;
let animals = [];
let fastTravels = [];
let filtersInitialized = false;
let clockTimer = null;
let openAnimalId = null;

const animalLayers = new Map();
const progressState = loadProgressState();
const cooldownState = loadCooldownState();

function loadProgressState() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveProgressState() {
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressState));
}

function loadCooldownState() {
  try {
    return JSON.parse(localStorage.getItem(COOLDOWN_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveCooldownState() {
  localStorage.setItem(COOLDOWN_STORAGE_KEY, JSON.stringify(cooldownState));
}

function normalizeCooldownEntry(value) {
  if (!value) return null;
  if (typeof value === "string") {
    const endDate = new Date(value);
    if (Number.isNaN(endDate.getTime())) return null;
    return {
      start: new Date(endDate.getTime() - COOLDOWN_MS).toISOString(),
      end: endDate.toISOString(),
    };
  }
  if (value.start && value.end) return value;
  return null;
}

function getSpeciesCooldown(species) {
  return normalizeCooldownEntry(cooldownState[species]);
}

function formatDateTimeLocalValue(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function parseCooldownStartInput(value) {
  if (!value) return new Date();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function readCooldownStartInput(animalId) {
  const species = getAnimalSpecies(animalId);
  const popupInput = document.querySelector(".animal-zone-popup .popup-cooldown-start");
  if (popupInput?.dataset.species === species && popupInput.value) {
    return parseCooldownStartInput(popupInput.value);
  }
  const input = document.querySelector(`input.cooldown-start-input[data-species="${species}"]`);
  return parseCooldownStartInput(input?.value);
}

function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(L10N.dateLocale, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getSpeciesFromId(animalId) {
  return animalId.replace(/^mp_animal_/, "").replace(/_legendary_\d+$/, "");
}

function getAnimalSpecies(animalOrId) {
  if (typeof animalOrId === "string") {
    const animal = animals.find((item) => item.id === animalOrId);
    return animal?.species || getSpeciesFromId(animalOrId);
  }
  return animalOrId.species || getSpeciesFromId(animalOrId.id);
}

function formatSpeciesName(species) {
  return species
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function migrateSpeciesCooldownStorage() {
  let changed = false;
  for (const key of Object.keys({ ...cooldownState })) {
    if (!key.includes("_legendary_")) {
      const normalized = normalizeCooldownEntry(cooldownState[key]);
      if (normalized && typeof cooldownState[key] === "string") {
        cooldownState[key] = normalized;
        changed = true;
      }
      continue;
    }
    const species = getSpeciesFromId(key);
    const normalized = normalizeCooldownEntry(cooldownState[key]);
    if (normalized) cooldownState[species] = normalized;
    delete cooldownState[key];
    changed = true;
  }
  if (changed) saveCooldownState();
}

migrateSpeciesCooldownStorage();

function getCooldownEnd(animalId) {
  return getSpeciesCooldown(getAnimalSpecies(animalId))?.end ?? null;
}

function getCooldownStart(animalId) {
  return getSpeciesCooldown(getAnimalSpecies(animalId))?.start ?? null;
}

function setCooldownStart(species, startDate = null, focusAnimalId = null) {
  const start = startDate && !Number.isNaN(startDate.getTime()) ? startDate : new Date();
  const end = new Date(start.getTime() + COOLDOWN_MS);
  cooldownState[species] = {
    start: start.toISOString(),
    end: end.toISOString(),
  };
  saveCooldownState();
  refreshSpeciesUI(species, focusAnimalId);
}

function setCooldown(animalId, startDate = null) {
  setCooldownStart(getAnimalSpecies(animalId), startDate, animalId);
}

function syncCooldownStartInputs(species, value) {
  document.querySelectorAll(`input.cooldown-start-input[data-species="${species}"]`).forEach((field) => {
    field.value = value;
  });
  const popupInput = document.querySelector(".animal-zone-popup .popup-cooldown-start");
  if (popupInput?.dataset.species === species) {
    popupInput.value = value;
  }
}

function updateSpeciesCooldownEndsInTable(species) {
  const end = getSpeciesCooldown(species)?.end;
  const text = formatDateTime(end);
  document.querySelectorAll(`td.cell-cooldown-end[data-species="${species}"]`).forEach((cell) => {
    cell.textContent = text;
  });
}

function updatePopupCooldownEnd(species) {
  const popupEnd = document.querySelector(".animal-zone-popup .popup-cooldown-end");
  if (!popupEnd) return;
  const end = getSpeciesCooldown(species)?.end;
  popupEnd.textContent = end
    ? `${L10N.cooldownUntil}: ${formatDateTime(end)}`
    : L10N.cooldownEndHint;
}

function handleCooldownStartChange(species, value, focusAnimalId = null) {
  syncCooldownStartInputs(species, value);
  setCooldownStart(species, parseCooldownStartInput(value), focusAnimalId);
  updateSpeciesCooldownEndsInTable(species);
  updatePopupCooldownEnd(species);
}

function clearCooldown(animalId) {
  const species = getAnimalSpecies(animalId);
  delete cooldownState[species];
  saveCooldownState();
  refreshSpeciesUI(species, animalId);
}

function defaultProgress() {
  return Object.fromEntries(Object.keys(PROGRESS_LABELS).map((key) => [key, false]));
}

function getProgress(animalId) {
  return { ...defaultProgress(), ...(progressState[animalId] || {}) };
}

function toggleProgress(animalId, field) {
  const current = getProgress(animalId);
  current[field] = !current[field];
  progressState[animalId] = current;
  saveProgressState();
  return current;
}

function isOnCooldown(animalId, now = new Date()) {
  const species = getAnimalSpecies(animalId);
  const entry = getSpeciesCooldown(species);
  if (!entry?.end) return false;
  const endDate = new Date(entry.end);
  if (Number.isNaN(endDate.getTime()) || endDate <= now) {
    delete cooldownState[species];
    saveCooldownState();
    return false;
  }
  return true;
}

function getRdoGameTime(now = new Date()) {
  return new Date(now.getTime() * 30);
}

function formatGameClock(gameTime) {
  const hours = String(gameTime.getUTCHours()).padStart(2, "0");
  const minutes = String(gameTime.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatGameHour(hour) {
  return `${String(hour).padStart(2, "0")}:00`;
}

function formatTimeWindow([start, end]) {
  if (start === end) return L10N.allDay;
  return `${formatGameHour(start)} - ${formatGameHour(end)}`;
}

function formatAnimalTime(animal) {
  if (!animal.time_windows?.length) return animal.time_raw || "—";
  return animal.time_windows.map(formatTimeWindow).join(", ");
}

function getGameMinutesSinceMidnight(gameTime) {
  return gameTime.getUTCHours() * 60 + gameTime.getUTCMinutes();
}

function getActiveTimeWindow(animal, hour) {
  return animal.time_windows?.find((window) => hourInWindow(hour, window)) ?? null;
}

function getMinutesUntilWindowEnd(animal, gameTime = getRdoGameTime()) {
  const hour = gameTime.getUTCHours();
  const window = getActiveTimeWindow(animal, hour);
  if (!window) return null;

  const [start, end] = window;
  if (start === end) return null;

  const current = getGameMinutesSinceMidnight(gameTime);
  let endMinutes;
  if (start < end) {
    endMinutes = end * 60;
  } else if (hour >= start) {
    endMinutes = 24 * 60 + end * 60;
  } else {
    endMinutes = end * 60;
  }

  const remaining = endMinutes - current;
  return remaining > 0 ? remaining : null;
}

function formatRealTimeRemaining(gameMinutesRemaining) {
  if (gameMinutesRemaining == null || gameMinutesRemaining <= 0) return null;
  const totalRealMinutes = Math.max(1, Math.ceil(gameMinutesRemaining / 30));
  const hours = Math.floor(totalRealMinutes / 60);
  const minutes = totalRealMinutes % 60;
  if (hours > 0 && minutes > 0) return `${hours}${L10N.hoursShort} ${minutes}${L10N.minsShort}`;
  if (hours > 0) return `${hours}${L10N.hoursShort}`;
  return `${minutes}${L10N.minsShort}`;
}

function formatRemainingUntilDisappearance(animal, gameTime = getRdoGameTime()) {
  return formatRealTimeRemaining(getMinutesUntilWindowEnd(animal, gameTime));
}

function buildTimeRemainingLine(status, animal, gameTime = getRdoGameTime()) {
  if (status !== "available") return "";
  const remaining = formatRemainingUntilDisappearance(animal, gameTime);
  if (!remaining) return "";
  return `<p class="meta popup-time-remaining">${L10N.disappearsIn}: ${remaining}</p>`;
}

function getCurrentGameHour() {
  return getRdoGameTime().getUTCHours();
}

function getCurrentWeather() {
  return document.getElementById("game-weather").value;
}

function hourInWindow(hour, [start, end]) {
  if (start === end) return true;
  if (start < end) return hour >= start && hour < end;
  return hour >= start || hour < end;
}

function matchesTime(animal, hour) {
  return animal.time_windows.some((window) => hourInWindow(hour, window));
}

function matchesWeather(animal, weather) {
  return animal.weather_code === WEATHER_ANY || animal.weather_code === weather;
}

function isCompleted(progress) {
  return Object.values(progress).every(Boolean);
}

function getAnimalStatus(animal, hour, weather, now = new Date()) {
  const progress = getProgress(animal.id);
  if (isCompleted(progress)) return "done";
  if (isOnCooldown(animal.id, now)) return "cooldown";
  if (matchesTime(animal, hour) && matchesWeather(animal, weather)) return "available";
  return "waiting";
}

function statusColor(status) {
  return {
    available: "#4cd964",
    waiting: "#ffb84d",
    cooldown: "#e74c3c",
    done: "#7ec0ff",
  }[status] || "#e8b85a";
}

function statusLabel(status) {
  return L10N.status[status] || status;
}

function getFilters() {
  const categories = [...document.querySelectorAll("#category-filters input:checked")].map(
    (input) => input.value,
  );
  const progressModes = [...document.querySelectorAll("#progress-filters input:checked")].map(
    (input) => input.value,
  );

  return {
    hour: getCurrentGameHour(),
    weather: getCurrentWeather(),
    onlyAvailable: document.getElementById("only-available").checked,
    hideCooldown: document.getElementById("hide-cooldown").checked,
    hideCompleted: document.getElementById("hide-completed").checked,
    categories,
    progressModes,
  };
}

function animalPassesFilters(animal, filters, now = new Date()) {
  if (!filters.categories.includes(animal.category)) return false;

  const progress = getProgress(animal.id);
  const status = getAnimalStatus(animal, filters.hour, filters.weather, now);
  if (filters.onlyAvailable && status !== "available") return false;
  if (filters.hideCooldown && status === "cooldown") return false;
  if (filters.hideCompleted && status === "done") return false;

  if (filters.progressModes.length > 0) {
    const matchesMode = filters.progressModes.some((mode) => {
      if (mode === "incomplete") return !isCompleted(progress);
      if (mode === "missing_samples") return !progress.samples;
      if (mode === "missing_photo") return !progress.photo;
      return Boolean(progress[mode]);
    });
    if (!matchesMode) return false;
  }

  return true;
}

function buildProgressTags(animalId) {
  const progress = getProgress(animalId);
  return Object.entries(PROGRESS_LABELS)
    .map(([key, label]) => {
      const done = progress[key];
      return `<button type="button" class="progress-tag ${done ? "done" : "todo"}" data-animal-id="${animalId}" data-field="${key}">${label}</button>`;
    })
    .join("");
}

function buildPopup(animal, status) {
  const progress = getProgress(animal.id);
  const doneCount = Object.values(progress).filter(Boolean).length;
  const totalCount = Object.keys(PROGRESS_LABELS).length;
  const species = getAnimalSpecies(animal);
  const onCooldown = isOnCooldown(animal.id);
  const cooldownStart = getCooldownStart(animal.id);
  const cooldownEnd = getCooldownEnd(animal.id);
  const startInputValue =
    formatDateTimeLocalValue(cooldownStart) || formatDateTimeLocalValue(new Date().toISOString());

  const cooldownText = onCooldown
    ? `<p class="meta popup-cooldown-end">${L10N.cooldownUntil}: ${formatDateTime(cooldownEnd)}</p>`
    : "";
  const speciesCooldownNote = onCooldown
    ? `<p class="meta">${L10N.speciesShared} (${formatSpeciesName(species)})</p>`
    : "";
  const timeRemainingLine = buildTimeRemainingLine(status, animal);

  return `
    <div class="animal-popup" data-animal-id="${animal.id}">
      <h3>${animal.name}</h3>
      <p class="meta">${CATEGORY_LABELS[animal.category] || animal.category}</p>
      <p class="meta">${L10N.timeLabel}: ${formatAnimalTime(animal)}</p>
      <p class="meta">${L10N.weatherLabel}: ${animal.weather}</p>
      <p class="meta">${L10N.statusLabel}: ${statusLabel(status)}</p>
      ${timeRemainingLine}
      <p class="meta progress-summary">${L10N.progressSummary.replace("{done}", doneCount).replace("{total}", totalCount)}</p>
      ${cooldownText}
      <div class="progress-tags">${buildProgressTags(animal.id)}</div>
      <div class="popup-actions popup-cooldown">
        <label class="popup-cooldown-label">
          ${L10N.cooldownStartLabel}
          <input type="datetime-local" class="popup-cooldown-start" data-species="${species}" value="${startInputValue}">
        </label>
        <div class="cooldown-actions">
          <button type="button" class="popup-btn cooldown-btn" data-action="cooldown" data-animal-id="${animal.id}">${L10N.cooldownOn}</button>
          <button type="button" class="popup-btn secondary cooldown-btn" data-action="clear-cooldown" data-animal-id="${animal.id}">${L10N.cooldownOff}</button>
        </div>
        ${speciesCooldownNote}
      </div>
    </div>
  `;
}

function getPopupContentForAnimal(animalId) {
  const animal = animals.find((item) => item.id === animalId);
  if (!animal) return "";
  const filters = getFilters();
  const status = getAnimalStatus(animal, filters.hour, filters.weather);
  return buildPopup(animal, status);
}

function getAnimalPopupLayer(entry) {
  if (!entry?.points?.length) return null;
  return entry.points[0];
}

function isAnyAnimalPopupOpen() {
  return [...animalLayers.values()].some((entry) =>
    entry.points.some((point) => point.isPopupOpen?.()),
  );
}

function closeAllAnimalPopups(exceptLayer = null) {
  for (const entry of animalLayers.values()) {
    for (const layer of entry.points) {
      if (layer && layer !== exceptLayer && layer.isPopupOpen?.()) {
        layer.closePopup();
      }
    }
  }
}

function getOpenAnimalPopupLayer() {
  for (const entry of animalLayers.values()) {
    for (const layer of entry.points) {
      if (layer.isPopupOpen?.()) return layer;
    }
  }
  return null;
}

function updateOpenAnimalPopup(layer) {
  if (!layer?.isPopupOpen?.()) return;
  const popup = layer.getPopup();
  if (!popup) return;
  popup.update();
}

function refreshZoneSelectionStyles() {
  const filters = getFilters();
  for (const entry of animalLayers.values()) {
    if (!entry.animal) continue;
    const status = getAnimalStatus(entry.animal, filters.hour, filters.weather);
    setLayerStyle(entry, status);
  }
}

function syncPopupProgressUI(animalId) {
  const layer = getOpenAnimalPopupLayer();
  if (layer?.isPopupOpen?.()) {
    const popup = layer.getPopup();
    if (popup) {
      popup.setContent(getPopupContentForAnimal(animalId));
      popup.update();
    }
  }
  updateTableRow(animalId);
  const animal = animals.find((item) => item.id === animalId);
  const entry = animalLayers.get(animalId);
  if (animal && entry) {
    const filters = getFilters();
    setLayerStyle(entry, getAnimalStatus(animal, filters.hour, filters.weather));
  }
  updateStats();
}

function initPopupActionDelegation() {
  if (document.body.dataset.popupActionsReady === "true") return;
  document.body.dataset.popupActionsReady = "true";

  document.addEventListener(
    "click",
    (event) => {
      const popupRoot = event.target.closest(".animal-zone-popup");
      if (!popupRoot) return;

      const progressBtn = event.target.closest(".progress-tag");
      if (progressBtn) {
        event.preventDefault();
        event.stopPropagation();
        const animalId = progressBtn.dataset.animalId;
        const field = progressBtn.dataset.field;
        if (!animalId || !field) return;
        toggleProgress(animalId, field);
        syncPopupProgressUI(animalId);
        return;
      }

      const actionBtn = event.target.closest(".popup-btn, .cooldown-btn");
      if (!actionBtn) return;
      event.preventDefault();
      event.stopPropagation();
      const animalId = actionBtn.dataset.animalId;
      if (!animalId) return;
      const action = actionBtn.dataset.action;
      if (action === "cooldown") {
        const popupInput = popupRoot.querySelector(".popup-cooldown-start");
        setCooldown(animalId, parseCooldownStartInput(popupInput?.value));
      } else if (action === "clear-cooldown") {
        clearCooldown(animalId);
      }
    },
    true,
  );

  document.addEventListener(
    "change",
    (event) => {
      const input = event.target.closest(".animal-zone-popup .popup-cooldown-start");
      if (!input) return;
      event.stopPropagation();
      handleCooldownStartChange(input.dataset.species, input.value, openAnimalId);
    },
    true,
  );

  for (const eventName of ["mousedown", "focusin"]) {
    document.addEventListener(
      eventName,
      (event) => {
        if (event.target.closest(".animal-zone-popup .popup-cooldown-start")) {
          event.stopPropagation();
        }
      },
      true,
    );
  }
}

function refreshOpenAnimalPopup(animalId) {
  const entry = animalLayers.get(animalId);
  if (!entry) return;

  for (const layer of entry.points) {
    if (!layer?.isPopupOpen?.()) continue;
    const popup = layer.getPopup();
    if (!popup) continue;
    popup.setContent(getPopupContentForAnimal(animalId));
    popup.update();
    return;
  }
}

function openAnimalPopupAt(animalId, layer) {
  if (!layer) return;
  openAnimalId = animalId;
  highlightTableRow(animalId);
  closeAllAnimalPopups(layer);
  layer._legendaryAnimalId = animalId;
  layer.openPopup();
  refreshZoneSelectionStyles();
}

function openAnimalPopupCentered(animalId) {
  const entry = animalLayers.get(animalId);
  openAnimalPopupAt(animalId, getAnimalPopupLayer(entry));
}

function waitForMapMoveEnd(callback) {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    map.off("moveend", run);
    callback();
  };
  map.once("moveend", run);
  window.setTimeout(run, 450);
}

function setTableRowSelected(animalId) {
  document.querySelectorAll("#animals-table-body tr.animal-row").forEach((row) => {
    row.classList.toggle("map-selected", row.dataset.animalId === animalId);
  });
}

function scrollTableRowIntoView(animalId) {
  const row = document.querySelector(`#animals-table-body tr[data-animal-id="${animalId}"]`);
  const container = document.querySelector(".table-scroll");
  if (!row || !container) return;

  const rowRect = row.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  if (rowRect.top < containerRect.top) {
    container.scrollTop -= containerRect.top - rowRect.top;
  } else if (rowRect.bottom > containerRect.bottom) {
    container.scrollTop += rowRect.bottom - containerRect.bottom;
  }
}

function highlightTableRow(animalId, { scroll = true } = {}) {
  setTableRowSelected(animalId);
  if (scroll) scrollTableRowIntoView(animalId);
}

function clearTableRowHighlight() {
  document.querySelectorAll("#animals-table-body tr.map-selected").forEach((row) => {
    row.classList.remove("map-selected");
  });
}

function syncMapSelectionHighlight() {
  if (!openAnimalId) {
    clearTableRowHighlight();
    return;
  }
  setTableRowSelected(openAnimalId);
}

function setupAnimalLayerClick(layer, animal) {
  const animalId = animal.id;
  layer._legendaryAnimalId = animalId;

  layer.bindPopup(() => getPopupContentForAnimal(layer._legendaryAnimalId), POPUP_OPTIONS);

  layer.on("click", (event) => {
    L.DomEvent.stopPropagation(event);
    if (typeof layer.bringToFront === "function") layer.bringToFront();
    openAnimalPopupAt(animalId, layer);
  });

  layer.on("popupopen", () => {
    const id = layer._legendaryAnimalId;
    if (!id) return;
    openAnimalId = id;
    highlightTableRow(id);
    const popup = layer.getPopup();
    if (popup) {
      popup.setContent(getPopupContentForAnimal(id));
      popup.update();
    }
    refreshZoneSelectionStyles();
  });

  layer.on("popupclose", () => {
    window.setTimeout(() => {
      if (!isAnyAnimalPopupOpen()) {
        openAnimalId = null;
        clearTableRowHighlight();
        refreshZoneSelectionStyles();
      }
    }, 50);
  });
}

function getMapZoom() {
  return map?.getZoom() ?? MAP_ZOOM_BASE;
}

function getCenterOverlayBounds(animal) {
  const radius = animal.radius;
  return [
    [animal.x - radius, animal.y - radius * 2],
    [animal.x + radius, animal.y + radius * 2],
  ];
}

function createCenterOverlay(animal, status) {
  const dimmed = status === "cooldown";
  return L.imageOverlay(getAnimalIconUrl(animal), getCenterOverlayBounds(animal), {
    pane: "animalCenters",
    className: `animal-center-overlay${dimmed ? " dimmed" : ""}`,
    opacity: dimmed ? 0.55 : 0.78,
    interactive: false,
  });
}

function getSpawnIconSize(zoom = getMapZoom()) {
  const scale = Math.pow(1.42, zoom - MAP_ZOOM_BASE);
  return Math.round(Math.min(34, Math.max(8, SPAWN_ICON_SIZE * scale)));
}

function getAnimalIconUrl(animal) {
  return `${RDO_ICON_BASE}/${animal.id}.svg`;
}

function buildSpawnDivIcon(animal, size, dimmed = false) {
  return L.divIcon({
    className: "animal-spawn-marker",
    html: `
      <div class="spawn-pin ${dimmed ? "dimmed" : ""}" style="width:${size}px;height:${size}px" title="${animal.name}">
        <span class="spawn-pin-ring"></span>
        <img src="${getAnimalIconUrl(animal)}" alt="" draggable="false">
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function createSpawnMarker(animal, point, status) {
  const dimmed = status === "cooldown";
  const size = getSpawnIconSize();
  return L.marker([point.x, point.y], {
    icon: buildSpawnDivIcon(animal, size, dimmed),
    pane: "animalSpawns",
    zIndexOffset: 800,
    riseOnHover: true,
    riseOnClick: true,
  });
}

function updateMapMarkerIcons() {
  if (!map) return;
  const spawnSize = getSpawnIconSize();

  for (const entry of animalLayers.values()) {
    if (!entry.animal) continue;
    const filters = getFilters();
    const status = getAnimalStatus(entry.animal, filters.hour, filters.weather);
    const dimmed = status === "cooldown";

    for (const pointMarker of entry.points) {
      pointMarker.setIcon(buildSpawnDivIcon(entry.animal, spawnSize, dimmed));
    }
  }
}

function createAnimalLayers(animal) {
  const filters = getFilters();
  const status = getAnimalStatus(animal, filters.hour, filters.weather);
  const group = L.layerGroup();

  const zone = L.circle([animal.x, animal.y], {
    radius: animal.radius,
    className: "animal-zone",
    pane: "animalZones",
    interactive: false,
  });
  group.addLayer(zone);

  const centerMarker = createCenterOverlay(animal, status);
  group.addLayer(centerMarker);

  const points = [];
  for (const point of animal.locations) {
    const pointMarker = createSpawnMarker(animal, point, status);
    setupAnimalLayerClick(pointMarker, animal);
    group.addLayer(pointMarker);
    points.push(pointMarker);
  }

  const entry = { group, zone, centerMarker, points, animal };
  setLayerStyle(entry, status);
  return entry;
}

function setLayerStyle(entry, status) {
  const color = statusColor(status);
  const dimmed = status === "cooldown";
  const selected = openAnimalId === entry.animal.id;
  entry.zone.setStyle({
    color: selected ? "#ffffff" : color,
    weight: selected ? ZONE_SELECTED_WEIGHT : 2,
    fillColor: color,
    opacity: selected ? 1 : dimmed ? 0.52 : 0.9,
    fillOpacity: dimmed ? 0.16 : 0.26,
  });
  if (entry.centerMarker) {
    entry.centerMarker.setOpacity(dimmed ? 0.55 : 0.78);
    const element = entry.centerMarker.getElement?.();
    if (element) {
      element.classList.toggle("dimmed", dimmed);
    }
  }
  const spawnSize = getSpawnIconSize();
  for (const point of entry.points) {
    point.setIcon(buildSpawnDivIcon(entry.animal, spawnSize, dimmed));
  }
}

function refreshSpeciesUI(species, focusAnimalId = null) {
  for (const animal of animals) {
    if (getAnimalSpecies(animal) !== species) continue;
    refreshAnimalOnMap(animal.id, openAnimalId === animal.id || focusAnimalId === animal.id);
    updateTableRow(animal.id);
  }
  updateStats();
}

function refreshAnimalUI(animalId, keepPopupOpen = false) {
  refreshSpeciesUI(getAnimalSpecies(animalId), keepPopupOpen ? animalId : null);
}

function focusAnimalOnMap(animalId) {
  const animal = animals.find((item) => item.id === animalId);
  const entry = animalLayers.get(animalId);
  if (!animal) return;
  if (!animal.on_map || animal.x == null) {
    document.getElementById("status").textContent =
      `${animal.name}: ${L10N.tableOnlySuffix}`;
    return;
  }
  if (!entry) return;

  if (!layerGroup.hasLayer(entry.group)) {
    layerGroup.addLayer(entry.group);
  }

  const popupLayer = getAnimalPopupLayer(entry);
  const focusLatLng = popupLayer?.getLatLng() || L.latLng(animal.x, animal.y);

  map.panTo(focusLatLng, { animate: true });
  waitForMapMoveEnd(() => openAnimalPopupCentered(animalId));
}

function buildProgressCell(animalId, field) {
  const done = getProgress(animalId)[field];
  return `<button type="button" class="cell-progress ${done ? "done" : ""}" data-animal-id="${animalId}" data-field="${field}" title="${PROGRESS_LABELS[field]}">${done ? "+" : ""}</button>`;
}

function getAnimalRowClasses(animal, status) {
  return [
    "animal-row",
    `status-${status}`,
    animal.on_map ? "" : "table-only",
    isCompleted(getProgress(animal.id)) ? "progress-complete" : "",
    isOnCooldown(animal.id) ? "cooldown-active-row" : "",
    openAnimalId === animal.id ? "map-selected" : "",
  ].filter(Boolean).join(" ");
}

function buildAnimalRow(animal) {
  const filters = getFilters();
  const status = getAnimalStatus(animal, filters.hour, filters.weather);
  const cooldownStart = getCooldownStart(animal.id);
  const cooldownEnd = getCooldownEnd(animal.id);
  const startInputValue =
    formatDateTimeLocalValue(cooldownStart) || formatDateTimeLocalValue(new Date().toISOString());

  const progressCells = PROGRESS_FIELDS.map(
    (field) => `<td class="col-progress">${buildProgressCell(animal.id, field)}</td>`,
  ).join("");

  const cooldownStatus = `<div class="cooldown-actions">
      <button type="button" class="cooldown-btn" data-action="cooldown" data-animal-id="${animal.id}">${L10N.cooldownOn}</button>
      <button type="button" class="cooldown-btn" data-action="clear-cooldown" data-animal-id="${animal.id}">${L10N.cooldownOff}</button>
    </div>`;

  const rowClass = getAnimalRowClasses(animal, status);

  return `
    <tr class="${rowClass}" data-animal-id="${animal.id}">
      <td>
        <button type="button" class="animal-name-btn ${isCompleted(getProgress(animal.id)) ? "completed" : ""}" data-action="focus" data-animal-id="${animal.id}">${animal.name}</button>
      </td>
      <td>${formatAnimalTime(animal)}</td>
      <td>${animal.weather}</td>
      ${progressCells}
      <td class="cell-cooldown">
        <input type="datetime-local" class="cooldown-start-input" data-species="${animal.species}" value="${startInputValue}">
      </td>
      <td class="cell-cooldown cell-cooldown-end" data-species="${animal.species}">${formatDateTime(cooldownEnd)}</td>
      <td class="cell-cooldown-actions">${cooldownStatus}</td>
    </tr>
  `;
}

function sortAnimalsForTable(items) {
  return [...items].sort((left, right) => {
    if (left.on_map !== right.on_map) return left.on_map ? -1 : 1;
    return left.name.localeCompare(right.name, "ru");
  });
}

function renderTable() {
  const tbody = document.getElementById("animals-table-body");
  if (!tbody) return;

  const grouped = new Map();
  for (const animal of animals) {
    if (!grouped.has(animal.category)) grouped.set(animal.category, []);
    grouped.get(animal.category).push(animal);
  }

  const rows = [];
  for (const category of CATEGORY_ORDER) {
    const items = grouped.get(category);
    if (!items?.length) continue;
    rows.push(`
      <tr class="category-row">
        <td colspan="14">${CATEGORY_LABELS[category] || category}</td>
      </tr>
    `);
    for (const animal of sortAnimalsForTable(items)) {
      rows.push(buildAnimalRow(animal));
    }
  }

  for (const [category, items] of grouped.entries()) {
    if (CATEGORY_ORDER.includes(category)) continue;
    rows.push(`
      <tr class="category-row">
        <td colspan="14">${CATEGORY_LABELS[category] || category}</td>
      </tr>
    `);
    for (const animal of sortAnimalsForTable(items)) {
      rows.push(buildAnimalRow(animal));
    }
  }

  tbody.innerHTML = rows.join("");
}

function updateTableRow(animalId) {
  const animal = animals.find((item) => item.id === animalId);
  const row = document.querySelector(`#animals-table-body tr[data-animal-id="${animalId}"]`);
  if (!animal || !row) return;
  row.outerHTML = buildAnimalRow(animal);
}

function updateAllTableRows() {
  for (const animal of animals) {
    updateTableRow(animal.id);
  }
}

function initTableHandlers() {
  const table = document.getElementById("animals-table");
  if (!table || table.dataset.ready === "true") return;
  table.dataset.ready = "true";

  table.addEventListener("click", (event) => {
    if (event.target.closest(".cooldown-start-input")) {
      event.stopPropagation();
      return;
    }

    const target = event.target.closest("[data-animal-id]");
    if (!target) return;

    const animalId = target.dataset.animalId;
    const field = target.dataset.field;
    const action = target.dataset.action;

    if (field) {
      event.preventDefault();
      toggleProgress(animalId, field);
      refreshAnimalUI(animalId, openAnimalId === animalId);
      return;
    }

    if (action === "focus") {
      event.preventDefault();
      focusAnimalOnMap(animalId);
      return;
    }

    if (action === "cooldown") {
      event.preventDefault();
      setCooldown(animalId, readCooldownStartInput(animalId));
      return;
    }

    if (action === "clear-cooldown") {
      event.preventDefault();
      clearCooldown(animalId);
    }
  });

  table.addEventListener("change", (event) => {
    const input = event.target.closest(".cooldown-start-input");
    if (!input) return;
    event.stopPropagation();
    handleCooldownStartChange(input.dataset.species, input.value);
  });

  for (const eventName of ["mousedown", "focusin"]) {
    table.addEventListener(eventName, (event) => {
      if (event.target.closest(".cooldown-start-input")) {
        event.stopPropagation();
      }
    });
  }
}

function refreshAnimalOnMap(animalId, keepPopupOpen = false) {
  const animal = animals.find((item) => item.id === animalId);
  const entry = animalLayers.get(animalId);
  if (!animal || !entry) return;

  const filters = getFilters();
  const status = getAnimalStatus(animal, filters.hour, filters.weather);
  const visible = animalPassesFilters(animal, filters);
  setLayerStyle(entry, status);

  if (visible) {
    if (!layerGroup.hasLayer(entry.group)) {
      layerGroup.addLayer(entry.group);
    }
  } else if (layerGroup.hasLayer(entry.group)) {
    layerGroup.removeLayer(entry.group);
  }

  if (keepPopupOpen && openAnimalId === animalId) {
    refreshOpenAnimalPopup(animalId);
  }

  updateStats();
}

function rebuildAnimalLayers() {
  for (const entry of animalLayers.values()) {
    if (layerGroup?.hasLayer(entry.group)) {
      layerGroup.removeLayer(entry.group);
    }
  }
  animalLayers.clear();

  for (const animal of animals) {
    if (!animal.on_map || animal.x == null) continue;
    animalLayers.set(animal.id, createAnimalLayers(animal));
  }
}

function ensureAnimalLayers() {
  for (const animal of animals) {
    if (!animal.on_map || animal.x == null || animalLayers.has(animal.id)) continue;
    animalLayers.set(animal.id, createAnimalLayers(animal));
  }
}

function syncMapLayersFromFilters(now = new Date()) {
  ensureAnimalLayers();
  const filters = getFilters();

  for (const animal of animals) {
    const entry = animalLayers.get(animal.id);
    if (!entry) continue;

    const visible = animalPassesFilters(animal, filters, now);
    const status = getAnimalStatus(animal, filters.hour, filters.weather, now);
    setLayerStyle(entry, status);

    if (visible) {
      if (!layerGroup.hasLayer(entry.group)) {
        layerGroup.addLayer(entry.group);
      }
    } else if (layerGroup.hasLayer(entry.group)) {
      if (openAnimalId !== animal.id) {
        layerGroup.removeLayer(entry.group);
      }
    }
  }
}

function renderMarkers() {
  syncMapLayersFromFilters();
  updateStats();
  updateAllTableRows();
}

function updateStats() {
  const filters = getFilters();
  const visible = animals.filter((animal) => animalPassesFilters(animal, filters)).length;
  const gameTime = getRdoGameTime();
  document.getElementById("stats-text").textContent = L10N.statsText
    .replace("{map}", animals.filter((a) => a.on_map).length)
    .replace("{table}", animals.length);
  document.getElementById("game-clock").textContent = formatGameClock(gameTime);
  document.getElementById("status").textContent = L10N.statusBar
    .replace("{time}", formatGameClock(gameTime))
    .replace("{weather}", document.getElementById("game-weather").selectedOptions[0].textContent)
    .replace("{version}", APP_VERSION);
}

function updateTableRowStatus(animalId) {
  const animal = animals.find((item) => item.id === animalId);
  const row = document.querySelector(`#animals-table-body tr[data-animal-id="${animalId}"]`);
  if (!animal || !row) return;

  const filters = getFilters();
  const status = getAnimalStatus(animal, filters.hour, filters.weather);
  const completed = isCompleted(getProgress(animal.id));
  row.className = getAnimalRowClasses(animal, status);

  const nameBtn = row.querySelector(".animal-name-btn");
  if (nameBtn) {
    nameBtn.classList.toggle("completed", completed);
  }
}

function syncPopupTimeRemaining() {
  const popupRoot = document.querySelector(".animal-zone-popup .animal-popup");
  if (!popupRoot) return;

  const animalId = popupRoot.dataset.animalId;
  const animal = animals.find((item) => item.id === animalId);
  if (!animal) return;

  const filters = getFilters();
  const status = getAnimalStatus(animal, filters.hour, filters.weather);
  let remainingEl = popupRoot.querySelector(".popup-time-remaining");

  if (status !== "available") {
    remainingEl?.remove();
    return;
  }

  const remaining = formatRemainingUntilDisappearance(animal);
  if (!remaining) {
    remainingEl?.remove();
    return;
  }

  if (!remainingEl) {
    const statusEl = [...popupRoot.querySelectorAll(".meta")].find((el) =>
      el.textContent.startsWith(`${L10N.statusLabel}:`),
    );
    remainingEl = document.createElement("p");
    remainingEl.className = "meta popup-time-remaining";
    statusEl?.insertAdjacentElement("afterend", remainingEl);
  }

  remainingEl.textContent = `${L10N.disappearsIn}: ${remaining}`;
}

function updateClock() {
  updateStats();
  syncMapLayersFromFilters();
  for (const animal of animals) {
    updateTableRowStatus(animal.id);
  }
  syncPopupTimeRemaining();
  syncMapSelectionHighlight();
}

function syncTableTogglePosition() {
  const tablePanel = document.getElementById("table-panel");
  const button = document.getElementById("toggle-table-panel");
  if (!tablePanel || !button) return;

  const edge = tablePanel.getBoundingClientRect().right;
  button.style.left = `${edge}px`;
  button.style.top = "50%";
  button.style.transform = "translate(-50%, -50%)";
}

function setTablePanelCollapsed(collapsed) {
  document.body.classList.toggle("table-collapsed", collapsed);
  const button = document.getElementById("toggle-table-panel");
  if (button) {
    button.setAttribute("aria-expanded", collapsed ? "false" : "true");
    button.title = collapsed ? L10N.expandTable : L10N.collapseTable;
    const icon = button.querySelector(".toggle-icon");
    if (icon) icon.textContent = collapsed ? "▶" : "◀";
  }
  syncTableTogglePosition();
  if (map) {
    window.setTimeout(() => {
      map.invalidateSize();
      syncTableTogglePosition();
    }, 220);
  }
}

function initTablePanelToggle() {
  const button = document.getElementById("toggle-table-panel");
  if (!button) return;

  const label = button.querySelector(".toggle-label");
  if (label) label.textContent = L10N.toggleTableLabel;

  setTablePanelCollapsed(localStorage.getItem(TABLE_COLLAPSED_KEY) === "1");

  button.addEventListener("click", () => {
    const collapsed = !document.body.classList.contains("table-collapsed");
    localStorage.setItem(TABLE_COLLAPSED_KEY, collapsed ? "1" : "0");
    setTablePanelCollapsed(collapsed);
  });

  window.addEventListener("resize", syncTableTogglePosition);
  window.addEventListener("load", syncTableTogglePosition);
}

function initFilters() {
  const categories = [...new Set(animals.map((animal) => animal.category))];
  document.getElementById("category-filters").innerHTML = categories
    .map(
      (category) => `
      <label>
        <input type="checkbox" value="${category}" checked>
        ${CATEGORY_LABELS[category] || category}
      </label>
    `,
    )
    .join("");

  document.getElementById("progress-filters").innerHTML = `
    <label><input type="checkbox" value="incomplete"> ${L10N.progressFilterIncomplete}</label>
    <label><input type="checkbox" value="missing_samples"> ${L10N.progressFilterNoSamples}</label>
    <label><input type="checkbox" value="missing_photo"> ${L10N.progressFilterNoPhoto}</label>
    ${Object.entries(PROGRESS_LABELS)
      .map(([key, label]) => `<label><input type="checkbox" value="${key}"> ${label}</label>`)
      .join("")}
  `;

  document.querySelectorAll(".sidebar input, .sidebar select, .sidebar button").forEach((node) => {
    if (node.id === "reset-progress") return;
    node.addEventListener("change", () => {
      renderMarkers();
      if (node.id === "show-fast-travel") {
        renderFastTravels();
      }
    });
    node.addEventListener("click", renderMarkers);
  });
}

function initAnimalMapPanes() {
  const fastTravelPane = map.createPane("fastTravel");
  fastTravelPane.style.zIndex = 380;
  const zonesPane = map.createPane("animalZones");
  zonesPane.style.zIndex = 400;
  const spawnsPane = map.createPane("animalSpawns");
  spawnsPane.style.zIndex = 550;
  const centersPane = map.createPane("animalCenters");
  centersPane.style.zIndex = 500;
}

function createFastTravelIcon() {
  return L.icon({
    iconUrl: `${RDO_ASSETS_BASE}/fasttravel.png`,
    iconSize: [FAST_TRAVEL_ICON_SIZE, FAST_TRAVEL_ICON_SIZE],
    iconAnchor: [FAST_TRAVEL_ICON_SIZE / 2, FAST_TRAVEL_ICON_SIZE / 2],
    popupAnchor: [0, -FAST_TRAVEL_ICON_SIZE / 2],
    className: "fast-travel-marker",
  });
}

function renderFastTravels() {
  if (!map) return;
  if (!fastTravelLayer) {
    fastTravelLayer = L.layerGroup().addTo(map);
  }
  fastTravelLayer.clearLayers();

  const showFastTravel = document.getElementById("show-fast-travel")?.checked ?? true;
  if (!showFastTravel) return;

  for (const point of fastTravels) {
    const marker = L.marker([point.x, point.y], {
      icon: createFastTravelIcon(),
      pane: "fastTravel",
      zIndexOffset: 200,
    });
    marker.bindPopup(
      `<div class="fast-travel-popup"><strong>${point.name}</strong><p class="meta">${L10N.fastTravelLabel}</p></div>`,
      { minWidth: 180, className: "fast-travel-popup-wrap" },
    );
    fastTravelLayer.addLayer(marker);
  }
}

async function loadFastTravels() {
  const bundled = window.APP_BUNDLED_DATA?.fastTravels?.[APP_LANG];
  if (bundled) return bundled;
  const staticFile = APP_LANG === "ru" ? "fast_travels_ru.json" : "fast_travels_en.json";
  const fallback = await fetch(`${staticFile}?ts=${Date.now()}`);
  if (fallback.ok) return fallback.json();

  const response = await fetch(`/api/fast-travels?ts=${Date.now()}`);
  if (!response.ok) {
    throw new Error(`${L10N.loadFastTravelError} (${response.status})`);
  }
  return response.json();
}

function initMap() {
  const bounds = L.latLngBounds(L.latLng(-144, 0), L.latLng(0, 176));

  map = L.map("map", {
    crs: L.CRS.Simple,
    minZoom: 2,
    maxZoom: 7,
    zoomControl: true,
    attributionControl: true,
    closePopupOnClick: false,
  }).setView([-70, 111.75], 3);

  L.tileLayer("https://s.rsg.sc/sc/images/games/RDR2/map/game/{z}/{x}/{y}.jpg", {
    noWrap: true,
    bounds,
    attribution: "© Rockstar Games",
  }).addTo(map);

  map.setMaxBounds(L.latLngBounds(L.latLng(-160, -120), L.latLng(25, 250)));
  initAnimalMapPanes();
  layerGroup = L.layerGroup().addTo(map);
  map.on("zoom", updateMapMarkerIcons);
  map.on("zoomend", () => {
    updateMapMarkerIcons();
    const layer = getOpenAnimalPopupLayer();
    if (layer) updateOpenAnimalPopup(layer);
  });
  initPopupActionDelegation();
}

async function loadAnimals() {
  const bundled = window.APP_BUNDLED_DATA?.animals?.[APP_LANG];
  if (bundled) return bundled;
  const staticFile = APP_LANG === "ru" ? "animals_ru.json" : "animals_en.json";
  const fallback = await fetch(`${staticFile}?ts=${Date.now()}`);
  if (fallback.ok) return fallback.json();

  const response = await fetch(`/api/animals?ts=${Date.now()}`);
  if (!response.ok) {
    throw new Error(`${L10N.loadDataError} (${response.status})`);
  }
  return response.json();
}

function startRdoClock() {
  if (clockTimer) clearInterval(clockTimer);
  updateClock();
  clockTimer = setInterval(updateClock, 1000);
}

document.getElementById("reset-progress").addEventListener("click", () => {
  if (!window.confirm(L10N.confirmReset)) return;
  localStorage.removeItem(PROGRESS_STORAGE_KEY);
  localStorage.removeItem(COOLDOWN_STORAGE_KEY);
  Object.keys(progressState).forEach((key) => delete progressState[key]);
  Object.keys(cooldownState).forEach((key) => delete cooldownState[key]);
  rebuildAnimalLayers();
  renderMarkers();
  renderTable();
});

initMap();
initTablePanelToggle();
Promise.all([loadAnimals(), loadFastTravels()])
  .then(([payload, fastPayload]) => {
    animals = payload.animals || [];
    fastTravels = fastPayload.points || [];
    if (!filtersInitialized) {
      initFilters();
      filtersInitialized = true;
    }
    rebuildAnimalLayers();
    renderFastTravels();
    renderTable();
    initTableHandlers();
    renderMarkers();
    updateMapMarkerIcons();
    startRdoClock();
    syncTableTogglePosition();
  })
  .catch((error) => {
    document.getElementById("status").textContent =
      `${error.message}. ${L10N.runServerHint}`;
    document.getElementById("stats-text").textContent = L10N.noData;
  });
