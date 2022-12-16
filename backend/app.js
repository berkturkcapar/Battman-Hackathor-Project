import express from 'express';
import { createCar, getAllCars, updateCar, deleteCar } from './db/cars.js';
const app = express();
app.use(express.json());

app.post("/cars", async (req, res) => {
  const results = await createCar(req.body);
  res.status(201).json({ id: results[0] });
});

app.get("/cars", async (req, res) => {
  const cars = await getAllCars();
  res.status(200).json({ cars });
});

app.patch("/cars/:id", async (req, res) => {
  const cars = await updateCar(req.params.id, req.body);
  res.status(200).json({ cars });
});

app.delete("/cars/:id", async (req, res) => {
  const cars = await updateCar(req.params.id);
  res.status(200).json({ success: true });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke 💩');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});