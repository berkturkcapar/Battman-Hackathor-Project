import { connectedKnex } from "./database.js";

export function createDevice(device) {
  return connectedKnex("devices").insert(device);
};

export function getAllDevices() {
  return connectedKnex("devices").select("*");
};

export function deleteDevice(id) {
  return connectedKnex("devices").where("device_id", id).del();
};

export function updateDevice(id) {
  return connectedKnex("devices").where("device_id", id).update(device);
};