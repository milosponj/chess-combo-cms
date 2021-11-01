import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/slider";
import React from "react";

interface Props {
  range: { min: number; max: number };
  numberOfMoves: number;
  setSliderValues: any;
}

export const CustomRangeSlider: React.FC<Props> = (props: Props) => {
  const onSliderChange = (values: number[]) => {
    props.setSliderValues({ min: values[0], max: values[1] });
  };

  return (
    <div>
      <RangeSlider
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-label={["min", "max"]}
        defaultValue={[props.range.min, props.range.max]}
        mt={"4"}
        min={0}
        max={props.numberOfMoves}
        step={1}
        onChangeEnd={(value) => onSliderChange(value)}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </div>
  );
};
