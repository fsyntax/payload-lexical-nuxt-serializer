import { defineNuxtModule, addPlugin, createResolver, addComponent } from '@nuxt/kit'
import type { Input } from 'normalize-package-data'
import type { ComponentsOptions } from '@nuxt/schema'
import defu from 'defu'
import type { ModuleOptions } from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'payload-lexical-nuxt-serializer',
    configKey: 'payloadLexicalNuxtSerializer',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    components: undefined,
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve('./runtime/serializer'), {
      append: true,
    })
    await addComponent({
      name: 'RenderContent',
      export: 'RenderContent',
      filePath: resolver.resolve('./runtime/components/RenderContent'),
    })
    await addComponent({
      name: 'BlockRenderer',
      filePath: resolver.resolve('./runtime/components/BlockRenderer.vue'),
    })

    await addComponent({
      name: 'CustomComponentRenderer',
      filePath: resolver.resolve('./runtime/components/CustomComponentRenderer.vue'),
    })

    if (options.components) {
      nuxt.options.runtimeConfig.public.payloadLexicalNuxtSerializer = defu(nuxt.options.runtimeConfig.public.payloadLexicalNuxtSerializer as Input, {
        components: options.components,
      })
    }
    const componentsOptions = nuxt.options.components as ComponentsOptions
    nuxt.options.components = {
      ...(componentsOptions && typeof componentsOptions === 'object' ? componentsOptions : {}),
      dirs: [
        ...(isComponentsOptions(componentsOptions as ComponentsOptions) ? componentsOptions.dirs : []),
        '~/components/blocks', // Add the new directory
      ],
    }
  },
})

function isComponentsOptions(value: ComponentsOptions): boolean {
  return value && typeof value === 'object' && !Array.isArray(value)
}
