"use client";

import { Globe } from "lucide-react";
import { languages, type Language } from "@/constants/languages";

interface LanguageSelectorProps {
  selected: Language;
  onSelect: (lang: Language) => void;
}

export default function LanguageSelector({ selected, onSelect }: LanguageSelectorProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Globe size={15} color="var(--text-muted)" />
      <div style={{ position: "relative" }}>
        <select
          className="lang-select"
          value={selected.code}
          onChange={(e) => {
            const lang = languages.find((l) => l.code === e.target.value);
            if (lang) onSelect(lang);
          }}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
