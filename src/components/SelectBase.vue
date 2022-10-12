<template>
  <select
    v-model="selectedItem"
    @change="
      emit('selectedItem', selectedItem), store.getCurrentCurrency(selectedItem)
    "
  >
    <option
      v-for="option in options"
      :key="option.ID"
      v-bind:value="{
        CharCode: option.CharCode,
        ID: option.ID,
        Name: option.Name,
        Nominal: option.Nominal,
        NumCode: option.NumCode,
        Previous: option.Previous,
        Value: option.Value,
      }"
    >
      {{ option?.CharCode }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { ref, Ref, PropType } from "vue";
import { SelectOptions } from "@/types/general";
import { useStore } from "@/store/useStore";

const props = defineProps({
  options: {
    type: Array as PropType<Array<SelectOptions>>,
    required: true,
  },
});

const store = useStore();

const selectedItem: Ref<SelectOptions> = ref({
  CharCode: "",
  ID: "",
  Name: "",
  Nominal: 0,
  NumCode: 0,
  Previous: 0,
  Value: 0,
});

const emit = defineEmits(["selectedItem"]);
</script>
