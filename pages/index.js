import dynamic from 'next/dynamic'
import Layout from '../components/layout'
import Link from 'next/link'

const Index = dynamic({
  modules: props => {
    const components = {
      Hello1: import('./_'),
    }
    return components
  },
  ssr: false,
  render: (props) =>
    <>
      <Layout query={{
        query: {
          lang: 'ko-KR',
          adult: 'all',
          date: '20161109'
        } }}>
        <p className="loading"><a href="/ranking">랭킹 보기</a>...</p>
      </Layout>
    </>
})
export default () => <Index />

