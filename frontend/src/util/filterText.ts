export const filterTextByKorean = (text: string) => {
  return text.replace(/[^\uAC00-\uD7A3\u1100-\u11FF\u3131-\u318E0-9\s!@#$%^&*(),.?":{}|<>~`']/g, "");
};