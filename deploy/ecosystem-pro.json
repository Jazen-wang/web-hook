// 正式服部署
{
  "apps" : [{
    "name"      : "web-hook",
    "script"    : "./server.js",
    "instances" : "1",
    "exec_mode" : "cluster",
    "env": {
      "COMMON_VARIABLE": "true"
    },
    "error_file"      : "../web-hook-logs/web-hook-error.log",
    "out_file"        : "../web-hook-logs/web-hook-output.log",
    "merge_logs"      : true,
    "log_date_format" : "YYYY-MM-DD HH:mm Z",
    "watch"           : ["server.js"],
    "max_memory_restart": "4G",
    "ignore_watch"    : ["node_modules"],
    "env"             : {
      "NODE_ENV": "production"
    },
    "env_production" : {
      "NODE_ENV": "production"
    }
  }]
}
