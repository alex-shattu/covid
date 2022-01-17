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
    <Path d="M15.41 16.58 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42Z" />
  </Svg>
);

export default SvgComponent;
