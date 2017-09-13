const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {envVariables, sandboxUrl, prodUrl} = require('./conf.js');
const StatsWebpackPlugin = require('stats-webpack-plugin');
const queryString = require('querystring');
const DashboardPlugin = require('webpack-dashboard/plugin');
/**
 * Env Constants
 */
const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';
const startServer = process.env.START_SERVER === 'true' || process.env.START_SERVER === 'open';
const ENVConfig = isProd && (startServer || process.env.MOCKS) ? 'development' : process.env.NODE_ENV;
const TESTPATH = `./lib/${process.env.TESTPATH || '**/*'}.spec.js`;

if (isTest) {
  /*eslint-disable no-console*/
  console.log('*****************************************************');
  console.log('| Test ENV detected: Not loading SCSS PUG or ASSETS');
  console.log(`| Testing ${TESTPATH}`);
  console.log('*****************************************************');
  /*eslint-enable no-console*/
}

_.set(envVariables, [ENVConfig, 'ENV', 'urls'], {
  sandbox: sandboxUrl,
  prod: prodUrl
});

process.env.CONFIG = JSON.stringify(envVariables[ENVConfig].ENV);
const entry = {
  main: path.resolve('src/lib/app.js'),
  // order of these injections matter, dependencies must be loaded first
  vendor: [
    'lodash',
    'moment',
    'moment-timezone',
    'scriptjs'
  ]
};

/**
* Plugin Configs
*/
const devServerOptions = {
  port: 3000,
  inline: !isProd,
  compress: true,
  quiet: false,
  contentBase: isProd ? 'dist/assets' : '.tmp/assets',
  historyApiFallback: true,
  // 0.0.0.0 allows remote connections to view the dev server (ie windows computers)
  // localhost has special os restrictions on who can view it, i.e., localhost only
  host: '0.0.0.0',
  open: process.env.START_SERVER === 'open'
};


const globals = {
  moment: 'moment-timezone',
  _: 'lodash'
};

const envWhiteList = {'CONFIG': false, 'MOCK': false, 'NODE_ENV': false};
const indexHtmlConfig = {
  title: 'Amp Demo',
  template: 'src/index.pug',
  filename: 'index.html',
  inject: 'head'
};

/**
 * Specific Loaders for Dependency
 */
const dependencyLoaders = [
  {
    test: /csvexport\/dist\/Export\.min\.js$/,
    loader: 'imports-loader?window=>{}!exports-loader?window.Export'
  },
  {
    test: /object-path\/index\.js$/,
    loader: 'imports-loader?define=>false,exports=>false,this=>window'
  }
];

// Rules
const jsLoaders = [{
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    isProd ? {
      loader: 'babel-loader', options: {
        plugins: [
          'transform-es2015-template-literals',
          'transform-es2015-literals',
          'transform-es2015-function-name',
          'transform-es2015-arrow-functions',
          'transform-es2015-block-scoped-functions',
          'transform-es2015-classes',
          'transform-es2015-object-super',
          'transform-es2015-shorthand-properties',
          'transform-es2015-computed-properties',
          'transform-es2015-for-of',
          'transform-es2015-sticky-regex',
          'transform-es2015-unicode-regex',
          'check-es2015-constants',
          'transform-es2015-spread',
          'transform-es2015-parameters',
          'transform-es2015-destructuring',
          'transform-es2015-block-scoping',
          'transform-es2015-typeof-symbol',
          ['transform-regenerator', {'async': false, 'asyncGenerators': false}]
        ]
      }
    } : 'happypack/loader',
    'import-glob'
  ]
}, {
  enforce: 'pre',
  test: /\.js$/,
  exclude: /node_modules/,
  loader: [`ifdef-loader?${queryString.encode({json: JSON.stringify({isProd, isDev, isTest})})}`]
}];

const testLoaders = [
  {
    enforce: 'pre',
    test: /\.js$/,
    // eslint-disable-next-line max-len
    exclude: /\/node_modules\/|\/\.tmp\/|\/sandbox\/|\/cloned-modules\/|\/testing\/|\.run\.js$|\.config\.js$|\.spec\.js$|\.constant\.js$|\.messages\.js$|-decorator\.js$|\.module\.js$/,
    use: [
      {
        loader: 'istanbul-instrumenter-loader',
        options: {esModules: true}
      },
      'import-glob'
    ]
  },
  {
    test: /tests\.js$/,
    loader: 'string-replace-loader',
    options: {
      search: 'TESTPATH',
      replace: TESTPATH
    },
    enforce: 'pre'
  }
];

const ngAnnotateLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: ['ng-annotate-loader'],
  enforce: 'post'
};

// eslint-disable-next-line no-extra-parens
jsLoaders.push(...(isTest ? testLoaders : [ngAnnotateLoader]));

const scssLoaderList = [
  {
    loader: 'style-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'resolve-url-loader',
    options: {
      sourceMap: true
    }
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      includePaths: [
        path.resolve('./node_modules'),
        path.resolve('./src/lib'),
        path.resolve('./src/lib/common/styles')
      ]
    }
  },
  'import-glob'
];

const stringScssLoader = `css-loader?sourceMap!resolve-url-loader?sourceMap!sass-loader?${
  JSON.stringify(scssLoaderList[3].options)
}!import-glob`;

const scssLoader = {
  test: /\.scss$/,
  use: isProd ? ExtractTextPlugin.extract({fallback: 'style-loader', use: stringScssLoader}) : scssLoaderList
};

const imageLoaders = [
  {
    test: /\.(ico|jpe?g|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader',
    query: {
      limit: 65000,
      name: 'assets/images/[name].[ext]'
    }
  }
];

const fontLoaders = [
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?name=assets/fonts/[name].[ext]'
  },
  {
    test: /\.(eot|svg|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader?name=assets/fonts/[name].[ext]'
  }
];

const pugLoaders = [
  {
    test: /\/src\/lib\/.+\.pug$/,
    loader: `ngtemplate-loader?relativeTo=${path.resolve(__dirname, './src/')}!pug-html-loader`,
    exclude: /\/index\.pug/
  },
  {
    test: /\/index\.pug$/,
    loader: 'pug-loader?pretty'
  }
];

const plugins = [
  new DashboardPlugin(),
  new webpack.ProvidePlugin(globals),
  new webpack.EnvironmentPlugin(envWhiteList),
  new HtmlWebpackPlugin(indexHtmlConfig),
  isProd ? new ExtractTextPlugin('styles.[hash].css') : new HappyPack({loaders: ['babel-loader?presets[]=es2015']})
];
!isTest && plugins.unshift(
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.[hash].js'
  })
);

isDev && !startServer && plugins.unshift(
  new StatsWebpackPlugin('stats.json', {
    chunkModules: true
  })
);

const webpackConfig = {
  plugins,
  module: {
    rules: []
      .concat(fontLoaders)
      .concat(imageLoaders)
      .concat(jsLoaders)
      .concat(pugLoaders)
      .concat(scssLoader)
      .concat(dependencyLoaders)
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
    profile: isDev && startServer
  },

  devtool: isTest ? 'inline-source-map' : 'source-map',
  externals: {},
  resolve: {
    // extensions: ['.js', '.json', '.css'],
    // Root paths must be absolute.
    // $ref: https://webpack.github.io/docs/configuration.html#resolve-root
    modules: [
      path.resolve('./src'),
      path.resolve('./src/lib'),
      'node_modules'
    ],
    alias: {
      'assets': path.resolve('./src/assets/'),
      'src': path.resolve('./src'),
      'lib': path.resolve('./src/lib'),
      'testing': path.resolve('./testing/')
    }
  },

  output: {
    path: path.resolve(isProd ? 'dist' : '.tmp'),
    filename: `[name].[${isProd ? 'chunkhash' : 'hash'}].module.js`
  }
};

!isTest && (webpackConfig.entry = entry);
startServer && (webpackConfig.devServer = devServerOptions);

module.exports = webpackConfig;
