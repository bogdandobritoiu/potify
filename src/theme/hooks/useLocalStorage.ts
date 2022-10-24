import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLocalStorage = () => {
  async function saveKey(key: string, item: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
      // saving error
    }
  }

  async function getKey(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      // value previously stored
      if (value !== null) return JSON.parse(value);
    } catch (e) {
      // error reading value
    }
    return null;
  }

  async function deleteKey(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // error deleting value
    }
  }

  const wipeApplicationData = () => {
    AsyncStorage.clear();
  };

  return { saveKey, getKey, deleteKey, wipeApplicationData };
};
