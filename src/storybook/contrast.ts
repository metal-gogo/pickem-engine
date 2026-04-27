interface RgbColor {
  alpha: number;
  blue: number;
  green: number;
  red: number;
}

interface ContrastOptions {
  minimumRatio?: number;
}

interface ContrastFailure {
  ratio: number;
  requiredRatio: number;
  tagName: string;
  text: string;
}

const LARGE_TEXT_RATIO = 3;
const NORMAL_TEXT_RATIO = 4.5;

function parseRgbColor(value: string): RgbColor | null {
  const match = value.match(/^rgba?\((.+)\)$/);

  if (!match) {
    return null;
  }

  const channels = match[1]!
    .split(",")
    .map((channel) => channel.trim())
    .filter(Boolean);

  if (channels.length < 3) {
    return null;
  }

  return {
    red: Number.parseFloat(channels[0]!),
    green: Number.parseFloat(channels[1]!),
    blue: Number.parseFloat(channels[2]!),
    alpha: channels[3] === undefined ? 1 : Number.parseFloat(channels[3]),
  };
}

function blendColor(foreground: RgbColor, background: RgbColor): RgbColor {
  const alpha = foreground.alpha + background.alpha * (1 - foreground.alpha);

  if (alpha === 0) {
    return { red: 0, green: 0, blue: 0, alpha: 0 };
  }

  return {
    red:
      (foreground.red * foreground.alpha +
        background.red * background.alpha * (1 - foreground.alpha)) /
      alpha,
    green:
      (foreground.green * foreground.alpha +
        background.green * background.alpha * (1 - foreground.alpha)) /
      alpha,
    blue:
      (foreground.blue * foreground.alpha +
        background.blue * background.alpha * (1 - foreground.alpha)) /
      alpha,
    alpha,
  };
}

function getFallbackBackground(): RgbColor {
  return document.documentElement.dataset.theme === "dark"
    ? { red: 23, green: 21, blue: 17, alpha: 1 }
    : { red: 255, green: 255, blue: 255, alpha: 1 };
}

function getEffectiveBackgroundColor(element: Element): RgbColor {
  const chain: Element[] = [];
  let current: Element | null = element;

  while (current) {
    chain.unshift(current);
    current = current.parentElement;
  }

  return chain.reduce((background, entry) => {
    const parsedColor = parseRgbColor(getComputedStyle(entry).backgroundColor);

    if (!parsedColor || parsedColor.alpha === 0) {
      return background;
    }

    return parsedColor.alpha >= 1 ? parsedColor : blendColor(parsedColor, background);
  }, getFallbackBackground());
}

function toLinearChannel(channel: number) {
  const scaled = channel / 255;

  return scaled <= 0.03928 ? scaled / 12.92 : Math.pow((scaled + 0.055) / 1.055, 2.4);
}

function getRelativeLuminance(color: RgbColor) {
  return (
    0.2126 * toLinearChannel(color.red) +
    0.7152 * toLinearChannel(color.green) +
    0.0722 * toLinearChannel(color.blue)
  );
}

function getContrastRatio(foreground: RgbColor, background: RgbColor) {
  const foregroundLuminance = getRelativeLuminance(foreground);
  const backgroundLuminance = getRelativeLuminance(background);
  const lightest = Math.max(foregroundLuminance, backgroundLuminance);
  const darkest = Math.min(foregroundLuminance, backgroundLuminance);

  return (lightest + 0.05) / (darkest + 0.05);
}

function getOwnText(element: Element) {
  return Array.from(element.childNodes)
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent ?? "")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function isVisibleElement(element: HTMLElement) {
  const style = getComputedStyle(element);
  const rect = element.getBoundingClientRect();

  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    Number.parseFloat(style.opacity) > 0 &&
    rect.width > 0 &&
    rect.height > 0
  );
}

function getRequiredRatio(element: HTMLElement, minimumRatio: number | undefined) {
  if (minimumRatio !== undefined) {
    return minimumRatio;
  }

  const style = getComputedStyle(element);
  const fontSize = Number.parseFloat(style.fontSize);
  const fontWeight = Number.parseInt(style.fontWeight, 10);
  const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);

  return isLargeText ? LARGE_TEXT_RATIO : NORMAL_TEXT_RATIO;
}

async function waitForPaint() {
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

export async function expectVisibleTextContrast(
  container: HTMLElement,
  { minimumRatio }: ContrastOptions = {},
) {
  await waitForPaint();

  const failures = Array.from(container.querySelectorAll<HTMLElement>("*"))
    .filter((element) => getOwnText(element).length > 0 && isVisibleElement(element))
    .map((element) => {
      const foreground = parseRgbColor(getComputedStyle(element).color);

      if (!foreground) {
        return null;
      }

      const ratio = getContrastRatio(foreground, getEffectiveBackgroundColor(element));
      const requiredRatio = getRequiredRatio(element, minimumRatio);

      return {
        ratio,
        requiredRatio,
        tagName: element.tagName.toLowerCase(),
        text: getOwnText(element),
      };
    })
    .filter(
      (result): result is ContrastFailure => result !== null && result.ratio < result.requiredRatio,
    );

  if (failures.length > 0) {
    const details = failures
      .slice(0, 8)
      .map(
        (failure) =>
          `${failure.tagName} "${failure.text.slice(0, 80)}" ${failure.ratio.toFixed(2)}:1, required ${failure.requiredRatio}:1`,
      )
      .join("\n");

    throw new Error(`Visible text contrast failed:\n${details}`);
  }
}
