<template>
  <div class="counter-container">
    <h2>Counter: {{ counter.value }}</h2>
    <button @click="counter.increment">Increment</button>
    <button @click="counter.decrement">Decrement</button>
    <button @click="counter.reset">Reset</button>
  </div>
</template>

<script setup lang="ts">
import {Counter} from "./Counter.ts";
import {reactive} from "vue";

const counter = reactive(new Counter(0, 10));

</script>

<style scoped>
.counter-container {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 20px;
}

button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
