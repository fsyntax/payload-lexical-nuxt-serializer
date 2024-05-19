import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'
import { RenderContent } from '../src/runtime/components/RenderContent'

// describe('ssr', async () => {
//   await setup({
//     rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
//   })
//
//   it('renders the index page', async () => {
//     // Get response to a server-rendered page with `$fetch`.
//     const html = await $fetch('/')
//     expect(html).toContain('<div>basic</div>')
//   })
// })

describe('RenderContent', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('renders content when root is present', async () => {
    const content = {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [{
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [{
            mode: 'normal',
            text: 'Hello, world!',
            type: 'text',
            style: '',
            detail: 0,
            format: 0,
            version: 1,
          }],
          direction: 'ltr',
        }],
        direction: 'ltr',
      },
    }
    const component = RenderContent.setup({ content })
    expect(component()).toContain('Hello, world!')
  })
  //
  // it('renders content when root is not present', async () => {
  //   const content = [{ type: 'text', content: 'Hello, world!' }]
  //   const component = RenderContent.setup({ content })
  //   expect(component()).toContain('Hello, world!')
  // })
  //
  // it('returns null when content is not present', async () => {
  //   const component = RenderContent.setup({})
  //   expect(component()).toBeNull()
  // })
})
