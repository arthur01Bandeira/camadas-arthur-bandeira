import Database from 'better-sqlite3'

export class CompanyRepository {
  constructor(private db: Database.Database) {}

  findById(id: number) {
    return this.db
      .prepare('SELECT * FROM companies WHERE id = ?')
      .get(id) as any
  }

  findByCnpj(cnpj: string) {
    return this.db
      .prepare('SELECT * FROM companies WHERE cnpj = ?')
      .get(cnpj) as any
  }

  findAll() {
    return this.db
      .prepare('SELECT * FROM companies ORDER BY name')
      .all() as any[]
  }

  save(company: {
    name: string
    cnpj: string
    state: string
  }) {
    const result = this.db
      .prepare(`
        INSERT INTO companies (name, cnpj, state)
        VALUES (?, ?, ?)
      `)
      .run(
        company.name,
        company.cnpj,
        company.state
      )

    return this.findById(Number(result.lastInsertRowid))
  }

  delete(id: number) {
    this.db
      .prepare('DELETE FROM companies WHERE id = ?')
      .run(id)
  }
}