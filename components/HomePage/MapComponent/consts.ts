export const breatheMonAPI = 'f89cdd19-a896-42ab-aafc-1b372ddc254a'

export const locationsWithSensors = {
  ulaanbaatar: [106.92146, 47.91977],
  arkhangai: [101.4781, 47.4704],
  bayanolgii: [89.96492, 48.96925],
  bayankhongor: [100.7184, 46.19181],
  bulgan: [103.51873, 48.81829],
  darkhan: [105.94039, 49.49008],
  dornod: [114.537224, 48.080276],
  dornogovi: [110.14117, 44.89325],
  dundgovi: [106.27489, 45.767166],
  govialtai: [96.25504, 46.37279],
  govisumber: [108.380165, 46.49039],
  khentii: [110.662, 47.322],
  khovd: [91.63353, 47.995724],
  khovsgol: [100.16647, 49.638718],
  umnugobi: [104.42263, 43.56769],
  orkhon: [104.04399, 49.02704],
  uvurkhangai: [102.77983, 46.263027],
  selenge: [106.192795, 50.23964],
  sukhbaatar: [113.28328, 46.672695],
  tov: [106.901886, 47.7125],
  uvs: [92.06861, 49.971558],
  zavkhan: [96.843025, 47.74261],
}

export const leftRadios = [
  {
    id: 'outdoor_sensor',
    value: 'outdoor',
    label: 'outdoor',
    sublabel: 'outdoorlabel',
  },
  {
    id: 'indoor_sensor',
    value: 'indoor',
    label: 'indoor',
    sublabel: 'indoorlabel',
  },
]

export const rightRadios = [
  {
    id: 'satellite-v9',
    value: 'satellite',
    label: 'satellite',
  },
  {
    id: 'streets-v11',
    value: 'streets',
    label: 'streets',
  },
]
export const AQIScales = [
  { color: 'green', value: '0', text: 'healthy' },
  { color: 'yellow', value: '50', text: 'moderate' },
  { color: 'orange', value: '100', text: 'unhealthySensitive' },
  { color: 'red', value: '150', text: 'unhealthy' },
  { color: 'purple', value: '200', text: 'veryUnhealthy' },
  { color: 'brown', value: '300+', text: 'hazardous' },
]

export const activeStations = 'v2/stations?city=Ulaanbaatar&state=ulaanbaatar&country=mongolia&key=' + breatheMonAPI
export const airvisualUrl = 'https://api.airvisual.com'
export const globalRanking = 'v2/city_ranking?key=' + breatheMonAPI

// ------------------------- API access variables ------------------------
export const pinIndoorStationsAPI = [
  'https://www.airvisual.com/api/v2/node/Kejubtpw6PwsmMmzK',
  'https://www.airvisual.com/api/v2/node/3RzjWMNvmq5bbAptv',
  'https://www.airvisual.com/api/v2/node/5ZPqfjPXcamPrYtQk',
  'https://www.airvisual.com/api/v2/node/9B736eM4bJPNtjL9M',
  'https://www.airvisual.com/api/v2/node/5c73a77e6d87653768a66350',
  'https://www.airvisual.com/api/v2/node/8taRnZMrTmmHXSMBp',
  'https://www.airvisual.com/api/v2/node/dvnS6DPkyME6srxSP',
  'https://www.airvisual.com/api/v2/node/5c78a905e55604dc7284f89c',
  'https://www.airvisual.com/api/v2/node/5c73a671e114d9d4201eeeae',
  'https://www.airvisual.com/api/v2/node/5c6e4e866d876516f4a662dc',
  'https://www.airvisual.com/api/v2/node/5c73a62af5238a205093d03d',
  'https://www.airvisual.com/api/v2/node/Eqi36fSMpxfupKB58',
  'https://www.airvisual.com/api/v2/node/m9oLhQW6QcaSJu7H7',
  'https://www.airvisual.com/api/v2/node/5c6e1131d1b95b78c7874426',
  'https://www.airvisual.com/api/v2/node/Pj73GhyvAq5mprFY3',
  'https://www.airvisual.com/api/v2/node/zMc2Drjp8xH9hjo8r',
  'https://www.airvisual.com/api/v2/node/5c73a586f5238a02f793d039',
  'https://www.airvisual.com/api/v2/node/5c73a5d1e114d9167e1eeeaa',
  'https://www.airvisual.com/api/v2/node/5c8b63bb1158d537e4646d3c',
  'https://www.airvisual.com/api/v2/node/602551d954964b2a97e7d833',
  'https://www.airvisual.com/api/v2/node/602551e854964b34eee7d836',
  'https://www.airvisual.com/api/v2/node/602551f522dba0789ea1a4d9',
  'https://www.airvisual.com/api/v2/node/6025520154964b8196e7d839',
  'https://www.airvisual.com/api/v2/node/6025520d22dba0f5e5a1a4dc',
  'https://www.airvisual.com/api/v2/node/6025537922dba0a2daa1a4df',
  'https://www.airvisual.com/api/v2/node/6025538022dba0245aa1a4e2',
  'https://www.airvisual.com/api/v2/node/6025538854964ba255e7d83e',
  'https://www.airvisual.com/api/v2/node/6025538e22dba0182aa1a4e5',
  'https://www.airvisual.com/api/v2/node/6025539722dba095e7a1a4e8',
  'https://www.airvisual.com/api/v2/node/602554b454964b6185e7d841',
  'https://www.airvisual.com/api/v2/node/602554be22dba083fba1a4ed',
  'https://www.airvisual.com/api/v2/node/602554c922dba03a39a1a4f0',
  'https://www.airvisual.com/api/v2/node/602554d422dba0659ea1a4f3',
  'https://www.airvisual.com/api/v2/node/602554dd54964b36a6e7d844',
  'https://www.airvisual.com/api/v2/node/602555a854964b18fee7d847',
  'https://www.airvisual.com/api/v2/node/602555b222dba08015a1a4f8',
  'https://www.airvisual.com/api/v2/node/602555d254964ba0c5e7d84a',
  'https://www.airvisual.com/api/v2/node/602555dd22dba0beb3a1a4fb',
  'https://www.airvisual.com/api/v2/node/602555e754964becf1e7d84d',
  'https://www.airvisual.com/api/v2/node/602556eb22dba03184a1a502',
  'https://www.airvisual.com/api/v2/node/602556f354964b21c4e7d850',
  'https://www.airvisual.com/api/v2/node/602556fa54964b0c37e7d853',
  'https://www.airvisual.com/api/v2/node/6025570154964bd37ce7d856',
  'https://www.airvisual.com/api/v2/node/6025570822dba0a99aa1a505',
  'https://www.airvisual.com/api/v2/node/6024c58ef68eb14affa292cd',
  'https://www.airvisual.com/api/v2/node/6024c599f68eb14320a292d0',
  'https://www.airvisual.com/api/v2/node/6025595f22dba006eaa1a50d',
  'https://www.airvisual.com/api/v2/node/6024b524f68eb16047a292c6',
  'https://www.airvisual.com/api/v2/node/694yGX4Wbe4pxjnce',
  'https://www.airvisual.com/api/v2/node/60255d94ccc6683e92605ea2',
  'https://www.airvisual.com/api/v2/node/60255c8cccc6680f63605e9f',
  'https://www.airvisual.com/api/v2/node/60255c70ccc66872c0605e9c',
  'https://www.airvisual.com/api/v2/node/60255c6322dba052c0a1a518',
  'https://device.iqair.com/v2/6343df1a5d5160689849dbb9',
]

export const purpleAirIndoorStationsAPI = [
  'https://api.purpleair.com/v1/sensors/103150?api_key=A060ACF0-510E-11EB-9893-42010A8001E8',
  'https://api.purpleair.com/v1/sensors/131823?api_key=A060ACF0-510E-11EB-9893-42010A8001E8',
]

export const purpleAirOutdoorStationsAPI = [
  'https://www.purpleair.com/json?key=68C53ROV5RQ7H3C0&show=35963',
  'https://www.purpleair.com/json?key=EJLAF3DWDO7GLJF6&show=35989',
  'https://www.purpleair.com/json?key=FI913OTX4290QQNM&show=35519',
  'https://www.purpleair.com/json?key=891BY758Q9NKSA4V&show=39299',
  'https://www.purpleair.com/json?key=U06DW5A33IAIMG1A&show=36091',
  'https://www.purpleair.com/json?key=JLSZEPAIYB5VX03A&show=39315',
  'https://www.purpleair.com/json?key=EI8A6GXGBO1QDD81&show=35729',
]

export const PML_OutdoorSensorPurpleAir =
  'https://api.openaq.org/v2/measurements?country=MN&sensorType=low-cost%20sensor'

// openaq
export const NAMEM_OutdoorSensorsOpenAqAPI = [
  'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest/230483?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false',
  'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest/235987?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false',
  'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest/230500?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false',
  'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest/230484?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false',
  'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest/232310?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false',
  'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest/235993?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false',
  'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest/235986?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false',
  'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest/234146?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false',
  'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest/234457?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false',
  'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest/230642?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false',
  'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest/230487?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false',
  'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest/289785?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false',
  'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest/288931?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false',
  'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest/288892?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false',
]

// -------------------------- Calculate indoor station AQI ---------------------
export const AQI_THRESHOLDS = {
  '12': { iHi: 50, iLow: 0, bpHi: 12, bpLow: 0, pmLvl: 0 },
  '35.4': { iHi: 100, iLow: 51, bpHi: 35.4, bpLow: 12.1, pmLvl: 1 },
  '55.4': { iHi: 150, iLow: 101, bpHi: 55.5, bpLow: 35.5, pmLvl: 2 },
  '150.4': { iHi: 200, iLow: 151, bpHi: 150.4, bpLow: 55.5, pmLvl: 3 },
  '250.4': { iHi: 300, iLow: 201, bpHi: 250.4, bpLow: 150.5, pmLvl: 4 },
  '350.4': { iHi: 400, iLow: 301, bpHi: 350.4, bpLow: 250.5, pmLvl: 5 },
  '500.4': { iHi: 500, iLow: 401, bpHi: 500.4, bpLow: 350.5, pmLvl: 5 },
}

export const healthCategoryDetailsIndoor = {
  good: {
    className: 'good',
    category_text: 'Air quality is good. Enjoy the outdoors!',
    recommendation_icon: { first_advice: 'wetclean', second_advice: 'no-smoke', third_advice: 'chemical' },
    recommendation_text: 'good',
  },
  moderate: {
    className: 'moderate',
    category_text: 'Moderate air quality continue monitoring the air',
    recommendation_icon: { first_advice: 'checkair', second_advice: 'chemical', third_advice: 'no-smoke' },
    recommendation_text: 'moderate',
  },
  unhealthy_sensitive: {
    className: 'unhealthy_sensitive',
    category_text: 'Unhealthy for vulnerable populations of all ages',
    recommendation_icon: { first_advice: 'purifier', second_advice: 'no-smoke', third_advice: 'monitor' },
    recommendation_text: 'unhealthy_sensitive',
  },
  unhealthy: {
    className: 'unhealthy',
    category_text: 'Unhealthy air quality. Monitor your health',
    recommendation_icon: { first_advice: 'purifier', second_advice: 'chemical', third_advice: 'monitor' },
    recommendation_text: 'unhealthy',
  },
  very_unhealthy: {
    className: 'very_unhealthy',
    category_text: 'Very unhealthy! Serious health effects',
    recommendation_icon: { first_advice: 'purifier', second_advice: 'monitor', third_advice: 'indoor' },
    recommendation_text: 'very_unhealthy',
  },
  hazardous: {
    className: 'hazardous',
    category_text: 'Caution! air quality is hazardous!',
    recommendation_icon: { first_advice: 'indoor', second_advice: 'purifier', third_advice: 'monitor' },
    recommendation_text: 'hazardous',
  },
}

// Health impact details
export const healthCategoryDetailsOutdoor = {
  good: {
    className: 'good',
    category_text: 'Air quality is good. Enjoy the outdoors!',
    recommendation_icon: { first_advice: 'walk', second_advice: 'openWindow', third_advice: 'wetclean' },
    recommendation_text: 'good',
  },
  moderate: {
    className: 'moderate',
    category_text: 'Moderate air quality continue monitoring the air',
    recommendation_icon: { first_advice: 'checkair', second_advice: 'chemical', third_advice: 'traffic' },
    recommendation_text: 'moderate',
  },
  unhealthy_sensitive: {
    className: 'unhealthy_sensitive',
    category_text: 'Unhealthy for vulnerable populations of all ages',
    recommendation_icon: { first_advice: 'purifier', second_advice: 'no-smoke', third_advice: 'monitor' },
    recommendation_text: 'unhealthy_sensitive',
  },
  unhealthy: {
    className: 'unhealthy',
    category_text: 'Unhealthy air quality. Monitor your health',
    recommendation_icon: { first_advice: 'purifier', second_advice: 'closeWindow', third_advice: 'mask' },
    recommendation_text: 'unhealthy',
  },
  very_unhealthy: {
    className: 'very_unhealthy',
    category_text: 'Very unhealthy! Serious health effects',
    recommendation_icon: { first_advice: 'purifier', second_advice: 'monitor', third_advice: 'mask' },
    recommendation_text: 'very_unhealthy',
  },
  hazardous: {
    className: 'hazardous',
    category_text: 'Caution! air quality is hazardous!',
    recommendation_icon: { first_advice: 'indoor', second_advice: 'purifier', third_advice: 'mask' },
    recommendation_text: 'hazardous',
  },
}

export const desiredPollutants = ['p2', 'p1', 'n2', 's2', 'o3', 'co']

export const indoorStationLocation: any = {
  'kindergarten #167 collo': {
    lat: 47.88896152267507,
    lon: 106.92271876144893,
  },
  '306-r tsetserleg': {
    lat: 47.88896152267507,
    lon: 106.92271876144893,
  },
  Home: {
    lat: 47.88896152267507,
    lon: 106.92271876144893,
  },
  '166-r tsetserleg': {
    lat: 47.88896152267507,
    lon: 106.92271876144893,
  },
  'Khangai hothon 143': {
    lat: 47.88896152267507,
    lon: 106.92271876144893,
  },
  'khangai hothon 8': {
    lat: 47.88896152267507,
    lon: 106.92271876144893,
  },
  '35r surguuli': {
    lat: 47.88896152267507,
    lon: 106.92271876144893,
  },
  'yarmag-2': {
    lat: 47.88896152267507,
    lon: 106.92271876144893,
  },
  'sbd 9 khoroo': {
    lat: 47.88896152267507,
    lon: 106.92271876144893,
  },
  'chd hospital-indoor': {
    lat: 47.88896152267507,
    lon: 106.92271876144893,
  },
  'skhd hospital': {
    lat: 47.88896152267507,
    lon: 106.92271876144893,
  },
  'skhd-hospital-indoor': {
    lat: 47.91499602726164,
    log: 106.84651426970959,
  },
  'khud hospital-indoor': {
    lat: 47.897912,
    lon: 106.892887,
  },
  'khud-hospital': {
    lat: 47.897895,
    lon: 106.892989,
  },
  '67r surguuli-indoor': {
    lat: 47.953191,
    lon: 106.826694,
  },
  '29r surguuli-indoor': {
    lat: 47.925759,
    lon: 106.921602,
  },
  'tsetserleg, bagshiin surguuli-indoor': {
    lat: 47.474036,
    lon: 101.45431,
  },
  '35r surguuli-indoor': {
    lat: 47.965388,
    lon: 106.918729,
  },
  'darkhan, hospital-indoor': {
    lat: 49.456859,
    lon: 105.965883,
  },
  'tsetserleg, hospital-indoor': {
    lat: 47.474862,
    lon: 101.448786,
  },
  '114r surguuli-indoor': {
    lat: 47.866253,
    log: 106.763199,
  },
  '92r surguuli': {
    lat: 47.920269,
    log: 106.996318,
  },
  'arvaikheer, hospital': {
    lat: 46.267329,
    log: 102.785242,
  },
  'health care facility #1': { lat: 47.922754, lon: 106.9458 },
  'amgalan birth hospital': { lat: 47.915262, log: 106.96923 },
  'baynzurkh children hospital': { lat: 47.933686, lon: 107.00906 },
  'central hospital': { lat: 47.918921, lon: 106.96456 },
  'kindergarten #211': { lat: 47.918651, lon: 107.03626 },
  'kindergarten #6': { lat: 47.913713, lon: 107.03523 },
  'kindergarten #202': { lat: 47.953084, lon: 106.94473 },
  'kindergarten #122': { lat: 47.916199, lon: 106.93981 },
  'kindergarten #129': { lat: 47.916224, lon: 106.94124 },
  'kindergarten #32': { lat: 47.913575, lon: 106.99718 },
  'kindergarten #20': { lat: 47.910716, lon: 106.99368 },
  'UN-KG251': { lat: 47.927713, lon: 106.99021 },
  'kindergarten #168': { lat: 47.925746, lon: 106.98685 },
  'kindergarten #115': { lat: 47.919979, lon: 106.96413 },
  'kindergarten #128': { lat: 47.91984, lon: 106.96461 },
  'kindergarten #172': { lat: 47.915262, lon: 106.97409 },
  'kindergarten #201': { lat: 47.943844, lon: 106.98268 },
  'kindergarten #22': { lat: 47.926479, lon: 106.93965 },
  'kindergarten #167': { lat: 47.945758, lon: 107.00693 },
  'UN-KG200': { lat: 47.87426, lon: 107.11623 },
  'kindergarten #203': { lat: 47.918589, lon: 107.08167 },
  'kindergarten #45': { lat: 47.935539, lon: 106.93572 },
  'kindergarten #210': { lat: 47.935165, lon: 106.95495 },
  'kindergarten #212': { lat: 47.946274, lon: 106.9422 },
  'kindergarten #147': { lat: 47.91466, lon: 106.93982 },
  'kindergarten #169': { lat: 47.929088, lon: 106.96701 },
  'kindergarten #169 collo': { lat: 47.929088, lon: 106.96701 },
  'BKH-maternity hospital': { lat: 46.19869, lon: 100.71557 },
  'bkh children hospital': { lat: 46.19869, lon: 100.71557 },
  'bkh-kg5': { lat: 46.193, lon: 100.721695 },
  'bkh-kg6': { lat: 46.198566, lon: 100.70144 },
  'bkh-kg16': { lat: 46.190167, lon: 100.7127 },
  'kindergarten #63': { lat: 47.927978, lon: 107.15397 },
  'kindergarten #199': { lat: 47.954046, lon: 106.94522 },
  'kindergarten #122 collo': { lat: 47.916199, lon: 106.93981 },
  'bzd-3r bag gadaa': { lat: 47.953191, lon: 106.826694 },
  '75-r tsetserleg- sbd': { lat: 47.931066347509784, lon: 106.96289062500001 },
}

export const pollutantsChemicalFormula = {
  p2: {
    element: 'PM',
    index: '2.5',
  },
  p1: {
    element: 'PM',
    index: '10',
  },
  n2: {
    element: 'NO',
    index: '2',
  },
  s2: {
    element: 'SO',
    index: '2',
  },
  o3: {
    element: 'O',
    index: '3',
  },
  co: {
    element: 'CO',
    index: '',
  },
}

export type LocationOption = {
  value: string
  label: string
}

export const locationOptions: LocationOption[] = [
  { value: 'ulaanbaatar', label: 'province.ulaanbaatar' },
  { value: 'arkhangai', label: 'province.arkhangai' },
  { value: 'bayanolgii', label: 'province.bayanolgii' },
  { value: 'bayankhongor', label: 'province.bayankhongor' },
  { value: 'bulgan', label: 'province.bulgan' },
  { value: 'darkhan', label: 'province.darkhan' },
  { value: 'dornod', label: 'province.dornod' },
  { value: 'dornogovi', label: 'province.dornogovi' },
  { value: 'dundgovi', label: 'province.dundgovi' },
  { value: 'govialtai', label: 'province.govialtai' },
  { value: 'govisumber', label: 'province.govisumber' },
  { value: 'khentii', label: 'province.khentii' },
  { value: 'khovd', label: 'province.khovd' },
  { value: 'khovsgol', label: 'province.khovsgol' },
  { value: 'umnugobi', label: 'province.umnugobi' },
  { value: 'orkhon', label: 'province.orkhon' },
  { value: 'uvurkhangai', label: 'province.uvurkhangai' },
  { value: 'selenge', label: 'province.selenge' },
  { value: 'sukhbaatar', label: 'province.sukhbaatar' },
  { value: 'tov', label: 'province.tov' },
  { value: 'uvs', label: 'province.uvs' },
  { value: 'zavkhan', label: 'province.zavkhan' },
]
