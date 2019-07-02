import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  theme: {
    primary: '#fff',
    secondary: '#69C9CB',
    accent: '#82B1FF',
    error: '#B71F1F',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
});
