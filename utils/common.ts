export function yearFromISO(
  dateInput: string | Date,
  opts: { locale?: string | string[]; timeZone?: string } = {}
): string | null {
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (!(d instanceof Date) || Number.isNaN(d.getTime())) return null;

  const { locale, timeZone = 'UTC' } = opts;

  // Use Intl for consistent i18n and server/client parity
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    timeZone,
  });

  return formatter.format(d);
}

