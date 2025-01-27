<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "DisplayNukeFile",
  setup() {
    const fileContent = ref<string>("");
    const errorMessage = ref<string | null>(null);

    onMounted(async () => {
      try {

        const response = await fetch("/nuke.txt");

        if (!response.ok) {
          throw new Error(`Failed to load file: ${response.statusText}`);
        }

        fileContent.value = await response.text();
      } catch (error) {
        errorMessage.value = (error as Error).message;
      }
    });

    return {
      fileContent,
      errorMessage,
    };
  },
});
</script>

<template>
  <div class="file-display p-4">
    <h1 class="text-2xl font-bold mb-4">Contents of nuke.txt</h1>
    <!-- Show error message if there was an issue -->
    <p v-if="errorMessage" class="text-red-500 font-semibold">
      Error: {{ errorMessage }}
    </p>
    <!-- Display file content -->
    <pre v-else class="whitespace-pre-wrap bg-gray-100 p-4 rounded shadow">
      {{ fileContent }}
    </pre>
  </div>
</template>

<style scoped>
.file-display {
  max-width: 600px;
  margin: 0 auto;
}
</style>
