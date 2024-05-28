export function createRadialGradientBackground(gradientStops: string[]): string {
  let gradientString = "radial-gradient(circle, ";

  const numStops = gradientStops.length;

  const stepPercentage = 100 / (numStops - 1);

  gradientStops.forEach((color, index) => {
    const percentage = stepPercentage * index;
    gradientString += `${color} ${percentage}%, `;
  });

  gradientString = gradientString.slice(0, -2) + ")";

  return gradientString;
}
