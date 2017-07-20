var config = {
  dev: {
    port: process.env.PORT || 3010,
    logger: {
        name: 'default',
        streams: [{
            stream: process.stdout,
            level: 'trace'
        }]
    },
    db: {
      url: 'mongodb://localhost:27017/tasks-dev',
      options: {}
    }
  },
  test: {
    port: process.env.PORT || 3010,
    logger: {
        name: 'default',
        streams: [{
            stream: process.stdout,
            level: 'fatal'
        }]
    },
    db: {
      url: 'mongodb://localhost:27017/tasks-test',
      options: {}
    }
  },
  staging: {
    port: process.env.PORT || 3010,
    logger: {
        name: 'default',
        streams: [{
            stream: process.stdout,
            level: 'debug'
        }]
    },
    db: {
      url: 'mongodb://localhost:27017/tasks-staging',
      options: {}
    }
  },
  production: {
    port: process.env.PORT || 3010,
    logger: {
        name: 'default',
        streams: [{
            stream: process.stdout,
            level: 'info'
        }]
    },
    db: {
      url: 'mongodb://localhost:27017/tasks-prod',
      options: {}
    }
  }
};

module.exports = config[process.env.NODE_ENV] || config['dev'];
