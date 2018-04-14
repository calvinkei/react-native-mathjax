import React from 'react';
import _ from 'lodash';
import AutoHeightWebView from 'react-native-autoheight-webview';

const defaultOptions = {
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
};

class MathJax extends React.Component {
	wrapMathjax(content) {
		const options = JSON.stringify(
			_.merge(defaultOptions, this.props.mathJaxOptions)
		);
		return `
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
			<script type="text/x-mathjax-config">
				MathJax.Hub.Config(${options});
			</script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js"></script>
			${content}
		`;
	}
	render() {
		return (
			<AutoHeightWebView
				source={{ html: this.wrapMathjax(this.props.html) }}
				{...this.props}
			/>
		);
	}
}

export default MathJax;
