import Database from 'better-sqlite3'

export class CompanyRepository {
  constructor(private db: Database.Database) {}

  findById(id: number) {
    return this.db
      .prepare('SELECT * FROM companies WHERE id = ?')
      .get(id) as any
  }
}