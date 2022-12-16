import { connectedKnex } from "./database.js";

export function createCar(car) {
  return connectedKnex("cars").insert(car);
};

export function getAllCars() {
  return connectedKnex("cars").select("*");
};

export function deleteCar(id) {
  return connectedKnex("cars").where("id", id).del();
};

export function updateCar(id) {
  return connectedKnex("cars").where("id", id).update(car);
};