  

const GUEST_FILTER_CATEGORIES = ["venue", "catering", "rentals", "florals"];

  let state = { category: "photography", budget: 3200, guestCount: 100, selectedVendor: null, totalBudget: 30000, categoryBudgets: {} };
  Object.entries(CATEGORIES).forEach(([key, cat]) => state.categoryBudgets[key] = cat.start);

  function renderChipGrid(){
    const grid = document.getElementById("chip-grid");
    grid.innerHTML = "";
    Object.entries(CATEGORIES).forEach(([key, cat]) => {
      const btn = document.createElement("button");
      btn.className = "chip";
      btn.onclick = () => openMatches(key);
      btn.innerHTML = `<span class="name">${cat.label}</span><span class="range">$${cat.min.toLocaleString()} – $${cat.max.toLocaleString()}</span>`;
      grid.appendChild(btn);
    });
  }

  function showScreen(id){
    document.querySelectorAll("main").forEach(m => m.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    window.scrollTo({top:0, behavior:"instant"});
    renderCrumbs();
  }

  function renderCrumbs(){
    const el = document.getElementById("crumbs");
    const active = document.querySelector("main.active").id;
    if(active === "screen-home"){ el.innerHTML = ""; return; }
    if(active === "screen-dashboard"){ el.innerHTML = `<button onclick="goHome()">Home</button><span class="sep">/</span>Budget`; return; }
    const cat = CATEGORIES[state.category];
    if(active === "screen-matches"){
      el.innerHTML = `<button onclick="goHome()">Home</button><span class="sep">/</span><button onclick="openDashboard()">Budget</button><span class="sep">/</span>${cat.label}`;
    } else if(active === "screen-vendor"){
      el.innerHTML = `<button onclick="goHome()">Home</button><span class="sep">/</span><button onclick="openDashboard()">Budget</button><span class="sep">/</span><button onclick="backToMatches()">${cat.label}</button><span class="sep">/</span>${state.selectedVendor.name}`;
    }
  }

  function goHome(){ showScreen("screen-home"); }

  function openDashboard(){
    renderBudgetDashboard();
    showScreen("screen-dashboard");
  }

  function renderBudgetDashboard(){
    document.getElementById("total-budget-amount").textContent = "$" + state.totalBudget.toLocaleString();
    document.getElementById("total-budget-slider").value = state.totalBudget;
    const grid = document.getElementById("budget-grid");
    grid.innerHTML = "";
    Object.entries(CATEGORIES).forEach(([key, cat]) => {
      const card = document.createElement("div");
      card.className = "budget-category";
      const value = state.categoryBudgets[key];
      card.innerHTML = `<div class="budget-category-head"><span class="budget-category-name">${cat.label}</span><span class="budget-category-amount" id="dash-amount-${key}">$${value.toLocaleString()}</span></div><input type="range" min="${cat.min}" max="${cat.max}" step="${cat.step}" value="${value}" data-budget-category="${key}"><div class="budget-category-foot"><span>${cat.vendors.filter(v => v.price <= value).length} vendors in budget</span><button class="view-vendors" onclick="openMatches('${key}')">View vendors →</button></div>`;
      grid.appendChild(card);
    });
    grid.querySelectorAll("input[data-budget-category]").forEach(slider => slider.addEventListener("input", e => {
      const key = e.target.dataset.budgetCategory;
      state.categoryBudgets[key] = Number(e.target.value);
      renderBudgetDashboard();
    }));
    renderAllocationSummary();
  }

  function renderAllocationSummary(){
    const allocated = Object.values(state.categoryBudgets).reduce((sum, n) => sum + n, 0);
    const remaining = state.totalBudget - allocated;
    document.getElementById("allocated-amount").textContent = "$" + allocated.toLocaleString();
    const rem = document.getElementById("remaining-amount");
    rem.textContent = (remaining < 0 ? "−$" + Math.abs(remaining).toLocaleString() : "$" + remaining.toLocaleString());
  }

  function openMatches(categoryKey){
    state.category = categoryKey;
    const cat = CATEGORIES[categoryKey];
    state.budget = state.categoryBudgets[categoryKey] ?? cat.start;

    document.getElementById("matches-kicker").textContent = cat.label;
    document.getElementById("matches-title").textContent = "Set a budget, see who fits it.";

    const slider = document.getElementById("budget-slider");
    slider.min = cat.min; slider.max = cat.max; slider.step = cat.step; slider.value = state.budget;

    const guestField = document.getElementById("guest-field");
    const budgetField = document.getElementById("budget-field");
    const usesGuestFilter = GUEST_FILTER_CATEGORIES.includes(categoryKey);
    guestField.style.display = usesGuestFilter ? "" : "none";
    budgetField.classList.toggle("divided", usesGuestFilter);
    if(usesGuestFilter){
      document.getElementById("guest-slider").value = state.guestCount;
    }

    renderVendorList();
    showScreen("screen-matches");
  }

  function renderVendorList(){
    const cat = CATEGORIES[state.category];
    const usesGuestFilter = GUEST_FILTER_CATEGORIES.includes(state.category);

    document.getElementById("budget-amount").textContent = "$" + Number(state.budget).toLocaleString();
    document.getElementById("guest-amount").textContent = state.guestCount + " guests";

    const fitList = document.getElementById("vendor-list");
    const outList = document.getElementById("vendor-list-out");
    const outSection = document.getElementById("out-section");
    fitList.innerHTML = "";
    outList.innerHTML = "";

    const sorted = [...cat.vendors].sort((a,b) => a.price - b.price);
    let fitCount = 0;

    sorted.forEach(v => {
      const fitsBudget = v.price <= state.budget;
      const fitsGuests = !usesGuestFilter || v.capacity >= state.guestCount;
      const fits = fitsBudget && fitsGuests;
      if(fits) fitCount++;

      let tag = "";
      if(fits){
        tag = '<span class="fits-tag">Fits your budget' + (usesGuestFilter ? " & guest count" : "") + '</span>';
      } else if(fitsBudget && !fitsGuests){
        tag = '<span class="fits-tag out">Too small for your guest count</span>';
      } else if(!fitsBudget && fitsGuests && usesGuestFilter){
        tag = '<span class="fits-tag out">Over budget</span>';
      } else if(!fitsBudget){
        tag = '<span class="fits-tag out">Over budget</span>';
      }

      const card = document.createElement("button");
      card.className = "vendor-card" + (fits ? "" : " out-of-budget");
      card.onclick = () => openVendor(v);
      card.innerHTML = `
        <div>
          <div class="vname">${v.name}</div>
          <div class="vblurb">${v.blurb}</div>
          ${usesGuestFilter && v.capacity ? `<span class="vcap">Up to ${v.capacity} guests</span>` : ""}
          ${tag}
        </div>
        <div class="vprice-col">
          <div class="vprice">$${v.price.toLocaleString()}</div>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      `;

      if(fits){
        fitList.appendChild(card);
      } else {
        outList.appendChild(card);
      }
    });

    const outCount = sorted.length - fitCount;
    outSection.style.display = outCount > 0 ? "" : "none";
    document.getElementById("out-heading").textContent = `Outside this budget (${outCount})`;

    const guestNote = usesGuestFilter ? ` for ${state.guestCount} guests` : "";
    document.getElementById("match-count").innerHTML = `<strong>${fitCount} of ${sorted.length}</strong> ${cat.label.toLowerCase()} vendors fit this budget${guestNote}.`;
  }

  document.getElementById("budget-slider").addEventListener("input", (e) => {
    state.budget = Number(e.target.value);
    state.categoryBudgets[state.category] = state.budget;
    renderVendorList();
  });

  document.getElementById("total-budget-slider").addEventListener("input", (e) => {
    state.totalBudget = Number(e.target.value);
    renderBudgetDashboard();
  });

  document.getElementById("guest-slider").addEventListener("input", (e) => {
    state.guestCount = Number(e.target.value);
    renderVendorList();
  });

  function openVendor(vendor){
    state.selectedVendor = vendor;
    const cat = CATEGORIES[state.category];
    document.getElementById("vendor-cat").textContent = cat.label;
    document.getElementById("vendor-name").textContent = vendor.name;
    document.getElementById("vendor-blurb").textContent = vendor.blurb;

    const base = Math.round(vendor.price * 0.85);
    const addOn = vendor.price - base;
    const linesEl = document.getElementById("price-lines");
    linesEl.innerHTML = `
      <div class="price-line"><span class="item">Base package</span><span>$${base.toLocaleString()}</span></div>
      <div class="price-line"><span class="item">Travel & add-ons</span><span>$${addOn.toLocaleString()}</span></div>
    `;
    document.getElementById("vendor-total").textContent = "$" + vendor.price.toLocaleString();

    showScreen("screen-vendor");
  }

  function backToMatches(){
    renderVendorList();
    showScreen("screen-matches");
  }

  renderChipGrid();
