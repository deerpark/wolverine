import React from 'react'
import NoSSR from 'react-no-ssr'
import CARD from '../components/demo/card'

export default class Demo extends React.Component {

  render() {
    const Loading = () => (<div>Loading...</div>);
    return (
        <NoSSR onSSR={<Loading />}>
            <CARD></CARD>
        </NoSSR>
    );
  }
}
