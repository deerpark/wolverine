const ripples = Array.from(Array(10).keys());
const displayRipple = () =>
  ripples.map((value, index) => (
    <i className={`ripples__${index + 1}`} key={index} />
  ));

const Ripple = ({ query }) => <div className="ripples">{displayRipple()}</div>;

export default Ripple;
