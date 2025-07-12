
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const getRoiColor = (roi: number) => {
  if (roi > 0) return "text-green-400";
  if (roi < 0) return "text-red-400";
  return "text-slate-400";
};
