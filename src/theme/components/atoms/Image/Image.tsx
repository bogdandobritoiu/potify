import { StaticImageData } from "next/image";
import React, { memo } from "react";
import { ViewStyle } from "react-native";
import FastImage, {
  Priority,
  ResizeMode,
  Source,
} from "react-native-fast-image";

interface Props {
  source?: StaticImageData | string | null;
  uri?: Source["uri"] | null;
  width?: string | number;
  height?: string | number;
  priority?: Priority | boolean;
  cache?: "web" | "cacheOnly" | "immutable";
  resizeMode?: ResizeMode;
  objectFit?: string;
  objectPosition?: string;
  layout?: string;
  style?: ViewStyle;
  onReady?: () => void;
}

export const Image = memo(
  ({
    source,
    uri,
    width,
    height,
    cache,
    priority = FastImage.priority.high,
    resizeMode,
    style,
    onReady,
  }: Props) => (
    <FastImage
      style={{ width, height, ...style }}
      // @ts-ignore
      source={
        source ?? {
          uri,
          priority,
          cache,
        }
      }
      resizeMode={resizeMode}
      onLoadEnd={onReady}
    />
  )
);
