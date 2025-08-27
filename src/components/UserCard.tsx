import { Building2, Globe, Mail, MapPin, Phone } from "lucide-react";
import type { IUser } from "../types/user";

interface UserCardProps {
  user: IUser;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 transition-all duration-200 group  shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:transform hover:translate-y-[-2px]">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 [background:var(--gradient-primary)]  rounded-full flex items-center justify-center text-primary-foreground font-semibold text-lg">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
              {user.name}
            </h3>
            <p className="text-sm text-muted-foreground">{user.company.name}</p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm ">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{user.email}</span>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{user.address.city}</span>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{user.company.name}</span>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{user.phone}</span>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <Globe className="w-4 h-4 text-primary" />
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-glow transition-colors underline"
            >
              {user.website}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
