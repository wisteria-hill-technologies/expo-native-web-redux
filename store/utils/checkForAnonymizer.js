import {AsyncStorage} from "react-native";
import generateRandomBase64Str from "./generateRandomBase64Str";

const checkForAnonymizer = async (username) => {
  const anonymizerKey = `anonymizer_${username}`;
  const userAnonymizer = await AsyncStorage.getItem(anonymizerKey);
  if (!userAnonymizer) {
    const randomKey = await generateRandomBase64Str();
    await AsyncStorage.setItem(anonymizerKey, randomKey);
  }
  return userAnonymizer;
};

export default checkForAnonymizer;
