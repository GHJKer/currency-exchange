import { defineStore } from "pinia";
import { currencyData, SelectOptions } from "@/types/general";

interface State {
  currencyData: currencyData | null;
  currentCurrency: SelectOptions | null;
}

export const useStore = defineStore("store", {
  state: (): State => ({
    currencyData: null,
    currentCurrency: null,
  }),
  actions: {
    getData(NewData: currencyData) {
      this.currencyData = NewData;
    },
    getCurrentCurrency(newCurrency: SelectOptions) {
      this.currentCurrency = newCurrency;
    },
  },
});
