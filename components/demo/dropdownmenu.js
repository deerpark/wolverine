import React from 'react';
import NoSSR from 'react-no-ssr'
import DropdownMenu, { DropdownItemGroup, DropdownItem } from '@atlaskit/dropdown-menu';

const Loading = () => (<div>Loading...</div>);
const DD = () => (
  <div>
    <NoSSR onSSR={<Loading />}>
      <DropdownMenu
        trigger="Choices"
        triggerType="button"
        shouldFlip={false}
        position="right middle"
        onOpenChange={e => console.log('dropdown opened', e)}
      >
        <DropdownItemGroup>
          <DropdownItem>Sydney</DropdownItem>
          <DropdownItem>Melbourne</DropdownItem>
        </DropdownItemGroup>
      </DropdownMenu>
    </NoSSR>
  </div>
)

export default DD
