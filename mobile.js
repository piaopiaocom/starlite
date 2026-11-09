(function () {
  var MQ = "(max-width: 1100px)";
  var header = document.querySelector(".header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = header && header.querySelector(".nav");
  if (!header || !toggle || !nav) return;

  var overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  overlay.setAttribute("hidden", "");
  header.insertAdjacentElement("afterend", overlay);

  nav.querySelectorAll(":scope > li").forEach(function (item) {
    var dropdown = item.querySelector(":scope > .nav-dropdown");
    if (!dropdown) return;
    var btn = document.createElement("button");
    btn.className = "nav-sub-toggle";
    btn.type = "button";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "展开子菜单");
    item.appendChild(btn);
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var open = item.classList.contains("is-sub-open");
      nav.querySelectorAll(":scope > li.is-sub-open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-sub-open");
          var otherBtn = other.querySelector(".nav-sub-toggle");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("is-sub-open", !open);
      btn.setAttribute("aria-expanded", String(!open));
    });
  });

  function resetSubs() {
    nav.querySelectorAll(":scope > li.is-sub-open").forEach(function (item) {
      item.classList.remove("is-sub-open");
      var btn = item.querySelector(".nav-sub-toggle");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  function closeNav() {
    header.classList.remove("is-nav-open");
    document.body.classList.remove("is-nav-lock");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "打开菜单");
    overlay.setAttribute("hidden", "");
    resetSubs();
  }

  function openNav() {
    header.classList.add("is-nav-open");
    document.body.classList.add("is-nav-lock");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "关闭菜单");
    overlay.removeAttribute("hidden");
  }

  toggle.addEventListener("click", function () {
    if (header.classList.contains("is-nav-open")) closeNav();
    else openNav();
  });
  overlay.addEventListener("click", closeNav);
  nav.addEventListener("click", function (e) {
    if (e.target.closest(".nav-sub-toggle")) return;
    if (e.target.closest("a")) closeNav();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });
  window.addEventListener("resize", function () {
    if (!window.matchMedia(MQ).matches) closeNav();
  });
})();

/* 产品中心：手机端把标注点转为大图下方的横滑部件卡片（仅 ≤768px 显示，由 CSS 控制） */
(function () {
  var explorers = document.querySelectorAll(".fields-explorer");
  if (!explorers.length) return;
  explorers.forEach(function (root) {
    var stage = root.querySelector(".fields-explorer-stage");
    var pins = root.querySelectorAll(".fields-pin");
    if (!stage || !pins.length) return;
    /* 标题/描述移到图片上方，避免覆盖图片（桌面端样式由 CSS 媒体查询恢复绝对定位） */
    var head = root.querySelector(".fields-spotlight-head");
    if (head) root.insertBefore(head, stage);
    var strip = document.createElement("div");
    strip.className = "fields-cards" + (pins.length <= 2 ? " fields-cards--fill" : "");
    strip.setAttribute("aria-label", "部件列表");
    pins.forEach(function (pin) {
      var img = pin.querySelector("img");
      var nameEl = pin.querySelector(".fields-pin-name");
      var name = nameEl ? nameEl.textContent.trim() : "";
      var card = document.createElement("button");
      card.type = "button";
      card.className = "fields-card";
      if (img) {
        var pic = document.createElement("img");
        pic.loading = "lazy";
        pic.src = img.getAttribute("src");
        pic.alt = "";
        card.appendChild(pic);
      }
      var label = document.createElement("span");
      label.textContent = name;
      card.appendChild(label);
      if (img) {
        card.addEventListener("click", function () {
          var box = document.getElementById("fieldsLightbox");
          if (!box) return;
          var boxImg = box.querySelector("img");
          boxImg.src = img.getAttribute("src");
          boxImg.alt = name;
          box.removeAttribute("hidden");
          box.classList.add("is-open");
          document.body.style.overflow = "hidden";
        });
      }
      strip.appendChild(card);
    });
    stage.insertAdjacentElement("afterend", strip);
  });

  /* 模具开发制作：主图下方生成同款横滑卡片，点击转发到原按钮（复用其 lightbox 逻辑） */
  var moldCluster = document.querySelector(".mold-cluster");
  var moldSubject = moldCluster && moldCluster.querySelector(".mold-subject");
  var moldPins = moldCluster ? moldCluster.querySelectorAll(".mold-pin") : [];
  if (moldCluster && moldSubject && moldPins.length) {
    var moldStrip = document.createElement("div");
    moldStrip.className = "fields-cards";
    moldStrip.setAttribute("aria-label", "模具开发制作环节");
    moldPins.forEach(function (pin) {
      var img = pin.querySelector("img");
      var nameEl = pin.querySelector(".mold-pin-name");
      var name = nameEl ? nameEl.textContent.trim() : "";
      var card = document.createElement("button");
      card.type = "button";
      card.className = "fields-card";
      if (img) {
        var pic = document.createElement("img");
        pic.loading = "lazy";
        pic.src = img.getAttribute("src");
        pic.alt = "";
        card.appendChild(pic);
      }
      var label = document.createElement("span");
      label.textContent = name;
      card.appendChild(label);
      card.addEventListener("click", function () { pin.click(); });
      moldStrip.appendChild(card);
    });
    moldCluster.appendChild(moldStrip);
  }
})();
(function () {
  var cols = document.querySelectorAll(".footer-col");
  if (!cols.length) return;
  cols.forEach(function (col) {
    var h4 = col.querySelector("h4");
    var list = col.querySelector("ul");
    if (!h4 || !list) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "footer-col-toggle";
    btn.setAttribute("aria-expanded", "false");
    while (h4.firstChild) btn.appendChild(h4.firstChild);
    h4.appendChild(btn);
    btn.addEventListener("click", function () {
      var open = col.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });
})();
(function () {
  var mq = window.matchMedia("(max-width: 768px)");
  var root = document.querySelector("#sustain");
  if (!root) return;
  var built = false;
  var bodies = [];
  function bind(trigger, body) {
    bodies.push(body);
    trigger.classList.add("sustain-toggle");
    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("aria-expanded", "false");
    function toggle() {
      var open = trigger.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(open));
      body.style.maxHeight = open ? body.scrollHeight + "px" : "0px";
    }
    trigger.addEventListener("click", toggle);
    trigger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  }
  function build() {
    if (built) return;
    built = true;
    root.querySelectorAll(".sustain-env-item").forEach(function (item) {
      var h5 = item.querySelector("h5");
      var p = item.querySelector("p");
      if (!h5 || !p) return;
      var body = document.createElement("div");
      body.className = "sustain-toggle-body";
      p.parentNode.insertBefore(body, p);
      body.appendChild(p);
      bind(h5, body);
    });
    root.querySelectorAll(".sustain-col").forEach(function (col) {
      if (col.querySelector(".sustain-env-item")) return;
      var title = col.querySelector(".sustain-col-title");
      if (!title) return;
      var body = document.createElement("div");
      body.className = "sustain-toggle-body";
      var node = title.nextElementSibling;
      title.parentNode.insertBefore(body, title.nextSibling);
      while (node) {
        var next = node.nextElementSibling;
        body.appendChild(node);
        node = next;
      }
      bind(title, body);
    });
  }
  function release() {
    bodies.forEach(function (body) {
      body.style.maxHeight = "";
    });
  }
  if (mq.matches) build();
  var sub = root.querySelector(".sustain-head .sustain-module-sub, .sustain-report-actions .sustain-module-sub");
  var actions = root.querySelector(".sustain-report-actions");
  var subHome = null;
  function placeSub(enabled) {
    if (!sub || !actions) return;
    if (enabled) {
      if (!subHome) subHome = { parent: sub.parentNode, next: sub.nextSibling };
      if (sub.parentNode !== actions) actions.insertBefore(sub, actions.firstChild);
    } else if (subHome && sub.parentNode === actions) {
      subHome.parent.insertBefore(sub, subHome.next);
    }
  }
  placeSub(mq.matches);
  var onChange = function (e) {
    placeSub(e.matches);
    if (e.matches) build();
    else release();
  };
  if (mq.addEventListener) mq.addEventListener("change", onChange);
  else if (mq.addListener) mq.addListener(onChange);
})();
(function () {
  // 咨询类型：手机端换成短文案，避免原生下拉框内文字被截断
  var mq = window.matchMedia("(max-width: 768px)");
  var select = document.querySelector("#msg-type");
  if (!select) return;
  var short = {
    thermosetting: "产品咨询（汽车、办公、医疗等）",
    thermoplastic: "产品咨询（电梯、船舶、压缩机等）"
  };
  var full = {};
  Array.prototype.forEach.call(select.options, function (opt) {
    if (!Object.prototype.hasOwnProperty.call(short, opt.value)) return;
    full[opt.value] = opt.textContent;
  });
  function apply(enabled) {
    Array.prototype.forEach.call(select.options, function (opt) {
      if (!Object.prototype.hasOwnProperty.call(short, opt.value)) return;
      opt.textContent = enabled ? short[opt.value] : full[opt.value];
    });
  }
  apply(mq.matches);
  var onChange = function (e) { apply(e.matches); };
  if (mq.addEventListener) mq.addEventListener("change", onChange);
  else if (mq.addListener) mq.addListener(onChange);
})();
