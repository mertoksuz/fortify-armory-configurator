// ============================================================
//  FORTIFY ARMORY — Custom Gun Case Configurator
//  Konva.js-based 2D drag-and-drop layout builder
//  v2 — real gun images, resizable accessories, updated dims
// ============================================================

// ===== GUN IMAGE CACHE =====
const gunImageCache = {};

// ===== WEAPON DATABASE =====
// Image URLs — replace with your own hosted transparent-background PNGs
// Recommended: upload to Shopify Files or a CDN, ~600px wide, transparent BG, side profile
const WEAPON_DB = {
    canik: {
        name: 'Canik',
        models: {
            'rival-s': {
                name: 'Rival-S',
                length: 222, height: 147, width: 44,
                barrel: 127, caliber: '9×19mm', weight: '1077g', capacity: '18+1',
                image: 'https://canikarms.com/cdn/shop/files/rival-s-chrome-right.png'
            },
            'tp9-sfx': {
                name: 'TP9 SFx',
                length: 211, height: 143, width: 37,
                barrel: 132, caliber: '9×19mm', weight: '836g', capacity: '18+1',
                image: 'https://canikarms.com/cdn/shop/files/tp9sfx-right.png'
            },
            'tp9-elite-combat': {
                name: 'TP9 Elite Combat',
                length: 206, height: 143, width: 37,
                barrel: 119, caliber: '9×19mm', weight: '800g', capacity: '18+1',
                image: 'https://canikarms.com/cdn/shop/files/tp9-elite-combat-right.png'
            },
            'mete-sfx': {
                name: 'METE SFx',
                length: 207, height: 140, width: 36,
                barrel: 127, caliber: '9×19mm', weight: '870g', capacity: '18+1',
                image: 'https://canikarms.com/cdn/shop/files/mete-sfx-right.png'
            }
        }
    },
    sarsilmaz: {
        name: 'Sarsılmaz',
        models: {
            'sar9': {
                name: 'SAR9',
                length: 193, height: 140, width: 35.7,
                barrel: 113.5, caliber: '9×19mm', weight: '730g', capacity: '17+1',
                image: 'https://sarsilmaz.com/content/images/products/sar9-right.png'
            },
            'sar9-x': {
                name: 'SAR9 X',
                length: 200, height: 142, width: 36,
                barrel: 119, caliber: '9×19mm', weight: '760g', capacity: '17+1',
                image: 'https://sarsilmaz.com/content/images/products/sar9x-right.png'
            },
            'sar9-mete': {
                name: 'SAR9 METE',
                length: 198, height: 140, width: 36,
                barrel: 116, caliber: '9×19mm', weight: '750g', capacity: '17+1',
                image: 'https://sarsilmaz.com/content/images/products/sar9mete-right.png'
            },
            'k2-45': {
                name: 'K2 45',
                length: 210, height: 150, width: 38,
                barrel: 116, caliber: '.45 ACP', weight: '1050g', capacity: '14+1',
                image: 'https://sarsilmaz.com/content/images/products/k2-45-right.png'
            }
        }
    },
    cz: {
        name: 'CZ',
        models: {
            'shadow-2': {
                name: 'Shadow 2',
                length: 228, height: 150, width: 46,
                barrel: 119, caliber: '9×19mm', weight: '1280g', capacity: '17+1',
                image: 'https://cz-usa.com/wp-content/uploads/2023/cz-shadow-2-right.png'
            },
            'shadow-2-orange': {
                name: 'Shadow 2 Orange',
                length: 228, height: 150, width: 46,
                barrel: 119, caliber: '9×19mm', weight: '1270g', capacity: '17+1',
                image: 'https://cz-usa.com/wp-content/uploads/2023/cz-shadow-2-orange-right.png'
            },
            'shadow-2-compact': {
                name: 'Shadow 2 Compact',
                length: 184, height: 128, width: 37,
                barrel: 99, caliber: '9×19mm', weight: '880g', capacity: '15+1',
                image: 'https://cz-usa.com/wp-content/uploads/2023/cz-shadow-2-compact-right.png'
            },
            'ts2': {
                name: 'TS 2',
                length: 225, height: 150, width: 55,
                barrel: 130, caliber: '9×19mm', weight: '1320g', capacity: '20+1',
                image: 'https://cz-usa.com/wp-content/uploads/2023/cz-ts2-right.png'
            },
            'p10-f': {
                name: 'P-10 F',
                length: 203, height: 140, width: 33,
                barrel: 114, caliber: '9×19mm', weight: '820g', capacity: '19+1',
                image: 'https://cz-usa.com/wp-content/uploads/2023/cz-p10f-right.png'
            }
        }
    },
    wilson: {
        name: 'Wilson Combat',
        models: {
            'edc-x9': {
                name: 'EDC X9',
                length: 201, height: 140, width: 33,
                barrel: 102, caliber: '9×19mm', weight: '822g', capacity: '15+1',
                image: 'https://www.wilsoncombat.com/wp-content/uploads/edc-x9-right.png'
            },
            'edc-x9l': {
                name: 'EDC X9L',
                length: 213, height: 145, width: 33,
                barrel: 127, caliber: '9×19mm', weight: '862g', capacity: '15+1',
                image: 'https://www.wilsoncombat.com/wp-content/uploads/edc-x9l-right.png'
            },
            'sfx9': {
                name: 'SFX9',
                length: 196, height: 130, width: 32,
                barrel: 95, caliber: '9×19mm', weight: '736g', capacity: '15+1',
                image: 'https://www.wilsoncombat.com/wp-content/uploads/sfx9-right.png'
            },
            'combat-cqb-45': {
                name: 'CQB .45',
                length: 222, height: 148, width: 38,
                barrel: 127, caliber: '.45 ACP', weight: '1105g', capacity: '8+1',
                image: 'https://www.wilsoncombat.com/wp-content/uploads/cqb-45-right.png'
            }
        }
    }
};

// ===== ITEM DEFINITIONS (default sizes — user can resize) =====
const ITEM_DEFS = {
    ammoBox: {
        name: 'Mermi Kutusu',
        w: 130, h: 95, d: 70,
        color: '#5D8A3C', stroke: '#4A7030',
        icon: '🔲', resizable: true
    },
    magazine: {
        name: 'Şarjör',
        w: 40, h: 120, d: 25,
        color: '#5C5C5C', stroke: '#777',
        icon: '📎', resizable: true
    },
    spray: {
        name: 'Sprey',
        w: 52, h: 192, d: 52,
        color: '#2B5EA7', stroke: '#1E4A85',
        icon: '🧴', isRound: true, resizable: true
    },
    cleaningKit: {
        name: 'Temizlik Kiti',
        w: 180, h: 80, d: 45,
        color: '#6B4C2A', stroke: '#8B6642',
        icon: '🧹', resizable: true
    },
    earProtection: {
        name: 'Kulaklık',
        w: 160, h: 100, d: 90,
        color: '#CC8800', stroke: '#AA7000',
        icon: '🎧', resizable: true
    },
    glasses: {
        name: 'Koruyucu Gözlük',
        w: 170, h: 50, d: 60,
        color: '#455A64', stroke: '#607D8B',
        icon: '🥽', resizable: true
    }
};

// ===== CASE DEFINITIONS (updated real dims) =====
// Big Box:   46.3cm × 33.8cm exterior → interior usable for foam layout
// Small Box: 40.3cm × 33.0cm exterior → interior usable for foam layout
// Both have a 200×100mm blocked handle area (latch/hinge zone)
const CASE_DEFS = {
    big: {
        name: 'Fortify Pro Çanta',
        interiorW: 463,   // mm (46.3cm)
        interiorH: 338,   // mm (33.8cm)
        depth: 215,        // mm (21.5cm total depth)
        hasWheels: true,
        hasPull: true,
        maxBags: 2,
        blockedZone: { w: 100, h: 50, label: 'Kulp / Kilit Alanı' }
    },
    small: {
        name: 'Fortify Kompakt Çanta',
        interiorW: 403,   // mm (40.3cm)
        interiorH: 330,   // mm (33.0cm)
        depth: 210,        // mm (21.0cm total depth)
        hasWheels: false,
        hasPull: false,
        maxBags: 2,
        blockedZone: { w: 100, h: 50, label: 'Kulp / Kilit Alanı' }
    }
};

// ===== STATE =====
let state = {
    currentStep: 1,
    caseType: null,
    caseColor: 'orange',
    activeLayer: 'bottom',
    options: { bags: false, wheels: false, pull: false },
    layers: { bottom: [], top: [] },
    selectedItemId: null,
    itemIdCounter: 0,
    scale: 1
};

let stage = null;
let mainLayer = null;
let gridLayer = null;
let boundsRect = null;
let blockedRect = null;  // blocked zone bounds in canvas px

const GRID_SIZE = 10;       // mm
const SNAP_THRESHOLD = 5;

// ===== INITIALIZATION =====
document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(e) {
    if (state.currentStep !== 2) return;
    if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;
    if (e.key === 'r' || e.key === 'R') rotateSelected();
    else if (e.key === 'Delete' || e.key === 'Backspace') deleteSelected();
}

// ===== STEP NAVIGATION =====
function nextStep() {
    if (state.currentStep === 1) {
        if (!state.caseType) { showToast('Lütfen önce bir çanta tipi seçin', 'error'); return; }
        goToStep(2);
        setTimeout(() => initCanvas(), 100);
    } else if (state.currentStep === 2) {
        goToStep(3);
        renderReview();
    }
}

function prevStep() {
    if (state.currentStep === 2) goToStep(1);
    else if (state.currentStep === 3) { goToStep(2); setTimeout(() => initCanvas(), 100); }
}

function goToStep(n) {
    state.currentStep = n;
    document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
    document.getElementById('step' + n).classList.add('active');

    document.querySelectorAll('.step').forEach(el => {
        const sn = parseInt(el.dataset.step);
        el.classList.remove('active', 'completed');
        if (sn === n) el.classList.add('active');
        else if (sn < n) el.classList.add('completed');
    });

    document.getElementById('prevBtn').style.display = n === 1 ? 'none' : '';
    document.getElementById('nextBtn').style.display = n === 3 ? 'none' : '';
}

// ===== CASE SELECTION =====
function selectCase(type) {
    state.caseType = type;
    document.querySelectorAll('.case-card').forEach(el => {
        el.classList.toggle('selected', el.dataset.case === type);
    });

    const caseDef = CASE_DEFS[type];
    document.getElementById('opt-wheels').style.display = caseDef.hasWheels ? '' : 'none';
    document.getElementById('opt-pull').style.display = caseDef.hasPull ? '' : 'none';
    state.layers = { bottom: [], top: [] };
    showToast(`${caseDef.name} seçildi!`);
}

function selectColor(color) {
    state.caseColor = color;
    document.querySelectorAll('.color-option').forEach(el => el.classList.toggle('selected', el.dataset.color === color));
    document.querySelectorAll('.color-dot').forEach(dot => dot.classList.toggle('selected', dot.dataset.color === color));
}

// ===== WEAPON SELECTOR =====
function onBrandChange() {
    const brandKey = document.getElementById('weaponBrand').value;
    const modelSelect = document.getElementById('weaponModel');
    modelSelect.innerHTML = '<option value="">Model Seçin...</option>';
    modelSelect.disabled = !brandKey;
    document.getElementById('weaponInfo').classList.add('hidden');
    document.getElementById('addGunBtn').disabled = true;
    const orientEl = document.getElementById('gunOrientation');
    if (orientEl) orientEl.style.display = 'none';

    if (!brandKey) return;
    const brand = WEAPON_DB[brandKey];
    Object.entries(brand.models).forEach(([key, model]) => {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = model.name;
        modelSelect.appendChild(opt);
    });
}

// Track gun orientation selection
let selectedGunOrientation = 'horizontal';

function setGunOrientation(orient) {
    selectedGunOrientation = orient;
    document.getElementById('orientH').classList.toggle('active', orient === 'horizontal');
    document.getElementById('orientV').classList.toggle('active', orient === 'vertical');
}

function onModelChange() {
    const brandKey = document.getElementById('weaponBrand').value;
    const modelKey = document.getElementById('weaponModel').value;
    const orientEl = document.getElementById('gunOrientation');
    if (!brandKey || !modelKey) {
        document.getElementById('weaponInfo').classList.add('hidden');
        document.getElementById('addGunBtn').disabled = true;
        if (orientEl) orientEl.style.display = 'none';
        return;
    }
    const model = WEAPON_DB[brandKey].models[modelKey];
    document.getElementById('wLen').textContent = model.length + 'mm';
    document.getElementById('wHei').textContent = model.height + 'mm';
    document.getElementById('wWid').textContent = model.width + 'mm';
    document.getElementById('weaponInfo').classList.remove('hidden');
    document.getElementById('addGunBtn').disabled = false;
    if (orientEl) {
        orientEl.style.display = '';
        // Show/hide vertical option based on active layer
        const vertBtn = document.getElementById('orientV');
        if (vertBtn) {
            if (state.activeLayer !== 'top') {
                vertBtn.style.opacity = '0.4';
                vertBtn.title = 'Dikey yerleşim sadece Üst katmanda yapılabilir';
            } else {
                vertBtn.style.opacity = '1';
                vertBtn.title = 'Dikey (namlu yukarı, kabza aşağı)';
            }
        }
    }
}

// ===== CANVAS INIT =====
function initCanvas() {
    if (!state.caseType) return;

    const caseDef = CASE_DEFS[state.caseType];
    const container = document.getElementById('configurator-canvas');
    const wrapper = container.parentElement;
    container.innerHTML = '';

    const wrapperW = wrapper.clientWidth;
    const wrapperH = wrapper.clientHeight || 550;

    const padding = 60;
    const scaleX = (wrapperW - padding * 2) / caseDef.interiorW;
    const scaleY = (wrapperH - padding * 2) / caseDef.interiorH;
    state.scale = Math.min(scaleX, scaleY, 1.5);

    const canvasW = caseDef.interiorW * state.scale;
    const canvasH = caseDef.interiorH * state.scale;

    stage = new Konva.Stage({ container: 'configurator-canvas', width: wrapperW, height: wrapperH });
    gridLayer = new Konva.Layer();
    stage.add(gridLayer);
    mainLayer = new Konva.Layer();
    stage.add(mainLayer);

    const offsetX = (wrapperW - canvasW) / 2;
    const offsetY = (wrapperH - canvasH) / 2;

    // Case background
    gridLayer.add(new Konva.Rect({
        x: offsetX, y: offsetY, width: canvasW, height: canvasH,
        fill: '#1A1A1A',
        stroke: state.caseColor === 'orange' ? '#E87A1E' : '#555',
        strokeWidth: 3, cornerRadius: 8
    }));

    // Grid lines
    const gridSizePx = GRID_SIZE * state.scale;
    for (let x = offsetX; x <= offsetX + canvasW; x += gridSizePx) {
        gridLayer.add(new Konva.Line({ points: [x, offsetY, x, offsetY + canvasH], stroke: '#252525', strokeWidth: 0.5 }));
    }
    for (let y = offsetY; y <= offsetY + canvasH; y += gridSizePx) {
        gridLayer.add(new Konva.Line({ points: [offsetX, y, offsetX + canvasW, y], stroke: '#252525', strokeWidth: 0.5 }));
    }

    // ===== BLOCKED ZONE (Handle / Latch area) =====
    const bz = caseDef.blockedZone;
    const bzW = bz.w * state.scale;
    const bzH = bz.h * state.scale;
    // Centered at the bottom edge of the case
    const bzX = offsetX + (canvasW - bzW) / 2;
    const bzY = offsetY + canvasH - bzH;

    blockedRect = { x: bzX, y: bzY, w: bzW, h: bzH };

    // Draw blocked zone
    gridLayer.add(new Konva.Rect({
        x: bzX, y: bzY, width: bzW, height: bzH,
        fill: 'rgba(244, 67, 54, 0.08)',
        stroke: '#F44336',
        strokeWidth: 1.5,
        dash: [8, 4],
        cornerRadius: 4
    }));

    // Hatching pattern inside blocked zone
    const hatchSpacing = 12;
    for (let i = 0; i < (bzW + bzH); i += hatchSpacing) {
        const x1 = bzX + Math.min(i, bzW);
        const y1 = bzY + Math.max(0, i - bzW);
        const x2 = bzX + Math.max(0, i - bzH);
        const y2 = bzY + Math.min(i, bzH);
        gridLayer.add(new Konva.Line({
            points: [x1, y1, x2, y2],
            stroke: 'rgba(244, 67, 54, 0.12)',
            strokeWidth: 1
        }));
    }

    // Blocked zone label
    gridLayer.add(new Konva.Text({
        x: bzX, y: bzY + bzH / 2 - 7,
        width: bzW, align: 'center',
        text: '🔒 ' + bz.label,
        fontSize: 10, fill: '#F44336',
        fontFamily: 'Inter', fontStyle: 'bold'
    }));
    gridLayer.add(new Konva.Text({
        x: bzX, y: bzY + bzH / 2 + 6,
        width: bzW, align: 'center',
        text: bz.w + '×' + bz.h + ' mm',
        fontSize: 9, fill: 'rgba(244, 67, 54, 0.6)',
        fontFamily: 'Inter'
    }));

    // Dimension labels
    gridLayer.add(new Konva.Text({ x: offsetX, y: offsetY - 22, text: caseDef.interiorW + ' mm (' + (caseDef.interiorW / 10).toFixed(1) + ' cm)', fontSize: 12, fill: '#666', fontFamily: 'Inter', align: 'center', width: canvasW }));
    gridLayer.add(new Konva.Text({ x: offsetX - 50, y: offsetY + canvasH / 2 - 6, text: caseDef.interiorH + ' mm (' + (caseDef.interiorH / 10).toFixed(1) + ' cm)', fontSize: 12, fill: '#666', fontFamily: 'Inter', rotation: -90 }));

    // Layer label
    gridLayer.add(new Konva.Text({
        x: offsetX + 10, y: offsetY + canvasH - 22,
        text: state.activeLayer === 'bottom' ? '▼ ALT KATMAN' : '▲ ÜST KATMAN',
        fontSize: 11, fill: '#555', fontFamily: 'Rajdhani', letterSpacing: 2
    }));

    gridLayer.draw();

    boundsRect = { x: offsetX, y: offsetY, w: canvasW, h: canvasH };

    renderLayerItems();

    stage.on('click tap', (e) => {
        if (e.target === stage || e.target.getParent() === gridLayer) deselectAll();
    });

    updateCanvasInfo();
}

// ===== RENDER LAYER ITEMS =====
function renderLayerItems() {
    if (!mainLayer) return;
    mainLayer.destroyChildren();

    // Render actual items for the active layer
    state.layers[state.activeLayer].forEach(item => {
        if (item.isShadow) {
            createShadowItem(item);
        } else {
            createCanvasItem(item);
        }
    });

    mainLayer.draw();
    updateCanvasInfo();
    updateLayerSummary();
}

// ===== CREATE SHADOW ITEM (non-draggable blocked zone on bottom layer) =====
function createShadowItem(item) {
    const w = item.wMM * state.scale;
    const h = item.hMM * state.scale;

    const group = new Konva.Group({
        x: item.x, y: item.y,
        rotation: item.rotation,
        draggable: false,
        id: 'item-' + item.id
    });

    // Hatched blocked area
    const pad = 2;
    group.add(new Konva.Rect({
        x: -pad, y: -pad,
        width: w + pad * 2, height: h + pad * 2,
        fill: 'rgba(244, 67, 54, 0.06)',
        stroke: '#F44336',
        strokeWidth: 1.5,
        dash: [6, 4],
        cornerRadius: 4
    }));

    // Hatching pattern
    const hatchSpacing = 10;
    const clipGroup = new Konva.Group({ clip: { x: 0, y: 0, width: w, height: h } });
    for (let i = 0; i < (w + h); i += hatchSpacing) {
        const x1 = Math.min(i, w);
        const y1 = Math.max(0, i - w);
        const x2 = Math.max(0, i - h);
        const y2 = Math.min(i, h);
        clipGroup.add(new Konva.Line({
            points: [x1, y1, x2, y2],
            stroke: 'rgba(244, 67, 54, 0.15)',
            strokeWidth: 1
        }));
    }
    group.add(clipGroup);

    // Lock icon and label
    group.add(new Konva.Text({
        x: 0, y: h / 2 - 14,
        width: w, align: 'center',
        text: '🔒 Engelli',
        fontSize: 10, fill: '#F44336',
        fontFamily: 'Inter', fontStyle: 'bold'
    }));
    group.add(new Konva.Text({
        x: 0, y: h / 2,
        width: w, align: 'center',
        text: `↕ ${item.name}`,
        fontSize: 8, fill: 'rgba(244, 67, 54, 0.7)',
        fontFamily: 'Inter'
    }));
    group.add(new Konva.Text({
        x: 0, y: h / 2 + 12,
        width: w, align: 'center',
        text: `${item.wMM}×${item.hMM}mm (üstteki dikey öğe)`,
        fontSize: 7, fill: 'rgba(244, 67, 54, 0.5)',
        fontFamily: 'Inter'
    }));

    mainLayer.add(group);
}

// ===== ADD ITEMS =====
function addGunToCanvas() {
    const brandKey = document.getElementById('weaponBrand').value;
    const modelKey = document.getElementById('weaponModel').value;
    if (!brandKey || !modelKey) return;

    const brand = WEAPON_DB[brandKey];
    const model = brand.models[modelKey];
    const withOptic = document.getElementById('withOptic')?.checked || false;
    const isVertical = selectedGunOrientation === 'vertical';

    // Vertical items can only be placed on the top layer
    if (isVertical && state.activeLayer !== 'top') {
        showToast('⚠️ Dikey tabancalar sadece ÜST katmana yerleştirilebilir (her iki katmanı kaplar)', 'error');
        return;
    }

    const id = ++state.itemIdCounter;

    // For vertical orientation, swap length<->height so the gun stands upright
    const itemW = isVertical ? model.height : model.length;
    const itemH = isVertical ? model.length : model.height;

    const item = {
        id, type: 'gun',
        name: `${brand.name} ${model.name}`,
        brand: brand.name, model: model.name,
        brandKey, modelKey,
        wMM: itemW, hMM: itemH, dMM: model.width,
        defaultWMM: itemW, defaultHMM: itemH, defaultDMM: model.width,
        originalLength: model.length, originalHeight: model.height,
        orientation: isVertical ? 'vertical' : 'horizontal',
        isVertical: isVertical,
        shadowId: null,
        caliber: model.caliber, capacity: model.capacity,
        imageUrl: model.image || null,
        hasOptic: withOptic,
        opticItemId: null,
        x: boundsRect.x + 20,
        y: boundsRect.y + 20,
        rotation: 0,
        color: '#8B4513', stroke: '#A0522D',
        resizable: true
    };

    state.layers.top.push(item);
    createCanvasItem(item);

    // Create shadow on bottom layer for vertical items
    if (isVertical) {
        const shadowId = ++state.itemIdCounter;
        const shadow = {
            id: shadowId, type: 'shadow',
            name: `↕ ${brand.name} ${model.name} (engelli)`,
            isShadow: true,
            shadowOfId: item.id,
            wMM: itemW, hMM: itemH, dMM: model.width,
            x: item.x, y: item.y,
            rotation: 0,
            color: 'rgba(139, 69, 19, 0.3)', stroke: '#F44336'
        };
        item.shadowId = shadowId;
        state.layers.bottom.push(shadow);
    }

    // Auto-add optic item if enabled
    if (withOptic) {
        const opticId = ++state.itemIdCounter;
        const opticItem = {
            id: opticId, type: 'optic',
            name: `Optik (${brand.name} ${model.name})`,
            parentGunId: item.id,
            wMM: 50, hMM: 50, dMM: 50,
            defaultWMM: 50, defaultHMM: 50, defaultDMM: 50,
            x: boundsRect.x + 20 + itemW * state.scale + 10,
            y: boundsRect.y + 20,
            rotation: 0,
            color: '#5C6BC0', stroke: '#3F51B5',
            resizable: true
        };
        item.opticItemId = opticId;
        state.layers.top.push(opticItem);
        createCanvasItem(opticItem);
    }

    mainLayer.draw();
    updateCanvasInfo();
    updateLayerSummary();
    showToast(`${item.name}${isVertical ? ' (dikey, her iki katmanı kaplar)' : ''}${withOptic ? ' + Optik' : ''} üst katmana eklendi`);
}

// Track magazine orientation selection
let selectedMagOrientation = 'horizontal';

function setMagOrientation(orient) {
    selectedMagOrientation = orient;
    document.getElementById('magOrientH').classList.toggle('active', orient === 'horizontal');
    document.getElementById('magOrientV').classList.toggle('active', orient === 'vertical');
}

function addItemToCanvas(type) {
    if (!stage) { showToast('Yapılandırmak için Adım 2\'ye gidin', 'error'); return; }

    const def = ITEM_DEFS[type];
    const id = ++state.itemIdCounter;

    // Check for vertical magazine
    const isMagVertical = (type === 'magazine' && selectedMagOrientation === 'vertical');

    if (isMagVertical && state.activeLayer !== 'top') {
        showToast('⚠️ Dikey şarjörler sadece ÜST katmana yerleştirilebilir (her iki katmanı kaplar)', 'error');
        return;
    }

    const itemW = isMagVertical ? def.h : def.w;
    const itemH = isMagVertical ? def.w : def.h;

    const item = {
        id, type,
        name: def.name + (isMagVertical ? ' (dikey)' : ''),
        wMM: itemW, hMM: itemH, dMM: def.d,
        defaultWMM: itemW, defaultHMM: itemH, defaultDMM: def.d,
        orientation: isMagVertical ? 'vertical' : 'horizontal',
        isVertical: isMagVertical,
        shadowId: null,
        x: boundsRect.x + 30 + Math.random() * 60,
        y: boundsRect.y + 20 + Math.random() * 60,
        rotation: 0,
        color: def.color, stroke: def.stroke,
        isRound: def.isRound || false,
        resizable: def.resizable || false
    };

    const targetLayer = isMagVertical ? 'top' : state.activeLayer;
    state.layers[targetLayer].push(item);
    if (targetLayer === state.activeLayer) {
        createCanvasItem(item);
    }

    // Create shadow on bottom layer for vertical magazines
    if (isMagVertical) {
        const shadowId = ++state.itemIdCounter;
        const shadow = {
            id: shadowId, type: 'shadow',
            name: `↕ ${def.name} (engelli)`,
            isShadow: true,
            shadowOfId: item.id,
            wMM: itemW, hMM: itemH, dMM: def.d,
            x: item.x, y: item.y,
            rotation: 0,
            color: 'rgba(92, 92, 92, 0.3)', stroke: '#F44336'
        };
        item.shadowId = shadowId;
        state.layers.bottom.push(shadow);
    }

    mainLayer.draw();
    updateCanvasInfo();
    updateLayerSummary();
    showToast(`${item.name} eklendi${isMagVertical ? ' (her iki katmanı kaplar)' : ' (boyutlandırmak için köşeleri sürükleyin)'}`);
}

// ===== CREATE CANVAS ITEM =====
function createCanvasItem(item) {
    const w = item.wMM * state.scale;
    const h = item.hMM * state.scale;

    const group = new Konva.Group({
        x: item.x, y: item.y,
        rotation: item.rotation,
        draggable: true,
        id: 'item-' + item.id
    });

    // Cutout shape
    const cutoutPad = 4;
    group.add(new Konva.Rect({
        x: -cutoutPad, y: -cutoutPad,
        width: w + cutoutPad * 2, height: h + cutoutPad * 2,
        fill: '#2D2D2D',
        cornerRadius: item.isRound ? Math.min(w, h) / 2 : 4,
        stroke: '#3A3A3A', strokeWidth: 1,
        name: 'cutout'
    }));

    // Item visual
    if (item.type === 'gun') {
        renderGunVisual(group, w, h, item);
    } else if (item.type === 'optic') {
        // Optic — purple square with crosshair icon
        group.add(new Konva.Rect({ x: 0, y: 0, width: w, height: h, fill: item.color, stroke: item.stroke, strokeWidth: 1.5, cornerRadius: 3, name: 'itemShape' }));
        const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.35;
        group.add(new Konva.Circle({ x: cx, y: cy, radius: r, stroke: '#FFF', strokeWidth: 1.5, fill: 'rgba(255,255,255,0.08)' }));
        group.add(new Konva.Circle({ x: cx, y: cy, radius: 3, fill: '#FF5252' }));
        group.add(new Konva.Line({ points: [cx - r - 4, cy, cx + r + 4, cy], stroke: '#FFF', strokeWidth: 0.8 }));
        group.add(new Konva.Line({ points: [cx, cy - r - 4, cx, cy + r + 4], stroke: '#FFF', strokeWidth: 0.8 }));
    } else if (item.isRound) {
        const r = Math.min(w, h) / 2;
        group.add(new Konva.Circle({ x: w / 2, y: w / 2, radius: r - 2, fill: item.color, stroke: item.stroke, strokeWidth: 1.5, name: 'itemShape' }));
        if (item.type === 'spray') {
            group.add(new Konva.Line({ points: [w / 2, w / 2, w / 2, h - 4], stroke: '#AAA', strokeWidth: 1.5, dash: [3, 2] }));
            group.add(new Konva.Circle({ x: w / 2, y: 6, radius: 2, fill: '#FF5722' }));
        }
    } else {
        group.add(new Konva.Rect({ x: 0, y: 0, width: w, height: h, fill: item.color, stroke: item.stroke, strokeWidth: 1.5, cornerRadius: 3, name: 'itemShape' }));
    }

    // Label
    const labelSize = Math.max(8, Math.min(11, w / 10));
    group.add(new Konva.Text({ x: 2, y: h + 6, text: item.name, fontSize: labelSize, fill: '#888', fontFamily: 'Inter', width: w, name: 'itemLabel' }));
    group.add(new Konva.Text({ x: 2, y: h + 6 + labelSize + 2, text: `${item.wMM}×${item.hMM}×${item.dMM || '?'}mm`, fontSize: 9, fill: '#555', fontFamily: 'Inter', name: 'dimLabel' }));

    // Selection highlight
    group.add(new Konva.Rect({
        x: -cutoutPad - 2, y: -cutoutPad - 2,
        width: w + cutoutPad * 2 + 4, height: h + cutoutPad * 2 + 4,
        stroke: '#E87A1E', strokeWidth: 2, dash: [6, 3],
        visible: false, name: 'selectionRect'
    }));

    // ===== RESIZE HANDLE (bottom-right corner) =====
    if (item.resizable) {
        const handleSize = 14;
        const resizeHandle = new Konva.Group({
            x: w - handleSize / 2,
            y: h - handleSize / 2,
            name: 'resizeHandle',
            visible: false,
            draggable: true
        });

        // Handle visual
        resizeHandle.add(new Konva.Rect({
            x: 0, y: 0, width: handleSize, height: handleSize,
            fill: '#E87A1E', stroke: '#FFF', strokeWidth: 1,
            cornerRadius: 2
        }));
        // Resize icon
        resizeHandle.add(new Konva.Text({
            x: 1, y: 0, width: handleSize, height: handleSize,
            text: '⤡', fontSize: 11, fill: '#FFF',
            fontFamily: 'Inter', align: 'center', verticalAlign: 'middle'
        }));

        resizeHandle.on('dragstart', (e) => { e.cancelBubble = true; });

        resizeHandle.on('dragmove', (e) => {
            e.cancelBubble = true;
            const pos = resizeHandle.position();
            const minSize = 20 * state.scale;
            const newW = Math.max(minSize, pos.x + handleSize / 2);
            const newH = Math.max(minSize, pos.y + handleSize / 2);

            // Snap to grid
            const gridPx = GRID_SIZE * state.scale;
            const snappedW = Math.round(newW / gridPx) * gridPx;
            const snappedH = Math.round(newH / gridPx) * gridPx;

            // Update item dimensions
            item.wMM = Math.round(snappedW / state.scale);
            item.hMM = Math.round(snappedH / state.scale);

            // Rebuild the item visually
            rebuildCanvasItem(group, item);
        });

        resizeHandle.on('dragend', (e) => {
            e.cancelBubble = true;
            syncShadowPosition(item);
            updateSelectionInfo(item);
            updateLayerSummary();
        });

        group.add(resizeHandle);
    }

    // EVENTS
    group.on('click tap', () => selectItem(item.id));
    group.on('dragstart', () => { selectItem(item.id); group.moveToTop(); });
    group.on('dragmove', () => {
        const pos = group.position();
        const gridPx = GRID_SIZE * state.scale;
        const snapX = Math.round((pos.x - boundsRect.x) / gridPx) * gridPx + boundsRect.x;
        const snapY = Math.round((pos.y - boundsRect.y) / gridPx) * gridPx + boundsRect.y;
        group.position({ x: snapX, y: snapY });
        constrainToBounds(group, item);
    });
    group.on('dragend', () => {
        const pos = group.position();
        item.x = pos.x;
        item.y = pos.y;
        checkCollisions(group, item);
        // Sync shadow position for vertical items
        syncShadowPosition(item);
    });

    mainLayer.add(group);
}

// ===== REBUILD ITEM (for resize) =====
function rebuildCanvasItem(group, item) {
    const w = item.wMM * state.scale;
    const h = item.hMM * state.scale;
    const cutoutPad = 4;

    // Update cutout
    const cutout = group.findOne('.cutout');
    if (cutout) {
        cutout.width(w + cutoutPad * 2);
        cutout.height(h + cutoutPad * 2);
    }

    // For optic items, rebuild the crosshair visuals
    if (item.type === 'optic') {
        // Remove old optic visuals
        const oldShape = group.findOne('.itemShape');
        if (oldShape) oldShape.destroy();
        group.find('Circle').forEach(c => c.destroy());
        group.find('Line').forEach(l => l.destroy());

        // Redraw
        group.add(new Konva.Rect({ x: 0, y: 0, width: w, height: h, fill: item.color, stroke: item.stroke, strokeWidth: 1.5, cornerRadius: 3, name: 'itemShape' }));
        const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.35;
        group.add(new Konva.Circle({ x: cx, y: cy, radius: r, stroke: '#FFF', strokeWidth: 1.5, fill: 'rgba(255,255,255,0.08)' }));
        group.add(new Konva.Circle({ x: cx, y: cy, radius: 3, fill: '#FF5252' }));
        group.add(new Konva.Line({ points: [cx - r - 4, cy, cx + r + 4, cy], stroke: '#FFF', strokeWidth: 0.8 }));
        group.add(new Konva.Line({ points: [cx, cy - r - 4, cx, cy + r + 4], stroke: '#FFF', strokeWidth: 0.8 }));

        // Move labels and selection on top
        const label = group.findOne('.itemLabel');
        const dimLabel = group.findOne('.dimLabel');
        const selRect = group.findOne('.selectionRect');
        const resizeHandle = group.findOne('.resizeHandle');
        if (label) label.moveToTop();
        if (dimLabel) dimLabel.moveToTop();
        if (selRect) selRect.moveToTop();
        if (resizeHandle) resizeHandle.moveToTop();
    } else {
        // Update item shape
        const shape = group.findOne('.itemShape');
        if (shape) {
            if (shape instanceof Konva.Rect) {
                shape.width(w);
                shape.height(h);
            } else if (shape instanceof Konva.Circle) {
                shape.radius(Math.min(w, h) / 2 - 2);
                shape.x(w / 2);
                shape.y(w / 2);
            }
        }
    }

    // Update labels
    const label = group.findOne('.itemLabel');
    if (label) { label.y(h + 6); label.width(w); }
    const dimLabel = group.findOne('.dimLabel');
    if (dimLabel) { dimLabel.y(h + 6 + 13); dimLabel.text(`${item.wMM}×${item.hMM}×${item.dMM || '?'}mm`); }

    // Update selection rect
    const selRect = group.findOne('.selectionRect');
    if (selRect) {
        selRect.width(w + cutoutPad * 2 + 4);
        selRect.height(h + cutoutPad * 2 + 4);
    }

    // Update resize handle position
    const handleSize = 14;
    const resizeHandle = group.findOne('.resizeHandle');
    if (resizeHandle) {
        resizeHandle.position({ x: w - handleSize / 2, y: h - handleSize / 2 });
    }

    mainLayer.draw();
}

// ===== GUN RENDERING — Image with fallback =====
function renderGunVisual(group, w, h, item) {
    const imgUrl = item.imageUrl;
    const isVert = item.orientation === 'vertical';

    // For vertical guns, we draw as if horizontal (using original dims) then rotate the inner group
    const drawW = isVert ? h : w;
    const drawH = isVert ? w : h;

    // Create inner group for gun visual that can be rotated for vertical
    const gunGroup = new Konva.Group({ name: 'gunVisualGroup' });
    if (isVert) {
        // Rotate inner drawings 90° clockwise: barrel points up, grip down
        gunGroup.rotation(-90);
        gunGroup.offsetX(0);
        gunGroup.offsetY(drawW);
        gunGroup.x(0);
        gunGroup.y(0);
    }
    group.add(gunGroup);

    if (!imgUrl) {
        drawGunSilhouette(gunGroup, drawW, drawH, item);
        return;
    }

    // Check cache first
    if (gunImageCache[imgUrl]) {
        addGunImage(gunGroup, drawW, drawH, gunImageCache[imgUrl], item);
        return;
    }

    // Draw placeholder while loading
    const placeholder = new Konva.Rect({
        x: 0, y: 0, width: drawW, height: drawH,
        fill: '#333', cornerRadius: 3, name: 'gunPlaceholder'
    });
    gunGroup.add(placeholder);

    const loadingText = new Konva.Text({
        x: 0, y: drawH / 2 - 6, width: drawW, align: 'center',
        text: 'Yükleniyor...', fontSize: 10, fill: '#666',
        fontFamily: 'Inter', name: 'loadingText'
    });
    gunGroup.add(loadingText);
    mainLayer.draw();

    // Load image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
        gunImageCache[imgUrl] = img;
        const ph = gunGroup.findOne('.gunPlaceholder');
        const lt = gunGroup.findOne('.loadingText');
        if (ph) ph.destroy();
        if (lt) lt.destroy();
        addGunImage(gunGroup, drawW, drawH, img, item);
        mainLayer.draw();
    };
    img.onerror = () => {
        const ph = gunGroup.findOne('.gunPlaceholder');
        const lt = gunGroup.findOne('.loadingText');
        if (ph) ph.destroy();
        if (lt) lt.destroy();
        drawGunSilhouette(gunGroup, drawW, drawH, item);
        mainLayer.draw();
    };
    img.src = imgUrl;
}

function addGunImage(group, w, h, imgElement, item) {
    const konvaImg = new Konva.Image({
        x: 0, y: 0, width: w, height: h,
        image: imgElement,
        name: 'gunImage'
    });
    // Place image below labels/selection but above cutout
    const cutout = group.findOne('.cutout');
    if (cutout) {
        konvaImg.moveToTop();
        // Find the label and move it above
        const label = group.findOne('.itemLabel');
        const dimLabel = group.findOne('.dimLabel');
        const selRect = group.findOne('.selectionRect');
        if (label) label.moveToTop();
        if (dimLabel) dimLabel.moveToTop();
        if (selRect) selRect.moveToTop();
    }
    group.add(konvaImg);

    // Add model name overlay on the image
    group.add(new Konva.Text({
        x: 2, y: 2,
        text: (item.brand || '') + '\n' + (item.model || ''),
        fontSize: Math.max(7, Math.min(9, w / 18)),
        fill: 'rgba(255,255,255,0.5)',
        fontFamily: 'Rajdhani', fontStyle: 'bold',
        name: 'gunNameOverlay'
    }));
}

function drawGunSilhouette(group, w, h, item) {
    const bodyH = h * 0.45;
    const gripH = h * 0.55;
    const gripW = w * 0.3;
    const barrelLen = w * 0.95;
    const slideH = bodyH * 0.6;

    // Slide
    group.add(new Konva.Rect({ x: w * 0.02, y: 0, width: barrelLen, height: slideH, fill: '#4A4A4A', stroke: '#666', strokeWidth: 1, cornerRadius: [3, 3, 0, 0] }));
    // Frame
    group.add(new Konva.Rect({ x: w * 0.05, y: slideH, width: w * 0.65, height: bodyH - slideH, fill: '#3D3D3D', stroke: '#555', strokeWidth: 1 }));
    // Trigger guard
    group.add(new Konva.Rect({ x: w * 0.35, y: bodyH, width: w * 0.2, height: h * 0.12, fill: 'transparent', stroke: '#555', strokeWidth: 1, cornerRadius: [0, 0, 4, 4] }));
    // Grip
    group.add(new Konva.Rect({ x: w * 0.2, y: bodyH, width: gripW, height: gripH - 4, fill: '#333', stroke: '#555', strokeWidth: 1, cornerRadius: [0, 0, 3, 3] }));
    // Barrel tip
    group.add(new Konva.Rect({ x: barrelLen - 2, y: 2, width: 4, height: slideH - 4, fill: '#222', cornerRadius: 1 }));
    // Front sight
    group.add(new Konva.Circle({ x: w * 0.85, y: -2, radius: 2, fill: '#FF5722' }));
    // Model name
    const fontSize = Math.max(7, Math.min(10, gripW / 5));
    group.add(new Konva.Text({ x: w * 0.22, y: bodyH + gripH * 0.2, text: item.model || 'GUN', fontSize, fill: '#777', fontFamily: 'Rajdhani', width: gripW - 4, align: 'center' }));

    // "No image" indicator
    group.add(new Konva.Text({ x: w - 55, y: 2, text: '(fotoğraf yok)', fontSize: 7, fill: '#555', fontFamily: 'Inter' }));
}

// ===== CONSTRAINTS & COLLISION =====
function constrainToBounds(group, item) {
    const pos = group.position();
    const w = item.wMM * state.scale;
    const h = item.hMM * state.scale;

    const rot = group.rotation() % 360;
    let effW = w, effH = h;
    if (rot === 90 || rot === 270 || rot === -90 || rot === -270) { effW = h; effH = w; }

    const nx = Math.max(boundsRect.x, Math.min(pos.x, boundsRect.x + boundsRect.w - effW));
    const ny = Math.max(boundsRect.y, Math.min(pos.y, boundsRect.y + boundsRect.h - effH));
    group.position({ x: nx, y: ny });
}

function checkCollisions(group, item) {
    const items = state.layers[state.activeLayer];
    const gB = getGroupBounds(group, item);
    let hasCollision = false;

    // Check collision with other items (including shadow items rendered on canvas)
    mainLayer.children.forEach(child => {
        if (child.id() === group.id()) return;
        const otherItem = items.find(i => 'item-' + i.id === child.id());
        if (!otherItem) return;
        const oB = getGroupBounds(child, otherItem);
        if (rectsOverlap(gB, oB)) hasCollision = true;
    });

    // Check collision with blocked zone
    if (blockedRect && rectsOverlap(gB, blockedRect)) {
        hasCollision = true;
        showToast('⚠️ Kulp/kilit alanına öğe yerleştirilemez!', 'error');
    }

    if (hasCollision) {
        const selRect = group.findOne('.selectionRect');
        if (selRect) {
            selRect.stroke('#F44336');
            selRect.visible(true);
            mainLayer.draw();
            setTimeout(() => {
                selRect.stroke('#E87A1E');
                selRect.visible(state.selectedItemId === item.id);
                mainLayer.draw();
            }, 1500);
        }
        if (!blockedRect || !rectsOverlap(gB, blockedRect)) {
            showToast('⚠️ Öğeler çakışıyor!', 'error');
        }
    }
}

function getGroupBounds(group, item) {
    const pos = group.position();
    const w = item.wMM * state.scale;
    const h = item.hMM * state.scale;
    const rot = group.rotation() % 360;
    const isRotated = (rot === 90 || rot === 270 || rot === -90 || rot === -270);
    return { x: pos.x, y: pos.y, w: isRotated ? h : w, h: isRotated ? w : h };
}

function rectsOverlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
}

// ===== SELECTION =====
function selectItem(id) {
    state.selectedItemId = id;
    mainLayer.children.forEach(child => {
        const sel = child.findOne('.selectionRect');
        const resize = child.findOne('.resizeHandle');
        if (sel) sel.visible(child.id() === 'item-' + id);
        if (resize) resize.visible(child.id() === 'item-' + id);
    });
    mainLayer.draw();
    const item = state.layers[state.activeLayer].find(i => i.id === id);
    if (item) updateSelectionInfo(item);
}

function deselectAll() {
    state.selectedItemId = null;
    if (mainLayer) {
        mainLayer.children.forEach(child => {
            const sel = child.findOne('.selectionRect');
            const resize = child.findOne('.resizeHandle');
            if (sel) sel.visible(false);
            if (resize) resize.visible(false);
        });
        mainLayer.draw();
    }
    document.getElementById('selectionInfo').innerHTML = '<p class="no-selection">Detayları görmek için tuval üzerinde bir öğeye tıklayın</p>';
}

function updateSelectionInfo(item) {
    // Shadow items show read-only info
    if (item.isShadow) {
        let html = `<div class="selected-item-info">
            <h4>🔒 Engelli Bölge</h4>
            <div class="info-row"><span class="info-label">Tür</span><span class="info-value">Dikey öğe gölgesi</span></div>
            <div class="info-row"><span class="info-label">Kaynak</span><span class="info-value">${item.name}</span></div>
            <div class="info-row"><span class="info-label">Boyutlar</span><span class="info-value">${item.wMM} × ${item.hMM} mm</span></div>
            <p style="font-size:11px;color:#F44336;margin-top:8px;">⚠️ Bu alan Üst katmandaki dikey bir öğe tarafından engellenmiştir. Değiştirmek veya silmek için Üst katmana geçin.</p>
        </div>`;
        document.getElementById('selectionInfo').innerHTML = html;
        return;
    }

    let html = `<div class="selected-item-info">
        <h4>${item.name}</h4>
        <div class="info-row"><span class="info-label">Tür</span><span class="info-value">${item.type === 'gun' ? 'Tabanca' : ITEM_DEFS[item.type]?.name || item.type}</span></div>`;

    // Editable dimensions for all items
    html += `<div class="info-row resize-row">
        <span class="info-label">Genişlik (mm)</span>
        <input type="number" class="resize-input" id="resizeW" value="${item.wMM}" min="20" max="400" step="5" onchange="resizeSelectedItem()">
    </div>
    <div class="info-row resize-row">
        <span class="info-label">Yükseklik (mm)</span>
        <input type="number" class="resize-input" id="resizeH" value="${item.hMM}" min="20" max="400" step="5" onchange="resizeSelectedItem()">
    </div>
    <div class="info-row resize-row">
        <span class="info-label">Derinlik (mm)</span>
        <input type="number" class="resize-input" id="resizeD" value="${item.dMM || 0}" min="5" max="300" step="5" onchange="resizeSelectedItem()">
    </div>`;
    if (item.defaultWMM) {
        html += `<button class="reset-size-btn" onclick="resetItemSize()">
            <span class="material-icons" style="font-size:14px">restart_alt</span> Varsayılana sıfırla (${item.defaultWMM}×${item.defaultHMM}×${item.defaultDMM || '?'})
        </button>`;
    }

    // Show optic info if this gun has an optic
    if (item.type === 'gun' && item.hasOptic) {
        html += `<div class="info-row"><span class="info-label">Optik</span><span class="info-value">✓ Red Dot (50×50mm)</span></div>`;
    }

    if (item.type === 'gun') {
        html += `<div class="info-row"><span class="info-label">Marka</span><span class="info-value">${item.brand}</span></div>
        <div class="info-row"><span class="info-label">Model</span><span class="info-value">${item.model}</span></div>
        <div class="info-row"><span class="info-label">Kalibre</span><span class="info-value">${item.caliber}</span></div>
        <div class="info-row"><span class="info-label">Kapasite</span><span class="info-value">${item.capacity}</span></div>
        <div class="info-row"><span class="info-label">Yön</span><span class="info-value">${item.orientation === 'vertical' ? '↕ Dikey' : '↔ Yatay'}</span></div>
        <div class="info-row"><span class="info-label">Optik</span><span class="info-value">${item.hasOptic ? '✓ Evet (50×50mm)' : '✗ Hayır'}</span></div>`;
    }

    html += `<div class="info-row"><span class="info-label">Konum</span><span class="info-value">${Math.round((item.x - boundsRect.x) / state.scale)}, ${Math.round((item.y - boundsRect.y) / state.scale)} mm</span></div>
        <div class="info-row"><span class="info-label">Dönüş</span><span class="info-value">${item.rotation}°</span></div>`;

    // Show vertical spanning note
    if (item.isVertical) {
        html += `<p style="font-size:11px;color:#FF9800;margin-top:8px;">↕ Bu öğe HER İKİ katmanı kaplar. Alt katmanda eşleşen bir engelli bölge vardır.</p>`;
    }

    html += `</div>`;

    document.getElementById('selectionInfo').innerHTML = html;
}

// ===== SYNC SHADOW POSITION =====
function syncShadowPosition(item) {
    if (!item.isVertical || !item.shadowId) return;
    const shadow = state.layers.bottom.find(s => s.id === item.shadowId);
    if (shadow) {
        shadow.x = item.x;
        shadow.y = item.y;
        shadow.wMM = item.wMM;
        shadow.hMM = item.hMM;
        shadow.rotation = item.rotation;
    }
}

// ===== RESIZE FROM INPUT =====
function resizeSelectedItem() {
    if (!state.selectedItemId) return;
    const item = state.layers[state.activeLayer].find(i => i.id === state.selectedItemId);
    if (!item) return;

    const newW = parseInt(document.getElementById('resizeW').value) || item.wMM;
    const newH = parseInt(document.getElementById('resizeH').value) || item.hMM;
    const newD = parseInt(document.getElementById('resizeD')?.value) || item.dMM;

    item.wMM = Math.max(20, Math.min(400, newW));
    item.hMM = Math.max(20, Math.min(400, newH));
    item.dMM = Math.max(5, Math.min(300, newD));

    // Rebuild visually
    const group = mainLayer.findOne('#item-' + item.id);
    if (group) {
        rebuildCanvasItem(group, item);
        constrainToBounds(group, item);
        item.x = group.x();
        item.y = group.y();
    }
    // Sync shadow for vertical items
    syncShadowPosition(item);
    updateLayerSummary();
}

function resetItemSize() {
    if (!state.selectedItemId) return;
    const item = state.layers[state.activeLayer].find(i => i.id === state.selectedItemId);
    if (!item || !item.defaultWMM) return;

    item.wMM = item.defaultWMM;
    item.hMM = item.defaultHMM;
    item.dMM = item.defaultDMM;

    const group = mainLayer.findOne('#item-' + item.id);
    if (group) {
        rebuildCanvasItem(group, item);
        constrainToBounds(group, item);
        item.x = group.x();
        item.y = group.y();
    }
    syncShadowPosition(item);
    updateSelectionInfo(item);
    updateLayerSummary();
    showToast('Varsayılan boyuta sıfırlandı');
}

// ===== TOOLBAR ACTIONS =====
function rotateSelected() {
    if (!state.selectedItemId) return;
    const item = state.layers[state.activeLayer].find(i => i.id === state.selectedItemId);
    if (!item) return;
    // Don't allow rotating shadow items
    if (item.isShadow) return;
    item.rotation = (item.rotation + 90) % 360;
    const group = mainLayer.findOne('#item-' + item.id);
    if (group) {
        group.rotation(item.rotation);
        constrainToBounds(group, item);
        item.x = group.x();
        item.y = group.y();
        syncShadowPosition(item);
        mainLayer.draw();
        updateSelectionInfo(item);
    }
}

function deleteSelected() {
    if (!state.selectedItemId) return;
    const items = state.layers[state.activeLayer];
    const idx = items.findIndex(i => i.id === state.selectedItemId);
    if (idx === -1) return;

    // Prevent deleting shadow items directly
    if (items[idx].isShadow) {
        showToast('⚠️ Bu, üst katmandaki dikey bir öğenin engelli bölgesidir. Öğeyi üst katmandan silin.', 'error');
        return;
    }

    const removed = items.splice(idx, 1)[0];
    const group = mainLayer.findOne('#item-' + state.selectedItemId);
    if (group) group.destroy();

    // If deleted item is a gun with an optic, also remove the optic
    if (removed.type === 'gun' && removed.opticItemId) {
        const opticIdx = items.findIndex(i => i.id === removed.opticItemId);
        if (opticIdx !== -1) items.splice(opticIdx, 1);
        const opticGroup = mainLayer.findOne('#item-' + removed.opticItemId);
        if (opticGroup) opticGroup.destroy();
    }

    // If deleted item is an optic, clear the parent gun's optic reference
    if (removed.type === 'optic' && removed.parentGunId) {
        const parentGun = items.find(i => i.id === removed.parentGunId);
        if (parentGun) {
            parentGun.hasOptic = false;
            parentGun.opticItemId = null;
        }
    }

    // If deleted item is vertical (gun or magazine), remove its shadow from the bottom layer
    if (removed.isVertical && removed.shadowId) {
        const bottomItems = state.layers.bottom;
        const shadowIdx = bottomItems.findIndex(i => i.id === removed.shadowId);
        if (shadowIdx !== -1) bottomItems.splice(shadowIdx, 1);
    }

    state.selectedItemId = null;
    mainLayer.draw();
    updateCanvasInfo();
    updateLayerSummary();
    document.getElementById('selectionInfo').innerHTML = '<p class="no-selection">Detayları görmek için tuval üzerinde bir öğeye tıklayın</p>';
    showToast(`${removed.name} kaldırıldı`);
}

function clearCurrentLayer() {
    if (!confirm(`${state.activeLayer === 'bottom' ? 'Alt' : 'Üst'} katmandaki tüm öğeler temizlensin mi?`)) return;

    // If clearing top layer, also remove all shadows from bottom layer
    if (state.activeLayer === 'top') {
        const verticalIds = state.layers.top.filter(i => i.isVertical && i.shadowId).map(i => i.shadowId);
        state.layers.bottom = state.layers.bottom.filter(i => !verticalIds.includes(i.id));
    }

    // If clearing bottom layer, keep shadow items (they belong to top layer vertical items)
    if (state.activeLayer === 'bottom') {
        state.layers.bottom = state.layers.bottom.filter(i => i.isShadow);
    } else {
        state.layers[state.activeLayer] = [];
    }

    state.selectedItemId = null;
    renderLayerItems();
    document.getElementById('selectionInfo').innerHTML = '<p class="no-selection">Detayları görmek için tuval üzerinde bir öğeye tıklayın</p>';
    showToast(`${state.activeLayer === 'bottom' ? 'Alt' : 'Üst'} katman temizlendi`);
}

// ===== ZOOM =====
function zoomIn() { if (!stage) return; const s = Math.min(stage.scaleX() * 1.2, 3); stage.scale({ x: s, y: s }); stage.draw(); }
function zoomOut() { if (!stage) return; const s = Math.max(stage.scaleX() * 0.8, 0.3); stage.scale({ x: s, y: s }); stage.draw(); }
function resetZoom() { if (!stage) return; stage.scale({ x: 1, y: 1 }); stage.position({ x: 0, y: 0 }); stage.draw(); }

// ===== LAYER SWITCHING =====
function switchLayer(layer) {
    state.activeLayer = layer;
    state.selectedItemId = null;
    document.querySelectorAll('.layer-tab').forEach(el => el.classList.toggle('active', el.dataset.layer === layer));
    if (mainLayer) savePositions();
    initCanvas();
    document.getElementById('selectionInfo').innerHTML = '<p class="no-selection">Detayları görmek için tuval üzerinde bir öğeye tıklayın</p>';
}

function savePositions() {
    const items = state.layers[state.activeLayer];
    mainLayer.children.forEach(child => {
        const item = items.find(i => 'item-' + i.id === child.id());
        if (item) { item.x = child.x(); item.y = child.y(); item.rotation = child.rotation(); }
    });
}

// ===== UI UPDATES =====
function updateCanvasInfo() {
    const count = state.layers[state.activeLayer].filter(i => !i.isShadow).length;
    const shadowCount = state.layers[state.activeLayer].filter(i => i.isShadow).length;
    const layerName = state.activeLayer === 'bottom' ? 'Alt' : 'Üst';
    let text = `${layerName} Katman — ${count} öğe`;
    if (shadowCount > 0) text += ` + ${shadowCount} engelli bölge`;
    document.getElementById('canvasInfo').textContent = text;
}

function updateLayerSummary() {
    const items = state.layers[state.activeLayer];
    const el = document.getElementById('layerSummary');
    const realItems = items.filter(i => !i.isShadow);
    if (realItems.length === 0) { el.innerHTML = '<p class="empty-summary">Henüz öğe yerleştirilmedi</p>'; return; }
    const groups = {};
    realItems.filter(i => i.type !== 'optic').forEach(item => {
        const key = item.type === 'gun' ? `${item.name}${item.hasOptic ? ' + Optik' : ''}` : `${item.name} (${item.wMM}×${item.hMM}×${item.dMM || '?'})`;
        if (!groups[key]) groups[key] = 0;
        groups[key]++;
    });
    let html = '';
    Object.entries(groups).forEach(([name, count]) => {
        html += `<div class="summary-item"><span>${name}</span><span class="summary-count">×${count}</span></div>`;
    });
    el.innerHTML = html;
}

function updateOptions() {
    state.options.bags = document.getElementById('optBags').checked;
    state.options.wheels = document.getElementById('optWheels')?.checked || false;
    state.options.pull = document.getElementById('optPull')?.checked || false;
}

// ===== STEP 3: REVIEW =====
function renderReview() {
    if (mainLayer) savePositions();

    const caseDef = CASE_DEFS[state.caseType];
    const allItems = [...state.layers.bottom, ...state.layers.top].filter(i => !i.isShadow);
    const allGuns = allItems.filter(i => i.type === 'gun');
    const allAcc = allItems.filter(i => i.type !== 'gun');

    let html = `
        <div class="review-row"><span class="review-label">Çanta</span><span class="review-value">${caseDef.name}</span></div>
        <div class="review-row"><span class="review-label">Renk</span><span class="review-value" style="text-transform:capitalize">${state.caseColor === 'orange' ? 'Turuncu' : 'Siyah'}</span></div>
        <div class="review-row"><span class="review-label">İç Boyut</span><span class="review-value">${caseDef.interiorW} × ${caseDef.interiorH} mm (${(caseDef.interiorW/10).toFixed(1)} × ${(caseDef.interiorH/10).toFixed(1)} cm)</span></div>
        <div class="review-row"><span class="review-label">Engelli Alan</span><span class="review-value">${caseDef.blockedZone.w} × ${caseDef.blockedZone.h} mm (${caseDef.blockedZone.label})</span></div>
        <div class="review-row"><span class="review-label">Tabancalar</span><span class="review-value">${allGuns.length}</span></div>
    `;

    allGuns.forEach(gun => {
        const orientLabel = gun.orientation === 'vertical' ? ' ↕' : ' ↔';
        html += `<div class="review-row"><span class="review-label" style="padding-left:16px">• ${gun.brand}</span><span class="review-value">${gun.model}${orientLabel}${gun.hasOptic ? ' + Optik' : ''}</span></div>`;
    });

    html += `<div class="review-row"><span class="review-label">Aksesuarlar</span><span class="review-value">${allAcc.filter(i => i.type !== 'optic').length}</span></div>`;
    const accGroups = {};
    allAcc.filter(i => i.type !== 'optic').forEach(i => {
        const k = `${i.name} (${i.wMM}×${i.hMM}×${i.dMM || '?'}mm)`;
        if (!accGroups[k]) accGroups[k] = 0;
        accGroups[k]++;
    });
    Object.entries(accGroups).forEach(([name, count]) => {
        html += `<div class="review-row"><span class="review-label" style="padding-left:16px">• ${name}</span><span class="review-value">×${count}</span></div>`;
    });

    const bottomReal = state.layers.bottom.filter(i => !i.isShadow).length;
    const bottomShadows = state.layers.bottom.filter(i => i.isShadow).length;
    const topReal = state.layers.top.length;

    html += `
        <div class="review-row"><span class="review-label">Alt Katman Öğeleri</span><span class="review-value">${bottomReal}${bottomShadows > 0 ? ` + ${bottomShadows} engelli` : ''}</span></div>
        <div class="review-row"><span class="review-label">Üst Katman Öğeleri</span><span class="review-value">${topReal}</span></div>
        <div class="review-row"><span class="review-label">Üst Kapak Çantaları</span><span class="review-value">${state.options.bags ? 'Evet (×2)' : 'Hayır'}</span></div>
    `;
    if (caseDef.hasWheels) html += `<div class="review-row"><span class="review-label">Tekerlekler</span><span class="review-value">${state.options.wheels ? 'Evet' : 'Hayır'}</span></div>`;
    if (caseDef.hasPull) html += `<div class="review-row"><span class="review-label">Çekme Kolu</span><span class="review-value">${state.options.pull ? 'Evet' : 'Hayır'}</span></div>`;

    document.getElementById('reviewSummary').innerHTML = html;

    if (state.caseType === 'big') {
        document.getElementById('opt-wheels').style.display = '';
        document.getElementById('opt-pull').style.display = '';
    } else {
        document.getElementById('opt-wheels').style.display = 'none';
        document.getElementById('opt-pull').style.display = 'none';
    }

    renderMiniPreview('preview-bottom', state.layers.bottom);
    renderMiniPreview('preview-top', state.layers.top);
}

function renderMiniPreview(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    if (items.length === 0) { container.textContent = 'Boş'; return; }

    const caseDef = CASE_DEFS[state.caseType];
    const previewW = container.clientWidth || 200;
    const previewH = container.clientHeight || 120;
    const sc = Math.min((previewW - 20) / caseDef.interiorW, (previewH - 20) / caseDef.interiorH);

    const miniStage = new Konva.Stage({ container: containerId, width: previewW, height: previewH });
    const layer = new Konva.Layer();
    miniStage.add(layer);

    const cW = caseDef.interiorW * sc, cH = caseDef.interiorH * sc;
    const ox = (previewW - cW) / 2, oy = (previewH - cH) / 2;

    layer.add(new Konva.Rect({ x: ox, y: oy, width: cW, height: cH, fill: '#1A1A1A', stroke: state.caseColor === 'orange' ? '#E87A1E' : '#555', strokeWidth: 1, cornerRadius: 3 }));

    // Blocked zone in preview
    const bz = caseDef.blockedZone;
    const bzW = bz.w * sc, bzH = bz.h * sc;
    const bzX = ox + (cW - bzW) / 2;
    layer.add(new Konva.Rect({ x: bzX, y: oy + cH - bzH, width: bzW, height: bzH, fill: 'rgba(244,67,54,0.1)', stroke: '#F44336', strokeWidth: 0.5, dash: [3, 2] }));

    items.forEach(item => {
        const iw = item.wMM * sc, ih = item.hMM * sc;
        const ix = ox + ((item.x - (boundsRect?.x || 0)) / state.scale) * sc;
        const iy = oy + ((item.y - (boundsRect?.y || 0)) / state.scale) * sc;
        if (item.isShadow) {
            layer.add(new Konva.Rect({ x: ix, y: iy, width: iw, height: ih, fill: 'rgba(244,67,54,0.15)', stroke: '#F44336', strokeWidth: 0.5, dash: [2, 2], cornerRadius: 1, rotation: item.rotation }));
        } else {
            const color = item.type === 'gun' ? '#4A4A4A' : item.type === 'optic' ? '#5C6BC0' : (ITEM_DEFS[item.type]?.color || '#555');
            layer.add(new Konva.Rect({ x: ix, y: iy, width: iw, height: ih, fill: color, cornerRadius: 2, rotation: item.rotation }));
        }
    });

    layer.draw();
}

// ===== ADD TO CART =====
function addToCart() {
    const config = {
        caseType: state.caseType,
        caseName: CASE_DEFS[state.caseType].name,
        caseColor: state.caseColor,
        dimensions: { width: CASE_DEFS[state.caseType].interiorW, height: CASE_DEFS[state.caseType].interiorH },
        blockedZone: CASE_DEFS[state.caseType].blockedZone,
        options: { ...state.options },
        bottomLayer: state.layers.bottom.filter(i => !i.isShadow).map(serializeItem),
        topLayer: state.layers.top.map(serializeItem)
    };

    const bottomDesc = describeLayer(state.layers.bottom);
    const topDesc = describeLayer(state.layers.top);

    document.getElementById('propCaseType').value = config.caseName;
    document.getElementById('propCaseColor').value = config.caseColor;
    document.getElementById('propBottomLayer').value = bottomDesc;
    document.getElementById('propTopLayer').value = topDesc;
    document.getElementById('propBags').value = state.options.bags ? 'Evet (×2)' : 'Hayır';
    document.getElementById('propWheels').value = state.options.wheels ? 'Evet' : 'Hayır';
    document.getElementById('propPull').value = state.options.pull ? 'Evet' : 'Hayır';
    document.getElementById('propConfigJSON').value = JSON.stringify(config);

    console.log('Cart Configuration:', config);
    showToast('✅ Yapılandırma kaydedildi! Shopify entegrasyonu için hazır.');

    const summary = `
ÇANTA: ${config.caseName} (${config.caseColor === 'orange' ? 'Turuncu' : 'Siyah'})
BOYUT: ${config.dimensions.width}×${config.dimensions.height} mm
ALT KATMAN: ${bottomDesc}
ÜST KATMAN: ${topDesc}
ÜST KAPAK ÇANTALARI: ${config.options.bags ? 'Evet' : 'Hayır'}
TEKERLEKLER: ${config.options.wheels ? 'Evet' : 'Hayır'}
ÇEKME KOLU: ${config.options.pull ? 'Evet' : 'Hayır'}
    `.trim();

    alert('Yapılandırma Özeti:\n\n' + summary + '\n\n(Shopify mağazanızda, bu sipariş satır özellikleri olarak sepete eklenecektir)');
}

function serializeItem(item) {
    return {
        type: item.type, name: item.name,
        brand: item.brand || null, model: item.model || null,
        dimensions: `${item.wMM}×${item.hMM}×${item.dMM || '?'}mm`,
        depth: item.dMM || null,
        orientation: item.orientation || null,
        hasOptic: item.hasOptic || false,
        parentGunId: item.parentGunId || null,
        customSize: item.defaultWMM ? (item.wMM !== item.defaultWMM || item.hMM !== item.defaultHMM || item.dMM !== item.defaultDMM) : false,
        position: {
            x: boundsRect ? Math.round((item.x - boundsRect.x) / state.scale) : 0,
            y: boundsRect ? Math.round((item.y - boundsRect.y) / state.scale) : 0
        },
        rotation: item.rotation
    };
}

function describeLayer(items) {
    const realItems = items.filter(i => !i.isShadow);
    if (realItems.length === 0) return 'Boş';
    const groups = {};
    realItems.filter(i => i.type !== 'optic').forEach(i => {
        const orient = i.orientation === 'vertical' ? ' ↕' : (i.orientation === 'horizontal' ? ' ↔' : '');
        const key = i.type === 'gun' ? `${i.brand} ${i.model}${orient}${i.hasOptic ? ' + Optik' : ''}` : `${i.name} (${i.wMM}×${i.hMM}×${i.dMM || '?'}mm)`;
        if (!groups[key]) groups[key] = 0;
        groups[key]++;
    });
    return Object.entries(groups).map(([name, count]) => count > 1 ? `${name} ×${count}` : name).join(', ');
}

// ===== TOAST =====
function showToast(message, type = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="material-icons">${type === 'error' ? 'warning' : 'check_circle'}</span> ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ===== WINDOW RESIZE =====
window.addEventListener('resize', () => {
    if (state.currentStep === 2 && stage) { savePositions(); initCanvas(); }
});
