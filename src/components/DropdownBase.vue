<template>
  <div :class="$style['main-container']">
    <InputBase @inputValue="mySearch" :placeholder="'Доллар, евро, иены ...'" />
    <SelectBase
      :options="currenciesFiltered.length ? currenciesFiltered : currencies"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, computed } from "vue";
import SelectBase from "@/components/SelectBase.vue";
import InputBase from "@/components/InputBase.vue";
import { SelectOptions } from "@/types/general";

interface Props {
  options: Array<SelectOptions>;
}

const props = defineProps<Props>();

const currenciesFiltered: Ref<SelectOptions[]> = ref([]);

const currencies = computed(() => props.options);

function mySearch(inputData: string) {
  // получаем массив булевых значений, true если строка содержит введенную подстроку, false если нет
  let searchResult = props.options.map((item) =>
    item.Name.toLocaleLowerCase().includes(inputData.toLocaleLowerCase())
  );

  // получаем массив индексов значений true
  const resultIndexes: number[] = searchResult
    .map((item, index) => (item ? index : null))
    .filter((item) => item !== null) as number[];

  // добавляем элементы с соответствующими индексами в пустой массив
  let newOptions: SelectOptions[] = [];
  resultIndexes.forEach((item) => newOptions.push(props.options[item]));

  // присваиваем получившийся массив переменной
  currenciesFiltered.value = newOptions;

  return resultIndexes;
}
</script>
<style module>
.main-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>
