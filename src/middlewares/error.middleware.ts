import { Request, Response, NextFunction } from 'express'
import {
  InvalidInput,
  NotFound,
  RuleViolation
} from '../errors'

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof InvalidInput) {
    return res.status(400).send(err.message)
  }

  if (err instanceof NotFound) {
    return res.status(404).send(err.message)
  }

  if (err instanceof RuleViolation) {
    return res.status(422).send(err.message)
  }

  console.error(err)
  return res.status(500).send('internal server error')
}