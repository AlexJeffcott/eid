export default function LocalisedPrice(locale, price) {
  switch (locale) {
    case "de-DE":
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(price / 100)
    case "en-GB":
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(price / 100)
    default:
      return new Intl.NumberFormat().format(price / 100)
  }
}
