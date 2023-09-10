class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    (this as any).statusCode = 400;
  }
}

module.exports = BadRequestError;
