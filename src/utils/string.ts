/**
 * Produces initials to be shown inside placeholder avatar components
 * @param {string} text Raw text to be transformed
 * @returns {string} Initials
 */
export const getInitials = (text: string): string => {
  const initials = text
    ?.match(/\b[A-Z]/g)
    ?.join('')
    ?.slice(0, 3);
  return initials ?? text[0]?.toUpperCase() ?? '';
};
