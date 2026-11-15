import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  RefreshCw,
  Download,
  Trash2,
  MoreHorizontal,
  ChevronDown,
  X,
  AlertTriangle,
  SlidersHorizontal,
} from "lucide-react";

/**
 * 工业级 B 端标准列表页代码模板 (List Page Template)
 * 严格遵循 Ludi Design System 规范：
 * - 0.5px 精细微边框体系
 * - 80% 浅底深字状态 Badge
 * - 表格三向对齐（文本居左、金额居右、操作/状态居左中）
 * - 批量操作浮动条 (BulkActionBar) 联动 ConfirmDialog
 * - 侧边抽屉 (Drawer) 轻编辑与查看详情
 * - 理想、空状态、加载中完整五态处理
 */

// 1. 类型定义与 Mock 数据
interface CustomerItem {
  id: string;
  code: string;
  name: string;
  level: "enterprise" | "standard" | "vip";
  status: "active" | "pending" | "suspended";
  annualRevenue: number;
  contactPerson: string;
  updatedAt: string;
}

const INITIAL_DATA: CustomerItem[] = [
  {
    id: "cust-01",
    code: "CUST-8021",
    name: "未来智造科技有限公司",
    level: "enterprise",
    status: "active",
    annualRevenue: 1280000,
    contactPerson: "张建国",
    updatedAt: "2026-10-24 14:32",
  },
  {
    id: "cust-02",
    code: "CUST-8022",
    name: "量子跃迁网络科技",
    level: "vip",
    status: "pending",
    annualRevenue: 450000,
    contactPerson: "林晓雪",
    updatedAt: "2026-10-23 11:20",
  },
  {
    id: "cust-03",
    code: "CUST-8023",
    name: "云海大数据计算中心",
    level: "standard",
    status: "suspended",
    annualRevenue: 89000,
    contactPerson: "陈宏伟",
    updatedAt: "2026-10-20 09:15",
  },
];

// 2. 状态 Badge 组件（浅底深字规范）
const StatusBadge: React.FC<{ status: CustomerItem["status"] }> = ({ status }) => {
  const config = {
    active: { text: "运行中", bg: "bg-emerald-50", color: "text-emerald-700", border: "border-emerald-200/60" },
    pending: { text: "待审核", bg: "bg-amber-50", color: "text-amber-700", border: "border-amber-200/60" },
    suspended: { text: "已停用", bg: "bg-rose-50", color: "text-rose-700", border: "border-rose-200/60" },
  }[status];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.color} ${config.border}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {config.text}
    </span>
  );
};

export const ListPageTemplate: React.FC = () => {
  const [data, setData] = useState<CustomerItem[]>(INITIAL_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 浮层状态
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<CustomerItem | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // 过滤逻辑
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  // 行选择逻辑
  const isAllSelected = filteredData.length > 0 && selectedIds.length === filteredData.length;
  const toggleSelectAll = () => {
    if (isAllSelected) setSelectedIds([]);
    else setSelectedIds(filteredData.map((d) => d.id));
  };
  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  // 批量删除
  const handleBatchDelete = () => {
    setData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    setDeleteConfirmOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* 一、页面标题区 (PageHeader) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">企业客户管理</h1>
            <p className="text-sm text-slate-500 mt-1">
              管理核心企业与签约客户，支持多维度过滤、快速开通与批量流转。
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 600);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200/80 rounded-md hover:bg-slate-50 transition shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              刷新
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200/80 rounded-md hover:bg-slate-50 transition shadow-sm">
              <Download className="w-4 h-4 text-slate-500" />
              导出
            </button>
            {/* 唯一的主操作按钮 (Primary Action) */}
            <button
              onClick={() => {
                setActiveItem(null);
                setDrawerOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="w-4 h-4" />
              新增客户
            </button>
          </div>
        </div>

        {/* 二、筛选栏 (FilterPanel) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-sm flex flex-col md:flex-row md:items-center gap-3 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="搜索客户编号或企业全称..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50/50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
              <SlidersHorizontal className="w-4 h-4" />
              高级筛选
            </button>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-blue-600 hover:text-blue-700 px-2 py-1"
              >
                清空过滤
              </button>
            )}
          </div>
        </div>

        {/* 三、数据表格主容器 (DataSection & DataGrid) */}
        <div className="bg-white rounded-xl border border-slate-200/70 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-xs font-medium text-slate-500">
                  <th className="py-3.5 px-4 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="py-3.5 px-4">客户编码</th>
                  <th className="py-3.5 px-4">企业全称</th>
                  <th className="py-3.5 px-4">状态</th>
                  <th className="py-3.5 px-4">联系人</th>
                  <th className="py-3.5 px-4 text-right">年签约额</th>
                  <th className="py-3.5 px-4">更新时间</th>
                  <th className="py-3.5 px-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
                      数据加载中...
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center">
                      <div className="max-w-sm mx-auto space-y-2">
                        <p className="text-sm font-medium text-slate-700">未找到符合条件的数据</p>
                        <p className="text-xs text-slate-400">可以尝试清除筛选关键字或重新录入首条数据</p>
                        <button
                          onClick={() => setSearchQuery("")}
                          className="mt-2 text-xs font-medium text-blue-600 hover:underline"
                        >
                          清除筛选条件
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => {
                    const isSelected = selectedIds.includes(item.id);
                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-slate-50/80 transition ${isSelected ? "bg-blue-50/30" : ""}`}
                      >
                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectOne(item.id)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-slate-500">{item.code}</td>
                        <td className="py-3.5 px-4 font-medium text-slate-900">
                          <button
                            onClick={() => {
                              setActiveItem(item);
                              setDrawerOpen(true);
                            }}
                            className="hover:text-blue-600 text-left transition"
                          >
                            {item.name}
                          </button>
                        </td>
                        <td className="py-3.5 px-4">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">{item.contactPerson}</td>
                        {/* 金额数值绝对右对齐 */}
                        <td className="py-3.5 px-4 text-right font-medium text-slate-900">
                          ¥{item.annualRevenue.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-500">{item.updatedAt}</td>
                        {/* 操作列采用轻量 ghost 文本按钮 */}
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setActiveItem(item);
                              setDrawerOpen(true);
                            }}
                            className="text-xs font-medium text-blue-600 hover:text-blue-800 transition"
                          >
                            查看
                          </button>
                          <button
                            onClick={() => {
                              setSelectedIds([item.id]);
                              setDeleteConfirmOpen(true);
                            }}
                            className="text-xs font-medium text-rose-600 hover:text-rose-800 transition"
                          >
                            删除
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* 表格底部与分页 */}
          <div className="py-3 px-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/30">
            <span>共 {filteredData.length} 条记录</span>
            <div className="flex items-center gap-1">
              <button disabled className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-300">
                上一页
              </button>
              <span className="px-2 font-medium text-slate-700">1 / 1</span>
              <button disabled className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-300">
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 四、批量操作浮动条 (BulkActionBar) */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-4 z-40 border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="text-xs font-medium text-slate-300">
            已选中 <strong className="text-white font-semibold">{selectedIds.length}</strong> 项
          </span>
          <div className="h-4 w-px bg-slate-700" />
          <button
            onClick={() => alert(`已批量导出 ${selectedIds.length} 条数据`)}
            className="text-xs font-medium hover:text-blue-400 transition"
          >
            批量导出
          </button>
          <button
            onClick={() => setDeleteConfirmOpen(true)}
            className="text-xs font-medium text-rose-400 hover:text-rose-300 transition"
          >
            批量删除
          </button>
          <button
            onClick={() => setSelectedIds([])}
            className="p-1 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 五、侧边抽屉 (Drawer: 详情与轻编辑) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* 遮罩背景 */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
              {/* 抽屉头部 */}
              <div className="py-4 px-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    {activeItem ? "客户详情" : "录入新客户"}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeItem ? activeItem.code : "请完善下方企业核心档案"}
                  </p>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 抽屉内容区 */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">企业全称</label>
                  <input
                    type="text"
                    defaultValue={activeItem?.name || ""}
                    placeholder="如：杭州智联矩阵信息技术有限公司"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">联系人姓名</label>
                  <input
                    type="text"
                    defaultValue={activeItem?.contactPerson || ""}
                    placeholder="业务负责人"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">预估签约金额 (元)</label>
                  <input
                    type="number"
                    defaultValue={activeItem?.annualRevenue || ""}
                    placeholder="0.00"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* 抽屉底部操作栏 */}
              <div className="py-3 px-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-white transition"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    alert("保存成功");
                    setDrawerOpen(false);
                  }}
                  className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                  保存信息
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 六、高危删除确认弹窗 (ConfirmDialog) */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" />
          <div className="relative bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-rose-50 text-rose-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  确认删除选中的 {selectedIds.length} 个客户？
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  该操作将彻底解除与这些企业的系统绑定关系并归档历史流水。此操作不可逆，请谨慎核对。
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-3.5 py-2 text-xs font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
              >
                取消
              </button>
              <button
                onClick={handleBatchDelete}
                className="px-4 py-2 text-xs font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition shadow-sm"
              >
                彻底删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
