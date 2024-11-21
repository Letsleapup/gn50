export const getByteLength = (str: string) => {
  let byteLength = 0;

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode <= 0x007f) {
      byteLength += 1; // 1바이트 문자
    } else if (charCode <= 0x07ff) {
      byteLength += 2; // 2바이트 문자
    } else if (charCode <= 0xffff) {
      byteLength += 3; // 3바이트 문자
    } else {
      byteLength += 4; // 4바이트 문자 (이모지)
    }
  }
  return byteLength;
};