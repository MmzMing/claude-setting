---
name: project-steps-1
description: 软件项目启动阶段 Agent Skill，协助完成需求收集、架构设计、模块划分及任务生成。
version: 1.0.0
author: Trae Assistant
---

# Project Initiation Skill (项目启动阶段)

本 Skill 旨在协助软件项目的启动阶段工作，确保项目从一开始就具备清晰的需求、稳健的架构和合理的任务规划。

## 核心能力 (Capabilities)

1.  **需求收集 (Requirements Gathering)**: 引导用户梳理业务需求，生成标准化的需求文档。
2.  **架构设计 (Architecture Design)**: 基于需求设计系统架构，包括技术选型、部署架构、数据流向等。
3.  **模块划分 (Module Division)**: 将系统拆分为高内聚、低耦合的模块，定义模块边界和职责。
4.  **生成任务 (Task Generation)**: 将模块开发工作拆解为具体的开发任务，估算工时并生成任务清单。

## 使用流程 (Workflow)

请按照以下顺序执行项目启动流程：

1.  **启动需求收集**:
    -   命令: `run skill project-steps-1 requirements`
    -   操作: 与用户对话，了解项目背景和核心功能。
    -   产出: 使用 `templates/01-requirements-gathering.md` 模板生成需求文档。
    -   **生成路径**: `/docs/01_项目启动/01_需求分析/需求规格说明书.md`

2.  **进行架构设计**:
    -   命令: `run skill project-steps-1 architecture`
    -   操作: 分析需求文档，提出架构方案（技术栈、数据库、中间件等）。
    -   产出: 使用 `templates/02-architecture-design.md` 模板生成架构设计文档。
    -   **生成路径**: `/docs/01_项目启动/02_架构设计/系统架构设计.md`

3.  **执行模块划分**:
    -   命令: `run skill project-steps-1 modules`
    -   操作: 根据架构设计，定义项目模块结构，明确各模块职责。
    -   产出: 使用 `templates/03-module-division.md` 模板生成模块划分文档。
    -   **生成路径**: `/docs/01_项目启动/03_模块划分/模块划分说明.md`

4.  **生成开发任务**:
    -   命令: `run skill project-steps-1 tasks`
    -   操作: 拆解模块为具体 Feature/Task，建议优先级和预估时间。
    -   产出: 使用 `templates/04-task-generation.md` 模板生成任务清单。
    -   **生成路径**: `/docs/01_项目启动/04_任务清单/开发任务清单.md`

## 模板说明 (Templates)

所有模板均位于 `templates/` 目录下，支持 Markdown 格式，可直接渲染或导出为 PDF。

-   `01-requirements-gathering.md`: 需求规格说明书模板
-   `02-architecture-design.md`: 系统架构设计文档模板
-   `03-module-division.md`: 模块划分与接口定义模板
-   `04-task-generation.md`: 项目任务分解清单模板
