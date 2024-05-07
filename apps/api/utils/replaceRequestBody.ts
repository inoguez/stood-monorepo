import { Request } from 'express';

export function replaceRequestBody(req: Request, newBody: Object) {
  const newReq = Object.assign({}, req, { body: newBody });
  return newReq;
}
