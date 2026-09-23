import { InvalidInput } from './employee.dto'

export type NewCompany = {
  name: string
  cnpj: string
  state: string
}

export function companyDTO(body: unknown): NewCompany {
  if (!body || typeof body !== 'object') {
    throw new InvalidInput('invalid body')
  }

  const data = body as Record<string, unknown>

  if (
    typeof data.name !== 'string' ||
    data.name.length < 3
  ) {
    throw new InvalidInput('invalid name')
  }

  if (
    typeof data.cnpj !== 'string' ||
    !/^\d{14}$/.test(data.cnpj)
  ) {
    throw new InvalidInput('invalid cnpj')
  }

  if (
    typeof data.state !== 'string' ||
    !/^[A-Za-z]{2}$/.test(data.state)
  ) {
    throw new InvalidInput('invalid state')
  }

  return {
    name: data.name,
    cnpj: data.cnpj,
    state: data.state
  }
}