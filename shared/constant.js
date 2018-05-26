export const DATE = {
  YEAR: [
    '2013', '2014', '2015', '2016', '2017', '2018',
  ],
  MONTH: [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
  ],
  DAY: [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ]
}

export const LOCALES = [
  { value: 'ko-KR', label: '대한민국' },
  { value: 'ja-JP', label: '日本' },
  { value: 'en-US', label: 'United States' }
]

export const RATINGLINKS = [
  { ratings: 'kid', label: {
    'ko-KR': '전연령',
    'ja-JP': '全年齢',
    'en-US': 'All ages',
  }, id: 1, active: true },
  {
    ratings: 'all', label: {
      'ko-KR': '완전판',
      'ja-JP': '完全版',
      'en-US': 'Full version',
    }, id: 3, active: true },
]

const CONSTANT = {
  DATE,
  LOCALES,
  RATINGLINKS
}

export default CONSTANT;
