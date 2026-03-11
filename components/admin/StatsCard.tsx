 import { LucideIcon } from "lucide-react";

 interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  color: "orange" | "blue" | "green" | "purple";
}

 const colorMap = {
  orange: {
    bg: "bg-orange-50",
    icon: "bg-orange-500",
    text: "text-orange-500",
  },
  blue: {
    bg: "bg-blue-50",
    icon: "bg-blue-500",
    text: "text-blue-500",
  },
  green: {
    bg: "bg-green-50",
    icon: "bg-green-500",
    text: "text-green-500",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "bg-purple-500",
    text: "text-purple-500",
  },
};

 export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}: StatsCardProps) {
  const colors = colorMap[color];

  return (
    <div className={`${colors.bg} rounded-2xl p-6`}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <div className={`${colors.icon} p-2 rounded-xl`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
      <p className={`text-3xl font-bold ${colors.text}`}>{value}</p>
      <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
    </div>
  );
}