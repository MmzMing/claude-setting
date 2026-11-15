import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  Activity,
  ArrowUpRight,
  Clock,
  Sparkles,
  ChevronRight,
} from "lucide-react";

/**
 * 工业级 B 端工作台与数据看板代码模板 (Dashboard & Workbench Template)
 * 严格遵循 Ludi Design System 规范：
 * - 0.5px 精细微边框体系
 * - KPI 指标卡严格控制在 3-4 个，统一时间口径
 * - 图表采用可复用轻量 DOM/SVG 结构，杜绝冗余沉重依赖
 * - 去除占位说明废话，靠排版层级和布局说话
 * - 结合“今日待办”与“快捷操作”，形成高价值业务闭环
 */

interface MetricCardProps {
  title: string;
  value: string;
  trend: number;
  timeRange: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, timeRange, icon }) => {
  const isPositive = trend >= 0;
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{title}</span>
        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
        <span
          className={`inline-flex items-center text-xs font-semibold ${
            isPositive ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {isPositive ? <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> : <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
          {isPositive ? `+${trend}%` : `${trend}%`}
        </span>
      </div>
      <p className="text-[11px] text-slate-400 mt-1">{timeRange}</p>
    </div>
  );
};

export const DashboardPageTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 一、问候与今日概览 (Workbench Header) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">早安，Ludi</h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
                <Sparkles className="w-3 h-3 text-blue-500" />
                业务系统已运行 99.98%
              </span>
            </div>
            <p className="text-xs text-slate-500">
              今日共有 <strong className="text-slate-800">4 项</strong> 待审核合同与 <strong className="text-slate-800">2 项</strong> 预警工单需要您处理。
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition shadow-sm">
              查看待办列表
            </button>
            <button className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm">
              创建业务工单
            </button>
          </div>
        </div>

        {/* 二、核心 KPI 指标卡 (严格控制在 4 个以内) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="本月累计营收"
            value="¥ 1,428,900"
            trend={14.8}
            timeRange="较上月同一周期 (+¥18.2w)"
            icon={<CreditCard className="w-4 h-4" />}
          />
          <MetricCard
            title="活跃企业客户"
            value="1,248 家"
            trend={8.2}
            timeRange="近30天内有登录协同"
            icon={<Users className="w-4 h-4" />}
          />
          <MetricCard
            title="待交付履约单"
            value="38 笔"
            trend={-4.5}
            timeRange="交付准时率 98.2%"
            icon={<Activity className="w-4 h-4" />}
          />
          <MetricCard
            title="平均流转耗时"
            value="4.2 小时"
            trend={-12.0}
            timeRange="流程提效明显 (越低越好)"
            icon={<Clock className="w-4 h-4" />}
          />
        </div>

        {/* 三、中间核心看板区：趋势图表 + 快捷入口 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧 2 栏：主营收趋势柱状图 (轻量原生 CSS 表现) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">近 6 个月业务流转与营收趋势</h2>
                <p className="text-xs text-slate-400 mt-0.5">单位：万元人民币 (以开票结算入账为准)</p>
              </div>
              <select className="text-xs border border-slate-200 rounded-md px-2 py-1 text-slate-600 bg-white">
                <option>2026 年度</option>
                <option>2025 年度</option>
              </select>
            </div>

            {/* 模拟轻量柱状图 */}
            <div className="pt-6 pb-2">
              <div className="h-48 flex items-end justify-between gap-3 px-2 border-b border-slate-100">
                {[
                  { month: "5月", val: 65, height: "h-[65%]" },
                  { month: "6月", val: 82, height: "h-[82%]" },
                  { month: "7月", val: 54, height: "h-[54%]" },
                  { month: "8月", val: 95, height: "h-[95%]" },
                  { month: "9月", val: 78, height: "h-[78%]" },
                  { month: "10月", val: 88, height: "h-[88%]" },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-semibold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.val}w
                    </span>
                    <div
                      className={`w-full max-w-[42px] ${item.height} bg-blue-500 rounded-t-lg group-hover:bg-blue-600 transition-colors`}
                    />
                    <span className="text-xs text-slate-500 mt-1">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧 1 栏：快捷入口与服务状态 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">高频业务直通</h2>
            <div className="grid grid-cols-2 gap-3 pt-1">
              {[
                { title: "新建客户合同", desc: "电子签章流转", color: "bg-blue-50 text-blue-600" },
                { title: "开具对公发票", desc: "税务自动开具", color: "bg-emerald-50 text-emerald-600" },
                { title: "企业准入认证", desc: "资质三要素核验", color: "bg-purple-50 text-purple-600" },
                { title: "数据对账报表", desc: "财务月结导出", color: "bg-amber-50 text-amber-600" },
              ].map((act, idx) => (
                <button
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/20 text-left transition group"
                >
                  <p className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition">
                    {act.title}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">{act.desc}</span>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-800">服务集群监控</span>
                  <p className="text-[11px] text-emerald-600 mt-0.5">● 5 个节点全量健康响应</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* 四、底部动态列表 (Recent Activities) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">最新系统审计流水</h2>
            <button className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-0.5">
              查看全部流水
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {[
              {
                entity: "未来智造科技有限公司",
                action: "由 王立峰 发起了 2026 年度续约商务协议，等待法务审核",
                time: "10 分钟前",
              },
              {
                entity: "云海大数据计算中心",
                action: "完成发票开具申请，金额 ¥89,000.00，税务系统已同步回传",
                time: "32 分钟前",
              },
              {
                entity: "量子跃迁网络科技",
                action: "新增管理员账号「张琳」，已自动完成企业微信权限绑定",
                time: "1 小时前",
              },
            ].map((row, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="font-semibold text-slate-800">{row.entity}</span>
                  <span className="text-slate-500">{row.action}</span>
                </div>
                <span className="text-slate-400 whitespace-nowrap">{row.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
