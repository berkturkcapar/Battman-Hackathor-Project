import { connectedKnex } from "./database.js";

export function createPreference(preference) {
  return connectedKnex("preferences").insert(preference);
};

export function getAllPreferences() {
  return connectedKnex("preferences").select("*");
};

export function deletePreference(id) {
  return connectedKnex("preferences").where("preference_id", id).del();
};

export function updatePreference(id) {
  return connectedKnex("preferences").where("preference_id", id).update(preference);
};