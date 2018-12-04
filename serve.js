const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const assetPath = path.join(__dirname, 'public');

app.use(express.static(assetPath));
app.get('*', (req, res) => {
  return res.sendFile(path.join(assetPath, 'index.html'));
});

app.listen(port, () => {
  console.info(`Example app listening on port ${port}`);
});
