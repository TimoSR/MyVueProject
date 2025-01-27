<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";

export default defineComponent({
  name: "PlayerKillTable",
  setup() {
    const fileContent = ref<string>(""); // Raw log content
    const playerKills = ref<Map<string, number>>(new Map()); // Tracks kills for each player
    const errorMessage = ref<string | null>(null); // Error messages

    onMounted(async () => {
      try {
        // Fetch the nuke.txt file
        const response = await fetch("/nuke.txt");
        if (!response.ok) {
          throw new Error(`Failed to load file: ${response.statusText}`);
        }

        // Read the file content
        const rawContent = await response.text();
        fileContent.value = rawContent;

        // Process the file content to calculate kills
        processKillData(rawContent);
      } catch (error) {
        errorMessage.value = (error as Error).message;
      }
    });

    // Function to process and calculate kills from log data
    const processKillData = (content: string) => {
      const killPattern =
          /"(.+?)<\d+><STEAM_[^>]+><[^>]+>" .*?killed "(.+?)<\d+><STEAM_[^>]+><[^>]+>"/g;
      const killsMap = new Map<string, number>();

      let match;
      while ((match = killPattern.exec(content)) !== null) {
        const killer = match[1]; // Extract killer's name
        killsMap.set(killer, (killsMap.get(killer) || 0) + 1); // Increment kills
      }

      playerKills.value = killsMap;
    };

    // Computed property to convert Map to a sorted array for rendering
    const sortedPlayerKills = computed(() =>
        Array.from(playerKills.value.entries()).sort((a, b) => b[1] - a[1])
    );

    return {
      errorMessage,
      sortedPlayerKills,
    };
  },
});
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl">
      <h1 class="text-3xl font-semibold text-gray-800 text-center mb-6">
        Player Kill Table
      </h1>

      <!-- Display error message if any -->
      <p v-if="errorMessage" class="text-red-500 font-semibold text-center">
        Error: {{ errorMessage }}
      </p>

      <!-- Display kill data table -->
      <div v-else>
        <table class="w-full border-collapse bg-gray-50 rounded-lg overflow-hidden shadow">
          <thead class="bg-gray-200 text-gray-700">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium">Player</th>
            <th class="px-4 py-2 text-center text-sm font-medium">Kills</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="([player, kills], index) in sortedPlayerKills"
              :key="index"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
          >
            <td class="px-4 py-3 text-gray-700 text-sm font-medium">
              {{ player }}
            </td>
            <td class="px-4 py-3 text-center text-gray-900 text-sm font-bold">
              {{ kills }}
            </td>
          </tr>
          </tbody>
        </table>

        <!-- No data message -->
        <p
            v-if="sortedPlayerKills.length === 0"
            class="text-center text-gray-500 mt-4"
        >
          No player kill data found.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Use TailwindCSS for styling. Minimal extra CSS is required. */
</style>