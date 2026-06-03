import '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'

let model = null
let loadingPromise = null

async function loadModel() {
  if (model) return model
  if (loadingPromise) return loadingPromise

  loadingPromise = (async () => {
    model = await mobilenet.load({ version: 2, alpha: 1.0 })
    return model
  })()

  return loadingPromise
}

// Kata kunci luas yang berkaitan dengan tumbuhan di ImageNet
const PLANT_KEYWORDS = [
  // Tumbuhan umum
  'plant', 'leaf', 'leaves', 'tree', 'flower', 'herb', 'shrub', 'bush',
  'vine', 'grass', 'moss', 'fern', 'palm', 'pine', 'oak', 'elm', 'maple',
  'willow', 'birch', 'cedar', 'spruce', 'ivy', 'cactus', 'succulent',
  'bamboo', 'reed', 'bracken', 'lichen', 'algae', 'seaweed', 'kelp',
  // Buah
  'strawberry', 'orange', 'lemon', 'lime', 'apple', 'pear', 'peach',
  'grape', 'banana', 'mango', 'pineapple', 'watermelon', 'melon',
  'cherry', 'plum', 'fig', 'pomegranate', 'avocado', 'papaya',
  'coconut', 'kiwi', 'guava', 'passion fruit', 'jackfruit',
  'blueberry', 'raspberry', 'blackberry', 'cranberry', 'gooseberry',
  // Sayur & biji-bijian
  'tomato', 'potato', 'carrot', 'onion', 'pepper', 'cucumber', 'lettuce',
  'cabbage', 'broccoli', 'cauliflower', 'spinach', 'celery', 'asparagus',
  'corn', 'maize', 'rice', 'wheat', 'barley', 'oat', 'grain', 'seed',
  'pumpkin', 'squash', 'zucchini', 'eggplant', 'garlic', 'mushroom',
  'bean', 'pea', 'lentil', 'nut', 'acorn', 'chestnut', 'walnut',
  'almond', 'peanut', 'hazelnut', 'pecan', 'cashew', 'pistachio',
  // Bunga
  'rose', 'tulip', 'daisy', 'sunflower', 'orchid', 'lily',
  'dandelion', 'violet', 'iris', 'carnation', 'poppy', 'marigold',
  'lavender', 'jasmine', 'lotus', 'chrysanthemum', 'peony',
  'hibiscus', 'magnolia', 'azalea', 'begonia', 'petunia',
  'geranium', 'fuchsia', 'wisteria', 'honeysuckle', 'bluebell',
  // Kategori terkait
  'pot', 'flowerpot', 'vase', 'bouquet', 'wreath', 'garland',
  'hay', 'straw', 'coral', 'agaric', 'gyromitra', 'stinkhorn',
  'rapeseed', 'buckeye', 'stonecrop', 'head cabbage',
  'cauliflower', 'bell pepper', 'cardoon', 'custard apple',
  'pomegranate', 'acorn', 'hip', 'ear', 'rapeseed',
  // Tambahan untuk gambar daun close-up
  'slug', 'nematode', 'worm', 'snake', 'spider', 'insect',
  'spot', 'stain', 'pattern', 'texture', 'green', 'brown',
  'garden', 'nursery', 'greenhouse', 'farm', 'field',
  'bloom', 'blossom', 'petal', 'stem', 'root', 'branch',
  'twig', 'bark', 'timber', 'wood', 'log',
]

// Daftar label ImageNet yang PASTI bukan tumbuhan
const NON_PLANT_KEYWORDS = [
  'car', 'truck', 'bus', 'motorcycle', 'bicycle', 'airplane', 'boat', 'ship',
  'train', 'helicopter', 'rocket', 'missile',
  'dog', 'cat', 'bird', 'fish', 'horse', 'cow', 'sheep', 'pig', 'chicken',
  'elephant', 'bear', 'zebra', 'giraffe', 'lion', 'tiger', 'monkey',
  'whale', 'dolphin', 'shark', 'penguin', 'eagle', 'owl', 'parrot',
  'person', 'man', 'woman', 'child', 'baby', 'boy', 'girl',
  'computer', 'laptop', 'phone', 'keyboard', 'mouse', 'monitor', 'screen',
  'television', 'radio', 'camera', 'printer', 'speaker',
  'chair', 'table', 'desk', 'bed', 'sofa', 'couch', 'bench',
  'book', 'magazine', 'newspaper', 'letter', 'envelope',
  'shoe', 'boot', 'sandal', 'hat', 'cap', 'shirt', 'dress', 'pants',
  'coat', 'jacket', 'suit', 'tie', 'scarf', 'glove',
  'bottle', 'cup', 'glass', 'plate', 'bowl', 'fork', 'knife', 'spoon',
  'clock', 'watch', 'ring', 'necklace', 'bracelet',
  'building', 'house', 'castle', 'bridge', 'tower', 'church',
  'mountain', 'ocean', 'river', 'lake', 'desert', 'beach',
  'ball', 'bat', 'racket', 'glove', 'helmet', 'trophy',
  'gun', 'rifle', 'sword', 'axe', 'hammer',
  'toy', 'doll', 'puzzle', 'game', 'card',
]

function isPlantRelated(className) {
  const lower = className.toLowerCase()

  // Cek apakah label PASTI bukan tumbuhan
  const isDefinitelyNotPlant = NON_PLANT_KEYWORDS.some(kw => lower.includes(kw))
  if (isDefinitelyNotPlant) return false

  // Cek apakah label berkaitan dengan tumbuhan
  const isPlant = PLANT_KEYWORDS.some(kw => lower.includes(kw))
  if (isPlant) return true

  // Jika tidak pasti bukan tumbuhan dan tidak pasti tumbuhan,
  // anggap kemungkinan tumbuhan (lebih permisif)
  return true
}

/**
 * Validasi apakah gambar mengandung tanaman/daun
 * @param {File|Blob} file - Gambar yang akan divalidasi
 * @returns {Promise<{isPlant: boolean, predictions: Array, message: string}>}
 */
export async function validatePlantImage(file) {
  const net = await loadModel()

  // Buat elemen img dari file
  const imgElement = await fileToImage(file)

  // Klasifikasi dengan MobileNet — ambil 10 prediksi teratas
  const predictions = await net.classify(imgElement, 10)

  // Cek apakah ada prediksi yang PASTI bukan tumbuhan
  const nonPlantPredictions = predictions.filter(pred => {
    const lower = pred.className.toLowerCase()
    return NON_PLANT_KEYWORDS.some(kw => lower.includes(kw))
  })

  // Cek apakah ada prediksi yang berkaitan dengan tumbuhan
  const plantPredictions = predictions.filter(pred => {
    const lower = pred.className.toLowerCase()
    return PLANT_KEYWORDS.some(kw => lower.includes(kw))
  })

  // Hitung total confidence untuk masing-masing kategori
  const nonPlantConfidence = nonPlantPredictions.reduce((sum, p) => sum + p.probability, 0)
  const plantConfidence = plantPredictions.reduce((sum, p) => sum + p.probability, 0)

  // Keputusan: jika confidence non-tumbuhan > 60%, tolak
  const isPlant = nonPlantConfidence < 0.60

  // Bersihkan URL objek
  if (imgElement.src.startsWith('blob:')) {
    URL.revokeObjectURL(imgElement.src)
  }

  const topPred = predictions[0]
  const topLabel = topPred ? topPred.className : 'Unknown'
  const topProb = topPred ? topPred.probability : 0

  return {
    isPlant,
    predictions,
    message: isPlant
      ? `Terdeteksi: ${topLabel} (${(topProb * 100).toFixed(1)}%)`
      : `Gambar yang diunggah terdeteksi sebagai "${topLabel}", bukan daun atau tanaman. Silakan unggah foto daun yang jelas.`
  }
}

function fileToImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Gagal memuat gambar'))
    }
    img.src = url
  })
}
