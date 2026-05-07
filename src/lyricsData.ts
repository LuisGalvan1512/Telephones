export interface LyricItem {
  word: string;
  start: number;
  end: number;
}

export const lyricsData: LyricItem[] = [
  // Rise with the morning (estimated ~20s based on your lyrics)
  { word: "Rise", start: 26.0, end: 27.0 },
  { word: "with", start: 27.0, end: 27.5 },
  { word: "the", start: 27.5, end: 28.5 },
  { word: "morning", start: 28.5, end: 31.0 },

  // You call to me (using Whisper: 32.18s)
  { word: "You", start: 32.18, end: 33.58 },
  { word: "call", start: 33.58, end: 34.44 },
  { word: "to", start: 34.44, end: 35.28 },
  { word: "me", start: 35.28, end: 37.84 },

  // My thoughts are crawling (using Whisper: 39.98s - adjusted to match your lyrics)
  { word: "My", start: 39.98, end: 40.66 },
  { word: "thoughts", start: 40.66, end: 41.36 },
  { word: "are", start: 41.36, end: 42.0 },
  { word: "crawling", start: 42.0, end: 45.24 },

  // You're all I see (estimated)
  { word: "You're", start: 45.24, end: 46.36 },
  { word: "all", start: 46.36, end: 47.0 },
  { word: "I", start: 47.0, end: 47.5 },
  { word: "see", start: 47.5, end: 50.0 },

  // I wish I could live without you (using Whisper: 50.66s)
  { word: "I", start: 50.66, end: 52.06 },
  { word: "wish", start: 52.06, end: 52.78 },
  { word: "I", start: 52.78, end: 53.76 },
  { word: "could", start: 53.76, end: 54.42 },
  { word: "live", start: 54.42, end: 55.3 },
  { word: "without", start: 55.3, end: 56.4 },
  { word: "you", start: 56.4, end: 57.44 },

  // But you're a part of me (using Whisper: 57.76s)
  { word: "But", start: 57.76, end: 57.84 },
  { word: "you're", start: 57.84, end: 58.7 },
  { word: "a", start: 58.7, end: 59.48 },
  { word: "part", start: 59.48, end: 60.2 },
  { word: "of", start: 60.2, end: 60.76 },
  { word: "me", start: 60.76, end: 61.7 },

  // Wherever I go (using Whisper: 63.36s - adjusted to "Wherever")
  { word: "Wherever", start: 63.36, end: 64.76 },
  { word: "I", start: 64.76, end: 65.7 },
  { word: "go", start: 65.7, end: 66.32 },

  // You'll always be next to me (using Whisper: 66.32s)
  { word: "you'll", start: 66.32, end: 68.48 },
  { word: "always", start: 68.48, end: 69.1 },
  { word: "be", start: 69.1, end: 69.6 },
  { word: "next", start: 69.6, end: 70.34 },
  { word: "to", start: 70.34, end: 70.8 },
  { word: "me", start: 70.8, end: 71.78 },

  // Fall into the night (using Whisper: 108.96s)
  { word: "Fall", start: 108.96, end: 110.36 },
  { word: "into", start: 110.36, end: 111.04 },
  { word: "the", start: 111.04, end: 111.7 },
  { word: "night", start: 111.7, end: 112.54 },

  // As I gaze into you (using Whisper "The side gets into you" 114.76s - adjusted)
  { word: "As", start: 114.76, end: 116.16 },
  { word: "I", start: 116.16, end: 116.88 },
  { word: "gaze", start: 116.88, end: 117.62 },
  { word: "into", start: 117.62, end: 118.5 },
  { word: "you", start: 118.5, end: 120.84 },

  // Shine so bright (using Whisper "Shines so bright" 122.36s)
  { word: "Shine", start: 122.36, end: 123.76 },
  { word: "so", start: 123.76, end: 124.42 },
  { word: "bright", start: 124.42, end: 126.04 },

  // It's all I do (using Whisper: 128.66s)
  { word: "It's", start: 128.66, end: 130.06 },
  { word: "all", start: 130.06, end: 130.46 },
  { word: "I", start: 130.46, end: 131.02 },
  { word: "do", start: 131.02, end: 131.8 },

  // I wish I could live without you (using Whisper: 133.82s)
  { word: "I", start: 133.82, end: 135.22 },
  { word: "wish", start: 135.22, end: 136.2 },
  { word: "I", start: 136.2, end: 136.9 },
  { word: "could", start: 136.9, end: 137.8 },
  { word: "live", start: 137.8, end: 138.42 },
  { word: "without", start: 138.42, end: 139.74 },
  { word: "you", start: 139.74, end: 140.7 },

  // But you're a part of me (using Whisper: 140.9s)
  { word: "But", start: 140.9, end: 141.02 },
  { word: "you're", start: 141.02, end: 141.8 },
  { word: "a", start: 141.8, end: 142.52 },
  { word: "part", start: 142.52, end: 142.52 },
  { word: "of", start: 142.52, end: 142.52 },
  { word: "me", start: 142.52, end: 142.52 },

  // Wherever I go (using Whisper: 146.52s)
  { word: "Wherever", start: 146.52, end: 147.92 },
  { word: "I", start: 147.92, end: 148.98 },
  { word: "go", start: 148.98, end: 149.86 },

  // You'll always be next to me (using Whisper: 150.08s)
  { word: "you'll", start: 150.08, end: 151.68 },
  { word: "always", start: 151.68, end: 152.28 },
  { word: "be", start: 152.28, end: 152.78 },
  { word: "next", start: 152.78, end: 153.52 },
  { word: "to", start: 153.52, end: 154.06 },
  { word: "me", start: 154.06, end: 161.74 },

  // You'll always be next to me (repetitions using Whisper timestamps)
  { word: "You'll", start: 163.54, end: 164.46 },
  { word: "always", start: 164.46, end: 164.92 },
  { word: "be", start: 164.92, end: 165.1 },
  { word: "next", start: 165.1, end: 165.56 },
  { word: "to", start: 165.56, end: 165.84 },
  { word: "me", start: 165.84, end: 166.4 },

  { word: "You'll", start: 169.9, end: 170.82 },
  { word: "always", start: 170.82, end: 171.24 },
  { word: "be", start: 171.24, end: 171.42 },
  { word: "next", start: 171.42, end: 171.92 },
  { word: "to", start: 171.92, end: 172.22 },
  { word: "me", start: 172.22, end: 173.64 },

  { word: "You'll", start: 173.64, end: 174.16 },
  { word: "always", start: 174.16, end: 177.62 },
  { word: "be", start: 177.62, end: 177.84 },
  { word: "next", start: 177.84, end: 178.3 },
  { word: "to", start: 178.3, end: 178.62 },
  { word: "me", start: 178.62, end: 179.62 },

  { word: "You'll", start: 182.68, end: 183.6 },
  { word: "always", start: 183.6, end: 184.04 },
  { word: "be", start: 184.04, end: 184.26 },
  { word: "next", start: 184.26, end: 184.74 },
  { word: "to", start: 184.74, end: 185.08 },
  { word: "me", start: 185.08, end: 186.08 },

  { word: "You'll", start: 212.64, end: 214.04 },
  { word: "always", start: 214.04, end: 214.04 },
  { word: "be", start: 214.04, end: 214.04 },
  { word: "next", start: 214.04, end: 214.04 },
  { word: "to", start: 214.04, end: 214.04 },
  { word: "me", start: 214.04, end: 215.0 },
];
