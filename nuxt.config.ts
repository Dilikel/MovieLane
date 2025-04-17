// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	srcDir: 'app/',
	serverDir: 'server/',
	ssr: true,
	runtimeConfig: {
		public: {
			API_URL: process.env.API_URL,
			SECRET_KEY: process.env.SECRET_KEY,
		},
	},
	nitro: {
		preset: 'vercel-edge',
		publicAssets: [
			{
				dir: '../public',
				baseURL: '/',
			},
		],
	},

	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			title: 'Смотреть фильмы и сериалы бесплатно на MovieLane',
			link: [
				{
					rel: 'icon',
					type: 'image/png',
					href: '/favicon.png',
				},
			],
		},
	},

	components: [
		{
			path: '~/components/',
			pathPrefix: false,
			global: true,
			priority: 10,
		},
	],

	css: ['~/assets/styles/base/_index.scss'],

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "~/assets/styles/helpers/_index.scss" as *;`,
				},
			},
		},
	},

	modules: [
		'@nuxtjs/device',
		'@nuxt/icon',
		'@pinia/nuxt',
		'@formkit/auto-animate/nuxt',
		'@nuxtjs/tailwindcss',
	],
})
