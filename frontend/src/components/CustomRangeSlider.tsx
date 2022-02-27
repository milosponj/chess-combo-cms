import { Range, getTrackBackground } from "react-range";
import React from "react";
import { Flex } from "@chakra-ui/layout";

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
    console.log("values",values)
    setSliderValues({ min: values[0], max: values[1] });
  };

  return (
    <Flex mt={12} direction="column">
      <Range
        step={1}
        min={0}
        max={numberOfMoves}
        values={[range.min, range.max]}
        onChange={(values) => onSliderChange(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "1px",
                width: "100%",
                borderRadius: "0px",
                background: getTrackBackground({
                  values: [range.min, range.max],
                  colors: ["#666", "#e1c984", "#666"],
                  min: 0,
                  max: numberOfMoves,
                  rtl: false,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "12px",
              width: "12px",
              borderRadius: "0px",
              borderWidth: "0px",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-36px",
                color: "#fff",
                fontSize: "12px",
                padding: "4px",
                borderRadius: "0px",
                borderWidth: "1px",
                borderColor: "#333",
                backgroundColor: "black",
              }}
            >
              {[range.min, range.max][index]}
            </div>
            <div
              style={{
                height: "10px",
                width: "10px",
                backgroundColor: isDragged ? "#e1c984" : "#999",
              }}
            />
          </div>
        )}
      />
    </Flex>
  );
};
