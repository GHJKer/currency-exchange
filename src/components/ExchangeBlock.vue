<script lang="ts" setup>
import { PropType, ref, Ref, computed } from "vue";
import SelectBase from "@/components/SelectBase.vue";
import InputBase from "@/components/InputBase.vue";

import { SelectOptions } from "@/types/general";
import { useStore } from "@/store/useStore";

const store = useStore();

const props = defineProps({
  options: {
    type: Array as PropType<Array<SelectOptions>>,
    required: true,
  },
});

const topItem: Ref<SelectOptions> = ref({
  CharCode: "",
  ID: "",
  Name: "",
  Nominal: 0,
  NumCode: 0,
  Previous: 0,
  Value: 0,
});

const botItem: Ref<SelectOptions> = ref({
  CharCode: "",
  ID: "",
  Name: "",
  Nominal: 0,
  NumCode: 0,
  Previous: 0,
  Value: 0,
});

const result: Ref<number> = ref(0);
const InputVal: Ref<number> = ref(0);
const selectRefTop = ref();
const selectRefBot = ref();

function assignInput(inputData: number) {
  InputVal.value = inputData;
  countCurrency();
}

function assignTop(selectData: SelectOptions) {
  topItem.value = selectData;
  if (botItem.value.Value) {
    countCurrency();
  }
}

function assignBot(selectData: SelectOptions) {
  botItem.value = selectData;
  countCurrency();
}

const currencyForRuble = computed(() => {
  let fixedNum = botItem.value.Nominal / botItem.value.Value;
  return fixedNum.toFixed(3);
});

function countCurrency() {
  let countVal;
  if (topItem.value.Value && botItem.value.Value && InputVal.value) {
    countVal =
      (topItem.value.Value / topItem.value.Nominal) *
      Number(currencyForRuble.value) *
      InputVal.value;
    return (result.value = Number(countVal.toFixed(3)));
  }
}

function changeCurrencies() {
  let cnahgeItem: Ref<SelectOptions> = ref({
    CharCode: "",
    ID: "",
    Name: "",
    Nominal: 0,
    NumCode: 0,
    Previous: 0,
    Value: 0,
  });
  cnahgeItem.value = topItem.value;
  selectRefBot.value.selectedItem = cnahgeItem.value;
  selectRefTop.value.selectedItem = botItem.value;
  topItem.value = botItem.value;
  botItem.value = cnahgeItem.value;

  countCurrency();
}
</script>
<template>
  <div>
    <p>Обмен валют</p>
    <div :class="$style['exchange-block']">
      <div>
        <p>Введите сумму и выберите валюту:</p>
        <div :class="$style['input-block']">
          <InputBase :width="50" :type="'number'" @inputValue="assignInput" />
          <SelectBase
            ref="selectRefTop"
            :options="options"
            :topOrBot="'top'"
            @selectedItem="assignTop"
          />
          {{ topItem.Name }}
        </div>
      </div>
      <div :class="$style.arrows" @click="changeCurrencies">
        &#8593; &#8595;
      </div>
      <div>
        <p>Конечная валюта:</p>
        <div :class="$style['aim-block']">
          <p>{{ result }}</p>
          <SelectBase
            ref="selectRefBot"
            :options="options"
            :topOrBot="'bot'"
            @selectedItem="assignBot"
          />
          {{ botItem.Name }}
        </div>
      </div>
    </div>
  </div>
</template>
<style module>
.exchange-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-block,
.aim-block {
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.arrows {
  display: flex;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
}
</style>
