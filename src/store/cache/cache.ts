"use client";

interface CacheObject {
  key: string;
  value: any;
}

function createKey(input: string): string {
  if (input.charAt(0) !== "_") {
    input = "_" + input;
  }
  return input;
}

export function addToCache(obj: CacheObject) {
  try {
    const { key, value } = obj;
    const newKey = createKey(key);
    localStorage.setItem(newKey, JSON.stringify(value));
  } catch (e) {
    console.log("Error adding Item to Cache: ", e);
  }
}

export function getItemFromCache(key: string) {
  try {
    const newKey = createKey(key);
    const item = localStorage.getItem(newKey);
    if (item) {
      return JSON.parse(item);
    }
    console.log("Item" + key + " not found in Cache");
    return "";
  } catch (e) {
    console.log("Error getting Item from Cache: ", e);
  }
}

export function removeItemFromCache(key: string) {
  try {
    const newKey = createKey(key);
    localStorage.removeItem(newKey);
  } catch (e) {
    console.log("Error removing Item from Cache: ", e);
  }
}

export function clearCache() {
  try {
    if (localStorage.length <= 0) return;

    localStorage.clear();
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
}

export function doesKeyExist(key: string) {
  try {
    const value = localStorage.getItem(key);
    return value !== null;
  } catch (error) {
    console.log("Error checking key in cache:", error);
  }
}
