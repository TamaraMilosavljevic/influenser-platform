import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GoogleFontIcon } from "@/assets/icons/GoogleFontIcon";

import type { BottomNavProps, NavActionItem } from "./bottomNav.types";
import { BottomNavItem } from "./BottomNavItem";
import { useAuthStore } from "@/auth/authStore";
import { useNavigate } from "@tanstack/react-router";

export function BottomNav({
  items,
  className,
  maxWidthClassName = "max-w-screen-md",
  heightPx = 60,
}: BottomNavProps) {
  const logoutUser = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const logout: NavActionItem = {
    key: "logout",
    label: "Logout",
    icon: "logout",
  };

  return (
    <nav
      className={cn(
        "sticky bottom-0 left-0 right-0 z-50 w-full",
        "border-t bg-background",
        className
      )}
      aria-label="Bottom navigation"
    >
      <div
        className={cn("mx-auto grid w-full", maxWidthClassName)}
        style={{
          gridTemplateColumns: `repeat(${items.length + (logout ? 1 : 0)}, 1fr)`,
        }}
      >
        {items.map((item) => (
          <div key={item.key} className="w-full">
            {/* Safer: use inline height to avoid Tailwind dynamic class issues */}
            <div style={{ height: heightPx }}>
              <BottomNavItem item={item} heightPx={heightPx} />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant={logout.variant ?? "ghost"}
          onClick={() => {
            logoutUser();
            navigate({ to: "/auth", replace: true });
          }}
          className={cn(
            "w-full rounded-none px-2",
            "flex flex-col items-center justify-center gap-1",
            "text-destructive hover:text-destructive hover:bg-destructive/10"
          )}
          style={{ height: heightPx }}
          aria-label={logout.ariaLabel ?? logout.label}
        >
          <GoogleFontIcon icon={logout.icon} />
          <span className="text-[12px] leading-none whitespace-nowrap">
            {logout.label}
          </span>
        </Button>
      </div>
    </nav>
  );
}
