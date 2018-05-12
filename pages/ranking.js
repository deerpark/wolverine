import React, { Component } from 'react'
import axios from 'axios'
class Ranking extends React.Component {

    static async getInitialProps ({ query: { lang, adult, date } }) {
        const response = await axios.get(`https://top20-dot-lezhincomix-novel.appspot.com/v2/top20/${lang}/${adult}`);
        return {
            date,
            rankData: response.data
        }
    }

    render() {
        const { rankData } = this.props;

        const rankList = rankData.data.rankData[this.props.date].map(
          (rank, index) => <li key={index}>{index}. {rankData.data.comics[rank].title}</li>
        )
        
        return (
            <ul>
                {rankList}
            </ul>
        );
    }
}

export default Ranking;

