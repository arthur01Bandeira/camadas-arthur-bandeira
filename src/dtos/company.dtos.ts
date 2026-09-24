import { InvalidInput } from '../errors'

export type NewCompany = {
  name: string
  cnpj: string
  state: string
}

export function companyDTO(body: unknown): NewCompany {
  if (!body || typeof body !== 'object') {
    throw new InvalidInput(['body'])
  }

  const data = body as Record<string, unknown>

  if (
    typeof data.name !== 'string' ||
    data.name.length < 3
  ) {
    throw new InvalidInput(['name'])
  }

  if (
    typeof data.cnpj !== 'string' ||
    !/^\d{14}$/.test(data.cnpj)
  ) {
    throw new InvalidInput(['cnpj'])
  }

  if (
    typeof data.state !== 'string' ||
    !/^[A-Za-z]{2}$/.test(data.state)
  ) {
    throw new InvalidInput(['state'])
  }

  return {
    name: data.name,
    cnpj: data.cnpj,
    state: data.state
  }
}