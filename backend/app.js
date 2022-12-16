import express from 'express';
import { createDevice, getAllDevices, updateDevice, deleteDevice } from './db/devices.js';
import { createPreference, getAllPreferences, updatePreference, deletePreference } from './db/preferences.js';
import { createHas, getDevicePreferences } from './db/has.js';

const app = express();
app.use(express.json());

// ENDPOINTS FOR DEVICES
app.post("/devices", async (req, res) => {
  const results = await createDevice(req.body);
  res.status(201).json({ id: results[0] });
});

app.get("/devices", async (req, res) => {
  const devices = await getAllDevices();
  res.status(200).json({ devices });
});

app.patch("/devices/:id", async (req, res) => {
  const devices = await updateDevice(req.params.id, req.body);
  res.status(200).json({ devices });
});

app.delete("/devices/:id", async (req, res) => {
  const devices = await deleteDevice(req.params.id);
  res.status(200).json({ success: true });
});

// ENDPOINTS FOR PREFERENCES
app.post("/preferences", async (req, res) => {
  const results = await createPreference(req.body);
  res.status(201).json({ id: results[0] });
});

app.get("/preferences", async (req, res) => {
  const preferences = await getAllPreferences();
  res.status(200).json({ preferences });
});

app.patch("/preferences/:id", async (req, res) => {
  const preference = await updatePreference(req.params.id, req.body);
  res.status(200).json({ preference });
});

app.delete("/preferences/:id", async (req, res) => {
  const preference = await deletePreference(req.params.id);
  res.status(200).json({ success: true });
});

// ENDPOINTS FOR HAS
app.post("/has", async (req, res) => {
  const results = await createHas(req.body);
  res.status(201).json({ id: results[0] });
});

app.get("/has/:id", async (req, res) => {
  const has = await getDevicePreferences(req.params.id);
  res.status(200).json({ has });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke 💩');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});