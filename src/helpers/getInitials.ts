export default function getInitials (fullName: string) {
  const initials = fullName
  .split(' ')
  .map(name => name.charAt(0).toUpperCase())
  .join('')
  return initials
}