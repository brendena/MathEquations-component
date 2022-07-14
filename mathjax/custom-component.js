
//
//  Initialize the MathJax startup code
//
require('mathjax-full/components/src/startup/lib/startup.js');


// Load the components that we want to combine into one component
//   (the ones listed in the preLoad() call above)
//
require('mathjax-full/components/src/core/core.js');

require('mathjax-full/components/src/a11y/assistive-mml/assistive-mml.js');

require('mathjax-full/components/src/input/tex-full/tex-full.js');
require('mathjax-full/components/src/input/tex/extensions/ams/ams.js');
require('mathjax-full/components/src/input/tex/extensions/newcommand/newcommand.js');
require('mathjax-full/components/src/input/tex/extensions/configmacros/configmacros.js');
require('mathjax-full/components/src/input/tex/extensions/action/action.js');

require('mathjax-full/components/src/output/svg/svg.js');
require('mathjax-full/components/src/output/svg/fonts/tex/tex.js');

require('mathjax-full/components/src/ui/menu/menu.js');

require('mathjax-full/components/src/input/tex-full/tex-full.js');
require('mathjax-full/components/src/input/mml/mml.js');
require('mathjax-full/components/src/input/asciimath/asciimath.js');




//
//  Get the loader module and indicate the modules that
//  will be loaded by hand below
//
const {Loader} = require('mathjax-full/js/components/loader.js');
Loader.preLoad(
  'loader', 'startup',
  'core',
  'input/tex-full',
  '[tex]/ams',
  '[tex]/newcommand',
  '[tex]/configmacros',
  '[tex]/action',

  'input/mml',
  'input/asciimath',
  
  'output/svg', 'output/svg/fonts/tex.js',
  'ui/menu'
);




const {insert} = require('mathjax-full/js/util/Options.js');
insert(MathJax.config, {

  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    packages: {'[+]': ['ams', 'newcommand', 'configmacros', 'action']},
    
  }
  
}, false);
//formatError:(jax,err) =>{ console.log("there was a error") }




//
// Loading this component will cause all the normal startup
//   operations to be performed
//
require('mathjax-full/components/src/startup/startup.js');