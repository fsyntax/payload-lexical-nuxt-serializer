<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app'
import { defineAsyncComponent, defineProps } from 'vue'

defineProps<{
  blocks: any[]
}>()

const componentsMap = useRuntimeConfig().public?.payloadLexicalHtmlSerializer.components

function blockToRender(blockType: string) {
  if (blockType && componentsMap[blockType]) {
    return defineAsyncComponent(() => import(`@/components/blocks/${componentsMap[blockType]}.vue`))
  }

  return null
}
</script>

<template>
  <div>
    <template
      v-for="block in blocks"
      :key="block.id"
    >
      <component
        :is="blockToRender(block.blockType)"
        v-if="blocks"
        v-bind="{ block }"
      />
    </template>
  </div>
</template>
