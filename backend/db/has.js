import { connectedKnex } from "./database.js";

export function createHas(has) {
  return connectedKnex("has").insert(has);
};

export function getDevicePreferences(device_id) {
  return connectedKnex("has").select("*").where("device_id", device_id);
};

export function deleteHas(preference_id, device_id) {
  return connectedKnex("has").where("preference_id", preference_id, "device_id", device_id).del();
};