import { FORBIDDEN_CODE } from './constrants';

export default class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    (this as any).statusCode = FORBIDDEN_CODE;
  }
}
