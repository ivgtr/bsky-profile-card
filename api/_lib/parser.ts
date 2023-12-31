import { VercelRequestQuery } from "@vercel/node";

export type OptionalColor =
  | "blue"
  | "yellow"
  | "pink"
  | "purple"
  | "orange"
  | "green"
  | "white"
  | "gradient";
export type OptionalType = "jpeg" | "png";
export type OptionalMode = "normal" | "dark" | "darkBlue";

export type Options = {
  handle: string;
  color: OptionalColor;
  bgColor?: OptionalColor;
  mode: OptionalMode;
  type: OptionalType;
  font: string;
};

export type RequestQueryOptions = {
  handle: string;
  color?: OptionalColor;
  bgColor?: OptionalColor;
  mode?: OptionalMode;
  type?: OptionalType;
  font?: string;
};

export const parseRequest = (
  query: VercelRequestQuery & RequestQueryOptions
) => {
  const {
    handle,
    color = "blue",
    bgColor,
    mode = "normal",
    type = "png",
    font = "Noto Sans JP",
  } = query;

  return { handle, color, bgColor, mode, type, font };
};
