// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // export default defineConfig({
// //   plugins: [react()],
// //   server: {
// //     open: true
// //   }
// // })
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   root: '.',            // ensures vite serves index.html from project root
//   publicDir: 'public',  // folder containing your index.html
//   server: {
//     open: '/login',     // auto open login route
//     port: 5173,
//   },
//   build: {
//     outDir: 'dist',
//   },
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  appType: 'spa', // enables single-page routing fallback
})
