import {requireAdmin} from "@/lib/auth0";

export default async function AdminProtectedLayout({children}: LayoutProps<'/'>){
  await requireAdmin();

  return (
    <div className="in-h-full flex flex-col">
      {children}
    </div>
  )
}