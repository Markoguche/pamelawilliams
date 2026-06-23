 
import PropTypes from 'prop-types';

export default function MarqueeStrip({ text = 'PAMELA WILLIAMS', reverse = false }) {
  const repeated = Array(8).fill(text).join('  \u2726  ');

  return (
    <div className="py-5 border-y border-white/10 overflow-hidden bg-black">
      <div
        className="whitespace-nowrap text-white/10 text-6xl md:text-8xl font-black tracking-mega uppercase animate-marquee"
        style={{
          animationDirection: reverse ? 'reverse' : 'normal',
          animationDuration: '25s',
        }}
      >
        {repeated}  \u2726  {repeated}
      </div>
    </div>
  );
}

MarqueeStrip.propTypes = {
  text: PropTypes.string,
  reverse: PropTypes.bool,
};