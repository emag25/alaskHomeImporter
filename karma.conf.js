module.exports = function (config) {
  config.set({

    // Rutas de archivos
    basePath: '',
    files: [
      'src/**/*.spec.ts'
    ],

    // Frameworks de pruebas
    frameworks: ['jasmine'],

    client: {
      clearContext: false
    },

    // Reportero de resultados
    reporters: ['progress', 'kjhtml', 'coverage-istanbul'], // Agregamos 'coverage-istanbul' al array de reporters

    // Configuración del reporter de cobertura de código
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },

    // Puerto del servidor web
    port: 9876,

    // Colores en la salida
    colors: true,

    // Nivel de logging
    logLevel: config.LOG_INFO,

    // Browsers
    browsers: ['Chrome'],

    // AutoWatch y SingleRun
    autoWatch: true,
    singleRun: false,

    // Plugins de Karma
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'), // Agregamos el plugin de cobertura de código
      require('karma-webpack')
    ],

    // Procesadores de archivos
    preprocessors: {
      'src/**/*.spec.ts': ['webpack']
    },

    // Configuración de webpack para transpilar los archivos de prueba
    webpack: {
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  configFile: 'tsconfig.json'
                }
              }
            ]
          }
        ]
      },
      resolve: {
        extensions: ['.ts']
      }
    },

    // Concurrency
    concurrency: Infinity
  });
};
