'use strict';

// ─── RING SIZE TABLE ────────────────────────────────────
const ST = [
    [12.04, '0', '0', 'A', '37'], [12.45, '½', '¼', 'A½', '38'], [12.85, '1', '½', 'B', '39'],
    [13.26, '1', '¾', 'B½', '40'], [13.67, '2', '1', 'C', '41'], [14.07, '2', '1¼', 'C½', '42'],
    [14.48, '3', '1½', 'D', '43'], [14.88, '3', '1¾', 'D½', '44'], [15.29, '4', '2', 'E', '45'],
    [15.70, '4', '2¼', 'E½', '46'], [16.10, '5', '2½', 'F', '47'], [16.51, '5', '2¾', 'F½', '48'],
    [16.92, '6', '3', 'G', '49'], [17.32, '7', '3¼', 'G½', '50'], [17.73, '7', '3½', 'H', '51'],
    [18.14, '8', '3¾', 'H½', '52'], [18.54, '8', '4', 'I', '53'], [18.95, '9', '4¼', 'I½', '54'],
    [19.35, '9', '4½', 'J', '55'], [19.76, '10', '4¾', 'J½', '56'], [20.17, '10', '5', 'K', '57'],
    [20.57, '11', '5¼', 'K½', '58'], [20.98, '11', '5½', 'L', '59'], [21.39, '12', '5¾', 'L½', '60'],
    [21.79, '12', '6', 'M', '61'], [22.20, '13', '6¼', 'M½', '62'], [22.61, '13', '6½', 'N', '63'],
    [23.01, '14', '6¾', 'N½', '64'], [23.42, '14', '7', 'O', '65'], [23.83, '15', '7¼', 'O½', '66'],
    [24.23, '15', '7½', 'P', '67'], [24.64, '16', '7¾', 'P½', '68'], [25.05, '16', '8', 'Q', '69'],
    [25.45, '17', '8¼', 'Q½', '70'], [25.86, '17', '8½', 'R', '71'], [26.27, '18', '8¾', 'R½', '72'],
    [26.67, '18', '9', 'S', '73'], [27.08, '19', '9¼', 'S½', '74'], [27.49, '19', '9½', 'T', '75'],
    [27.89, '20', '9¾', 'T½', '76'], [28.30, '20', '10', 'U', '77'], [28.70, '21', '10¼', 'U½', '78'],
    [29.11, '21', '10½', 'V', '79'], [29.52, '22', '10¾', 'V½', '80'], [29.92, '22', '11', 'W', '81'],
    [30.33, '23', '11¼', 'W½', '82'], [30.74, '23', '11½', 'X', '83'], [31.14, '24', '11¾', 'X½', '84'],
    [31.55, '24', '12', 'Y', '85'], [31.96, '25', '12¼', 'Z', '86'],
    [32.36, '25', '12½', 'Z+1', '87'], [32.77, '26', '12¾', 'Z+2', '88'],
];

// ─── OBJECT CONFIGS ─────────────────────────────────────────
const CAL_OBJS = {
    'card': { name: 'Standard Card', type: 'rect-v', size: 85.60, ratio: 53.98 / 85.60, instr: 'Place card vertically on screen. Resize height to match the long edge.' },
    'coin10': { name: '₹10 Coin', type: 'circle', size: 27.00, instr: 'Place a ₹10 coin on screen. Match circle to its edge.' },
    'coin5': { name: '₹5 Coin', type: 'circle', size: 25.00, instr: 'Place a ₹5 coin on screen. Match circle to its edge.' },
    'coin2': { name: '₹2 Coin', type: 'circle', size: 23.00, instr: 'Place a ₹2 coin on screen. Match circle to its edge.' },
    'coin1': { name: '₹1 Coin', type: 'circle', size: 20.00, instr: 'Place a ₹1 coin on screen. Match circle to its edge.' }
};

// ─── CONSTANTS & STATE ──────────────────────────────────────
const DPR = window.devicePixelRatio || 1;
const SUNI = '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>';
const MOONI = '<path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>';

let mppCSS = null;
let savedObjType = 'card';
let calibPx = 0; // The dimension in px (Card Height or Coin Diameter)
let selObjKey = null; // Currently selected obj in calibration

let diam = 18.0; // Ring diameter mm
let snap = false;
let zoom = false;
let drag = false, dy0 = 0, d0 = 18;

// Dragging state for calibration object
let objDragging = false;
let objDragStartY = 0, objDragStartSz = 0; // using Y and Height/Diameter
let cvs, ctx, cW, cH;
let _tt;
let resizeObserver;

function sz(d) { return ST.reduce((a, b) => Math.abs(b[0] - d) < Math.abs(a[0] - d) ? b : a); }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function set(id, v) { const el = document.getElementById(id); if (el) el.textContent = v; }
function vibe(ms = 8) { if (navigator.vibrate) navigator.vibrate(ms); }

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    boot();
});

function setupEventListeners() {
    document.getElementById('logo-btn')?.addEventListener('click', () => go('land'));
    document.getElementById('cbadge')?.addEventListener('click', () => go('sel'));
    document.getElementById('dark-mode-btn')?.addEventListener('click', tDark);
    document.getElementById('fs-btn')?.addEventListener('click', tFS);

    document.getElementById('land-start-btn')?.addEventListener('click', () => go('sel'));

    // Calib controls
    document.getElementById('cal-fine')?.addEventListener('input', (e) => onFineSlider(+e.target.value));
    document.getElementById('cal-minus')?.addEventListener('click', () => nudgeCal(-1));
    document.getElementById('cal-plus')?.addEventListener('click', () => nudgeCal(1));

    document.getElementById('calib-next-btn')?.addEventListener('click', verifyCalib);

    // Confirmation Modal
    document.getElementById('conf-no')?.addEventListener('click', () => { document.getElementById('cal-confirm').classList.remove('show'); });
    document.getElementById('conf-yes')?.addEventListener('click', saveAndProceeed);

    document.getElementById('meas-recalib-btn')?.addEventListener('click', () => go('sel'));
    document.getElementById('meas-recalib-bottom-btn')?.addEventListener('click', () => go('sel'));

    // Ring Measurement
    document.getElementById('mbar-minus')?.addEventListener('click', () => nudge(-0.1));
    document.getElementById('msl')?.addEventListener('input', (e) => setD(+e.target.value));
    document.getElementById('mbar-plus')?.addEventListener('click', () => nudge(+0.1));

    ['nudge-m1', 'nudge-m05', 'nudge-m01', 'nudge-p01', 'nudge-p05', 'nudge-p1'].forEach(id => {
        const val = parseFloat(id.replace('nudge-', '').replace('m', '-').replace('p', ''));
        document.getElementById(id)?.addEventListener('click', () => nudge(val));
    });

    document.getElementById('snaptg')?.addEventListener('click', tSnap);
    document.getElementById('zoomtg')?.addEventListener('click', tZoom);

    document.getElementById('exp-png-btn')?.addEventListener('click', expImg);
    document.getElementById('copy-link-btn')?.addEventListener('click', cpLink);
    document.getElementById('exp-pdf-btn')?.addEventListener('click', expPDF);

    // Calib Object Drag
    const handle = document.getElementById('cal-handle');
    if (handle) {
        handle.addEventListener('mousedown', calMD);
        handle.addEventListener('touchstart', e => { e.preventDefault(); calMD(e.touches[0]); }, { passive: false });
    }
    document.addEventListener('mousemove', calMM);
    document.addEventListener('mouseup', calMU);
    document.addEventListener('touchmove', e => { if (objDragging) { e.preventDefault(); calMM(e.touches[0]); } }, { passive: false });
    document.addEventListener('touchend', calMU);
}

// ─── ROUTER ────────────────────────────────────────────────
let curScr = 'land';

function go(id) {
    curScr = id;
    document.querySelectorAll('.scr').forEach(s => s.classList.remove('on'));
    const target = document.getElementById('s-' + id);
    if (target) target.classList.add('on');

    // Handle Back Button Visibility
    const bBtn = document.getElementById('back-btn');
    if (bBtn) bBtn.classList.toggle('hide', id === 'land');

    // If going to landing, clean history
    if (id === 'land') {
        const sw = document.getElementById('skip-wrap');
        const badge = document.getElementById('cbadge');
        if (badge) badge.style.display = 'none';
        chkSaved();
    } else {
        const badge = document.getElementById('cbadge');
        if (badge) badge.style.display = 'flex';
    }

    if (id === 'meas') {
        setTimeout(initCvs, 50);
        // Show non-blocking banner if not calibrated
        const banner = document.getElementById('nocal-banner');
        if (banner) banner.classList.toggle('hide', !!mppCSS);
    }

    // Toggle full-screen calibration mode
    if (id === 'calib') {
        document.body.classList.add('calib-mode');
    } else {
        document.body.classList.remove('calib-mode');
    }

    window.scrollTo(0, 0);
}

function back() {
    if (curScr === 'sel') go('land');
    else if (curScr === 'calib') go('sel');
    else if (curScr === 'meas') go('calib');
}

// ─── INIT ──────────────────────────────────────────────────
function boot() {
    if (localStorage.getItem('a_dark') === '1') {
        document.body.setAttribute('data-dark', '');
        document.getElementById('dico').innerHTML = SUNI;
    }
    chkSaved();

    // Deep link check
    const p = new URLSearchParams(location.search);
    if (p.has('d') && parseFloat(p.get('d')) > 0) {
        diam = parseFloat(p.get('d'));
        if (p.has('mpp')) {
            mppCSS = parseFloat(p.get('mpp'));
            localStorage.setItem('a_mppCSS', mppCSS);
        }
        setBadge(!!mppCSS);
        go('meas');
        setTimeout(() => syncAll(), 100);
    }
}

function tDark() {
    const on = document.body.toggleAttribute('data-dark');
    localStorage.setItem('a_dark', on ? '1' : '');
    document.getElementById('dico').innerHTML = on ? SUNI : MOONI;
    if (ctx && document.getElementById('s-meas').classList.contains('on')) draw();
}

// ─── SELECTION & CALIBRATION ───────────────────────────────
function selectObj(key) {
    selObjKey = key;
    // Set default px size if not set or switching types widely
    // We start with a reasonable default, say 300px height or diameter
    calibPx = 300;
    go('calib');
    initCalibScreen();
}

function initCalibScreen() {
    const cfg = CAL_OBJS[selObjKey];
    if (!cfg) return;

    // UI Setup
    document.getElementById('cal-mode-title').textContent = cfg.name + ' Calibration';
    document.getElementById('cal-instr').textContent = cfg.instr;

    const obj = document.getElementById('cal-obj');
    obj.className = '';

    // Measure the actual arena to avoid clipping
    const arena = document.getElementById('card-arena');
    // Allow DOM to settle before reading dimensions
    requestAnimationFrame(() => {
        const aH = arena ? arena.clientHeight : window.innerHeight * 0.55;
        const aW = arena ? arena.clientWidth : window.innerWidth;
        // Leave 80px headroom for the label + handle bottom
        const maxFit = Math.min(aW * 0.82, aH - 80);

        if (cfg.type === 'rect-v') {
            obj.classList.add('rect-v');
            // Card height should fit in arena height, keep aspect ratio
            calibPx = clamp(Math.round(maxFit * 0.9), 150, 900);
        } else {
            obj.classList.add('circle');
            // Circle diameter must fit both width and height
            calibPx = clamp(Math.round(maxFit * 0.75), 80, 600);
        }

        const sl = document.getElementById('cal-fine');
        const maxSlider = cfg.type === 'rect-v' ? 900 : 600;
        sl.min = 60; sl.max = maxSlider; sl.value = calibPx;

        updateObjRender();
    });
}

function updateObjRender() {
    const cfg = CAL_OBJS[selObjKey];
    const obj = document.getElementById('cal-obj');

    if (cfg.type === 'rect-v') {
        // calibPx is HEIGHT
        const w = calibPx * cfg.ratio;
        obj.style.width = w + 'px';
        obj.style.height = calibPx + 'px';
        obj.style.borderRadius = '6px';
    } else {
        // Circle, calibPx is DIAMEETER
        obj.style.width = calibPx + 'px';
        obj.style.height = calibPx + 'px';
        obj.style.borderRadius = '50%';
    }

    // Center it
    // handled by flex center in CSS

    document.getElementById('obj-label').textContent = calibPx + ' px';
    document.getElementById('cal-fine').value = calibPx;
    document.getElementById('fine-val').textContent = calibPx;
}

// Drag & Resize logic
function calMD(e) {
    objDragging = true;
    objDragStartY = e.clientY; // We basically use Y axis delta for simplicity, user drags Handle up/down (or diagonal)
    // Actually handle is at bottom or bottom-right. Dragging down increases size.
    objDragStartSz = calibPx;
    e.stopPropagation();
}

function calMM(e) {
    if (!objDragging) return;
    const dy = e.clientY - objDragStartY;
    // Increasing Y means dragging down -> increase size
    // Sensitivity 1:1
    let nSz = objDragStartSz + dy;
    nSz = clamp(Math.round(nSz), 100, 1200);
    calibPx = nSz;
    updateObjRender();
}

function calMU() {
    objDragging = false;
}

function nudgeCal(d) {
    calibPx = clamp(calibPx + d, 100, 1200);
    updateObjRender();
}

function onFineSlider(v) {
    calibPx = v;
    updateObjRender();
}

function verifyCalib() {
    document.getElementById('cal-confirm').classList.add('show');
}

function saveAndProceeed() {
    document.getElementById('cal-confirm').classList.remove('show');

    const cfg = CAL_OBJS[selObjKey];
    // Calculate mmpp
    // If rect-v: size is height (85.60mm), calibPx is height px
    // If circle: size is diameter, calibPx is diameter
    const real_mm = cfg.size;
    mppCSS = real_mm / calibPx;

    // Save
    const device_id = (navigator.userAgent + window.screen.width + 'x' + window.screen.height).slice(0, 80);
    localStorage.setItem('a_mppCSS', mppCSS);
    localStorage.setItem('a_obj_key', selObjKey);
    localStorage.setItem('a_obj_px', calibPx);
    localStorage.setItem('a_dev_id', device_id);
    localStorage.setItem('a_ts', Date.now());

    console.log('[Calibration Saved]', { mmpp: mppCSS, obj: selObjKey, px: calibPx, real: real_mm });

    setBadge(true);
    toast('✓ Saved! ' + mppCSS.toFixed(4) + ' mm/px');
    vibe(50);
    // Hide uncal banner
    document.getElementById('nocal-banner')?.classList.add('hide');
    setTimeout(() => go('meas'), 500);
}

function chkSaved() {
    const sv = localStorage.getItem('a_mppCSS');
    const svObj = localStorage.getItem('a_obj_key');
    if (sv && parseFloat(sv) > 0) {
        mppCSS = parseFloat(sv);
        setBadge(true);
        // Maybe change button text on landing?
        // document.getElementById('land-start-btn').innerHTML = 'Measure Ring'; 
        // User requested "hidden skip option" so maybe we auto-guide or just show "Find Size"
    } else {
        setBadge(false);
    }
}

function setBadge(ok) {
    const el = document.getElementById('cbadge');
    if (el) {
        el.className = ok ? 'ok' : 'bad';
        el.innerHTML = ok ? '<div class="dot"></div> Calibrated' : '<div class="dot"></div> Not Calibrated';
    }
}

function resetCalib() {
    localStorage.clear();
    location.reload();
}

// ─── CANVAS ───────────────────────────────────────────────
function initCvs() {
    const pan = document.getElementById('cvp');
    cvs = document.getElementById('cvs');
    if (!cvs || !pan) return;
    ctx = cvs.getContext('2d');

    if (window.ResizeObserver) {
        if (typeof resizeObserver !== 'undefined' && resizeObserver) resizeObserver.disconnect();
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(pan);
    }

    const nc = cvs.cloneNode(true);
    pan.replaceChild(nc, cvs);
    cvs = nc; ctx = cvs.getContext('2d');
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    resize();

    cvs.addEventListener('mousedown', MD);
    cvs.addEventListener('mousemove', MM);
    cvs.addEventListener('mouseup', MU);
    cvs.addEventListener('mouseleave', MU);
    cvs.addEventListener('touchstart', e => { e.preventDefault(); MD(e.touches[0]); }, { passive: false });
    cvs.addEventListener('touchmove', e => { e.preventDefault(); MM(e.touches[0]); }, { passive: false });
    cvs.addEventListener('touchend', MU, { passive: false });

    syncAll();
    draw();
}

function resize() {
    const pan = document.getElementById('cvp');
    if (!pan || !cvs) return;
    cW = pan.clientWidth; cH = pan.clientHeight;
    cvs.width = cW * DPR; cvs.height = cH * DPR;
    cvs.style.width = cW + 'px'; cvs.style.height = cH + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    draw();
}

const CX = () => cW / 2;
const CY = () => cH / 2;

function rPx() {
    if (mppCSS && mppCSS > 0) return (diam / 2) / mppCSS;
    return Math.min(cW, cH) * 0.28;
}

function ePos(e) {
    const r = cvs.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
}
function dist(ax, ay, bx, by) { return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2); }

function nearHandle(x, y) { return dist(x, y, CX(), CY() - rPx()) < 25; }
function nearEdge(x, y) { return Math.abs(dist(x, y, CX(), CY()) - rPx()) < 25; }

function MD(e) {
    const p = ePos(e);
    if (nearHandle(p.x, p.y) || nearEdge(p.x, p.y)) {
        drag = true; dy0 = p.y; d0 = diam;
        cvs.style.cursor = 'grabbing';
    }
}
function MM(e) {
    const p = ePos(e);
    if (drag) {
        // Drag logic for ring
        const deltaCssPx = dy0 - p.y;
        // If uncalibrated, guess. If calibrated, use mpp.
        const effectiveMpp = mppCSS || (25.4 / 120);
        const deltaMm = deltaCssPx * effectiveMpp;

        let nd = d0 + deltaMm * 2;
        if (snap) nd = Math.round(nd * 2) / 2;
        nd = clamp(nd, 5, 40); // 5mm to 40mm range
        diam = nd;
        syncAll(); draw();
    } else {
        cvs.style.cursor = (nearHandle(p.x, p.y) || nearEdge(p.x, p.y)) ? 'grab' : 'default';
    }
}
function MU() { drag = false; cvs.style.cursor = 'default'; }

function setD(v) {
    if (snap) v = Math.round(v * 2) / 2;
    diam = clamp(v, 5, 40);
    syncAll();
    draw();
}

function nudge(delta) {
    setD(diam + delta);
    vibe(8);
}


function draw() {
    if (!ctx || !cW) return;
    const W = cW, H = cH, cx = CX(), cy = CY(), r = rPx();
    ctx.clearRect(0, 0, W, H);

    if (zoom) { ctx.save(); ctx.translate(cx, cy); ctx.scale(2, 2); ctx.translate(-cx, -cy); }

    // Outer glow
    const gl = ctx.createRadialGradient(cx, cy, r * .5, cx, cy, r + 50);
    gl.addColorStop(0, 'rgba(201,168,76,0)');
    gl.addColorStop(.7, 'rgba(201,168,76,0.08)');
    gl.addColorStop(1, 'rgba(201,168,76,0)');
    ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(cx, cy, r + 50, 0, Math.PI * 2); ctx.fill();

    // Crosshair
    ctx.save();
    ctx.strokeStyle = 'rgba(201,168,76,0.2)'; ctx.lineWidth = 1; ctx.setLineDash([5, 8]);
    const e = r + 80;
    ctx.beginPath();
    ctx.moveTo(cx, cy - e); ctx.lineTo(cx, cy + e);
    ctx.moveTo(cx - e, cy); ctx.lineTo(cx + e, cy);
    ctx.stroke(); ctx.setLineDash([]); ctx.restore();

    // Fill
    ctx.fillStyle = 'rgba(201,168,76,0.05)'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();

    // Main ring
    ctx.save();
    ctx.shadowColor = 'rgba(201,168,76,.6)'; ctx.shadowBlur = 15;
    ctx.strokeStyle = '#c9a84c'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();

    // Inner dashed
    ctx.save();
    ctx.strokeStyle = 'rgba(201,168,76,.35)'; ctx.lineWidth = 1; ctx.setLineDash([3, 6]);
    ctx.beginPath(); ctx.arc(cx, cy, Math.max(4, r - 10), 0, Math.PI * 2); ctx.stroke();
    ctx.restore();

    // Label
    ctx.font = '600 13px "DM Sans",sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (mppCSS) {
        ctx.fillStyle = 'rgba(201,168,76,.9)';
        ctx.fillText('⌀ ' + diam.toFixed(2) + ' mm', cx, cy + r + 24);
    } else {
        ctx.fillStyle = 'rgba(201,168,76,.55)';
        ctx.fillText('Calibrate for accurate mm', cx, cy + r + 24);
    }

    // Dot
    ctx.fillStyle = 'rgba(201,168,76,.5)';
    ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();

    // Handle
    const hx = cx, hy = cy - r;
    ctx.save();
    ctx.shadowColor = 'rgba(201,168,76,.7)'; ctx.shadowBlur = 10;
    ctx.fillStyle = '#c9a84c'; ctx.beginPath(); ctx.arc(hx, hy, 12, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('↕', hx, hy);

    if (zoom) ctx.restore();
}

function syncAll() {
    const diameter_mm = diam;
    const warnBox = document.getElementById('warn-box');
    const warnMsg = document.getElementById('warn-msg');

    if (mppCSS) {
        if (diameter_mm < 12) {
            warnBox?.classList.remove('hide');
            if (warnMsg) warnMsg.textContent = 'Too small (< 12mm). Re-calibrate if needed.';
        } else if (diameter_mm > 25) {
            warnBox?.classList.remove('hide');
            if (warnMsg) warnMsg.textContent = 'Very large (> 25mm). Check calibration.';
        } else {
            warnBox?.classList.add('hide');
        }
    } else {
        warnBox?.classList.add('hide');
    }

    const circ = diameter_mm * Math.PI;
    const indian_raw = circ - 40;
    const indian_size = clamp(Math.round(indian_raw * 2) / 2, 0, 30);
    const us_raw = (diameter_mm - 11.63) / 0.8128;
    const us_size = clamp(Math.round(us_raw * 4) / 4, 0, 16);
    const s = sz(diameter_mm);

    const pct = (diameter_mm - 5) / (40 - 5) * 100;
    const slEl = document.getElementById('msl');
    if (slEl) {
        slEl.value = diameter_mm;
        slEl.style.setProperty('--p', pct + '%');
    }

    set('bn', diameter_mm.toFixed(2));
    set('mn', diameter_mm.toFixed(2));
    set('cv-d', diameter_mm.toFixed(2));
    set('md', diameter_mm.toFixed(2));
    set('mr', (diameter_mm / 2).toFixed(2));
    set('mc', circ.toFixed(2));

    set('si', indian_size.toFixed(1));
    set('su', formatUS(us_size));
    set('sk', s[3]);
    set('se', s[4]);
}

function formatUS(v) {
    if (v < 0) return '< 0';
    const whole = Math.floor(v);
    const frac = Math.round((v - whole) * 4);
    const fracs = ['', '¼', '½', '¾', ''];
    if (frac === 4) return (whole + 1).toString();
    return whole + (fracs[frac] || '');
}

function tSnap() {
    snap = !snap;
    document.getElementById('snaptg').classList.toggle('on', snap);
    toast(snap ? 'Snap 0.5mm on' : 'Snap off');
    vibe(15);
    if (snap) setD(diam); else draw();
}

function tZoom() {
    zoom = !zoom;
    document.getElementById('zoomtg').classList.toggle('on', zoom);
    const zb = document.getElementById('zbadge');
    if (zb) zb.style.display = zoom ? 'block' : 'none';
    toast(zoom ? '2× zoom on' : 'Zoom off');
    vibe(15);
    draw();
}

function tFS() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
            .then(() => {
                document.getElementById('fsbar')?.classList.remove('on');
                toast('✓ Fullscreen');
            })
            .catch(() => toast('⚠ Fullscreen unavailable'));
    } else {
        document.exitFullscreen().then(() => toast('Exited fullscreen'));
    }
}

function toast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg; el.classList.add('on');
    clearTimeout(_tt); _tt = setTimeout(() => el.classList.remove('on'), 2800);
}

function expImg() {
    const d = diam, s = sz(d);
    const EW = 820, EH = 540;
    const ec = document.createElement('canvas');
    ec.width = EW; ec.height = EH;
    const et = ec.getContext('2d');
    et.fillStyle = '#faf7f0'; et.fillRect(0, 0, EW, EH);
    const bg = et.createRadialGradient(EW * .5, EH * .5, 20, EW * .5, EH * .5, 350);
    bg.addColorStop(0, 'rgba(201,168,76,.06)'); bg.addColorStop(1, 'transparent');
    et.fillStyle = bg; et.fillRect(0, 0, EW, EH);
    const RX = 195, RY = EH / 2, RR = 145;
    et.save(); et.shadowColor = 'rgba(201,168,76,.45)'; et.shadowBlur = 28;
    et.strokeStyle = '#c9a84c'; et.lineWidth = 3;
    et.beginPath(); et.arc(RX, RY, RR, 0, Math.PI * 2); et.stroke(); et.restore();
    et.strokeStyle = 'rgba(201,168,76,.25)'; et.lineWidth = 1; et.setLineDash([3, 5]);
    et.beginPath(); et.arc(RX, RY, RR - 12, 0, Math.PI * 2); et.stroke(); et.setLineDash([]);
    et.fillStyle = 'rgba(201,168,76,.75)'; et.font = 'bold 13px sans-serif';
    et.textAlign = 'center'; et.textBaseline = 'middle';
    et.fillText('⌀ ' + d.toFixed(2) + ' mm', RX, RY);
    et.strokeStyle = 'rgba(201,168,76,.22)'; et.lineWidth = 1;
    et.beginPath(); et.moveTo(370, 48); et.lineTo(370, EH - 48); et.stroke();
    et.fillStyle = '#18120a'; et.textAlign = 'left'; et.textBaseline = 'top';
    et.font = 'bold 25px Georgia,serif'; et.fillText('AURUM SIZER', 400, 50);
    et.fillStyle = '#8a7055'; et.font = '13px sans-serif';
    et.fillText('Ring Size Report · ' + new Date().toLocaleDateString(), 400, 82);
    et.strokeStyle = 'rgba(201,168,76,.28)'; et.lineWidth = .8;
    et.beginPath(); et.moveTo(400, 104); et.lineTo(EW - 40, 104); et.stroke();
    const rows = [['Diameter', d.toFixed(2) + ' mm'], ['Radius', (d / 2).toFixed(2) + ' mm'],
    ['Circumference', (Math.PI * d).toFixed(2) + ' mm'], [null, null],
    ['Indian', s[1]], ['US/Canada', s[2]], ['UK/AUS', s[3]], ['EU/ISO', s[4]]];
    let ry = 122;
    rows.forEach(([l, v]) => {
        if (!l) {
            ry += 8; et.strokeStyle = 'rgba(201,168,76,.14)'; et.lineWidth = .6;
            et.beginPath(); et.moveTo(400, ry); et.lineTo(EW - 40, ry); et.stroke(); ry += 10; return;
        }
        et.fillStyle = '#8a7055'; et.font = '12px sans-serif'; et.textAlign = 'left'; et.textBaseline = 'middle'; et.fillText(l, 400, ry);
        et.fillStyle = '#c9a84c'; et.font = 'bold 17px Georgia,serif'; et.textAlign = 'right'; et.fillText(v, EW - 40, ry);
        et.strokeStyle = 'rgba(201,168,76,.08)'; et.lineWidth = .5;
        et.beginPath(); et.moveTo(400, ry + 11); et.lineTo(EW - 40, ry + 11); et.stroke(); ry += 32;
    });
    et.fillStyle = 'rgba(201,168,76,.45)'; et.font = '10px sans-serif'; et.textAlign = 'center'; et.textBaseline = 'bottom';
    et.fillText('Aurum Sizer — Professional Ring Measurement Tool', EW / 2, EH - 12);
    const a = document.createElement('a');
    a.download = 'ring-size-' + d.toFixed(1) + 'mm.png';
    a.href = ec.toDataURL('image/png'); a.click();
    toast('✓ Image saved');
}

function expPDF() {
    const d = diam, s = sz(d);
    const dt = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Ring Size Report</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;500&family=DM+Sans:wght@400;600&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'DM Sans',sans-serif;background:#faf7f0;color:#18120a;padding:48px;max-width:560px;margin:auto}h1{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;margin-bottom:4px}h1 b{color:#c9a84c}.sub{font-size:13px;color:#8a7055;margin-bottom:26px}hr{border:none;border-top:1px solid rgba(201,168,76,.25);margin:20px 0}.lbl{font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#c9a84c;margin-bottom:10px}table{width:100%;border-collapse:collapse}td{padding:9px 0;border-bottom:1px solid rgba(201,168,76,.1);font-size:14px;color:#8a7055}td:last-child{text-align:right;font-family:'Cormorant Garamond',serif;font-size:21px;font-weight:500;color:#18120a}footer{margin-top:32px;font-size:11px;color:rgba(201,168,76,.5);text-align:center}</style>
</head><body>
<h1>AURUM <b>SIZER</b></h1><p class="sub">Ring Size Report &middot; ${dt}</p><hr>
<div class="lbl">Measurements</div>
<table><tr><td>Diameter</td><td>${d.toFixed(2)} mm</td></tr><tr><td>Radius</td><td>${(d / 2).toFixed(2)} mm</td></tr><tr><td>Circumference</td><td>${(Math.PI * d).toFixed(2)} mm</td></tr></table><hr>
<div class="lbl">Ring Sizes</div>
<table><tr><td>Indian</td><td>${s[1]}</td></tr><tr><td>US / Canada</td><td>${s[2]}</td></tr><tr><td>UK / Australia</td><td>${s[3]}</td></tr><tr><td>EU / ISO</td><td>${s[4]}</td></tr></table>
<footer>Aurum Sizer &middot; Accuracy within &plusmn;0.3mm with proper calibration</footer>
</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, '_blank');
    if (w) { w.onload = () => w.print(); toast('PDF ready — Print → Save as PDF'); }
    else toast('⚠ Allow popups to save PDF');
}

function cpLink() {
    const u = new URL(location.href);
    u.searchParams.set('d', diam.toFixed(2));
    if (mppCSS) u.searchParams.set('mpp', mppCSS.toFixed(8));
    navigator.clipboard.writeText(u.toString())
        .then(() => toast('✓ Link copied!'))
        .catch(() => prompt('Copy:', u.toString()));
}

// Make functions globally available for inline onclick handlers
window.go = go;
window.back = back;
window.selectObj = selectObj;
window.saveAndProceeed = saveAndProceeed;
