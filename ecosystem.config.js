module.exports = {
  apps: [
    {
      name: 'development',
      script: 'src/app.ts',
      node_args: '-r dotenv/config',
      max_memory_restart: '256M',
      autorestart: true
    },
    {
      name: 'production',
      script: 'build/app.js',
      node_args: '-r dotenv/config',
      max_memory_restart: '256M',
      autorestart: true
    }
  ]
}
