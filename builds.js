(function () {
  const lang = window.APP_LANG === "ru" ? "ru" : "en";
  let activeTemplateId = null;

  function t(obj) {
    if (!obj) return "";
    return obj[lang] || obj.en || "";
  }

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getEventName(id) {
    const ev = window.FME_DATA?.events?.[id];
    if (ev) return t(ev.names);
    return id;
  }


  function renderPassiveSlots(passives) {
    return (passives || [])
      .map((slot) => `<li>${escapeHtml(window.formatAbilityCardSlot(slot, lang))}</li>`)
      .join("");
  }

  function renderTemplateCard(template) {
    const deadeyeLabel = lang === "ru" ? "Меткий глаз" : "Dead Eye";
    const passiveLabel = lang === "ru" ? "Пассивные" : "Passive";
    return `
      <button type="button" class="build-template" id="template-${template.id}" data-template-id="${template.id}" aria-pressed="false">
        <h3>${escapeHtml(t(template.labels))}</h3>
        <p class="build-slot"><strong>${deadeyeLabel}:</strong> ${escapeHtml(window.formatAbilityCardSlot(template.deadeye, lang))}</p>
        <p class="build-slot"><strong>${passiveLabel}:</strong></p>
        <ul>${renderPassiveSlots(template.passives)}</ul>
        <p class="build-note">${escapeHtml(t(template.note))}</p>
      </button>
    `;
  }

  function renderTemplateLinks(templateIds) {
    const ids = (templateIds || []).filter((id) => window.BUILDS_DATA.templates[id]);
    if (!ids.length) return "";
    return ids
      .map((id, index) => {
        const template = window.BUILDS_DATA.templates[id];
        const sep =
          index > 0 ? `<span class="build-template-sep" aria-hidden="true">·</span>` : "";
        return `${sep}<button type="button" class="build-template-link" data-template-id="${id}">${escapeHtml(t(template.labels))}</button>`;
      })
      .join("");
  }

  function renderEventRow(item) {
    const templateIds = window.getItemTemplateIds(item);
    const combatLabel =
      item.combat === "pvp"
        ? "PvP"
        : item.combat === "pve"
          ? lang === "ru"
            ? "PvE"
            : "PvE"
          : lang === "ru"
            ? "Без боя"
            : "No combat";
    const extra = item.extra ? `<p class="build-extra">${escapeHtml(t(item.extra))}</p>` : "";
    return `
      <div class="build-event-item">
        <h4>${escapeHtml(getEventName(item.id))}</h4>
        <p class="build-meta">
          <span class="build-type">${combatLabel}</span>
          → <span class="build-template-links">${renderTemplateLinks(templateIds)}</span>
        </p>
        ${extra}
      </div>
    `;
  }

  function bindCardImage(img, cardId) {
    img.referrerPolicy = "no-referrer";
    img.decoding = "async";
    img.dataset.cardId = cardId;
    img.dataset.srcStage = img.src.startsWith("data:") ? "svg" : "local";
    img.addEventListener("error", () => {
      const stage = img.dataset.srcStage || "local";
      if (stage === "local") {
        img.dataset.srcStage = "remote";
        img.src = window.getAbilityCardImage(cardId, "remote", lang);
        return;
      }
      if (stage === "remote") {
        img.dataset.srcStage = "svg";
        img.src = window.getAbilityCardFallbackSvg(cardId, lang);
      }
    });
  }

  function renderCardThumb(cardId) {
    const name = window.getAbilityCardName(cardId, lang);
    const img = window.getAbilityCardImage(cardId, null, lang);
    const hasTip = Boolean(window.getAbilityCardDescription?.(cardId, lang));
    return `
      <div class="build-card-thumb${hasTip ? " build-card-thumb-has-tip" : ""}" data-card-id="${cardId}"${hasTip ? ' tabindex="0"' : ""}>
        <span class="build-card-art">
          <img src="${img}" alt="${escapeHtml(name)}" width="72" height="72" loading="lazy" referrerpolicy="no-referrer">
        </span>
        <span class="build-card-thumb-name">${escapeHtml(name)}</span>
      </div>
    `;
  }

  function renderCategoryRows(cardIds) {
    const row1 = cardIds.slice(0, 6);
    const row2 = cardIds.slice(6);
    return `
      <div class="build-card-rows">
        <div class="build-card-row">${row1.map(renderCardThumb).join("")}</div>
        ${row2.length ? `<div class="build-card-row build-card-row-extra">${row2.map(renderCardThumb).join("")}</div>` : ""}
      </div>
    `;
  }

  function renderCardsGallery() {
    const gallery = document.getElementById("builds-cards-gallery");
    if (!gallery || !window.ABILITY_CARDS) return;

    const categories = Object.entries(window.ABILITY_CARDS.categories)
      .sort((a, b) => a[1].order - b[1].order)
      .map(([key, meta]) => {
        const theme = meta.theme || {};
        const rows = renderCategoryRows(meta.cards || []);

        return `
          <section
            class="build-card-group"
            data-category="${key}"
            style="--cat-bg:${theme.bg};--cat-accent:${theme.accent};--cat-glow:${theme.glow}"
          >
            <h4 class="build-card-group-title">${escapeHtml(t(meta.labels))}</h4>
            ${rows}
          </section>
        `;
      })
      .join("");

    gallery.innerHTML = categories;
    gallery.querySelectorAll("img").forEach((img) => {
      const wrap = img.closest(".build-card-thumb");
      if (wrap?.dataset.cardId) bindCardImage(img, wrap.dataset.cardId);
    });
    bindCardTooltips(gallery);
  }

  let cardTooltipEl = null;
  let cardTooltipAnchor = null;

  function ensureCardTooltip() {
    if (cardTooltipEl) return cardTooltipEl;
    cardTooltipEl = document.createElement("div");
    cardTooltipEl.className = "build-card-tooltip";
    cardTooltipEl.setAttribute("role", "tooltip");
    cardTooltipEl.hidden = true;
    document.body.appendChild(cardTooltipEl);
    return cardTooltipEl;
  }

  function positionCardTooltip(tooltip, anchor) {
    const rect = anchor.getBoundingClientRect();
    const margin = 8;
    tooltip.style.visibility = "hidden";
    tooltip.hidden = false;
    const tipRect = tooltip.getBoundingClientRect();
    let top = rect.top - tipRect.height - margin;
    if (top < margin) {
      top = rect.bottom + margin;
    }
    let left = rect.left + rect.width / 2 - tipRect.width / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - tipRect.width - margin));
    tooltip.style.left = `${Math.round(left)}px`;
    tooltip.style.top = `${Math.round(top)}px`;
    tooltip.style.visibility = "visible";
  }

  function getCardDescriptionTierLabel() {
    const tier = window.ABILITY_CARD_DESCRIPTION_TIER;
    if (!tier) return "";
    const roman = ["", "I", "II", "III", "IV", "V"][tier] || String(tier);
    return lang === "ru" ? `${roman} ур.` : `Tier ${roman}`;
  }

  function showCardTooltip(cardId, anchor) {
    const desc = window.getAbilityCardDescription?.(cardId, lang);
    if (!desc) return;
    const tip = ensureCardTooltip();
    const name = window.getAbilityCardName(cardId, lang);
    const tierLabel = getCardDescriptionTierLabel();
    const tierBadge = tierLabel
      ? `<span class="build-card-tooltip-tier">${escapeHtml(tierLabel)}</span>`
      : "";
    tip.innerHTML = `<strong class="build-card-tooltip-title">${escapeHtml(name)}${tierBadge}</strong><p class="build-card-tooltip-text">${escapeHtml(desc)}</p>`;
    cardTooltipAnchor = anchor;
    tip.hidden = false;
    positionCardTooltip(tip, anchor);
  }

  function hideCardTooltip() {
    cardTooltipAnchor = null;
    if (cardTooltipEl) cardTooltipEl.hidden = true;
  }

  function bindCardTooltips(gallery) {
    if (!window.getAbilityCardDescription) return;

    gallery.querySelectorAll(".build-card-thumb-has-tip").forEach((el) => {
      const cardId = el.dataset.cardId;
      el.addEventListener("mouseenter", () => showCardTooltip(cardId, el));
      el.addEventListener("mouseleave", hideCardTooltip);
      el.addEventListener("focus", () => showCardTooltip(cardId, el));
      el.addEventListener("blur", hideCardTooltip);
    });

    const panel = gallery.closest(".builds-cards-panel");
    if (panel && !panel.dataset.tooltipsBound) {
      panel.dataset.tooltipsBound = "1";
      panel.addEventListener(
        "scroll",
        () => {
          if (cardTooltipEl && !cardTooltipEl.hidden && cardTooltipAnchor) {
            positionCardTooltip(cardTooltipEl, cardTooltipAnchor);
          }
        },
        { passive: true }
      );
    }

    if (!window.__buildCardTooltipReposition) {
      window.__buildCardTooltipReposition = true;
      window.addEventListener(
        "scroll",
        () => {
          if (cardTooltipEl && !cardTooltipEl.hidden && cardTooltipAnchor) {
            positionCardTooltip(cardTooltipEl, cardTooltipAnchor);
          }
        },
        { passive: true }
      );
      window.addEventListener("resize", hideCardTooltip);
    }
  }

  function renderCardsLegend() {
    const legend = document.getElementById("builds-cards-legend");
    if (!legend) return;
    legend.innerHTML = `
      <span class="builds-cards-legend-item">
        <span class="builds-cards-legend-swatch builds-cards-legend-swatch--required" aria-hidden="true"></span>
        ${lang === "ru" ? "Обязательная" : "Required"}
      </span>
      <span class="builds-cards-legend-item">
        <span class="builds-cards-legend-swatch builds-cards-legend-swatch--choice" aria-hidden="true"></span>
        ${lang === "ru" ? "На выбор (одна из)" : "Pick one"}
      </span>
    `;
  }

  function buildCardsHint(templateId) {
    if (!templateId) {
      return lang === "ru"
        ? "Нажмите на шаблон билда слева — нужные карты подсветятся. Наведите на карту — описание способности."
        : "Click a build template on the left to highlight cards. Hover a card for its ability description.";
    }

    const template = window.BUILDS_DATA.templates[templateId];
    const { choice, anyDeadeye } = window.getBuildCardHighlights(templateId);
    const parts = [
      lang === "ru"
        ? `Подсвечены карты для «${t(template.labels)}».`
        : `Highlighted cards for “${t(template.labels)}”.`,
    ];

    if (choice.length) {
      parts.push(
        lang === "ru"
          ? "Золотая рамка — обязательная карта; голубая пунктирная — варианты на выбор (нужна одна)."
          : "Gold border — required card; cyan dashed border — pick one of the options."
      );
    }
    if (anyDeadeye) {
      parts.push(
        lang === "ru"
          ? "Слот «Меткий глаз» — любая карта (не подсвечивается)."
          : "Dead Eye slot — any card (not highlighted)."
      );
    }
    return parts.join(" ");
  }

  function setActiveTemplate(templateId) {
    activeTemplateId = templateId || null;
    const highlights = templateId
      ? window.getBuildCardHighlights(templateId)
      : { required: [], choice: [] };
    const { required, choice } = highlights;

    document.querySelectorAll(".build-template").forEach((el) => {
      const isActive = el.dataset.templateId === templateId;
      el.classList.toggle("build-template-active", isActive);
      el.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    document.querySelectorAll(".build-card-thumb").forEach((el) => {
      const cardId = el.dataset.cardId;
      const isRequired = required.includes(cardId);
      const isChoice = choice.includes(cardId);
      const isHighlighted = isRequired || isChoice;

      el.classList.toggle("build-card-thumb-active", isRequired);
      el.classList.toggle("build-card-thumb-choice", isChoice);
      el.classList.toggle("build-card-thumb-dim", Boolean(templateId) && !isHighlighted);
      el.removeAttribute("data-build-slot");
      if (isChoice) {
        const group = highlights.choiceGroups?.find((g) => g.cards.includes(cardId));
        if (group) el.dataset.buildSlot = group.role;
      }
    });

    const hint = document.getElementById("builds-cards-hint");
    if (hint) {
      hint.textContent = buildCardsHint(templateId);
    }

    const legend = document.getElementById("builds-cards-legend");
    if (legend) {
      legend.hidden = !templateId;
    }
  }

  function bindInteractions() {
    document.querySelectorAll(".build-template").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.dataset.templateId;
        setActiveTemplate(activeTemplateId === id ? null : id);
      });
    });

    document.querySelectorAll(".build-template-link").forEach((el) => {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        const id = el.dataset.templateId;
        setActiveTemplate(id);
        const target = document.getElementById(`template-${id}`);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });
  }

  function renderShowdownMode(mode) {
    const templateIds = window.getItemTemplateIds(mode);
    const tips = mode.tips ? `<p class="build-extra">${escapeHtml(t(mode.tips))}</p>` : "";
    return `
      <div class="build-event-item">
        <h4>${escapeHtml(t(mode.names))}</h4>
        <p class="build-meta">→ <span class="build-template-links">${renderTemplateLinks(templateIds)}</span></p>
        ${tips}
      </div>
    `;
  }

  function renderShowdownSeries(series) {
    return `
      <section class="build-showdown-series">
        <h3 class="build-showdown-series-title">${escapeHtml(t(series.names))}</h3>
        <div class="build-events-grid">${series.modes.map(renderShowdownMode).join("")}</div>
      </section>
    `;
  }

  async function initBuildsPage() {
    const root = document.getElementById("builds-page");
    if (!root || !window.BUILDS_DATA) return;

    if (window.loadAbilityCardManifest) {
      await window.loadAbilityCardManifest();
    }
    const disclaimer = root.querySelector(".build-disclaimer");
    if (disclaimer && window.ABILITY_CARD_MANIFEST && Object.keys(window.ABILITY_CARD_MANIFEST).length > 0) {
      disclaimer.hidden = true;
    }

    const templatesEl = document.getElementById("builds-templates");
    const fmeEl = document.getElementById("builds-fme");
    const randomEl = document.getElementById("builds-random");
    const showdownEl = document.getElementById("builds-showdown");

    if (templatesEl) {
      templatesEl.innerHTML = Object.values(window.BUILDS_DATA.templates)
        .map(renderTemplateCard)
        .join("");
    }

    if (fmeEl) {
      fmeEl.innerHTML = window.BUILDS_DATA.fmeEvents.map(renderEventRow).join("");
    }

    if (randomEl && window.BUILDS_DATA.randomSubtypes) {
      randomEl.innerHTML = window.BUILDS_DATA.randomSubtypes
        .map((item) => {
          const templateIds = window.getItemTemplateIds(item);
          const extra = item.extra ? `<p class="build-extra">${escapeHtml(t(item.extra))}</p>` : "";
          return `
            <div class="build-event-item build-event-sub">
              <h4>${escapeHtml(getEventName(item.id))}</h4>
              <p class="build-meta">→ <span class="build-template-links">${renderTemplateLinks(templateIds)}</span></p>
              ${extra}
            </div>
          `;
        })
        .join("");
    }

    if (showdownEl && window.BUILDS_DATA.showdownSeries) {
      showdownEl.innerHTML = window.BUILDS_DATA.showdownSeries.map(renderShowdownSeries).join("");
    }

    renderCardsGallery();
    renderCardsLegend();
    bindInteractions();
    setActiveTemplate(null);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBuildsPage);
  } else {
    initBuildsPage();
  }
})();
