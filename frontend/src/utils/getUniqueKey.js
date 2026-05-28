import { v4 as uuidv4 } from "uuid";

export const getUniqueKey = () => {
  return uuidv4();
};
