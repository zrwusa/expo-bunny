import {APPConfig} from './types';

const config: APPConfig = {
    'auth': {
        'env': 'dev',
        'dev': {
            'isHttps': false,
            'domain': '192.168.50.19',
            'port': 8080
        },
        'prod': {
            'isHttps': true,
            'domain': 'fatpomelo.fun',
            'port': 443
        },
        'timeout': 2000,
        'shouldCollectError': true,
        'isDevServer': false,
        'devServer': {
            'domain': 'localhost',
            'port': 3006
        },
        'isDevServerProxy': false,
        'devServerProxy': {
            '/api': {
                'target': 'http://localhost:8006',
                'pathRewrite': {
                    '^/api-rewrite-path': ''
                }
            }
        },
    },
    'bunny': {
        'env': 'dev',
        'dev': {
            'isHttps': false,
            'domain': '192.168.50.19',
            'port': 8080
        },
        'prod': {
            'isHttps': true,
            'domain': 'fatpomelo.fun',
            'port': 443
        },
        'timeout': 2000,
        'shouldCollectError': true,
        'isDevServer': false,
        'devServer': {
            'domain': 'localhost',
            'port': 3007
        },
        'isDevServerProxy': false,
        'devServerProxy': {
            '/api': {
                'target': 'http://localhost:8007',
                'pathRewrite': {
                    '^/api-rewrite-path': ''
                }
            }
        },
    },
    'nomics': {
        'env': 'dev',
        'dev': {
            'isHttps': false,
            'domain': '192.168.50.19',
            'port': 8080
        },
        'prod': {
            'isHttps': true,
            'domain': 'fatpomelo.fun',
            'port': 443
        },
        'timeout': 5000,
        'shouldCollectError': true,
        'isDevServer': false,
        'devServer': {
            'domain': 'localhost',
            'port': 3008
        },
        'isDevServerProxy': false,
        'devServerProxy': {
            '/api': {
                'target': 'http://localhost:8008',
                'pathRewrite': {
                    '^/api-rewrite-path': ''
                }
            }
        },
    },
    'mock': {
        'isHttps': true,
        'port': 80
    },
    'UE': {
        'dimensions': {
            'bunnyUI': {
                'width': 375,
                'height': 812
            },
            'iphoneX': {
                'width': 375,
                'height': 812
            },
            'iPad': {
                'width': 768,
                'height': 1024
            },
            'pixel2XL': {
                'width': 768,
                'height': 1024
            },
            'pcBrowser': {
                'width': 1366,
                'height': 784
            },
            'custom1': {
                'width': 450,
                'height': 800
            },
            'custom2': {
                'width': 450,
                'height': 800
            },
            'custom3': {
                'width': 450,
                'height': 800
            }
        }
    },
    'useNativeDriver': true
}

export default config
