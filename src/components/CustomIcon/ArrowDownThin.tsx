import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = ({
  width = 24,
  height = 24,
  color = '#000',
  ...props
}) => (
  <Svg
    viewBox="0 0 24 24"
    width={width}
    height={height}
    fill={color}
    {...props}>
    <Path d="M7.03,13.92H11.03V5L13.04,4.97V13.92H17.03L12.03,18.92Z" />
  </Svg>
);

export default SvgComponent;
