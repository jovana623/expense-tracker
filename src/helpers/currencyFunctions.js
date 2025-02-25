export function getCurrencyEntity(currency) {
  const currencySymbols = {
    EUR: "€",
    USD: "$",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    CNY: "¥",
    SEK: "kr",
    NZD: "NZ$",
  };

  return currencySymbols[currency] || currency;
}
