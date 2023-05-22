const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const mentalStates = ['focus', 'relax', 'sleep'];

app.get('/tracks/:state', (req, res) => {
  const { state } = req.params;

  if (!mentalStates.includes(state)) {
    return res.status(404).json({ error: 'Invalid mental state' });
  }

  const folderPath = path.join(__dirname, '..', 'src', 'assets', state);

  res.set('Content-Type', 'application/json');

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading files' });
    }

    const trackUrls = files.map((file) => {
      const trackId = path.parse(file).name; // Extract track ID without extension
      const trackName = trackId.replace(/_/g, ' '); // Replace underscores with spaces for track name

      return {
        id: trackId,
        name: trackName,
        url: `http://localhost:${port}/assets/${state}/${file}`,
      };
    });

    res.json(trackUrls);
  });
});

// Serve static assets from the 'assets' directory
app.use('/assets', express.static(path.join(__dirname, '..', 'src', 'assets')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
