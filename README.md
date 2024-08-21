# Demo UI

This project is built using Vue.js with Vite as the build tool and Vuetify for UI components. Follow the steps below to set up, compile, and run the application. This template should help get you started developing with Vue 3 in Vite.


[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

## Prerequisites

Ensure that you have the following installed on your machine:

	•	Node.js (version 16.x or higher recommended)
	•	npm (version 8.x or higher recommended)

### Installation

## Clone the repository:

```sh  
git clone https://github.com/camosquerab/demo-ui
cd demo-ui
```

## Install dependencies:
First, make sure you have Vite installed globally (optional but recommended):

```sh
npm install -g vite
```

Then, install all necessary project dependencies:

```sh
npm install
```

If you need to install individual dependencies, use the following commands:

## Install Vue 3:

```sh
npm install vue@next
```

## Install Vite:

```sh
npm install vite --save-dev
```

## Install Vuetify:

```sh
npm install vuetify
```

## Install Vue Router:

```sh
npm install vue-router@next
```

## Install TypeScript:

```sh
npm install typescript --save-dev
```

## Install ESLint:

```sh
npm install eslint --save-dev
```

### Development

This will start a local development server, and the application will be accessible at http://localhost:5173.

### Building for Production

## Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Compile and Hot-Reload for Development

```sh
npm run dev