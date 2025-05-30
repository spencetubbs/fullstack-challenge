import Database from "better-sqlite3";

function initializeDatabase() {
  const db = new Database("./database.sqlite", { verbose: console.log });
  // Dropping and recreating these tables for now since this runs on every server startup.
  // Might add a function to seed the database separately so I can choose when to run that and avoid duplicate inserts.
  db.prepare(
    `
    DROP TABLE IF EXISTS deal;
  `
  ).run();
  db.prepare(
    `
    DROP TABLE IF EXISTS deal_status;
  `
  ).run();
  db.prepare(
    `
    DROP TABLE IF EXISTS organization;
  `
  ).run();
  db.prepare(
    `
    DROP TABLE IF EXISTS account;
  `
  ).run();

  // Adding organization table
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS organization (
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
  // Need to make sure the name is unique so duplicates aren't added.
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS deal_status (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
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
    ('Complete', 'All finished')
    ON CONFLICT DO NOTHING;
  `
  ).run();

  // Deals should have foreign keys to connect the account and organization they are part of.
  // It would make sense that orgs can have multiple deals with one account, so the foreign keys should allow duplicate combinations.
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS deal (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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

  // Seed test data
  db.prepare(
    `
    INSERT INTO organization (name)
    VALUES ('Sponsors R Us'),
    ('Sponsor Dealership'),
    ('Generic Sponsors');
  `
  ).run();

  db.prepare(
    `
    INSERT INTO account (name)
    VALUES ('Amazon'),
    ('Xbox'),
    ('Sony'),
    ('Dominos'),
    ('Ford');
  `
  ).run();

  // Could write a more complex query so there aren't hard coded ids here.
  db.prepare(
    `
    INSERT INTO deal (organization_id, account_id, status_id, value, start_date, end_date)
    VALUES (1, 1, 5, 180000, DATETIME('now', '-3 months'), DATETIME('now', '-1 months')),
    (1, 1, 1, 123000, CURRENT_TIMESTAMP, DATETIME('now', '+3 months')),
    (1, 2, 1, 55000, DATETIME('now', '-3 months'), DATETIME('now', '+3 months')),
    (1, 3, 2, 25000, CURRENT_TIMESTAMP, DATETIME('now', '+3 months')),
    (1, 4, 3, 18000, DATETIME('now', '-6 months'), DATETIME('now', '+1 months')),
    (1, 5, 3, 5000, CURRENT_TIMESTAMP, DATETIME('now', '+3 months')),
    (2, 4, 1, 18000, DATETIME('now', '-6 months'), DATETIME('now', '+1 months')),
    (2, 5, 2, 18000, DATETIME('now', '-6 months'), DATETIME('now', '+1 months')),
    (3, 2, 2, 18000, DATETIME('now', '-6 months'), DATETIME('now', '+1 months'));
  `
  ).run();

  return db;
}

export default initializeDatabase;
