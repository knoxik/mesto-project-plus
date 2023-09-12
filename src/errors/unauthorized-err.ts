import { UNAUTHORIZED_CODE } from './constrants';

export default class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    (this as any).statusCode = UNAUTHORIZED_CODE;
  }
}
