# react-native-mathjax
Render Mathjax content in React Native Webview with auto height adjustment.

# Showcase
TODO

# Installation
1. `yarn add react-native-mathjax` or `npm install react-native-mathjax --save`

# Usage
```javascript
<MathJax
  // HTML content with MathJax support
  html={'$\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$<br><p>This is an equation</p>'}
  // MathJax config option
  mathJaxOptions={{
    messageStyle: 'none',
    extensions: [ 'tex2jax.js' ],
    jax: [ 'input/TeX', 'output/HTML-CSS' ],
    tex2jax: {
      inlineMath: [ ['$','$'], ['\\(','\\)'] ],
      displayMath: [ ['$$','$$'], ['\\[','\\]'] ],
      processEscapes: true,
    },
    TeX: {
      extensions: ['AMSmath.js','AMSsymbols.js','noErrors.js','noUndefined.js']
    }
  }}
  {...WebView props}
/>

```
