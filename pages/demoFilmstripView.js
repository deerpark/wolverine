import React from 'react';
import { FilmstripView } from '@atlaskit/media-filmstrip';

class FilmstripViewExample extends React.Component {
  state = {
    animate: false,
    offset: 0,
  };

  handleSizeChange = ({ offset }) => this.setState({ offset });

  handleScrollChange = ({ animate, offset }) =>
    this.setState({ animate, offset });

  render() {
    const { animate, offset, children } = this.state;
    return (
      <FilmstripView
        animate={animate}
        offset={offset}
        onSize={this.handleSizeChange}
        onScroll={this.handleScrollChange}
      >
        <div><img src="https://cdn.dribbble.com/users/19104/screenshots/921885/donation_cause_dribbble.png"/></div>
        <div><img src="https://cdn.dribbble.com/users/1089129/screenshots/4038190/mochrpratama_shotquotesearch.jpg"/></div>
        <div><img src="https://cdn.dribbble.com/users/19472/screenshots/380163/dribz.jpg"/></div>
        <div><img src="https://cdn.dribbble.com/users/55336/screenshots/950667/faction-ui-kit-_2x_1x.png"/></div>
        <div><img src="https://cdn.dribbble.com/users/7253/screenshots/141735/darkui.png"/></div>
      </FilmstripView>
    );
  }
}

export default FilmstripViewExample;

