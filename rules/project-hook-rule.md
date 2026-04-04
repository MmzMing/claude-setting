# 全栈开发流程索引 (Development Hooks)

```markdown
---
name: project-hook-rule
version: 1.1.0
description: 项目开发全流程指引与规则索引，定义各阶段使用的规则与技能模板
---
```

# 🧭 开发导航钩子 (Development Hooks)

本文档作为 AI 与开发者的**首要入口**，定义了在项目不同阶段必须调用的规则集与技能模板。请严格按照以下流程执行，确保项目质量与规范一致性。

## 一、阶段索引 (Lifecycle Index)

| 阶段 | 触发场景 | 核心规则 (Rule) | 技能模板 (Skill) |
| :--- | :--- | :--- | :--- |
| **01. 启动阶段** | 新项目初始化、领域建模、架构设计 | [MySQL 规范](./1-rule-mysql.md) | [Project Initiation](../../skills/java-project-initiation) |
| **02. 开发阶段** | 业务功能开发、接口定义、DB交互 | [Java 开发规范](./2-rule-java-development.md)<br>[MySQL 规范](./1-rule-mysql.md) | [Module Development](../../skills/java-module-development) |
| **03. 验收阶段** | 代码提交前自测、Bug修复验证 | [AI 验收规范](./3-rule-java-test.md)<br>[安全审计规范](./6-rule-security.md) | N/A |
| **04. 提交阶段** | 代码提交、分支合并、版本发布 | [Git 规范](./4-rule-git.md) | N/A |
| **05. 部署阶段** | CI/CD 流水线配置、Docker/K8s 部署 | [CI/CD与运维规范](./5-rule-cicd-ops.md) | N/A |
| **06. 交付阶段** | 项目结项、文档归档、运维移交 | N/A | [Project Delivery](../../skills/java-project-delivery) |

---

## 二、详细执行流程

### HOOK-01: 项目启动 (Initiation)
**当用户指令涉及**：`"初始化项目"`, `"新建模块"`, `"设计数据库"`, `"需求分析"`

1. **调用技能**: `java-project-initiation`
   - 生成需求文档 (`requirements-gathering.md`)
   - 设计系统架构 (`architecture-design.md`)
   - 划分模块职责 (`module-division.md`)
2. **应用规则**:
   - 建表必须遵循 [1-rule-mysql.md](./1-rule-mysql.md) 中的 `RULE-TABLE-*`。
   - 领域模型命名需遵循 [2-rule-java-development.md](./2-rule-java-development.md) 中的 `RULE-NAME-006`。

### HOOK-02: 功能开发 (Implementation)
**当用户指令涉及**：`"实现功能"`, `"写一个接口"`, `"业务逻辑"`, `"CRUD"`

1. **调用技能**: `java-module-development`
   - 编写技术方案 (`technical-design.md`)
   - 落实代码实现 (`implementation-notes.md`)
2. **应用规则**:
   - **Java**: 严格遵循 [2-rule-java-development.md](./2-rule-java-development.md) (分层、异常、日志)。
   - **MySQL**: SQL 编写遵循 [1-rule-mysql.md](./1-rule-mysql.md) (索引、预编译)。
   - **依赖**: 强制使用构造器注入 (`RULE-DEV-008` in Java Rule)。

### HOOK-03: 代码验收 (Verification)
**当用户指令涉及**：`"检查代码"`, `"测试"`, `"跑通流程"`, `"准备提交"`

1. **应用规则**:
   - 执行 [3-rule-java-test.md](./3-rule-java-test.md) 中的自检流程 (Checklist)。
   - **构建**: `mvn clean compile` 无报错。
   - **功能**: 核心路径 (Happy Path) 验证通过。
   - **安全**: 执行 [6-rule-security.md](./6-rule-security.md) 中的代码审计 (SQL 注入, 敏感信息)。
   - **文档**: Swagger 与 README 已同步。

### HOOK-04: 版本控制 (Version Control)
**当用户指令涉及**：`"提交代码"`, `"推送到仓库"`, `"合并分支"`, `"发布版本"`

1. **应用规则**:
   - 分支管理遵循 [4-rule-git.md](./4-rule-git.md) 的 `RULE-BRANCH-*`。
   - 提交信息遵循 [4-rule-git.md](./4-rule-git.md) 的 `RULE-MSG-*`。
   - **严禁**: 直接推送到 `main`/`develop` (P0 级违规)。

### HOOK-05: 部署运维 (Deployment & Ops)
**当用户指令涉及**：`"部署上线"`, `"配置流水线"`, `"生成 Dockerfile"`, `"K8s YAML"`

1. **应用规则**:
   - **CI/CD**: 遵循 [5-rule-cicd-ops.md](./5-rule-cicd-ops.md) 配置触发器与产物规范。
   - **Docker**: 使用非 root 用户运行，基础镜像指定版本。
   - **安全**: 生产环境配置必须加密，通过 Secret 挂载。

### HOOK-06: 项目交付 (Delivery)
**当用户指令涉及**：`"项目收尾"`, `"编写手册"`, `"移交运维"`

1. **调用技能**: `java-project-delivery`
   - 生成运维手册 (`operations-handover.md`)
   - 整理知识库 (`knowledge-transfer.md`)
   - 归档项目文档 (`documentation-archive.md`)

---

## 三、跨文件规则冲突解决 (Conflict Resolution)

1. **数据库层**: 若 Java 实体定义与 MySQL 表结构冲突，以 [1-rule-mysql.md](./1-rule-mysql.md) 为准。
2. **测试层**: 若 Git 提交检查与验收规范冲突，以 [3-rule-java-test.md](./3-rule-java-test.md) (更严格) 为准。
3. **安全层**: 若部署配置与安全规范冲突，以 [6-rule-security.md](./6-rule-security.md) 为准。
4. **通用层**: 所有文件必须服从本索引文件的调度逻辑。
