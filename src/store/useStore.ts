import { defineStore } from "pinia";
import { CurrencyData, SelectOptions } from "@/types/general";

interface State {
  CurrencyData: CurrencyData | null;
  СurrentCurrency: SelectOptions | null;
}

export const useStore = defineStore("store", {
  state: (): State => ({
    CurrencyData: null,
    СurrentCurrency: null,
  }),
  actions: {
    getData(NewData: CurrencyData) {
      this.CurrencyData = NewData;
    },
    getСurrentCurrency(newCurrency: SelectOptions) {
      this.СurrentCurrency = newCurrency;
    },
  },
});
