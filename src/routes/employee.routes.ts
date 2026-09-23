import { Router } from 'express'
import { EmployeeController } from '../controllers/employee.controller'

export function employeeRoutes(
  controller: EmployeeController
): Router {
  const router = Router()

  router.post(
    '/employees',
    controller.create
  )

  router.get(
    '/companies/:id/employees',
    controller.findByCompany
  )

  return router
}