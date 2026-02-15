# Fortify Armory — Custom Gun Case Configurator
## Shopify Integration Guide

### Overview
This is an interactive 2D gun case configurator that lets customers design custom foam layouts for gun cases. It features drag-and-drop placement, real weapon dimensions, collision detection, and direct Shopify cart integration.

---

## Quick Start (Local Preview)

1. Open `index.html` in your browser to test the configurator locally
2. No build tools or server required — it's a pure HTML/CSS/JS application
3. The Konva.js library is loaded from CDN

---

## Shopify Integration Steps

### Step 1: Create Products in Shopify Admin

Create **two products** in your Shopify admin:

#### Product 1: Fortify Pro Case (Big)
- **Title:** Fortify Pro Case
- **Variants:** 
  - Orange (set price)
  - Black (set price)
- **Note the variant IDs** (visible in the URL when editing a variant)

#### Product 2: Fortify Compact Case (Small)
- **Title:** Fortify Compact Case
- **Variants:**
  - Orange (set price)
  - Black (set price)
- **Note the variant IDs**

### Step 2: Upload Assets to Shopify

Go to **Online Store → Themes → Edit Code → Assets**

Upload these files:
- `styles.css` → rename to `configurator-styles.css`
- `configurator.js` → keep name

### Step 3: Add the Section Template

Go to **Online Store → Themes → Edit Code → Sections**

1. Click "Add a new section"
2. Name it `gun-case-configurator`
3. Paste the content from `shopify/sections/gun-case-configurator.liquid`

### Step 4: Configure Variant IDs

In the Shopify Theme Customizer:
1. Add the "Gun Case Configurator" section to your desired page
2. Enter the variant IDs for each case/color combination
3. Save

### Step 5: Alternative — Standalone Page

If you prefer a full-page configurator:

1. Go to **Online Store → Pages**
2. Create a new page
3. In the template selector, choose or create a template that includes the configurator section

---

## File Structure

```
fortify-armory-configurator/
├── index.html                          # Standalone preview (works locally)
├── styles.css                          # All CSS styles
├── configurator.js                     # Main configurator engine
├── shopify/
│   └── sections/
│       └── gun-case-configurator.liquid  # Shopify section template
└── SHOPIFY-INTEGRATION.md             # This file
```

---

## How the Cart Integration Works

When a customer clicks "Add to Cart", the following **line item properties** are sent:

| Property | Example Value |
|---|---|
| Case Type | Fortify Pro Case |
| Case Color | orange |
| Bottom Layer | Canik Rival-S, Ammo Box ×2, Magazine ×3 |
| Top Layer | Cleaning Kit, Ear Protection |
| Top Cover Bags | Yes (×2) |
| Wheels | Yes |
| Pull Handle | Yes |
| _Configuration JSON | `{full JSON with positions}` |

Properties starting with `_` (underscore) are **hidden from customers** but visible in Shopify admin order details.

---

## Weapon Database

The configurator includes real dimensions for these firearms:

### Canik
| Model | Length | Height | Width |
|---|---|---|---|
| Rival-S | 222mm | 147mm | 44mm |
| TP9 SFx | 211mm | 143mm | 37mm |
| TP9 Elite Combat | 206mm | 143mm | 37mm |
| METE SFx | 207mm | 140mm | 36mm |

### Sarsılmaz
| Model | Length | Height | Width |
|---|---|---|---|
| SAR9 | 193mm | 140mm | 35.7mm |
| SAR9 X | 200mm | 142mm | 36mm |
| SAR9 METE | 198mm | 140mm | 36mm |
| K2 45 | 210mm | 150mm | 38mm |

### CZ
| Model | Length | Height | Width |
|---|---|---|---|
| Shadow 2 | 228mm | 150mm | 46mm |
| Shadow 2 Orange | 228mm | 150mm | 46mm |
| Shadow 2 Compact | 184mm | 128mm | 37mm |
| TS 2 | 225mm | 150mm | 55mm |
| P-10 F | 203mm | 140mm | 33mm |

### Wilson Combat
| Model | Length | Height | Width |
|---|---|---|---|
| EDC X9 | 201mm | 140mm | 33mm |
| EDC X9L | 213mm | 145mm | 33mm |
| SFX9 | 196mm | 130mm | 32mm |
| CQB .45 | 222mm | 148mm | 38mm |

---

## Customization

### Adding New Weapons
Edit the `WEAPON_DB` object in `configurator.js`:

```javascript
'model-key': {
    name: 'Model Name',
    length: 200,  // mm
    height: 140,  // mm
    width: 35,    // mm
    barrel: 110,  // mm
    caliber: '9×19mm',
    weight: '800g',
    capacity: '15+1'
}
```

### Adding New Accessory Types
Edit the `ITEM_DEFS` object:

```javascript
newItem: {
    name: 'Item Name',
    w: 100,         // width in mm
    h: 60,          // height in mm
    color: '#555',  // fill color
    stroke: '#777', // border color
    icon: '📦'
}
```

### Changing Case Dimensions
Edit the `CASE_DEFS` object:

```javascript
big: {
    name: 'Fortify Pro Case',
    interiorW: 900,   // interior width in mm
    interiorH: 400,   // interior height in mm
    hasWheels: true,
    hasPull: true,
    maxBags: 2
}
```

---

## Spray Can Dimensions (Reference)
- Height: ~192 mm
- Diameter: ~52 mm  
- Spray Tube Length: ~101.5 mm
- Nozzle Diameter: ~2 mm

These are encoded in the `ITEM_DEFS.spray` definition.
