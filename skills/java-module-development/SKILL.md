---
name: java-module-development
description: Java 后端模块开发阶段 Agent Skill，提供需求文档、技术设计、实现笔记、测试及验收文档模板。
version: 1.0.0
author: Trae Assistant
---

# Java Module Development Skill (模块开发阶段)

本 Skill 专注于 Java 后端具体模块的开发过程，通过标准化的文档体系保障代码质量和可维护性。

## 核心能力 (Capabilities)

1.  **需求文档 (Requirements Documentation)**: 细化模块级需求，明确功能点和业务规则。
2.  **技术文档 (Technical Documentation)**: 编写详细设计文档，包括接口定义、类图、时序图等。
3.  **实现笔记 (Implementation Notes)**: 记录开发过程中的关键决策、算法思路和遇到的问题。
4.  **测试文档 (Test Documentation)**: 制定测试计划，编写测试用例（单元测试、集成测试）。
5.  **验收文档 (Acceptance Documentation)**: 记录验收标准和验收结果，确保交付质量。

## 使用流程 (Workflow)

在开发具体模块时，请按照以下步骤操作：

1.  **编写模块需求**:
    -   命令: `run skill java-module-development requirements`
    -   操作: 细化 User Story，明确输入输出和异常流程。
    -   产出: 使用 `templates/module-requirements.md` 模板。
    -   **生成路径**: `/docs/02_模块开发/01_需求分析/模块需求文档.md`

2.  **编写技术设计**:
    -   命令: `run skill java-module-development design`
    -   操作: 设计 API 接口 (OpenAPI/Swagger)，数据库表结构，类结构。
    -   产出: 使用 `templates/technical-design.md` 模板。
    -   **生成路径**: `/docs/02_模块开发/02_技术设计/详细设计文档.md`

3.  **记录实现笔记**:
    -   命令: `run skill java-module-development notes`
    -   操作: 在开发过程中记录思路，或作为代码注释的补充。
    -   产出: 使用 `templates/implementation-notes.md` 模板。
    -   **生成路径**: `/docs/02_模块开发/03_实现记录/开发笔记.md`

4.  **制定测试计划**:
    -   命令: `run skill java-module-development test`
    -   操作: 规划单元测试 (JUnit/Mockito) 和集成测试方案。
    -   产出: 使用 `templates/test-plan.md` 模板。
    -   **生成路径**: `/docs/02_模块开发/04_测试计划/测试用例.md`

5.  **填写验收报告**:
    -   命令: `run skill java-module-development acceptance`
    -   操作: 开发完成后，对照需求进行验收测试。
    -   产出: 使用 `templates/acceptance-report.md` 模板。
    -   **生成路径**: `/docs/02_模块开发/05_验收报告/验收报告.md`

## 模板说明 (Templates)

所有模板均位于 `templates/` 目录下：

-   `module-requirements.md`: 模块级需求细化文档
-   `technical-design.md`: 详细技术设计文档 (含 API, DB, Class)
-   `implementation-notes.md`: 开发实现笔记 / ADR (架构决策记录)
-   `test-plan.md`: 测试计划与用例模板
-   `acceptance-report.md`: 模块验收报告模板
