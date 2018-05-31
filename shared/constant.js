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
  /* {
    ratings: 'all', label: {
      'ko-KR': '완전판',
      'ja-JP': '完全版',
      'en-US': 'Full version',
    }, id: 3, active: true }, */
]

export const META = {
  'ko-KR': {
    name: '레진코믹스 랭킹',
    desc: '지나간 레진코믹스 랭킹을 확인하세요!',
    keyword: '웹툰,만화,코믹,무료,유료,Free,Webtoon,Comic,Comix,Manga',
    siteName: '레진코믹스',
    title: '레진코믹스 - 그때 그날! TOP 20',
    description: '레진코믹스 - 성숙한 독자를 위한 어른의 만화 서비스, 코믹스 콘텐츠의 프리미엄 채널. 모바일과 웹에서 즐기는 새로운 만화.',
    locale: 'ko_KR',
  },
  'ja-JP': {
    name: 'レジンコミックス ランキング',
    desc: '過ぎ去ったレジンコミックスランキングを確認してください！',
    keyword: 'ウェプマンガ,マンガ,コミック,無料,有料,Free,Webtoon,Comic,Comix,Manga',
    siteName: 'レジンコミックス',
    title: 'レジンコミックス - その日！TOP20',
    description: 'レジンコミックス-成熟した読者のための大人の漫画サービス, コミックスコンテンツのプレミアムチャンネル。モバイルでもwebでも楽しめる新しい漫画。',
    locale: 'ja_JP',
  },
  'en-US': {
    name: 'Lezhin Comics Ranking',
    desc: 'Check your rankings for Lezhin Comics!',
    keyword: 'Webcomics, Comic, Comics, Comix, Manga, Webtoons',
    siteName: 'Lezhin Comics',
    title: 'Lezhin Comics - That day! TOP 20',
    description: 'Lezhin Comics - Premium webtoons for mature audiences. A new online webcomic reading experience.',
    locale: 'en_US',
  },
}

const CONSTANT = {
  DATE,
  LOCALES,
  RATINGLINKS,
  META
}

export default CONSTANT;
