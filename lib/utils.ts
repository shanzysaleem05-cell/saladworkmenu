import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Single shared slug generator for menu item names. Strips trademark symbols,
 * converts "&" to "and", and removes every other non a-z0-9 character
 * (accents, parentheses, apostrophes) instead of just replacing spaces --
 * the old `name.toLowerCase().replace(/ /g, "-")` pattern left "&", "(", ")"
 * and accented letters in live URLs (e.g. "/menu/coke-(bottle)").
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[®™©]/g, '') // strip (R) (TM) (C)
    .replace(/&/g, 'and')
    .normalize('NFD')
    .replace(new RegExp('[' + String.fromCharCode(0x0300) + '-' + String.fromCharCode(0x036f) + ']', 'g'), '') // strip diacritics (e.g. accented e, n)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
