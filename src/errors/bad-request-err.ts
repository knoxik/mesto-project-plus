import { BAD_REQUEST_CODE } from './constrants';

export default class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    (this as any).statusCode = BAD_REQUEST_CODE;
  }
}
