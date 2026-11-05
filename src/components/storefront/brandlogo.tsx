import Image from "next/image";

export function BrandLogo() {
  return (
    <Image
      src="/logo.png"
      alt="Hurç Logo"
      width={260}
      height={90}
      priority
      unoptimized
      style={{ width: "auto" }}
      className="!h-10 sm:!h-14 md:!h-16 lg:!h-20 max-w-none object-contain group-hover:scale-105 transition-transform"
    />
  );
}