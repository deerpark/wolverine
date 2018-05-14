import dynamic from 'next/dynamic'

const Demo = dynamic(
  {
    modules: props => {
      console.dir(props);
      const components = {
        Card: import('../components/demo/card'),
        DropListDemo: import('../components/demo/droplist')
      }
      return components
    },
    render: (props, { Card, DropListDemo }) => (
      <>
        {props.name}
        <Card />
        <DropListDemo />
      </>
    ),
    ssr: false,
    loading: () => <p>...</p>
  }
)

export default ({ name }) => <Demo name={<div>{name}</div>} />;
