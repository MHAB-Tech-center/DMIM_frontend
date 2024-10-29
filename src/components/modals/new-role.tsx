/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/base/button";
import Dialog from "@/components/ui/Dialog";
import { getErrorMessage } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import { ComplexInput } from "../ui/Input";
import MultiSelectCombobox from "../ui/MultiSelectCombobox";

interface NewRoleModalProps {
  planId: string;
}

const roleFeatures = [
  { value: "report.view", label: "Report View" },
  { value: "report.feedback", label: "Report Feedback" },
  { value: "report.approve", label: "Report Approve" },
  { value: "inspectors.view", label: "Inspectors View" },
  { value: "inspectors.invite", label: "Inspectors Invite" },
  { value: "inspectors.write", label: "Inspectors Write" },
  { value: "rmb.view", label: "RMB View" },
  { value: "rmb.invite", label: "RMB Invite" },
  { value: "rmb.write", label: "RMB Write" },
  { value: "roles.view", label: "Roles View" },
  { value: "roles.write", label: "Roles Write" },
];

const NewRoleModal = () => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    features: [],
    roleName: "",
    roleDescription: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      //   await addFeedback(formData.planId, formData.review);
      toast.success("New role created successfully");
      setOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={setOpen}
      contentClassName="!max-w-lg"
      trigger={
        <Button className="text-black rounded-xl !bg-primary-100 hover:!bg-primary-200 ">
          <PlusIcon className="w-6 h-6" />
          &nbsp;&nbsp; Add New Role
        </Button>
      }
      title="Create New Role"
      footer={
        <div className="flex-1 flex justify-center gap-4 flex-wrap px-4">
          <Button
            className="w-full max-w-[200px] bg-primary text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      }
    >
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="form flex-1">
          <form className="flex flex-col gap-4">
            <ComplexInput
              id="feedback"
              type="text"
              placeholder="Role Name"
              value={formData.roleName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, roleName: e.target.value }))
              }
            />
            <ComplexInput
              id="feedback"
              type="text"
              placeholder="Role Description"
              value={formData.roleDescription}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  roleDescription: e.target.value,
                }))
              }
            />
            <MultiSelectCombobox
              options={roleFeatures}
              selectedValues={formData.features}
              onSelect={(selectedValues: any) =>
                setFormData((prev) => ({ ...prev, features: selectedValues }))
              }
            />
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default NewRoleModal;
