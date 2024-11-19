<<<<<<< Updated upstream
// util/koreanConverter.ts

// 초성, 중성, 종성 정의
const INITIALS = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const MEDIALS = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
const FINALS = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";

// 키보드 매핑
=======
<<<<<<< Updated upstream
=======
// util/koreanConverter.ts
import * as Hangul from "hangul-js";

>>>>>>> Stashed changes
>>>>>>> Stashed changes
const engToKor: { [key: string]: string } = {
  q: "ㅂ",
  w: "ㅈ",
  e: "ㄷ",
  r: "ㄱ",
  t: "ㅅ",
  y: "ㅛ",
  u: "ㅕ",
  i: "ㅑ",
  o: "ㅐ",
  p: "ㅔ",
  a: "ㅁ",
  s: "ㄴ",
  d: "ㅇ",
  f: "ㄹ",
  g: "ㅎ",
  h: "ㅗ",
  j: "ㅓ",
  k: "ㅏ",
  l: "ㅣ",
  z: "ㅋ",
  x: "ㅌ",
  c: "ㅊ",
  v: "ㅍ",
  b: "ㅠ",
  n: "ㅜ",
  m: "ㅡ",
  Q: "ㅃ",
  W: "ㅉ",
  E: "ㄸ",
  R: "ㄲ",
  T: "ㅆ",
};

<<<<<<< Updated upstream
// 한글 조합 함수
const combineHangul = (
  cho: string,
  jung: string,
  jong: string = ""
): string => {
  const choIndex = INITIALS.indexOf(cho);
  const jungIndex = MEDIALS.indexOf(jung);
  const jongIndex = jong ? FINALS.indexOf(jong) + 1 : 0;

  if (choIndex < 0 || jungIndex < 0) return cho + jung + jong;

  const code = 0xac00 + (choIndex * 21 + jungIndex) * 28 + jongIndex;
  return String.fromCharCode(code);
};

export const convertEngToKor = (text: string): string => {
  let result = "";
  let current = { cho: "", jung: "", jong: "" };

  // 영어를 한글 자모로 변환
  const chars = text.split("").map((char) => engToKor[char] || char);

  for (const char of chars) {
    if (INITIALS.includes(char)) {
      if (current.cho && current.jung) {
        // 이전 글자 완성
        result += combineHangul(current.cho, current.jung, current.jong);
        current = { cho: char, jung: "", jong: "" };
      } else if (!current.cho) {
        current.cho = char;
      } else {
        current.jong = char;
      }
    } else if (MEDIALS.includes(char)) {
      if (current.cho) {
        current.jung = char;
      } else {
        result += char;
      }
    } else {
      if (current.cho) {
        result += combineHangul(current.cho, current.jung, current.jong);
      }
      result += char;
      current = { cho: "", jung: "", jong: "" };
    }
  }

  // 마지막 글자 처리
  if (current.cho) {
    result += combineHangul(current.cho, current.jung, current.jong);
  }

  return result;
=======
export const convertEngToKor = (text: string): string => {
<<<<<<< Updated upstream
  return text
    .split("")
    .map((char) => engToKor[char] || char)
    .join("");
=======
  // 영어를 한글 자모로 변환
  const jamos: string[] = text.split("").map((char) => engToKor[char] || char);

  // 자모를 조합하여 완성된 한글로 변환
  return Hangul.assemble(jamos);
>>>>>>> Stashed changes
>>>>>>> Stashed changes
};
