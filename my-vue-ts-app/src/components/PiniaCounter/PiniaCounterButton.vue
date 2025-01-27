<script setup lang="ts">
import {PiniaCounter} from "./Counter.ts";
import useCounterStore = PiniaCounter.useCounterStore;

const counterStore = useCounterStore();

</script>

<template>
  <div class="counter-container">
    <h1>Pinia Counter Example</h1>
    <p>Count: {{ counterStore.value }}</p>
    <button @click="counterStore.increment()">Increment</button>
    <button @click="counterStore.decrement()">Decrement</button>
    <button @click="counterStore.reset()">Reset</button>
  </div>
</template>

<style scoped>
h1 {
  color: #42b983;
}

.counter-container {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 20px;
}

button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>
