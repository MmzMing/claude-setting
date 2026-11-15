import React, { useState } from "react";
import { ArrowLeft, Save, AlertCircle, Check, Info } from "lucide-react";

/**
 * 工业级 B 端标准表单页代码模板 (Form Page Template)
 * 严格遵循 Ludi Design System 规范：
 * - 0.5px 精细微边框体系
 * - 中文 B 端首选 Top-aligned 标签置顶排布
 * - 区域内语义分组 (Sectioned Card)
 * - 单选平铺 vs 下拉选择否定判据落地
 * - 即时生效 (Switch) 与 表单提交生效 (Checkbox) 严格区分
 * - 离开防丢失脏检查提示 (isDirty)
 */

export const FormPageTemplate: React.FC = () => {
  const [formData, setFormData] = useState({
    contractTitle: "",
    contractType: "sales", // 单选平铺
    totalAmount: "",
    billingCycle: "monthly", // 下拉选择
    autoRenew: false, // 提交时生效的开关/复选
    notes: "",
  });

  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleBlurValidate = (key: string) => {
    if (key === "contractTitle" && !formData.contractTitle.trim()) {
      setErrors((prev) => ({ ...prev, contractTitle: "合同名称不能为空" }));
    }
    if (key === "totalAmount" && (!formData.totalAmount || Number(formData.totalAmount) <= 0)) {
      setErrors((prev) => ({ ...prev, totalAmount: "请输入大于 0 的有效合同金额" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contractTitle.trim() || !formData.totalAmount) {
      handleBlurValidate("contractTitle");
      handleBlurValidate("totalAmount");
      return;
    }
    alert("合同协议已成功提交并进入法务初审流！");
    setIsDirty(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 p-6">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        {/* 一、表单页头 (FormHeader) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <button
                type="button"
                onClick={() => {
                  if (isDirty && !window.confirm("当前表单已有编辑内容，确定放弃保存离开吗？")) return;
                  window.history.back();
                }}
                className="inline-flex items-center gap-1 hover:text-slate-800 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                返回
              </button>
              <span>/</span>
              <span>合同管理</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">拟定商务框架合同</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              填写合同基础条款与结算约定。提交后将自动触发法务与风控协同审批流程。
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (isDirty && !window.confirm("确定放弃修改？")) return;
                window.history.back();
              }}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition shadow-sm"
            >
              取消
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              提交审核
            </button>
          </div>
        </div>

        {/* 二、第一分组：基础条款 (Basic Information) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold text-slate-900">主体与基础条款</h2>
            <p className="text-xs text-slate-400 mt-0.5">请确保合同名称与企业公章主体保持法律一致性</p>
          </div>

          <div className="space-y-4">
            {/* Top-aligned 标签置顶 */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                合同标题与编号说明 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="如：2026年度智能工业设备云边协同定制研发框架协议"
                value={formData.contractTitle}
                onChange={(e) => handleFieldChange("contractTitle", e.target.value)}
                onBlur={() => handleBlurValidate("contractTitle")}
                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.contractTitle
                    ? "border-rose-400 focus:ring-rose-200"
                    : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                }`}
              />
              {errors.contractTitle ? (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.contractTitle}
                </p>
              ) : null}
            </div>

            {/* 2-3个选项，使用 Radio 单选平铺，不用下拉框 */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">
                合同业务类型 <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "sales", title: "标准产品销售", desc: "标准化软硬件产品买卖" },
                  { id: "service", title: "年度技术服务", desc: "SLA保障与运维驻场支持" },
                  { id: "custom", title: "专项定制研发", desc: "特定场景定制工程交付" },
                ].map((type) => {
                  const isChecked = formData.contractType === type.id;
                  return (
                    <label
                      key={type.id}
                      onClick={() => handleFieldChange("contractType", type.id)}
                      className={`cursor-pointer p-3.5 rounded-xl border transition flex flex-col gap-1 ${
                        isChecked
                          ? "border-blue-500 bg-blue-50/20 ring-1 ring-blue-500"
                          : "border-slate-200/80 hover:bg-slate-50/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-900">{type.title}</span>
                        <input
                          type="radio"
                          name="contractType"
                          checked={isChecked}
                          onChange={() => {}}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                      <span className="text-[11px] text-slate-500">{type.desc}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 三、第二分组：款项与账期 (Billing & Revenue) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold text-slate-900">金额与结算约定</h2>
            <p className="text-xs text-slate-400 mt-0.5">请与对公银行开票与打款账户信息核对一致</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                含税合同总金额 (人民币) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                  ¥
                </span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={formData.totalAmount}
                  onChange={(e) => handleFieldChange("totalAmount", e.target.value)}
                  onBlur={() => handleBlurValidate("totalAmount")}
                  className={`w-full pl-7 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.totalAmount
                      ? "border-rose-400 focus:ring-rose-200"
                      : "border-slate-200 focus:ring-blue-500/20 focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.totalAmount ? (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.totalAmount}
                </p>
              ) : null}
            </div>

            {/* 下拉选择器 (Select) */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">结算账期方式</label>
              <select
                value={formData.billingCycle}
                onChange={(e) => handleFieldChange("billingCycle", e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="monthly">按月出账结算 (次月15日前汇款)</option>
                <option value="quarterly">按季度预付结算</option>
                <option value="milestone">按项目里程碑节点验收比例付款</option>
                <option value="annual">年度一次性结清</option>
              </select>
            </div>
          </div>

          {/* 随表单提交生效的复选框，禁止使用 Switch 开关 */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.autoRenew}
                onChange={(e) => handleFieldChange("autoRenew", e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="text-xs">
                <span className="font-medium text-slate-800">合同到期后自动进入为期 1 年的同等条款顺延期</span>
                <p className="text-slate-400 mt-0.5">
                  若任一方未在到期前 30 自然日内书面通知解约，则本条款将在整份合同生效时正式确立法律效力。
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* 底部吸底操作栏 (Sticky Action Bar) */}
        <div className="py-4 px-6 bg-white border border-slate-200/70 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {isDirty ? (
              <span className="text-amber-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                有尚未保存的变更
              </span>
            ) : (
              <span className="text-slate-400">所有字段已就绪</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              确认并提交审核
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
