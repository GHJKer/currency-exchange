<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "@/store/useStore";

const store = useStore();

const selectBaseItem = computed(() => store.СurrentCurrency);

const currencyForRuble = computed(() => {
  if (!store.СurrentCurrency?.Nominal || !store.СurrentCurrency?.Value) {
    return 0;
  }
  let fixedNum = store.СurrentCurrency.Nominal / store.СurrentCurrency.Value;
  return fixedNum.toFixed(3);
});

const currencyDifference = computed(() => {
  if (!store.СurrentCurrency?.Previous || !store.СurrentCurrency?.Value) {
    return 0;
  }
  let difference = store.СurrentCurrency.Value - store.СurrentCurrency.Previous;
  return difference.toFixed(3);
});
</script>
<template>
  <div v-if="selectBaseItem" :class="$style['currency-block']">
    <p>{{ selectBaseItem?.Name }}</p>
    <p>
      {{ selectBaseItem?.Nominal }} {{ selectBaseItem?.CharCode }} =
      {{ selectBaseItem?.Value }} RUB
    </p>
    <p>
      1 RUB = {{ currencyForRuble }} {{ selectBaseItem?.CharCode }}
      {{ currencyDifference }}
      <span :class="$style.up" v-if="currencyDifference > 0">&#8593;</span>
      <span :class="$style.down" v-else>&#8595;</span>
    </p>
  </div>
</template>

<style module>
.currency-block {
  display: flex;
  flex-direction: column;
}

.up {
  color: green;
}

.down {
  color: red;
}
</style>
