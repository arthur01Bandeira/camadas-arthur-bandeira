import { Router } from 'express'
import { CompanyController } from '../controllers/company.controller'

export function companyRoutes(
  controller: CompanyController
): Router {
  const router = Router()

  router.get('/companies', controller.getAll)
  router.get('/companies/:id', controller.getById)
  router.post('/companies', controller.create)
  router.delete('/companies/:id', controller.delete)

  return router
}