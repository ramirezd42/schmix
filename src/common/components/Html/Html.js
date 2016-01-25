import React, { Component, PropTypes } from 'react';

class Html extends Component {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    css: PropTypes.string,
    body: PropTypes.string.isRequired,
    debug: PropTypes.bool,
    version: PropTypes.string
  };

  static defaultProps = {
    title: '',
    description: '',
  };

  render() {
    return (
      <html className="no-js" lang="">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{this.props.title}</title>
        <meta name="description" content={this.props.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />
        <link rel="stylesheet"
          type="text/css"
          href={!!this.props.debug ? '/styles.css' : `/styles.${this.props.version}.css`}
        />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: this.props.body }}/>
        <script
          src={!!this.props.debug ? '/app.js' : `/app.${this.props.version}.js`}
        >
        </script>
      </body>
      </html>
    );
  }

}

export default Html;
