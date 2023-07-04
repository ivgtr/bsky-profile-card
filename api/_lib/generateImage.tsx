import satori from "satori";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import type { PersonalData } from "./getBskyData";
import type { OptionalColor, OptionalMode, Options } from "./parser";

export const generateImage = async (
  personalData: PersonalData,
  options: Options
): Promise<Buffer> => {
  const font = fs.readFileSync(
    path.join(process.cwd(), "./fonts/NotoSansJP-Regular.ttf")
  );

  const color: { [key in OptionalColor]: string } = {
    blue: "#1b95e0",
    yellow: "#ffad1f",
    pink: "#e0245e",
    purple: "#794bc4",
    orange: "#f45d22",
    green: "#17bf63",
    white: "#fff",
    gradient:
      "linear-gradient(-45deg, #40e0d0, #41e081, #e0d041, #ff8c00, #ff0080, #d041e0)",
  };

  const mode: { [key in OptionalMode]: { color: string; bgColor: string } } = {
    normal: {
      color: "#333",
      bgColor: "#fff",
    },
    dark: {
      color: "#fff",
      bgColor: "#111",
    },
    darkBlue: {
      color: "#fff",
      bgColor: "#15202b",
    },
  };

  const svg = await satori(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: `${mode[options.mode].bgColor}`,
        color: `${mode[options.mode].color}`,
        fontSize: "62.5%",
        fontFamily: options.font,
      }}
    >
      <div
        style={{
          display: "flex",
          height: "33%",
          width: "100%",
        }}
      >
        <img
          src={personalData.bannerUrl}
          width={1200}
          height={210}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "200px",
            height: "200px",
            borderRadius: 9999,
            background: `${
              options.bgColor
                ? color[options.bgColor]
                : mode[options.mode].bgColor
            }`,
            marginTop: "-130px",
          }}
        >
          <img
            src={personalData.imageUrl}
            width={180}
            height={180}
            style={{
              borderRadius: 9999,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            marginTop: "-10px",
          }}
        >
          <p
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {personalData.displayName}
          </p>
          <p
            style={{
              marginTop: "-5px",
              fontSize: "28px",
              fontWeight: "100",
              opacity: "0.8",
            }}
          >{`@${personalData.handle}`}</p>
          <p
            style={{
              marginTop: "5px",
              fontSize: "26px",
              lineHeight: "1.2em",
            }}
          >
            {personalData.description}
          </p>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: "0",
          bottom: "0",
          display: "flex",
          whiteSpace: "nowrap",
          padding: "15px 30px",
        }}
      >
        <p style={{ fontSize: "26px" }}>
          {`posts: ${personalData.postsCount} / follows: ${personalData.followsCount} / followers: ${personalData.followersCount}`}
        </p>
      </div>
    </div>,
    {
      width: 840,
      height: 630,
      fonts: [
        {
          name: "Noto Sans JP",
          data: font,
          style: "normal",
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return png;
};
