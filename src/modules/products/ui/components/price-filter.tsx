"use client";

import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function formatAsCurrency(value: string) {
  console.log("formatAsCurrency", value);
  const numericValue = value.replace(/[^0-9.-]+/g, "");

  const parts = numericValue.split(".");
  const formatedValue =
    parts[0] + (parts.length > 1 ? "." + parts[1]?.slice(0, 2) : "");

  if (!formatedValue) return "";

  const numberValue = parseFloat(formatedValue);

  if (isNaN(numberValue)) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numberValue);
}

export function PriceFilter({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: {
  maxPrice?: string | null;
  minPrice?: string | null;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}) {
  function handleMinPriceChange(event: ChangeEvent<HTMLInputElement>) {
    const numericValue = event.target.value.replace(/[^0-9.-]+/g, "");
    onMinPriceChange(numericValue);
  }

  function handleMaxPriceChange(event: ChangeEvent<HTMLInputElement>) {
    const numericValue = event.target.value.replace(/[^0-9.-]+/g, "");
    onMaxPriceChange(numericValue);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">
          Minimum Price
        </Label>
        <Input
          type="text"
          placeholder="$0"
          value={minPrice ? formatAsCurrency(minPrice) : ""}
          onChange={handleMinPriceChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">
          Maximum Price
        </Label>
        <Input
          type="text"
          placeholder="∞"
          value={maxPrice ? formatAsCurrency(maxPrice) : ""}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
}