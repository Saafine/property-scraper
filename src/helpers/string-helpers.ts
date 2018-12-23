export function similiarStrings(a: string, b: string): boolean {
  return a && b && a.toLocaleLowerCase().trim() === b.toLocaleLowerCase().trim();
}