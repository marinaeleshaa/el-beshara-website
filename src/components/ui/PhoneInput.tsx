"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";

interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  phoneLength: number; // Total length including country code
}

const countries: Country[] = [
  { name: "Egypt", code: "EG", dialCode: "+20", flag: "🇪🇬", phoneLength: 13 },
  {
    name: "United States",
    code: "US",
    dialCode: "+1",
    flag: "🇺🇸",
    phoneLength: 12,
  },
  {
    name: "United Kingdom",
    code: "GB",
    dialCode: "+44",
    flag: "🇬🇧",
    phoneLength: 13,
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    dialCode: "+966",
    flag: "🇸🇦",
    phoneLength: 13,
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    dialCode: "+971",
    flag: "🇦🇪",
    phoneLength: 13,
  },
  { name: "Kuwait", code: "KW", dialCode: "+965", flag: "🇰🇼", phoneLength: 12 },
  { name: "Qatar", code: "QA", dialCode: "+974", flag: "🇶🇦", phoneLength: 12 },
  {
    name: "Bahrain",
    code: "BH",
    dialCode: "+973",
    flag: "🇧🇭",
    phoneLength: 12,
  },
  { name: "Oman", code: "OM", dialCode: "+968", flag: "🇴🇲", phoneLength: 12 },
  { name: "Jordan", code: "JO", dialCode: "+962", flag: "🇯🇴", phoneLength: 13 },
  {
    name: "Lebanon",
    code: "LB",
    dialCode: "+961",
    flag: "🇱🇧",
    phoneLength: 12,
  },
  {
    name: "Palestine",
    code: "PS",
    dialCode: "+970",
    flag: "🇵🇸",
    phoneLength: 13,
  },
  { name: "Iraq", code: "IQ", dialCode: "+964", flag: "🇮🇶", phoneLength: 14 },
  { name: "Syria", code: "SY", dialCode: "+963", flag: "🇸🇾", phoneLength: 13 },
  { name: "Turkey", code: "TR", dialCode: "+90", flag: "🇹🇷", phoneLength: 13 },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪", phoneLength: 13 },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷", phoneLength: 12 },
  { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹", phoneLength: 13 },
  { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸", phoneLength: 12 },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦", phoneLength: 12 },
  {
    name: "Australia",
    code: "AU",
    dialCode: "+61",
    flag: "🇦🇺",
    phoneLength: 12,
  },
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳", phoneLength: 13 },
  {
    name: "Pakistan",
    code: "PK",
    dialCode: "+92",
    flag: "🇵🇰",
    phoneLength: 13,
  },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳", phoneLength: 14 },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵", phoneLength: 13 },
  {
    name: "South Korea",
    code: "KR",
    dialCode: "+82",
    flag: "🇰🇷",
    phoneLength: 13,
  },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  dir?: "ltr" | "rtl";
}

export const PhoneInput = ({
  value,
  onChange,
  placeholder = "+20 123 456 7890",
  className = "",
  error = false,
  dir = "ltr",
}: PhoneInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lang = useLocale();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Set initial value with default country code if empty
    if (!value) {
      onChange(selectedCountry.dialCode);
    }
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery)
  );

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery("");

    // Update phone value with new country code
    const currentNumber = value.replace(/^\+\d+/, "").trim();
    const newValue = country.dialCode + currentNumber;

    // Apply max length validation for new country
    if (newValue.length <= country.phoneLength) {
      onChange(newValue);
    } else {
      // Truncate to max length if exceeds
      onChange(newValue.substring(0, country.phoneLength));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Remove all non-digit characters except plus
    inputValue = inputValue.replace(/[^\d+]/g, "");

    // Ensure it starts with the selected country's dial code
    if (!inputValue.startsWith(selectedCountry.dialCode)) {
      inputValue = selectedCountry.dialCode + inputValue.replace(/^\+\d*/, "");
    }

    // Apply max length validation based on selected country
    const fullNumber =
      selectedCountry.dialCode +
      inputValue.replace(selectedCountry.dialCode, "");
    if (fullNumber.length <= selectedCountry.phoneLength) {
      onChange(fullNumber);
    }
  };

  const displayNumber = value.replace(selectedCountry.dialCode, "").trim();
  const remainingChars = selectedCountry.phoneLength - value.length;
  const isMaxLength = value.length >= selectedCountry.phoneLength;

  return (
    <div className={`relative ${className}`}>
      <div className="flex gap-2">
        {/* Country Selector */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md border ${
              error ? "border-primary" : "border-input"
            } bg-background hover:bg-secondary/50 transition-colors min-w-[100px] h-[42px]`}
          >
            <span className="text-xl">{selectedCountry.flag}</span>
            <span className="text-sm font-medium">
              {selectedCountry.dialCode}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute top-full mt-1 w-[280px] bg-background border border-input rounded-lg shadow-lg z-50 max-h-[300px] overflow-hidden">
              {/* Search */}
              <div className="p-2 border-b border-input sticky top-0 bg-background">
                <input
                  dir={lang === "ar" ? "rtl" : "ltr"}
                  type="text"
                  placeholder="Search country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Country List */}
              <div className="overflow-y-auto max-h-[240px]">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-secondary/50 transition-colors text-left ${
                        selectedCountry.code === country.code
                          ? "bg-secondary"
                          : ""
                      }`}
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span className="flex-1 text-sm">{country.name}</span>
                      <span className="text-sm font-medium text-foreground/60">
                        {country.dialCode}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-4 text-sm text-foreground/60 text-center">
                    No countries found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <div className="flex-1 relative">
          <input
            type="tel"
            value={displayNumber}
            onChange={handlePhoneChange}
            placeholder={placeholder.replace(/^\+\d+\s*/, "")}
            dir={dir}
            maxLength={
              selectedCountry.phoneLength - selectedCountry.dialCode.length
            }
            className={`w-full px-3 py-2 rounded-md border ${
              error ? "border-primary" : "border-input"
            } bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors h-[42px] ${
              isMaxLength ? "pr-12" : ""
            }`}
          />
          {value.length > 0 && (
            <div
              className={`absolute ${
                dir === "rtl" ? "left-3" : "right-3"
              } top-1/2 -translate-y-1/2 text-xs text-foreground/50`}
            >
              {value.length}/{selectedCountry.phoneLength}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
