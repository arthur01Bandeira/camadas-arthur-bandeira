export class InvalidInput extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidInput'
  }
}

export type NewEmployee = {
  name: string
  email: string
  salary: number
  companyId: number
}

export function employeeDTO(body: unknown): NewEmployee {
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
    typeof data.email !== 'string' ||
    !data.email.includes('@')
  ) {
    throw new InvalidInput('invalid email')
  }

  if (
    typeof data.salary !== 'number' &&
    typeof data.salary !== 'string'
  ) {
    throw new InvalidInput('invalid salary')
  }

  if (typeof data.companyId !== 'number') {
    throw new InvalidInput('invalid companyId')
  }

  return {
    name: data.name,
    email: data.email,
    salary: Number(data.salary),
    companyId: data.companyId
  }
}