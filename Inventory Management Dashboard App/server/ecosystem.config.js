module.exports = {
  apps: [
    {
      name: "Inventory Management Dashboard App",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
        ENV_VAR1: "environment-variable",
      },
    },
  ],
};
