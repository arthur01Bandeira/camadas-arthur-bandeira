import Database from 'better-sqlite3'

export class EmployeeRepository {
  constructor(private db: Database.Database) {}

  findById(id: number) {
    return this.db
      .prepare('SELECT * FROM employees WHERE id = ?')
      .get(id) as any
  }

  findByCompany(companyId: number) {
    return this.db
      .prepare('SELECT * FROM employees WHERE company_id = ?')
      .all(companyId) as any[]
  }

  save(employee: {
    name: string
    email: string
    grossSalary: number
    netSalary: number
    companyId: number
  }) {
    const result = this.db
      .prepare(`
        INSERT INTO employees
          (name, email, gross_salary, net_salary, company_id)
        VALUES (?, ?, ?, ?, ?)
      `)
      .run(
        employee.name,
        employee.email,
        employee.grossSalary,
        employee.netSalary,
        employee.companyId
      )

    return this.findById(Number(result.lastInsertRowid))
  }
}