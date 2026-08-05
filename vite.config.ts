import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , tailwindcss()],
  base : process.env.VITE_BASE_PATH || "/Second-Brain-Frontend", 
  server : {
    allowedHosts : [
      "malacotic-jetta-melodramatically.ngrok-free.dev"
    ]
  }
})
