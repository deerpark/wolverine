import moment from 'moment'

const DEFAULT_VALUES = {
  apiUrl: 'lezhincomix-api.appspot.com/v2',
  cdnUrl: 'cdn.lezhin.com/v2',
  query: {
    locale: 'ko-KR',
    ratings: 'kid',
    date: moment().format('YYMMDD')
  },
  now: Date.now()
};

const config = {
  values: DEFAULT_VALUES,

  set(options) {
    this.values = Object.assign({}, this.values, options)
  },

  get(name) {
    return this.values[name]
  },

  clear() {
    this.values = DEFAULT_VALUES
  }
};

export default config;
