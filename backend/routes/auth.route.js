app.get("/api/formations", (req, res) => {
  db.query("SELECT * FROM formations", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});