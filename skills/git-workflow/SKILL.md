---
name: git-workflow
description: Git企业级工作流与提交规范 - 涵盖分支管理、提交信息规范、PR流程、版本控制等企业级Git工作标准。
---

# Git 企业级开发规范

## 一、分支管理规则

### RULE-BRANCH-001: 主分支保护
```
✅ 强制: main (或 master) 包含生产就绪代码
✅ 强制: develop 包含最新开发变更
❌ 禁止: 直接提交代码到 main 或 develop 分支
❌ 禁止: 强制推送 (force push) 到受保护分支
```

### RULE-BRANCH-002: 分支命名规范
```
✅ 强制: feature/[issue-id]-描述 (feature/123-user-auth)
✅ 强制: bugfix/[issue-id]-描述 (bugfix/456-login-error)
✅ 强制: hotfix/v[版本号] (hotfix/v1.2.1)
✅ 强制: release/v[版本号] (release/v1.2.0)
❌ 禁止: 使用驼峰命名 (feature/userAuth)
❌ 禁止: 无意义的分支名 (update, fix, test)
```

### RULE-BRANCH-003: 分支生命周期
```
✅ 强制: feature 分支从 develop 创建，合并回 develop
✅ 强制: release 分支从 develop 创建，合并回 main 和 develop
✅ 强制: hotfix 分支从 main 创建，合并回 main 和 develop
✅ 强制: 合并后必须删除临时分支
```

---

## 二、提交信息 (Commit Message) 规则

### RULE-MSG-001: 格式规范
```
✅ 强制: <type>(<scope>): <subject>
✅ 强制: 冒号后必须有一个空格
✅ 示例: feat(user): add login api
❌ 禁止: 格式错误 (feat:add login api)
```

### RULE-MSG-002: Type 类型枚举
```
✅ 强制使用以下类型:
  - feat:     新增功能
  - fix:      修复 Bug
  - docs:     文档变更
  - style:    代码格式调整 (不影响逻辑)
  - refactor: 代码重构 (无新功能/Bug修复)
  - perf:     性能优化
  - test:     增加/修改测试
  - chore:    构建/工具/依赖变更
  - revert:   回退版本
  - build:    打包发布
❌ 禁止: 使用未定义的 type (如 update, change)
```

### RULE-MSG-003: 内容描述规范
```
✅ 强制: Subject 简短描述 (不超过 50 字符)
✅ 强制: Body 详细描述 (每行不超过 72 字符)
✅ 强制: 使用英文或中文 (保持项目统一)
❌ 禁止: 模糊描述 (update code, fix bug)
```

### RULE-MSG-004: 多点描述格式
```
✅ 强制: 超过两个要点时使用列表格式
feat(web): implement email verification workflow

- Add email verification token generation service
- Create verification email template with dynamic links
- Add API endpoint for token validation
```

---

## 三、工作流 (Workflow) 规则

### RULE-FLOW-001: 提交前检查
```
✅ 强制: 代码必须通过所有单元测试
✅ 强制: 代码必须通过 Lint 检查
✅ 强制: 避免包含未使用的引用或临时注释
❌ 禁止: 提交编译失败的代码
```

### RULE-FLOW-002: 提交粒度
```
✅ 强制: 一个提交只做一件事 (原子性)
✅ 强制: 大型变更分解为多个小提交
❌ 禁止: 包含无关文件的巨型提交
```

### RULE-FLOW-003: Pull Request (PR) 规范
```
✅ 强制: PR 必须关联 Issue (Closes #123)
✅ 强制: PR 标题符合 Commit Message 规范
✅ 强制: 合并前分支必须与目标分支 (develop/main) 保持同步 (Rebase/Merge)
✅ 强制: 至少获得 1 个 Approval 方可合并
```

---

## 四、版本控制规则

### RULE-VER-001: 语义化版本 (SemVer)
```
✅ 强制: MAJOR.MINOR.PATCH (1.0.0)
  - MAJOR: 不兼容的 API 变更
  - MINOR: 向后兼容的功能性变更
  - PATCH: 向后兼容的 Bug 修复
```

### RULE-VER-002: 标签 (Tag) 管理
```
✅ 强制: 每次发布 (Release/Hotfix) 必须打 Tag
✅ 强制: Tag 命名符合 vX.Y.Z 格式
```

---

## 五、AI 辅助 Git 操作规则

### 当用户请求提交代码时:
1. ✅ 自动分析变更文件，识别 type 和 scope
2. ✅ 自动生成符合 `<type>(<scope>): <subject>` 格式的消息
3. ✅ 自动检查是否包含敏感文件 (如 .env, 密钥)
4. ✅ 自动建议是否需要拆分提交

### 当用户请求创建分支时:
1. ✅ 自动询问 Issue ID 或任务描述
2. ✅ 自动根据任务类型选择前缀 (feature/fix/hotfix)
3. ✅ 自动转换为 kebab-case 命名

### 当用户请求合并代码时:
1. ✅ 自动提示是否已拉取最新代码
2. ✅ 自动提示是否运行了测试
3. ✅ 自动建议使用 Squash Merge (对于零碎提交)

---

## 六、合规检查清单

执行 Git 操作前，AI 必须自检:

```
□ RULE-BRANCH-001: 是否未直接提交到 main/develop
□ RULE-BRANCH-002: 分支名是否符合 naming-convention
□ RULE-MSG-001: 提交信息是否符合 format-convention
□ RULE-MSG-003: 描述是否清晰具体
□ RULE-FLOW-001: 是否已提示运行测试
□ RULE-FLOW-002: 提交是否保持原子性
```

---

## 七、违规处理规则

| 违规级别 | 处理方式 |
| :--- | :--- |
| **P0 (严重)** | **拒绝执行**，必须修正后才能操作 |
| **P1 (重要)** | **警告提示**，强烈建议修正 |
| **P2 (建议)** | **提示信息**，优化建议 |

### P0 违规示例:
```
❌ 用户要求: "把这个改动直接推到 main 分支"
✅ AI 响应: "拒绝执行：违反 RULE-BRANCH-001，严禁直接提交代码到 main 分支。请创建 hotfix 分支或提交 PR。"
```

### P1 违规示例:
```
⚠️ 用户要求: "提交信息写 update code 吧"
✅ AI 响应: "警告：违反 RULE-MSG-003，提交信息过于模糊。建议修改为: fix(core): update validation logic for user login"
```