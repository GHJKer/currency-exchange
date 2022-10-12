<script lang="ts" setup>
import DropdownBase from "@/components/DropdownBase.vue";
import CurrencyBlock from "@/components/CurrencyBlock.vue";
import ExchangeBlock from "@/components/ExchangeBlock.vue";

import { onMounted, ref, Ref } from "vue";
import { currencyRequest } from "@/use/useRequest";
import { SelectOptions } from "@/types/general";
import { useStore } from "@/store/useStore";

const store = useStore();

const currencies: Ref<SelectOptions[]> = ref([]);

const switchVar = ref(true);

const getCurrencies = async () => {
  const result = await currencyRequest();
  currencies.value = Object.entries(result.Valute).map(
    (item) => item[1]
  ) as SelectOptions[];

  store.getData(result);
};

onMounted(async () => {
  await getCurrencies();
});
</script>

<template>
  <div :class="$style['main-container']">
    <div :class="$style.switcher">
      <h3
        :class="[$style['switcher-item'], { [$style.chosen]: switchVar }]"
        @click="switchVar = !switchVar"
      >
        Список валют
      </h3>
      <h3
        :class="[$style['switcher-item'], { [$style.chosen]: !switchVar }]"
        @click="switchVar = !switchVar"
      >
        Конвертер
      </h3>
    </div>
    <div v-if="switchVar">
      <p>Выберите валютную пару:</p>
      <DropdownBase :options="currencies" />
      <CurrencyBlock />
    </div>
    <ExchangeBlock v-else :options="currencies" />
  </div>
</template>

<style module>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
}

.switcher {
  display: flex;
  gap: 10px;
}

.switcher-item {
  padding: 2px;
  border-radius: 5px;
  cursor: pointer;
}

.chosen {
  background-color: #ff9a0042;
}
</style>
