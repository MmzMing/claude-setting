---
name: java-delivery-acceptance
description: Java项目AI交付验收规范 - 涵盖交付前自动化验收流程、构建测试、需求对齐、接口验证、文档同步等AI代码交付标准。
version: 1.0.0
---

# AI 交付验收规范

## 一、核心原则规则

### RULE-CORE-001: 交付即生产
```
✅ 强制: 所有交付代码必须通过 Maven 构建
✅ 强制: 所有交付功能必须与需求文档一致
✅ 强制: 所有代码变更必须同步更新相关文档
❌ 禁止: 交付无法编译的代码
❌ 禁止: 交付未经验证的"猜测性"修复
```

### RULE-CORE-002: 测试完整性
```
✅ 强制: 单元测试覆盖率不低于 80% (核心业务)
✅ 强制: 所有新增功能必须补充对应的单元测试
✅ 强制: 集成测试覆盖关键业务流程
❌ 禁止: 测试用例仅覆盖 Happy Path
```

### RULE-CORE-003: 代码质量门槛
```
✅ 强制: SonarQube 评级达到 A 或 B 级
✅ 强制: 无 Critical/Blocker 级别问题
✅ 强制: 代码重复率低于 5%
```

---

## 二、构建与测试规则

### RULE-BUILD-001: 编译检查
```
✅ 强制: 每次修改代码后，必须执行 mvn clean compile
✅ 强制: 确保无 Error 级别的编译错误
✅ 强制: 修正所有 Lint 工具发现的 High/Critical 级别警告
```

### RULE-BUILD-002: 单元测试回归
```bash
✅ 强制: mvn test 确保现有测试全部通过
✅ 强制: 新增功能必须补充对应的单元测试 (覆盖 Happy Path + 边界场景)
✅ 强制: 测试通过率 100% (允许跳过已标注的 @Disabled 测试)
❌ 禁止: 跳过失败的测试 (-Dmaven.test.skip=true)
```

### RULE-BUILD-003: 集成测试
```bash
✅ 强制: mvn verify 执行完整测试生命周期
✅ 强制: 关键业务流程必须包含集成测试
✅ 强制: 外部依赖使用 Mock 或 Testcontainers
```

### RULE-BUILD-004: 构建产物验证
```
✅ 强制: mvn package 生成可执行 JAR/WAR
✅ 强制: 验证 JAR 包大小是否合理 (排除无效依赖)
✅ 强制: Spring Boot 应用需验证 spring-boot-maven-plugin 打包结果
```

---

## 三、功能验收规则

### RULE-FEAT-001: 需求对齐
```
✅ 强制: 逐条核对用户需求/PRD 文档中的功能点
✅ 强制: 验证边界条件 (空值、超长字符、负数、特殊字符)
✅ 强制: 验证异常流程 (网络超时、数据库宕机、服务不可用)
✅ 强制: 验证权限控制 (增删改查权限隔离)
```

### RULE-FEAT-002: 接口验证
```bash
✅ 强制: 使用 curl 或 Postman 验证 Controller 接口
✅ 强制: 验证 HTTP 状态码符合 RESTful 规范
  - 200 OK: 查询成功
  - 201 Created: 资源创建成功
  - 400 Bad Request: 参数校验失败
  - 401 Unauthorized: 未认证
  - 403 Forbidden: 无权限
  - 404 Not Found: 资源不存在
  - 500 Internal Server Error: 服务器内部错误
✅ 强制: 验证响应结构体 Result<T> 完整性
✅ 强制: 验证分页返回结构 Page<T>
❌ 禁止: 仅凭代码逻辑推断接口可用性
```

### RULE-FEAT-003: 数据库验证
```
✅ 强制: 检查生成的 SQL 符合 MySQL 规范 (索引、类型、字符集)
✅ 强制: 验证数据落库的准确性 (字段映射、默认值)
✅ 强制: 验证关联查询结果正确性
✅ 强制: 验证事务边界正确性 (提交/回滚)
```

### RULE-FEAT-004: 边界条件测试矩阵
| 测试场景 | 输入类型 | 验证点 |
|---------|---------|--------|
| 空值测试 | null, "" | 是否正确处理 |
| 边界值测试 | 0, -1, MAX_VALUE | 边界是否溢出 |
| 超长测试 | 超长字符串 | 是否截断或报错 |
| 特殊字符 | ', ", <, >, &, \n | XSS 防护 |
| 格式化测试 | 日期、金额、手机号 | 格式是否正确 |

---

## 四、代码规范检查规则

### RULE-CODE-001: Java 开发规范
```
✅ 强制: 类名使用 UpperCamelCase (UserService)
✅ 强制: 方法名/变量名使用 lowerCamelCase (getUserById)
✅ 强制: 常量使用 UPPER_SNAKE_CASE (MAX_RETRY_COUNT)
✅ 强制: 包名全部小写 (com.company.module)
✅ 强制: 分层清晰: Controller -> Service -> Repository/Mapper
```

### RULE-CODE-002: 异常处理规范
```
✅ 强制: 业务异常使用自定义异常 (BusinessException)
✅ 强制: 系统异常使用 RuntimeException 包装
✅ 强制: 必须有全局异常处理器 (@ControllerAdvice)
✅ 强制: 异常信息脱敏，不暴露内部实现细节
❌ 禁止: 捕获异常后吞掉不做任何处理
❌ 禁止: 在日志中打印用户敏感信息
```

### RULE-CODE-003: 日志规范
```
✅ 强制: 使用 SLF4J + Logback/Zook
✅ 强制: 日志级别使用正确: ERROR > WARN > INFO > DEBUG
✅ 强制: 日志包含关键上下文信息 (traceId, userId, businessKey)
✅ 强制: 敏感信息日志脱敏 (手机号、身份证、银行卡)
❌ 禁止: 使用 System.out.println 或 e.printStackTrace()
```

### RULE-CODE-004: 安全规范
```
✅ 强制: SQL 使用预编译 (MyBatis #{} / JPA @Param)
✅ 强制: 接口参数校验 (@Valid, @NotNull, @NotBlank, @Size)
✅ 强制: 敏感数据加密存储 (AES/RSA)
✅ 强制: 接口防刷限流
❌ 禁止: 前端参数直接拼接 SQL
❌ 禁止: 硬编码密钥 (密码、AK/SK)
```

---

## 五、文档同步规则

### RULE-DOC-001: API 文档更新
```
✅ 强制: 接口变更后，同步更新 Swagger/OpenAPI 注解
✅ 强制: @ApiOperation 描述接口用途
✅ 强制: @ApiParam/@Schema 描述参数含义及校验规则
✅ 强制: 更新 README.md 中的接口说明 (如有)
```

### RULE-DOC-002: 代码注释规范
```
✅ 强制: 类和公共方法必须有 Javadoc
✅ 强制: 复杂业务逻辑必须添加行内注释
✅ 强制: FIXME/TODO 标注需后续处理的问题
❌ 禁止: 注释掉的废弃代码直接提交
```

### RULE-DOC-003: 变更日志 (Changelog)
```
✅ 强制: 在 CHANGELOG.md 中记录本次变更点
✅ 格式: [日期] [类型] 描述 (Issue ID)
✅ 类型: ADD / MODIFY / DELETE / FIX / OPT
```

### RULE-DOC-004: 配置文件说明
```
✅ 强制: application.yml 新增配置项必须在文档中说明
✅ 强制: 敏感配置项必须标记为"需加密"
✅ 强制: 提供各环境配置文件模板 (dev/test/prod)
```

---

## 六、AI 自检流程 (Checklist)

AI 在回复用户"已完成"之前，必须在内部执行以下自检流程：

### 1. 构建自检
- [ ] mvn clean compile 执行成功？
- [ ] mvn test 全部通过？
- [ ] mvn package 打包成功？

### 2. 功能自检
- [ ] 核心功能点 1-10 是否符合预期？
- [ ] 边界条件测试是否通过？
- [ ] 异常流程是否正确处理？

### 3. 代码规范自检
- [ ] 是否符合 Java 开发规范？
- [ ] 是否符合 MySQL 规范？
- [ ] 是否符合安全规范？
- [ ] 是否引入了未使用的依赖？
- [ ] SonarQube 评级是否达标？

### 4. 文档自检
- [ ] Swagger 注解是否已更新？
- [ ] 复杂逻辑是否已添加注释？
- [ ] CHANGELOG 是否已更新？

---

## 七、违规处理规则

| 违规级别 | 处理方式 |
| :--- | :--- |
| **P0 (严重)** | **拒绝交付**，必须修复编译错误或功能缺陷 |
| **P1 (重要)** | **警告提示**，建议完善文档或补充测试 |
| **P2 (建议)** | **提示信息**，可选优化 |

### P0 违规示例:
```
❌ 场景: 修改了 Entity 字段，但未更新 Mapper XML
✅ AI 动作: 执行 Build -> 发现失败 -> 自动修复 XML -> 重新 Build -> 成功 -> 交付

❌ 场景: 关键业务流程测试失败
✅ AI 动作: 立即停止交付，定位问题根因，修复后重新执行完整测试流程
```

### P1 违规示例:
```
⚠️ 场景: 新增了接口，但 Swagger 注解未写
✅ AI 动作: 提示用户"接口已完成，建议补充 Swagger 文档以符合规范"，或自动补充注解

⚠️ 场景: 单元测试覆盖率低于 80%
✅ AI 动作: 警告并提供补充测试用例建议
```

### P2 违规示例:
```
💡 场景: 日志级别使用不规范
✅ AI 动作: 提示优化建议，可选择性采纳
```

---

## 八、交付质量门禁 (Quality Gate)

### 定量指标
| 指标 | 门槛值 | 说明 |
|-----|-------|-----|
| 编译成功率 | 100% | mvn clean compile |
| 单元测试通过率 | 100% | mvn test |
| 覆盖率 | ≥ 80% | 核心业务模块 |
| SonarQube 评级 | ≥ B | 无 Critical/Blocker |
| 构建时长 | ≤ 5min | 增量构建 |

### 定性检查
- [ ] 代码逻辑清晰，无过多嵌套
- [ ] 变量命名语义化，见名知意
- [ ] 异常处理完善，不吞不漏
- [ ] 事务边界合理，粒度适当
- [ ] 前后端接口约定明确