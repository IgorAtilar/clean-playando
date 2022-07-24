export const formatToLocaleDateString = (date: Date) =>
  new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);

export const getFormattedDateString = (date: string | Date) => {
  if (!(date instanceof Date)) return formatToLocaleDateString(new Date(date));
  return formatToLocaleDateString(date);
};
