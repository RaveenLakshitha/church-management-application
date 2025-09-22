// components/InfoCard.tsx
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}

export const InfoCard = ({ icon: Icon, label, value, className = "" }: InfoCardProps) => (
  <div className={`group relative overflow-hidden rounded-xl border bg-card/50 backdrop-blur-sm p-6 hover:bg-card/80 transition-all duration-300 ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="font-semibold truncate">{value}</p>
        </div>
      </div>
    </div>
  </div>
);