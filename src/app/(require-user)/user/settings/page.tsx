import { getSessionUser } from "@/lib/auth0"; // Veya oturum açmış kullanıcıyı çeken yardımcı fonksiyonunuz
import { UserSettingsForm } from "@/components/UserSettingsForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, MapPin } from "lucide-react";

export default async function UserSettingsPage() {
  // Layout zaten koruma sağladığı için tekrar redirect kontrolü yapmamıza gerek yok.
  // Sadece sayfada göstermek üzere kullanıcı verisini alıyoruz.
  const user = await getSessionUser();

  const userInitials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "H";

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* BAŞLIK VE ÖZET BİLGİ */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-2 border-primary/20 shadow-md">
            <AvatarImage src={user?.picture || ""} alt={user?.name || "Profil"} />
            <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-black text-foreground tracking-tight">
              Hesap Ayarları
            </h1>
            <p className="text-sm text-muted-foreground">
              Profil bilgilerinizi, teslimat adresinizi ve bildirim tercihlerinizi yönetin.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SOL KOLON: AUTH0 BİLGİLERİ */}
        <Card className="md:col-span-1 rounded-2xl border-border shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Kimlik Bilgileri
            </CardTitle>
            <CardDescription>
              Bu bilgiler Auth0 hesabınızdan çekilmektedir.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Ad Soyad
              </label>
              <p className="font-medium text-sm text-foreground mt-0.5">
                {user?.name || "Belirtilmedi"}
              </p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                E-Posta Adresi
              </label>
              <p className="font-medium text-sm text-foreground mt-0.5 truncate">
                {user?.email || "Belirtilmedi"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* SAĞ KOLON: DÜZENLENEBİLİR FORM */}
        <Card className="md:col-span-2 rounded-2xl border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Teslimat & İletişim Bilgileri
            </CardTitle>
            <CardDescription>
              Hurç alışverişleriniz ve ilan teslimatlarınız için kullanılacak adres detayları.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserSettingsForm user={user} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}