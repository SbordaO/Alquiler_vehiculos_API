import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite
// https://vitejs.dev/config/
export default defineConfig({
  // Define los plugins que Vite utilizará. Aquí se incluye el plugin de React
  plugins: [react()],
})
