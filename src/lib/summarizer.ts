export const summarizeBlog = (content: string): string => {
  const summary = content.split(' ').slice(0, 50).join(' ') + '...'; // Simulate an AI summary
  return summary;
};
