const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
const createConnectionPool = require("./db");
const db = createConnectionPool();

app.post("/approval", async (req, res) => {
  try {
    const { name, phone, headcount, department, staff, reason, picture } =
      req.body;

    // Get staffId from faculty table based on staff name
    const [facultyRow] = await db.query(
      "SELECT id FROM faculty WHERE name = ?",
      [staff]
    );

    const staffId = facultyRow[0].id;

    // Get current time for inTime
    const inTime = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Insert form data into approval table
    await db.query(
      "INSERT INTO approval (picture, name, mobileNumber, headcount, department, staffName, staffId, reason, inTime, outTime, exitApproval) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, 0)",
      [
        picture,
        name,
        phone,
        headcount,
        department,
        staff,
        staffId,
        reason,
        inTime,
      ]
    );

    res.json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/staff", async (req, res) => {
  const { department } = req.body; // Corrected variable name

  try {
    const query = "SELECT name FROM faculty WHERE dept = ?";
    const [rows] = await db.query(query, [department]);
    const staffNames = rows.map((row) => row.name);
    res.json(staffNames);
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/admin", async (req, res) => {
  const { staffName } = req.body; // Corrected variable name

  try {
    const query =
      "SELECT picture,name,headcount,reason, id, exitApproval FROM approval WHERE staffName = ?";
    const [data] = await db.query(query, [staffName]);
    const visitorNames = data.map((row) => row.name);
    const visitorPics = data.map((row) => row.picture);
    const headcnts = data.map((row) => row.headcount);
    const visitorReasons = data.map((row) => row.reason);
    const id = data.map((row) => row.id);
    const exitApproval = data.map((row) => row.exitApproval);
    res.json({
      visitorNames,
      visitorPics,
      headcnts,
      visitorReasons,
      id,
      exitApproval,
    });
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/tokenId", async (req, res) => {
  const { tokenId } = req.body;

  try {
    const query =
      "SELECT name,headcount,staffName,inTime,exitApproval FROM `approval` WHERE id =  ?";

    const [data] = await db.query(query, [tokenId]);

    res.json(data);
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/exitApproval", async (req, res) => {
  const { id } = req.body; // Corrected variable name

  try {
    const query = "UPDATE `approval` SET `exitApproval`='1' WHERE `id`= ?";
    const [data] = await db.query(query, [id]);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
