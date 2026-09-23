import { Request, Response } from 'express'
import { CompanyService } from '../services/company.service'
import { companyDTO } from '../dtos/company.dto'

export class CompanyController {
  constructor(private service: CompanyService) {}

  getAll = (req: Request, res: Response) => {
    const companies = this.service.getAll()

    res.status(200).json(companies)
  }

  getById = (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const company = this.service.getById(id)

    res.status(200).json(company)
  }

  create = (req: Request, res: Response) => {
    const data = companyDTO(req.body)

    const company = this.service.create(data)

    res.status(201).json(company)
  }

  delete = (req: Request, res: Response) => {
    const id = Number(req.params.id)

    this.service.delete(id)

    res.status(204).end()
  }
}