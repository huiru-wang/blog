module.exports = {
    apps: [{
        name: 'blog-app',
        script: 'npm',
        args: 'start',
        instances: 1, // 单实例，避免内存竞争
        exec_mode: 'fork', // 使用fork模式，更稳定
        max_memory_restart: '800M', // 内存超过800MB自动重启
        min_uptime: '10s', // 最小运行时间
        max_restarts: 10, // 最大重启次数
        restart_delay: 4000, // 重启延迟
        kill_timeout: 5000, // 强制杀死进程超时
        wait_ready: true, // 等待应用就绪
        listen_timeout: 10000, // 监听超时
        env: {
            NODE_ENV: 'production',
            NODE_OPTIONS: '--max-old-space-size=800', // 限制Node.js堆内存
            PORT: 3000
        },
        // 内存监控
        monitoring: {
            memory: true,
            cpu: true
        },
        // 日志配置
        log_file: './logs/combined.log',
        out_file: './logs/out.log',
        error_file: './logs/error.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        merge_logs: true,
        // 自动重启策略
        autorestart: true,
        watch: false, // 生产环境关闭文件监听
        ignore_watch: ['node_modules', 'logs', '*.log'],
        // 健康检查
        health_check_grace_period: 3000,
        health_check_interval: 30000
    }]
};
