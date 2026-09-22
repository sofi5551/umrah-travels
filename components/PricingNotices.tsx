/**
 * Fixed "Important note" + optional "Return transfer" pair shown below the
 * pricing content on /services and /ziyarat pages. Ziyarat pages only ever
 * show the "Important note" half (no return-transfer concept), so the
 * return-trip props are optional and that card only renders when they're
 * actually provided.
 */
export default function PricingNotices({
  whatsappHref,
  returnTitle,
  returnBody,
  idealFor,
  showReturnTransfer = true,
}: {
  whatsappHref: string;
  returnTitle?: string;
  returnBody?: string;
  idealFor?: string[];
  showReturnTransfer?: boolean;
}) {
  const canShowReturnTransfer = showReturnTransfer && returnTitle && returnBody && idealFor;

  return (
    <div className={`grid gap-6 ${canShowReturnTransfer ? "lg:grid-cols-2" : "max-w-xl"}`}>
      <div className="border border-sandline bg-sand/40 p-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 11v5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="12" cy="7.75" r="1" fill="currentColor" />
          </svg>
        </div>
        <h3 className="mt-4 font-display text-lg text-ink">Important note</h3>
        <p className="mt-3 text-sm text-charcoal">Prices may vary slightly during:</p>
        <ul className="mt-3 space-y-2 text-sm text-charcoal">
          {["Ramadan peak hours", "Hajj season", "Special road regulation periods"].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {item}
            </li>
          ))}
        </ul>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-inkdeep"
        >
          Confirm fare on WhatsApp
        </a>
      </div>

      {canShowReturnTransfer && (
        <div className="border border-sandline bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            Return transfers
          </p>
          <h3 className="mt-2 font-display text-lg text-ink">{returnTitle}</h3>
          <p className="mt-3 text-sm text-charcoal">{returnBody}</p>
          <p className="mt-5 text-sm font-medium text-ink">Ideal for:</p>
          <ul className="mt-2 space-y-2 text-sm text-charcoal">
            {idealFor.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
