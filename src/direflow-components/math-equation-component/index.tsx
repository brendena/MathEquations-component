import { DireflowComponent } from 'direflow-component';
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import App from './App';

export default DireflowComponent.create({
  component: App,
  configuration: {
    tagname: 'math-equation-component',
  },
  plugins: [
    {
      name: 'font-loader',
      options: {
        google: {
          families: ['Advent Pro', 'Noto Sans JP'],
        },
      },
    },
    {
      name: 'polyfill-loader',
      options: {
        use: {
          sd: false,
          ce: false,
          adapter: false
        }
      }
    }
  ],
});
