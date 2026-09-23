'use client';

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

const CATEGORIES = [
  { id: "1", name: "Bebek Arabası & Puset", slug: "bebek-arabasi" },
  { id: "2", name: "Giyim & Tulum", slug: "giyim-tulum" },
  { id: "3", name: "Ayakkabı & Patik", slug: "ayakkabi-patik" },
  { id: "4", name: "Beşik & Oda Tekstili", slug: "besik-oda-tekstili" },
  { id: "5", name: "Oyuncak & Eğitici Setler", slug: "oyuncak" },
  { id: "6", name: "Beslenme & Bakım", slug: "beslenme-bakim" },
];

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Arama alanı dışına tıklandığında popover'ı kapat
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() !== "") {
      setOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch(query);
  };

  const handleSelectCategory = (slug: string) => {
    setOpen(false);
    router.push(`/category/${slug}`);
  };

  const handleCancel = () => {
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  // Türkçe karakter uyumlu dinamik filtreleme
  const filteredCategories = CATEGORIES.filter((category) =>
    category.name
      .toLocaleLowerCase('tr-TR')
      .includes(query.trim().toLocaleLowerCase('tr-TR'))
  );

  return (
    <div ref={searchContainerRef} className="w-full relative flex items-center gap-2">
      <div className="relative flex items-center flex-1">
        <Search className="absolute left-3.5 w-4 h-4 text-primary pointer-events-none z-10" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Hurçta ne arıyorsun? (örn: Puset, Tulum...)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-9 py-2 text-sm rounded-full bg-secondary/60 border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all placeholder:text-muted-foreground/70"
        />

        {/* Metin yazıldığında çıkan hızlı temizleme çarpı ikonu */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* DİNAMİK AÇILIR KATEGORİ MENÜSÜ */}
        {open && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 p-2 rounded-2xl border border-border shadow-xl bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 duration-100">
            <div className="max-h-[260px] overflow-y-auto flex flex-col gap-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-3 py-1">
                {query.trim() === "" ? "Popüler Kategoriler" : "Eşleşen Kategoriler"}
              </span>

              {filteredCategories.length === 0 ? (
                <div className="py-4 text-center text-xs text-muted-foreground">
                  Aradığın kategori bulunamadı. Genel arama yapmak için{" "}
                  <span className="font-semibold text-primary">Enter</span>'a basabilirsin.
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleSelectCategory(category.slug)}
                    type="button"
                    className="w-full text-left rounded-xl py-2 px-3 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                  >
                    {category.name}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* 🟢 ARKA PLANI OLMAYAN (GHOST) VAZGEÇ BUTONU */}
      {(open || query) && (
        <Button
          onClick={handleCancel}
          type="button"
          variant="ghost"
          className="rounded-full text-muted-foreground hover:text-foreground font-medium px-3 h-9 shrink-0 text-xs sm:text-sm cursor-pointer transition-all animate-in fade-in-0 slide-in-from-right-2 duration-150 hover:bg-transparent"
        >
          Vazgeç
        </Button>
      )}
    </div>
  );
}