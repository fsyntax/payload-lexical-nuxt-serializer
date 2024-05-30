<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app'
import { defineAsyncComponent } from 'vue'
import type { BlockNode } from '~/src/types'

defineProps<{
  blocks: BlockNode[]
}>()

const componentsMap = useRuntimeConfig().public?.payloadLexicalNuxtSerializer?.components

function blockToRender(blockType: string) {
  if (blockType && componentsMap && componentsMap[blockType]) {
    const component = defineAsyncComponent(() => import(`@/components/blocks/${componentsMap[blockType]}.vue`))
    if (component) {
      return component
    }
  }
  return null
}
</script>

<template>
  <div v-if="blocks.length > 0">
    <template
      v-for="block in blocks"
      :key="block.id"
    >
      <component
        :is="blockToRender(block.blockType)"
        v-if="block.blockType"
        v-bind="{ block }"
      />
    </template>
  </div>
</template>
