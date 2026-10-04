"use client";

import { useActionState } from "react";
import { updateProfileAction } from "@/app/(require-user)/user/settings/action";
import { ProfileFormProps } from "@/types/user";
import { actionResponse } from "@/types/form";
import { MutedText } from "./typography";
import { Button } from "@/components/ui/button";

const initialState: actionResponse = {
  success: false,
  message: null,
  error: null,
  errors: undefined,
};

export function ProfileForm({ user }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, initialState);

  return (
    <form action={formAction} className="space-y-4 w-full max-w-md bg-card text-card-foreground p-6 rounded-xl border border-border shadow-sm">

      <div>
        <label htmlFor="phone" className="block text-xs font-semibold text-foreground mb-1">
          Telefon
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={user?.phone || ""}
          className="w-full px-3 py-2 text-sm bg-background text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground"
          placeholder="05XX XXX XX XX"
        />
        {state.errors?.phone?.[0] && (
          <MutedText className="text-destructive text-xs mt-1">
            {state.errors.phone[0]}
          </MutedText>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="city" className="block text-xs font-semibold text-foreground mb-1">
            Şehir
          </label>
          <input
            id="city"
            name="city"
            type="text"
            defaultValue={user?.city || ""}
            className="w-full px-3 py-2 text-sm bg-background text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground"
            placeholder="İstanbul"
          />
          {state.errors?.city?.[0] && (
            <MutedText className="text-destructive text-xs mt-1">
              {state.errors.city[0]}
            </MutedText>
          )}
        </div>

        <div>
          <label htmlFor="district" className="block text-xs font-semibold text-foreground mb-1">
            İlçe
          </label>
          <input
            id="district"
            name="district"
            type="text"
            defaultValue={user?.district || ""}
            className="w-full px-3 py-2 text-sm bg-background text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground"
            placeholder="Kadıköy"
          />
          {state.errors?.district?.[0] && (
            <MutedText className="text-destructive text-xs mt-1">
              {state.errors.district[0]}
            </MutedText>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="address" className="block text-xs font-semibold text-foreground mb-1">
          Adres
        </label>
        <textarea
          id="address"
          name="address"
          rows={3}
          defaultValue={user?.address || ""}
          className="w-full px-3 py-2 text-sm bg-background text-foreground border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground"
          placeholder="Açık adresiniz..."
        />
        {state.errors?.address?.[0] && (
          <MutedText className="text-destructive text-xs mt-1">
            {state.errors.address[0]}
          </MutedText>
        )}
      </div>

      {state.error && !state.errors && (
        <div className="p-3 text-xs bg-destructive/10 text-destructive border border-destructive/20 rounded-lg">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="p-3 text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-lg">
          {state.message}
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full font-medium text-sm py-2.5 rounded-lg transition-colors"
      >
        {isPending ? "Kaydediliyor..." : "Kaydet"}
      </Button>
    </form>
  );
}