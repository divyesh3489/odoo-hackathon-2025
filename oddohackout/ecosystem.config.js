module.exports = {
  apps: [
    {
      name: 'odoo-hackathon-django',
      script: 'python',
      args: 'manage.py runserver 0.0.0.0:8080',
      cwd: 'D:\\Projects\\Eliscops\\odoo-hackathon-2025\\oddohackout',
      interpreter: 'none',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        DJANGO_SETTINGS_MODULE: 'oddohackout.settings'
      },
      env_production: {
        NODE_ENV: 'production',
        DJANGO_SETTINGS_MODULE: 'oddohackout.settings'
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true
    }
  ]
};
