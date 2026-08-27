# Java 接口文档通用模板与完整示例

> 本文档包含：统一返回体定义、分页结构、错误码表、以及一套用户模块 CRUD 完整示例。编写接口文档时直接复用。

---

## 一、全局约定

### 1.1 统一响应体（所有接口必须遵循）

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {},
  "timestamp": 1723456789000
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| code | Integer | 状态码，200=成功，其他见错误码表 |
| msg | String | 提示信息，成功固定"操作成功" |
| data | Object | 业务数据，无数据时为 null |
| timestamp | Long | 服务器时间戳（毫秒） |

### 1.2 分页统一结构

**请求参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| pageNum | Integer | 否 | 1 | 当前页码，从1开始 |
| pageSize | Integer | 否 | 10 | 每页条数，最大100 |

**响应 data 结构：**

```json
{
  "total": 156,
  "pages": 16,
  "current": 1,
  "size": 10,
  "rows": []
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| total | Long | 总记录数 |
| pages | Integer | 总页数 |
| current | Integer | 当前页 |
| size | Integer | 每页条数 |
| rows | List | 数据列表，空列表返回 [] 不返回 null |

### 1.3 通用错误码表

| 错误码 | 含义 | 触发场景 | 前端处理建议 |
|--------|------|----------|--------------|
| 200 | 成功 | 正常返回 | 正常渲染 data |
| 400 | 参数错误 | 参数校验失败 | 展示 msg 中的具体字段错误 |
| 401 | 未登录 | Token缺失/过期 | 跳转登录页 |
| 403 | 无权限 | 权限不足 | 提示"无操作权限" |
| 404 | 资源不存在 | 查询数据不存在 | 提示"数据不存在" |
| 409 | 数据冲突 | 重复提交/唯一键冲突 | 提示冲突原因 |
| 429 | 请求过于频繁 | 触发限流 | 稍后重试 |
| 500 | 服务器内部错误 | 未捕获异常 | 提示"系统繁忙，请稍后重试" |

> 业务错误码区间：10000~99999，按模块分段（用户10xxx、订单20xxx、支付30xxx）。

---

## 二、单接口文档标准模板

每个接口按以下结构编写，缺一不可。

```markdown
### 接口名称

| 项目 | 内容 |
|------|------|
| 接口路径 | /api/v1/xxx |
| 请求方式 | POST |
| 所属模块 | xxx模块 |
| 接口说明 | 一句话描述接口用途 |
| 鉴权方式 | Bearer Token（需登录） |
| 幂等性 | 是/否，幂等键=xxx |
| 限流规则 | 60次/分钟 |

#### 请求参数

**Header 参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| Authorization | String | 是 | 格式：Bearer {token} |

**Body 参数（application/json）：**

| 参数名 | 类型 | 必填 | 约束 | 说明 |
|--------|------|------|------|------|
| xxx | String | 是 | 长度1-50 | 字段说明 |

#### 响应参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| data.id | Long | 主键ID |

#### 请求示例

```json
{ "xxx": "yyy" }
```

#### 响应示例

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": { "id": 1 },
  "timestamp": 1723456789000
}
```

#### 错误码

| 错误码 | 说明 |
|--------|------|
| 400 | 参数校验失败 |
| 10001 | 用户名已存在 |
```

---

## 三、完整示例：用户管理模块（CRUD 一套）

### 3.1 新增用户

| 项目 | 内容 |
|------|------|
| 接口路径 | /api/v1/users |
| 请求方式 | POST |
| 所属模块 | 用户模块 |
| 接口说明 | 创建新用户账号 |
| 鉴权方式 | Bearer Token（管理员权限） |
| 幂等性 | 否 |
| 限流规则 | 30次/分钟 |

#### 请求参数

**Header：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| Authorization | String | 是 | Bearer {token} |
| Content-Type | String | 是 | application/json |

**Body：**

| 参数名 | 类型 | 必填 | 约束 | 说明 |
|--------|------|------|------|------|
| username | String | 是 | 4-20位，字母数字下划线 | 登录用户名，全局唯一 |
| password | String | 是 | 8-32位，含大小写字母+数字 | 明文传输，后端加密存储 |
| nickname | String | 否 | 最长20位 | 用户昵称，不传默认同username |
| phone | String | 否 | 11位手机号 | 手机号，需符合正则 ^1[3-9]\d{9}$ |
| email | String | 否 | 最长50位 | 邮箱地址 |
| role | Integer | 是 | 枚举：1=普通用户,2=管理员,3=超级管理员 | 用户角色 |
| status | Integer | 否 | 枚举：0=禁用,1=正常，默认1 | 账号状态 |

#### 响应参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| data.id | Long | 新用户主键ID |
| data.username | String | 用户名 |
| data.createdAt | String | 创建时间，格式 yyyy-MM-dd HH:mm:ss |

#### 请求示例

```json
{
  "username": "zhangsan",
  "password": "Abc123456",
  "nickname": "张三",
  "phone": "13800138000",
  "email": "zhangsan@example.com",
  "role": 1,
  "status": 1
}
```

#### 响应示例

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "id": 1001,
    "username": "zhangsan",
    "createdAt": "2026-08-13 14:30:00"
  },
  "timestamp": 1723456789000
}
```

#### 错误码

| 错误码 | 说明 |
|--------|------|
| 400 | 参数校验失败，msg 含具体字段 |
| 10001 | 用户名已存在 |
| 10002 | 手机号已被注册 |
| 403 | 无管理员权限 |

---

### 3.2 删除用户

| 项目 | 内容 |
|------|------|
| 接口路径 | /api/v1/users/{id} |
| 请求方式 | DELETE |
| 所属模块 | 用户模块 |
| 接口说明 | 根据ID删除用户（逻辑删除） |
| 鉴权方式 | Bearer Token（管理员权限） |
| 幂等性 | 是 |
| 限流规则 | 60次/分钟 |

#### 请求参数

**Path 参数：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 用户ID，必须大于0 |

#### 响应参数

无业务数据，data 为 null。

#### 请求示例

```
DELETE /api/v1/users/1001
Header: Authorization: Bearer xxx
```

#### 响应示例

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": null,
  "timestamp": 1723456789000
}
```

#### 错误码

| 错误码 | 说明 |
|--------|------|
| 404 | 用户不存在 |
| 10003 | 不能删除超级管理员 |
| 403 | 无管理员权限 |

---

### 3.3 修改用户

| 项目 | 内容 |
|------|------|
| 接口路径 | /api/v1/users/{id} |
| 请求方式 | PUT |
| 所属模块 | 用户模块 |
| 接口说明 | 更新用户基本信息（不包含密码修改） |
| 鉴权方式 | Bearer Token（本人或管理员） |
| 幂等性 | 是 |
| 限流规则 | 60次/分钟 |

#### 请求参数

**Path：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 用户ID |

**Body：**

| 参数名 | 类型 | 必填 | 约束 | 说明 |
|--------|------|------|------|------|
| nickname | String | 否 | 最长20位 | 昵称 |
| phone | String | 否 | 11位手机号 | 手机号 |
| email | String | 否 | 最长50位 | 邮箱 |
| status | Integer | 否 | 0=禁用,1=正常 | 账号状态，仅管理员可改 |

> 所有字段均为选填，传什么改什么，不传不修改。

#### 响应参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| data.id | Long | 用户ID |
| data.updatedAt | String | 更新时间 |

#### 请求示例

```json
{
  "nickname": "张三新",
  "phone": "13900139000"
}
```

#### 响应示例

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "id": 1001,
    "updatedAt": "2026-08-13 15:00:00"
  },
  "timestamp": 1723456789000
}
```

#### 错误码

| 错误码 | 说明 |
|--------|------|
| 400 | 参数校验失败 |
| 404 | 用户不存在 |
| 10002 | 手机号已被其他用户使用 |

---

### 3.4 查询用户详情

| 项目 | 内容 |
|------|------|
| 接口路径 | /api/v1/users/{id} |
| 请求方式 | GET |
| 所属模块 | 用户模块 |
| 接口说明 | 根据ID查询用户详细信息 |
| 鉴权方式 | Bearer Token（需登录） |
| 幂等性 | 是 |
| 限流规则 | 120次/分钟 |

#### 请求参数

**Path：**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 用户ID |

#### 响应参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| data.id | Long | 用户ID |
| data.username | String | 用户名 |
| data.nickname | String | 昵称，可能为null |
| data.phone | String | 手机号（脱敏：138****8000），可能为null |
| data.email | String | 邮箱，可能为null |
| data.role | Integer | 角色：1=普通用户,2=管理员,3=超级管理员 |
| data.status | Integer | 状态：0=禁用,1=正常 |
| data.createdAt | String | 创建时间 yyyy-MM-dd HH:mm:ss |
| data.updatedAt | String | 更新时间 yyyy-MM-dd HH:mm:ss |

#### 请求示例

```
GET /api/v1/users/1001
Header: Authorization: Bearer xxx
```

#### 响应示例

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "id": 1001,
    "username": "zhangsan",
    "nickname": "张三",
    "phone": "138****8000",
    "email": "zhangsan@example.com",
    "role": 1,
    "status": 1,
    "createdAt": "2026-08-13 14:30:00",
    "updatedAt": "2026-08-13 15:00:00"
  },
  "timestamp": 1723456789000
}
```

#### 错误码

| 错误码 | 说明 |
|--------|------|
| 404 | 用户不存在 |
| 401 | 未登录 |

---

### 3.5 分页查询用户列表

| 项目 | 内容 |
|------|------|
| 接口路径 | /api/v1/users |
| 请求方式 | GET |
| 所属模块 | 用户模块 |
| 接口说明 | 分页+条件查询用户列表 |
| 鉴权方式 | Bearer Token（管理员权限） |
| 幂等性 | 是 |
| 限流规则 | 120次/分钟 |

#### 请求参数

**Query 参数：**

| 参数名 | 类型 | 必填 | 默认值 | 约束 | 说明 |
|--------|------|------|--------|------|------|
| pageNum | Integer | 否 | 1 | ≥1 | 当前页 |
| pageSize | Integer | 否 | 10 | 1-100 | 每页条数 |
| keyword | String | 否 | - | 最长20位 | 搜索关键词，匹配用户名/昵称 |
| role | Integer | 否 | - | 1/2/3 | 按角色筛选 |
| status | Integer | 否 | - | 0/1 | 按状态筛选 |
| startTime | String | 否 | - | yyyy-MM-dd | 创建时间起始 |
| endTime | String | 否 | - | yyyy-MM-dd | 创建时间截止（含当天） |

#### 响应参数（data 为分页对象）

| 参数名 | 类型 | 说明 |
|--------|------|------|
| data.total | Long | 总记录数 |
| data.pages | Integer | 总页数 |
| data.current | Integer | 当前页 |
| data.size | Integer | 每页条数 |
| data.rows | List | 用户列表 |
| data.rows[].id | Long | 用户ID |
| data.rows[].username | String | 用户名 |
| data.rows[].nickname | String | 昵称 |
| data.rows[].role | Integer | 角色 |
| data.rows[].status | Integer | 状态 |
| data.rows[].createdAt | String | 创建时间 |

#### 请求示例

```
GET /api/v1/users?pageNum=1&pageSize=10&keyword=zhang&role=1&status=1
Header: Authorization: Bearer xxx
```

#### 响应示例

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "total": 2,
    "pages": 1,
    "current": 1,
    "size": 10,
    "rows": [
      {
        "id": 1001,
        "username": "zhangsan",
        "nickname": "张三",
        "role": 1,
        "status": 1,
        "createdAt": "2026-08-13 14:30:00"
      },
      {
        "id": 1002,
        "username": "zhangsi",
        "nickname": "张四",
        "role": 1,
        "status": 1,
        "createdAt": "2026-08-13 14:35:00"
      }
    ]
  },
  "timestamp": 1723456789000
}
```

#### 错误码

| 错误码 | 说明 |
|--------|------|
| 400 | 参数校验失败（如pageSize超过100） |
| 403 | 无管理员权限 |

---

## 四、Swagger/Knife4j 注解示例（Java 代码侧）

```java
@RestController
@RequestMapping("/api/v1/users")
@Api(tags = "用户管理接口")
public class UserController {

    @PostMapping
    @ApiOperation("新增用户")
    @ApiImplicitParam(name = "Authorization", value = "Bearer token", 
                      required = true, paramType = "header")
    public Result<UserVO> create(@RequestBody @Valid UserCreateDTO dto) {
        // ...
    }

    @GetMapping("/{id}")
    @ApiOperation("查询用户详情")
    public Result<UserVO> getById(@PathVariable @ApiParam("用户ID") Long id) {
        // ...
    }

    @GetMapping
    @ApiOperation("分页查询用户列表")
    public Result<PageResult<UserVO>> page(
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestParam(required = false) String keyword) {
        // ...
    }
}
```

```java
@Data
@ApiModel(description = "用户创建请求")
public class UserCreateDTO {
    @NotBlank(message = "用户名不能为空")
    @Size(min = 4, max = 20, message = "用户名长度4-20位")
    @ApiModelProperty(value = "用户名", required = true, example = "zhangsan")
    private String username;

    @NotBlank(message = "密码不能为空")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,32}$", 
             message = "密码需含大小写字母和数字，8-32位")
    @ApiModelProperty(value = "密码", required = true, example = "Abc123456")
    private String password;

    @ApiModelProperty(value = "角色：1=普通用户,2=管理员,3=超级管理员", 
                      required = true, example = "1")
    private Integer role;
}
```
