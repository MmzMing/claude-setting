# 模块测试计划 (Test Plan)

**模块名称**: [Module Name]
**测试负责人**: [Name]
**日期**: [YYYY-MM-DD]

---

## 1. 测试策略 (Test Strategy)

- **单元测试 (Unit Test)**: 使用 JUnit 5 + Mockito，覆盖 Service 层核心逻辑。目标覆盖率 > 80%。
- **集成测试 (Integration Test)**: 使用 @SpringBootTest，连接 H2/Docker 数据库，测试 Controller 到 DB 的完整链路。
- **接口测试 (API Test)**: 使用 Postman / JMeter 进行接口功能和性能测试。

## 2. 测试环境 (Test Environment)
- **OS**: Linux / Windows
- **JDK**: 17
- **DB**: MySQL 8.0 (Test Instance)
- **Redis**: 7.0

## 3. 测试用例 (Test Cases)

### 3.1 单元测试用例

| ID | 测试类/方法 | 输入数据 | 预期输出 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| UT-001 | `UserServiceTest.testCreateUser` | 合法用户对象 | 返回 UserDTO, ID不为空 | 正常流程 |
| UT-002 | `UserServiceTest.testCreateUser` | 用户名重复 | 抛出 `DuplicateUserException` | 异常流程 |

### 3.2 集成测试用例

| ID | API 路径 | 请求参数 | 预期响应码 | 数据库状态 |
| :--- | :--- | :--- | :--- | :--- |
| IT-001 | `POST /users` | `{name: "test"}` | 201 Created | `users` 表新增一条记录 |

## 4. 性能测试 (Performance Test) (Optional)
- **场景**: 高并发下单
- **工具**: JMeter
- **指标**: QPS > 1000, RT < 200ms
