import Database from "better-sqlite3";

function initializeDatabase() {
  const db = new Database("./database.sqlite", { verbose: console.log });
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS organizations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `
  ).run();

  // Adding account table
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS account (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `
  ).run();

  // Also creating a simple status table for possible deal statuses.
  // Would be worth having to store metadata like status descriptions.
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS deal_status (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL
    );
  `
  ).run();

  // Insert sample statuses
  db.prepare(
    `
    INSERT INTO deal_status (name, description)
    VALUES ('Build Proposal', 'Description of build proposal status'),
    ('Pitch Proposal', 'Description of pitch proposal status'),
    ('Negotiation', 'The negotiations were short'),
    ('In Progress', 'Processing sponsorship...'),
    ('Complete', 'All finished');
  `
  ).run();

  // Deals should have foreign keys to connect the account and organization they are part of
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS deal (
      organization_id INTEGER,
      account_id INTEGER,
      status_id INTEGER,
      value NUMERIC NOT NULL,
      start_date DATETIME,
      end_date DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(organization_id) REFERENCES organization(id),
      FOREIGN KEY(account_id) REFERENCES account(id),
      FOREIGN KEY(status_id) REFERENCES deal_status(id)
    );
  `
  ).run();

  return db;
}

export default initializeDatabase;
