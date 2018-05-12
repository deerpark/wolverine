import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import TextField from '@atlaskit/field-text';
import { Provider, Card } from '@atlaskit/smart-card';

const params =
  typeof URLSearchParams !== 'undefined'
    ? new URLSearchParams(location.search.slice(1))
    : null;
const param = params ? params.get('url') : null;
const defaultURL = param
  ? param
  : 'https://velopert.com/3293';

class Example extends React.Component {
  state = {
    url: defaultURL,
  };

  handleUrlChange = (event) => {
    this.setState({ url: event.target.value });
  };

  render() {
    const { url } = this.state;
    return (
      <Provider>
        <Page>
          <Grid>
            <GridColumn>
              <TextField
                autoFocus={true}
                label="URL"
                shouldFitContainer={true}
                value={url}
                onChange={this.handleUrlChange}
              />
            </GridColumn>
          </Grid>
          <Grid>
            <GridColumn>
              <br />
              <Card url={url} />
            </GridColumn>
          </Grid>
        </Page>
      </Provider>
    );
  }
}

export default () => <Example />;