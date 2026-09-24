import { EmployeeRepository } from '../repositories/employee.repository'
import { CompanyRepository } from '../repositories/company.repository'
import { NewEmployee } from '../dtos/employee.dto'
import { NotFound, RuleViolation } from '../errors'

const MINIMUM_SALARY = 1518
const INSS_RATE = 0.11

export class EmployeeService {
  constructor(
    private employeeRepo: EmployeeRepository,
    private companyRepo: CompanyRepository
  ) {}

  create(data: NewEmployee) {
    const company = this.companyRepo.findById(data.companyId)

    if (!company) {
      throw new NotFound('company')
    }

    if (data.salary < MINIMUM_SALARY) {
      throw new RuleViolation('salary below minimum wage')
    }

    const gross = data.salary
    const inss = gross * INSS_RATE
    const net = gross - inss

    return this.employeeRepo.save({
      name: data.name,
      email: data.email,
      grossSalary: gross,
      netSalary: net,
      companyId: data.companyId
    })
  }

  findByCompany(companyId: number) {
    return this.employeeRepo.findByCompany(companyId)
  }
}