// I want a component that contains the decimal clock
// It should take the time as a prop and display the time using 110 neon circles:
// 10 groups of (10 white then 1 orange)
// We'll take care of the logic of the clock, you just need to create the component

import React from "react";
import NeonCircle from "./NeonCircle";
import { BASE, SEPARATOR, WHITE, ORANGE } from "./constants";

const one_to_ten = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/// A white neon circle
// it should take as a prop the radius and the isOn boolean
const WhiteSegment = ({ radius, isOn }: { radius: number; isOn: boolean }) => {
  return (
    <NeonCircle
      radius={radius}
      color={WHITE}
      isOn={isOn}
      bloom="url(#white-bloom)"
    />
  );
};
/// A orange neon circle
// it should take as a prop the radius and the isOn boolean
const OrangeSegment = ({ radius, isOn }: { radius: number; isOn: boolean }) => {
  return (
    <NeonCircle
      radius={radius}
      color={ORANGE}
      isOn={isOn}
      bloom="url(#orange-bloom)"
    />
  );
};

/// A group of 11 circles, 10 white then 1 orange
const GroupOf11Circles = ({
  radius,
  isWhiteOn,
  isOrangeOn,
}: {
  radius: number;
  isWhiteOn: boolean[];
  isOrangeOn: boolean;
}) => {
  return (
    <>
      {one_to_ten.map((isOn, index) => (
        <WhiteSegment
          key={index}
          radius={radius + index * SEPARATOR}
          isOn={isWhiteOn[isOn]}
        />
      ))}
      <OrangeSegment radius={radius + 10 * SEPARATOR} isOn={isOrangeOn} />
    </>
  );
};

interface ClockProps {
  time: number;
}

interface TimeArray {
  // Array of size 100
  whites: boolean[];

  // Array of size 10
  oranges: boolean[];
}

const time_to_array = (time: number): TimeArray => {
  // time represents the number of seconds since midnight
  const day_percentage = time / (60 * 60 * 24);

  // The way the clock works is that the each orange circle represents 1 / 10 th of the day
  // Orange bars fill up progressively so that at 30% of the day the 3 first orange circles are lit

  // This is an array of size 10, each element is a boolean that represents whether the corresponding orange circle is lit
  const orange_bars = Array.from({ length: 10 }, (_, i) => {
    return day_percentage >= (i + 1) / 10;
  });

  // The 100 white circles are all off except two
  const white_bars = Array.from({ length: 100 }, () => false);

  // The first white circle that is lit represents a 100th interval of progress between 2 orange circles
  // In other words it represents 1 / 1,000 of the day
  const first_white_circle_lit = Math.floor(day_percentage * 1000) % 100;
  white_bars[first_white_circle_lit] = true;

  // The second white circle that is lit represents a 100th interval of progress between 2 white circles
  // In other words it represents 1 / 10,000 of the day
  const second_white_circle_lit = Math.floor(day_percentage * 100000) % 100;
  white_bars[second_white_circle_lit] = true;

  return {
    whites: white_bars,
    oranges: orange_bars,
  };
};

const Clock: React.FC<ClockProps> = ({ time }) => {
  const { whites, oranges } = time_to_array(time);

  const max_radius = BASE + SEPARATOR * 110;

  return (
    <svg
      className="w-[80vw] h-[80vh] max-w-full max-h-full"
      viewBox={`-${max_radius} -${max_radius} ${2 * max_radius} ${
        2 * max_radius
      }`}
    >
      <defs>
        <filter
          id="orange-bloom"
          filterUnits="userSpaceOnUse"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur5" />
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="10"
            result="blur10"
          />
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="20"
            result="blur20"
          />
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="30"
            result="blur30"
          />
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="50"
            result="blur50"
          />
          <feMerge result="blur-merged">
            <feMergeNode in="blur10" />
            <feMergeNode in="blur20" />
            <feMergeNode in="blur30" />
            <feMergeNode in="blur50" />
          </feMerge>
          <feColorMatrix
            result="red-blur"
            in="blur-merged"
            type="matrix"
            values="1 0 0 0 0
                             0 0.06 0 0 0
                             0 0 0.44 0 0
                             0 0 0 1 0"
          />
          <feMerge>
            <feMergeNode in="red-blur" />
            <feMergeNode in="blur5" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter
          id="white-bloom"
          filterUnits="userSpaceOnUse"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur5" />
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="10"
            result="blur10"
          />
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="20"
            result="blur20"
          />
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="30"
            result="blur30"
          />
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="50"
            result="blur50"
          />
          <feMerge result="blur-merged">
            <feMergeNode in="blur10" />
            <feMergeNode in="blur20" />
            <feMergeNode in="blur30" />
            <feMergeNode in="blur50" />
          </feMerge>
          <feColorMatrix
            result="red-blur"
            in="blur-merged"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
          />
          <feMerge>
            <feMergeNode in="red-blur" />
            <feMergeNode in="blur5" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {one_to_ten.map((i) => (
        <GroupOf11Circles
          key={i}
          radius={BASE + 11 * i * SEPARATOR}
          isOrangeOn={oranges[i]}
          isWhiteOn={whites.slice(i * 10, (i + 1) * 10)}
        />
      ))}
    </svg>
  );
};

export default Clock;
