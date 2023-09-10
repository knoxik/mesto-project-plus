class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    (this as any).statusCode = 404;
  }
}

module.exports = NotFoundError;
