# react-native-mathjax
Render Mathjax content in React Native Webview with auto height adjustment.

This project is based on [react-native-autoheight-webview](https://github.com/iou90/react-native-autoheight-webview).

I am using [my own fork](https://github.com/calcal12/react-native-autoheight-webview) of the module and added a DOM change detection feature as MathJax changes the DOM after loading the page, which makes the height calculation in the original module inaccurate.

# Showcase
TODO

# Installation
1. `npm install react-native-mathjax --save`
2. For Android, `react-native link`
3. in MainApplication.java
```
import com.dscj.autoheightwebview.AutoHeightWebViewPackage; // Add this

public class MainApplication extends Application implements ReactApplication {
  //...
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    //...
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        //...
        new AutoHeightWebViewPackage() // Add this
        //...
```

# Usage
```
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

    // All below props are react-native-autoheight-webview props
    onHeightUpdated={height => console.log(height)},
    // if page contains iframe on iOS, use a specific script for it
    hasIframe={true}
    /*
    if set to false may cause some layout issues (width of container not fit for screen) on android
    if set to true may cause some layout issues (smaller font size) on iOS
    */
    scalesPageToFit={Platform.OS === 'android' ? true : false}
    // baseUrl not work in android 4.3 or below version
    enableBaseUrl={true}
    // offset of rn webview margin
    heightOffset={5}
    // default width is the width of screen
    // if there are some text selection issues on iOS, the width should be reduced more than 15 and the marginTop should be added more than 35
    style={{ width: Dimensions.get('window').width - 15, marginTop: 35 }}
    // enable animation by default
    enableAnimation={true},
    // only works on enable animation
    animationDuration={255},
    // use local or remote files
    files={[{
        href: 'cssfileaddress',
        type: 'text/css',
        rel: 'stylesheet'
    }]}
    // change script (have to change source to reload on android)
    customScript={`document.body.style.background = 'lightyellow';`}
    // rn WebView callbacks
    onError={() => console.log('on error')}
    onLoad={() => console.log('on load')}
    onLoadStart={() => console.log('on load start')}
    onLoadEnd={() => console.log('on load end')}
    // only on iOS
    onShouldStartLoadWithRequest={result => {
      console.log(result)
      return true;
    }}
    // add custom CSS to the page's <head>
    customStyle={`
      * {
        font-family: 'Times New Roman';
      }
      p {
        font-size: 16px;
      }
    `}
  />
```
