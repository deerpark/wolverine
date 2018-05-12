import * as React from 'react';
import { QuickSearch, ObjectResult, ContainerResult, ResultItemGroup } from '@atlaskit/quick-search';

class Example extends React.Component {
  
  render() {
    return (
      <QuickSearch
        isLoading={this.state.isLoading}
        onSearchInput={({ target }) => { this.search(target.value); }}
        value={this.state.query}
      >
        // render search results:
        <ResultItemGroup title="Issues">
          <ObjectResult name="Fix this and that" objectKey="JRA-123" /> 
          <ObjectResult name="More stuff" objectKey="JRA-124" /> 
        </ResultItemGroup>
        <ResultItemGroup title="Spaces">
          <ContainerResult name="Search and Smarts" /> 
        </ResultItemGroup>
      </QuickSearch>
    );
  }
}

export default () => <Example />;