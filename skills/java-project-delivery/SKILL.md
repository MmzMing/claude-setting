---
name: java-project-delivery
description: Java 后端项目交付阶段 Agent Skill，协助完成文档归档、知识转移、运维交接及项目复盘。
version: 1.0.0
author: Trae Assistant
---

# Java Project Delivery Skill (项目交付阶段)

本 Skill 旨在协助 Java 后端项目的收尾与交付工作，确保项目平稳上线并顺利移交运维与后期维护团队。

## 核心能力 (Capabilities)

1.  **文档归档 (Documentation Archiving)**: 整理并归档项目全生命周期的文档。
2.  **知识转移 (Knowledge Transfer)**: 制定培训计划，输出培训材料和常见问题解答 (FAQ)。
3.  **运维交接 (Operations Handover)**: 编写部署手册、监控告警配置及应急预案。
4.  **项目复盘 (Project Review)**: 总结项目经验教训，评估项目目标达成情况。

## 使用流程 (Workflow)

在项目即将上线或交付时，请按照以下步骤操作：

1.  **执行文档归档**:
    -   命令: `run skill java-project-delivery archive`
    -   操作: 收集需求、设计、测试、验收等所有文档，确认版本。
    -   产出: 使用 `templates/documentation-archive.md` 模板。
    -   **生成路径**: `/docs/03_项目交付/01_文档归档/归档清单.md`

2.  **进行知识转移**:
    -   命令: `run skill java-project-delivery transfer`
    -   操作: 为维护团队/客户准备培训 PPT、录屏和 FAQ。
    -   产出: 使用 `templates/knowledge-transfer.md` 模板。
    -   **生成路径**: `/docs/03_项目交付/02_知识转移/培训计划.md`

3.  **完成运维交接**:
    -   命令: `run skill java-project-delivery operations`
    -   操作: 交付部署脚本 (Docker/K8s)，配置监控 (Prometheus/Grafana)，移交密钥。
    -   产出: 使用 `templates/operations-handover.md` 模板。
    -   **生成路径**: `/docs/03_项目交付/03_运维移交/部署手册.md`

4.  **组织项目复盘**:
    -   命令: `run skill java-project-delivery review`
    -   操作: 召开复盘会议，回顾项目得失，沉淀最佳实践。
    -   产出: 使用 `templates/project-review.md` 模板。
    -   **生成路径**: `/docs/03_项目交付/04_项目复盘/复盘报告.md`

## 模板说明 (Templates)

所有模板均位于 `templates/` 目录下：

-   `documentation-archive.md`: 项目文档归档清单
-   `knowledge-transfer.md`: 知识转移与培训计划模板
-   `operations-handover.md`: 运维交接手册模板
-   `project-review.md`: 项目复盘报告模板
