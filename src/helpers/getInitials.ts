export default function getInitials(fullName: string | null) {
  if(fullName){
    const initials = fullName
      .split(' ')
      .map((name) => name.charAt(0).toUpperCase())
      .join('');
    return initials;
  }
  return null
}
