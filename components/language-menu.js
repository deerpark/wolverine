import DropdownMenu, { Dropdown, DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import { LOCALES } from '../shared/constant'

const getLocaleItems = (query, handleClickToLoad) => {
  const _localStorageQuery = JSON.parse(localStorage.query)
  const _query = _localStorageQuery ? _localStorageQuery : query
  const localeItems = LOCALES.map((locale, index) => {
    const isDisabled = query.locale === locale.value ? 'isDisabled' : ''
    return <DropdownItem className={isDisabled} onClick={() => handleClickToLoad(locale.value)} href={`/ranking/${locale.value}/${_query.ratings}/${_query.date}`} key={index}><i className={`flag ${locale.value}`} />{locale.label}</DropdownItem>
  })
  return localeItems
};

export default ({ query, handleClickToLoad }) =>
  <>
    <DropdownMenu
      trigger={<><i className={`link flag`} /> <i className="fas fa-caret-down" /></>}
    triggerType="default"
      shouldFlip={true}
      position="bottom right"
      className="select-lang"
    >
      <DropdownItemGroup title="Locales">
        {getLocaleItems(query, handleClickToLoad)}
      </DropdownItemGroup>
    </DropdownMenu>
  </>