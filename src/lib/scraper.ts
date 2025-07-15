import axios from 'axios';
import cheerio from 'cheerio';

export const scrapeBlog = async (url: string): Promise<string> => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const content = $('article').text(); // Modify selector based on your blog structure
    return content.trim();
  } catch (error) {
    console.error('Error scraping the blog:', error);
    throw new Error('Failed to scrape the blog');
  }
};
