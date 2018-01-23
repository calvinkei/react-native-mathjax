import React from 'react';
import { WebView, View, StyleSheet } from 'react-native';
import { Bubbles } from 'react-native-loader';
import _ from 'lodash';

class MathJax extends React.Component {
	constructor(props) {
		super();
		this.state = {
			height: 12,
			loaded: false,
			repeated: 0,
		};
	}

	componentWillReceiveProps(props) {
		if (props.content !== this.props.content) {
			this.setState({
				height: 12,
				loaded: false,
				repeated: 0,
			});
		}
	}

	htmlContent(content) {

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

		const options = JSON.stringify(
			_.merge(defaultOptions, this.props.options)
		);

		return `
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
      <script type="text/x-mathjax-config">
         MathJax.Hub.Config(${options});
       </script>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js"></script>
      <div id='container'>${content}</div>
      <style>
        .MathJax_Display{
          display: inline-block !important;
          width: auto !important
        }
        body {
          font-family: sans-serif;
          font-size: ${this.props.fontSize || 14}px !important;
          margin: 5;
					${this.props.color ? `color: ${this.props.color}` : ''}
        }
      </style>
      <script>
        window.setInterval(function(){
          window.location.hash = new Date().getTime();
          document.title = document.getElementById('container').offsetHeight;
        }, 100)
      </script>
    `;
	}

	onNavigationStateChange(navState) {
		const height = Number(navState.title);
		if (this.state.repeated >= 9 && this.state.height === height) {
			this.setState({
				height,
				loaded: true,
				repeated: 0,
			});
		} else if (this.state.height === height && height > 0) {
			this.setState({
				repeated: this.state.repeated + 1,
			});
		} else {
			this.setState({ height });
		}
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<WebView
					javaScriptEnabled={true}
					scrollEnabled={true}
					source={{ html: this.htmlContent(this.props.content) }}
					javaScriptEnabledAndroid={true}
					style={{
						flex: 1,
						height: this.state.height,
						margin: 10,
						opacity: this.state.loaded ? 1 : 0,
					}}
					onNavigationStateChange={this.onNavigationStateChange.bind(this)}
					contentInset={{ top: -5, bottom: -5, right: -5, left: -5 }}
				/>
				{!this.state.loaded && (
					<View style={styles.centerContainer}>
						<Bubbles size={3} color="#ddd" />
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	centerContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default MathJax;
