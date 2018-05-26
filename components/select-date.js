import DropdownMenu, { Dropdown, DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';
import { DATE } from '../shared/constant'
import util from '../shared/util'

const getDateItems = (type, handleClickDate, year, month) => {
  let date = DATE[type]
  if (type === 'DAY') {
    DATE[type][1] = util.getIntercalation(year, month)
    date = Array.from(Array(DATE[type][+month - 1]).keys())
  }
  const dateItems = date.map((value, index) => {
    value = type === 'DAY' ? value + 1 : value
    return <DropdownItem onClick={handleClickDate} data-type={type} data-value={value} key={index}>{value}</DropdownItem>
  })
  return dateItems
};

export default ({ label, type, handleClickDate, year = '2013', month = '05' }) =>
  <>
    <DropdownMenu
      trigger={<span>{label} <i className="fas fa-caret-down" /></span>}
      triggerType="default"
      shouldFlip={true}
      position="bottom center"
      className="select-date"
    >
      <DropdownItemGroup title={type}>
        {getDateItems(type, handleClickDate, year, month)}
      </DropdownItemGroup>
    </DropdownMenu>
  </>