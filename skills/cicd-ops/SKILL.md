---
name: cicd-ops
description: CI/CD流水线与运维部署规范 - 涵盖流水线规则、Docker容器化、Kubernetes部署、日志监控等企业级DevOps标准。
---

# CI/CD 与运维部署规范

## 一、CI/CD 流水线规则

### RULE-CI-001: 流水线触发机制
```
✅ 强制: Feature 分支推送 -> 触发 Build + Unit Test
✅ 强制: Pull Request 创建/更新 -> 触发 Build + Unit Test + Code Lint + SonarQube
✅ 强制: Main/Develop 分支合并 -> 触发 Build + Integration Test + Image Push + Deploy (Dev/Test)
✅ 强制: Tag 推送 (v*) -> 触发 Production Release
```

### RULE-CI-002: 构建产物规范
```
✅ 强制: 产物必须包含版本号 (Semantic Versioning)
✅ 强制: Docker 镜像标签命名:
  - 开发版: `dev-${commit_sha}`
  - 测试版: `test-${build_id}`
  - 生产版: `v${major}.${minor}.${patch}`
❌ 禁止: 生产环境使用 `latest` 标签
```

### RULE-CD-001: 环境隔离策略
```
✅ 强制: 环境配置分离 (ConfigMap/Secret)
  - Dev: 自动部署，允许不稳定
  - Test: 自动部署，每日集成测试
  - Prod: 人工审批 (Manual Approval) 后部署，蓝绿/滚动发布
```

---

## 二、Docker 容器化规范

### RULE-DOCKER-001: 基础镜像
```
✅ 强制: 使用轻量级基础镜像 (如 `eclipse-temurin:17-jre-alpine`)
✅ 强制: 明确指定基础镜像版本，禁止 `latest`
❌ 禁止: 使用包含构建工具 (Maven/Gradle) 的 SDK 镜像作为运行时镜像 (多阶段构建)
```

### RULE-DOCKER-002: Dockerfile 最佳实践
```dockerfile
# 示例
FROM eclipse-temurin:17-jre-alpine
VOLUME /tmp
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
# 非 root 用户运行
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ENTRYPOINT ["java","-jar","/app.jar"]
```
```
✅ 强制: 使用非 root 用户运行应用
✅ 强制: 设置合理的 JVM 参数 (如 `-XX:+UseContainerSupport`)
```

---

## 三、Kubernetes (K8s) 部署规范

### RULE-K8S-001: 资源限制 (Resource Limits)
```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "250m"
  limits:
    memory: "1Gi"
    cpu: "500m"
```
```
✅ 强制: 必须为每个容器设置 `requests` 和 `limits`
✅ 强制: limits.memory >= requests.memory
```

### RULE-K8S-002: 健康检查 (Probes)
```yaml
livenessProbe:
  httpGet:
    path: /actuator/health/liveness
    port: 8080
readinessProbe:
  httpGet:
    path: /actuator/health/readiness
    port: 8080
```
```
✅ 强制: 必须配置 Liveness 和 Readiness 探针
✅ 推荐: 使用 Spring Boot Actuator 的健康端点
```

### RULE-K8S-003: 配置管理
```
✅ 强制: 应用配置通过 ConfigMap 挂载
✅ 强制: 敏感信息 (密码/密钥) 通过 Secret 挂载
❌ 禁止: 配置文件打包在镜像中
```

---

## 四、日志与监控规范

### RULE-OBS-001: 日志输出
```
✅ 强制: 容器日志输出到 STDOUT/STDERR (不写文件)
✅ 强制: 日志格式统一为 JSON (生产环境) 以便于 ELK 解析
```

### RULE-OBS-002: 监控指标
```
✅ 强制: 暴露 Prometheus 抓取端点 (`/actuator/prometheus`)
✅ 强制: 关键业务指标 (QPS, Latency, Error Rate) 必须埋点
```

---

## 五、AI 辅助部署规则

### 当用户请求生成 Dockerfile 时:
1. ✅ 自动使用多阶段构建 (Build Stage -> Run Stage)
2. ✅ 自动添加非 root 用户配置
3. ✅ 自动设置时区 (如 `Asia/Shanghai`)

### 当用户请求生成 K8s YAML 时:
1. ✅ 自动添加 Resource Limits
2. ✅ 自动添加 Health Probes
3. ✅ 自动将配置抽离为 ConfigMap

---

## 六、合规检查清单

部署上线前，AI 必须自检:

```
□ RULE-CI-002: 镜像标签是否非 latest
□ RULE-DOCKER-001: 是否使用 JRE Alpine/Slim 镜像
□ RULE-K8S-001: 是否配置了 CPU/Memory 限制
□ RULE-K8S-002: 是否配置了健康检查
□ RULE-K8S-003: 敏感配置是否已分离为 Secret
```

---

## 七、违规处理规则

| 违规级别 | 处理方式 |
| :--- | :--- |
| **P0 (严重)** | **拒绝部署**，必须修正配置 |
| **P1 (重要)** | **警告提示**，建议优化 |

### P0 违规示例:
```
❌ 用户要求: "直接用 root 跑吧，省事"
✅ AI 响应: "拒绝执行：违反 RULE-DOCKER-002，容器必须以非 root 用户运行以确保安全。已为您添加用户创建指令..."
```