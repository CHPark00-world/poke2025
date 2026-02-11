const INVALID_CREDENTIALS_MESSAGE = "이메일 혹은 비밀번호가 일치하지 않습니다.";

export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "auth/user-not-found": INVALID_CREDENTIALS_MESSAGE,
  "auth/wrong-password": INVALID_CREDENTIALS_MESSAGE,
  "auth/invalid-credential": INVALID_CREDENTIALS_MESSAGE,
  "auth/email-already-in-use": "이미 사용 중인 이메일입니다.",
  "auth/weak-password": "비밀번호는 6글자 이상이어야 합니다.",
  "auth/network-request-failed": "네트워크 연결에 실패 하였습니다.",
  "auth/invalid-email": "잘못된 이메일 형식입니다.",
  "auth/internal-error": "잘못된 요청입니다.",
};
