const DATA = window.DREAM_MOCK_DATA

const initialIntroLocation = DATA.locations.find(item => item.id === 'house') || DATA.locations[0]

const state = {
  introLocation: initialIntroLocation,
  introPinnedLocation: initialIntroLocation,
  colorBasic: DATA.emotions.find(item => item.id === 'curious') || DATA.emotions[0],
  colorFull: DATA.emotions.find(item => item.id === 'curious') || DATA.emotions[0],
  graphicLocation: initialIntroLocation,
  graphicPinnedLocation: initialIntroLocation,
  selectedEmotionIds: [],
  refineIndex: 0,
  refine: {
    emotionId: 'impulse',
    intensity: null,
    valence: null,
    clarity: null,
    locationId: null,
    step: 'valence',
    confirmed: false,
  },
  refineByEmotion: {},
}

const paletteLabels = {
  red: '红色',
  yellow: '黄色',
  blue: '蓝色',
  green: '绿色',
  slight: '弱',
  medium: '中',
  strong: '强',
  positive: '积极',
  negative: '消极',
  blur: '模糊',
  clear: '清晰',
}

const dreamInterpretationLabels = {
  ...paletteLabels,
}

const screen3ColorDots = [
  [241.27, 623.96],
  [231.09, 599.19],
  [224.32, 579.12],
  [218.43, 556.5],
  [214.26, 533.03],
  [212.3, 498.93],
  [214.22, 463.99],
  [221.31, 426.52],
  [235.29, 387.82],
  [253.12, 352.54],
  [274.81, 320.7],
  [297.31, 294.82],
  [317.9, 276.27],
  [342.11, 258.06],
  [365.06, 244.53],
  [382.8, 236.06],
  [401.76, 228.92],
]

const screen4PhotoLayout = [
  { id: 'night', x: 15.15, y: 69, size: 4.55 },
  { id: 'corridor', x: 17.55, y: 78.82, size: 4.45 },
  { id: 'hover', x: 49.2, y: 87.23, size: 4.38 },
  { id: 'cloud', x: 52.2, y: 75.41, size: 4.55 },
  { id: 'sky', x: 53.68, y: 62.37, size: 4.25 },
  { id: 'borderless', x: 52.67, y: 48.59, size: 4.55 },
  { id: 'tunnel', x: 48.7, y: 36.63, size: 4.55 },
  { id: 'beach', x: 27.53, y: 30.79, size: 4.8 },
  { id: 'water', x: 21.67, y: 36.87, size: 4.85 },
  { id: 'wind', x: 17.28, y: 45.6, size: 4.3 },
  { id: 'sea', x: 15.36, y: 57.95, size: 4.1 },
  { id: 'city', x: 26.57, y: 93.16, size: 4.85 },
  { id: 'house', x: 21.17, y: 86.99, size: 4.25 },
]

const screen5ColorDots = [
  [258.38, 435.79],
  [259.75, 416.59],
  [261.81, 401.5],
  [265.24, 385.05],
  [270.04, 368.59],
  [279.64, 345.96],
  [291.98, 324.02],
  [308.44, 302.08],
  [329.69, 281.5],
  [352.32, 264.36],
  [376.32, 250.65],
  [398.95, 241.05],
  [418.02, 235.56],
  [439.3, 231.45],
  [458.28, 229.96],
  [472.32, 230.08],
  [486.72, 231.45],
  [513.7, 180.71],
  [532.3, 183.46],
  [549.53, 187.6],
  [564, 193.11],
  [587.52, 201.96],
  [610.15, 214.3],
  [632.09, 230.08],
  [652.97, 249.55],
  [669.81, 269.85],
  [686.26, 295.22],
  [698.61, 318.53],
  [705.46, 339.79],
  [711.63, 365.16],
  [716.43, 391.9],
  [716.43, 417.27],
  [714.38, 440.59],
  [708.89, 464.59],
  [702.72, 485.85],
  [696.55, 502.3],
  [688.32, 519.44],
  [675.98, 538.64],
  [671.86, 557.84],
  [661.58, 570.19],
  [648.55, 582.53],
  [624.97, 601.05],
  [599.86, 616.82],
  [572.44, 629.84],
  [548.44, 638.07],
  [524.44, 644.24],
  [501.81, 646.99],
  [479.18, 648.36],
]

const screen7ViewBox = { width: 1338.78, height: 875.83 }
const screen7EmotionLayout = {
  frightened: [404.33, 468.77, 48.66],
  acceptance: [293.3, 425.1, 14.14],
  happy: [433.44, 402.23, 19.55],
  relax: [285.81, 138.16, 16.63],
  hover: [229.26, 497.46, 19.96],
  expect: [556.12, 178.08, 12.48],
  enthusiasm: [223.02, 264.16, 14.56],
  angry: [428.34, 356.97, 22.34],
  lonely: [375.64, 341.93, 32.44],
  adjust: [323.66, 467.94, 32.02],
  depression: [365.24, 607.67, 14.56],
  release: [543.23, 550.28, 47.82],
  calm: [677.97, 388.09, 20.38],
  forge: [316.59, 548.2, 19.13],
  exhausted: [453.41, 561.09, 17.88],
  lost: [257.95, 152.71, 14.56],
  chased: [100.34, 433.42, 23.29],
  worried: [158.14, 576.89, 26.2],
  excited: [140.26, 409.3, 23.29],
  confident: [316.17, 399.74, 13.72],
  success: [493.74, 409.3, 40.75],
  delight: [510.8, 262.5, 32.02],
  sad: [595.22, 455.88, 17.47],
  disappoint: [182.68, 543.21, 14.97],
  hollow: [435.94, 321.55, 11.23],
  stable: [568.18, 225.07, 36.18],
  escape: [315.34, 184.32, 38.68],
  numb: [512.87, 340.27, 30.77],
  security: [82.46, 270.82, 48.66],
  indifference: [369.82, 527.4, 19.13],
  helpless: [207.63, 473.34, 12.48],
  nostalgia: [629.32, 400.98, 14.14],
  pressure: [270.84, 291.2, 40.75],
  unstable: [476.28, 509.11, 30.77],
  outcontrol: [150.24, 293.69, 23.29],
  meditation: [109.54, 207.07, 20.38],
  liberate: [422.22, 244.62, 28.28],
  impulse: [222.19, 384.76, 35.35],
  curious: [257.12, 195.13, 20.38],
  impulse2: [363.37, 259.59, 29.11],
  cast: [258.37, 563.17, 40.75],
  danger: [279.99, 390.17, 23.29],
  envy: [137.77, 487.48, 17.47],
  naturally: [470.46, 359.4, 14.14],
  protection: [622.66, 258.76, 27.45],
  collapse: [88.28, 487.07, 32.02],
  happiness: [658.01, 437.16, 32.02],
}

const qs = (selector, root = document) => root.querySelector(selector)
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)]

function el(tag, className, text) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}

function svgEl(tag, attrs = {}) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag)
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'xlinkHref') {
      node.setAttributeNS('http://www.w3.org/1999/xlink', 'href', value)
    } else {
      node.setAttribute(key, value)
    }
  })
  return node
}

function pointOnCircle(cx, cy, radius, angle) {
  const radians = (angle * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  }
}

function circleArcPath(cx, cy, radius, startAngle, endAngle) {
  const start = pointOnCircle(cx, cy, radius, startAngle)
  const end = pointOnCircle(cx, cy, radius, endAngle)
  const delta = Math.abs(endAngle - startAngle)
  const largeArc = delta > 180 ? 1 : 0
  const sweep = endAngle >= startAngle ? 1 : 0
  return [
    `M${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    `A${radius} ${radius} 0 ${largeArc} ${sweep} ${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
  ].join(' ')
}

function getEmotion(id) {
  return DATA.emotions.find(item => item.id === id) || DATA.emotions[0]
}

function getLocation(id) {
  return DATA.locations.find(item => item.id === id) || DATA.locations[0]
}

function emotionBase(emotion) {
  const byHue = DATA.emotionMap?.byHue || {}
  const byName = Object.entries(byHue).find(([, names]) => names.includes(emotion.zh))
  if (byName) return byName[0]

  const accents = DATA.colorPalette?.accents || {}
  const hexToRgb = hex => {
    const clean = hex.replace('#', '')
    return [0, 2, 4].map(index => parseInt(clean.slice(index, index + 2), 16))
  }
  const source = hexToRgb(emotion.color || '#999999')
  return Object.entries(accents).reduce(
    (best, [base, color]) => {
      const target = hexToRgb(color)
      const distance = target.reduce(
        (sum, channel, index) => sum + (channel - source[index]) ** 2,
        0
      )
      return distance < best.distance ? { base, distance } : best
    },
    { base: 'yellow', distance: Infinity }
  ).base
}

function refineDefaultsFor(emotion) {
  return {
    emotionId: emotion.id,
    base: emotionBase(emotion),
    intensity: null,
    valence: null,
    clarity: null,
    locationId: null,
    step: 'valence',
    confirmed: false,
  }
}

function refineForEmotion(emotion) {
  if (!state.refineByEmotion[emotion.id]) {
    state.refineByEmotion[emotion.id] = refineDefaultsFor(emotion)
  }
  return state.refineByEmotion[emotion.id]
}

function currentRefineColor(refine) {
  const intensity = refine.intensity || 'medium'
  const valence = refine.valence || 'positive'
  const clarity = refine.clarity || 'clear'
  return (
    DATA.colorPalette?.palette?.[refine.base]?.[intensity]?.[valence]?.[clarity] ||
    getEmotion(refine.emotionId).color
  )
}

function setRefineStep(step) {
  state.refine.step = step
  state.refineByEmotion[state.refine.emotionId] = state.refine
}

function advanceRefineStep() {
  if (!state.refine.valence) return setRefineStep('valence')
  if (!state.refine.intensity) return setRefineStep('intensity')
  if (!state.refine.clarity) return setRefineStep('clarity')
  if (!state.refine.locationId) return setRefineStep('location')
  state.refine.confirmed = true
  return setRefineStep('done')
}

function ringTint(refine, layer) {
  const base = refine.base || 'yellow'
  if (layer === 'valence') {
    const valence = refine.valence || 'positive'
    return (
      DATA.colorPalette?.palette?.[base]?.medium?.[valence]?.clear ||
      DATA.colorPalette?.palette?.[base]?.medium?.[valence]?.blur ||
      currentRefineColor(refine)
    )
  }
  if (layer === 'intensity') {
    const intensity = refine.intensity || 'medium'
    return (
      DATA.colorPalette?.palette?.[base]?.[intensity]?.[refine.valence || 'positive']?.clear ||
      currentRefineColor(refine)
    )
  }
  const clarity = refine.clarity || 'clear'
  return (
    DATA.colorPalette?.palette?.[base]?.[refine.intensity || 'medium']?.[
      refine.valence || 'positive'
    ]?.[clarity] || currentRefineColor(refine)
  )
}

function isRefineComplete(refine) {
  return Boolean(refine?.valence && refine?.intensity && refine?.clarity && refine?.locationId)
}

function areAllSelectedRefinesComplete() {
  const emotions = selectedEmotions()
  if (!emotions.length) return false
  return emotions.every(emotion => isRefineComplete(state.refineByEmotion[emotion.id]))
}

async function mergeImageMap() {
  try {
    const response = await fetch('./image-map.json', { cache: 'no-store' })
    if (!response.ok) return
    const imageMap = await response.json()
    imageMap.forEach(item => {
      const location = getLocation(item.id)
      if (!location) return
      location.zh = item.name || location.zh
      location.en = item.eng_name || location.en
      location.photoSrc = item.concretePic || location.photoSrc
      location.totemSrc = item.abstractPic || location.totemSrc
    })
  } catch (error) {
    // Opening the page as file:// can block JSON fetch; data.js remains the fallback.
  }
}

function normalizeAbstractAssets() {
  const assetsById = {
    city: { zh: '城市', en: 'City', concrete: '城市', abstract: '城市' },
    house: { zh: '房屋', en: 'House', concrete: '房屋', abstract: '房屋' },
    corridor: { zh: '走廊', en: 'Corridor', concrete: '走廊', abstract: '走廊' },
    night: { zh: '夜晚', en: 'Night', concrete: '夜晚', abstract: '夜晚' },
    tunnel: { zh: '隧道', en: 'Tunnel', concrete: '隧道', abstract: '隧道' },
    borderless: { zh: '无边空间', en: 'Borderless Space', concrete: '无边空间', abstract: '无边空间' },
    sky: { zh: '天空', en: 'Sky', concrete: '天空', abstract: '天空' },
    hover: { zh: '飞翔', en: 'Hover', concrete: '飞翔', abstract: '飞翔' },
    beach: { zh: '沙滩', en: 'Beach', concrete: '沙滩', abstract: '沙漠' },
    water: { zh: '水', en: 'Water', concrete: '水', abstract: '水' },
    wind: { zh: '风', en: 'Wind', concrete: '风', abstract: '风' },
    sea: { zh: '海', en: 'Sea', concrete: '海', abstract: '海' },
    cloud: { zh: '云', en: 'Cloud', concrete: '云', abstract: '云' },
  }
  DATA.locations.forEach(location => {
    const asset = assetsById[location.id]
    if (!asset) return
    location.zh = asset.zh
    location.en = asset.en
    location.photoSrc = `./assets/concrete/${asset.concrete}.svg`
    location.concretePic = location.photoSrc
    location.totemSrc = `./assets/abstract/${asset.abstract}.svg`
    location.abstractPic = location.totemSrc
  })
}

async function mergeColorPalette() {
  try {
    const response = await fetch('./color-palette.json', { cache: 'no-store' })
    if (!response.ok) return
    DATA.colorPalette = await response.json()
  } catch (error) {
    // data.js embeds the same structure and remains available for file:// previews.
  }
}

async function mergeEmotionMap() {
  try {
    const response = await fetch('./emotion-map.json', { cache: 'no-store' })
    if (!response.ok) return
    DATA.emotionMap = await response.json()
  } catch (error) {
    // data.js embeds the same structure and remains available for file:// previews.
  }
}

function flattenColorPalette() {
  const source = DATA.colorPalette?.palette || {}
  return Object.entries(source).flatMap(([base, intensities]) =>
    Object.entries(intensities).flatMap(([intensity, valences]) =>
      Object.entries(valences).flatMap(([valence, clarities]) =>
        Object.entries(clarities).map(([clarity, color]) => ({
          id: `${base}-${intensity}-${valence}-${clarity}`,
          zh: paletteLabels[base] || base,
          en: base,
          color,
          code: color,
          base,
          baseLabel: paletteLabels[base] || base,
          intensity: paletteLabels[intensity] || intensity,
          valence: paletteLabels[valence] || valence,
          clarity: paletteLabels[clarity] || clarity,
        }))
      )
    )
  )
}

function makePhoto(location, size = 'large') {
  const node = el('span', `mock-photo ${size} photo-${location.photo}`)
  node.dataset.locationId = location.id
  node.setAttribute('aria-label', `${location.zh} ${location.en}`)
  const src = location.concretePic || location.photoSrc
  if (src) {
    const image = el('img')
    image.src = src
    image.alt = `${location.zh} ${location.en}`
    node.append(image)
  }
  return node
}

function makeTotem(location) {
  const node = el('span', `totem ${location.glyph}`)
  node.dataset.locationId = location.id
  node.setAttribute('aria-label', `${location.zh} ${location.en}`)
  const src = location.abstractPic || location.totemSrc
  if (src) {
    node.classList.add('custom-totem')
    const image = el('img')
    image.src = src
    image.alt = `${location.zh} ${location.en}`
    node.append(image)
  }
  return node
}

function applyReferenceBounds(node, x, y, width, height) {
  const refWidth = 295.8
  const refHeight = 267.67
  node.style.left = `${(x / refWidth) * 100}%`
  node.style.top = `${(y / refHeight) * 100}%`
  node.style.width = `${(width / refWidth) * 100}%`
  node.style.height = `${(height / refHeight) * 100}%`
}

function addReferenceCircle(root, cx, cy, radius, className = '') {
  const circle = el('span', `ring-circle reference-circle ${className}`.trim())
  applyReferenceBounds(circle, cx - radius, cy - radius, radius * 2, radius * 2)
  root.append(circle)
}

function addReferenceNode(root, cx, cy, radius, className, content) {
  const node = el('span', className)
  applyReferenceBounds(node, cx - radius, cy - radius, radius * 2, radius * 2)
  if (content) node.append(content)
  root.append(node)
  return node
}

function renderIntroConcentricPreview(container, location) {
  container.innerHTML = ''
  const ring = el('div', 'preview-rings reference-preview')

  addReferenceCircle(ring, 145.1, 133.83, 133.33, 'outer')
  addReferenceCircle(ring, 144.26, 134.11, 106.72, 'middle')

  const photo = makePhoto(location, 'large')
  photo.classList.add('preview-photo', 'reference-photo')
  applyReferenceBounds(photo, 144.82 - 78.15, 133.55 - 78.15, 156.3, 156.3)
  ring.append(photo)

  addReferenceCircle(ring, 144.82, 133.55, 78.15, 'inner')

  addReferenceNode(
    ring,
    72.27,
    55.4,
    18.49,
    'orbit-label reference-label large',
    el('span', '', location.en)
  )
  addReferenceNode(
    ring,
    129.41,
    27.39,
    10.65,
    'orbit-label reference-label small',
    el('span', '', location.zh)
  )
  addReferenceNode(
    ring,
    70,
    111.43,
    10.65,
    'orbit-label reference-label small',
    el('span', '', location.en)
  )
  addReferenceNode(
    ring,
    210.09,
    174.17,
    18.49,
    'orbit-label reference-label large',
    el('span', '', location.zh)
  )

  addReferenceNode(
    ring,
    22.41,
    184.82,
    22.41,
    'orbit-chip reference-chip large',
    makeTotem(location)
  )
  addReferenceNode(
    ring,
    273.39,
    98.54,
    22.41,
    'orbit-chip reference-chip large',
    makeTotem(location)
  )
  addReferenceNode(
    ring,
    157.42,
    240.28,
    10.65,
    'orbit-chip reference-chip small',
    makeTotem(location)
  )

  container.append(ring)
}

function renderConcentricPreview(container, location, options = {}) {
  if (options.reference || (!options.small && container.id === 'introPhotoPreview')) {
    renderIntroConcentricPreview(container, location)
    return
  }

  container.innerHTML = ''
  const ring = el('div', 'preview-rings')
  const insets = options.small ? [6, 21, 37] : [10, 35, 59]

  insets.forEach(inset => {
    const circle = el('span', 'ring-circle')
    circle.style.setProperty('--ring-inset', `${inset}px`)
    ring.append(circle)
  })

  const photo = makePhoto(location, options.small ? 'medium' : 'large')
  photo.classList.add('preview-photo')
  ring.append(photo)

  const orbitItems = [
    { angle: -92, label: location.zh, type: 'label' },
    { angle: -170, label: location.en, type: 'label' },
    { angle: 22, location },
    { angle: 86, location },
    { angle: 150, location },
    { angle: 55, label: location.zh, type: 'label' },
  ]
  const radius = options.small ? 63 : 107
  const center = options.small ? 75 : 130

  orbitItems.forEach(item => {
    const x = center + Math.cos((item.angle * Math.PI) / 180) * radius
    const y = center + Math.sin((item.angle * Math.PI) / 180) * radius
    if (item.type === 'label') {
      const label = el('span', 'orbit-label', item.label)
      label.style.left = `${x}px`
      label.style.top = `${y}px`
      ring.append(label)
      return
    }

    const chip = el('span', options.small ? 'orbit-chip tiny' : 'orbit-chip')
    chip.style.left = `${x}px`
    chip.style.top = `${y}px`
    chip.append(makeTotem(item.location))
    ring.append(chip)
  })

  container.append(ring)
}

function renderIntroPhotos() {
  const container = qs('#introPhotoChoices')
  const preview = qs('#introPhotoPreview')
  const choices = [getLocation('house'), getLocation('sky'), getLocation('beach')]
  const dotColors = ['#ea9bb0', '#ecd453', '#80dfa5']
  container.innerHTML = ''

  choices.forEach((location, index) => {
    const button = el('button', 'photo-choice')
    button.type = 'button'
    button.style.setProperty('--choice-color', dotColors[index])
    button.dataset.locationId = location.id
    if (state.introPinnedLocation?.id === location.id) button.classList.add('is-fixed')
    button.append(makePhoto(location, 'large'))
    button.append(el('span', 'photo-dot'))
    button.addEventListener('mouseenter', () => {
      state.introLocation = location
      renderConcentricPreview(preview, location)
      preview.classList.add('is-live')
    })
    button.addEventListener('mouseleave', () => {
      state.introLocation = state.introPinnedLocation || choices[0]
      renderConcentricPreview(preview, state.introLocation)
    })
    button.addEventListener('click', () => {
      state.introPinnedLocation = location
      state.introLocation = location
      renderIntroPhotos()
      preview.classList.add('is-live')
    })
    button.addEventListener('focus', () => {
      state.introLocation = location
      renderConcentricPreview(preview, location)
      preview.classList.add('is-live')
    })
    button.addEventListener('blur', () => {
      state.introLocation = state.introPinnedLocation || choices[0]
      renderConcentricPreview(preview, state.introLocation)
    })
    container.append(button)
  })

  renderConcentricPreview(preview, state.introLocation)
}

function colorArcList(count) {
  const preferred = [
    'curious',
    'delight',
    'expect',
    'hover',
    'unstable',
    'danger',
    'outcontrol',
    'worried',
    'angry',
    'frightened',
    'chased',
    'pressure',
    'security',
    'stable',
    'hover',
    'adjust',
    'naturally',
    'happiness',
    'indifference',
    'protection',
    'calm',
    'exhausted',
    'sad',
    'cast',
    'lost',
    'depression',
  ]
  const unique = []
  preferred.forEach(id => {
    const item = getEmotion(id)
    if (item && !unique.some(entry => entry.id === item.id)) unique.push(item)
  })
  DATA.emotions.forEach(item => {
    if (!unique.some(entry => entry.id === item.id)) unique.push(item)
  })
  return unique.slice(0, count)
}

function sortFullPalette(list) {
  const baseOrder = { red: 0, yellow: 1, green: 2, blue: 3 }
  const intensityOrder = { slight: 0, medium: 1, strong: 2 }
  const valenceOrder = { positive: 0, negative: 1 }
  const clarityOrder = { blur: 0, clear: 1 }
  return [...list].sort(
    (a, b) =>
      (baseOrder[a.base] ?? 9) - (baseOrder[b.base] ?? 9) ||
      (intensityOrder[a.intensity] ?? 9) - (intensityOrder[b.intensity] ?? 9) ||
      (valenceOrder[a.valence] ?? 9) - (valenceOrder[b.valence] ?? 9) ||
      (clarityOrder[a.clarity] ?? 9) - (clarityOrder[b.clarity] ?? 9)
  )
}

function fullFanPoint(item, index, list) {
  const [x, y] = screen5ColorDots[index] || screen5ColorDots[screen5ColorDots.length - 1]
  const centerX = 456.8
  const centerY = 455.3
  const angleDeg = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI)
  return {
    x,
    y,
    centerX,
    centerY,
    angleDeg,
  }
}

function renderColorFan(svg, list, selected, view, onSelect) {
  svg.innerHTML = ''
  const isFull = view === 'full'
  const isBasic = view === 'basic'
  if (isBasic) {
    svg.setAttribute('viewBox', '0 0 1235.7 789.62')
  } else {
    svg.setAttribute('viewBox', '0 0 1217.54 681.41')
  }
  const cx = isFull ? 345 : 430
  const cy = isFull ? 330 : 405
  const radius = isFull ? 205 : 245
  const start = isFull ? 188 : 230
  const end = isFull ? 448 : 156
  const step = (end - start) / Math.max(list.length - 1, 1)

  list.forEach((item, index) => {
    const angle = (start + step * index) * (Math.PI / 180)
    const [refX, refY] = screen3ColorDots[index] || screen3ColorDots[screen3ColorDots.length - 1]
    const fullPoint = isFull ? fullFanPoint(item, index, list) : null
    const x = isBasic ? refX : fullPoint ? fullPoint.x : cx + Math.cos(angle) * radius
    const y = isBasic ? refY : fullPoint ? fullPoint.y : cy + Math.sin(angle) * radius
    const lineX1 = isBasic ? 514.1 : fullPoint ? fullPoint.centerX : cx
    const lineY1 = isBasic ? 589.1 : fullPoint ? fullPoint.centerY : cy
    const line = svgEl('line', {
      x1: lineX1,
      y1: lineY1,
      x2: x,
      y2: y,
      class: 'fan-ray',
    })
    line.style.setProperty('--ray-color', item.color)
    svg.append(line)

    const dot = svgEl('circle', {
      cx: x,
      cy: y,
      r: selected.id === item.id ? 9 : 7,
      fill: item.color,
      class: selected.id === item.id ? 'fan-dot is-active' : 'fan-dot',
      'data-emotion-id': item.id,
      tabindex: 0,
      role: 'button',
    })
    dot.addEventListener('click', () => onSelect(item))
    dot.addEventListener('mouseenter', () => onSelect(item))
    dot.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') onSelect(item)
    })
    svg.append(dot)

    const hit = svgEl('circle', {
      cx: x,
      cy: y,
      r: isBasic ? 21 : 18,
      fill: 'transparent',
      class: 'fan-hit',
      'data-emotion-id': item.id,
      tabindex: 0,
      role: 'button',
    })
    hit.addEventListener('click', () => onSelect(item))
    hit.addEventListener('mouseenter', () => onSelect(item))
    hit.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') onSelect(item)
    })
    svg.append(hit)

    const labelAngle = fullPoint ? fullPoint.angleDeg : start + step * index
    const label = svgEl('text', {
      x: x - 6,
      y: y - 13,
      class: isFull ? 'fan-label fan-label-full' : 'fan-label',
      fill: '#111',
      transform: `rotate(${labelAngle + 88} ${x - 6} ${y - 13})`,
    })
    label.textContent = isFull ? item.en : item.code
    svg.append(label)
  })
}

function renderRadialInfo(container, emotion) {
  container.innerHTML = ''
  container.classList.add('is-live')
  container.style.setProperty('--info-color', emotion.color)
  container.dataset.colorId = emotion.id

  const svg = svgEl('svg', {
    viewBox: '0 0 225.56 231.53',
    class: 'info-svg',
    role: 'img',
  })
  const defs = svgEl('defs')
  const content = svgEl('g', {
    transform: 'translate(-2.5 -2.4)',
  })
  const center = { x: 106.72, y: 121.42 }
  const upperTextPath = svgEl('path', {
    id: `upperText-${emotion.id}`,
    d: circleArcPath(center.x, center.y, 49, -48, -7),
  })
  const rightTextPath = svgEl('path', {
    id: `rightText-${emotion.id}`,
    d: circleArcPath(center.x, center.y, 70, -45, 4),
  })
  const lowerTextPath = svgEl('path', {
    id: `lowerText-${emotion.id}`,
    d: circleArcPath(center.x, center.y, 56, 18, 75),
  })
  defs.append(upperTextPath, rightTextPath, lowerTextPath)
  svg.append(defs)

  ;[49, 56, 70].forEach(radius => {
    content.append(
      svgEl('circle', {
        cx: center.x,
        cy: center.y,
        r: radius,
        class: 'info-guide-ring',
      })
    )
  })

  content.append(
    svgEl('path', {
      d: 'M138.84,33.85A100.68,100.68,0,0,0,0,126.94l18.63-.25A81.79,81.79,0,0,1,131.41,51.07Z',
      class: 'info-color-arc',
    })
  )
  content.append(
    svgEl('path', {
      d: 'M112.78.5a112.29,112.29,0,0,1,74.75,196.07',
      class: 'info-outline',
    })
  )
  content.append(
    svgEl('path', {
      d: 'M203.22,187.06a124.7,124.7,0,0,1-95.16,44',
      class: 'info-outline-short',
    })
  )
  content.append(
    svgEl('circle', {
      cx: 106.72,
      cy: 121.42,
      r: 15.38,
      class: 'info-center-svg',
    })
  )

  const code = svgEl('text', {
    x: 78,
    y: 96,
    class: 'info-svg-code',
    transform: 'rotate(-32 78 96)',
  })
  code.textContent = emotion.code || emotion.color
  const intensity = svgEl('text', { class: 'info-svg-text curved' })
  const intensityPath = svgEl('textPath', {
    href: `#upperText-${emotion.id}`,
    xlinkHref: `#upperText-${emotion.id}`,
    startOffset: '8%',
    method: 'align',
    spacing: 'auto',
  })
  intensity.append(intensityPath)
  const clarity = svgEl('text', { class: 'info-svg-text curved' })
  const clarityPath = svgEl('textPath', {
    href: `#rightText-${emotion.id}`,
    xlinkHref: `#rightText-${emotion.id}`,
    startOffset: '4%',
    method: 'align',
    spacing: 'auto',
  })
  clarity.append(clarityPath)
  const valence = svgEl('text', { class: 'info-svg-text curved' })
  const valencePath = svgEl('textPath', {
    href: `#lowerText-${emotion.id}`,
    xlinkHref: `#lowerText-${emotion.id}`,
    startOffset: '0%',
    method: 'align',
    spacing: 'auto',
  })
  valence.append(valencePath)

  intensityPath.textContent =
    '\u60c5\u7eea\u5f3a\u5ea6' +
    (emotion.intensity === '\u4e2d' ? '\u4e2d\u7b49' : emotion.intensity)
  clarityPath.textContent = '\u8bb0\u5fc6\u4e3a' + emotion.clarity
  valencePath.textContent = '\u60c5\u7eea\u72b6\u6001' + emotion.valence
  content.append(code, intensity, clarity, valence)
  svg.append(content)
  container.append(svg)
}

function renderColorSections() {
  const paletteList = flattenColorPalette()
  const basicList = paletteList
    .filter(item => item.base === 'red' || item.base === 'yellow')
    .slice(0, screen3ColorDots.length)
  const fullList = paletteList.length ? sortFullPalette(paletteList) : colorArcList(52)
  if (!basicList.some(item => item.id === state.colorBasic.id))
    state.colorBasic = basicList[0] || state.colorBasic
  if (!fullList.some(item => item.id === state.colorFull.id))
    state.colorFull = fullList[0] || state.colorFull

  renderColorFan(qs('#basicColorFan'), basicList, state.colorBasic, 'basic', item => {
    state.colorBasic = item
    renderColorSections()
    qs('#basicColorInfo').classList.add('is-live')
  })
  renderRadialInfo(qs('#basicColorInfo'), state.colorBasic)

  renderColorFan(qs('#fullColorFan'), fullList, state.colorFull, 'full', item => {
    state.colorFull = item
    renderColorSections()
    qs('#fullColorInfo').classList.add('is-live')
  })
  renderRadialInfo(qs('#fullColorInfo'), state.colorFull)
}

function renderLocationLegend() {
  const container = qs('#locationInlineLegend')
  container.innerHTML = ''
  DATA.locations.forEach(location => {
    const item = el('span')
    item.style.setProperty('--legend-color', location.color)
    item.textContent = `${location.zh} ${location.en}`
    container.append(item)
  })
}

function renderLocationOrbit() {
  const container = qs('#locationOrbit')
  const preview = qs('#locationPreview')
  container.innerHTML = ''
  const activeLocation = state.graphicPinnedLocation || state.graphicLocation

  const setPreview = (location, fixed = false) => {
    state.graphicLocation = location
    if (fixed) state.graphicPinnedLocation = location
    renderConcentricPreview(preview, location, { reference: true })
    preview.classList.add('is-live')
    qsa('.location-photo-node', container).forEach(node => {
      node.classList.toggle('is-active', node.dataset.locationId === location.id)
    })
  }

  screen4PhotoLayout.forEach(point => {
    const location = getLocation(point.id)
    const photoButton = el('button', 'location-photo-node')
    photoButton.type = 'button'
    photoButton.style.setProperty('--x', `${point.x}%`)
    photoButton.style.setProperty('--y', `${point.y}%`)
    photoButton.style.setProperty('--node-size', `${point.size}%`)
    if (activeLocation.id === location.id) photoButton.classList.add('is-active')
    photoButton.dataset.locationId = location.id
    photoButton.append(makePhoto(location, 'small'))
    photoButton.addEventListener('mouseenter', () => setPreview(location))
    photoButton.addEventListener('mouseleave', () => {
      setPreview(state.graphicPinnedLocation || state.graphicLocation)
    })
    photoButton.addEventListener('click', () => {
      setPreview(location, true)
    })
    container.append(photoButton)
  })

  renderConcentricPreview(preview, activeLocation, { reference: true })
  preview.classList.add('is-live')
}

function renderEmotionCloud(container, emotions, options = {}) {
  container.innerHTML = ''
  emotions.forEach(emotion => {
    const button = el('button', 'emotion-bubble', emotion.zh)
    button.type = 'button'
    const layout = options.layout?.[emotion.id]
    const size = Math.round((options.baseSize || 64) * emotion.size)
    if (layout) {
      const [x, y, radius] = layout
      button.style.setProperty('--x', `${(x / screen7ViewBox.width) * 100}%`)
      button.style.setProperty('--y', `${(y / screen7ViewBox.height) * 100}%`)
      button.style.setProperty('--bubble-width', `${((radius * 2) / screen7ViewBox.width) * 100}%`)
      button.style.setProperty(
        '--bubble-height',
        `${((radius * 2) / screen7ViewBox.height) * 100}%`
      )
      button.style.setProperty(
        '--bubble-font-size',
        `${Math.max(7, Math.min(22, radius * 0.47)).toFixed(2)}px`
      )
    } else {
      button.style.setProperty('--x', `${emotion.x}%`)
      button.style.setProperty('--y', `${emotion.y}%`)
      button.style.setProperty('--bubble-size', `${size}px`)
    }
    button.style.setProperty('--bubble-color', emotion.color)
    button.dataset.emotionId = emotion.id
    if (size < 45 || emotion.zh.length > 4) button.classList.add('small-text')
    if (state.selectedEmotionIds.includes(emotion.id) && options.selectable)
      button.classList.add('is-selected')
    if (options.static) {
      button.disabled = true
    } else if (options.selectable) {
      button.addEventListener('click', () => toggleEmotion(emotion.id))
    }
    container.append(button)
  })
}

function selectedEmotions() {
  return state.selectedEmotionIds.map(getEmotion)
}

function toggleEmotion(id) {
  const exists = state.selectedEmotionIds.includes(id)
  if (exists && state.selectedEmotionIds.length > 1) {
    state.selectedEmotionIds = state.selectedEmotionIds.filter(item => item !== id)
  } else if (!exists) {
    state.selectedEmotionIds = [...state.selectedEmotionIds, id].slice(-6)
    refineForEmotion(getEmotion(id))
  }

  state.refineIndex = Math.max(0, Math.min(state.refineIndex, state.selectedEmotionIds.length - 1))
  const current = selectedEmotions()[state.refineIndex] || getEmotion('impulse')
  state.refine = refineForEmotion(current)
  renderEmotionSelection()
  qs('.selection-side')?.classList.add('is-live')
  renderRefine()
}

function renderSelectedOrbit(container, emotions, options = {}) {
  container.innerHTML = ''
  const max = options.max || emotions.length
  const visible = emotions.slice(0, max)
  const cx = options.cx || 100
  const cy = options.cy || 100
  const radius = options.radius || 73
  visible.forEach((emotion, index) => {
    const angle = (-150 + index * (300 / Math.max(visible.length, 1))) * (Math.PI / 180)
    const dot = el('span', 'selected-dot', options.noText ? '' : emotion.zh)
    dot.style.left = `${cx + Math.cos(angle) * radius}px`
    dot.style.top = `${cy + Math.sin(angle) * radius}px`
    dot.style.setProperty('--dot-color', options.color || emotion.color)
    container.append(dot)
  })
}

function renderEmotionIntro() {
  const intro = [
    getEmotion('security'),
    getEmotion('meditation'),
    getEmotion('relax'),
    getEmotion('outcontrol'),
    getEmotion('curious'),
    getEmotion('escape'),
    getEmotion('lost'),
    getEmotion('acceptance'),
  ]
  renderEmotionCloud(qs('#emotionIntroCloud'), intro, { static: true, baseSize: 80 })
  renderSelectedOrbit(
    qs('#emotionIntroOrbit'),
    [getEmotion('angry'), getEmotion('happy'), getEmotion('unstable')],
    { max: 3 }
  )
}

function renderEmotionSelection() {
  renderEmotionCloud(qs('#emotionSelectCloud'), DATA.emotions, {
    selectable: true,
    baseSize: 72,
    layout: screen7EmotionLayout,
  })
  renderSelectedOrbit(qs('#emotionSelectionOrbit'), selectedEmotions(), { max: 6 })

  const legend = qs('#emotionLegend')
  legend.innerHTML = ''
  DATA.emotions.forEach(emotion => {
    const item = el('span')
    item.style.setProperty('--legend-color', emotion.color)
    item.textContent = `${emotion.zh} ${emotion.en}`
    legend.append(item)
  })
}

function renderMethodStrip() {
  const container = qs('#methodStrip')
  container.innerHTML = ''
  const emotion = getEmotion('impulse')
  const location = getLocation('city')

  const emotionToken = el('div', 'method-token')
  const bubble = el('span', 'emotion-bubble', emotion.zh)
  bubble.style.setProperty('--bubble-size', '68px')
  bubble.style.setProperty('--bubble-color', emotion.color)
  emotionToken.append(bubble)

  const intensityToken = el('div', 'method-token')
  intensityToken.append(el('span', 'method-arc'))

  const clarityToken = el('div', 'method-token')
  const clarityArc = el('span', 'method-arc')
  clarityArc.style.transform = 'rotate(95deg)'
  clarityToken.append(clarityArc)

  const totemToken = el('div', 'method-token')
  const totem = el('span', 'method-totem')
  totem.append(makeTotem(location))
  totemToken.append(totem)

  const previewToken = el('div', 'method-token')
  const preview = el('div', 'method-preview mini-selected-orbit')
  const summary = el('span', 'result-summary')
  summary.style.setProperty('--summary-color', emotion.color)
  summary.append(makeTotem(location))
  preview.append(summary)
  previewToken.append(preview)

  container.append(emotionToken, intensityToken, clarityToken, totemToken, previewToken)
}

function polar(cx, cy, radius, angle) {
  const rad = ((angle - 90) * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  }
}

function describeArc(cx, cy, radius, startAngle, endAngle) {
  let normalizedEnd = endAngle
  while (normalizedEnd < startAngle) normalizedEnd += 360
  const start = polar(cx, cy, radius, normalizedEnd)
  const end = polar(cx, cy, radius, startAngle)
  const largeArcFlag = normalizedEnd - startAngle <= 180 ? '0' : '1'
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`
}

function addArcOption(svg, group, value, radius, start, end, color, label) {
  const path = svgEl('path', {
    d: describeArc(250, 250, radius, start, end),
    fill: 'none',
    stroke: color,
    'stroke-width': group === 'intensity' ? 26 : 23,
    class: state.refine[group] === value ? 'ring-option is-active' : 'ring-option',
    'data-group': group,
    'data-value': value,
    role: 'button',
    tabindex: 0,
  })
  path.setAttribute('aria-label', label)
  path.addEventListener('click', () => {
    state.refine[group] = value
    state.refineByEmotion[state.refine.emotionId] = state.refine
    renderRefine()
    qs('.result-panel')?.classList.add('is-live')
  })
  path.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      state.refine[group] = value
      state.refineByEmotion[state.refine.emotionId] = state.refine
      renderRefine()
      qs('.result-panel')?.classList.add('is-live')
    }
  })
  svg.append(path)
}

function renderControlRing() {
  const container = qs('#controlRing')
  container.innerHTML = ''

  const svg = svgEl('svg', { viewBox: '0 0 500 500', class: 'ring-options' })
  addArcOption(svg, 'valence', '绉瀬', 205, 300, 382, '#cfcfcf', '绉瀬')
  addArcOption(svg, 'valence', '娑堟瀬', 205, 210, 292, '#b8b8b8', '娑堟瀬')
  addArcOption(svg, 'intensity', 'slight', 166, 26, 92, '#cfcfcf', '弱')
  addArcOption(svg, 'intensity', 'medium', 166, 100, 164, '#bdbdbd', '中')
  addArcOption(svg, 'intensity', 'strong', 166, 172, 238, '#a9a9a9', '强')
  addArcOption(svg, 'clarity', '娓呮櫚', 205, 192, 270, '#bfbfbf', '娓呮櫚')
  addArcOption(svg, 'clarity', '妯＄硦', 205, 112, 188, '#d2d2d2', '妯＄硦')
  container.append(svg)

  ;[
    ['positive', '积极'],
    ['negative', '消极'],
    ['clear', '清晰'],
    ['blur', '模糊'],
    ['weak', '弱'],
    ['mid', '中'],
    ['strong', '强'],
  ].forEach(([className, text]) => container.append(el('span', `ring-label ${className}`, text)))
  container.append(el('span', 'ring-arrow a'))
  container.append(el('span', 'ring-arrow b'))

  const cx = 280
  const cy = 260
  const radius = 106
  DATA.locations.forEach((location, index) => {
    const angle = (-160 + index * (320 / DATA.locations.length)) * (Math.PI / 180)
    const button = el('button', 'place-node')
    button.type = 'button'
    button.style.left = `${cx + Math.cos(angle) * radius}px`
    button.style.top = `${cy + Math.sin(angle) * radius}px`
    button.style.setProperty('--active-location', location.color)
    button.dataset.locationId = location.id
    if (state.refine.locationId === location.id) button.classList.add('is-active')
    button.append(makeTotem(location))
    button.addEventListener('click', () => {
      state.refine.locationId = location.id
      renderRefine()
      qs('.result-panel')?.classList.add('is-live')
    })
    container.append(button)
  })
}

function renderControlRingV2() {
  const container = qs('#controlRing')
  container.innerHTML = ''

  const svg = svgEl('svg', { viewBox: '0 0 500 500', class: 'ring-options' })
  addArcOption(svg, 'valence', 'positive', 205, 300, 382, '#cfcfcf', '积极')
  addArcOption(svg, 'valence', 'negative', 205, 210, 292, '#b8b8b8', '消极')
  addArcOption(svg, 'intensity', 'slight', 166, 26, 92, '#cfcfcf', '弱')
  addArcOption(svg, 'intensity', 'medium', 166, 100, 164, '#bdbdbd', '中')
  addArcOption(svg, 'intensity', 'strong', 166, 172, 238, '#a9a9a9', '强')
  addArcOption(svg, 'clarity', 'clear', 205, 192, 270, '#bfbfbf', '清晰')
  addArcOption(svg, 'clarity', 'blur', 205, 112, 188, '#d2d2d2', '模糊')
  container.append(svg)

  ;[
    ['positive', '积极'],
    ['negative', '消极'],
    ['clear', '清晰'],
    ['blur', '模糊'],
    ['weak', '弱'],
    ['mid', '中'],
    ['strong', '强'],
  ].forEach(([className, text]) => container.append(el('span', `ring-label ${className}`, text)))
  container.append(el('span', 'ring-arrow a'))
  container.append(el('span', 'ring-arrow b'))

  const cx = 280
  const cy = 260
  const radius = 106
  DATA.locations.forEach((location, index) => {
    const angle = (-160 + index * (320 / DATA.locations.length)) * (Math.PI / 180)
    const button = el('button', 'place-node')
    button.type = 'button'
    button.style.left = `${cx + Math.cos(angle) * radius}px`
    button.style.top = `${cy + Math.sin(angle) * radius}px`
    button.style.setProperty('--active-location', location.color)
    button.dataset.locationId = location.id
    if (state.refine.locationId === location.id) button.classList.add('is-active')
    button.append(makeTotem(location))
    button.addEventListener('click', () => {
      state.refine.locationId = location.id
      state.refineByEmotion[state.refine.emotionId] = state.refine
      renderRefine()
      qs('.result-panel')?.classList.add('is-live')
    })
    container.append(button)
  })
}

function optionButton(group, value, label) {
  const button = el(
    'button',
    `refine-choice ${state.refine[group] === value ? 'is-selected' : ''}`,
    label
  )
  button.type = 'button'
  button.addEventListener('click', () => {
    state.refine[group] = value
    advanceRefineStep()
    renderRefine()
  })
  return button
}

function renderRefineSelector() {
  const container = qs('#controlRing')
  container.innerHTML = ''
  container.className = 'control-ring svg-refine-overlay'
  const currentStep = state.refine.step || 'valence'
  const screen = {
    viewBox: '0 0 1234.92 802.97',
    left: { cx: 352.03, cy: 456.41 },
    right: { cx: 869.78, cy: 442.73 },
    locations: [
      { id: 'city', x: 392, y: 405, r: 18 },
      { id: 'house', x: 330, y: 523, r: 18 },
      { id: 'corridor', x: 286, y: 378, r: 17 },
      { id: 'night', x: 322, y: 468, r: 16 },
      { id: 'tunnel', x: 396, y: 525, r: 17 },
      { id: 'borderless', x: 282, y: 518, r: 20 },
      { id: 'sky', x: 434, y: 372, r: 20 },
      { id: 'hover', x: 270, y: 451, r: 20 },
      { id: 'beach', x: 236, y: 421, r: 20 },
      { id: 'water', x: 318, y: 405, r: 15 },
      { id: 'wind', x: 438, y: 476, r: 17 },
      { id: 'sea', x: 402, y: 468, r: 17 },
      { id: 'cloud', x: 474, y: 434, r: 19 },
    ],
    buttons: {
      next: { x: 895, y: 555, width: 230, height: 58 },
      finish: { x: 895, y: 614, width: 150, height: 55 },
    },
  }
  const svg = svgEl('svg', { viewBox: screen.viewBox, class: 'screen9-interaction-svg' })
  const defs = svgEl('defs')
  const left = screen.left
  const right = screen.right
  const currentEmotion = getEmotion(state.refine.emotionId)
  const refinedColor = currentRefineColor(state.refine)
  const resultColorFilter = svgEl('filter', {
    id: 'screen9-result-abstract-color',
    colorInterpolationFilters: 'sRGB',
  })
  resultColorFilter.append(svgEl('feFlood', { 'flood-color': refinedColor, result: 'color' }))
  resultColorFilter.append(
    svgEl('feComposite', {
      in: 'color',
      in2: 'SourceAlpha',
      operator: 'in',
      result: 'colored',
    })
  )
  resultColorFilter.append(svgEl('feComposite', { in: 'colored', in2: 'SourceGraphic', operator: 'over' }))
  defs.append(resultColorFilter)
  svg.append(defs)

  svg.append(
    svgEl('rect', {
      x: 118,
      y: 200,
      width: 565,
      height: 500,
      class: 'svg-screen9-left-mask',
    })
  )
  svg.append(
    svgEl('image', {
      href: './assets/original/screen9-rings.svg',
      x: 140.45,
      y: 210.85,
      width: 447.66,
      height: 432.75,
      class: 'svg-screen9-static-part',
    })
  )
  svg.append(
    svgEl('image', {
      href: './assets/original/screen9-circles.svg',
      x: 223.78,
      y: 328.16,
      width: 256.5,
      height: 256.5,
      class: 'svg-screen9-static-part',
    })
  )
  svg.append(
    svgEl('image', {
      href: './assets/original/screen9-labels.svg',
      x: 98.45,
      y: 223,
      width: 529.02,
      height: 458.88,
      class: 'svg-screen9-static-part',
    })
  )
  svg.append(
    svgEl('line', {
      x1: 447.42,
      y1: 680.13,
      x2: 749.72,
      y2: 511.93,
      class: 'svg-screen9-divider',
    })
  )

  const emotionBubble = svgEl('g', { class: 'svg-current-emotion' })
  emotionBubble.append(
    svgEl('circle', {
      cx: 150.56,
      cy: 123.24,
      r: 19.7,
      fill: currentEmotion.color,
      stroke: 'none',
    })
  )
  const emotionText = svgEl('text', {
    x: 150.56,
    y: 126.8,
    'text-anchor': 'middle',
    class: 'svg-current-emotion-text',
    'font-size': currentEmotion.zh.length > 4 ? 5.4 : 7,
  })
  emotionText.textContent = currentEmotion.zh
  emotionBubble.append(emotionText)
  svg.append(emotionBubble)

  const ringGuidePaths = {
    valence: [
      'M74.94,93.91A198.62,198.62,0,0,0,0,249.48l36.84-.5a160.81,160.81,0,0,1,28.05-91,162.69,162.69,0,0,1,38.39-39.61c.53-.39,1.06-.76,1.59-1.14L86.27,85.51C82.4,88.18,78.61,91,74.94,93.91Z',
      'M198.45,87.37a161.23,161.23,0,0,1,61.41,12.08l14.67-34A199.18,199.18,0,0,0,86.27,85.51l18.6,31.72a161,161,0,0,1,93.58-29.86Z',
    ],
    intensity: [
      'M225.63,0l-8.79,29.24A196.47,196.47,0,0,1,360.72,91.68l21.37-27.16A221.25,221.25,0,0,0,225.63,0Z',
      'M424.59,123.4a222.67,222.67,0,0,0-42.5-58.88L360.72,91.68a198.05,198.05,0,0,1,24.21,31.72,195.93,195.93,0,0,1,28.73,93.3l34,2.43A221,221,0,0,0,424.59,123.4Z',
      'M413.66,216.7q.24,4.77.24,9.59a196.58,196.58,0,0,1-65.87,147l25.42,14.36A221.37,221.37,0,0,0,447.66,222c0-1,0-1.93,0-2.9Z',
    ],
    clarity: [
      'M98.3,366.65c-.94-.95-1.86-1.93-2.77-2.92a126,126,0,0,1-32.38-72.36L34.5,293.71A154.59,154.59,0,0,0,95.53,402q4.48,3.35,9.18,6.34l19.2-21.53A124.64,124.64,0,0,1,98.3,366.65Z',
      'M174.17,403.55a125.93,125.93,0,0,1-50.26-16.79l-19.2,21.53a154.13,154.13,0,0,0,155.71,6.4l-13.74-25.05A124.68,124.68,0,0,1,174.17,403.55Z',
    ],
  }
  if (ringGuidePaths[currentStep]) {
    ringGuidePaths[currentStep].forEach(d => {
      svg.append(
        svgEl('path', {
          d,
          class: 'svg-left-region-guide',
          transform: 'translate(140.45 210.85)',
          fill: 'none',
          stroke: refinedColor,
          'stroke-width': 1.2,
          'stroke-linejoin': 'round',
        })
      )
    })
  } else if (currentStep === 'location') {
    svg.append(
      svgEl('ellipse', {
        cx: 352,
        cy: 463,
        rx: 146,
        ry: 136,
        class: 'svg-left-region-guide',
        fill: 'none',
        stroke: refinedColor,
        'stroke-width': 1.2,
      })
    )
  }

  const addHitArc = (group, value, radius, start, end, label) => {
    const path = svgEl('path', {
      d: describeArc(left.cx, left.cy, radius, start, end),
      class: 'svg-refine-hit',
      fill: 'none',
      stroke: 'rgba(0,0,0,0.001)',
      'stroke-width': 70,
      'stroke-linecap': 'butt',
    })
    const title = svgEl('title')
    title.textContent = label
    path.append(title)
    path.addEventListener('click', () => {
      state.refine[group] = value
      advanceRefineStep()
      renderRefine()
    })
    svg.append(path)
  }

  addHitArc('valence', 'positive', 198, 300, 35, '积极')
  addHitArc('valence', 'negative', 198, 205, 295, '消极')
  addHitArc('intensity', 'slight', 206, 45, 78, '弱')
  addHitArc('intensity', 'medium', 206, 80, 118, '中')
  addHitArc('intensity', 'strong', 206, 120, 155, '强')
  addHitArc('clarity', 'clear', 198, 190, 250, '清晰')
  addHitArc('clarity', 'blur', 198, 252, 318, '模糊')

  svg.append(
    svgEl('rect', {
      x: 760,
      y: 320,
      width: 250,
      height: 230,
      class: 'svg-screen9-right-mask',
    })
  )
  ;[14.3, 36.95, 50.46, 63.04].forEach(r => {
    svg.append(
      svgEl('circle', {
        cx: right.cx,
        cy: right.cy,
        r,
        class: 'svg-result-base-ring',
        fill: 'none',
        stroke: '#111',
        'stroke-width': 0.9,
      })
    )
  })

  ;[
    {
      key: 'valence',
      r: 94,
      w: 13,
      color: state.refine.valence ? ringTint(state.refine, 'valence') : '',
      start: 306,
      end: 352,
    },
    {
      key: 'intensity',
      r: 82,
      w: 10,
      color: state.refine.intensity ? ringTint(state.refine, 'intensity') : '',
      start: 42,
      end: 92,
    },
    {
      key: 'clarity',
      r: 70,
      w: 8,
      color: state.refine.clarity ? ringTint(state.refine, 'clarity') : '',
      start: 218,
      end: 268,
    },
  ].forEach(ring => {
    if (!ring.color) return
    svg.append(
      svgEl('path', {
        d: describeArc(right.cx, right.cy, ring.r, ring.start, ring.end),
        class: `svg-result-layer ${ring.key === 'clarity' && state.refine.clarity === 'blur' ? 'is-blur' : ''}`,
        fill: 'none',
        stroke: ring.color,
        'stroke-width': ring.w,
        'stroke-linecap': 'butt',
      })
    )
  })

  if (state.refine.confirmed && state.refine.locationId) {
    const location = getLocation(state.refine.locationId)
    svg.append(
      svgEl('circle', {
        cx: right.cx,
        cy: right.cy,
        r: 14.3,
        fill: '#fff',
        stroke: '#111',
        'stroke-width': 0.8,
      })
    )
    svg.append(
      svgEl('image', {
        href: location.totemSrc || location.abstractPic || '',
        x: right.cx - 10,
        y: right.cy - 10,
        width: 20,
        height: 20,
        class: 'svg-result-totem',
        filter: 'url(#screen9-result-abstract-color)',
      })
    )
  }

  screen.locations.forEach(placement => {
    const location = getLocation(placement.id)
    const x = placement.x
    const y = placement.y
    const r = placement.r
    svg.append(
      svgEl('circle', {
        cx: x,
        cy: y,
        r: r + 3,
        class: 'svg-dynamic-location-base',
        fill: '#d0d0d0',
        stroke: '#111',
        'stroke-width': 0.85,
      })
    )
    svg.append(
      svgEl('image', {
        href: location.totemSrc || location.abstractPic || '',
        x: x - r,
        y: y - r,
        width: r * 2,
        height: r * 2,
        class: 'svg-dynamic-location-image',
        preserveAspectRatio: 'xMidYMid meet',
      })
    )
    if (state.refine.locationId === location.id) {
      svg.append(
        svgEl('circle', {
          cx: x,
          cy: y,
        r: r + 7,
        class: 'svg-location-guide',
        fill: refinedColor,
        stroke: refinedColor,
        'stroke-width': 1.1,
        opacity: 0.42,
      })
      )
    }
    const hit = svgEl('circle', {
      cx: x,
      cy: y,
      r: r + 9,
      class: 'svg-refine-hit',
      fill: 'rgba(0,0,0,0.001)',
    })
    const title = svgEl('title')
    title.textContent = location.zh || location.en || location.id
    hit.append(title)
    hit.addEventListener('click', () => {
      state.refine.locationId = location.id
      advanceRefineStep()
      renderRefine()
    })
    svg.append(hit)
  })

  const allComplete = areAllSelectedRefinesComplete()
  const currentComplete = isRefineComplete(state.refine)
  if (currentComplete) {
    const underline = allComplete
      ? { x1: 895, x2: 951, y: 663, className: 'svg-action-underline is-finish' }
      : { x1: 895, x2: 973, y: 604, className: 'svg-action-underline is-next' }
    svg.append(
      svgEl('line', {
        x1: underline.x1,
        x2: underline.x2,
        y1: underline.y,
        y2: underline.y,
        class: underline.className,
      })
    )
  }

  const nextHit = svgEl('rect', {
    ...screen.buttons.next,
    class: 'svg-refine-hit',
    fill: 'rgba(0,0,0,0.001)',
  })
  nextHit.addEventListener('click', nextEmotion)
  svg.append(nextHit)
  const finishHit = svgEl('rect', {
    ...screen.buttons.finish,
    class: 'svg-refine-hit',
    fill: 'rgba(0,0,0,0.001)',
  })
  finishHit.addEventListener('click', finishRefine)
  svg.append(finishHit)

  container.append(svg)
  return

  const valenceNode = el(
    'div',
    `refine-node node-valence ${currentStep === 'valence' ? 'is-current' : ''}`
  )
  valenceNode.append(
    el('span', 'node-title', '情感倾向'),
    optionButton('valence', 'positive', '积极'),
    optionButton('valence', 'negative', '消极')
  )

  const intensityNode = el(
    'div',
    `refine-node node-intensity ${currentStep === 'intensity' ? 'is-current' : ''}`
  )
  intensityNode.append(
    el('span', 'node-title', '情绪强度'),
    optionButton('intensity', 'slight', '弱'),
    optionButton('intensity', 'medium', '中'),
    optionButton('intensity', 'strong', '强')
  )

  const clarityNode = el(
    'div',
    `refine-node node-clarity ${currentStep === 'clarity' ? 'is-current' : ''}`
  )
  clarityNode.append(
    el('span', 'node-title', '记忆清晰度'),
    optionButton('clarity', 'clear', '清晰'),
    optionButton('clarity', 'blur', '模糊')
  )

  const abstractNode = el(
    'div',
    `refine-abstract-node ${currentStep === 'location' ? 'is-current' : ''} ${state.refine.confirmed ? 'is-confirmed' : ''}`
  )
  abstractNode.append(el('span', 'node-title', '梦中场景'))
  const orbit = el('div', 'abstract-orbit')
  DATA.locations.forEach((location, index) => {
    const item = el(
      'button',
      `abstract-choice ${state.refine.locationId === location.id ? 'is-selected' : ''}`
    )
    item.type = 'button'
    item.style.setProperty('--i', index)
    item.style.setProperty('--count', DATA.locations.length)
    item.append(makeTotem(location))
    item.addEventListener('click', () => {
      state.refine.locationId = location.id
      advanceRefineStep()
      renderRefine()
    })
    orbit.append(item)
  })
  abstractNode.append(orbit)

  container.append(valenceNode, intensityNode, clarityNode, abstractNode)
}

function renderRefineGuide(current) {
  const guide = qs('#refineGuide')
  if (!guide) return
  const total = Math.max(selectedEmotions().length, 1)
  const color = currentRefineColor(state.refine)
  guide.innerHTML = ''
  guide.style.setProperty('--guide-color', color)
  guide.append(
    el('span', 'guide-title', `褰撳墠鎯呯华 ${state.refineIndex + 1}/${total}`),
    el('b', '', current.zh),
    el('span', '', `寮哄害锛?{paletteLabels[state.refine.intensity]}`),
    el('span', '', `鍊惧悜锛?{paletteLabels[state.refine.valence]}`),
    el('span', '', `璁板繂锛?{paletteLabels[state.refine.clarity]}`),
    el('span', '', `鍦扮偣锛?{getLocation(state.refine.locationId).zh}`)
  )
}

function renderRefineResult() {
  const container = qs('#refineResultOrbit')
  container.innerHTML = ''
  return
  container.classList.add('dream-refine-result')
  const emotion = getEmotion(state.refine.emotionId)
  const location = getLocation(state.refine.locationId)
  const refinedColor = currentRefineColor(state.refine)

  const svg = svgEl('svg', { viewBox: '0 0 220 220', class: 'result-rings-svg' })
  const rings = [
    { key: 'valence', r: 92, width: 24, dash: '430 150' },
    { key: 'intensity', r: 66, width: 19, dash: '320 96' },
    { key: 'clarity', r: 42, width: 15, dash: '198 66' },
  ]
  rings.forEach((ring, index) => {
    const active = Boolean(state.refine[ring.key])
    svg.append(
      svgEl('circle', {
        cx: 110,
        cy: 110,
        r: ring.r,
        class: `result-ring ${active ? 'is-active' : ''} result-${ring.key} ${ring.key === 'clarity' && state.refine.clarity === 'blur' ? 'is-blur' : ''}`,
        fill: 'none',
        stroke: active ? ringTint(state.refine, ring.key) : '#d6d6d6',
        'stroke-width': ring.width,
        'stroke-dasharray': ring.dash,
        'stroke-linecap': 'butt',
        transform: `rotate(${-98 + index * 18} 110 110)`,
      })
    )
  })
  svg.append(
    svgEl('circle', {
      cx: 110,
      cy: 110,
      r: 22,
      fill: state.refine.confirmed ? refinedColor : '#f7f7f7',
      stroke: '#111',
      'stroke-width': 1,
    })
  )
  container.append(svg)

  const center = el('div', `result-center ${state.refine.confirmed ? 'is-complete' : ''}`)
  center.style.setProperty('--summary-color', refinedColor)
  if (state.refine.locationId) center.append(makeTotem(location))
  container.append(center)
}

function renderRefine() {
  const emotions = selectedEmotions()
  const current = emotions[state.refineIndex] || getEmotion('impulse')
  state.refine = refineForEmotion(current)
  qs('#currentEmotionName').textContent = current.zh
  renderRefineGuide(current)
  renderRefineSelector()
  renderRefineResult()
}

function nextEmotion() {
  const emotions = selectedEmotions()
  if (!emotions.length) return
  advanceRefineStep()
  if (!state.refine.confirmed) {
    renderRefine()
    return
  }
  state.refineByEmotion[state.refine.emotionId] = state.refine
  if (state.refineIndex >= emotions.length - 1) {
    renderRefine()
    qs('.result-panel')?.classList.add('is-live')
    return
  }
  state.refineIndex = (state.refineIndex + 1) % emotions.length
  state.refine = refineForEmotion(emotions[state.refineIndex])
  renderRefine()
  qs('.result-panel')?.classList.add('is-live')
}

function readableLabel(value) {
  return dreamInterpretationLabels[value] || value || '鏈€夋嫨'
}

function collectDreamInterpretationData() {
  const emotions = selectedEmotions()
  const source = emotions.length ? emotions : [getEmotion(state.refine.emotionId)]
  return source.map((emotion, index) => {
    const refine = state.refineByEmotion[emotion.id] || refineForEmotion(emotion)
    const location = refine.locationId ? getLocation(refine.locationId) : null
    return {
      index: index + 1,
      emotionId: emotion.id,
      emotion: emotion.zh || emotion.id,
      emotionEnglish: emotion.en || '',
      baseColor: readableLabel(refine.base),
      finalColor: currentRefineColor(refine),
      valence: readableLabel(refine.valence),
      intensity: readableLabel(refine.intensity),
      clarity: readableLabel(refine.clarity),
      locationId: refine.locationId || '',
      location: location ? location.zh || location.en || location.id : '鏈€夋嫨',
      locationEnglish: location ? location.en || '' : '',
      completed: Boolean(refine.confirmed),
    }
  })
}

function renderDreamInterpretationSummary(items) {
  const summary = qs('#dreamAiSummary')
  if (!summary) return
  summary.innerHTML = ''
  items.forEach(item => {
    const chip = el('span', 'dream-ai-chip')
    chip.style.setProperty('--chip-color', item.finalColor)
    chip.textContent = `${item.emotion} / ${item.location}`
    summary.append(chip)
  })
}

function setDreamInterpretationOutput(text, status = '') {
  const output = qs('#dreamAiOutput')
  if (!output) return
  output.className = `dream-ai-output ${status ? `is-${status}` : ''}`.trim()
  output.textContent = text
}

function setDreamThinkingLines(lines) {
  const thinking = qs('#dreamAiThinking')
  if (!thinking) return
  thinking.innerHTML = ''
  lines.forEach((line, index) => {
    const item = el('span', '')
    item.style.animationDelay = `${index * 90}ms`
    item.textContent = line
    thinking.append(item)
  })
}

function clearDreamThinking() {
  const thinking = qs('#dreamAiThinking')
  if (thinking) thinking.innerHTML = ''
}

function startDreamThinkingAnimation(items) {
  const steps = [
    '正在读取你选择过的情绪节点...',
    '正在把情绪强度、倾向和记忆清晰度合并成色彩线索...',
    '正在匹配梦境发生地点与对应图腾...',
    '正在组织一段适合页面展示的梦境解读...',
  ]
  let cursor = 0
  setDreamThinkingLines([steps[0]])
  return window.setInterval(() => {
    cursor = Math.min(cursor + 1, steps.length - 1)
    const emotionLine = items[cursor % Math.max(items.length, 1)]
    const visible = steps.slice(0, cursor + 1)
    if (emotionLine) {
      visible.push(`当前线索：${emotionLine.emotion} / ${emotionLine.location} / ${emotionLine.finalColor}`)
    }
    setDreamThinkingLines(visible)
  }, 900)
}

async function requestDreamInterpretation(items) {
  const endpoint =
    window.DEEPSEEK_PROXY_ENDPOINT ||
    localStorage.getItem('deepseekEndpoint') ||
    (location.protocol === 'file:'
      ? 'http://127.0.0.1:8787/api/deepseek-interpret'
      : '/api/deepseek-interpret')
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dream: items }),
  })
  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(detail || `DeepSeek request failed: ${response.status}`)
  }
  const data = await response.json()
  return data.interpretation || data.text || ''
}

async function generateDreamInterpretation() {
  const requestId = Date.now()
  state.interpretationRequestId = requestId
  const items = collectDreamInterpretationData()
  qs('#screen-9')?.classList.add('is-ai-result')
  renderDreamInterpretationSummary(items)
  const thinkingTimer = startDreamThinkingAnimation(items)
  setDreamInterpretationOutput('AI 正在生成梦境解读，请稍候...', 'loading')
  try {
    const interpretation = await requestDreamInterpretation(items)
    if (state.interpretationRequestId !== requestId) return
    window.clearInterval(thinkingTimer)
    clearDreamThinking()
    setDreamInterpretationOutput(interpretation || 'DeepSeek 已返回，但内容为空。', '')
  } catch (error) {
    if (state.interpretationRequestId !== requestId) return
    window.clearInterval(thinkingTimer)
    clearDreamThinking()
    setDreamInterpretationOutput(
      [
        'DeepSeek 暂时没有连接成功。',
        '',
        '请先在本项目目录启动本地代理：',
        '1. 设置环境变量 DEEPSEEK_API_KEY',
        '2. 运行 node deepseek-proxy.js',
        '',
        `错误信息：${error.message}`,
      ].join('\n'),
      'error'
    )
  }
}
function finishRefine() {
  advanceRefineStep()
  state.refineByEmotion[state.refine.emotionId] = state.refine
  const button = qs('#finishBtn')
  button.blur()
  qs('.result-panel')?.classList.add('is-live')
  generateDreamInterpretation()
}

function renderExpressions() {
  const container = qs('#expressionStage')
  if (!container) return
  container.innerHTML = ''
  DATA.expressions.forEach(item => {
    const node = el('div', 'expression-item')
    node.style.setProperty('--x', `${item.x}%`)
    node.style.setProperty('--y', `${item.y}%`)
    node.style.setProperty('--face-size', `${92 * item.size}px`)

    const photo = el('span', `expression-photo ${item.crop}`)
    const label = el('span', 'expression-label')
    label.style.setProperty('--label-color', item.color)
    label.innerHTML = `${item.zh} <span>${item.en}</span>`
    node.append(photo, label)
    container.append(node)
  })
}

function bindRefineActions() {
  qs('#nextEmotionBtn').addEventListener('click', nextEmotion)
  qs('#finishBtn').addEventListener('click', finishRefine)
}

async function init() {
  await mergeImageMap()
  normalizeAbstractAssets()
  await mergeEmotionMap()
  await mergeColorPalette()
  renderIntroPhotos()
  renderColorSections()
  renderLocationLegend()
  renderLocationOrbit()
  renderEmotionIntro()
  renderEmotionSelection()
  renderMethodStrip()
  renderRefine()
  renderExpressions()
  bindRefineActions()
}

init()
