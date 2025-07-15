const translationDict: { [key: string]: string } = {
  "the": "یہ",
  "is": "ہے",
  "a": "ایک",
  "blog": "بلاگ",
  "post": "پوسٹ",
  // Add more words to the dictionary
};

export const translateToUrdu = (text: string): string => {
  return text
    .split(' ')
    .map(word => translationDict[word.toLowerCase()] || word)
    .join(' ');
};
