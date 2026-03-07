import { AlertCircle, CheckCircle2, Circle, Clock, Flag } from "lucide-react";

export const priorityConfig = {
  low: {
    label: "Low",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    icon: Flag,
  },
  medium: {
    label: "Medium",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    icon: Flag,
  },
  high: {
    label: "High",
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
    icon: AlertCircle,
  },
};

export const statusConfig = {
  pending: {
    label: "Pending",
    color: "text-zinc-400",
    bg: "bg-zinc-400/10",
    border: "border-zinc-400/20",
    icon: Circle,
  },
  "in-progress": {
    label: "In Progress",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    icon: Clock,
  },
  completed: {
    label: "Completed",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    icon: CheckCircle2,
  },
};
