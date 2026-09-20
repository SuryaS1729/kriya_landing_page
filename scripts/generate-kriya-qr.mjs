import QRCode from "qrcode";
import { mkdir } from "node:fs/promises";

const downloadUrl = "https://kriya.bitwisedharma.com/download";
const outputDirectory = "generated-assets";

await mkdir(outputDirectory, { recursive: true });

await QRCode.toFile(`${outputDirectory}/kriya-download.png`, downloadUrl, {
  type: "png",
  width: 800,
  margin: 4,
  errorCorrectionLevel: "M",
  color: { dark: "#000000", light: "#ffffff" },
});

await QRCode.toFile(`${outputDirectory}/kriya-download.svg`, downloadUrl, {
  type: "svg",
  width: 800,
  margin: 4,
  errorCorrectionLevel: "M",
  color: { dark: "#000000", light: "#ffffff" },
});

console.log(`Generated QR assets for ${downloadUrl}`);
