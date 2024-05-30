export default defineNuxtConfig({
  modules: ['../src/module'],
  payloadLexicalNuxtSerializer: {
    components: {
      pageTitle: 'BlockPageTitle',
      layout: 'BlockLayout',
      callToAction: 'BlockCallToAction',
    },
  },
  devtools: { enabled: true },
  components: true,
})
