export const normalizeString = (str) => str
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLowerCase();

export const compareTerms = (term, termToCompare) => {
  const normalizedTerm = normalizeString(term.toLowerCase());
  const normalizedTermToCompare = normalizeString(termToCompare.toLowerCase());
  const didMatch = normalizedTerm.includes(normalizedTermToCompare);
  return didMatch;
};
