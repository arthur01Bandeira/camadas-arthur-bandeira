import { Request, Response } from 'express'
import { EmployeeService } from '../services/employee.service'
import { employeeDTO } from '../dtos/employee.dto'

export class EmployeeController {
  constructor(private service: EmployeeService) {}

  create = (req: Request, res: Response) => {
    const data = employeeDTO(req.body)

    const employee = this.service.create(data)

    res.status(201).json(employee)
  }

  findByCompany = (req: Request, res: Response) => {
    const companyId = Number(req.params.id)

    const employees = this.service.findByCompany(companyId)

    res.status(200).json(employees)
  }
}