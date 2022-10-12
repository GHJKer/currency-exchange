import { currencyData } from "../types/general";

import axios from "axios";

const currencyRequest = async (): Promise<currencyData> => {
  const response = await axios.get(
    "https://www.cbr-xml-daily.ru/daily_json.js"
  );
  const result = response.data;

  return result;
};

export { currencyRequest };
