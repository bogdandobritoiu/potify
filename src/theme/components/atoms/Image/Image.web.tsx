import NextImage, { ImageProps } from "next/image";
import { ViewStyle } from "react-native";

interface Props {
  height: string | number;
  layout?: ImageProps["layout"];
  objectPosition?: ImageProps["objectPosition"];
  resizeMode: ImageProps["objectFit"];
  source: any;
  priority?: ImageProps["priority"];
  uri?: string;
  alt?: string;
  lazy?: boolean;
  width: string | number;
  quality?: number;
  style?: ViewStyle;
  onReady?: () => void;
}

export const Image = ({
  alt,
  height,
  layout,
  objectPosition,
  resizeMode = "cover",
  source,
  uri,
  width,
  priority,
  quality,
  style,
  onReady,
}: Props) => {
  const src = typeof source === "string" ? source : uri || source?.src || "";
  if (src?.length)
    return (
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        objectFit={resizeMode}
        objectPosition={objectPosition}
        layout={layout}
        onLoad={onReady}
        unoptimized={true}
        placeholder="empty"
        quality={priority ? 100 : quality ?? 75}
        blurDataURL={src}
        style={style}
        priority={!!priority}
      />
    );

  return <img src={src} alt={alt} width={width} height={height} />;
};
