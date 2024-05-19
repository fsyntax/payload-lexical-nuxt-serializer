import { defineNuxtModule, addPlugin, createResolver, useLogger, addComponent } from '@nuxt/kit'
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
    const logger = useLogger('payload-lexical-html-serializer')
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

    if (!options.components) {
      logger.warn('No blocks defined in the module options')
    }
    nuxt.options.runtimeConfig.public.payloadLexicalHtmlSerializer = defu(nuxt.options.runtimeConfig.public.payloadLexicalHtmlSerializer, {
      components: options.components,
    })
  },
})
