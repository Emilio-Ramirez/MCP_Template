export default {
  // Watch the IBSO business units server
  'ibso-business-units': {
    command: 'node',
    args: ['ibso-business-units/index.js'],
    watch: [
      'ibso-business-units/**/*.js',
      'ibso-business-units/**/*.md',
      'ibso-business-units/config/*.js',
      'ibso-business-units/resources/**/*.js',
      'ibso-business-units/README-*.md'
    ],
    ignore: [
      'node_modules/**',
      '**/.git/**',
      '**/dist/**'
    ]
  },
  
  // Watch other MCP servers too
  'crm-template-base': {
    command: 'node',
    args: ['crm-template-base/index.js'],
    watch: [
      'crm-template-base/**/*.js',
      'crm-template-base/**/*.md'
    ],
    ignore: [
      'node_modules/**',
      '**/.git/**'
    ]
  }
};