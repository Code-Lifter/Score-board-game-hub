// Avalon — First Night Script (fullscreen + ESC support)
(function () {
  "use strict";

  const qs  = (sel) => document.querySelector(sel);
  const qsa = (sel) => Array.from(document.querySelectorAll(sel));

  function getRolesConfig() {
    const el = document.getElementById("rolesData");
    if (!el) return null;
    try { return JSON.parse(el.textContent); }
    catch (e) { console.error("roles JSON parse failed", e); return null; }
  }

  function collectSelectedRoles() {
    return new Set(qsa('input[name="role"]:checked').map(cb => cb.value));
  }

  function renderList(targetOl, lines) {
    targetOl.innerHTML = "";
    lines.forEach(line => {
      const li = document.createElement("li");
      li.textContent = line;
      targetOl.appendChild(li);
    });
  }

  function buildFirstNight(selected, cfg) {
    const out = [];

    // 1) Base opener
    out.push(...cfg.scriptPieces.baseFirstNight);

    // 2) Evil wake-up (Oberon excluded if present)
    if (selected.has("Oberon")) {
      out.push(...cfg.scriptPieces.evilWakeWithOberon);
    } else {
      out.push(...cfg.scriptPieces.evilWakeNoOberon);
    }
    out.push(...cfg.scriptPieces.evilClose);

    // 3) Merlin’s view (Mordred excluded if present)
    if (selected.has("Merlin")) {
      if (selected.has("Mordred")) {
        out.push(...cfg.scriptPieces.merlinSeesEvilWithMordred);
      } else {
        out.push(...cfg.scriptPieces.merlinSeesEvil);
      }
    }

    // 4) Percival’s info (your preferred thumbs-up phrasing)
    if (selected.has("Percival")) {
      if (selected.has("Morgana")) {
        out.push(...cfg.scriptPieces.percivalBlock);
      } else {
        out.push(...cfg.scriptPieces.percivalOnlyMerlin);
      }
    }

    return out;
  }

  function enterFullscreen() {
    const sec = qs("#firstNightSection");
    if (!sec.classList.contains("fullscreen")) {
      sec.classList.add("fullscreen");
      if (!qs("#exitFullscreenBtn")) {
        const exitBtn = document.createElement("button");
        exitBtn.id = "exitFullscreenBtn";
        exitBtn.textContent = "Exit";
        exitBtn.addEventListener("click", exitFullscreen);
        document.body.appendChild(exitBtn);
      }
    }
  }

  function exitFullscreen() {
    qs("#firstNightSection")?.classList.remove("fullscreen");
    qs("#exitFullscreenBtn")?.remove();
  }

  function init() {
    const cfg = getRolesConfig();
    if (!cfg) return;

    const generateBtn  = qs("#generateFirstNightBtn");
    const resetBtn     = qs("#resetBtn");
    const firstNightOl = qs("#firstNightList");

    generateBtn.addEventListener("click", () => {
      const selected = collectSelectedRoles();
      const lines = buildFirstNight(selected, cfg);
      renderList(firstNightOl, lines);
      enterFullscreen();
    });

    resetBtn.addEventListener("click", () => {
      qs("#roleForm").reset();
      firstNightOl.innerHTML = "";
      exitFullscreen();
    });

    // Keyboard: ESC to exit fullscreen
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") exitFullscreen();
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
