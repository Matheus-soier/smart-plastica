import Image from "next/image";

import { cn } from "@/lib/utils";

type SmartLogoProps = {
  variant: "lightOnDark" | "darkOnLight";
  className?: string;
  priority?: boolean;
};

const logoByVariant = {
  darkOnLight: "/brand/logo-smart-terracota.png",
  lightOnDark: "/brand/logo-smart-branca.png",
} as const;

export function SmartLogo({ variant, className, priority = false }: SmartLogoProps) {
  return (
    <Image
      src={logoByVariant[variant]}
      alt="Smart Plástica"
      width={1066}
      height={196}
      priority={priority}
      className={cn("h-auto w-[170px] sm:w-[230px] md:w-[270px]", className)}
      sizes="(max-width: 640px) 170px, (max-width: 768px) 230px, 270px"
    />
  );
}
