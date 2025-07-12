
import { ModelSelectionPanel } from "@/components/ModelSelectionPanel";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Model Selection Panel</h1>
        <p className="text-slate-400 mt-2">
          Configure AI models for option strategy recommendations. Select 3-10 models to use in the majority voting system.
        </p>
      </div>
      <ModelSelectionPanel />
    </div>
  );
};

export default Settings;
