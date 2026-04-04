# 运维交接手册 (Operations Handover)

**项目名称**: [Project Name]
**版本**: 1.0.0
**日期**: [YYYY-MM-DD]

---

## 1. 系统环境 (Environment)

| 环境 | IP 地址 | 用途 | 配置规格 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| **Production** | 192.168.1.100 | 应用服务器 | 8C 16G | |
| **Production** | 192.168.1.101 | 数据库服务器 | 16C 32G | MySQL Master |
| **Staging** | 192.168.1.200 | 预发布环境 | 4C 8G | |

## 2. 部署指南 (Deployment Guide)

### 2.1 依赖项
- JDK 17
- Docker 20.10+
- Nginx 1.20+

### 2.2 启动命令
```bash
# 启动应用
java -jar -Dspring.profiles.active=prod app.jar

# Docker 启动
docker-compose up -d
```

### 2.3 停止/重启命令
```bash
kill -15 <pid>
# 或
docker-compose restart app
```

## 3. 监控与告警 (Monitoring & Alerting)

- **监控地址**: `http://monitor.example.com` (Grafana)
- **关键指标**:
    - CPU / Memory 使用率
    - JVM Heap / GC
    - HTTP 5xx 错误率
    - 接口响应时间 (P99)
- **告警规则**:
    - CPU > 80% 持续 5分钟 -> 发送邮件/短信
    - 错误率 > 5% -> 电话通知

## 4. 备份与恢复 (Backup & Recovery)

- **数据库备份**: 每日凌晨 02:00 全量备份，保留 30 天。
- **恢复步骤**:
    1. 停止应用服务
    2. 执行 `mysql -u root -p < backup.sql`
    3. 验证数据完整性
    4. 启动应用服务

## 5. 紧急联系人 (Emergency Contacts)

| 姓名 | 角色 | 电话 | 邮箱 |
| :--- | :--- | :--- | :--- |
| [Name] | 开发负责人 | 138xxxx | email@example.com |
| [Name] | 运维负责人 | 139xxxx | ops@example.com |
