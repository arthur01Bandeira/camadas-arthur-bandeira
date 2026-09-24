import { CompanyRepository } from '../repositories/company.repository'
import { EmployeeRepository } from '../repositories/employee.repository'
import { NewCompany } from '../dtos/company.dtos'
import { NotFound, RuleViolation } from '../errors'

export class CompanyService {
  constructor(
    private companyRepo: CompanyRepository,
    private employeeRepo: EmployeeRepository
  ) {}

  getAll() {
    return this.companyRepo.findAll()
  }

  getById(id: number) {
    const company = this.companyRepo.findById(id)

    if (!company) {
      throw new NotFound('company')
    }

    return company
  }

  create(data: NewCompany) {
    const existing = this.companyRepo.findByCnpj(data.cnpj)

    if (existing) {
      throw new RuleViolation('cnpj already exists')
    }

    return this.companyRepo.save(data)
  }

  delete(id: number) {
    const company = this.companyRepo.findById(id)

    if (!company) {
      throw new NotFound('company')
    }

    const employees = this.employeeRepo.findByCompany(id)

    if (employees.length > 0) {
      throw new RuleViolation(
        'cannot delete company with employees'
      )
    }

    this.companyRepo.delete(id)
  }
}