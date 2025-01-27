<template>
  <PlayerKillTable />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayerKillTable from "./components/PlayerKillTable.vue";

export default defineComponent({
  components: {
    PlayerKillTable,
  },
});
</script>