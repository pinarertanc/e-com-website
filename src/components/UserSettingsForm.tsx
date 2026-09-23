'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Loader2 } from "lucide-react";
import { UserSettingFormProps } from "@/types/user";

export function UserSettingsForm({ user, initialData }: UserSettingFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [phone, setPhone] = useState(initialData?.phone || "");
  const [city, setCity] = useState(initialData?.city || "");
  const [district, setDistrict] = useState(initialData?.district || "");
  const [address, setAddress] = useState(initialData?.address || "");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Ayarlar güncellenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div className="space-y-1.5">
        <Label htmlFor="phone">
          Telefon Numarası
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="05XX XXX XX XX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="rounded-xl"
        >
        </Input>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="city">Şehir</Label>
          <Input
            id="city"
            type="text"
            placeholder="İl"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="district">İlçe</Label>
          <Input
            id="district"
            type="text"
            placeholder="İlçe"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="rounded-xl"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="address">Açık Teslimat Adresi</Label>
        <Textarea
          id="address"
          rows={3}
          placeholder="Mahalle, sokak, bina ve daire numarası giriniz..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="rounded-xl resize-none"
        />
      </div>

      <div className="pt-2 flex items-center gap-3">
        <Button
        type="submit"
        disabled={loading}
        className="rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 px-6"
        >
          {loading? (
            <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
            Kaydediliyor...
            </>
          ) : success ? (
            <>
            <Check className="w-4 h-4 mr-2 text-emerald-200" />
            Gerekli Bilgiler Kaydedildi!
            </>
          ) : (
            <>   
            Değişiklikleri Kaydet       
            </>
          )
          }
          
        </Button>

      </div>



    </form>
  )
}



