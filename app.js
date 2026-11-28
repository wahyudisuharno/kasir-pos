const API_URL =
  "https://script.google.com/macros/s/AKfycbx6fnbbrFEbkxsqLElTrbOi6ujwbsPfLvgE9bTRDTzEHBajr-yVHSwPO6kPp-QAnvO_/exec";
const PAYMENT_STORAGE_KEY = "omah_oelin_payment_methods_v1";
const BIZ_PROFILE_STORAGE_KEY = "omah_oelin_biz_profile_v1";

const DEFAULT_BIZ_PROFILE = {
  nama_usaha: "Omah Oelin Digital Printing",
  alamat_usaha:
    "Kitren, RT.23/RW.05, 593, Prenggan, Kec. Kotagede, Yogyakarta 55172",
  no_hp_usaha: "",
  logo_data_url: ""
};

const KNOWN_CATEGORIES = [
  "Banner",
  "Cetak A3",
  "Merchandise",
  "Kalender",
  "Stationery",
  "Jasa"
];

const PROD_STATUSES = [
  "ANTRE_DESAIN",
  "PROSES_CETAK",
  "FINISHING",
  "SIAP_AMBIL",
  "SELESAI"
];

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Ags", "Sep", "Okt", "Nov", "Des"
];

const UNIT_LABELS = {
  LUAS_M2: "m²",
  QTY_SATUAN: "pcs",
  LEMBAR: "lembar",
  PACK: "pack",
  BOX: "box",
  PAKET: "paket"
};

const DEFAULT_KATALOG = [
  {
    id_produk: "PRD-001",
    kategori: "Banner",
    nama_produk: "Banner Frontlite 280gr",
    tipe_hitung: "LUAS_M2",
    harga_dasar: 25000,
    harga_grosir_min10: 22000,
    id_bahan_terkait: "BHN-FR280"
  },
  {
    id_produk: "PRD-002",
    kategori: "Banner",
    nama_produk: "Banner Korcin / Backlite",
    tipe_hitung: "LUAS_M2",
    harga_dasar: 35000,
    harga_grosir_min10: 32000,
    id_bahan_terkait: ""
  },
  {
    id_produk: "PRD-003",
    kategori: "Cetak A3",
    nama_produk: "Cetak A3+ Art Carton 260gr",
    tipe_hitung: "LEMBAR",
    harga_dasar: 4500,
    harga_grosir_min10: 3800,
    id_bahan_terkait: "BHN-AC260"
  },
  {
    id_produk: "PRD-004",
    kategori: "Merchandise",
    nama_produk: "Mug Keramik Custom",
    tipe_hitung: "QTY_SATUAN",
    harga_dasar: 18000,
    harga_grosir_min10: 15000,
    id_bahan_terkait: "BHN-MUG-01"
  },
  {
    id_produk: "PRD-005",
    kategori: "Merchandise",
    nama_produk: "Tumbler Custom Grafir/Print",
    tipe_hitung: "QTY_SATUAN",
    harga_dasar: 45000,
    harga_grosir_min10: 40000,
    id_bahan_terkait: ""
  },
  {
    id_produk: "PRD-006",
    kategori: "Merchandise",
    nama_produk: "Kaos Custom Sablon DTF",
    tipe_hitung: "QTY_SATUAN",
    harga_dasar: 55000,
    harga_grosir_min10: 48000,
    id_bahan_terkait: ""
  },
  {
    id_produk: "PRD-007",
    kategori: "Merchandise",
    nama_produk: "Mangkuk Souvenir Custom",
    tipe_hitung: "BOX",
    harga_dasar: 180000,
    harga_grosir_min10: 165000,
    id_bahan_terkait: ""
  },
  {
    id_produk: "PRD-008",
    kategori: "Kalender",
    nama_produk: "Kalender Dinding Custom",
    tipe_hitung: "PACK",
    harga_dasar: 110000,
    harga_grosir_min10: 95000,
    id_bahan_terkait: ""
  },
  {
    id_produk: "PRD-009",
    kategori: "Stationery",
    nama_produk: "Nota / Map / ID Card / Kop Surat",
    tipe_hitung: "PACK",
    harga_dasar: 45000,
    harga_grosir_min10: 40000,
    id_bahan_terkait: ""
  },
  {
    id_produk: "PRD-010",
    kategori: "Jasa",
    nama_produk: "Jasa Desain Grafis & Layout",
    tipe_hitung: "PAKET",
    harga_dasar: 35000,
    harga_grosir_min10: 0,
    id_bahan_terkait: ""
  }
];

const DEFAULT_STOK = [
  {
    id_bahan: "BHN-FR280",
    nama_bahan: "Bahan Banner Frontlite 280gr",
    satuan_stok: "m2",
    stok_saat_ini: 60,
    batas_minimum: 15
  },
  {
    id_bahan: "BHN-AC260",
    nama_bahan: "Kertas Art Carton 260gr A3+",
    satuan_stok: "lembar",
    stok_saat_ini: 250,
    batas_minimum: 50
  },
  {
    id_bahan: "BHN-MUG-01",
    nama_bahan: "Mug Polos Coating SNI",
    satuan_stok: "pcs",
    stok_saat_ini: 36,
    batas_minimum: 10
  }
];

const DEFAULT_PAYMENT_METHODS = [
  {
    id: "PAYM-1",
    kanal: "Transfer Bank",
    nomor: "Silakan isi no. rekening di tab Keuangan & Kas",
    atas_nama: "",
    aktif: true
  }
];

const $ = (id) => document.getElementById(id);

async function postApi(payload) {
  if (!API_URL) return null;
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

function loadBizProfile() {
  try {
    const raw = localStorage.getItem(BIZ_PROFILE_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_BIZ_PROFILE };
    const p = JSON.parse(raw);
    return {
      nama_usaha: String(p.nama_usaha || DEFAULT_BIZ_PROFILE.nama_usaha).trim()
        || DEFAULT_BIZ_PROFILE.nama_usaha,
      alamat_usaha: String(p.alamat_usaha || DEFAULT_BIZ_PROFILE.alamat_usaha).trim()
        || DEFAULT_BIZ_PROFILE.alamat_usaha,
      no_hp_usaha: String(p.no_hp_usaha || "").trim(),
      logo_data_url: String(p.logo_data_url || "")
    };
  } catch {
    return { ...DEFAULT_BIZ_PROFILE };
  }
}

function saveBizProfileToStorage() {
  localStorage.setItem(BIZ_PROFILE_STORAGE_KEY, JSON.stringify(state.bizProfile));
}

function loadPaymentMethods() {
  try {
    const raw = localStorage.getItem(PAYMENT_STORAGE_KEY);
    if (!raw) return [...DEFAULT_PAYMENT_METHODS];
    const p = JSON.parse(raw);
    return Array.isArray(p) ? p : [...DEFAULT_PAYMENT_METHODS];
  } catch {
    return [...DEFAULT_PAYMENT_METHODS];
  }
}

function savePaymentMethods() {
  localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(state.paymentMethods));
}

const state = {
  bizProfile: loadBizProfile(),
  draftLogoUrl: loadBizProfile().logo_data_url,
  katalog: [...DEFAULT_KATALOG],
  stok: [...DEFAULT_STOK],
  paymentMethods: loadPaymentMethods(),
  cart: [],
  orders: [],
  details: [],
  pembayaran: [],
  activeNota: null,
  activeWaTemplate: "konfirmasi",
  defaultPageTitle: "",
  katalogPage: 1,
  katalogPageSize: 5,
  katalogShowAll: false
};

const fmtNum = (n) => Math.max(0, Math.round(Number(n || 0))).toLocaleString("id-ID");
const fmtRp = (n) => "Rp " + fmtNum(n);
const normCat = (val) => String(val || "").trim().toLowerCase().replace(/\s+/g, " ");

function formatCategoryLabel(rawCat) {
  const clean = String(rawCat || "").trim();
  if (!clean) return "Lainnya";
  const matched = KNOWN_CATEGORIES.find((k) => normCat(k) === normCat(clean));
  return matched || clean;
}

function sanitizeFilePart(str, fallback = "") {
  return String(str || "")
    .trim()
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || fallback;
}

function buildPdfFilenameBase(order) {
  const invPart = sanitizeFilePart(order && order.no_nota, "INV");
  const custPart = sanitizeFilePart(order && order.nama_pelanggan, "Pelanggan");
  return `${invPart}-${custPart}`;
}

function getInitials(name) {
  const words = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "OO";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function renderLogoBox(containerEl, logoDataUrl, businessName) {
  if (!containerEl) return;
  if (logoDataUrl) {
    containerEl.innerHTML = `<img src="${logoDataUrl}" alt="Logo ${businessName}" />`;
  } else {
    containerEl.textContent = getInitials(businessName);
  }
}

function applyPhoneText(el, phoneVal) {
  if (!el) return;
  const clean = String(phoneVal || "").trim();
  if (clean) {
    el.textContent = `HP / WA: ${clean}`;
    el.classList.remove("hidden");
  } else {
    el.textContent = "";
    el.classList.add("hidden");
  }
}

function applyBizProfileUI() {
  const bizName = state.bizProfile.nama_usaha || DEFAULT_BIZ_PROFILE.nama_usaha;
  const bizAddress = state.bizProfile.alamat_usaha || DEFAULT_BIZ_PROFILE.alamat_usaha;
  const bizPhone = state.bizProfile.no_hp_usaha || "";
  const logoUrl = state.bizProfile.logo_data_url || "";

  state.defaultPageTitle = `${bizName} — POS & Order`;
  document.title = state.defaultPageTitle;
  $("headerBusinessName").textContent = bizName;
  $("headerBusinessAddress").textContent = bizAddress;
  applyPhoneText($("headerBusinessPhone"), bizPhone);

  $("notaBusinessName").textContent = bizName;
  $("notaBusinessAddress").textContent = bizAddress;
  applyPhoneText($("notaBusinessPhone"), bizPhone);

  renderLogoBox($("headerLogoBox"), logoUrl, bizName);
  renderLogoBox($("notaLogoBox"), logoUrl, bizName);

  $("bizNameInput").value = bizName;
  $("bizAddressInput").value = bizAddress;
  $("bizPhoneInput").value = bizPhone;
  state.draftLogoUrl = logoUrl;
  renderLogoBox($("bizLogoPreviewThumb"), state.draftLogoUrl, bizName);

  if (state.activeNota) {
    $("waPreviewText").value = buildWaMessage(state.activeNota, state.activeWaTemplate);
  }
}

function compressImageToDataUrl(file, maxSize = 220) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const ratio = Math.min(maxSize / img.width, maxSize / img.height, 1);
        const w = Math.max(1, Math.round(img.width * ratio));
        const h = Math.max(1, Math.round(img.height * ratio));
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/png", 0.9));
      };
      img.onerror = reject;
      img.src = ev.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function bindBizProfileEvents() {
  $("bizLogoFile").addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      state.draftLogoUrl = await compressImageToDataUrl(file, 220);
      const name = $("bizNameInput").value.trim() || state.bizProfile.nama_usaha;
      renderLogoBox($("bizLogoPreviewThumb"), state.draftLogoUrl, name);
    } catch {
      alert("Gagal memuat file logo.");
    }
  });

  $("btnRemoveBizLogo").addEventListener("click", () => {
    state.draftLogoUrl = "";
    $("bizLogoFile").value = "";
    const name = $("bizNameInput").value.trim() || state.bizProfile.nama_usaha;
    renderLogoBox($("bizLogoPreviewThumb"), "", name);
  });

  $("btnResetBizProfile").addEventListener("click", () => {
    state.bizProfile = { ...DEFAULT_BIZ_PROFILE };
    state.draftLogoUrl = "";
    $("bizLogoFile").value = "";
    saveBizProfileToStorage();
    applyBizProfileUI();
    setupPWA();
  });

  $("formBusinessProfile").addEventListener("submit", (e) => {
    e.preventDefault();
    state.bizProfile = {
      nama_usaha: $("bizNameInput").value.trim() || DEFAULT_BIZ_PROFILE.nama_usaha,
      alamat_usaha: $("bizAddressInput").value.trim() || DEFAULT_BIZ_PROFILE.alamat_usaha,
      no_hp_usaha: $("bizPhoneInput").value.trim(),
      logo_data_url: state.draftLogoUrl || ""
    };
    saveBizProfileToStorage();
    applyBizProfileUI();
    setupPWA();
    alert("Identitas usaha (nama, alamat, kontak & logo) berhasil disimpan.");
  });
}

function parseMoney(rawVal) {
  if (typeof rawVal === "number") return Math.max(0, Math.round(rawVal));
  const digits = String(rawVal || "").replace(/\D/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

function setMoneyInput(elOrId, numVal) {
  const el = typeof elOrId === "string" ? $(elOrId) : elOrId;
  if (el) el.value = fmtNum(numVal);
}

function getMoneyInput(elOrId) {
  const el = typeof elOrId === "string" ? $(elOrId) : elOrId;
  return el ? parseMoney(el.value) : 0;
}

function bindMoneyInputs() {
  document.querySelectorAll(".money-input").forEach((input) => {
    input.addEventListener("input", () => {
      input.value = fmtNum(parseMoney(input.value));
    });
    input.addEventListener("focus", () => {
      if (parseMoney(input.value) === 0) input.select();
    });
  });
}

function getUnitLabel(tipeHitung) {
  return UNIT_LABELS[String(tipeHitung || "").toUpperCase()] || "pcs";
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function getLocalDateParts(d = new Date()) {
  return {
    year: String(d.getFullYear()),
    month: pad2(d.getMonth() + 1),
    day: pad2(d.getDate()),
    hour: pad2(d.getHours()),
    minute: pad2(d.getMinutes()),
    second: pad2(d.getSeconds())
  };
}

function formatLocalDateTime(d = new Date()) {
  const p = getLocalDateParts(d);
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`;
}

function formatDateTimeLocalInput(d = new Date()) {
  const p = getLocalDateParts(d);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

function formatDateInput(d = new Date()) {
  const p = getLocalDateParts(d);
  return `${p.year}-${p.month}-${p.day}`;
}

function formatMonthInput(d = new Date()) {
  const p = getLocalDateParts(d);
  return `${p.year}-${p.month}`;
}

function setDefaultDateTimeInputs(now = new Date()) {
  if ($("deadlineInput")) $("deadlineInput").value = formatDateTimeLocalInput(now);
  if ($("filterTanggalKas")) $("filterTanggalKas").value = formatDateInput(now);
  if ($("filterBulanKas")) $("filterBulanKas").value = formatMonthInput(now);
}

function initTheme() {
  const saved = localStorage.getItem("pos_theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  $("btnTheme").textContent = saved === "dark" ? "Mode Terang" : "Mode Gelap";
}

function bindTabsAndTheme() {
  $("btnTheme").addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("pos_theme", next);
    $("btnTheme").textContent = next === "dark" ? "Mode Terang" : "Mode Gelap";
  });

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.getAttribute("data-tab");
      ["pos", "orders", "inventory", "finance"].forEach((tab) => {
        $(`tab-${tab}`).classList.toggle("hidden", target !== tab);
      });
      if (target === "orders") renderOrdersTable();
      if (target === "inventory") renderInventoryTab();
      if (target === "finance") renderFinanceTab();
    });
  });
}

function getFilteredProdukByKategori() {
  const cat = $("kategoriFilter").value;
  const activeList = state.katalog.filter((p) => p.aktif !== false);
  if (cat === "ALL") return activeList;
  return activeList.filter((p) => normCat(p.kategori) === normCat(cat));
}

function populateProdukSelect() {
  const cat = $("kategoriFilter").value;
  const sel = $("produkSelect");
  const filtered = getFilteredProdukByKategori();

  if (filtered.length === 0) {
    sel.innerHTML = `<option value="">-- Belum ada produk di kategori ${cat} --</option>`;
    sel.disabled = true;
    $("btnAddItem").disabled = true;
    $("bannerDimsBox").classList.add("hidden");
    $("qtyLabel").textContent = "Jumlah";
    $("hargaLabel").textContent = "Harga Satuan (Rp)";
    setMoneyInput("hargaOverride", 0);
    $("itemCalcDesc").textContent = `Tidak ada layanan/produk untuk kategori ${cat}`;
    $("itemCalcTotal").textContent = "Rp 0";
    return;
  }

  sel.disabled = false;
  $("btnAddItem").disabled = false;
  sel.innerHTML = filtered.map((p) => {
    const unit = getUnitLabel(p.tipe_hitung);
    return `<option value="${p.id_produk}">${p.nama_produk} • ${fmtRp(p.harga_dasar)}/${unit}</option>`;
  }).join("");

  syncSelectedProductFields();
}

function getSelectedProduct() {
  const filtered = getFilteredProdukByKategori();
  if (filtered.length === 0) return null;
  const id = $("produkSelect").value;
  return filtered.find((p) => p.id_produk === id) || filtered[0];
}

function syncSelectedProductFields() {
  const prod = getSelectedProduct();
  if (!prod) return;
  const unitLabel = getUnitLabel(prod.tipe_hitung);
  const qty = Math.max(1, Number($("qtyInput").value || 1));
  const useGrosir = prod.tipe_hitung !== "LUAS_M2"
    && qty >= 10
    && Number(prod.harga_grosir_min10) > 0;
  const defaultPrice = useGrosir ? Number(prod.harga_grosir_min10) : Number(prod.harga_dasar);

  $("qtyLabel").textContent = `Jumlah (${unitLabel})`;
  $("hargaLabel").textContent = `Harga per ${unitLabel} (Rp)`;
  setMoneyInput("hargaOverride", defaultPrice);
  $("bannerDimsBox").classList.toggle("hidden", prod.tipe_hitung !== "LUAS_M2");
  updateItemPreview();
}

function computeItemTotal(prod, qty, panjangCm, lebarCm, hargaSatuan) {
  const unitLabel = getUnitLabel(prod.tipe_hitung);
  if (prod.tipe_hitung === "LUAS_M2") {
    const rawM2 = (Number(panjangCm || 0) * Number(lebarCm || 0)) / 10000;
    const billedM2 = Math.max(1, rawM2);
    const m2Fmt = billedM2.toFixed(2).replace(".", ",");
    return {
      total: Math.round(billedM2 * qty * hargaSatuan),
      desc: `${panjangCm}x${lebarCm} cm (${m2Fmt} m² bayar) × ${qty} × ${fmtRp(hargaSatuan)}`
    };
  }
  return {
    total: Math.round(qty * hargaSatuan),
    desc: `${qty} ${unitLabel} × ${fmtRp(hargaSatuan)}`
  };
}

function updateItemPreview() {
  const prod = getSelectedProduct();
  if (!prod) return;
  const qty = Math.max(1, Number($("qtyInput").value || 1));
  const p = Number($("panjangCm").value || 0);
  const l = Number($("lebarCm").value || 0);
  const harga = getMoneyInput("hargaOverride");
  const calc = computeItemTotal(prod, qty, p, l, harga);
  $("itemCalcDesc").textContent = calc.desc;
  $("itemCalcTotal").textContent = fmtRp(calc.total);
}

function renderCart() {
  const tbody = $("cartBody");
  if (state.cart.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-cell">Belum ada item ditambahkan</td></tr>';
    return;
  }
  tbody.innerHTML = state.cart.map((item, idx) => `
    <tr>
      <td><strong>${item.nama_item_snapshot}</strong></td>
      <td>${item.spesifikasi_catatan}</td>
      <td>${item.qty} ${getUnitLabel(item.tipe_hitung)}</td>
      <td>${fmtRp(item.total_harga_item)}</td>
      <td><button class="btn btn-sm" onclick="removeCartItem(${idx})">Hapus</button></td>
    </tr>
  `).join("");
}

window.removeCartItem = function (idx) {
  state.cart.splice(idx, 1);
  renderCart();
  updateSummary();
};

function updateSummary() {
  const subtotal = state.cart.reduce((acc, it) => acc + Number(it.total_harga_item || 0), 0);
  const desain = getMoneyInput("biayaDesain");
  const diskon = getMoneyInput("diskonInput");
  const grandTotal = Math.max(0, subtotal + desain - diskon);
  const bayar = Math.min(grandTotal, getMoneyInput("nominalBayar"));
  const sisa = Math.max(0, grandTotal - bayar);

  $("sumSubtotal").textContent = fmtRp(subtotal);
  $("sumDesain").textContent = fmtRp(desain);
  $("sumDiskon").textContent = "- " + fmtRp(diskon);
  $("sumGrandTotal").textContent = fmtRp(grandTotal);
  $("sumBayar").textContent = fmtRp(bayar);
  $("sumSisa").textContent = fmtRp(sisa);

  return { subtotal, desain, diskon, grandTotal, bayar, sisa };
}

function buildLocalNotaNumber() {
  const d = new Date();
  const p = getLocalDateParts(d);
  return `INV-${p.year}${p.month}${p.day}-${String(state.orders.length + 1).padStart(3, "0")}`;
}

function deductLocalStock(items) {
  items.forEach((it) => {
    if (!it.id_bahan_terkait) return;
    const st = state.stok.find((s) => s.id_bahan === it.id_bahan_terkait);
    if (!st) return;
    const m2 = Math.max(1, (Number(it.panjang_cm || 0) * Number(it.lebar_cm || 0)) / 10000);
    const used = it.tipe_hitung === "LUAS_M2" ? m2 * Number(it.qty || 1) : Number(it.qty || 1);
    st.stok_saat_ini = Math.max(0, Number((Number(st.stok_saat_ini || 0) - used).toFixed(2)));
  });
}

function bindPosEvents() {
  $("kategoriFilter").addEventListener("change", populateProdukSelect);
  $("produkSelect").addEventListener("change", syncSelectedProductFields);
  $("qtyInput").addEventListener("input", () => {
    const prod = getSelectedProduct();
    const qty = Math.max(1, Number($("qtyInput").value || 1));
    if (prod && prod.tipe_hitung !== "LUAS_M2") {
      const useGrosir = qty >= 10 && Number(prod.harga_grosir_min10) > 0;
      const price = useGrosir ? Number(prod.harga_grosir_min10) : Number(prod.harga_dasar);
      setMoneyInput("hargaOverride", price);
    }
    updateItemPreview();
  });
  ["panjangCm", "lebarCm", "hargaOverride"].forEach((id) => {
    $(id).addEventListener("input", updateItemPreview);
  });

  $("btnAddItem").addEventListener("click", () => {
    const prod = getSelectedProduct();
    if (!prod) return;
    const qty = Math.max(1, Number($("qtyInput").value || 1));
    const isArea = prod.tipe_hitung === "LUAS_M2";
    const p = isArea ? Number($("panjangCm").value || 0) : 0;
    const l = isArea ? Number($("lebarCm").value || 0) : 0;
    const harga = getMoneyInput("hargaOverride");
    const fallbackSpec = isArea ? `${p}x${l} cm` : "-";
    const spec = $("spesifikasiInput").value.trim() || fallbackSpec;
    const calc = computeItemTotal(prod, qty, p, l, harga);

    state.cart.push({
      id_produk: prod.id_produk,
      kategori: formatCategoryLabel(prod.kategori),
      nama_item_snapshot: prod.nama_produk,
      tipe_hitung: prod.tipe_hitung,
      id_bahan_terkait: prod.id_bahan_terkait || "",
      panjang_cm: p,
      lebar_cm: l,
      qty,
      spesifikasi_catatan: spec,
      harga_satuan: harga,
      total_harga_item: calc.total
    });

    $("spesifikasiInput").value = "";
    renderCart();
    updateSummary();
  });

  $("btnClearCart").addEventListener("click", () => {
    state.cart = [];
    renderCart();
    updateSummary();
  });

  ["biayaDesain", "diskonInput", "nominalBayar"].forEach((id) => {
    $(id).addEventListener("input", updateSummary);
  });

  $("btnSaveOrder").addEventListener("click", async () => {
    if (state.cart.length === 0) {
      alert("Tambahkan minimal 1 item ke nota terlebih dahulu.");
      return;
    }
    const nama = $("namaPelanggan").value.trim();
    if (!nama) {
      alert("Nama pelanggan wajib diisi.");
      return;
    }

    const sum = updateSummary();
    const statusBayar = sum.bayar >= sum.grandTotal && sum.grandTotal > 0
      ? "LUNAS"
      : (sum.bayar > 0 ? "DP" : "BELUM_BAYAR");
    const nowObj = new Date();
    const nowStr = formatLocalDateTime(nowObj);
    const deadlineRaw = $("deadlineInput").value || formatDateTimeLocalInput(nowObj);

    const payload = {
      no_nota: buildLocalNotaNumber(),
      tanggal_order: nowStr,
      deadline: deadlineRaw.replace("T", " "),
      nama_pelanggan: nama,
      no_wa: $("noWa").value.trim(),
      subtotal: sum.subtotal,
      biaya_desain: sum.desain,
      diskon: sum.diskon,
      grand_total: sum.grandTotal,
      nominal_bayar: sum.bayar,
      sisa_tagihan: sum.sisa,
      status_bayar: statusBayar,
      metode_bayar: $("metodeBayar").value,
      status_produksi: "ANTRE_DESAIN",
      items: [...state.cart]
    };

    if (API_URL) {
      try {
        const json = await postApi({ action: "createOrder", ...payload });
        if (!json.ok) throw new Error(json.error);
        if (json.data && json.data.no_nota) payload.no_nota = json.data.no_nota;
      } catch (err) {
        alert("Gagal kirim ke Google Sheets: " + err.message);
        return;
      }
    } else {
      deductLocalStock(payload.items);
    }

    if (Number(payload.nominal_bayar) > 0) {
      state.pembayaran.unshift({
        id_bayar: "PAY-" + Date.now().toString().slice(-6),
        no_nota: payload.no_nota,
        tanggal_bayar: nowStr,
        jenis_bayar: statusBayar === "LUNAS" ? "LUNAS_LANGSUNG" : "DP",
        nominal: Number(payload.nominal_bayar),
        metode: payload.metode_bayar
      });
    }

    state.orders.unshift(payload);
    payload.items.forEach((it) => state.details.push({ ...it, no_nota: payload.no_nota }));

    openNotaModal(payload, "konfirmasi");
    state.cart = [];
    renderCart();
    $("namaPelanggan").value = "";
    $("noWa").value = "";
    setDefaultDateTimeInputs(new Date());
    setMoneyInput("biayaDesain", 0);
    setMoneyInput("diskonInput", 0);
    setMoneyInput("nominalBayar", 0);
    updateSummary();
  });
}

function formatPaymentChannelsText() {
  const activeList = (state.paymentMethods || []).filter((m) => m.aktif !== false);
  if (activeList.length === 0) {
    return "Info pembayaran: silakan atur no. rekening di tab Keuangan & Kas.";
  }
  return activeList.map((m) => {
    const an = m.atas_nama ? ` a.n. ${m.atas_nama}` : "";
    return `• ${m.kanal}: *${m.nomor}*${an}`;
  }).join("\n");
}

function buildWaMessage(ord, templateKey = "konfirmasi") {
  const bizName = state.bizProfile.nama_usaha || DEFAULT_BIZ_PROFILE.nama_usaha;
  const bizPhone = (state.bizProfile.no_hp_usaha || "").trim();
  const footer = bizPhone ? `— ${bizName} (${bizPhone})` : `— ${bizName}`;
  const items = ord.items || state.details.filter((d) => d.no_nota === ord.no_nota);
  const rincian = items
    .map((it) => `${it.nama_item_snapshot} (${it.qty} ${getUnitLabel(it.tipe_hitung)})`)
    .join(", ") || "-";

  const ringkasan = [
    `Nota: *${ord.no_nota}*`,
    `Item: ${rincian}`,
    `Total: *${fmtRp(ord.grand_total)}* | Dibayar: *${fmtRp(ord.nominal_bayar)}*`,
    `Sisa: *${fmtRp(ord.sisa_tagihan)}*`
  ].join("\n");

  if (templateKey === "preview") {
    return [
      `Halo Kak ${ord.nama_pelanggan}, preview desain *${ord.no_nota}* (${rincian}) sudah siap dicek.`,
      'Mohon cek teks, ukuran & finishing. Balas "ACC CETAK" jika sesuai atau tulis revisinya.',
      footer
    ].join("\n");
  }
  if (templateKey === "pelunasan") {
    return [
      `Halo Kak ${ord.nama_pelanggan}, pengingat pelunasan:`,
      ringkasan,
      "",
      "Rekening / Pembayaran:",
      formatPaymentChannelsText(),
      "Mohon kirim bukti transfer setelah bayar ya Kak.",
      footer
    ].join("\n");
  }
  if (templateKey === "siap_ambil") {
    return [
      `Halo Kak ${ord.nama_pelanggan}, pesanan *${ord.no_nota}* (${rincian}) sudah *SIAP DIAMBIL*.`,
      `Sisa Tagihan: *${fmtRp(ord.sisa_tagihan)}*`,
      footer
    ].join("\n");
  }
  return [
    `Halo Kak ${ord.nama_pelanggan}, order Anda sudah kami terima:`,
    ringkasan,
    `Status: *${ord.status_produksi}*`,
    footer
  ].join("\n");
}

function setActiveWaTemplate(tplKey) {
  state.activeWaTemplate = tplKey;
  document.querySelectorAll(".wa-pill").forEach((pill) => {
    pill.classList.toggle("active", pill.getAttribute("data-tpl") === tplKey);
  });
  if (state.activeNota) {
    $("waPreviewText").value = buildWaMessage(state.activeNota, tplKey);
  }
}

function openNotaModal(order, defaultTpl = "konfirmasi") {
  state.activeNota = order;
  const items = order.items || state.details.filter((d) => d.no_nota === order.no_nota);
  const bizName = state.bizProfile.nama_usaha || DEFAULT_BIZ_PROFILE.nama_usaha;
  const bizAddr = state.bizProfile.alamat_usaha || DEFAULT_BIZ_PROFILE.alamat_usaha;
  const bizPhone = state.bizProfile.no_hp_usaha || "";
  const logoUrl = state.bizProfile.logo_data_url || "";

  $("notaBusinessName").textContent = bizName;
  $("notaBusinessAddress").textContent = bizAddr;
  applyPhoneText($("notaBusinessPhone"), bizPhone);
  renderLogoBox($("notaLogoBox"), logoUrl, bizName);

  $("notaNomor").textContent = order.no_nota;
  $("notaTanggal").textContent = order.tanggal_order;
  $("notaPelanggan").textContent = order.nama_pelanggan;
  $("notaWa").textContent = order.no_wa || "-";
  $("notaDeadline").textContent = order.deadline || "-";
  $("notaStatusBayar").textContent = order.status_bayar;

  $("notaItemsBody").innerHTML = items.map((it) => `
    <tr>
      <td>${it.nama_item_snapshot}</td>
      <td>${it.spesifikasi_catatan || "-"}</td>
      <td>${it.qty} ${getUnitLabel(it.tipe_hitung)}</td>
      <td>${fmtRp(it.total_harga_item)}</td>
    </tr>
  `).join("");

  $("notaSubtotal").textContent = fmtRp(order.subtotal);
  $("notaDesain").textContent = fmtRp(order.biaya_desain);
  $("notaDiskon").textContent = "- " + fmtRp(order.diskon);
  $("notaGrandTotal").textContent = fmtRp(order.grand_total);
  $("notaBayar").textContent = fmtRp(order.nominal_bayar);
  $("notaSisa").textContent = fmtRp(order.sisa_tagihan);

  setActiveWaTemplate(defaultTpl);
  $("notaModal").classList.remove("hidden");
}

function restorePageTitle() {
  if (state.defaultPageTitle) document.title = state.defaultPageTitle;
}

function bindNotaEvents() {
  document.querySelectorAll(".wa-pill").forEach((pill) => {
    pill.addEventListener("click", () => setActiveWaTemplate(pill.getAttribute("data-tpl")));
  });

  window.addEventListener("afterprint", restorePageTitle);

  $("btnPrintNotaPdf").addEventListener("click", () => {
    const prevTitle = document.title;
    const pdfName = buildPdfFilenameBase(state.activeNota);
    document.title = pdfName;
    window.print();
    setTimeout(() => {
      if (document.title === pdfName) {
        document.title = prevTitle || state.defaultPageTitle;
      }
    }, 1000);
  });

  $("btnCloseNota").addEventListener("click", () => {
    restorePageTitle();
    $("notaModal").classList.add("hidden");
  });

  $("btnWaNota").addEventListener("click", () => {
    const ord = state.activeNota;
    if (!ord) return;
    const rawWa = String(ord.no_wa || "").replace(/\D/g, "");
    const waNorm = rawWa.startsWith("0") ? "62" + rawWa.slice(1) : rawWa;
    const msg = $("waPreviewText").value || buildWaMessage(ord, state.activeWaTemplate);
    const text = encodeURIComponent(msg);
    const url = waNorm ? `https://wa.me/${waNorm}?text=${text}` : `https://wa.me/?text=${text}`;
    window.open(url, "_blank");
  });
}

function renderOrdersTable() {
  const q = ($("searchOrder").value || "").toLowerCase();
  const filtered = state.orders.filter((o) =>
    String(o.no_nota).toLowerCase().includes(q)
    || String(o.nama_pelanggan).toLowerCase().includes(q)
  );

  const tbody = $("ordersBody");
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-cell">Belum ada data order</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map((o) => {
    const badgeClass = o.status_bayar === "LUNAS"
      ? "lunas"
      : (o.status_bayar === "DP" ? "dp" : "");
    const statusOpts = PROD_STATUSES.map((st) =>
      `<option value="${st}" ${o.status_produksi === st ? "selected" : ""}>${st}</option>`
    ).join("");
    const lunasiBtn = Number(o.sisa_tagihan) > 0
      ? `<button class="btn btn-primary btn-sm" onclick="payRemaining('${o.no_nota}', ${o.sisa_tagihan})">Lunasi</button>`
      : "";

    return `
      <tr>
        <td><strong>${o.no_nota}</strong></td>
        <td>${o.nama_pelanggan}</td>
        <td>
          <div>${fmtRp(o.grand_total)}</div>
          <small class="row-sub">Sisa: ${fmtRp(o.sisa_tagihan)}</small>
        </td>
        <td><span class="badge ${badgeClass}">${o.status_bayar}</span></td>
        <td>
          <select class="status-select" onchange="changeOrderStatus('${o.no_nota}', this.value)">
            ${statusOpts}
          </select>
        </td>
        <td class="nowrap-cell">
          <button class="btn btn-sm" onclick="reopenNota('${o.no_nota}')">Nota & WA</button>
          ${lunasiBtn}
        </td>
      </tr>
    `;
  }).join("");
}

window.reopenNota = function (noNota) {
  const ord = state.orders.find((o) => o.no_nota === noNota);
  if (!ord) return;
  const tpl = ord.status_produksi === "SIAP_AMBIL"
    ? "siap_ambil"
    : (Number(ord.sisa_tagihan) > 0 && ord.status_produksi !== "ANTRE_DESAIN"
      ? "pelunasan"
      : "konfirmasi");
  openNotaModal(ord, tpl);
};

window.changeOrderStatus = async function (noNota, statusBaru) {
  const ord = state.orders.find((o) => o.no_nota === noNota);
  if (ord) ord.status_produksi = statusBaru;
  await postApi({ action: "updateStatus", no_nota: noNota, status_produksi: statusBaru });
};

window.payRemaining = async function (noNota, sisa) {
  const input = prompt(`Catat pembayaran untuk ${noNota} (Sisa: ${fmtRp(sisa)}):`, fmtNum(sisa));
  if (!input) return;
  const nominal = Math.min(Number(sisa), parseMoney(input));
  if (!nominal) return;

  const ord = state.orders.find((o) => o.no_nota === noNota);
  if (ord) {
    ord.nominal_bayar = Number(ord.nominal_bayar || 0) + nominal;
    ord.sisa_tagihan = Math.max(0, Number(ord.grand_total || 0) - ord.nominal_bayar);
    ord.status_bayar = ord.sisa_tagihan === 0 ? "LUNAS" : "DP";
  }

  state.pembayaran.unshift({
    id_bayar: "PAY-" + Date.now().toString().slice(-6),
    no_nota: noNota,
    tanggal_bayar: formatLocalDateTime(),
    jenis_bayar: ord && ord.status_bayar === "LUNAS" ? "PELUNASAN" : "CICILAN",
    nominal,
    metode: (ord && ord.metode_bayar) || "Tunai"
  });

  await postApi({
    action: "recordPayment",
    no_nota: noNota,
    nominal,
    metode: (ord && ord.metode_bayar) || "Tunai"
  });

  renderOrdersTable();
  renderFinanceTab();
};

function getFilteredKatalogList() {
  const q = ($("searchKatalog").value || "").trim().toLowerCase();
  const cat = $("filterKatalogKategori").value || "ALL";
  return state.katalog.filter((p) => {
    const matchCat = cat === "ALL" || normCat(p.kategori) === normCat(cat);
    if (!matchCat) return false;
    if (!q) return true;
    return String(p.nama_produk || "").toLowerCase().includes(q)
      || String(p.id_produk || "").toLowerCase().includes(q)
      || String(p.kategori || "").toLowerCase().includes(q);
  });
}

function renderInventoryTab() {
  const filtered = getFilteredKatalogList();
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / state.katalogPageSize));
  state.katalogPage = Math.min(Math.max(1, state.katalogPage), totalPages);

  const startIdx = state.katalogShowAll ? 0 : (state.katalogPage - 1) * state.katalogPageSize;
  const visibleRows = state.katalogShowAll
    ? filtered
    : filtered.slice(startIdx, startIdx + state.katalogPageSize);

  const katBody = $("katalogTableBody");
  if (visibleRows.length === 0) {
    katBody.innerHTML = '<tr><td colspan="4" class="empty-cell">Tidak ada produk sesuai filter</td></tr>';
  } else {
    katBody.innerHTML = visibleRows.map((p) => `
      <tr>
        <td>
          <strong>${p.nama_produk}</strong>
          <div class="row-sub">${p.id_produk} • ${formatCategoryLabel(p.kategori)}</div>
        </td>
        <td><span class="badge">${p.tipe_hitung}</span></td>
        <td>${fmtRp(p.harga_dasar)} / ${getUnitLabel(p.tipe_hitung)}</td>
        <td><button class="btn btn-sm" onclick="editKatalog('${p.id_produk}')">Edit</button></td>
      </tr>
    `).join("");
  }

  const pageInfoEl = $("katalogPageInfo");
  if (totalItems === 0) {
    pageInfoEl.textContent = "0 produk";
  } else if (state.katalogShowAll) {
    pageInfoEl.textContent = `Menampilkan semua (${totalItems} produk)`;
  } else {
    const endIdx = Math.min(startIdx + state.katalogPageSize, totalItems);
    pageInfoEl.textContent = `Hal ${state.katalogPage}/${totalPages} (${startIdx + 1}-${endIdx} dari ${totalItems})`;
  }

  $("btnPrevKatalogPage").disabled = state.katalogShowAll || state.katalogPage <= 1;
  $("btnNextKatalogPage").disabled = state.katalogShowAll || state.katalogPage >= totalPages;
  $("btnToggleKatalogLimit").textContent = state.katalogShowAll
    ? "Ringkas (5/hal)"
    : "Tampilkan Semua";

  $("stokTableBody").innerHTML = state.stok.map((s) => {
    const cur = Number(s.stok_saat_ini || 0);
    const min = Number(s.batas_minimum || 0);
    let stLabel = "AMAN";
    let stClass = "aman";
    if (cur <= 0) { stLabel = "HABIS"; stClass = "habis"; }
    else if (cur <= min) { stLabel = "MENIPIS"; stClass = "menipis"; }

    return `
      <tr>
        <td>
          <strong>${s.nama_bahan}</strong>
          <div class="row-sub">${s.id_bahan}</div>
        </td>
        <td><strong>${cur}</strong> / ${min} ${s.satuan_stok}</td>
        <td><span class="badge ${stClass}">${stLabel}</span></td>
        <td class="nowrap-cell">
          <button class="btn btn-sm" onclick="adjustStockUI('${s.id_bahan}', -1)">-1</button>
          <button class="btn btn-sm" onclick="adjustStockUI('${s.id_bahan}', 1)">+1</button>
          <button class="btn btn-sm" onclick="adjustStockUI('${s.id_bahan}', 10)">+10</button>
        </td>
      </tr>
    `;
  }).join("");
}

window.editKatalog = function (idProduk) {
  const p = state.katalog.find((item) => item.id_produk === idProduk);
  if (!p) return;
  $("katIdProduk").value = p.id_produk;
  $("katKategori").value = formatCategoryLabel(p.kategori);
  $("katNama").value = p.nama_produk;
  $("katTipeHitung").value = p.tipe_hitung;
  setMoneyInput("katHargaDasar", p.harga_dasar);
  setMoneyInput("katHargaGrosir", p.harga_grosir_min10 || 0);
  $("katIdBahan").value = p.id_bahan_terkait || "";
};

function resetKatalogForm() {
  $("formKatalog").reset();
  $("katIdProduk").value = "";
  setMoneyInput("katHargaDasar", 15000);
  setMoneyInput("katHargaGrosir", 0);
}

window.adjustStockUI = async function (idBahan, delta) {
  const s = state.stok.find((item) => item.id_bahan === idBahan);
  if (!s) return;
  s.stok_saat_ini = Math.max(0, Number(s.stok_saat_ini || 0) + Number(delta));
  renderInventoryTab();
  await postApi({ action: "adjustStock", id_bahan: idBahan, delta });
};

function bindInventoryEvents() {
  $("searchOrder").addEventListener("input", renderOrdersTable);

  $("searchKatalog").addEventListener("input", () => {
    state.katalogPage = 1;
    renderInventoryTab();
  });
  $("filterKatalogKategori").addEventListener("change", () => {
    state.katalogPage = 1;
    renderInventoryTab();
  });
  $("btnPrevKatalogPage").addEventListener("click", () => {
    state.katalogPage = Math.max(1, state.katalogPage - 1);
    renderInventoryTab();
  });
  $("btnNextKatalogPage").addEventListener("click", () => {
    state.katalogPage += 1;
    renderInventoryTab();
  });
  $("btnToggleKatalogLimit").addEventListener("click", () => {
    state.katalogShowAll = !state.katalogShowAll;
    state.katalogPage = 1;
    renderInventoryTab();
  });

  $("btnResetKatalog").addEventListener("click", resetKatalogForm);

  $("formKatalog").addEventListener("submit", async (e) => {
    e.preventDefault();
    const idVal = $("katIdProduk").value.trim()
      || ("PRD-" + Date.now().toString().slice(-4));
    const item = {
      id_produk: idVal,
      kategori: formatCategoryLabel($("katKategori").value),
      nama_produk: $("katNama").value.trim(),
      tipe_hitung: $("katTipeHitung").value,
      harga_dasar: getMoneyInput("katHargaDasar"),
      harga_grosir_min10: getMoneyInput("katHargaGrosir"),
      id_bahan_terkait: $("katIdBahan").value.trim(),
      aktif: true
    };

    const idx = state.katalog.findIndex((k) => k.id_produk === idVal);
    if (idx >= 0) state.katalog.splice(idx, 1);
    state.katalog.unshift(item);
    state.katalogPage = 1;

    await postApi({ action: "upsertProduct", ...item });
    populateProdukSelect();
    renderInventoryTab();
    resetKatalogForm();
  });

  $("formTambahStok").addEventListener("submit", (e) => {
    e.preventDefault();
    const idBahan = $("stokIdBahan").value.trim();
    const row = {
      id_bahan: idBahan,
      nama_bahan: $("stokNamaBahan").value.trim(),
      satuan_stok: $("stokSatuan").value.trim() || "pcs",
      stok_saat_ini: Number($("stokAwal").value || 0),
      batas_minimum: Number($("stokMin").value || 0)
    };
    const idx = state.stok.findIndex((s) => s.id_bahan === idBahan);
    if (idx >= 0) state.stok.splice(idx, 1);
    state.stok.unshift(row);
    renderInventoryTab();
    $("formTambahStok").reset();
  });
}

function renderPaymentMethodsTable() {
  const body = $("paymentMethodsBody");
  if (!state.paymentMethods || state.paymentMethods.length === 0) {
    body.innerHTML = '<tr><td colspan="4" class="empty-cell">Belum ada rekening/metode tersimpan</td></tr>';
    return;
  }

  body.innerHTML = state.paymentMethods.map((m) => {
    const an = m.atas_nama ? `<div class="row-sub">a.n. ${m.atas_nama}</div>` : "";
    const stBadge = m.aktif !== false
      ? '<span class="badge aman">Aktif</span>'
      : '<span class="badge">Nonaktif</span>';
    return `
      <tr>
        <td><strong>${m.kanal}</strong></td>
        <td><strong>${m.nomor}</strong>${an}</td>
        <td>${stBadge}</td>
        <td class="nowrap-cell">
          <button class="btn btn-sm" onclick="editPaymentMethod('${m.id}')">Edit</button>
          <button class="btn btn-sm" onclick="deletePaymentMethod('${m.id}')">Hapus</button>
        </td>
      </tr>
    `;
  }).join("");
}

window.editPaymentMethod = function (id) {
  const m = state.paymentMethods.find((item) => item.id === id);
  if (!m) return;
  $("payEditId").value = m.id;
  $("payKanal").value = m.kanal;
  $("payNomor").value = m.nomor;
  $("payAtasNama").value = m.atas_nama || "";
  $("payAktif").value = String(m.aktif !== false);
};

window.deletePaymentMethod = function (id) {
  state.paymentMethods = state.paymentMethods.filter((item) => item.id !== id);
  savePaymentMethods();
  renderPaymentMethodsTable();
  if (state.activeNota && state.activeWaTemplate === "pelunasan") {
    setActiveWaTemplate("pelunasan");
  }
};

function resetPaymentMethodForm() {
  $("formPaymentMethod").reset();
  $("payEditId").value = "";
  $("payAktif").value = "true";
}

function bindPaymentEvents() {
  $("btnResetPaymentMethod").addEventListener("click", resetPaymentMethodForm);

  $("formPaymentMethod").addEventListener("submit", (e) => {
    e.preventDefault();
    const editId = $("payEditId").value.trim();
    const item = {
      id: editId || ("PAYM-" + Date.now().toString().slice(-5)),
      kanal: $("payKanal").value.trim(),
      nomor: $("payNomor").value.trim(),
      atas_nama: $("payAtasNama").value.trim(),
      aktif: $("payAktif").value === "true"
    };

    const idx = state.paymentMethods.findIndex((m) => m.id === item.id);
    if (idx >= 0) state.paymentMethods.splice(idx, 1);
    state.paymentMethods.unshift(item);

    savePaymentMethods();
    renderPaymentMethodsTable();
    resetPaymentMethodForm();

    if (state.activeNota && state.activeWaTemplate === "pelunasan") {
      setActiveWaTemplate("pelunasan");
    }
  });
}

function extractYmd(dtStr) {
  const m = String(dtStr || "").match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : "";
}

function extractYm(dtStr) {
  const m = String(dtStr || "").match(/^(\d{4}-\d{2})/);
  return m ? m[1] : "";
}

function formatMonthLabel(ym) {
  const m = String(ym || "").match(/^(\d{4})-(\d{2})$/);
  if (!m) return ym || "-";
  const idx = Math.max(0, Math.min(11, parseInt(m[2], 10) - 1));
  return `${MONTH_NAMES[idx]} ${m[1]}`;
}

function resolveItemCategory(item) {
  if (item && item.kategori) return formatCategoryLabel(item.kategori);
  if (item && item.id_produk) {
    const prod = state.katalog.find((k) => k.id_produk === item.id_produk);
    if (prod && prod.kategori) return formatCategoryLabel(prod.kategori);
  }
  if (item && item.nama_item_snapshot) {
    const prodByName = state.katalog.find(
      (k) => normCat(k.nama_produk) === normCat(item.nama_item_snapshot)
    );
    if (prodByName && prodByName.kategori) return formatCategoryLabel(prodByName.kategori);
  }
  return "Lainnya";
}

function getFinancePeriodData() {
  const selectedMonth = $("filterBulanKas").value || "";
  const selectedDate = $("filterTanggalKas").value || "";

  const matchesPeriod = (dtStr) => {
    if (selectedDate) return extractYmd(dtStr) === selectedDate;
    if (selectedMonth) return extractYm(dtStr) === selectedMonth;
    return true;
  };

  const filteredOrders = state.orders.filter((o) => matchesPeriod(o.tanggal_order));
  const filteredPayments = state.pembayaran.filter((p) => matchesPeriod(p.tanggal_bayar));
  const totalOmzet = filteredOrders.reduce((acc, o) => acc + Number(o.grand_total || 0), 0);

  let kasMasuk = 0;
  const byMetode = { Tunai: 0, QRIS: 0, "Transfer Bank": 0 };
  const addCash = (nom, met) => {
    const val = Number(nom || 0);
    kasMasuk += val;
    const key = met || "Tunai";
    if (byMetode[key] !== undefined) byMetode[key] += val;
    else byMetode.Tunai += val;
  };

  if (filteredPayments.length > 0) {
    filteredPayments.forEach((p) => addCash(p.nominal, p.metode));
  } else if (!selectedDate && !selectedMonth && state.orders.length > 0) {
    state.orders.forEach((o) => addCash(o.nominal_bayar, o.metode_bayar));
  }

  const piutangOrders = state.orders.filter((o) => Number(o.sisa_tagihan || 0) > 0);
  const totalPiutang = filteredOrders.reduce((acc, o) => acc + Number(o.sisa_tagihan || 0), 0);
  const rate = totalOmzet > 0 ? Math.min(100, Math.round((kasMasuk / totalOmzet) * 100)) : 0;

  const monthlyMap = {};
  const monthCategoryMap = {};

  const ensureMonth = (ym) => {
    if (!monthlyMap[ym]) {
      monthlyMap[ym] = { ym, orderCount: 0, omzet: 0, kasMasuk: 0, piutang: 0 };
    }
    if (!monthCategoryMap[ym]) monthCategoryMap[ym] = {};
  };

  const addCatOmzet = (ym, catName, amount) => {
    const val = Number(amount || 0);
    if (val <= 0) return;
    ensureMonth(ym);
    const label = formatCategoryLabel(catName);
    monthCategoryMap[ym][label] = (monthCategoryMap[ym][label] || 0) + val;
  };

  state.orders.forEach((o) => {
    const ym = extractYm(o.tanggal_order) || "Tanpa Bulan";
    if (selectedMonth && ym !== selectedMonth) return;
    if (selectedDate && extractYmd(o.tanggal_order) !== selectedDate) return;
    ensureMonth(ym);
    monthlyMap[ym].orderCount += 1;
    monthlyMap[ym].omzet += Number(o.grand_total || 0);
    monthlyMap[ym].piutang += Number(o.sisa_tagihan || 0);

    const orderItems = Array.isArray(o.items) && o.items.length > 0
      ? o.items
      : state.details.filter((d) => d.no_nota === o.no_nota);
    const itemsSum = orderItems.reduce((acc, it) => acc + Number(it.total_harga_item || 0), 0);
    orderItems.forEach((it) => addCatOmzet(ym, resolveItemCategory(it), it.total_harga_item));
    const netAdj = Number(o.grand_total || 0) - itemsSum;
    if (netAdj > 0) addCatOmzet(ym, "Lainnya", netAdj);
  });

  const cashSource = state.pembayaran.length > 0 ? state.pembayaran : state.orders;
  cashSource.forEach((row) => {
    const dt = row.tanggal_bayar || row.tanggal_order;
    const ym = extractYm(dt) || "Tanpa Bulan";
    if (selectedMonth && ym !== selectedMonth) return;
    if (selectedDate && extractYmd(dt) !== selectedDate) return;
    if (monthlyMap[ym]) {
      monthlyMap[ym].kasMasuk += Number(row.nominal ?? row.nominal_bayar ?? 0);
    }
  });

  const monthlyRows = Object.values(monthlyMap).sort((a, b) => b.ym.localeCompare(a.ym));
  const categoryMonthlyRows = [];
  monthlyRows.forEach((m) => {
    const entries = Object.entries(monthCategoryMap[m.ym] || {}).sort((a, b) => b[1] - a[1]);
    entries.forEach(([kategori, omzetKat]) => {
      const sharePct = m.omzet > 0 ? Math.min(100, Math.round((omzetKat / m.omzet) * 100)) : 0;
      categoryMonthlyRows.push({
        ym: m.ym,
        kategori,
        omzet: omzetKat,
        monthOmzet: m.omzet,
        sharePct
      });
    });
  });

  return {
    selectedMonth,
    selectedDate,
    filteredOrders,
    filteredPayments,
    totalOmzet,
    kasMasuk,
    byMetode,
    piutangOrders,
    totalPiutang,
    rate,
    monthlyRows,
    categoryMonthlyRows
  };
}

function renderFinanceTab() {
  const data = getFinancePeriodData();
  const suffix = data.selectedDate
    ? ` — Tanggal ${data.selectedDate}`
    : (data.selectedMonth ? ` — Bulan ${formatMonthLabel(data.selectedMonth)}` : " — Semua Periode");
  $("financeReportTitle").textContent = `Rekap Keuangan & Kas Harian${suffix}`;

  $("kpiOmzet").textContent = fmtRp(data.totalOmzet);
  $("kpiOrderCount").textContent = `${data.filteredOrders.length} order tercatat`;
  $("kpiKasMasuk").textContent = fmtRp(data.kasMasuk);
  $("kpiMetodeBreakdown").textContent =
    `Tunai: ${fmtRp(data.byMetode.Tunai)} • QRIS: ${fmtRp(data.byMetode.QRIS)}`
    + ` • TF: ${fmtRp(data.byMetode["Transfer Bank"])}`;
  $("kpiPiutang").textContent = fmtRp(data.totalPiutang);
  $("kpiPiutangCount").textContent = `${data.piutangOrders.length} nota belum lunas`;
  $("kpiCollectionRate").textContent = `${data.rate}%`;

  $("monthlySummaryBody").innerHTML = data.monthlyRows.length === 0
    ? '<tr><td colspan="5" class="empty-cell">Belum ada rekap bulanan tercatat</td></tr>'
    : data.monthlyRows.map((m) => `
      <tr>
        <td>
          <strong>${formatMonthLabel(m.ym)}</strong>
          <span class="row-sub">(${m.ym})</span>
        </td>
        <td>${m.orderCount} order</td>
        <td><strong>${fmtRp(m.omzet)}</strong></td>
        <td class="kpi-success"><strong>${fmtRp(m.kasMasuk)}</strong></td>
        <td class="kpi-warning">${fmtRp(m.piutang)}</td>
      </tr>
    `).join("");

  $("categoryMonthlyBody").innerHTML = data.categoryMonthlyRows.length === 0
    ? '<tr><td colspan="4" class="empty-cell">Belum ada rincian omzet per kategori pada periode ini</td></tr>'
    : data.categoryMonthlyRows.map((row) => `
      <tr>
        <td>
          <strong>${formatMonthLabel(row.ym)}</strong>
          <span class="row-sub">(${row.ym})</span>
        </td>
        <td><span class="badge">${row.kategori}</span></td>
        <td><strong>${fmtRp(row.omzet)}</strong></td>
        <td>${row.sharePct}%</td>
      </tr>
    `).join("");

  $("kasLogBody").innerHTML = data.filteredPayments.length === 0
    ? '<tr><td colspan="4" class="empty-cell">Belum ada mutasi pembayaran tercatat</td></tr>'
    : data.filteredPayments.map((p) => `
      <tr>
        <td>
          <strong>${p.no_nota}</strong>
          <div class="row-sub">${p.tanggal_bayar || "-"}</div>
        </td>
        <td><span class="badge">${p.jenis_bayar || "BAYAR"}</span></td>
        <td>${p.metode || "Tunai"}</td>
        <td><strong>${fmtRp(p.nominal)}</strong></td>
      </tr>
    `).join("");

  $("piutangBody").innerHTML = data.piutangOrders.length === 0
    ? '<tr><td colspan="3" class="empty-cell">Tidak ada sisa piutang</td></tr>'
    : data.piutangOrders.map((o) => `
      <tr>
        <td>
          <strong>${o.no_nota}</strong> • ${o.nama_pelanggan}
          <div class="row-sub">
            Total: ${fmtRp(o.grand_total)} • Bayar: ${fmtRp(o.nominal_bayar)}
          </div>
        </td>
        <td><strong class="kpi-warning">${fmtRp(o.sisa_tagihan)}</strong></td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="payRemaining('${o.no_nota}', ${o.sisa_tagihan})">
            Lunasi
          </button>
        </td>
      </tr>
    `).join("");

  renderPaymentMethodsTable();
}

const csvCell = (val) => `"${String(val ?? "").replace(/"/g, '""')}"`;

function triggerFileDownload(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportFinanceCsv() {
  const data = getFinancePeriodData();
  const lines = [];
  const rowJoin = (arr) => arr.map(csvCell).join(";");

  lines.push(rowJoin(["REKAP BULANAN", "JUMLAH ORDER", "OMZET", "KAS MASUK", "SISA PIUTANG"]));
  data.monthlyRows.forEach((m) => {
    lines.push(rowJoin([m.ym, m.orderCount, m.omzet, m.kasMasuk, m.piutang]));
  });

  lines.push("");
  lines.push(rowJoin(["BULAN", "KATEGORI PRODUK", "OMZET KATEGORI", "PORSI BULAN (%)"]));
  data.categoryMonthlyRows.forEach((r) => {
    lines.push(rowJoin([r.ym, r.kategori, r.omzet, `${r.sharePct}%`]));
  });

  lines.push("");
  lines.push(rowJoin([
    "NO NOTA", "TANGGAL ORDER", "PELANGGAN", "METODE BAYAR",
    "STATUS BAYAR", "STATUS PRODUKSI", "GRAND TOTAL", "DIBAYAR", "SISA TAGIHAN"
  ]));
  data.filteredOrders.forEach((o) => {
    lines.push(rowJoin([
      o.no_nota, o.tanggal_order, o.nama_pelanggan, o.metode_bayar || "Tunai",
      o.status_bayar, o.status_produksi, o.grand_total || 0,
      o.nominal_bayar || 0, o.sisa_tagihan || 0
    ]));
  });

  const tag = sanitizeFilePart(data.selectedDate || data.selectedMonth || "semua", "semua");
  triggerFileDownload(`rekap-bulanan-${tag}.csv`, "\uFEFF" + lines.join("\r\n"), "text/csv;charset=utf-8;");
}

function exportFinanceJson() {
  const payload = {
    exported_at: formatLocalDateTime(),
    bizProfile: { ...state.bizProfile },
    katalog: state.katalog,
    stok: state.stok,
    orders: state.orders,
    details: state.details,
    pembayaran: state.pembayaran,
    paymentMethods: state.paymentMethods
  };
  const todayYmd = formatLocalDateTime().slice(0, 10);
  triggerFileDownload(`data-pos-${todayYmd}.json`, JSON.stringify(payload, null, 2), "application/json;charset=utf-8;");
}

async function importFinanceJson(e) {
  const inputEl = e.target;
  const file = inputEl && inputEl.files && inputEl.files[0];
  if (!file) return;

  try {
    const parsed = JSON.parse(await file.text());
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Format objek JSON tidak valid.");
    }
    const keys = ["katalog", "stok", "orders", "details", "pembayaran", "paymentMethods", "bizProfile"];
    if (!keys.some((k) => Object.prototype.hasOwnProperty.call(parsed, k))) {
      throw new Error("File JSON tidak memuat struktur backup POS yang dikenali.");
    }

    const ok = confirm(
      "Impor file JSON akan menimpa data aktif di aplikasi saat ini (katalog, stok, order, kas & pengaturan). Lanjutkan?"
    );
    if (!ok) return;

    if (Array.isArray(parsed.katalog)) state.katalog = parsed.katalog;
    if (Array.isArray(parsed.stok)) state.stok = parsed.stok;
    if (Array.isArray(parsed.orders)) state.orders = parsed.orders;
    if (Array.isArray(parsed.details)) state.details = parsed.details;
    if (Array.isArray(parsed.pembayaran)) state.pembayaran = parsed.pembayaran;

    if (Array.isArray(parsed.paymentMethods) && parsed.paymentMethods.length > 0) {
      state.paymentMethods = parsed.paymentMethods;
      savePaymentMethods();
    }

    if (parsed.bizProfile && typeof parsed.bizProfile === "object") {
      const bp = parsed.bizProfile;
      state.bizProfile = {
        nama_usaha: String(bp.nama_usaha || state.bizProfile.nama_usaha).trim()
          || DEFAULT_BIZ_PROFILE.nama_usaha,
        alamat_usaha: String(bp.alamat_usaha || state.bizProfile.alamat_usaha).trim()
          || DEFAULT_BIZ_PROFILE.alamat_usaha,
        no_hp_usaha: String(bp.no_hp_usaha ?? state.bizProfile.no_hp_usaha ?? "").trim(),
        logo_data_url: String(bp.logo_data_url ?? state.bizProfile.logo_data_url ?? "")
      };
      saveBizProfileToStorage();
      applyBizProfileUI();
      setupPWA();
    }

    state.katalogPage = 1;
    populateProdukSelect();
    renderOrdersTable();
    renderInventoryTab();
    renderFinanceTab();
    alert("Backup JSON berhasil dipulihkan ke aplikasi.");
  } catch (err) {
    alert("Gagal mengimpor file JSON: " + err.message);
  } finally {
    inputEl.value = "";
  }
}

function bindFinanceEvents() {
  $("filterBulanKas").addEventListener("change", () => {
    if ($("filterBulanKas").value) $("filterTanggalKas").value = "";
    renderFinanceTab();
  });
  $("filterTanggalKas").addEventListener("change", () => {
    if ($("filterTanggalKas").value) $("filterBulanKas").value = "";
    renderFinanceTab();
  });
  $("btnResetTanggalKas").addEventListener("click", () => {
    const now = new Date();
    $("filterTanggalKas").value = formatDateInput(now);
    $("filterBulanKas").value = formatMonthInput(now);
    renderFinanceTab();
  });
  $("btnExportCsv").addEventListener("click", exportFinanceCsv);
  $("btnExportJson").addEventListener("click", exportFinanceJson);
  $("importJsonFile").addEventListener("change", importFinanceJson);
}

function buildDefaultIconSvg() {
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">',
    "<defs>",
    '<linearGradient id="kasirGrad" x1="0%" y1="0%" x2="100%" y2="100%">',
    '<stop offset="0%" stop-color="#c2410c"/>',
    '<stop offset="100%" stop-color="#ea580c"/>',
    "</linearGradient>",
    "</defs>",
    '<rect width="512" height="512" rx="112" fill="url(#kasirGrad)"/>',
    '<rect x="28" y="28" width="456" height="456" rx="92" fill="none"',
    ' stroke="#ffedd5" stroke-opacity="0.35" stroke-width="6"/>',
    '<path d="M176 92 h116 v64 h-116 z" fill="#ffffff"/>',
    '<rect x="196" y="112" width="76" height="8" rx="4" fill="#ea580c"/>',
    '<rect x="196" y="130" width="52" height="8" rx="4" fill="#fdba74"/>',
    '<rect x="308" y="116" width="64" height="40" rx="8" fill="#ffffff"/>',
    '<rect x="318" y="128" width="44" height="16" rx="4" fill="#1c1917"/>',
    '<path d="M124 176 h264 l24 148 H100 Z" fill="#fff7ed"/>',
    '<rect x="148" y="200" width="38" height="24" rx="6" fill="#ea580c"/>',
    '<rect x="200" y="200" width="38" height="24" rx="6" fill="#ea580c"/>',
    '<rect x="252" y="200" width="38" height="24" rx="6" fill="#ea580c"/>',
    '<rect x="148" y="236" width="38" height="24" rx="6" fill="#ea580c"/>',
    '<rect x="200" y="236" width="38" height="24" rx="6" fill="#ea580c"/>',
    '<rect x="252" y="236" width="38" height="24" rx="6" fill="#ea580c"/>',
    '<rect x="310" y="200" width="54" height="60" rx="8" fill="#15803d"/>',
    '<rect x="100" y="336" width="312" height="68" rx="14" fill="#ffffff"/>',
    '<rect x="224" y="362" width="64" height="16" rx="8" fill="#c2410c"/>',
    "</svg>"
  ].join("");
}

function renderIconToPngDataUrl(sourceUrl, size = 512) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve(sourceUrl);
    img.src = sourceUrl;
  });
}

let deferredInstallPrompt = null;
let pwaPromptBound = false;

function bindInstallPromptOnce() {
  if (pwaPromptBound) return;
  pwaPromptBound = true;
  const btnInstall = $("btnInstallApp");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    btnInstall.classList.remove("hidden");
  });

  btnInstall.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    btnInstall.classList.add("hidden");
  });
}

async function setupPWA() {
  bindInstallPromptOnce();

  const defaultSvgUrl =
    "data:image/svg+xml;charset=utf-8,"
    + encodeURIComponent(buildDefaultIconSvg());
  const rawSource = state.bizProfile.logo_data_url || defaultSvgUrl;

  if ($("faviconSvgLink")) {
    $("faviconSvgLink").href = rawSource;
  }

  const icon192 = await renderIconToPngDataUrl(rawSource, 192);
  const icon512 = await renderIconToPngDataUrl(rawSource, 512);

  if ($("appleIconLink")) {
    $("appleIconLink").href = icon192;
  }

  const manifestObj = {
    name: `${state.bizProfile.nama_usaha} — POS`,
    short_name: state.bizProfile.nama_usaha.slice(0, 15) || "POS Usaha",
    start_url: "./",
    display: "standalone",
    background_color: "#fff7ed",
    theme_color: "#c2410c",
    icons: [
      { src: icon192, sizes: "192x192", type: "image/png", purpose: "any" },
      { src: icon512, sizes: "512x512", type: "image/png", purpose: "any maskable" }
    ]
  };

  $("pwaManifestLink").href =
    "data:application/manifest+json;charset=utf-8,"
    + encodeURIComponent(JSON.stringify(manifestObj));
}

async function syncFromSheets() {
  const banner = $("connectionBanner");
  if (!API_URL) {
    banner.textContent = "Mode Lokal aktif: isi variabel API_URL di kode untuk menghubungkan ke Google Sheets.";
    return;
  }
  banner.textContent = "Menghubungkan ke Google Sheets...";
  try {
    const res = await fetch(`${API_URL}?action=getDashboardData`);
    const json = await res.json();
    if (!json.ok) throw new Error(json.error);
    if (Array.isArray(json.data.katalog) && json.data.katalog.length > 0) {
      state.katalog = [...json.data.katalog].reverse();
    }
    if (Array.isArray(json.data.stok) && json.data.stok.length > 0) {
      state.stok = [...json.data.stok].reverse();
    }
    state.orders = (json.data.orders || []).slice().reverse();
    state.details = json.data.details || [];
    state.pembayaran = (json.data.pembayaran || []).slice().reverse();
    state.katalogPage = 1;
    populateProdukSelect();
    renderOrdersTable();
    renderInventoryTab();
    renderFinanceTab();
    banner.textContent = "Terhubung ke Google Sheets — data katalog, stok, order & kas tersinkronisasi.";
  } catch (err) {
    banner.textContent = "Gagal sinkronisasi Google Sheets: " + err.message;
  }
}

function initApp() {
  bindTabsAndTheme();
  bindPosEvents();
  bindNotaEvents();
  bindInventoryEvents();
  bindPaymentEvents();
  bindBizProfileEvents();
  bindFinanceEvents();
  $("btnSync").addEventListener("click", syncFromSheets);

  applyBizProfileUI();
  setupPWA();
  setDefaultDateTimeInputs();
  bindMoneyInputs();
  initTheme();
  populateProdukSelect();
  renderCart();
  updateSummary();
  renderInventoryTab();
  renderFinanceTab();
  syncFromSheets();
}

initApp();