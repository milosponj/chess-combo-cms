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

export const CustomRangeSlider: React.FC<Props> = ({
  range,
  numberOfMoves,
  setSliderValues,
}: Props) => {
  const onSliderChange = (values: number[]) => {
    setSliderValues({ min: values[0], max: values[1] });
  };

  return (
    <div>
      <RangeSlider
        defaultValue={[range.min, range.max]}
        mt={"4"}
        min={0}
        max={numberOfMoves}
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
