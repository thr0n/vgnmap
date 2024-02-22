## Current dependencies

```bash
 @rollup/plugin-commonjs      ^21.1.0  →   ^25.0.7
 @rollup/plugin-node-resolve  ^13.3.0  →   ^15.2.3
 @rollup/plugin-replace        ^3.1.0  →    ^5.0.5
 @rollup/plugin-typescript     ^8.5.0  →   ^11.1.6
 @tsconfig/svelte              ^2.0.1  →    ^5.0.2
 contentful                    ^9.3.5  →  ^10.6.21
 prettier                      ^2.8.8  →    ^3.2.5
 prettier-plugin-svelte       ^2.10.1  →    ^3.2.1
 rollup                       ^2.79.1  →   ^4.12.0
 rollup-plugin-css-only        ^3.1.0  →    ^4.5.2
 rollup-plugin-scss            ^3.0.0  →    ^4.0.0
 svelte                       ^3.59.2  →   ^4.2.11
 svelte-check                 ^2.10.3  →    ^3.6.4
 svelte-preprocess            ^4.10.7  →    ^5.1.3
 typescript                    ^4.9.5  →    ^5.3.3
 ```

```bash
 npm create vite@latest
 ```

 - Choose svelte
 - Copy files from ./<project-name> to project directory
 - Drop package-lock.json and run npm install
 - Add dependencies: leaflet and contentful
 - Add dev dependencies: sass
 - Replace App.svelte with actual App
 - Prefix environment variables in .env with `VITE_` and replace all `process.env.VARIABLE`s with `import.meta.env.VITE_VARIABLE` 

 ## npm run build 

 ```bash
 ✓ 46 modules transformed.
dist/index.html                   1.23 kB │ gzip:  0.66 kB
dist/assets/index-DfWY1ihM.css   19.01 kB │ gzip:  7.45 kB
dist/assets/index-CPtvyui6.js   265.34 kB │ gzip: 84.48 kB
✓ built in 857ms
```

 ## Resources:

 https://vitejs.dev/guide/