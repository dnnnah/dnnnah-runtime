/**
 * Email obfuscation — Zero Spam Policy.
 *
 * El email NUNCA aparece como string plano en el bundle.
 * Solo se decodifica con atob() cuando el usuario actúa físicamente
 * (click en botón o ejecución de comando en terminal).
 *
 * Para actualizar: btoa("nuevo@email.com") y reemplazar OBFUSCATED.
 */

const OBFUSCATED = 'ZG5ubmFoQGljbG91ZC5jb20='  // dnnnah@icloud.com

/** Decodifica el email. Llamar SOLO tras intención humana (click/comando). */
export function revealEmail(): string {
  return atob(OBFUSCATED)
}

/**
 * Versión visualmente ofuscada para mostrar en UI sin click.
 * Reemplaza @ → [at] y . → [dot] — humanos lo leen, regex no lo detecta.
 */
export function getDisplayEmail(): string {
  return revealEmail()
    .replace('@', '[at]')
    .replace(/\./g, '[dot]')
}

/** Copia el email al portapapeles. Devuelve true si tuvo éxito. */
export async function copyEmailToClipboard(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(revealEmail())
    return true
  } catch {
    return false
  }
}

/** Abre el cliente de mail nativo. El email no toca el DOM hasta el click. */
export function openMailto(subject = '', body = ''): void {
  window.location.href = `mailto:${revealEmail()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}