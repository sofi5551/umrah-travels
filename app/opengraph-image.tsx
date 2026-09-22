import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Haramain Ways — Private Umrah Taxi Service in Saudi Arabia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B3D33",
          backgroundImage: "radial-gradient(circle at 50% 0%, #123f34 0%, #0B3D33 65%)",
        }}
      >
        <div
          style={{
            display: "flex",
            height: 120,
            width: 120,
            borderRadius: "50%",
            border: "4px solid #C6992E",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 44,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "#C6992E",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: -1,
          }}
        >
          Haramain Ways
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 28,
            textTransform: "uppercase",
            letterSpacing: 6,
            color: "#E7CE8C",
          }}
        >
          Private Umrah Taxi Service in Saudi Arabia
        </div>
      </div>
    ),
    { ...size }
  );
}
