export default defineNuxtConfig({
  modules: ['../src/module'],
  payloadLexicalHtmlSerializer: {
    components: {
      pageTitle: 'BlockPageTitle',
    },
  },
  devtools: { enabled: true },
  components: true,
})
