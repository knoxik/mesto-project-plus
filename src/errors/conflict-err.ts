import { CONFLICT_CODE } from './constrants';

export default class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    (this as any).statusCode = CONFLICT_CODE;
  }
}
