/**
 *  This file contains the variables used in Webpack config
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  docs: 'reports',
  clonedModules: 'cloned-modules'
};

exports.sources = [
  {
    name: 'main',
    uri: 'lib',
    module: 'ampush'
  }
];

exports.sandboxUrl = 'www-sandbox.sandbox-amp.net';
exports.prodUrl = 'app.ampush.net';
// eslint-disable-next-line no-unused-vars
const dockerMachineIp = '192.168.99.100';

const backend = dockerMachineIp;

const useUrl = `http${/net$/.test(backend) ? 's' : ''}://${backend}`;

exports.envVariables = {
  development: {
    ENV: {
      mode: 'dev',

      silenceBootstrapOutput: true,

      logger: {
        /**
         * Set the log level which are defined in app-config.js
         * @type {String}
         */
        logLevel: 'full',

        /**
         * This re-routes all console.log|warn|error|debug|info messages into the angular $log service.
         * @type {Boolean}
         */
        reRouteConsole: false
      },

      ampBackendUrls: [
        {
          // If not using tunneling this
          // should be changed to mock server IP
          name: 'account',
          baseUrl: useUrl
        },
        {
          name: 'tools',
          baseUrl: useUrl
        },
        {
          name: 'analysis',
          baseUrl: useUrl
        },
        {
          name: 'optimization',
          baseUrl: useUrl
        },
        {
          name: 'planning',
          baseUrl: useUrl
        }
      ]
    }
  },
  production: {
    ENV: {
      mode: 'prod',
      logger: {
        /**
         * Set the log level which are defined in app-config.js
         * @type {String}
         */
        logLevel: 'full',

        /**
         * This re-routes all console.log|warn|error|debug|info messages into the angular $log service.
         * @type {Boolean}
         */
        reRouteConsole: true
      }
    }
  },
  test: {
    ENV: {
      mode: 'test',
      logger: {
        /**
         * Set the log level which are defined in app-config.js
         * @type {String}
         */
        logLevel: 'full',

        /**
         * This re-routes all console.log|warn|error|debug|info messages into the angular $log service.
         * @type {Boolean}
         */
        reRouteConsole: true
      }
    }
  }
};
