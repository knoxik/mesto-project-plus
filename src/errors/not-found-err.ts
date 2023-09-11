import { NOT_FOUND_CODE } from './constrants';

export default class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    (this as any).statusCode = NOT_FOUND_CODE;
  }
}
