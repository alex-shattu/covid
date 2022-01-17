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
    <Path d="M7.03 9.97h4v8.92l2.01.03V9.97h3.99l-5-5Z" />
  </Svg>
);

export default SvgComponent;
