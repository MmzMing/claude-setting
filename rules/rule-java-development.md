# Java 企业级开发规范

```markdown
---
name: java-enterprise-rule
version: 1.2.0
description: 企业级 Java 开发规范规则集
---
```

# 📏 Java 企业级开发规则

## 一、核心原则规则

### RULE-CORE-001: 设计原则
```
✅ 强制: 遵循 SOLID 原则 (单一职责、开闭、里氏替换、接口隔离、依赖倒置)
✅ 强制: 遵循 DRY (Don't Repeat Yourself) 原则
✅ 强制: 遵循 KISS (Keep It Simple, Stupid) 原则
❌ 禁止: 过度设计 (YAGNI - You Ain't Gonna Need It)
```

### RULE-CORE-002: 安全原则
```
✅ 强制: 遵循 OWASP Top 10 安全最佳实践
✅ 强制: 所有外部输入必须校验
❌ 禁止: 信任任何客户端输入
```

### RULE-CORE-003: 代码质量
```
✅ 强制: 核心业务单元测试覆盖率 ≥ 80%
✅ 强制: 提交代码前必须通过 Build 检查
❌ 禁止: 提交包含语法错误或编译失败的代码
```

---

## 二、命名规范规则

### RULE-NAME-001: 类名命名
```
✅ 强制: UpperCamelCase (UserController, OrderService)
❌ 禁止: 下划线、中划线、纯小写
```

### RULE-NAME-002: 方法名/变量名命名
```
✅ 强制: lowerCamelCase (getUserById, userName)
❌ 禁止: 下划线开头、拼音命名 (huoquYonghu)
```

### RULE-NAME-003: 常量命名
```
✅ 强制: UPPER_SNAKE_CASE (MAX_RETRY_COUNT)
❌ 禁止: 小写、混合大小写
```

### RULE-NAME-004: 包名命名
```
✅ 强制: 全部小写 (com.example.project.controller)
❌ 禁止: 大写字母、特殊符号
```

### RULE-NAME-005: 实现类命名
```
✅ 强制: 接口名 + Impl (UserServiceImpl)
❌ 禁止: Impl + 接口名 (ImplUserService)
```

### RULE-NAME-006: 领域模型命名
```
✅ 强制: 
  - DO: TableName + DO (UserDO)
  - DTO: XxxDTO (UserCreateDTO)
  - VO: XxxVO (UserDetailVO)
  - Query: XxxQuery (UserSearchQuery)
❌ 禁止: 混用后缀 (UserEntity 用于传输)
```

---

## 三、应用架构规则

### RULE-ARCH-001: 分层架构
```
✅ 强制: Controller -> Service -> (Manager) -> Mapper
❌ 禁止: Controller -> Mapper (跨层调用)
❌ 禁止: Mapper -> Service (反向调用)
```

### RULE-ARCH-002: Controller 层约束
```
✅ 强制: 仅处理 HTTP 请求、参数校验、结果封装
✅ 强制: 返回统一 Result<T>
✅ 强制: 使用 GatewayContextHolder 获取用户信息
❌ 禁止: 编写复杂业务逻辑
❌ 禁止: 直接操作数据库 (Repository/Mapper)
❌ 禁止: 在 Service 层解析 HttpServletRequest
```

### RULE-ARCH-003: Service 层约束
```
✅ 强制: 负责核心业务逻辑、事务控制
✅ 强制: 方法粒度适中，单一职责
✅ 强制: 事务注解 @Transactional 仅加在 Public 方法上
❌ 禁止: 在循环中调用数据库查询 (N+1 问题)
❌ 禁止: 在循环中调用远程 RPC
❌ 禁止: 跨层调用 Controller
```

### RULE-ARCH-004: Mapper 层约束
```
✅ 强制: 仅负责数据库 CRUD 操作
✅ 强制: 优先使用 MyBatis-Plus / JPA
✅ 强制: 复杂 SQL 必须写在 XML 中
❌ 禁止: 在 Java 代码中拼接 SQL
❌ 禁止: 使用 Map 作为参数或返回值 (必须用 DTO/DO)
```

---

## 四、开发规范规则

### RULE-DEV-001: RESTful API
```
✅ 强制: 路径使用复数名词、kebab-case (/api/users/{id})
✅ 强制: GET (查询), POST (创建/复杂查询), PUT (全量更新), DELETE (删除)
❌ 禁止: 动词作为路径 (/api/getUsers)
❌ 禁止: 使用非标准 HTTP 状态码表示业务含义 (统一 200，业务码在 Result 中)
```

### RULE-DEV-002: 数据库交互
```
✅ 强制: 指定具体查询字段 (SELECT id, name)
✅ 强制: 批量操作使用 IN 或 Batch Insert
❌ 禁止: SELECT *
❌ 禁止: 循环单条插入/更新
```

### RULE-DEV-003: 实体与ID
```
✅ 强制: 使用 @Builder 或 Setter 显式赋值所有必填字段
✅ 强制: 使用雪花算法 (Snowflake) 或 UUID
❌ 禁止: 依赖数据库默认值 (Default)
❌ 禁止: 使用数据库自增 ID (分库分表场景)
```

### RULE-DEV-004: 金额处理
```
✅ 强制: 数据库使用 DECIMAL(20, 2) 或 BIGINT (分)
✅ 强制: Java 使用 BigDecimal 或 Long (分)
❌ 禁止: 使用 float / double 进行金额计算
```

### RULE-DEV-005: 异常处理
```
✅ 强制: 使用全局异常处理器 (@RestControllerAdvice)
✅ 强制: 自定义异常 BusinessException (包含 code, msg)
✅ 强制: 捕获异常必须记录日志 (log.error)
❌ 禁止: 吞掉异常 (catch { // do nothing })
❌ 禁止: e.printStackTrace()
```

### RULE-DEV-006: 日志规范
```
✅ 强制: 使用 SLF4J / Lombok @Slf4j
✅ 强制: 使用占位符 (log.info("userId: {}", id))
❌ 禁止: System.out.println
❌ 禁止: 字符串拼接日志
```

### RULE-DEV-007: 工具类使用
```
✅ 强制: Hutool (StrUtil, CollUtil, DateUtil)
✅ 强制: MapStruct 或手动 Setter/Builder
❌ 禁止: BeanUtil.copyProperties (性能差、易出错)
❌ 禁止: Apache Commons Lang (在已有 Hutool 情况下)
```

### RULE-DEV-008: 依赖注入
```
✅ 强制: 使用构造器注入 (Constructor Injection)
✅ 推荐: 使用 Lombok @RequiredArgsConstructor
❌ 禁止: 使用 @Autowired 字段注入 (Field Injection)
```

---

## 五、并发与性能规则

### RULE-PERF-001: 线程池
```java
✅ 强制: 使用 ThreadPoolExecutor 手动创建
ThreadPoolExecutor executor = new ThreadPoolExecutor(
    corePoolSize, maxPoolSize, keepAliveTime, unit,
    new ArrayBlockingQueue<>(queueSize),
    new ThreadFactoryBuilder().setNameFormat("pool-%d").build(),
    new ThreadPoolExecutor.CallerRunsPolicy()
);

❌ 禁止: Executors.newFixedThreadPool() (无界队列风险)
❌ 禁止: 显式 new Thread()
```

### RULE-PERF-002: 锁机制
```
✅ 强制: 锁粒度最小化
✅ 推荐: Redisson 分布式锁
❌ 禁止: 大范围 synchronized
```

### RULE-PERF-003: 事务控制
```
✅ 强制: 事务粒度尽可能小
❌ 禁止: 事务中包含 RPC / HTTP 请求
❌ 禁止: 事务中包含慢 SQL
```

---

## 六、安全规范规则

### RULE-SEC-001: SQL 注入
```
✅ 强制: 使用预编译语句 (#{param})
❌ 禁止: SQL 拼接 (${param})
```

### RULE-SEC-002: 敏感数据
```
✅ 强制: 密码加盐 Hash (BCrypt)
✅ 强制: 身份证/银行卡加密存储
❌ 禁止: 明文存储密码
❌ 禁止: 日志打印敏感数据
```

### RULE-SEC-003: 权限控制
```
✅ 强制: 接口添加权限注解 (@PreAuthorize)
✅ 强制: 水平越权校验 (检查资源归属)
```

---

## 七、标准代码模板

### RULE-TMPL-001: 统一响应 (Result)
```java
public class Result<T> {
    private Integer code;
    private String msg;
    private T data;
}
```

### RULE-TMPL-002: 全局异常处理
```java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * 业务异常
     */
    @ExceptionHandler(BusinessException.class)
    public Result<?> handleBusinessException(BusinessException e) {
        log.warn("业务异常: code={}, msg={}", e.getCode(), e.getMessage());
        return Result.error(e.getCode(), e.getMessage());
    }

    /**
     * 参数校验异常 (@RequestBody)
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        String msg = e.getBindingResult().getFieldErrors().stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.joining(", "));
        log.warn("参数校验异常: {}", msg);
        return Result.error(400, msg);
    }

    /**
     * 参数校验异常 (@RequestParam / @PathVariable)
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public Result<?> handleConstraintViolationException(ConstraintViolationException e) {
        String msg = e.getConstraintViolations().stream()
            .map(violation -> violation.getPropertyPath() + ": " + violation.getMessage())
            .collect(Collectors.joining(", "));
        log.warn("参数校验异常: {}", msg);
        return Result.error(400, msg);
    }

    /**
     * 缺少请求参数
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public Result<?> handleMissingServletRequestParameterException(MissingServletRequestParameterException e) {
        log.warn("缺少请求参数: {}", e.getParameterName());
        return Result.error(400, "缺少请求参数: " + e.getParameterName());
    }

    /**
     * 参数类型不匹配
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public Result<?> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        log.warn("参数类型不匹配: param={}, type={}", e.getName(), e.getRequiredType().getSimpleName());
        return Result.error(400, "参数类型不匹配: " + e.getName());
    }

    /**
     * 请求方法不支持
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public Result<?> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        log.warn("请求方法不支持: {}", e.getMethod());
        return Result.error(405, "请求方法不支持: " + e.getMethod());
    }

    /**
     * 系统异常
     */
    @ExceptionHandler(Exception.class)
    public Result<?> handleException(Exception e) {
        log.error("系统异常", e);
        return Result.error(500, "系统繁忙，请稍后重试");
    }
}
```

---

## 八、AI 代码生成规则

### 当用户请求生成 Controller 时:
1. ✅ 自动添加 `@RestController`, `@RequestMapping`
2. ✅ 自动注入 Service (使用构造器注入 `final` 字段 + `@RequiredArgsConstructor`)
3. ✅ 所有方法返回 `Result<T>`
4. ✅ 自动添加 Swagger 注解 (`@Tag`, `@Operation`)

### 当用户请求生成 Service 时:
1. ✅ 自动添加 `@Service`
2. ✅ 业务方法添加 `@Transactional` (如需)
3. ✅ 使用 `Hutool` 工具类处理逻辑
4. ✅ 抛出 `BusinessException` 而非 `RuntimeException`

### 当用户请求生成 Mapper 时:
1. ✅ 继承 `BaseMapper<T>`
2. ✅ 加上 `@Mapper` 注解
3. ✅ 复杂 SQL 生成 XML 文件

---

## 九、合规检查清单

执行代码变更前，AI 必须自检:

```
□ RULE-ARCH-002: Controller 是否未包含业务逻辑
□ RULE-ARCH-003: Service 是否未循环调用 DB
□ RULE-DEV-007: 是否未使用 BeanUtil.copyProperties
□ RULE-DEV-004: 金额计算是否未使用 float/double
□ RULE-PERF-001: 是否未使用 new Thread()
□ RULE-SEC-001: SQL 是否无拼接风险
□ RULE-DEV-006: 日志是否未使用 System.out.println
```

---

## 十、违规处理规则

| 违规级别 | 处理方式 |
| :--- | :--- |
| **P0 (严重)** | **拒绝执行**，必须修正后才能提交 |
| **P1 (重要)** | **警告提示**，强烈建议修正 |
| **P2 (建议)** | **提示信息**，优化建议 |

### P0 违规示例:
```
❌ 用户要求: "用 double 算一下订单金额"
✅ AI 响应: "拒绝执行：违反 RULE-DEV-004，金额计算严禁使用 double，必须使用 BigDecimal。已为您修正为 BigDecimal 实现..."
```

### P1 违规示例:
```
⚠️ 用户要求: "直接在 Controller 里查数据库吧，快一点"
✅ AI 响应: "警告：违反 RULE-ARCH-002，Controller 禁止直接操作数据库。建议下沉到 Service 层实现..."
```
