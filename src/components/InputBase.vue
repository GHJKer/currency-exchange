<template>
  <div>
    <input
      v-model="inputValue"
      @input="emit('inputValue', inputValue)"
      :style="{ width: props.width + 'px' }"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  width: {
    type: Number,
    required: false,
  },
});

const inputValue = ref("");

const emit = defineEmits(["inputValue"]);
</script>
<style module></style>
