/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#64B5F6', 
          secondary: '#757575',
          accent: '#FFB74D',
          error: '#EF5350',
          info: '#64B5F6', 
          success: '#81C784',
          warning: '#FFD54F' 
        }
      }
    }
  },
})

