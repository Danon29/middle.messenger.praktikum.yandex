export default function snakeToCamel(s: string): string {
  return s.replace(/_./g, (match) => match.charAt(1).toUpperCase())
}
