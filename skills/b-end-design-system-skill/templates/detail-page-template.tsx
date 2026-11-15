import React, { useState } from "react";
import { ArrowLeft, Edit3, ShieldAlert, CheckCircle2, Clock, FileText, Send, Building2 } from "lucide-react";

/**
 * 工业级 B 端标准详情页代码模板 (Detail Page Template)
 * 严格遵循 Ludi Design System 规范：
 * - 0.5px 精细微边框体系
 * - DetailHeader 规范（返回链路、实体名称、状态徽标、主次操作区）
 * - DescriptionGrid 四层信息亲密度区隔规范
 * - 辅助页签 (Tabs) 切分次级独立视角
 * - 审计流水与状态推进时间线 (Timeline)
 */

export const DetailPageTemplate: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "logs" | "contracts">("overview");

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 一、详情页头部 (DetailHeader) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button className="inline-flex items-center gap-1 hover:text-slate-800 transition">
              <ArrowLeft className="w-3.5 h-3.5" />
              返回客户列表
            </button>
            <span>/</span>
            <span>客户详情</span>
            <span>/</span>
            <span className="font-mono text-slate-700">CUST-8021</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl font-bold tracking-tight text-slate-900">未来智造科技有限公司</h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                    正常合作中
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  企业社会统一信用代码：91330100MA28XXXXXX · 战略大客户
                </p>
              </div>
            </div>

            {/* 操作栏：主操作唯一 */}
            <div className="flex items-center gap-2.5">
              <button className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition shadow-sm">
                <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                编辑资料
              </button>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm">
                <Send className="w-3.5 h-3.5" />
                发起新合同
              </button>
            </div>
          </div>
        </div>

        {/* 二、核心关键指标快照 (Key Metrics Snapshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { label: "累计签约金额", value: "¥ 4,820,000", sub: "同比增长 18.2%" },
            { label: "有效执行中合同", value: "3 份", sub: "1份即将到期" },
            { label: "企业信用评分", value: "98.5 分", sub: "极高信用级别" },
            { label: "专属客户经理", value: "王立峰", sub: "华东大区大客户部" },
          ].map((m, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-sm space-y-1">
              <span className="text-xs text-slate-500">{m.label}</span>
              <p className="text-lg font-semibold text-slate-900">{m.value}</p>
              <span className="text-xs text-slate-400">{m.sub}</span>
            </div>
          ))}
        </div>

        {/* 三、标签页辅助导航 (Tabs) */}
        <div className="border-b border-slate-200 flex gap-6 text-sm">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 font-medium transition border-b-2 -mb-px ${
              activeTab === "overview"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            基础信息与档案
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`pb-3 font-medium transition border-b-2 -mb-px ${
              activeTab === "logs"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            流转记录与审计日志
          </button>
          <button
            onClick={() => setActiveTab("contracts")}
            className={`pb-3 font-medium transition border-b-2 -mb-px ${
              activeTab === "contracts"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            关联签约合同 (3)
          </button>
        </div>

        {/* 四、标签页内容区 */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* 描述列表 (DescriptionGrid) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
              <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                企业登记信息
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-xs pt-2">
                <div>
                  <span className="text-slate-500 block mb-1">法定代表人</span>
                  <span className="font-medium text-slate-900">张建国</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">注册资本</span>
                  <span className="font-medium text-slate-900">5000 万人民币</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">成立日期</span>
                  <span className="font-medium text-slate-900">2018年04月12日</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">所属行业</span>
                  <span className="font-medium text-slate-900">智能装备与工业互联网</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">办公地址</span>
                  <span className="font-medium text-slate-900">杭州市滨江区科技大道 88 号未来大厦 16 层</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">发票开票抬头</span>
                  <span className="font-medium text-slate-900">未来智造科技有限公司</span>
                </div>
              </div>
            </div>

            {/* 结算与银行信息卡片 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
              <h2 className="text-sm font-semibold text-slate-900">结算与开户银行</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6 text-xs pt-2">
                <div>
                  <span className="text-slate-500 block mb-1">开户银行</span>
                  <span className="font-medium text-slate-900">中国工商银行杭州高新支行</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">银行账号</span>
                  <span className="font-mono font-medium text-slate-900">1202 0262 1920 **** 821</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">账期结算方式</span>
                  <span className="font-medium text-slate-900">月结 45 天 (按实出账)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 审计日志时间线 Tab */}
        {activeTab === "logs" && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-6">
            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              流转与审批时间线
            </h2>
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {[
                { title: "客户评级上调为「战略大客户」", time: "2026-10-24 10:12", user: "李明 (风控总监)" },
                { title: "完成 2026 年度服务续约框架协议签署", time: "2026-09-18 16:45", user: "王立峰 (客户经理)" },
                { title: "开票信息及银行账号变更审批通过", time: "2026-06-02 09:30", user: "财务审核组" },
                { title: "企业主体通过首次资质准入认证", time: "2024-05-10 14:00", user: "系统自动" },
              ].map((log, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-100" />
                  <p className="text-xs font-medium text-slate-900">{log.title}</p>
                  <div className="text-[11px] text-slate-400 mt-0.5 flex gap-2">
                    <span>{log.time}</span>
                    <span>·</span>
                    <span>操作人：{log.user}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
