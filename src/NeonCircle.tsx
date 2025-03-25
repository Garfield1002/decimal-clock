// I want to create a circle of a given radius and color that can be either on or off

import React from "react";
import { BLACK, NEON_WIDTH } from "./constants";
interface NeonCircleProps {
  radius: number;
  color: string;
  isOn: boolean;
  bloom: string;
}

const NeonCircle: React.FC<NeonCircleProps> = ({
  radius,
  color,
  isOn,
  bloom,
}) => {
  return (
    <g>
      <circle
        cx={0}
        cy={0}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={NEON_WIDTH}
        opacity={isOn ? 1 : 0.3}
        filter={isOn ? bloom : undefined}
      />
      <circle
        cx={0}
        cy={0}
        r={radius + NEON_WIDTH / 2}
        fill="none"
        stroke={isOn ? color : BLACK}
        strokeWidth={1}
      />
      <circle
        cx={0}
        cy={0}
        r={radius - NEON_WIDTH / 2}
        fill="none"
        stroke={isOn ? color : BLACK}
        strokeWidth={1}
      />
    </g>
  );
};

export default NeonCircle;
