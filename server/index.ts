import express from "express";
import cors from "cors";
import initializeDatabase from "./db";
import { groupDealsByStatus, OrganizationDeal } from "./src/data/deal.types";

const app = express();
const port = process.env.PORT || 3000;

/**
 * Welcome to the Fullstack Challenge for the Server!
 *
 * This is a basic express server.
 * You can customize and organize it to your needs.
 * Good luck!
 */
const db = initializeDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/organizations", (req, res) => {
  const rows = db.prepare("SELECT * FROM organization").all();
  res.json({ rows });
});

// Pass org id in request params
app.get("/deals/:organizationId", (req, res) => {
  const organizationId = req.params.organizationId;

  // This isn't very robust validation. I'm just checking for a non decimal number right now.
  if (!/^\d+$/.test(organizationId)) {
    res.status(400).json({ error: "Invalid organization ID" });
  }

  const rows = db.prepare(
    `
    SELECT
      o.id as organization_id,
      o.name as organization,
      a.id as account_id,
      a.name as account,
      ds.name as status,
      d.value,
      d.start_date,
      d.end_date
    FROM deal d
    JOIN organization o
      ON o.id = d.organization_id
    JOIN account a
      ON a.id = d.account_id
    JOIN deal_status ds
      ON ds.id = d.status_id
    WHERE organization_id = @orgId
  `
  ).all({ orgId: organizationId }) as OrganizationDeal[];

  // Group each deal by status.
  // This could potentially be done with a more complex sql query instead.
  const groupedDeals = groupDealsByStatus(rows);

  res.json({ data: groupedDeals });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
