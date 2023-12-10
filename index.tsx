import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Canvas, Group, Path, Shadow, Skia } from "@shopify/react-native-skia";

export type SemiDonutChartDataType = {
  color: string;
  value: number;
};

type SemiDonutChartType = {
  color: string;
  path: any;
  depthPath: any;
};

type SemiDonutChartStyleType = {
  canvas?: StyleProp<ViewStyle>;
};

type SemiDonutChartProps = {
  data?: SemiDonutChartDataType[];
  size?: number;
  depth?: number;
  shadow?: number;
  depthShadow?: number;
  style?: SemiDonutChartStyleType;
};

const DEGREE_START = 180;
const DEGREE_END = DEGREE_START;
const DEFAULT_HEGHT = 300;
const DEFAULT_WIDTH = 300;
const DEFAULT_SIZE = 60;
const DEFAULT_DEPTH = 60;
const DEFAULT_COLOR = "black";

const SemiDonutChart = (props: SemiDonutChartProps) => {
  if (props.data?.length === 0) {
    return;
  }

  const width = props.style?.canvas?.height
    ? props.style.canvas.height
    : DEFAULT_HEGHT;
  const height = props.style?.canvas?.width
    ? props.style.canvas.width
    : DEFAULT_WIDTH;

  const depth = props.depth ? props.depth : DEFAULT_DEPTH;
  const size = props.size ? props.size : DEFAULT_SIZE;

  const pathHeight = height - size * 2;
  const pathWidth = width - size * 2 + 10;
  const pathX = size - 5;
  const pathY = size;

  const templatePath = Skia.Path.Make();
  const templateTopPath = Skia.Path.Make();

  templatePath.addArc(
    {
      x: pathX,
      y: pathY,
      height: pathHeight - 25,
      width: pathWidth,
    },
    -DEGREE_START,
    DEGREE_END
  );

  templateTopPath.addArc(
    {
      x: pathX,
      y: pathY,
      height: pathHeight - 25,
      width: pathWidth,
    },
    -DEGREE_START,
    DEGREE_END
  );

  const total = props.data.reduce((res, d) => {
    return res + d.value;
  }, 0);

  let start = -DEGREE_START,
    end = 0;

  const data: SemiDonutChartType[] = props.data.map(
    (d: SemiDonutChartDataType) => {
      let color = d.color ? d.color : DEFAULT_COLOR;
      let depthPath = Skia.Path.Make();
      let path = Skia.Path.Make();

      start += end;
      end = DEGREE_START * (d.value / total);

      depthPath.addArc(
        {
          x: pathX,
          y: pathY,
          height: pathHeight,
          width: pathWidth,
        },
        start,
        end
      );

      path.addArc(
        {
          x: pathX - 10,
          y: pathY - 10,
          height: pathHeight + 20,
          width: pathWidth + 20,
        },
        start,
        end
      );

      return { color, path, depthPath };
    }
  );

  return (
    <Canvas style={[{ height, width }, props.style?.canvas]}>
      <Group>
        <Path
          path={templatePath}
          color={"#d2d2d2"}
          style="stroke"
          strokeWidth={size - 20}
        >
          <Shadow dx={2} dy={5} blur={11} color="#191919" />
        </Path>
        {data.map((d: SemiDonutChartType, i: number) => {
          return (
            <Path
              key={i}
              path={d.depthPath}
              color={d.color}
              style="stroke"
              strokeWidth={size}
            />
          );
        })}
      </Group>
      <Group>
        <Path
          path={templateTopPath}
          color={"#919191"}
          style="stroke"
          strokeWidth={(size - depth) / 8}
        >
          <Shadow dx={1} dy={4} blur={10} color="#191919" />
        </Path>
        {data.map((d: SemiDonutChartType, i: number) => {
          return (
            <Path
              key={i}
              path={d.path}
              color={d.color}
              style="stroke"
              strokeWidth={size - depth}
            />
          );
        })}
      </Group>
    </Canvas>
  );
};

export default SemiDonutChart;
