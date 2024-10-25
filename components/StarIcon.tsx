import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface StarIconProps {
  size?: number;
  color?: string;
  style?: object;
  filled?: boolean;
}

export const StarIcon: React.FC<StarIconProps> = ({ 
  size = 16, 
  color = '#FFA000',
  style = {},
  filled = true
}) => (
  <Svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={filled ? color : 'none'}
    stroke={color}
    strokeWidth={filled ? '0' : '1.5'}
    style={style}
  >
    <Path 
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </Svg>
);

export default StarIcon;