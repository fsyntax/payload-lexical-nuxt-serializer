# Payload Lexical Nuxt Serializer

[![npm version][npm-version-src]][npm-version-href]

[![npm downloads][npm-downloads-src]][npm-downloads-href]

[![License][license-src]][license-href]

[![Nuxt][nuxt-src]][nuxt-href]

A Nuxt module that provides components for rendering rich text nodes and block fields from PayloadCMS's Lexical Editor.
This module simplifies the process of displaying complex content structures in your Nuxt application.

## Features

- `<BlockRenderer />` component - Render Block fields from you're collections
- `<RenderContent />` component - to render specific lexical node objects

## Note

This module is still kind of experimental and may have some bugs. If you find any issues, please report them or feel free to contribute.
Also, I'm basically just building this for my own projects, so if you have any feature requests, feel free to open an issue or PR as well.


## Setup

Install the module to your Nuxt application with one command:

```bash
pnpm dlx nuxi module add payload-lexical-nuxt-serializer
```

Add the `componentsMap` object to your Nuxt app's configuration in `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  components: true,
  payloadLexicalNuxtSerializer: {
    componentsMap: {
      Hero: 'BlockHero',
    },
  },
})
```


## BlockRenderer Component

The `BlockRenderer` component is a simple component that allows you to render block fields from your collections
dynamically.
It uses the useRuntimeConfig hook from Nuxt to access the componentsMap object. This object maps block types to Vue
component names. When rendering, the BlockRenderer component iterates over each block in the blocks array. For each
block, it uses the blockType property to look up the corresponding Vue component in the componentsMap. If a matching
component is found, it's dynamically imported and rendered with the block data.

### Usage

The `BlockRenderer` component takes an array of blocks as a prop. Each block in the array should be an object that
includes a `blockType` property. The `blockType` property is used to determine which Vue component should be used to
render the block.

```vue

<script setup lang="ts">
  const { data } = await useFetch(`/api/page?slug=someSlug`)
</script>
<template>
  <BlockRenderer :blocks="data?.blocks"/>
</template>
```

## RenderContent Component

The `RenderContent` component is a utility component that allows you to render specific lexical node objects. It's
designed to work with the rich text nodes from PayloadCMS's Lexical Editor, providing a seamless way to display complex
content structures. It is very convenient to use when creating custom Block components.

### Usage

The `RenderContent` component takes a `content` prop which should be an object representing the lexical node to be
rendered. Optionally, it can also take a `classConfig` prop which is an array of classes to be applied to the rendered
content.
It uses the $serialize method from the Nuxt app to serialize the lexical node into HTML. The classConfig prop is passed
to the $serialize method to apply the specified classes to the rendered content.

```vue

<script setup>
  const { data } = await useFetch(`/api/page?slug=someSlug`)

  const classConfig = [
    { tag: 'h3', class: 'font-bold' }
  ]
</script>

<template>
  <RenderContent :content="data?.content" :classConfig="classConfig"/>
</template>
```

This approach allows you to render any lexical node with custom classes, providing flexibility in how your content is
displayed.

## Examples

### Rendering a blocks field from a Payload Collection

Suppose you have a collection with a block field called `content`. The `content` field is an array of blocks, each with
a `blockType` property that specifies the type of block. You can use the `BlockRenderer` component to render the blocks
dynamically.

```vue

<script lang="ts" setup>
  import type { Page } from '~/types/payload'

  const { data: homePage, error } = await useFetch<Page>('/api/page?slug=index&depth=3')
</script>
<template>
  <div>
    <BlockRenderer v-if="homePage?.content" :blocks="homePage.content"/>

    <div v-else>
      <template v-if="!homePage && !error">
        <h1>Nothing to render yet.</h1>
      </template>

      <template v-else-if="error">
        <ErrorComponent :error="error"/>
      </template>
    </div>
  </div>
</template>
```

### Creating Block Components

To create custom block components, you can leverage the RenderContent component to render specific lexical node objects
within your block component.

```vue

<script setup lang="ts">
  import type { Hero } from '~/types/payload'

  const props = defineProps<{
    block: Hero
  }>()
</script>

<template>
  <section>
    <div>
      <RenderContent
        :content="block.heading"
        :class-config="[
          { tag: 'h1', class: 'font-extrabold' },
        ]"
      />
    </div>

    <div>
      <RenderContent
        :content="block.subheading"
      />
    </div>
  </section>
</template>
```

In this example, the RenderContent component is used twice:

1. To render the heading content of the block with custom classes applied to the h1 tag.
2. To render the subheading content of the block without any custom classes.

The `classConfig` prop is used to specify the tag and classes to be applied to the rendered content. This allows you to
customize the styling and markup of the rendered content within your block component.

Remember to register your block components in the `componentsMap` object in your Nuxt app. This object maps block types
to Vue component names, allowing the BlockRenderer component to dynamically import and render the correct component for
each block.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  components: true,
  payloadLexicalNuxtSerializer: {
    componentsMap: {
      Hero: 'BlockHero',
    },
  },
})
```


<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/payload-lexical-nuxt-serializer/latest.svg?style=flat&colorA=020420&colorB=00DC82

[npm-version-href]: https://npmjs.com/package/payload-lexical-nuxt-serializer

[npm-downloads-src]: https://img.shields.io/npm/dm/payload-lexical-nuxt-serializer.svg?style=flat&colorA=020420&colorB=00DC82

[npm-downloads-href]: https://npmjs.com/package/payload-lexical-nuxt-serializer

[license-src]: https://img.shields.io/npm/l/payload-lexical-nuxt-serializer.svg?style=flat&colorA=020420&colorB=00DC82

[license-href]: https://npmjs.com/package/payload-lexical-nuxt-serializer

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js

[nuxt-href]: https://nuxt.com
