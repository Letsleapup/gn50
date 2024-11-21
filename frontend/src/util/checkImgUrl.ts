// 이미지 파일 경로 체크
//@2x파일의 경우 인식해서, 2x 폴더에 있는 파일을 반환
export const checkByOsImgUrl = (os: string, img_name: string) => {
  if ((os === "windows" || os === "macos") && img_name.includes("@2x")) {
    console.log("2x");
    return `/asset/2x/${img_name}`;
  }
  console.log("1x");
  return `/asset/${img_name}`;
};
