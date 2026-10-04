import { getSessionUser } from "@/lib/auth0"; 
import { ProfileForm } from "@/components/UserSettingsForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, MapPin } from "lucide-react";
import { MutedText, PageTitle, BodyText } from "@/components/typography";

export default async function UserSettingsPage() {
  const user = await getSessionUser();

  const userInitials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "H";

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6 bg-background text-foreground min-h-screen">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-2 border-primary/20 shadow-md">
            <AvatarImage src={user?.picture || ""} alt={user?.name || "Profil"} />
            <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div>
            <PageTitle>
              Hesap Ayarları
            </PageTitle>
            <MutedText>
              Profil bilgilerinizi, teslimat adresinizi ve bildirim tercihlerinizi yönetin.
            </MutedText>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                Ad Soyad
              </label>
              <BodyText>
                {user?.name || "Belirtilmedi"}
              </BodyText>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                E-Posta Adresi
              </label>
              <BodyText className="truncate">
                {user?.email || "Belirtilmedi"}
              </BodyText>
            </div>
          </CardContent>
        </Card>

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
            <ProfileForm user={user} />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}