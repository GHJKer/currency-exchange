type Currency = {
  [key: string]: Valute;
};

interface Valute {
  CharCode: string;
  ID: string;
  Name: string;
  Nominal: number;
  NumCode: number;
  Previous: number;
  Value: number;
}

export interface CurrencyData {
  Date: string;
  PreviousDate: string;
  PreviousURL: string;
  Timestamp: string;
  Valute: Currency;
}

export type SelectOptions = {
  CharCode: string;
  ID: string;
  Name: string;
  Nominal: number;
  NumCode: number;
  Previous: number;
  Value: number;
};
