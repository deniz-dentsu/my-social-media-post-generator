module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'my-social-media-post-generator',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src/'), // Make sure this points to your src directory
  //   },
  // },


  env: {
    openaiApiKey: process.env.OPENAI_API_KEY,
  },

  // publicRuntimeConfig: {
  //   openaiApiKey: process.env.OPENAI_API_KEY
  // },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv',
  ],

  // axios: {
  //   // Base URL of your API
  //   baseURL: process.env.API_URL || 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
  // },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxt/http'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {
    //   if (ctx.isServer) {
    //     config.externals = [
    //       function (context, request, callback) {
    //         if (/^axios/.test(request)) {
    //           return callback(null, `commonjs ${request}`);
    //         }
    //         callback();
    //       },
    //     ];
    //   }
    // },
  },
  // Server Middleware
  serverMiddleware: [
    // API middleware
    { path: '/api/generate-copy', handler: '~/server/api/generate-copy.ts' },
    { path: '/api', handler: '~/server/api/index.js' },
    
  ],
}
