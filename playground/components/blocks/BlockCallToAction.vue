<script setup lang="ts">
defineProps<{
  block: any // define your block type here
}>()
</script>

<template>
  <div>
    <h1>{{ block.title }}</h1>
    <RenderContent :content="block.subtext" />
    <details>
      <summary>Block data</summary>
      <pre>{{ block }}</pre>
    </details>
  </div>
</template>
