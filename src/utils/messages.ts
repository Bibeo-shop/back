export const messages = {
  isEmpty: (field: string) => `${field}을(를) 입력해주세요.`,
  isString: (field: string) => `${field}은(는) 문자열로 입력해주세요.`,
  isEmail: () => `올바른 이메일 형식이 아닙니다.`,
  minLength: (field: string, length: number) =>
    `${field}은(는) 최소 ${length}자리 이상이어야 합니다.`,
  maxLength: (field: string, length: number) =>
    `${field}은(는) 최대 ${length}자리까지 입력 가능합니다.`,
};
