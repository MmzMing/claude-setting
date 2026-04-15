---
name: mysql-standards
description: MySQL企业级开发规范 - 涵盖命名规范、建表规范、字段类型、索引规范、SQL编写、安全规范、事务规范等企业级MySQL开发标准。
---

# MySQL 企业级开发规范

## 一、命名规范规则

### RULE-NAME-001: 时间字段命名
```
❌ 禁止: created_at, updated_at
✅ 强制: created_time, updated_time
```
### RULE-NAME-002: 表名命名
```
✅ 强制: 小写字母 + 下划线 (snake_case)
✅ 强制: 使用复数形式 (users, orders)
❌ 禁止: 大写字母、中划线、驼峰命名
```

### RULE-NAME-003: 字段名命名
```
✅ 强制: 小写字母 + 下划线 (user_id, order_no)
❌ 禁止: 驼峰命名 (userId, orderNo)
```

### RULE-NAME-004: 索引命名
```
主键:     PRIMARY KEY (`id`)
唯一索引: uk_表名_字段名  (uk_users_email)
普通索引: idx_表名_字段名 (idx_users_status)
```

---

## 二、建表规范规则

### RULE-TABLE-001: 存储引擎
```sql
✅ 强制: ENGINE=InnoDB
❌ 禁止: ENGINE=MyISAM 或其他引擎
```

### RULE-TABLE-002: 字符集
```sql
✅ 强制: DEFAULT CHARSET=utf8mb4
✅ 推荐: COLLATE=utf8mb4_0900_ai_ci
❌ 禁止: utf8、gbk 等其他字符集
```

### RULE-TABLE-003: 主键规范
```sql
✅ 强制: `id` BIGINT UNSIGNED NOT NULL
❌ 禁止: UUID、VARCHAR 作为物理主键
```

### RULE-TABLE-004: 非空约束
```sql
✅ 强制: 所有字段 NOT NULL
✅ 强制: 所有字段指定 DEFAULT 值
❌ 禁止: 允许 NULL (特殊业务场景除外)
```

### RULE-TABLE-005: 必备字段
```sql
✅ 强制包含:
  - `id`              BIGINT UNSIGNED  主键
  - `created_time`    DATETIME         创建时间
  - `updated_time`    DATETIME         更新时间
  - `is_deleted`      TINYINT          软删除标识 (推荐)
```

### RULE-TABLE-006: 字段注释
```sql
✅ 强制: 所有表必须有 COMMENT
✅ 强制: 所有字段必须有 COMMENT
```

---

## 三、字段类型规则

### RULE-TYPE-001: 金额字段
```sql
✅ 强制: DECIMAL(10,2) 或 DECIMAL(18,2)
❌ 禁止: FLOAT、DOUBLE、VARCHAR
```

### RULE-TYPE-002: 状态字段
```sql
✅ 强制: TINYINT NOT NULL DEFAULT 0/1
✅ 强制: COMMENT 中说明枚举值含义
```

### RULE-TYPE-003: 时间字段
```sql
✅ 强制: DATETIME 或 TIMESTAMP
✅ 推荐: created_time DEFAULT CURRENT_TIMESTAMP
✅ 推荐: updated_time ON UPDATE CURRENT_TIMESTAMP
```

### RULE-TYPE-004: 字符串字段
```sql
✅ 强制: VARCHAR 指定合理长度
✅ 强制: NOT NULL DEFAULT ''
❌ 禁止: 无长度限制
```

---

## 四、索引规范规则

### RULE-INDEX-001: 主键索引
```sql
✅ 强制: 每张表必须有 PRIMARY KEY
```

### RULE-INDEX-002: 联合索引
```sql
✅ 强制: 遵循最左前缀原则
✅ 强制: 区分度高的字段放在左侧
❌ 禁止: 低区分度字段单独建索引
```

### RULE-INDEX-003: 索引数量
```sql
✅ 限制: 单表索引不超过 5 个
❌ 禁止: 过度索引影响写性能
```

### RULE-INDEX-004: 外键约束
```sql
❌ 禁止: 物理外键 CONSTRAINT FOREIGN KEY
✅ 强制: 应用层控制关联关系
```

---

## 五、SQL 编写规则

### RULE-SQL-001: 查询字段
```sql
❌ 禁止: SELECT *
✅ 强制: SELECT field1, field2, field3
```

### RULE-SQL-002: 索引列使用
```sql
❌ 禁止: WHERE YEAR(created_time) = 2026
❌ 禁止: WHERE DATE(created_time) = '2026-01-01'
❌ 禁止: WHERE phone = 13800000000  (隐式转换)
✅ 强制: WHERE created_time >= '2026-01-01 00:00:00'
✅ 强制: WHERE phone = '13800000000'  (类型匹配)
```

### RULE-SQL-003: LIKE 查询
```sql
❌ 禁止: LIKE '%keyword'  (前导模糊)
✅ 允许: LIKE 'keyword%'  (后导模糊)
```

### RULE-SQL-004: JOIN 限制
```sql
✅ 限制: 关联表数量 ≤ 3
✅ 强制: 关联字段类型一致且有索引
```

### RULE-SQL-005: 分页优化
```sql
❌ 避免: LIMIT 100000, 20  (深分页)
✅ 推荐: WHERE id > last_id LIMIT 20
```

### RULE-SQL-006: 批量操作
```sql
✅ 限制: 单次批量 INSERT ≤ 500 条
✅ 强制: 使用事务包裹
```

---

## 六、安全规范规则

### RULE-SEC-001: SQL 注入防护
```python
✅ 强制: 使用预编译参数
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))

❌ 禁止: 字符串拼接
sql = f"SELECT * FROM users WHERE id = {user_id}"
```

### RULE-SEC-002: 敏感数据加密
```
✅ 强制: 密码使用 BCrypt/Argon2
✅ 强制: 手机号/身份证/银行卡加密存储
✅ 强制: 日志中脱敏敏感信息
```

### RULE-SEC-003: 数据库权限
```sql
✅ 强制: 应用账号最小权限 (SELECT/INSERT/UPDATE/DELETE)
❌ 禁止: 应用使用 root 账号
❌ 禁止: 授予 DROP/ALTER 权限
```

---

## 七、事务规范规则

### RULE-TX-001: 事务长度
```
✅ 强制: 保持短事务
❌ 禁止: 事务内包含 HTTP/RPC 请求
❌ 禁止: 事务内包含耗时操作
```

### RULE-TX-002: 事务隔离
```
✅ 推荐: 默认隔离级别 REPEATABLE-READ
✅ 强制: 涉及并发更新时使用乐观锁/悲观锁
```

---

## 八、标准建表模板

```sql
CREATE TABLE `table_name` (
  `id` BIGINT UNSIGNED NOT NULL COMMENT '主键 ID',

  -- 业务字段
  `field_name` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '字段说明',
  `status` TINYINT NOT NULL DEFAULT 1 COMMENT '状态 1:正常 0:禁用',
  `amount` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT '金额',

  -- 时间字段 (RULE-NAME-001)
  `created_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

  -- 审计字段
  `created_by` BIGINT NOT NULL DEFAULT 0 COMMENT '创建人 ID',
  `updated_by` BIGINT NOT NULL DEFAULT 0 COMMENT '更新人 ID',

  -- 软删除 (RULE-TABLE-005)
  `is_deleted` TINYINT NOT NULL DEFAULT 0 COMMENT '软删除 0:正常 1:删除',

  -- 索引
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_field_name` (`field_name`),
  KEY `idx_status_created` (`status`, `created_time`),
  KEY `idx_created_time` (`created_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='表说明';
```

---

## 九、AI 代码生成规则

### 当用户请求建表时:
1. ✅ 自动使用 `created_time` / `updated_time` 命名
2. ✅ 自动添加 `id`, `is_deleted` 字段
3. ✅ 自动设置 `InnoDB` + `utf8mb4`
4. ✅ 自动为所有字段添加 `COMMENT`
5. ✅ 自动为所有字段设置 `NOT NULL + DEFAULT`

### 当用户请求查询时:
1. ✅ 自动展开字段，禁止 `SELECT *`
2. ✅ 自动检查索引命中情况
3. ✅ 自动使用预编译占位符 `?` 或 `:param`
4. ✅ 自动添加 `is_deleted = 0` 条件 (如有该字段)

### 当用户请求优化时:
1. ✅ 自动分析 `EXPLAIN` 结果
2. ✅ 自动指出索引失效点
3. ✅ 自动提供优化方案

---

## 十、合规检查清单

执行任何数据库操作前，AI 必须自检:

```
□ RULE-NAME-001: 时间字段是否为 created_time/updated_time
□ RULE-TABLE-001: 引擎是否为 InnoDB
□ RULE-TABLE-002: 字符集是否为 utf8mb4
□ RULE-TABLE-003: 主键是否为 BIGINT UNSIGNED
□ RULE-TABLE-004: 所有字段是否 NOT NULL + DEFAULT
□ RULE-TABLE-006: 所有表/字段是否有 COMMENT
□ RULE-SQL-001: 是否避免 SELECT *
□ RULE-SQL-002: 索引列是否无函数/类型转换
□ RULE-SEC-001: 是否使用预编译参数
□ RULE-INDEX-004: 是否避免物理外键
```

---

## 十一、违规处理规则

| 违规级别  | 处理方式               |
| --------- | ---------------------- |
| P0 (严重) | 拒绝执行，提供修正方案 |
| P1 (重要) | 警告提示，建议修正     |
| P2 (建议) | 提示信息，可选修正     |

### P0 违规示例:
```
❌ 用户要求: "用 UUID 做主键"
✅ AI 响应: "违反 RULE-TABLE-003，建议使用 BIGINT 自增或雪花算法，原因：..."
```

### P1 违规示例:
```
⚠️ 用户要求: "这个字段可以为 NULL"
✅ AI 响应: "警告：违反 RULE-TABLE-004，建议 NOT NULL + DEFAULT，原因：..."
```