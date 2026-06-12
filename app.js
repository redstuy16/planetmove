const AU_KM = 149597870.7;
const JD_UNIX_EPOCH = 2440587.5;
const DAY_MS = 86400000;
const LIGHT_DAYS_PER_AU = 0.0057755183;
const JULIAN_CENTURY_DAYS = 36525;
const MAX_ELONGATION_SAMPLES = 720;
const SKY_VIEW_PAD_X = 46;
const SKY_VIEW_TOP = 34;
const SKY_VIEW_BOTTOM = 42;
const SKY_MIN_LON_SPAN = 18;
const SKY_MAX_LON_SPAN = 360;
const SKY_MIN_LAT_SPAN = 12;
const FIXED_OBSERVING_UTC_HOUR = 13;
const ROTATION_MODE_SPEED_LIMIT = 1;
const DEFAULT_OBSERVER_LONGITUDE_DEG = 126.978;

const rotationPeriodsDays = {
  mercury: 58.646,
  venus: -243.025,
  earth: 0.99726968,
  mars: 1.025957,
  jupiter: 0.41354,
  saturn: 0.44401,
  uranus: -0.71833,
  neptune: 0.67125
};

const namedStars = [
  { id: "sirius", name: "시리우스", ra: 6.7525, dec: -16.7161, mag: -1.46, color: "#dcecff" },
  { id: "canopus", name: "카노푸스", ra: 6.3992, dec: -52.6957, mag: -0.74, color: "#fff4dc" },
  { id: "arcturus", name: "아크투루스", ra: 14.261, dec: 19.1824, mag: -0.05, color: "#ffd0a1" },
  { id: "vega", name: "베가", ra: 18.6156, dec: 38.7837, mag: 0.03, color: "#dce9ff" },
  { id: "capella", name: "카펠라", ra: 5.2782, dec: 45.998, mag: 0.08, color: "#fff0c2" },
  { id: "procyon", name: "프로키온", ra: 7.655, dec: 5.225, mag: 0.38, color: "#fff7e5" },
  { id: "altair", name: "알타이르", ra: 19.8464, dec: 8.8683, mag: 0.77, color: "#eef4ff" },
  { id: "fomalhaut", name: "포말하우트", ra: 22.9608, dec: -29.6222, mag: 1.16, color: "#edf3ff" },
  { id: "spica", name: "스피카", ra: 13.4199, dec: -11.1614, mag: 0.98, color: "#dce9ff" },
  { id: "betelgeuse", name: "베텔게우스", ra: 5.9195, dec: 7.4071, mag: 0.42, color: "#ffb084" },
  { id: "bellatrix", name: "벨라트릭스", ra: 5.4189, dec: 6.3497, mag: 1.64, color: "#dce7ff" },
  { id: "alnitak", name: "알니타크", ra: 5.6793, dec: -1.9426, mag: 1.74, color: "#dbe8ff" },
  { id: "alnilam", name: "알닐람", ra: 5.6036, dec: -1.2019, mag: 1.69, color: "#dce8ff" },
  { id: "mintaka", name: "민타카", ra: 5.5334, dec: -0.2991, mag: 2.23, color: "#e8efff" },
  { id: "saiph", name: "사이프", ra: 5.7959, dec: -9.6696, mag: 2.06, color: "#dce9ff" },
  { id: "rigel", name: "리겔", ra: 5.2423, dec: -8.2016, mag: 0.13, color: "#dbe8ff" },
  { id: "dubhe", name: "두베", ra: 11.0621, dec: 61.7508, mag: 1.79, color: "#ffe3bc" },
  { id: "merak", name: "메라크", ra: 11.0307, dec: 56.3824, mag: 2.37, color: "#e5edff" },
  { id: "phecda", name: "페크다", ra: 11.8972, dec: 53.6948, mag: 2.44, color: "#eff3ff" },
  { id: "megrez", name: "메그레즈", ra: 12.257, dec: 57.0326, mag: 3.31, color: "#eef2ff" },
  { id: "alioth", name: "알리오트", ra: 12.9005, dec: 55.9598, mag: 1.76, color: "#e5edff" },
  { id: "mizar", name: "미자르", ra: 13.3987, dec: 54.9254, mag: 2.23, color: "#e7efff" },
  { id: "alkaid", name: "알카이드", ra: 13.7923, dec: 49.3133, mag: 1.85, color: "#dce9ff" },
  { id: "caph", name: "카프", ra: 0.1529, dec: 59.1498, mag: 2.28, color: "#fff4dc" },
  { id: "schedar", name: "셰다르", ra: 0.6751, dec: 56.5373, mag: 2.24, color: "#ffd4a8" },
  { id: "navi", name: "나비", ra: 0.9451, dec: 60.7167, mag: 2.15, color: "#e4ecff" },
  { id: "ruchbah", name: "루크바", ra: 1.4303, dec: 60.2353, mag: 2.68, color: "#edf2ff" },
  { id: "segin", name: "세긴", ra: 1.9066, dec: 63.67, mag: 3.35, color: "#dce9ff" },
  { id: "deneb", name: "데네브", ra: 20.6905, dec: 45.2803, mag: 1.25, color: "#e8efff" },
  { id: "sadr", name: "사드르", ra: 20.3705, dec: 40.2567, mag: 2.23, color: "#fff4dc" },
  { id: "gienah", name: "기에나", ra: 20.7702, dec: 33.9703, mag: 2.48, color: "#ffddba" },
  { id: "deltaCyg", name: "델타 백조", ra: 19.7496, dec: 45.1308, mag: 2.87, color: "#dce9ff" },
  { id: "albireo", name: "알비레오", ra: 19.512, dec: 27.9597, mag: 3.05, color: "#ffd09a" },
  { id: "acrAB", name: "아크라브", ra: 16.0906, dec: -19.8055, mag: 2.56, color: "#dce8ff" },
  { id: "dschubba", name: "주바", ra: 16.0056, dec: -22.6217, mag: 2.32, color: "#dce8ff" },
  { id: "antares", name: "안타레스", ra: 16.4901, dec: -26.432, mag: 0.96, color: "#ff9b78" },
  { id: "shaula", name: "샤울라", ra: 17.5601, dec: -37.1038, mag: 1.62, color: "#dce8ff" },
  { id: "sargas", name: "사르가스", ra: 17.6219, dec: -42.9978, mag: 1.86, color: "#fff0cd" },
  { id: "regulus", name: "레굴루스", ra: 10.1395, dec: 11.9672, mag: 1.35, color: "#dce8ff" },
  { id: "algieba", name: "알기에바", ra: 10.3329, dec: 19.8415, mag: 2.01, color: "#ffd3a4" },
  { id: "zosma", name: "조스마", ra: 11.2351, dec: 20.5237, mag: 2.56, color: "#e7efff" },
  { id: "denebola", name: "데네볼라", ra: 11.8177, dec: 14.5721, mag: 2.14, color: "#dce8ff" },
  { id: "chertan", name: "셰르탄", ra: 11.2373, dec: 15.4296, mag: 3.34, color: "#eef2ff" },
  { id: "aldebaran", name: "알데바란", ra: 4.5987, dec: 16.5093, mag: 0.86, color: "#ffb17f" },
  { id: "elnath", name: "엘나스", ra: 5.4382, dec: 28.6075, mag: 1.65, color: "#dce8ff" },
  { id: "alcyone", name: "알키오네", ra: 3.7914, dec: 24.1051, mag: 2.87, color: "#dce8ff" },
  { id: "tianguan", name: "천관", ra: 5.6274, dec: 21.1426, mag: 3, color: "#dce8ff" },
  { id: "castor", name: "카스토르", ra: 7.5767, dec: 31.8883, mag: 1.58, color: "#e8efff" },
  { id: "pollux", name: "폴룩스", ra: 7.7553, dec: 28.0262, mag: 1.14, color: "#ffd2a4" },
  { id: "alhena", name: "알헤나", ra: 6.6285, dec: 16.3993, mag: 1.93, color: "#eef3ff" },
  { id: "tejat", name: "테자트", ra: 6.3827, dec: 22.5136, mag: 2.88, color: "#ffbd94" },
  { id: "kausAustralis", name: "카우스 오스트랄리스", ra: 18.4029, dec: -34.3846, mag: 1.79, color: "#dce8ff" },
  { id: "kausMedia", name: "카우스 메디아", ra: 18.3499, dec: -29.8281, mag: 2.7, color: "#fff0d3" },
  { id: "kausBorealis", name: "카우스 보레알리스", ra: 18.4662, dec: -25.4217, mag: 2.82, color: "#ffd3a4" },
  { id: "nunki", name: "눈키", ra: 18.9211, dec: -26.2967, mag: 2.05, color: "#dce8ff" },
  { id: "ascella", name: "아셀라", ra: 19.0435, dec: -29.8801, mag: 2.6, color: "#eef3ff" }
];

const constellationFigures = [
  { name: "오리온자리", stars: ["betelgeuse", "bellatrix", "mintaka", "alnilam", "alnitak", "saiph", "rigel"], lines: [["betelgeuse", "bellatrix"], ["betelgeuse", "alnitak"], ["bellatrix", "mintaka"], ["mintaka", "alnilam"], ["alnilam", "alnitak"], ["alnitak", "saiph"], ["mintaka", "rigel"], ["saiph", "rigel"]] },
  { name: "큰곰자리", stars: ["dubhe", "merak", "phecda", "megrez", "alioth", "mizar", "alkaid"], lines: [["dubhe", "merak"], ["merak", "phecda"], ["phecda", "megrez"], ["megrez", "dubhe"], ["megrez", "alioth"], ["alioth", "mizar"], ["mizar", "alkaid"]] },
  { name: "카시오페이아자리", stars: ["caph", "schedar", "navi", "ruchbah", "segin"], lines: [["caph", "schedar"], ["schedar", "navi"], ["navi", "ruchbah"], ["ruchbah", "segin"]] },
  { name: "백조자리", stars: ["deneb", "sadr", "gienah", "deltaCyg", "albireo"], lines: [["deneb", "sadr"], ["sadr", "albireo"], ["deltaCyg", "sadr"], ["sadr", "gienah"]] },
  { name: "전갈자리", stars: ["acrAB", "dschubba", "antares", "shaula", "sargas"], lines: [["acrAB", "dschubba"], ["dschubba", "antares"], ["antares", "sargas"], ["sargas", "shaula"]] },
  { name: "사자자리", stars: ["regulus", "algieba", "zosma", "denebola", "chertan"], lines: [["regulus", "algieba"], ["algieba", "zosma"], ["zosma", "denebola"], ["denebola", "chertan"], ["chertan", "regulus"]] },
  { name: "황소자리", stars: ["alcyone", "aldebaran", "tianguan", "elnath"], lines: [["alcyone", "aldebaran"], ["aldebaran", "tianguan"], ["tianguan", "elnath"]] },
  { name: "쌍둥이자리", stars: ["castor", "pollux", "tejat", "alhena"], lines: [["castor", "pollux"], ["castor", "tejat"], ["pollux", "alhena"]] },
  { name: "궁수자리", stars: ["kausAustralis", "kausMedia", "kausBorealis", "nunki", "ascella"], lines: [["kausAustralis", "kausMedia"], ["kausMedia", "kausBorealis"], ["kausBorealis", "nunki"], ["nunki", "ascella"], ["ascella", "kausAustralis"]] }
];

const namedStarMap = new Map(namedStars.map((star) => [star.id, star]));

const milkyWayGuide = [
  { ra: 0, dec: 62 }, { ra: 2, dec: 58 }, { ra: 4, dec: 42 }, { ra: 6, dec: 18 },
  { ra: 8, dec: -14 }, { ra: 10, dec: -42 }, { ra: 12, dec: -58 }, { ra: 14, dec: -50 },
  { ra: 16, dec: -32 }, { ra: 18, dec: -22 }, { ra: 20, dec: 12 }, { ra: 22, dec: 46 }, { ra: 24, dec: 62 }
];

const planetElementRates = {
  mercury: { semiMajorAxisAu: 0.00000037, eccentricity: 0.00001906, inclinationDeg: -0.00594749, meanLongitudeAtEpochDeg: 149472.67411175, longitudePerihelionDeg: 0.16047689, longitudeAscendingNodeDeg: -0.12534081 },
  venus: { semiMajorAxisAu: 0.00000390, eccentricity: -0.00004107, inclinationDeg: -0.00078890, meanLongitudeAtEpochDeg: 58517.81538729, longitudePerihelionDeg: 0.00268329, longitudeAscendingNodeDeg: -0.27769418 },
  earth: { semiMajorAxisAu: 0.00000562, eccentricity: -0.00004392, inclinationDeg: -0.01294668, meanLongitudeAtEpochDeg: 35999.37244981, longitudePerihelionDeg: 0.32327364, longitudeAscendingNodeDeg: 0 },
  mars: { semiMajorAxisAu: 0.00001847, eccentricity: 0.00007882, inclinationDeg: -0.00813131, meanLongitudeAtEpochDeg: 19140.30268499, longitudePerihelionDeg: 0.44441088, longitudeAscendingNodeDeg: -0.29257343 },
  jupiter: { semiMajorAxisAu: -0.00011607, eccentricity: -0.00013253, inclinationDeg: -0.00183714, meanLongitudeAtEpochDeg: 3034.74612775, longitudePerihelionDeg: 0.21252668, longitudeAscendingNodeDeg: 0.20469106 },
  saturn: { semiMajorAxisAu: -0.00125060, eccentricity: -0.00050991, inclinationDeg: 0.00193609, meanLongitudeAtEpochDeg: 1222.49362201, longitudePerihelionDeg: -0.41897216, longitudeAscendingNodeDeg: -0.28867794 },
  uranus: { semiMajorAxisAu: -0.00196176, eccentricity: -0.00004397, inclinationDeg: -0.00242939, meanLongitudeAtEpochDeg: 428.48202785, longitudePerihelionDeg: 0.40805281, longitudeAscendingNodeDeg: 0.04240589 },
  neptune: { semiMajorAxisAu: 0.00026291, eccentricity: 0.00005105, inclinationDeg: 0.00035372, meanLongitudeAtEpochDeg: 218.45945325, longitudePerihelionDeg: -0.32241464, longitudeAscendingNodeDeg: -0.00508664 }
};

const categoryLabels = {
  planet: "기본 행성",
  dwarfPlanet: "왜소행성",
  asteroid: "소행성",
  comet: "혜성",
  centaur: "센타우루스",
  detached: "원거리 천체",
  transfer: "가상 이동 궤도"
};

const presets = {
  inner: { observer: "earth", target: "venus", range: "2", trail: 720, skySpan: 120 },
  outer: { observer: "earth", target: "mars", range: "auto", trail: 900, skySpan: 100 },
  ellipse: { observer: "earth", target: "halley", range: "100", trail: 5000, skySpan: 180 },
  innerToOuter: { observer: "earth", target: "transferInnerToOuter", range: "8", trail: 900, skySpan: 140 },
  outerToInner: { observer: "earth", target: "transferOuterToInner", range: "8", trail: 900, skySpan: 140 },
  dwarf: { observer: "earth", target: "pluto", range: "100", trail: 8000, skySpan: 90 }
};

const bodyEditorFields = [
  { path: "elements.semiMajorAxisAu", label: "장반경 a", unit: "AU", min: 0.05, max: 900, step: 0.001, digits: 3 },
  { path: "elements.eccentricity", label: "이심률 e", unit: "", min: 0, max: 0.999, step: 0.001, digits: 3 },
  { path: "elements.inclinationDeg", label: "궤도 경사", unit: "deg", min: 0, max: 180, step: 0.01, digits: 2 },
  { path: "elements.longitudeAscendingNodeDeg", label: "승교점 경도", unit: "deg", min: 0, max: 360, step: 0.01, digits: 2 },
  { path: "elements.longitudePerihelionDeg", label: "근일점 경도", unit: "deg", min: 0, max: 360, step: 0.01, digits: 2 },
  { path: "elements.meanLongitudeAtEpochDeg", label: "평균 경도", unit: "deg", min: 0, max: 360, step: 0.01, digits: 2 },
  { path: "elements.orbitalPeriodDays", label: "공전 주기", unit: "day", min: 1, max: 5000000, step: 0.1, digits: 1 },
  { path: "diameterKm", label: "직경", unit: "km", min: 1, max: 200000, step: 1, digits: 1 },
  { path: "absMag", label: "절대등급", unit: "mag", min: -12, max: 20, step: 0.1, digits: 1 }
];

const transferEditorFields = [
  { path: "transfer.startAu", label: "시작 거리", unit: "AU", min: 0.05, max: 100, step: 0.01, digits: 2 },
  { path: "transfer.endAu", label: "도착 거리", unit: "AU", min: 0.05, max: 100, step: 0.01, digits: 2 }
];

const solarOverlayDefaults = {
  elongation: true,
  easternMaxElongation: true,
  westernMaxElongation: true,
  opposition: true,
  inferiorConjunction: true,
  superiorConjunction: true,
  easternQuadrature: true,
  westernQuadrature: true
};

const state = {
  bodies: [],
  bodyMap: new Map(),
  originalBodies: [],
  originalBodyMap: new Map(),
  dataSource: "json",
  epochJd: 2451545.0,
  observerId: "earth",
  targetId: "mars",
  jd: dateToJd(new Date()),
  running: true,
  speedDaysPerSecond: sliderToSpeed(24),
  trailDays: 720,
  rangeMode: "auto",
  solarOverlays: { ...solarOverlayDefaults },
  skyCoordinateMode: "ecliptic",
  skyView: {
    centerLongitude: 180,
    centerLatitude: 0,
    lonSpan: 360,
    followTarget: true,
    dragging: false,
    dragStart: null
  },
  activePreset: "outer",
  starfieldSolar: makeStars(180, 19),
  starfieldSky: makeSkyStars(620, 47),
  lastFrame: null
};

const els = {
  observerSelect: document.getElementById("observerSelect"),
  targetSelect: document.getElementById("targetSelect"),
  presetGrid: document.getElementById("presetGrid"),
  dateInput: document.getElementById("dateInput"),
  todayButton: document.getElementById("todayButton"),
  speedRange: document.getElementById("speedRange"),
  speedOutput: document.getElementById("speedOutput"),
  trailRange: document.getElementById("trailRange"),
  trailOutput: document.getElementById("trailOutput"),
  rangeSelect: document.getElementById("rangeSelect"),
  solarOverlayGrid: document.getElementById("solarOverlayGrid"),
  skyCoordinateSelect: document.getElementById("skyCoordinateSelect"),
  followTargetCheckbox: document.getElementById("followTargetCheckbox"),
  playButton: document.getElementById("playButton"),
  resetTrailButton: document.getElementById("resetTrailButton"),
  resetBodyButton: document.getElementById("resetBodyButton"),
  detailEditor: document.getElementById("detailEditor"),
  detailEditorTitle: document.getElementById("detailEditorTitle"),
  motionBadge: document.getElementById("motionBadge"),
  solarCanvas: document.getElementById("solarCanvas"),
  skyCanvas: document.getElementById("skyCanvas"),
  phaseCanvas: document.getElementById("phaseCanvas"),
  solarScaleLabel: document.getElementById("solarScaleLabel"),
  skyWindowLabel: document.getElementById("skyWindowLabel"),
  phaseSummary: document.getElementById("phaseSummary"),
  metricsGrid: document.getElementById("metricsGrid"),
  summaryLine: document.getElementById("summaryLine")
};

init();

async function init() {
  try {
    const { data, source } = await loadBodyData();
    state.dataSource = source;
    state.epochJd = data.epochJd;
    const bodies = [...data.bodies, ...createTransferBodies()];
    state.bodies = cloneData(bodies);
    state.originalBodies = cloneData(bodies);
    state.bodyMap = new Map(state.bodies.map((body) => [body.id, body]));
    state.originalBodyMap = new Map(state.originalBodies.map((body) => [body.id, body]));
    populateSelects();
    bindEvents();
    applyPreset("outer");
    requestAnimationFrame(loop);
  } catch (error) {
    els.motionBadge.textContent = "천체 데이터 로드 실패";
    els.motionBadge.classList.add("load-error");
    els.summaryLine.textContent = "bodies.json과 내장 천체 데이터를 모두 읽지 못했습니다.";
    console.error(error);
  }
}

async function loadBodyData() {
  if (globalThis.SOLAR_SYSTEM_BODIES_DATA && location.protocol === "file:") {
    return { data: globalThis.SOLAR_SYSTEM_BODIES_DATA, source: "embedded" };
  }

  try {
    const response = await fetch("bodies.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return { data: await response.json(), source: "json" };
  } catch (error) {
    if (globalThis.SOLAR_SYSTEM_BODIES_DATA) {
      return { data: globalThis.SOLAR_SYSTEM_BODIES_DATA, source: "embedded" };
    }
    throw error;
  }
}

function createTransferBodies() {
  return [
    {
      id: "transferInnerToOuter",
      nameKo: "내→외 이동체",
      nameEn: "Inner-to-Outer Transfer",
      category: "transfer",
      color: "#ff9f7a",
      radiusKm: 2500,
      diameterKm: 5000,
      absMag: 0.8,
      featured: true,
      transfer: {
        startAu: 0.62,
        endAu: 5.2
      },
      elements: {
        semiMajorAxisAu: 2.91,
        eccentricity: 0.787,
        inclinationDeg: 4.5,
        longitudeAscendingNodeDeg: 32,
        longitudePerihelionDeg: 118,
        meanLongitudeAtEpochDeg: 35,
        orbitalPeriodDays: 1810.2
      }
    },
    {
      id: "transferOuterToInner",
      nameKo: "외→내 이동체",
      nameEn: "Outer-to-Inner Transfer",
      category: "transfer",
      color: "#7dd3fc",
      radiusKm: 2500,
      diameterKm: 5000,
      absMag: 0.8,
      featured: true,
      transfer: {
        startAu: 5.2,
        endAu: 0.62
      },
      elements: {
        semiMajorAxisAu: 2.91,
        eccentricity: 0.787,
        inclinationDeg: 4.5,
        longitudeAscendingNodeDeg: 32,
        longitudePerihelionDeg: 118,
        meanLongitudeAtEpochDeg: 35,
        orbitalPeriodDays: 1810.2
      }
    }
  ];
}

function bindEvents() {
  syncSolarOverlayControls();
  syncSkyFollowControl();

  els.observerSelect.addEventListener("change", () => {
    state.observerId = els.observerSelect.value;
    state.activePreset = null;
    applyOptimalOverlaySelection();
    centerSkyOnTarget();
    syncPresetButtons();
    render();
  });

  els.targetSelect.addEventListener("change", () => {
    state.targetId = els.targetSelect.value;
    state.activePreset = null;
    applyOptimalOverlaySelection();
    centerSkyOnTarget();
    syncPresetButtons();
    renderBodyEditor();
    render();
  });

  els.presetGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-preset]");
    if (!button) return;
    applyPreset(button.dataset.preset);
  });

  els.dateInput.addEventListener("change", () => {
    if (!els.dateInput.value) return;
    state.jd = dateToJd(new Date(`${els.dateInput.value}T00:00:00Z`));
    render();
  });

  els.todayButton.addEventListener("click", () => {
    state.jd = dateToJd(new Date());
    syncDateInput();
    render();
  });

  els.speedRange.addEventListener("input", () => {
    const wasRotationMode = usesRotationMode();
    state.speedDaysPerSecond = sliderToSpeed(Number(els.speedRange.value));
    if (wasRotationMode !== usesRotationMode()) {
      centerSkyOnTarget();
    }
    updateControlOutputs();
  });

  els.trailRange.addEventListener("input", () => {
    state.trailDays = Number(els.trailRange.value);
    state.activePreset = null;
    syncPresetButtons();
    updateControlOutputs();
    render();
  });

  els.rangeSelect.addEventListener("change", () => {
    state.rangeMode = els.rangeSelect.value;
    state.activePreset = null;
    syncPresetButtons();
    render();
  });

  els.solarOverlayGrid.addEventListener("change", (event) => {
    const input = event.target.closest("input[data-overlay]");
    if (!input) return;
    state.solarOverlays[input.dataset.overlay] = input.checked;
    render();
  });

  els.skyCoordinateSelect.addEventListener("change", () => {
    state.skyCoordinateMode = els.skyCoordinateSelect.value;
    centerSkyOnTarget();
    render();
  });

  els.followTargetCheckbox.addEventListener("change", () => {
    setSkyFollowEnabled(els.followTargetCheckbox.checked);
    if (state.skyView.followTarget) {
      centerSkyOnTarget();
    }
    render();
  });

  els.playButton.addEventListener("click", () => {
    state.running = !state.running;
    els.playButton.textContent = state.running ? "일시정지" : "재생";
  });

  els.resetTrailButton.addEventListener("click", () => {
    state.trailDays = presets[state.activePreset]?.trail ?? 720;
    els.trailRange.value = String(state.trailDays);
    updateControlOutputs();
    render();
  });

  els.resetBodyButton.addEventListener("click", () => {
    resetSelectedBody();
  });

  els.detailEditor.addEventListener("input", (event) => {
    const input = event.target.closest("input[data-field]");
    if (!input) return;
    updateBodyField(input);
  });

  bindSkyCanvasInteraction();
  window.addEventListener("resize", render);
}

function bindSkyCanvasInteraction() {
  els.skyCanvas.addEventListener("wheel", handleSkyWheel, { passive: false });
  els.skyCanvas.addEventListener("pointerdown", handleSkyPointerDown);
  window.addEventListener("pointermove", handleSkyPointerMove);
  window.addEventListener("pointerup", stopSkyDrag);
  window.addEventListener("pointercancel", stopSkyDrag);
}

function handleSkyWheel(event) {
  event.preventDefault();
  const projection = skyProjectionFromCanvasRect();
  const point = skyPointerPoint(event);
  const ratioX = clamp((point.x - projection.padX) / projection.chartW, 0, 1);
  const ratioY = clamp((point.y - projection.top) / projection.chartH, 0, 1);
  const longitudeAtCursor = skyXToLongitude(point.x, projection);
  const latitudeAtCursor = skyYToLatitude(point.y, projection);
  const zoomFactor = Math.exp(event.deltaY * 0.0012);
  const nextLonSpan = clamp(projection.lonSpan * zoomFactor, SKY_MIN_LON_SPAN, SKY_MAX_LON_SPAN);
  const nextLatSpan = skyLatitudeSpanFor(nextLonSpan, projection.chartW, projection.chartH);
  const nextLongitudeOffset = nextLonSpan / 2 - ratioX * nextLonSpan;
  const nextLatitudeOffset = nextLatSpan / 2 - ratioY * nextLatSpan;

  state.skyView.lonSpan = nextLonSpan;
  if (state.skyView.followTarget) {
    centerSkyOnTarget();
    render();
    return;
  }
  state.skyView.centerLongitude = mod360(longitudeAtCursor - nextLongitudeOffset);
  state.skyView.centerLatitude = clampSkyCenterLatitude(latitudeAtCursor - nextLatitudeOffset, nextLatSpan);
  render();
}

function handleSkyPointerDown(event) {
  if (event.button !== 0) return;
  event.preventDefault();
  setSkyFollowEnabled(false);
  const projection = skyProjectionFromCanvasRect();
  const point = skyPointerPoint(event);
  state.skyView.dragging = true;
  state.skyView.dragStart = {
    x: point.x,
    y: point.y,
    centerLongitude: projection.centerLongitude,
    centerLatitude: projection.centerLatitude,
    lonSpan: projection.lonSpan,
    latSpan: projection.latSpan,
    chartW: projection.chartW,
    chartH: projection.chartH
  };
  els.skyCanvas.classList.add("is-dragging");
  if (els.skyCanvas.setPointerCapture) {
    els.skyCanvas.setPointerCapture(event.pointerId);
  }
}

function handleSkyPointerMove(event) {
  if (!state.skyView.dragging || !state.skyView.dragStart) return;
  event.preventDefault();
  const point = skyPointerPoint(event);
  const start = state.skyView.dragStart;
  const dx = point.x - start.x;
  const dy = point.y - start.y;

  state.skyView.centerLongitude = mod360(start.centerLongitude + dx / start.chartW * start.lonSpan);
  state.skyView.centerLatitude = clampSkyCenterLatitude(
    start.centerLatitude + dy / start.chartH * start.latSpan,
    start.latSpan
  );
  render();
}

function stopSkyDrag() {
  if (!state.skyView.dragging) return;
  state.skyView.dragging = false;
  state.skyView.dragStart = null;
  els.skyCanvas.classList.remove("is-dragging");
}

function populateSelects() {
  const sorted = [...state.bodies].sort((a, b) => {
    const categoryOrder = ["planet", "dwarfPlanet", "asteroid", "comet", "centaur", "detached", "transfer"];
    return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
      || a.elements.semiMajorAxisAu - b.elements.semiMajorAxisAu;
  });

  const groups = new Map();
  for (const body of sorted) {
    if (!groups.has(body.category)) groups.set(body.category, []);
    groups.get(body.category).push(body);
  }

  for (const select of [els.observerSelect, els.targetSelect]) {
    select.replaceChildren();
    for (const [category, bodies] of groups.entries()) {
      const group = document.createElement("optgroup");
      group.label = categoryLabels[category] ?? category;
      for (const body of bodies) {
        const option = document.createElement("option");
        option.value = body.id;
        option.textContent = `${body.nameKo} (${body.nameEn})`;
        group.append(option);
      }
      select.append(group);
    }
  }
}

function applyPreset(name) {
  const preset = presets[name];
  if (!preset) return;
  state.observerId = preset.observer;
  state.targetId = preset.target;
  state.rangeMode = preset.range;
  state.trailDays = preset.trail;
  state.skyView.lonSpan = preset.skySpan ?? 120;
  state.activePreset = name;
  if (getBody(state.targetId)?.transfer) {
    state.jd = state.epochJd;
  }
  els.observerSelect.value = state.observerId;
  els.targetSelect.value = state.targetId;
  els.rangeSelect.value = state.rangeMode;
  els.trailRange.value = String(state.trailDays);
  els.skyCoordinateSelect.value = state.skyCoordinateMode;
  applyOptimalOverlaySelection();
  centerSkyOnTarget();
  syncPresetButtons();
  updateControlOutputs();
  renderBodyEditor();
  syncDateInput();
  render();
}

function applyOptimalOverlaySelection() {
  const observer = getBody(state.observerId);
  const target = getBody(state.targetId);
  if (!observer || !target) return;
  const relation = orbitalRelation(observer, target, state.jd);
  const selected = relation === "inner"
    ? ["elongation", "easternMaxElongation", "westernMaxElongation", "inferiorConjunction", "superiorConjunction"]
    : ["elongation", "opposition", "superiorConjunction", "easternQuadrature", "westernQuadrature"];

  for (const key of Object.keys(state.solarOverlays)) {
    state.solarOverlays[key] = selected.includes(key);
  }
  syncSolarOverlayControls();
}

function centerSkyOnTarget() {
  const observer = getBody(state.observerId);
  const target = getBody(state.targetId);
  if (!observer || !target) return;
  const jd = skyDisplayJd(state.jd);
  const snapshot = computeSnapshot(observer, target, jd);
  centerSkyOnSnapshot(observer, snapshot, jd);
}

function centerSkyOnSnapshot(observer, snapshot, jd) {
  const coordinates = snapshotSkyCoordinates(snapshot, state.skyCoordinateMode, "target");
  state.skyView.centerLongitude = displaySkyLongitude(coordinates.longitude, jd, observer);
  state.skyView.centerLatitude = clampSkyCenterLatitude(
    coordinates.latitude,
    skyLatitudeSpanFor(state.skyView.lonSpan, 1, 0.62)
  );
}

function loop(timestamp) {
  if (state.lastFrame === null) {
    state.lastFrame = timestamp;
  }
  const deltaSeconds = Math.min(0.08, (timestamp - state.lastFrame) / 1000);
  state.lastFrame = timestamp;

  if (state.running && state.speedDaysPerSecond !== 0) {
    state.jd += deltaSeconds * state.speedDaysPerSecond;
    syncDateInput(false);
  }

  render();
  requestAnimationFrame(loop);
}

function render() {
  if (!state.bodies.length) return;
  const observer = getBody(state.observerId);
  const target = getBody(state.targetId);
  if (!observer || !target) return;

  const snapshot = computeSnapshot(observer, target, state.jd);
  const skyJd = skyDisplayJd(state.jd);
  const skySnapshot = Math.abs(skyJd - state.jd) < 1e-8
    ? snapshot
    : computeSnapshot(observer, target, skyJd);
  if (state.skyView.followTarget && !state.skyView.dragging) {
    centerSkyOnSnapshot(observer, skySnapshot, skyJd);
  }
  drawSolarView(observer, target, snapshot);
  drawSkyView(observer, target, skySnapshot, skyJd);
  drawPhaseView(target, snapshot);
  updateMetrics(observer, target, snapshot);
}

function computeSnapshot(observer, target, jd) {
  const observerPos = orbitalPosition(observer, jd, state.epochJd);
  const targetGeometricPos = orbitalPosition(target, jd, state.epochJd);
  const apparentTarget = apparentTargetState(observer, target, jd, observerPos);
  const targetPos = apparentTarget.position;
  const sunFromObserver = scaleVec(observerPos, -1);
  const targetFromObserver = subVec(targetPos, observerPos);
  const observerFromTarget = subVec(observerPos, targetPos);
  const sunFromTarget = scaleVec(targetPos, -1);

  const apparentLongitude = mod360(radToDeg(Math.atan2(targetFromObserver.y, targetFromObserver.x)));
  const apparentLatitude = radToDeg(Math.atan2(targetFromObserver.z, Math.hypot(targetFromObserver.x, targetFromObserver.y)));
  const sunLongitude = mod360(radToDeg(Math.atan2(sunFromObserver.y, sunFromObserver.x)));
  const signedElongation = signedAngleDiff(apparentLongitude, sunLongitude);
  const equatorial = eclipticVectorToEquatorial(targetFromObserver, jd);
  const sunApparentLatitude = radToDeg(Math.atan2(sunFromObserver.z, Math.hypot(sunFromObserver.x, sunFromObserver.y)));
  const sunEquatorial = eclipticVectorToEquatorial(sunFromObserver, jd);
  const elongation = angleBetween(targetFromObserver, sunFromObserver);
  const phaseAngle = angleBetween(sunFromTarget, observerFromTarget);
  const illuminated = (1 + Math.cos(degToRad(phaseAngle))) / 2;
  const distanceObserverTarget = magnitude(targetFromObserver);
  const distanceSunTarget = magnitude(targetPos);
  const distanceSunObserver = magnitude(observerPos);
  const radialVelocity = radialRate(target, jd);
  const longitudeRate = apparentLongitudeRate(observer, target, jd);
  const relation = orbitalRelation(observer, target, jd);
  const synodicPeriod = computeSynodicPeriod(observer, target, jd);
  const maxElongationGeometry = computeMaxElongationGeometry(observer, target, jd, observerPos);
  const maxElongation = maxElongationGeometry ? maxElongationGeometry.value : Infinity;
  const eventText = eventLabel({
    observer,
    target,
    elongation,
    longitudeRate,
    relation,
    maxElongation,
    signedElongation,
    distanceObserverTarget,
    distanceSunObserver
  });
  const angularDiameterArcsec = target.diameterKm / (distanceObserverTarget * AU_KM) * 206265;
  const magnitudeEstimate = estimateMagnitude(target, distanceSunTarget, distanceObserverTarget, phaseAngle);
  const targetElements = elementsAt(target, jd);

  return {
    observerPos,
    targetPos,
    targetGeometricPos,
    sunFromObserver,
    targetFromObserver,
    observerFromTarget,
    sunFromTarget,
    apparentLongitude,
    apparentLatitude,
    signedElongation,
    rightAscensionHours: equatorial.rightAscensionHours,
    declinationDeg: equatorial.declinationDeg,
    obliquityDeg: equatorial.obliquityDeg,
    sunLongitude,
    sunApparentLatitude,
    sunRightAscensionHours: sunEquatorial.rightAscensionHours,
    sunDeclinationDeg: sunEquatorial.declinationDeg,
    elongation,
    phaseAngle,
    illuminated,
    distanceObserverTarget,
    distanceSunTarget,
    distanceSunObserver,
    radialVelocity,
    longitudeRate,
    eventText,
    relation,
    synodicPeriod,
    maxElongation,
    maxElongationGeometry,
    targetElements,
    angularDiameterArcsec,
    magnitudeEstimate,
    lightTimeDays: apparentTarget.lightTimeDays,
    emissionJd: apparentTarget.emissionJd,
    targetTrueAnomaly: trueAnomaly(target, apparentTarget.emissionJd)
  };
}

function drawSolarView(observer, target, snapshot) {
  const { ctx, width, height } = fitCanvas(els.solarCanvas);
  paintSpace(ctx, width, height, state.starfieldSolar, 0.8);

  const maxR = getSolarMaxRange(observer, target);
  const center = { x: width / 2, y: height / 2 };
  const radius = Math.min(width, height) * 0.43;
  const visibleBodies = state.bodies.filter((body) => shouldDrawOrbit(body, observer, target, maxR));

  drawSolarGrid(ctx, center, radius, maxR);
  drawSolarOrbitDirection(ctx, center, radius);

  for (const body of visibleBodies) {
    drawOrbit(ctx, body, center, radius, maxR);
  }

  drawBodyTrail(ctx, observer, state.jd, center, radius, maxR, "rgba(90, 177, 242, 0.55)");
  drawBodyTrail(ctx, target, state.jd, center, radius, maxR, withAlpha(target.color, 0.62));

  const observerScreen = toSolarScreen(snapshot.observerPos, center, radius, maxR);
  const targetScreen = toSolarScreen(snapshot.targetGeometricPos, center, radius, maxR);

  drawSolarOverlays(ctx, observer, target, snapshot, center, radius, maxR);
  drawSun(ctx, center.x, center.y);
  drawPlanet(ctx, observerScreen.x, observerScreen.y, observer.color, 5.5, observer.nameKo);
  drawPlanet(ctx, targetScreen.x, targetScreen.y, target.color, 7, target.nameKo);
  drawSolarObserverAnchor(ctx, observerScreen);

  els.solarScaleLabel.textContent = `${formatNumber(maxR, maxR >= 100 ? 0 : 1)} AU · 북극 위에서 본 반시계 공전`;
}

function drawSkyView(observer, target, snapshot, skyJd) {
  const { ctx, width, height } = fitCanvas(els.skyCanvas);
  const padX = SKY_VIEW_PAD_X;
  const top = SKY_VIEW_TOP;
  const bottom = SKY_VIEW_BOTTOM;
  const chartW = width - padX * 2;
  const chartH = height - top - bottom;
  const track = buildApparentTrack(observer, target, skyJd);
  const projection = makeFixedSkyProjection(padX, top, chartW, chartH);
  const targetCoordinates = snapshotSkyCoordinates(snapshot, state.skyCoordinateMode, "target");
  const sunCoordinates = snapshotSkyCoordinates(snapshot, state.skyCoordinateMode, "sun");
  const targetLongitude = displaySkyLongitude(targetCoordinates.longitude, skyJd, observer);
  const sunLongitude = displaySkyLongitude(sunCoordinates.longitude, skyJd, observer);
  const antiSunLongitude = mod360(sunLongitude + 180);
  const sunX = skyLongitudeToX(sunLongitude, projection);
  const antiSunX = skyLongitudeToX(antiSunLongitude, projection);
  const westQuadratureX = skyLongitudeToX(sunLongitude - 90, projection);
  const eastQuadratureX = skyLongitudeToX(sunLongitude + 90, projection);

  paintNightSky(ctx, width, height, projection, observer, skyJd);

  ctx.save();
  ctx.strokeStyle = "rgba(132, 182, 216, 0.34)";
  ctx.lineWidth = 1;
  if (projection.latMin <= 0 && projection.latMax >= 0) {
    line(ctx, padX, skyLatitudeToY(0, projection), width - padX, skyLatitudeToY(0, projection));
  }

  ctx.fillStyle = "rgba(244, 239, 230, 0.55)";
  ctx.font = "12px Inter, sans-serif";
  ctx.textAlign = "center";
  for (const deg of skyLongitudeTicks(projection)) {
    const x = skyUnwrappedLongitudeToX(deg, projection);
    ctx.strokeStyle = "rgba(112, 157, 190, 0.2)";
    line(ctx, x, top, x, height - bottom);
    ctx.fillText(formatSkyLongitudeTick(deg), x, height - 16);
  }
  ctx.textAlign = "right";
  for (const lat of skyLatitudeTicks(projection)) {
    const y = skyLatitudeToY(lat, projection);
    ctx.strokeStyle = "rgba(112, 157, 190, 0.17)";
    line(ctx, padX, y, width - padX, y);
    ctx.fillText(`${formatSigned(lat, 0)}°`, padX - 8, y + 4);
  }
  ctx.restore();

  drawSkyDirectionHint(ctx, padX, height - bottom - 16, chartW);

  if (
    isWithinChart(sunX, projection)
    && (state.solarOverlays.inferiorConjunction || state.solarOverlays.superiorConjunction)
  ) {
    drawSkyMarker(ctx, sunX, top + 14, height - bottom, snapshot.relation === "inner" ? "내합·외합" : "합", "#f2b84b");
  }
  if (state.solarOverlays.opposition && isWithinChart(antiSunX, projection)) {
    drawSkyMarker(ctx, antiSunX, top + 14, height - bottom, "충", "#4fd1c5");
  }
  if (state.solarOverlays.westernQuadrature && isWithinChart(westQuadratureX, projection)) {
    drawSkyMarker(ctx, westQuadratureX, top + 14, height - bottom, "서구", "#7dd3fc");
  }
  if (state.solarOverlays.easternQuadrature && isWithinChart(eastQuadratureX, projection)) {
    drawSkyMarker(ctx, eastQuadratureX, top + 14, height - bottom, "동구", "#9bd36d");
  }

  drawApparentTrack(ctx, target, track.points, projection);

  const targetX = skyLongitudeToX(targetLongitude, projection);
  const targetY = skyLatitudeToY(targetCoordinates.latitude, projection);
  const size = Math.max(5, Math.min(14, 6 + snapshot.angularDiameterArcsec / 10));
  if (isSkyPointVisible(targetX, targetY, projection)) {
    drawPlanet(ctx, targetX, targetY, target.color, size, target.nameKo);
  }

  ctx.save();
  ctx.fillStyle = "rgba(244, 239, 230, 0.66)";
  ctx.font = "12px Inter, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(skyCoordinateSummary(snapshot), padX, top + 6);
  ctx.restore();

  drawNightHorizon(ctx, width, height, bottom);

  const coordinateLabel = state.skyCoordinateMode === "equatorial" ? "적경·적위" : "황경·황위";
  const timeModelLabel = usesRotationMode()
    ? "실시간 자전 이동"
    : "매일 22시(KST) 겉보기";
  const trackingLabel = state.skyView.followTarget ? "행성 추적" : "수동 탐색";
  els.skyWindowLabel.textContent = `${coordinateLabel} · ${timeModelLabel} · ${trackingLabel} · ${formatNumber(projection.lonSpan, 0)}° 시야`;
}

function drawPhaseView(target, snapshot) {
  const { ctx, width, height } = fitCanvas(els.phaseCanvas);
  paintSpace(ctx, width, height, state.starfieldSolar, 0.45);

  const compactPhase = width < 430;
  const diskSize = Math.max(110, Math.min(190, width * (compactPhase ? 0.46 : 0.38), height * (compactPhase ? 0.5 : 0.72)));
  const diskX = compactPhase ? width / 2 : Math.max(diskSize / 2 + 28, width * 0.24);
  const diskY = compactPhase ? height * 0.38 : height / 2;
  const image = makePhaseImage(target, diskSize, snapshot.phaseAngle, signedAngleDiff(snapshot.sunLongitude, snapshot.apparentLongitude));

  if (target.id === "saturn") {
    drawPhaseRings(ctx, diskX, diskY, diskSize, target, false);
  }
  ctx.drawImage(image, diskX - diskSize / 2, diskY - diskSize / 2, diskSize, diskSize);
  if (target.id === "saturn") {
    drawPhaseRings(ctx, diskX, diskY, diskSize, target, true);
  }

  ctx.save();
  ctx.strokeStyle = "rgba(244, 239, 230, 0.24)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(diskX, diskY, diskSize / 2, 0, Math.PI * 2);
  ctx.stroke();

  const sunDirection = signedAngleDiff(snapshot.sunLongitude, snapshot.apparentLongitude) >= 0 ? 1 : -1;
  const arrowStartX = diskX + sunDirection * (diskSize / 2 + 10);
  const arrowEndX = diskX + sunDirection * (diskSize / 2 + 54);
  ctx.strokeStyle = "rgba(242, 184, 75, 0.82)";
  ctx.fillStyle = "rgba(242, 184, 75, 0.9)";
  ctx.lineWidth = 2;
  line(ctx, arrowStartX, diskY, arrowEndX, diskY);
  ctx.beginPath();
  ctx.moveTo(arrowEndX, diskY);
  ctx.lineTo(arrowEndX - sunDirection * 9, diskY - 5);
  ctx.lineTo(arrowEndX - sunDirection * 9, diskY + 5);
  ctx.closePath();
  ctx.fill();
  ctx.font = "12px Inter, sans-serif";
  ctx.textAlign = sunDirection > 0 ? "left" : "right";
  ctx.fillText("태양 방향", arrowEndX + sunDirection * 8, diskY - 10);

  const textX = compactPhase ? 18 : Math.min(width - 24, diskX + diskSize / 2 + 96);
  const textY = compactPhase ? height - 82 : Math.max(34, height * 0.22);
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(244, 239, 230, 0.92)";
  ctx.font = "700 16px Inter, sans-serif";
  ctx.fillText(`${target.nameKo} 위상`, textX, textY);
  ctx.font = "13px Inter, sans-serif";
  ctx.fillStyle = "rgba(184, 175, 162, 0.95)";
  ctx.fillText(`위상각 ${formatNumber(snapshot.phaseAngle, 1)}°`, textX, textY + 26);
  ctx.fillText(`밝은 면 ${formatNumber(snapshot.illuminated * 100, 1)}%`, textX, textY + 50);
  ctx.fillText(`시직경 ${formatNumber(snapshot.angularDiameterArcsec, 2)}″`, textX, textY + 74);
  ctx.restore();

  els.phaseSummary.textContent = `${target.nameKo}: 위상각 ${formatNumber(snapshot.phaseAngle, 1)}°, 조명률 ${formatNumber(snapshot.illuminated * 100, 1)}%`;
}

function makePhaseImage(body, size, phaseAngleDeg, sunLongitudeDelta) {
  const pixelSize = Math.max(80, Math.round(size));
  const canvas = document.createElement("canvas");
  canvas.width = pixelSize;
  canvas.height = pixelSize;
  const context = canvas.getContext("2d");
  const image = context.createImageData(pixelSize, pixelSize);
  const base = parseHexColor(body.color);
  const radius = pixelSize / 2 - 2;
  const center = pixelSize / 2;
  const phaseAngle = degToRad(phaseAngleDeg);
  const sunSide = sunLongitudeDelta >= 0 ? 1 : -1;
  const lx = Math.sin(phaseAngle) * sunSide;
  const lz = Math.cos(phaseAngle);

  for (let y = 0; y < pixelSize; y += 1) {
    for (let x = 0; x < pixelSize; x += 1) {
      const dx = (x + 0.5 - center) / radius;
      const dy = (y + 0.5 - center) / radius;
      const rr = dx * dx + dy * dy;
      const offset = (y * pixelSize + x) * 4;
      if (rr > 1) {
        image.data[offset + 3] = 0;
        continue;
      }
      const nz = Math.sqrt(1 - rr);
      const light = dx * lx + nz * lz;
      const lon = Math.atan2(dx, Math.max(0.001, nz));
      const texture = phaseSurfaceTexture(body, dx, dy, nz, lon);
      const dayAmount = smoothstep(-0.06, 0.045, light);
      const directLight = Math.pow(Math.max(0, light), 0.72);
      const limbDarkening = 0.38 + 0.62 * Math.pow(Math.max(0, nz), 0.46);
      const nightGlow = 0.035 + texture.night * 0.035;
      const shade = (nightGlow * (1 - dayAmount) + dayAmount * (0.2 + 0.86 * directLight)) * limbDarkening;
      const terminatorRelief = (1 - Math.min(1, Math.abs(light) / 0.11)) * texture.relief * dayAmount * 0.16;
      const glint = Math.max(0, light) ** 18 * texture.glint;
      const edgeAlpha = 1 - smoothstep(0.965, 1, rr);
      const color = {
        r: base.r * texture.rMul + texture.addR,
        g: base.g * texture.gMul + texture.addG,
        b: base.b * texture.bMul + texture.addB
      };

      image.data[offset] = clampChannel(color.r * (shade + terminatorRelief) + 255 * (0.07 * directLight + glint));
      image.data[offset + 1] = clampChannel(color.g * (shade + terminatorRelief) + 255 * (0.065 * directLight + glint));
      image.data[offset + 2] = clampChannel(color.b * (shade + terminatorRelief) + 255 * (0.06 * directLight + glint));
      image.data[offset + 3] = Math.round(255 * Math.max(0, Math.min(1, edgeAlpha)));
    }
  }

  context.putImageData(image, 0, 0);
  return canvas;
}

function phaseSurfaceTexture(body, dx, dy, nz, lon) {
  const seed = phaseSeed(body.id);
  const broad = phaseNoise(dx * 3.5 + nz * 1.7, dy * 3.5, seed);
  const fine = phaseNoise(dx * 18 + nz * 4, dy * 18, seed + 17);
  const grain = phaseNoise(dx * 55, dy * 55 + nz * 2, seed + 41);
  const texture = {
    rMul: 1,
    gMul: 1,
    bMul: 1,
    addR: 0,
    addG: 0,
    addB: 0,
    relief: 0.35 + Math.abs(fine) * 0.55,
    night: 0.25,
    glint: 0.02
  };

  let albedo = 1 + broad * 0.08 + fine * 0.035 + grain * 0.018;

  if (body.id === "earth") {
    const land = smoothstep(-0.1, 0.44, phaseNoise(Math.sin(lon) * 4, dy * 5, seed + 5));
    const clouds = smoothstep(0.36, 0.78, phaseNoise(dx * 8 + dy * 1.5, dy * 8 - nz * 2, seed + 13));
    texture.rMul += land * 0.07 + clouds * 0.42;
    texture.gMul += land * 0.25 + clouds * 0.42;
    texture.bMul += clouds * 0.34;
    albedo += clouds * 0.22;
    texture.glint = 0.075;
  } else if (body.id === "mars") {
    const polar = smoothstep(0.66, 0.92, Math.abs(dy));
    texture.rMul += 0.1 + broad * 0.08;
    texture.gMul -= 0.03;
    texture.bMul -= 0.08;
    texture.addR += polar * 55;
    texture.addG += polar * 50;
    texture.addB += polar * 42;
    albedo += polar * 0.25;
  } else if (body.id === "venus") {
    const cloudBand = Math.sin(dy * 18 + Math.sin(lon * 3) * 1.5 + seed * 0.01);
    albedo += 0.16 + cloudBand * 0.045;
    texture.addR += 20;
    texture.addG += 14;
    texture.addB += 4;
    texture.relief *= 0.45;
  } else if (["jupiter", "saturn", "uranus", "neptune"].includes(body.id)) {
    const bandFrequency = body.id === "jupiter" ? 34 : body.id === "saturn" ? 28 : 18;
    const band = Math.sin(dy * bandFrequency + Math.sin(lon * 2.5) * 0.85);
    const fineBand = Math.sin(dy * bandFrequency * 1.9 + lon * 1.2);
    albedo += band * (body.id === "jupiter" ? 0.13 : 0.075) + fineBand * 0.035;
    texture.rMul += Math.max(0, band) * (body.id === "jupiter" || body.id === "saturn" ? 0.08 : -0.01);
    texture.gMul += Math.max(0, -band) * 0.045;
    texture.bMul += body.id === "uranus" || body.id === "neptune" ? Math.max(0, band) * 0.1 : -Math.max(0, band) * 0.035;
    texture.relief *= 0.55;
    if (body.id === "jupiter") {
      const spot = Math.exp(-(((dx - 0.34) ** 2) / 0.035 + ((dy - 0.18) ** 2) / 0.008));
      texture.rMul += spot * 0.32;
      texture.gMul -= spot * 0.12;
      texture.bMul -= spot * 0.2;
      albedo += spot * 0.08;
    }
  } else {
    const crater = phaseCraterField(dx, dy, seed);
    albedo += crater.albedo;
    texture.relief += crater.relief;
    if (body.category === "comet") {
      texture.bMul += 0.08;
      texture.gMul += 0.05;
      albedo -= 0.04;
    }
  }

  const adjusted = clamp(albedo, 0.62, 1.38);
  texture.rMul *= adjusted;
  texture.gMul *= adjusted;
  texture.bMul *= adjusted;
  return texture;
}

function phaseCraterField(dx, dy, seed) {
  let albedo = 0;
  let relief = 0;
  for (let i = 0; i < 9; i += 1) {
    const cx = phaseHash(seed + i * 11) * 1.62 - 0.81;
    const cy = phaseHash(seed + i * 17) * 1.62 - 0.81;
    const radius = 0.035 + phaseHash(seed + i * 23) * 0.075;
    const distance = Math.hypot(dx - cx, dy - cy);
    const floor = 1 - smoothstep(radius * 0.15, radius, distance);
    const rim = 1 - Math.abs(distance - radius) / (radius * 0.34);
    albedo -= floor * 0.07;
    albedo += Math.max(0, rim) * 0.045;
    relief += Math.max(0, rim) * 0.7 + floor * 0.25;
  }
  return { albedo, relief };
}

function drawPhaseRings(ctx, x, y, diskSize, target, front) {
  const base = parseHexColor(target.color);
  const outerX = diskSize * 0.78;
  const outerY = diskSize * 0.2;
  const ringColors = [
    `rgba(${base.r}, ${base.g}, ${base.b}, ${front ? 0.52 : 0.34})`,
    `rgba(244, 239, 230, ${front ? 0.28 : 0.16})`,
    `rgba(6, 7, 6, ${front ? 0.45 : 0.28})`
  ];

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.18);
  ctx.lineCap = "round";
  ctx.globalCompositeOperation = "source-over";

  const arcs = front
    ? [{ start: 0, end: Math.PI }]
    : [{ start: Math.PI, end: Math.PI * 2 }];
  for (const arc of arcs) {
    ctx.strokeStyle = ringColors[0];
    ctx.lineWidth = Math.max(7, diskSize * 0.055);
    ctx.beginPath();
    ctx.ellipse(0, 0, outerX, outerY, 0, arc.start, arc.end);
    ctx.stroke();

    ctx.strokeStyle = ringColors[1];
    ctx.lineWidth = Math.max(2, diskSize * 0.018);
    ctx.beginPath();
    ctx.ellipse(0, 0, outerX * 0.86, outerY * 0.82, 0, arc.start, arc.end);
    ctx.stroke();

    ctx.strokeStyle = ringColors[2];
    ctx.lineWidth = Math.max(1, diskSize * 0.012);
    ctx.beginPath();
    ctx.ellipse(0, 0, outerX * 0.63, outerY * 0.62, 0, arc.start, arc.end);
    ctx.stroke();
  }
  ctx.restore();
}

function drawSolarGrid(ctx, center, radius, maxR) {
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.fillStyle = "rgba(244, 239, 230, 0.5)";
  ctx.lineWidth = 1;
  ctx.font = "11px Inter, sans-serif";
  ctx.textAlign = "center";

  const rings = chooseGridRings(maxR);
  for (const ring of rings) {
    if (ring > maxR * 1.0001) continue;
    const screenR = ring / maxR * radius;
    ctx.beginPath();
    ctx.arc(center.x, center.y, screenR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillText(`${ring} AU`, center.x + screenR, center.y - 5);
  }

  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  line(ctx, center.x - radius, center.y, center.x + radius, center.y);
  line(ctx, center.x, center.y - radius, center.x, center.y + radius);
  ctx.restore();
}

function drawSolarOrbitDirection(ctx, center, radius) {
  const guideRadius = radius * 0.9;
  const startAngle = degToRad(18);
  const endAngle = degToRad(-22);
  const tip = {
    x: center.x + Math.cos(endAngle) * guideRadius,
    y: center.y + Math.sin(endAngle) * guideRadius
  };
  const tangentAngle = endAngle - Math.PI / 2;

  ctx.save();
  ctx.strokeStyle = "rgba(79, 209, 197, 0.62)";
  ctx.fillStyle = "rgba(79, 209, 197, 0.82)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(center.x, center.y, guideRadius, startAngle, endAngle, true);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(tip.x, tip.y);
  ctx.lineTo(tip.x - Math.cos(tangentAngle - 0.58) * 8, tip.y - Math.sin(tangentAngle - 0.58) * 8);
  ctx.lineTo(tip.x - Math.cos(tangentAngle + 0.58) * 8, tip.y - Math.sin(tangentAngle + 0.58) * 8);
  ctx.closePath();
  ctx.fill();
  ctx.font = "700 11px Inter, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("공전 방향", tip.x - 12, tip.y - 9);
  ctx.restore();
}

function drawOrbit(ctx, body, center, radius, maxR) {
  if (body.transfer) {
    drawTransferPath(ctx, body, center, radius, maxR);
    return;
  }
  const steps = 360;
  const samples = [];
  for (let i = 0; i <= steps; i += 1) {
    const meanLongitude = i / steps * 360;
    const pos = orbitalPositionFromMeanLongitude(body, meanLongitude);
    samples.push(toSolarScreen(pos, center, radius, maxR));
  }

  ctx.save();
  ctx.strokeStyle = withAlpha(body.color, body.featured ? 0.38 : 0.2);
  ctx.lineWidth = body.featured ? 1.1 : 0.8;
  ctx.beginPath();
  samples.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();
  ctx.restore();
}

function drawTransferPath(ctx, body, center, radius, maxR) {
  const samples = 260;
  const duration = trackLimitDays(body);
  const progress = transferProgress(body, state.jd);
  const cycleStart = state.jd - progress * duration;
  ctx.save();
  ctx.strokeStyle = withAlpha(body.color, 0.42);
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  for (let i = 0; i <= samples; i += 1) {
    const sampleJd = cycleStart + duration * i / samples;
    const point = toSolarScreen(orbitalPosition(body, sampleJd, state.epochJd), center, radius, maxR);
    if (i === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  }
  ctx.stroke();
  ctx.restore();
}

function drawBodyTrail(ctx, body, jd, center, radius, maxR, color) {
  const samples = 150;
  const span = body.transfer ? currentTrackWindowDays(body, jd) : Math.max(20, state.trailDays);
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= samples; i += 1) {
    const sampleJd = jd - span + span * i / samples;
    const pos = orbitalPosition(body, sampleJd, state.epochJd);
    const point = toSolarScreen(pos, center, radius, maxR);
    if (i === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  }
  ctx.stroke();
  ctx.restore();
}

function paintNightSky(ctx, width, height, projection, observer, jd) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#020611");
  gradient.addColorStop(0.56, "#081224");
  gradient.addColorStop(1, "#111522");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const horizonGlow = ctx.createRadialGradient(
    width * 0.5,
    height * 0.96,
    0,
    width * 0.5,
    height * 0.96,
    width * 0.72
  );
  horizonGlow.addColorStop(0, "rgba(56, 78, 112, 0.2)");
  horizonGlow.addColorStop(0.45, "rgba(24, 43, 72, 0.09)");
  horizonGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = horizonGlow;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.beginPath();
  ctx.rect(projection.padX, projection.top, projection.chartW, projection.chartH);
  ctx.clip();
  drawMilkyWay(ctx, projection, observer, jd);
  drawSkyStars(ctx, projection, observer, jd);
  drawConstellations(ctx, projection, observer, jd);
  ctx.restore();

  const vignette = ctx.createRadialGradient(
    width / 2,
    height * 0.46,
    Math.min(width, height) * 0.16,
    width / 2,
    height * 0.5,
    Math.max(width, height) * 0.72
  );
  vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
  vignette.addColorStop(1, "rgba(0, 0, 0, 0.48)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
}

function drawMilkyWay(ctx, projection, observer, jd) {
  const points = milkyWayGuide.map((point) => {
    const coordinate = skyCoordinatesFromEquatorial(point.ra, point.dec, jd, state.skyCoordinateMode);
    return {
      x: skyLongitudeToX(displaySkyLongitude(coordinate.longitude, jd, observer), projection),
      y: skyLatitudeToY(coordinate.latitude, projection)
    };
  });

  for (const style of [
    { color: "rgba(119, 148, 190, 0.055)", width: 54 },
    { color: "rgba(173, 190, 220, 0.07)", width: 22 }
  ]) {
    ctx.save();
    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    let previous = null;
    for (const point of points) {
      if (!previous || Math.abs(point.x - previous.x) > projection.chartW * 0.45) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
      previous = point;
    }
    ctx.stroke();
    ctx.restore();
  }
}

function drawSkyStars(ctx, projection, observer, jd) {
  for (const star of state.starfieldSky) {
    const coordinate = skyCoordinatesFromEquatorial(star.ra, star.dec, jd, state.skyCoordinateMode);
    const x = skyLongitudeToX(displaySkyLongitude(coordinate.longitude, jd, observer), projection);
    const y = skyLatitudeToY(coordinate.latitude, projection);
    if (!isSkyPointVisible(x, y, projection)) continue;
    ctx.globalAlpha = star.alpha;
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(x, y, star.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  for (const star of namedStars) {
    const point = projectCatalogStar(star, projection, observer, jd);
    if (!point || !isSkyPointVisible(point.x, point.y, projection)) continue;
    const radius = clamp(3.4 - star.mag * 0.62, 1.25, 4.2);
    const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius * 3.4);
    glow.addColorStop(0, withAlpha(star.color, 0.92));
    glow.addColorStop(0.2, withAlpha(star.color, 0.58));
    glow.addColorStop(1, withAlpha(star.color, 0));
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius * 3.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawConstellations(ctx, projection, observer, jd) {
  ctx.save();
  ctx.strokeStyle = "rgba(108, 184, 222, 0.33)";
  ctx.fillStyle = "rgba(166, 208, 230, 0.62)";
  ctx.lineWidth = 1;
  ctx.font = "600 11px Inter, sans-serif";
  ctx.textAlign = "center";

  for (const figure of constellationFigures) {
    const points = new Map();
    for (const starId of figure.stars) {
      const star = namedStarMap.get(starId);
      if (!star) continue;
      points.set(starId, projectCatalogStar(star, projection, observer, jd));
    }

    for (const [fromId, toId] of figure.lines) {
      const from = points.get(fromId);
      const to = points.get(toId);
      if (!from || !to) continue;
      if (!isSkyPointVisible(from.x, from.y, projection) && !isSkyPointVisible(to.x, to.y, projection)) continue;
      if (Math.abs(from.x - to.x) > projection.chartW * 0.45) continue;
      line(ctx, from.x, from.y, to.x, to.y);
    }

    const visiblePoints = [...points.values()].filter((point) => point && isSkyPointVisible(point.x, point.y, projection));
    if (!visiblePoints.length) continue;
    const labelX = visiblePoints.reduce((sum, point) => sum + point.x, 0) / visiblePoints.length;
    const labelY = visiblePoints.reduce((sum, point) => sum + point.y, 0) / visiblePoints.length;
    ctx.fillText(figure.name, labelX, labelY - 12);
  }
  ctx.restore();
}

function projectCatalogStar(star, projection, observer, jd) {
  const coordinate = skyCoordinatesFromEquatorial(star.ra, star.dec, jd, state.skyCoordinateMode);
  return {
    x: skyLongitudeToX(displaySkyLongitude(coordinate.longitude, jd, observer), projection),
    y: skyLatitudeToY(coordinate.latitude, projection)
  };
}

function drawNightHorizon(ctx, width, height, bottom) {
  const baseY = height - Math.max(12, bottom * 0.42);
  ctx.save();
  ctx.fillStyle = "rgba(2, 5, 10, 0.94)";
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(0, baseY + 3);
  ctx.lineTo(width * 0.08, baseY - 5);
  ctx.lineTo(width * 0.18, baseY + 1);
  ctx.lineTo(width * 0.29, baseY - 9);
  ctx.lineTo(width * 0.43, baseY + 2);
  ctx.lineTo(width * 0.58, baseY - 6);
  ctx.lineTo(width * 0.72, baseY + 1);
  ctx.lineTo(width * 0.86, baseY - 8);
  ctx.lineTo(width, baseY + 2);
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawApparentTrack(ctx, target, points, projection) {
  let previous = null;

  ctx.save();
  ctx.strokeStyle = withAlpha(target.color, 0.68);
  ctx.lineWidth = 2;
  ctx.beginPath();

  for (const sample of points) {
    const point = {
      x: skyLongitudeToX(sample.lon, projection),
      y: skyLatitudeToY(sample.lat, projection)
    };
    const visible = isSkyPointVisible(point.x, point.y, projection);

    if (!visible) {
      previous = null;
    } else if (!previous || Math.abs(point.x - previous.x) > projection.chartW * 0.45) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
      previous = point;
    }
    if (visible && (!previous || previous.x !== point.x || previous.y !== point.y)) {
      previous = point;
    }
  }
  ctx.stroke();
  ctx.restore();

  drawTrackDirectionArrow(ctx, points, projection, target.color);
}

function drawTrackDirectionArrow(ctx, points, projection, color) {
  if (points.length < 2) return;
  const endSample = points.at(-1);
  const end = {
    x: skyLongitudeToX(endSample.lon, projection),
    y: skyLatitudeToY(endSample.lat, projection)
  };
  if (!isSkyPointVisible(end.x, end.y, projection)) return;
  let start = null;

  for (let i = points.length - 2; i >= 0; i -= 1) {
    const sample = points[i];
    const candidate = {
      x: skyLongitudeToX(sample.lon, projection),
      y: skyLatitudeToY(sample.lat, projection)
    };
    if (
      isSkyPointVisible(candidate.x, candidate.y, projection)
      && Math.abs(end.x - candidate.x) < projection.chartW * 0.45
      && Math.hypot(end.x - candidate.x, end.y - candidate.y) > 12
    ) {
      start = candidate;
      break;
    }
  }
  if (!start) return;

  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  const tip = {
    x: end.x - Math.cos(angle) * 16,
    y: end.y - Math.sin(angle) * 16
  };
  const size = 7;

  ctx.save();
  ctx.fillStyle = withAlpha(color, 0.9);
  ctx.strokeStyle = "rgba(6, 7, 6, 0.55)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(tip.x, tip.y);
  ctx.lineTo(tip.x - Math.cos(angle - 0.62) * size, tip.y - Math.sin(angle - 0.62) * size);
  ctx.lineTo(tip.x - Math.cos(angle + 0.62) * size, tip.y - Math.sin(angle + 0.62) * size);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function buildApparentTrack(observer, target, jd) {
  const points = [];
  let spanDays;

  if (usesRotationMode()) {
    spanDays = 1;
    const samples = 220;
    for (let i = 0; i <= samples; i += 1) {
      const sampleJd = jd - spanDays + spanDays * i / samples;
      points.push(apparentSkyPoint(observer, target, sampleJd));
    }
  } else {
    spanDays = Math.max(1, Math.min(state.trailDays, currentTrackWindowDays(target, jd)));
    const stepDays = Math.max(1, Math.ceil(spanDays / 500));
    const firstJd = jd - Math.floor(spanDays / stepDays) * stepDays;
    for (let sampleJd = firstJd; sampleJd <= jd + 1e-8; sampleJd += stepDays) {
      points.push(apparentSkyPoint(observer, target, sampleJd));
    }
    if (!points.length || Math.abs(points.at(-1).jd - jd) > 1e-8) {
      points.push(apparentSkyPoint(observer, target, jd));
    }
  }

  return { points, spanDays };
}

function apparentSkyPoint(observer, target, jd) {
  const obsPos = orbitalPosition(observer, jd, state.epochJd);
  const tarPos = apparentTargetState(observer, target, jd, obsPos).position;
  const rel = subVec(tarPos, obsPos);
  const coordinate = skyCoordinatesFromVector(rel, jd, state.skyCoordinateMode);
  return {
    jd,
    lon: displaySkyLongitude(coordinate.longitude, jd, observer),
    lat: coordinate.latitude
  };
}

function makeFixedSkyProjection(padX, top, chartW, chartH) {
  const lonSpan = clamp(state.skyView.lonSpan, SKY_MIN_LON_SPAN, SKY_MAX_LON_SPAN);
  const latSpan = skyLatitudeSpanFor(lonSpan, chartW, chartH);
  const centerLongitude = mod360(state.skyView.centerLongitude);
  const centerLatitude = clampSkyCenterLatitude(state.skyView.centerLatitude, latSpan);

  state.skyView.lonSpan = lonSpan;
  state.skyView.centerLongitude = centerLongitude;
  state.skyView.centerLatitude = centerLatitude;

  return {
    padX,
    top,
    chartW,
    chartH,
    centerLongitude,
    centerLatitude,
    lonSpan,
    latSpan,
    lonMin: centerLongitude - lonSpan / 2,
    lonMax: centerLongitude + lonSpan / 2,
    latMin: centerLatitude - latSpan / 2,
    latMax: centerLatitude + latSpan / 2
  };
}

function skyProjectionFromCanvasRect() {
  const rect = els.skyCanvas.getBoundingClientRect();
  const chartW = Math.max(1, rect.width - SKY_VIEW_PAD_X * 2);
  const chartH = Math.max(1, rect.height - SKY_VIEW_TOP - SKY_VIEW_BOTTOM);
  return makeFixedSkyProjection(SKY_VIEW_PAD_X, SKY_VIEW_TOP, chartW, chartH);
}

function skyLatitudeSpanFor(lonSpan, chartW, chartH) {
  return Math.min(180, Math.max(SKY_MIN_LAT_SPAN, lonSpan * chartH / Math.max(1, chartW)));
}

function clampSkyCenterLatitude(latitude, latSpan) {
  const limit = Math.max(0, 90 - latSpan / 2);
  return clamp(latitude, -limit, limit);
}

function skyPointerPoint(event) {
  const rect = els.skyCanvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function skyXToLongitude(x, projection) {
  const ratio = clamp((x - projection.padX) / projection.chartW, 0, 1);
  const offset = projection.lonSpan / 2 - ratio * projection.lonSpan;
  return mod360(projection.centerLongitude + offset);
}

function skyYToLatitude(y, projection) {
  const ratio = clamp((y - projection.top) / projection.chartH, 0, 1);
  return projection.latMax - ratio * projection.latSpan;
}

function makeSkyProjection(track, snapshot, padX, top, chartW, chartH) {
  const lastLongitude = track.points.at(-1)?.lon ?? snapshot.apparentLongitude;
  const currentLongitude = unwrapLongitude(snapshot.apparentLongitude, lastLongitude);
  const longitudes = [...track.points.map((point) => point.lon), currentLongitude];
  const latitudes = [...track.points.map((point) => point.lat), snapshot.apparentLatitude];
  let lonMin = Math.min(...longitudes);
  let lonMax = Math.max(...longitudes);
  let latMin = Math.min(...latitudes);
  let latMax = Math.max(...latitudes);

  const lonRange = Math.max(0.01, lonMax - lonMin);
  const lonPadding = Math.max(4, Math.min(45, lonRange * 0.16));
  lonMin -= lonPadding;
  lonMax += lonPadding;
  if (lonMax - lonMin < 18) {
    const center = (lonMin + lonMax) / 2;
    lonMin = center - 9;
    lonMax = center + 9;
  }

  const latRange = Math.max(0.01, latMax - latMin);
  const latPadding = Math.max(1.5, Math.min(18, latRange * 0.35));
  latMin = Math.max(-90, latMin - latPadding);
  latMax = Math.min(90, latMax + latPadding);
  if (latMax - latMin < 8) {
    const center = (latMin + latMax) / 2;
    latMin = Math.max(-90, center - 4);
    latMax = Math.min(90, center + 4);
  }

  return {
    padX,
    top,
    chartW,
    chartH,
    lonMin,
    lonMax,
    lonSpan: lonMax - lonMin,
    latMin,
    latMax,
    currentLongitude
  };
}

function drawSkyDirectionHint(ctx, padX, y, chartW) {
  const leftX = padX + 18;
  const rightX = padX + chartW - 18;
  const centerX = padX + chartW / 2;

  ctx.save();
  ctx.font = "700 11px Inter, sans-serif";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = "rgba(244, 239, 230, 0.18)";
  ctx.fillStyle = "rgba(244, 239, 230, 0.58)";
  ctx.lineWidth = 1;

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(244, 239, 230, 0.45)";
  ctx.fillText("남쪽 기준", centerX, y - 12);

  ctx.beginPath();
  ctx.moveTo(centerX - 22, y);
  ctx.lineTo(centerX + 22, y);
  ctx.stroke();

  ctx.fillStyle = "rgba(244, 239, 230, 0.58)";
  ctx.textAlign = "left";
  ctx.fillText("← 동쪽", leftX, y);
  ctx.textAlign = "right";
  ctx.fillText("서쪽 →", rightX, y);
  ctx.restore();
}

function drawElongationArc(ctx, observerPoint, sunPoint, targetPoint, elongation) {
  const radius = 28;
  const a1 = Math.atan2(sunPoint.y - observerPoint.y, sunPoint.x - observerPoint.x);
  const a2 = Math.atan2(targetPoint.y - observerPoint.y, targetPoint.x - observerPoint.x);
  let delta = normalizeRadians(a2 - a1);
  if (Math.abs(delta) > Math.PI) {
    delta -= Math.sign(delta) * Math.PI * 2;
  }

  ctx.save();
  ctx.strokeStyle = "rgba(242, 184, 75, 0.75)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(observerPoint.x, observerPoint.y, radius, a1, a1 + delta, delta < 0);
  ctx.stroke();
  ctx.fillStyle = "rgba(242, 184, 75, 0.9)";
  ctx.font = "11px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${formatNumber(elongation, 0)}°`, observerPoint.x, observerPoint.y - radius - 8);
  ctx.restore();
}

function drawSolarOverlays(ctx, observer, target, snapshot, center, radius, maxR) {
  const overlays = state.solarOverlays;
  const observerPos = snapshot.observerPos;
  const targetPos = snapshot.targetGeometricPos;
  const sunPos = { x: 0, y: 0, z: 0 };
  const observerScreen = toSolarScreen(observerPos, center, radius, maxR);
  const sunScreen = toSolarScreen(sunPos, center, radius, maxR);
  const targetScreen = toSolarScreen(targetPos, center, radius, maxR);
  const sunScreenDir = normalizeScreenDirection({
    x: sunScreen.x - observerScreen.x,
    y: sunScreen.y - observerScreen.y
  });
  if (!sunScreenDir) return;

  const sunScreenDistance = Math.hypot(sunScreen.x - observerScreen.x, sunScreen.y - observerScreen.y);
  const colorElongation = "#f2b84b";
  const colorConjunction = "#ef6f6c";
  const colorOpposition = "#4fd1c5";

  if (overlays.elongation) {
    drawSolarScreenLine(ctx, observerScreen, sunScreen, colorElongation, 0.58, [4, 5]);
    drawSolarScreenLine(ctx, observerScreen, targetScreen, target.color, 0.62, [4, 5]);
    drawElongationArc(ctx, observerScreen, sunScreen, targetScreen, snapshot.elongation);
    drawSolarLabel(ctx, observerScreen.x, observerScreen.y - 48, `이각 ${formatNumber(snapshot.elongation, 1)}°`, colorElongation);
  }

  if (overlays.inferiorConjunction && snapshot.relation === "inner") {
    drawSolarScreenLine(ctx, observerScreen, sunScreen, colorConjunction, 0.48, [7, 6]);
    const labelDistance = clamp(sunScreenDistance * 0.46, 28, Math.max(28, sunScreenDistance - 16));
    drawSolarLabel(
      ctx,
      observerScreen.x + sunScreenDir.x * labelDistance - 8,
      observerScreen.y + sunScreenDir.y * labelDistance - 10,
      "내합",
      colorConjunction
    );
  }

  if (overlays.superiorConjunction) {
    const superiorRay = drawSolarScreenRay(ctx, observerScreen, sunScreenDir, colorConjunction, 0.32, [2, 7]);
    const labelDistance = Math.max(46, sunScreenDistance + 42);
    drawSolarRayMarker(
      ctx,
      superiorRay,
      labelDistance,
      snapshot.relation === "inner" ? "외합" : "합",
      colorConjunction,
      10,
      12
    );
  }

  if (overlays.opposition && snapshot.relation === "outer") {
    const antiSunDir = { x: -sunScreenDir.x, y: -sunScreenDir.y };
    const oppositionRay = drawSolarScreenRay(ctx, observerScreen, antiSunDir, colorOpposition, 0.58, [6, 5]);
    drawSolarRayMarker(ctx, oppositionRay, 118, "충", colorOpposition, 8, -10);
  }

  if (overlays.easternQuadrature && snapshot.relation === "outer") {
    const eastDirection = rotateScreenDirection(sunScreenDir, -Math.PI / 2);
    const eastRay = drawSolarScreenRay(ctx, observerScreen, eastDirection, "#9bd36d", 0.48, [5, 5]);
    drawSolarRayMarker(ctx, eastRay, 112, "동구", "#9bd36d", 8, -10);
  }

  if (overlays.westernQuadrature && snapshot.relation === "outer") {
    const westDirection = rotateScreenDirection(sunScreenDir, Math.PI / 2);
    const westRay = drawSolarScreenRay(ctx, observerScreen, westDirection, "#7dd3fc", 0.48, [5, 5]);
    drawSolarRayMarker(ctx, westRay, 112, "서구", "#7dd3fc", 8, -10);
  }

  if ((overlays.easternMaxElongation || overlays.westernMaxElongation) && Number.isFinite(snapshot.maxElongation)) {
    const maxAngle = degToRad(snapshot.maxElongation);
    const eastDir = rotateScreenDirection(sunScreenDir, -maxAngle);
    const westDir = rotateScreenDirection(sunScreenDir, maxAngle);
    if (overlays.easternMaxElongation) {
      const eastGuide = drawMaxElongationGuide(
        ctx,
        observerScreen,
        snapshot.maxElongationGeometry?.east,
        center,
        radius,
        maxR,
        "#9bd36d",
        `동방 최대 ${formatNumber(snapshot.maxElongationGeometry?.east?.angle ?? snapshot.maxElongation, 1)}°`,
        10,
        -12
      );
      if (!eastGuide) {
        const eastRay = drawSolarScreenRay(ctx, observerScreen, eastDir, "#9bd36d", 0.56, [10, 5]);
        drawSolarRayMarker(ctx, eastRay, 128, `동방 최대 ${formatNumber(snapshot.maxElongation, 1)}°`, "#9bd36d", 10, -12);
      }
    }
    if (overlays.westernMaxElongation) {
      const westGuide = drawMaxElongationGuide(
        ctx,
        observerScreen,
        snapshot.maxElongationGeometry?.west,
        center,
        radius,
        maxR,
        "#7dd3fc",
        `서방 최대 ${formatNumber(snapshot.maxElongationGeometry?.west?.angle ?? snapshot.maxElongation, 1)}°`,
        10,
        12
      );
      if (!westGuide) {
        const westRay = drawSolarScreenRay(ctx, observerScreen, westDir, "#7dd3fc", 0.56, [10, 5]);
        drawSolarRayMarker(ctx, westRay, 128, `서방 최대 ${formatNumber(snapshot.maxElongation, 1)}°`, "#7dd3fc", 10, 12);
      }
    }
  }
}

function drawMaxElongationGuide(ctx, observerScreen, geometry, center, radius, maxR, color, label, offsetX, offsetY) {
  if (!geometry?.position) return false;
  const tangentScreen = toSolarScreen(geometry.position, center, radius, maxR);
  const available = Math.hypot(tangentScreen.x - observerScreen.x, tangentScreen.y - observerScreen.y);
  if (available < 12) return false;

  drawSolarScreenLine(ctx, observerScreen, tangentScreen, color, 0.66, [10, 5]);

  ctx.save();
  ctx.strokeStyle = withAlpha(color, 0.85);
  ctx.fillStyle = "rgba(6, 7, 6, 0.75)";
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.arc(tangentScreen.x, tangentScreen.y, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  const labelRatio = available < 92 ? 0.72 : 0.58;
  drawSolarLabel(
    ctx,
    observerScreen.x + (tangentScreen.x - observerScreen.x) * labelRatio + offsetX,
    observerScreen.y + (tangentScreen.y - observerScreen.y) * labelRatio + offsetY,
    label,
    color
  );
  return true;
}

function drawSolarScreenRay(ctx, originScreen, screenDirection, color, alpha, dash = []) {
  const screenDir = normalizeScreenDirection(screenDirection);
  if (!screenDir) return null;
  const end = rayCanvasIntersection(ctx, originScreen, screenDir);
  ctx.save();
  ctx.strokeStyle = withAlpha(color, alpha);
  ctx.lineWidth = 1.4;
  ctx.setLineDash(dash);
  line(ctx, originScreen.x, originScreen.y, end.x, end.y);
  ctx.restore();
  return { origin: originScreen, end, direction: screenDir };
}

function drawSolarScreenLine(ctx, from, to, color, alpha, dash = []) {
  ctx.save();
  ctx.strokeStyle = withAlpha(color, alpha);
  ctx.lineWidth = 1.4;
  ctx.setLineDash(dash);
  line(ctx, from.x, from.y, to.x, to.y);
  ctx.restore();
}

function drawSolarRayMarker(ctx, ray, distance, label, color, offsetX = 0, offsetY = 0) {
  if (!ray) return;
  const available = Math.hypot(ray.end.x - ray.origin.x, ray.end.y - ray.origin.y);
  const labelDistance = Math.min(distance, Math.max(34, available - 22));
  drawSolarLabel(
    ctx,
    ray.origin.x + ray.direction.x * labelDistance + offsetX,
    ray.origin.y + ray.direction.y * labelDistance + offsetY,
    label,
    color
  );
}

function rayCanvasIntersection(ctx, origin, direction) {
  const bounds = canvasCssSize(ctx);
  const candidates = [];
  if (direction.x > 0) candidates.push((bounds.width - 6 - origin.x) / direction.x);
  if (direction.x < 0) candidates.push((6 - origin.x) / direction.x);
  if (direction.y > 0) candidates.push((bounds.height - 6 - origin.y) / direction.y);
  if (direction.y < 0) candidates.push((6 - origin.y) / direction.y);
  const validCandidates = candidates.filter((value) => Number.isFinite(value) && value > 0);
  const distance = validCandidates.length ? Math.max(0, Math.min(...validCandidates)) : 0;
  return {
    x: origin.x + direction.x * distance,
    y: origin.y + direction.y * distance
  };
}

function canvasCssSize(ctx) {
  const dpr = window.devicePixelRatio || 1;
  return {
    width: ctx.canvas.width / dpr,
    height: ctx.canvas.height / dpr
  };
}

function normalizeScreenDirection(vec) {
  const length = Math.hypot(vec.x, vec.y);
  if (length < 1e-6) return null;
  return { x: vec.x / length, y: vec.y / length };
}

function rotateScreenDirection(direction, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: direction.x * cos - direction.y * sin,
    y: direction.x * sin + direction.y * cos
  };
}

function drawSolarLabel(ctx, x, y, label, color) {
  ctx.save();
  ctx.font = "700 11px Inter, sans-serif";
  const paddingX = 6;
  const paddingY = 4;
  const width = ctx.measureText(label).width + paddingX * 2;
  const height = 20;
  const bounds = canvasCssSize(ctx);
  const left = clamp(x - width / 2, 6, bounds.width - width - 6);
  const top = clamp(y - height / 2, 6, bounds.height - height - 6);
  ctx.fillStyle = "rgba(6, 7, 6, 0.72)";
  ctx.strokeStyle = withAlpha(color, 0.68);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(left, top, width, height, 5);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, left + width / 2, top + height / 2 + 0.5);
  ctx.restore();
}

function drawSkyMarker(ctx, x, top, bottom, label, color) {
  ctx.save();
  ctx.strokeStyle = withAlpha(color, 0.72);
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 5]);
  line(ctx, x, top, x, bottom);
  ctx.fillStyle = color;
  ctx.font = "12px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, x, top - 7);
  ctx.restore();
}

function drawSun(ctx, x, y) {
  const gradient = ctx.createRadialGradient(x, y, 2, x, y, 24);
  gradient.addColorStop(0, "rgba(255, 246, 184, 1)");
  gradient.addColorStop(0.32, "rgba(242, 184, 75, 0.95)");
  gradient.addColorStop(1, "rgba(242, 184, 75, 0)");
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffe5a0";
  ctx.beginPath();
  ctx.arc(x, y, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPlanet(ctx, x, y, color, radius, label) {
  ctx.save();
  ctx.shadowColor = withAlpha(color, 0.6);
  ctx.shadowBlur = 12;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(244, 239, 230, 0.86)";
  ctx.font = "12px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, x, y - radius - 8);
  ctx.restore();
}

function drawSolarObserverAnchor(ctx, point) {
  ctx.save();
  ctx.strokeStyle = "rgba(244, 239, 230, 0.92)";
  ctx.fillStyle = "rgba(6, 7, 6, 0.88)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(point.x, point.y, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(point.x - 6, point.y);
  ctx.lineTo(point.x + 6, point.y);
  ctx.moveTo(point.x, point.y - 6);
  ctx.lineTo(point.x, point.y + 6);
  ctx.stroke();
  ctx.restore();
}

function paintSpace(ctx, width, height, stars, alpha) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#070707");
  gradient.addColorStop(0.52, "#0b0908");
  gradient.addColorStop(1, "#050505");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  for (const star of stars) {
    ctx.globalAlpha = star.alpha * alpha;
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function updateMetrics(observer, target, snapshot) {
  const motionText = motionDirection(snapshot.longitudeRate);
  const relationText = relationLabel(snapshot.relation);
  const observerName = `${observer.nameKo}`;
  const targetName = `${target.nameKo}`;
  const maxElongationText = Number.isFinite(snapshot.maxElongation)
    ? `${formatNumber(snapshot.maxElongation, 1)}°`
    : "해당 없음";
  const eastMaxElongationText = Number.isFinite(snapshot.maxElongationGeometry?.east?.angle)
    ? `${formatNumber(snapshot.maxElongationGeometry.east.angle, 1)}°`
    : maxElongationText;
  const westMaxElongationText = Number.isFinite(snapshot.maxElongationGeometry?.west?.angle)
    ? `${formatNumber(snapshot.maxElongationGeometry.west.angle, 1)}°`
    : maxElongationText;
  const synodicText = Number.isFinite(snapshot.synodicPeriod)
    ? `${formatNumber(snapshot.synodicPeriod, 0)}일`
    : "무한대";
  const modelText = physicsModelLabel(target);
  const elongationSide = elongationSideLabel(snapshot.signedElongation, snapshot.elongation);

  els.motionBadge.textContent = `${observerName} → ${targetName} · ${snapshot.eventText} · ${motionText}`;
  els.summaryLine.textContent = `${jdToDateString(state.jd)} 기준, ${snapshot.eventText} · 광행시간 보정 적용`;

  const metrics = [
    metricData("이각", `${elongationSide} ${formatNumber(snapshot.elongation, 1)}°`, snapshot.eventText, "is-sun"),
    metricData("위치 관계", snapshot.eventText, "내행성: 내합·외합 / 외행성: 합·충·동구·서구"),
    metricData("겉보기 황경", `${formatNumber(snapshot.apparentLongitude, 1)}°`, `변화율 ${formatSigned(snapshot.longitudeRate, 3)}°/일`, snapshot.longitudeRate < 0 ? "is-hot" : "is-cool"),
    metricData("겉보기 황위", `${formatSigned(snapshot.apparentLatitude, 1)}°`, "관측자 기준 황도면"),
    metricData("적경", formatRightAscension(snapshot.rightAscensionHours), `적위 ${formatSigned(snapshot.declinationDeg, 2)}°, 황도 경사 ${formatNumber(snapshot.obliquityDeg, 3)}°`),
    metricData("운동 방향", motionText, `${relationText}, 회합주기 ${synodicText}`, snapshot.longitudeRate < 0 ? "is-hot" : "is-cool"),
    metricData("거리", `${formatNumber(snapshot.distanceObserverTarget, 3)} AU`, `${formatNumber(snapshot.distanceObserverTarget * AU_KM / 1000000, 1)} 백만 km`),
    metricData("광행시간", formatLightTime(snapshot.lightTimeDays), `방출 시각 ${jdToDateString(snapshot.emissionJd)}`),
    metricData("태양-대상", `${formatNumber(snapshot.distanceSunTarget, 3)} AU`, `태양-관측자 ${formatNumber(snapshot.distanceSunObserver, 3)} AU`),
    metricData("위상각", `${formatNumber(snapshot.phaseAngle, 1)}°`, `밝은 면 ${formatNumber(snapshot.illuminated * 100, 1)}%`),
    metricData("시직경", `${formatNumber(snapshot.angularDiameterArcsec, 2)}″`, "근사 각크기"),
    metricData("추정 등급", `${formatSigned(snapshot.magnitudeEstimate, 1)} mag`, "단순 거리/위상 근사"),
    metricData("진근점이각", `${formatNumber(snapshot.targetTrueAnomaly, 1)}°`, `방사 변화 ${formatSigned(snapshot.radialVelocity, 4)} AU/일`),
    metricData("동방 최대 이각", eastMaxElongationText, "태양보다 동쪽에 보이는 한계"),
    metricData("서방 최대 이각", westMaxElongationText, "태양보다 서쪽에 보이는 한계"),
    metricData("궤도 이심률", `${formatNumber(snapshot.targetElements.eccentricity, 3)}`, `현재 장반경 ${formatNumber(snapshot.targetElements.semiMajorAxisAu, 3)} AU`),
    metricData("근일점·원일점", `${formatNumber(perihelion(target, state.jd), 3)} / ${formatNumber(aphelion(target, state.jd), 3)} AU`, "현재 조정값 기준"),
    metricData("공전 주기", `${formatNumber(snapshot.targetElements.orbitalPeriodDays, 1)}일`, `경사 ${formatNumber(snapshot.targetElements.inclinationDeg, 2)}°`),
    metricData("역학 모델", modelText.value, modelText.sub),
    metricData(target.transfer ? "전이 시간" : "위상 조명률", target.transfer ? `${formatNumber(transferDurationDays(target), 1)}일` : `${formatNumber(snapshot.illuminated * 100, 1)}%`, target.transfer ? "케플러 제3법칙 기반 반주기" : `위상각 ${formatNumber(snapshot.phaseAngle, 1)}°`)
  ];

  els.metricsGrid.replaceChildren(...metrics.map(createMetricElement));
}

function physicsModelLabel(body) {
  if (body.transfer) {
    return {
      value: "케플러 전이",
      sub: "태양 중심 2체 문제, 반타원 전이"
    };
  }
  if (planetElementRates[body.id]) {
    return {
      value: "JPL 요소율",
      sub: body.customMeanMotion ? "사용자 공전 주기 + 세속 요소 변화" : "1800-2050 저정밀 행성 요소"
    };
  }
  return {
    value: "J2000 케플러",
    sub: "JSON 고정 요소와 케플러 방정식"
  };
}

function elongationSideLabel(signedElongation, elongation) {
  if (elongation < 1) return "합 방향";
  if (Math.abs(elongation - 180) < 1) return "충 방향";
  return signedElongation >= 0 ? "동방" : "서방";
}

function metricData(label, value, sub, className = "") {
  return { label, value, sub, className };
}

function createMetricElement(item) {
  const root = document.createElement("article");
  root.className = `metric ${item.className}`.trim();

  const label = document.createElement("div");
  label.className = "metric-label";
  label.textContent = item.label;

  const value = document.createElement("div");
  value.className = "metric-value";
  value.textContent = item.value;

  const sub = document.createElement("div");
  sub.className = "metric-sub";
  sub.textContent = item.sub;

  root.append(label, value, sub);
  return root;
}

function getBodyEditorFields(body) {
  if (!body?.transfer) return bodyEditorFields;
  const baseFields = bodyEditorFields.filter((field) => (
    field.path !== "elements.semiMajorAxisAu"
    && field.path !== "elements.orbitalPeriodDays"
  ));
  return [...transferEditorFields, ...baseFields];
}

function renderBodyEditor() {
  const target = getBody(state.targetId);
  if (!target) return;

  els.detailEditorTitle.textContent = `${target.nameKo} 세부 수치`;
  els.detailEditor.replaceChildren(...getBodyEditorFields(target).map((field) => {
    const wrapper = document.createElement("label");
    wrapper.className = "number-field";

    const label = document.createElement("span");
    label.textContent = field.unit ? `${field.label} (${field.unit})` : field.label;

    const controls = document.createElement("div");
    controls.className = "number-input-row";

    const range = document.createElement("input");
    range.type = "range";
    range.dataset.field = field.path;
    range.min = String(field.min);
    range.max = String(field.max);
    range.step = String(field.step);
    range.value = editorNumber(getNested(target, field.path), field.digits);

    const input = document.createElement("input");
    input.type = "number";
    input.dataset.field = field.path;
    input.min = String(field.min);
    input.max = String(field.max);
    input.step = String(field.step);
    input.value = editorNumber(getNested(target, field.path), field.digits);

    controls.append(range, input);
    wrapper.append(label, controls);
    return wrapper;
  }));
}

function updateBodyField(input) {
  const target = getBody(state.targetId);
  const field = getBodyEditorFields(target).find((item) => item.path === input.dataset.field);
  const value = Number(input.value);
  if (!field || !target || !Number.isFinite(value)) return;

  let nextValue = clamp(value, field.min, field.max);
  if (field.path.includes("Deg")) {
    nextValue = mod360(nextValue);
  }
  if (field.path === "elements.eccentricity") {
    nextValue = Math.min(0.999, Math.max(0, nextValue));
  }
  setNested(target, field.path, nextValue);
  if (field.path === "diameterKm") {
    target.radiusKm = nextValue / 2;
  }
  if (field.path === "elements.orbitalPeriodDays") {
    target.customMeanMotion = true;
  }
  for (const sameInput of els.detailEditor.querySelectorAll("input[data-field]")) {
    if (sameInput.dataset.field === field.path) {
      sameInput.value = editorNumber(nextValue, field.digits);
    }
  }

  state.activePreset = null;
  syncPresetButtons();
  render();
}

function resetSelectedBody() {
  const original = state.originalBodyMap.get(state.targetId);
  if (!original) return;
  const restored = cloneData(original);
  const index = state.bodies.findIndex((body) => body.id === state.targetId);
  if (index >= 0) {
    state.bodies[index] = restored;
  }
  state.bodyMap.set(restored.id, restored);
  renderBodyEditor();
  render();
}

function elementsAt(body, jd = state.jd) {
  if (!body?.transfer) {
    return planetElementRates[body.id] ? secularElementsAt(body, jd) : body.elements;
  }
  const transfer = transferElements(body);
  return { ...body.elements, ...transfer };
}

function secularElementsAt(body, jd = state.jd) {
  const base = body.elements;
  const rates = planetElementRates[body.id];
  const t = (jd - state.epochJd) / JULIAN_CENTURY_DAYS;
  const useCustomMeanMotion = body.customMeanMotion === true;
  const meanLongitudeAtEpochDeg = useCustomMeanMotion
    ? mod360(base.meanLongitudeAtEpochDeg + 360 * (jd - state.epochJd) / base.orbitalPeriodDays)
    : mod360(base.meanLongitudeAtEpochDeg + rates.meanLongitudeAtEpochDeg * t);

  return {
    ...base,
    semiMajorAxisAu: Math.max(0.000001, base.semiMajorAxisAu + rates.semiMajorAxisAu * t),
    eccentricity: clamp(base.eccentricity + rates.eccentricity * t, 0, 0.999999),
    inclinationDeg: base.inclinationDeg + rates.inclinationDeg * t,
    longitudeAscendingNodeDeg: mod360(base.longitudeAscendingNodeDeg + rates.longitudeAscendingNodeDeg * t),
    longitudePerihelionDeg: mod360(base.longitudePerihelionDeg + rates.longitudePerihelionDeg * t),
    meanLongitudeAtEpochDeg,
    orbitalPeriodDays: useCustomMeanMotion
      ? base.orbitalPeriodDays
      : 360 * JULIAN_CENTURY_DAYS / Math.abs(rates.meanLongitudeAtEpochDeg)
  };
}

function transferElements(body) {
  const inner = Math.min(body.transfer.startAu, body.transfer.endAu);
  const outer = Math.max(body.transfer.startAu, body.transfer.endAu);
  const semiMajorAxisAu = (inner + outer) / 2;
  const eccentricity = (outer - inner) / (outer + inner);
  return {
    semiMajorAxisAu,
    eccentricity,
    orbitalPeriodDays: 365.2564 * Math.sqrt(semiMajorAxisAu ** 3)
  };
}

function transferDurationDays(body) {
  return transferElements(body).orbitalPeriodDays / 2;
}

function transferProgress(body, jd = state.jd) {
  const duration = transferDurationDays(body);
  const raw = ((jd - state.epochJd) / duration) % 1;
  return raw < 0 ? raw + 1 : raw;
}

function trackLimitDays(body) {
  return Math.max(1, body?.transfer ? transferDurationDays(body) : elementsAt(body).orbitalPeriodDays);
}

function currentTrackWindowDays(body, jd = state.jd) {
  if (!body?.transfer) return trackLimitDays(body);
  return Math.max(1, transferProgress(body, jd) * trackLimitDays(body));
}

function orbitalPosition(body, jd, epochJd) {
  if (body.transfer) {
    return transferPosition(body, jd);
  }
  const e = elementsAt(body, jd);
  const meanLongitude = meanLongitudeAt(body, jd, e, epochJd);
  return orbitalPositionFromElements(e, meanLongitude);
}

function meanLongitudeAt(body, jd, e = elementsAt(body, jd), epochJd = state.epochJd) {
  if (planetElementRates[body.id]) {
    return e.meanLongitudeAtEpochDeg;
  }
  return mod360(e.meanLongitudeAtEpochDeg + 360 * (jd - epochJd) / e.orbitalPeriodDays);
}

function orbitalPositionFromMeanLongitude(body, meanLongitudeDeg) {
  return orbitalPositionFromElements(elementsAt(body, state.jd), meanLongitudeDeg);
}

function transferPosition(body, jd) {
  const e = elementsAt(body, jd);
  const progress = transferProgress(body, jd);
  const outward = body.transfer.endAu > body.transfer.startAu;
  const meanAnomaly = (outward ? 0 : 180) + 180 * progress;
  const meanLongitude = mod360(e.longitudePerihelionDeg + meanAnomaly);
  return orbitalPositionFromElements(e, meanLongitude);
}

function orbitalPositionFromElements(e, meanLongitudeDeg) {
  const a = e.semiMajorAxisAu;
  const ecc = e.eccentricity;
  const inclination = degToRad(e.inclinationDeg);
  const node = degToRad(e.longitudeAscendingNodeDeg);
  const periLongitude = degToRad(e.longitudePerihelionDeg);
  const argPeri = periLongitude - node;
  const meanAnomaly = degToRad(mod360(meanLongitudeDeg - e.longitudePerihelionDeg));
  const eccentricAnomaly = solveKepler(meanAnomaly, ecc);
  const trueAnom = Math.atan2(
    Math.sqrt(1 - ecc * ecc) * Math.sin(eccentricAnomaly),
    Math.cos(eccentricAnomaly) - ecc
  );
  const r = a * (1 - ecc * Math.cos(eccentricAnomaly));
  const u = argPeri + trueAnom;
  const cosNode = Math.cos(node);
  const sinNode = Math.sin(node);
  const cosU = Math.cos(u);
  const sinU = Math.sin(u);
  const cosI = Math.cos(inclination);
  const sinI = Math.sin(inclination);

  return {
    x: r * (cosNode * cosU - sinNode * sinU * cosI),
    y: r * (sinNode * cosU + cosNode * sinU * cosI),
    z: r * (sinU * sinI)
  };
}

function solveKepler(meanAnomaly, eccentricity) {
  let eccentricAnomaly = eccentricity < 0.8 ? meanAnomaly : Math.PI;
  for (let i = 0; i < 18; i += 1) {
    const delta = (eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly)
      / (1 - eccentricity * Math.cos(eccentricAnomaly));
    eccentricAnomaly -= delta;
    if (Math.abs(delta) < 1e-9) break;
  }
  return eccentricAnomaly;
}

function trueAnomaly(body, jd) {
  const e = elementsAt(body, jd);
  const progress = body.transfer ? transferProgress(body, jd) : null;
  const meanLongitude = body.transfer
    ? mod360(e.longitudePerihelionDeg + (body.transfer.endAu > body.transfer.startAu ? 0 : 180) + 180 * progress)
    : meanLongitudeAt(body, jd, e, state.epochJd);
  const meanAnomaly = degToRad(mod360(meanLongitude - e.longitudePerihelionDeg));
  const eccentricAnomaly = solveKepler(meanAnomaly, e.eccentricity);
  return mod360(radToDeg(Math.atan2(
    Math.sqrt(1 - e.eccentricity * e.eccentricity) * Math.sin(eccentricAnomaly),
    Math.cos(eccentricAnomaly) - e.eccentricity
  )));
}

function apparentTargetState(observer, target, jd, observerPos = orbitalPosition(observer, jd, state.epochJd)) {
  let targetPos = orbitalPosition(target, jd, state.epochJd);
  let distance = magnitude(subVec(targetPos, observerPos));
  let lightTimeDays = distance * LIGHT_DAYS_PER_AU;

  for (let i = 0; i < 3; i += 1) {
    targetPos = orbitalPosition(target, jd - lightTimeDays, state.epochJd);
    distance = magnitude(subVec(targetPos, observerPos));
    lightTimeDays = distance * LIGHT_DAYS_PER_AU;
  }

  return {
    position: targetPos,
    distance,
    lightTimeDays,
    emissionJd: jd - lightTimeDays
  };
}

function eclipticVectorToEquatorial(vec, jd) {
  const epsilon = degToRad(meanObliquityDeg(jd));
  const x = vec.x;
  const y = vec.y * Math.cos(epsilon) - vec.z * Math.sin(epsilon);
  const z = vec.y * Math.sin(epsilon) + vec.z * Math.cos(epsilon);

  return {
    rightAscensionHours: mod360(radToDeg(Math.atan2(y, x))) / 15,
    declinationDeg: radToDeg(Math.atan2(z, Math.hypot(x, y))),
    obliquityDeg: radToDeg(epsilon)
  };
}

function skyCoordinatesFromVector(vec, jd, mode) {
  if (mode === "equatorial") {
    const equatorial = eclipticVectorToEquatorial(vec, jd);
    return {
      longitude: equatorial.rightAscensionHours * 15,
      latitude: equatorial.declinationDeg
    };
  }
  return {
    longitude: mod360(radToDeg(Math.atan2(vec.y, vec.x))),
    latitude: radToDeg(Math.atan2(vec.z, Math.hypot(vec.x, vec.y)))
  };
}

function skyCoordinatesFromEquatorial(rightAscensionHours, declinationDeg, jd, mode) {
  if (mode === "equatorial") {
    return {
      longitude: mod360(rightAscensionHours * 15),
      latitude: declinationDeg
    };
  }

  const rightAscension = degToRad(rightAscensionHours * 15);
  const declination = degToRad(declinationDeg);
  const epsilon = degToRad(meanObliquityDeg(jd));
  const equatorial = {
    x: Math.cos(declination) * Math.cos(rightAscension),
    y: Math.cos(declination) * Math.sin(rightAscension),
    z: Math.sin(declination)
  };
  const ecliptic = {
    x: equatorial.x,
    y: equatorial.y * Math.cos(epsilon) + equatorial.z * Math.sin(epsilon),
    z: -equatorial.y * Math.sin(epsilon) + equatorial.z * Math.cos(epsilon)
  };
  return {
    longitude: mod360(radToDeg(Math.atan2(ecliptic.y, ecliptic.x))),
    latitude: radToDeg(Math.atan2(ecliptic.z, Math.hypot(ecliptic.x, ecliptic.y)))
  };
}

function snapshotSkyCoordinates(snapshot, mode, body) {
  if (body === "sun") {
    return mode === "equatorial"
      ? { longitude: snapshot.sunRightAscensionHours * 15, latitude: snapshot.sunDeclinationDeg }
      : { longitude: snapshot.sunLongitude, latitude: snapshot.sunApparentLatitude };
  }
  return mode === "equatorial"
    ? { longitude: snapshot.rightAscensionHours * 15, latitude: snapshot.declinationDeg }
    : { longitude: snapshot.apparentLongitude, latitude: snapshot.apparentLatitude };
}

function usesRotationMode() {
  return Math.abs(state.speedDaysPerSecond) <= ROTATION_MODE_SPEED_LIMIT;
}

function skyDisplayJd(jd) {
  if (usesRotationMode()) return jd;
  const utcDayStartJd = Math.floor(jd - 0.5) + 0.5;
  return utcDayStartJd + FIXED_OBSERVING_UTC_HOUR / 24;
}

function displaySkyLongitude(longitude, jd, observer) {
  if (!usesRotationMode()) return mod360(longitude);
  return mod360(longitude - observerRotationAngle(observer, jd) + 180);
}

function observerRotationAngle(observer, jd) {
  if (observer.id === "earth") {
    return mod360(
      280.46061837
      + 360.98564736629 * (jd - state.epochJd)
      + DEFAULT_OBSERVER_LONGITUDE_DEG
    );
  }
  const period = rotationPeriodsDays[observer.id];
  if (!period) return 0;
  return mod360(360 * (jd - state.epochJd) / period);
}

function skyCoordinateSummary(snapshot) {
  if (state.skyCoordinateMode === "equatorial") {
    return `적경 ${formatRightAscension(snapshot.rightAscensionHours)}, 적위 ${formatSigned(snapshot.declinationDeg, 1)}°`;
  }
  return `황경 ${formatNumber(snapshot.apparentLongitude, 1)}°, 황위 ${formatSigned(snapshot.apparentLatitude, 1)}°`;
}

function meanObliquityDeg(jd) {
  const t = (jd - state.epochJd) / JULIAN_CENTURY_DAYS;
  const seconds = 21.448 - t * (46.8150 + t * (0.00059 - t * 0.001813));
  return 23 + (26 + seconds / 60) / 60;
}

function radialRate(body, jd) {
  const before = magnitude(orbitalPosition(body, jd - 0.5, state.epochJd));
  const after = magnitude(orbitalPosition(body, jd + 0.5, state.epochJd));
  return after - before;
}

function apparentLongitudeRate(observer, target, jd) {
  const lonBefore = apparentLongitudeAt(observer, target, jd - 0.5);
  const lonAfter = apparentLongitudeAt(observer, target, jd + 0.5);
  return signedAngleDiff(lonAfter, lonBefore);
}

function apparentLongitudeAt(observer, target, jd) {
  const obs = orbitalPosition(observer, jd, state.epochJd);
  const tar = apparentTargetState(observer, target, jd, obs).position;
  const rel = subVec(tar, obs);
  return mod360(radToDeg(Math.atan2(rel.y, rel.x)));
}

function computeSynodicPeriod(observer, target, jd = state.jd) {
  const p1 = elementsAt(observer, jd).orbitalPeriodDays;
  const p2 = elementsAt(target, jd).orbitalPeriodDays;
  const diff = Math.abs(1 / p1 - 1 / p2);
  return diff < 1e-8 ? Infinity : 1 / diff;
}

function computeMaxElongation(observer, target, jd = state.jd) {
  const geometry = computeMaxElongationGeometry(observer, target, jd);
  return geometry ? geometry.value : Infinity;
}

function computeMaxElongationGeometry(observer, target, jd = state.jd, observerPos = orbitalPosition(observer, jd, state.epochJd)) {
  const observerElements = elementsAt(observer, jd);
  const targetElements = elementsAt(target, jd);
  if (targetElements.semiMajorAxisAu >= observerElements.semiMajorAxisAu) return null;

  const sunFromObserver = scaleVec(observerPos, -1);
  const sunLongitude = mod360(radToDeg(Math.atan2(sunFromObserver.y, sunFromObserver.x)));
  const stepDeg = 360 / MAX_ELONGATION_SAMPLES;
  let east = null;
  let west = null;

  for (let i = 0; i < MAX_ELONGATION_SAMPLES; i += 1) {
    const candidate = maxElongationCandidate(targetElements, observerPos, sunFromObserver, sunLongitude, i * stepDeg);
    if (!candidate) continue;
    if (candidate.signed >= 0) {
      if (!east || candidate.angle > east.angle) east = candidate;
    } else if (!west || candidate.angle > west.angle) {
      west = candidate;
    }
  }

  east = refineMaxElongationCandidate(targetElements, observerPos, sunFromObserver, sunLongitude, east, stepDeg);
  west = refineMaxElongationCandidate(targetElements, observerPos, sunFromObserver, sunLongitude, west, stepDeg);

  const value = Math.max(east?.angle ?? -Infinity, west?.angle ?? -Infinity);
  if (!Number.isFinite(value)) return null;
  return { east, west, value };
}

function refineMaxElongationCandidate(targetElements, observerPos, sunFromObserver, sunLongitude, seed, stepDeg) {
  if (!seed) return null;
  const side = seed.signed >= 0 ? 1 : -1;
  let best = seed;
  let span = stepDeg * 2;

  for (let pass = 0; pass < 5; pass += 1) {
    let localBest = best;
    for (let i = -6; i <= 6; i += 1) {
      const meanLongitude = best.meanLongitude + i * span / 6;
      const candidate = maxElongationCandidate(targetElements, observerPos, sunFromObserver, sunLongitude, meanLongitude);
      if (!candidate) continue;
      if (side > 0 && candidate.signed < -1e-5) continue;
      if (side < 0 && candidate.signed > 1e-5) continue;
      if (candidate.angle > localBest.angle) localBest = candidate;
    }
    best = localBest;
    span /= 3;
  }

  return best;
}

function maxElongationCandidate(targetElements, observerPos, sunFromObserver, sunLongitude, meanLongitudeDeg) {
  const position = orbitalPositionFromElements(targetElements, meanLongitudeDeg);
  const targetFromObserver = subVec(position, observerPos);
  if (magnitude(targetFromObserver) < 1e-9) return null;
  const targetLongitude = mod360(radToDeg(Math.atan2(targetFromObserver.y, targetFromObserver.x)));
  const signed = signedAngleDiff(targetLongitude, sunLongitude);
  return {
    meanLongitude: mod360(meanLongitudeDeg),
    position,
    signed,
    angle: angleBetween(targetFromObserver, sunFromObserver)
  };
}

function orbitalRelation(observer, target, jd = state.jd) {
  const delta = elementsAt(target, jd).semiMajorAxisAu - elementsAt(observer, jd).semiMajorAxisAu;
  if (Math.abs(delta) < 0.02) return "same";
  return delta < 0 ? "inner" : "outer";
}

function relationLabel(relation) {
  if (relation === "inner") return "관측자 기준 내행성";
  if (relation === "outer") return "관측자 기준 외행성";
  return "비슷한 궤도권";
}

function motionDirection(rate) {
  if (Math.abs(rate) < 0.025) return "유";
  return rate < 0 ? "역행" : "순행";
}

function eventLabel({ observer, target, elongation, longitudeRate, relation, maxElongation, signedElongation, distanceObserverTarget, distanceSunObserver }) {
  const labels = [];
  if (elongation < 5) {
    if (relation === "inner") {
      labels.push(distanceObserverTarget < distanceSunObserver ? "내합" : "외합");
    } else {
      labels.push("합");
    }
  }
  if (relation === "outer" && Math.abs(elongation - 180) < 7) labels.push("충");
  if (relation === "outer" && Math.abs(elongation - 90) < 4) {
    labels.push(signedElongation >= 0 ? "동구" : "서구");
  }
  if (Math.abs(longitudeRate) < 0.025) labels.push("유");
  if (Number.isFinite(maxElongation) && Math.abs(elongation - maxElongation) < 3) {
    labels.push(`${signedElongation >= 0 ? "동방" : "서방"} 최대 이각 근처`);
  }
  return labels.length ? labels.join(", ") : "일반 겉보기 운동 구간";
}

function estimateMagnitude(body, r, delta, phaseAngle) {
  const phasePenalty = Math.max(0, phaseAngle) * 0.012;
  return body.absMag + 5 * Math.log10(Math.max(0.0001, r * delta)) + phasePenalty;
}

function getSolarMaxRange(observer, target) {
  if (state.rangeMode !== "auto") return Number(state.rangeMode);
  const observerMax = aphelion(observer, state.jd);
  const targetMax = aphelion(target, state.jd);
  const base = Math.max(observerMax, targetMax);
  if (base <= 2.2) return 2.2;
  if (base <= 6.5) return 8;
  if (base <= 33) return 35;
  if (base <= 90) return 100;
  return Math.min(900, Math.ceil(base / 50) * 50);
}

function shouldDrawOrbit(body, observer, target, maxR) {
  if (body.id === observer.id || body.id === target.id) return true;
  if (body.transfer) return false;
  if (body.category === "planet" && perihelion(body, state.jd) <= maxR * 1.04) return true;
  if (body.featured && aphelion(body, state.jd) <= maxR * 1.04) return true;
  return false;
}

function chooseGridRings(maxR) {
  if (maxR <= 2) return [0.5, 1, 1.5, 2];
  if (maxR <= 2.5) return [0.5, 1, 1.5, 2];
  if (maxR <= 8) return [1, 2, 5, 8];
  if (maxR <= 35) return [5, 10, 20, 30];
  if (maxR <= 100) return [10, 30, 60, 100];
  return [50, 100, 300, 600, 900].filter((ring) => ring <= maxR);
}

function aphelion(body, jd = state.jd) {
  if (body?.transfer) {
    return Math.max(body.transfer.startAu, body.transfer.endAu);
  }
  const e = elementsAt(body, jd);
  return e.semiMajorAxisAu * (1 + e.eccentricity);
}

function perihelion(body, jd = state.jd) {
  if (body?.transfer) {
    return Math.min(body.transfer.startAu, body.transfer.endAu);
  }
  const e = elementsAt(body, jd);
  return e.semiMajorAxisAu * (1 - e.eccentricity);
}

function toSolarScreen(pos, center, radius, maxR) {
  const distance = Math.hypot(pos.x, pos.y);
  if (distance < 1e-9) return { x: center.x, y: center.y };
  const angle = Math.atan2(pos.y, pos.x);
  const screenRadius = Math.min(distance, maxR) / maxR * radius;
  return {
    x: center.x + Math.cos(angle) * screenRadius,
    y: center.y - Math.sin(angle) * screenRadius
  };
}

function longitudeToX(longitude, padX, chartW) {
  return padX + mod360(longitude) / 360 * chartW;
}

function latitudeToY(latitude, midY, chartH, betaLimit) {
  const clamped = Math.max(-betaLimit, Math.min(betaLimit, latitude));
  return midY - clamped / betaLimit * chartH * 0.42;
}

function skyLongitudeToX(longitude, projection) {
  return skyUnwrappedLongitudeToX(unwrapLongitude(longitude, projection.centerLongitude), projection);
}

function skyUnwrappedLongitudeToX(longitude, projection) {
  return projection.padX + (projection.lonMax - longitude) / projection.lonSpan * projection.chartW;
}

function skyLatitudeToY(latitude, projection) {
  const latSpan = Math.max(0.01, projection.latMax - projection.latMin);
  return projection.top + (projection.latMax - latitude) / latSpan * projection.chartH;
}

function isWithinChart(x, projection) {
  return x >= projection.padX && x <= projection.padX + projection.chartW;
}

function isSkyPointVisible(x, y, projection) {
  return isWithinChart(x, projection)
    && y >= projection.top
    && y <= projection.top + projection.chartH;
}

function skyLongitudeTicks(projection) {
  const step = niceTickStep(projection.lonSpan / 5, [1, 2, 5, 10, 15, 30, 45, 60, 90, 180, 360]);
  const ticks = [];
  const start = Math.ceil(projection.lonMin / step) * step;
  for (let value = start; value <= projection.lonMax; value += step) {
    ticks.push(value);
  }
  return ticks;
}

function skyLatitudeTicks(projection) {
  const span = projection.latMax - projection.latMin;
  const step = niceTickStep(span / 4, [1, 2, 5, 10, 15, 30, 45]);
  const ticks = [];
  const start = Math.ceil(projection.latMin / step) * step;
  for (let value = start; value <= projection.latMax; value += step) {
    ticks.push(value);
  }
  return ticks;
}

function formatSkyLongitudeTick(degrees) {
  if (state.skyCoordinateMode === "equatorial") {
    const hours = mod360(degrees) / 15;
    return `${formatNumber(hours, hours % 1 === 0 ? 0 : 1)}h`;
  }
  return `${formatNumber(mod360(degrees), 0)}°`;
}

function niceTickStep(rawStep, candidates) {
  return candidates.find((step) => step >= rawStep) ?? candidates.at(-1);
}

function unwrapLongitude(longitude, reference) {
  let value = longitude;
  while (value - reference > 180) value -= 360;
  while (value - reference < -180) value += 360;
  return value;
}

function fitCanvas(canvas) {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  const pixelWidth = Math.floor(width * dpr);
  const pixelHeight = Math.floor(height * dpr);
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

function syncPresetButtons() {
  for (const button of els.presetGrid.querySelectorAll("button")) {
    button.classList.toggle("is-active", button.dataset.preset === state.activePreset);
  }
}

function syncSolarOverlayControls() {
  for (const input of els.solarOverlayGrid.querySelectorAll("input[data-overlay]")) {
    input.checked = state.solarOverlays[input.dataset.overlay] ?? false;
  }
}

function setSkyFollowEnabled(enabled) {
  state.skyView.followTarget = enabled;
  syncSkyFollowControl();
}

function syncSkyFollowControl() {
  els.followTargetCheckbox.checked = state.skyView.followTarget;
}

function updateControlOutputs() {
  els.speedOutput.textContent = `${formatSigned(state.speedDaysPerSecond, 1)} 일/초`;
  els.trailOutput.textContent = `${formatNumber(state.trailDays, 0)}일`;
}

function syncDateInput(force = true) {
  if (!force && state.running) {
    const currentValue = els.dateInput.value;
    const nextValue = jdToDateInputValue(state.jd);
    if (currentValue === nextValue) return;
  }
  els.dateInput.value = jdToDateInputValue(state.jd);
}

function sliderToSpeed(value) {
  if (value === 0) return 0;
  const sign = Math.sign(value);
  const speed = Math.pow(1.1, Math.abs(value)) - 1;
  return sign * Number(speed.toFixed(1));
}

function getBody(id) {
  return state.bodyMap.get(id);
}

function getNested(object, path) {
  return path.split(".").reduce((current, key) => current?.[key], object);
}

function setNested(object, path, value) {
  const parts = path.split(".");
  const finalKey = parts.pop();
  const target = parts.reduce((current, key) => current[key], object);
  target[finalKey] = value;
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function clampChannel(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function smoothstep(edge0, edge1, value) {
  if (edge0 === edge1) return value < edge0 ? 0 : 1;
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function phaseSeed(id) {
  let seed = 17;
  for (let i = 0; i < id.length; i += 1) {
    seed = (seed * 31 + id.charCodeAt(i)) % 100000;
  }
  return seed;
}

function phaseHash(value) {
  const x = Math.sin(value * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function phaseNoise(x, y, seed) {
  const a = Math.sin(x * 2.17 + y * 3.31 + seed * 0.013);
  const b = Math.sin(x * 5.93 - y * 4.71 + seed * 0.031);
  const c = phaseHash(seed + x * 19.19 + y * 37.37) * 2 - 1;
  return (a * 0.5 + b * 0.32 + c * 0.18);
}

function editorNumber(value, digits) {
  if (!Number.isFinite(value)) return "";
  const text = Number(value).toFixed(digits);
  return digits > 0 ? text.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "") : text;
}

function makeStars(count, seed) {
  let value = seed;
  const stars = [];
  for (let i = 0; i < count; i += 1) {
    value = (value * 1664525 + 1013904223) % 4294967296;
    const x = value / 4294967296;
    value = (value * 1664525 + 1013904223) % 4294967296;
    const y = value / 4294967296;
    value = (value * 1664525 + 1013904223) % 4294967296;
    const r = 0.45 + value / 4294967296 * 1.35;
    value = (value * 1664525 + 1013904223) % 4294967296;
    const alpha = 0.25 + value / 4294967296 * 0.65;
    stars.push({
      x,
      y,
      r,
      alpha,
      color: value % 5 === 0 ? "#f2d6a3" : "#f4efe6"
    });
  }
  return stars;
}

function makeSkyStars(count, seed) {
  let value = seed;
  const stars = [];
  for (let i = 0; i < count; i += 1) {
    value = (value * 1664525 + 1013904223) % 4294967296;
    const ra = value / 4294967296 * 24;
    value = (value * 1664525 + 1013904223) % 4294967296;
    const dec = radToDeg(Math.asin(value / 4294967296 * 2 - 1));
    value = (value * 1664525 + 1013904223) % 4294967296;
    const brightness = value / 4294967296;
    value = (value * 1664525 + 1013904223) % 4294967296;
    const warmth = value / 4294967296;
    stars.push({
      ra,
      dec,
      r: 0.35 + brightness * brightness * 1.35,
      alpha: 0.24 + brightness * 0.68,
      color: warmth > 0.92 ? "#ffd9ad" : warmth < 0.1 ? "#dbe8ff" : "#f4f1e8"
    });
  }
  return stars;
}

function fillTextSafe(ctx, text, x, y) {
  ctx.fillText(String(text), x, y);
}

function line(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function subVec(a, b) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function addVec(a, b) {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function scaleVec(vec, scale) {
  return { x: vec.x * scale, y: vec.y * scale, z: vec.z * scale };
}

function magnitude(vec) {
  return Math.hypot(vec.x, vec.y, vec.z);
}

function magnitude2D(vec) {
  return Math.hypot(vec.x, vec.y);
}

function normalize2D(vec) {
  const length = magnitude2D(vec);
  if (length < 1e-10) return null;
  return { x: vec.x / length, y: vec.y / length, z: 0 };
}

function dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function angleBetween(a, b) {
  const denom = magnitude(a) * magnitude(b);
  if (denom < 1e-12) return 0;
  const cosValue = Math.max(-1, Math.min(1, dot(a, b) / denom));
  return radToDeg(Math.acos(cosValue));
}

function signedAngleDiff(after, before) {
  return ((after - before + 540) % 360) - 180;
}

function normalizeRadians(value) {
  return ((value + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
}

function degToRad(deg) {
  return deg * Math.PI / 180;
}

function radToDeg(rad) {
  return rad * 180 / Math.PI;
}

function mod360(value) {
  return ((value % 360) + 360) % 360;
}

function dateToJd(date) {
  return date.getTime() / DAY_MS + JD_UNIX_EPOCH;
}

function jdToDate(jd) {
  return new Date((jd - JD_UNIX_EPOCH) * DAY_MS);
}

function jdToDateInputValue(jd) {
  return jdToDate(jd).toISOString().slice(0, 10);
}

function jdToDateString(jd) {
  return jdToDate(jd).toISOString().slice(0, 10);
}

function formatNumber(value, digits = 1) {
  if (!Number.isFinite(value)) return "∞";
  return new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  }).format(value);
}

function formatSigned(value, digits = 1) {
  if (!Number.isFinite(value)) return "∞";
  const sign = value > 0 ? "+" : "";
  return `${sign}${formatNumber(value, digits)}`;
}

function formatRightAscension(hours) {
  if (!Number.isFinite(hours)) return "∞";
  const totalMinutes = Math.round(mod360(hours * 15) / 15 * 60);
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

function formatLightTime(days) {
  if (!Number.isFinite(days)) return "∞";
  const minutes = days * 24 * 60;
  if (minutes < 120) return `${formatNumber(minutes, 1)}분`;
  return `${formatNumber(minutes / 60, 2)}시간`;
}

function withAlpha(hex, alpha) {
  const { r, g, b } = parseHexColor(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function parseHexColor(hex) {
  const clean = hex.replace("#", "");
  const value = parseInt(clean, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return { r, g, b };
}
