import React from "react";
import { SvgXml, SvgProps, XmlProps } from "react-native-svg";

interface ISVG extends XmlProps {}
export const SVG = (props: ISVG) => <SvgXml {...props} />;
