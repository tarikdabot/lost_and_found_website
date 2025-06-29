import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:4000",
        secure:false,
        changeOrigin: true,
        
      },
    },
  },

  plugins: [react()],
})
