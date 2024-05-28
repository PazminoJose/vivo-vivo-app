function adjustIntensity(r: number, g: number, b: number, factor: number): string {
  const newR = Math.min(255, Math.round(r * factor));
  const newG = Math.min(255, Math.round(g * factor));
  const newB = Math.min(255, Math.round(b * factor));
  return `rgb(${newR}, ${newG}, ${newB})`;
}

function getRandomBaseColor(): [number, number, number] {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return [r, g, b];
}

/**
 * Creates a random gradient for a heatmap layer with colors in the same palette.
 * @param numStops - The number of gradient stops to generate.
 * @returns An array of gradient stops for the heatmap.
 */
export function createRandomHeatmapGradient(numStops: number = 5): string[] {
  const gradientStops: string[] = ["rgba(0, 255, 255, 0)"];
  const step = 1 / (numStops - 1); // Ensure even distribution between 0 and 1
  const [baseR, baseG, baseB] = getRandomBaseColor();

  for (let i = 0; i < numStops; i++) {
    const factor = 0.5 + (0.5 * i) / (numStops - 1); // Increase factor from 0.5 to 1
    const color = adjustIntensity(baseR, baseG, baseB, factor);
    gradientStops.push(color);
  }

  return gradientStops;
}
