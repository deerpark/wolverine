import './ripple.scss'

const ripples = new Array(20)
ripples.fill('ripple')
const displayRipple = () => ripples.map((value, index) => <i className={`ripples__${index+1}`} key={index} />)
      
const Ripple = ({ query }) => (
  <div className="ripples">
    {displayRipple()}
  </div>
)

export default Ripple
