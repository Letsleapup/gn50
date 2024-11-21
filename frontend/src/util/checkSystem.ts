interface NavigatorUAData {
  platform: string;
  brands: { brand: string; version: string }[];
  mobile: boolean;
}

export function getAgentSystem(): string {
  if (!("navigator" in window)) {
    return "unknown";
  }

  // 타입 설정: 'Navigator' 인터페이스를 확장해 'userAgentData'를 포함합니다.
  const platform: string | undefined = (navigator as Navigator & { userAgentData?: NavigatorUAData }).userAgentData?.platform 
    || navigator.platform?.toLowerCase();

  if (platform?.toLocaleLowerCase().startsWith("win")) return "windows";
  if (platform?.toLocaleLowerCase().startsWith("mac")) return "macos";
  if (platform?.toLocaleLowerCase().startsWith("linux")) return "linux";
  if (platform?.toLocaleLowerCase().includes("iphone") || platform?.includes("ipad")) return "ios";
  if (platform?.toLocaleLowerCase().includes("android")) return "android";

  return "unknown";
}
