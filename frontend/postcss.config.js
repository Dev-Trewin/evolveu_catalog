
// JM copied in the following from postcs.config.js in /frontend/tailwind-react/ subdirectory
const purgecss = require('@fullhuman/postcss-purgecss')({
   content: ['./src/**/*.js', './src/**/*.jsx', './public/**/*.html'],
   defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
 });
 
module.exports = {
   plugins: [
     require('tailwindcss'),
     require('autoprefixer'),    // and I added this in too. Seems relevant
     ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
   ],
 };
