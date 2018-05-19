import DropdownMenu, { Dropdown, DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';

const LANG = [
  { value: 'ko-KR', label: '한국' },
  { value: 'ja-JP', label: '日本' },
  { value: 'en-US', label: 'US' }
]

const getLanguageItem = (query) => {
  query = query || {}
  query.adult = query.adult || 'all'
  query.date = query.date || '20161109'
  const lang = LANG.map((lang, index) => {
    const isDisabled = query.lang === lang.value ? 'isDisabled' : ''
    return <DropdownItem className={isDisabled} href={`/ranking/${lang.value}/${query.adult}/${query.date}`} key={index}>{lang.label}</DropdownItem>
  })
  return lang
};

export default ({ query }) =>
  <>
    <DropdownMenu
      trigger={<i className="link fas fa-language" tabIndex="0" />}
      triggerType="default"
      shouldFlip={true}
      position="bottom right"
    >
      <DropdownItemGroup title="Language">
        {getLanguageItem(query)}
      </DropdownItemGroup>
    </DropdownMenu>
  </>