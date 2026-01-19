import axios from 'axios';
import * as cheerio from 'cheerio';
import { getMessageContent } from '../utils/utils.js';

export class PublicChannelParser {
  constructor(channelName) {
    this.channelName = channelName.replace('@', '');
    this.baseUrl = 'https://t.me/s/';
  }

  async parseLastMessages(limit = 50) {
    try {
      const url = `${this.baseUrl}${this.channelName}`;
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      
      const messages = [];
      
      $('.tgme_widget_message').slice(-limit).each((index, element) => {

        const date = $(element).find('.tgme_widget_message_date time').attr('datetime');
        const content = $(element).find('.tgme_widget_message_text').text().trim();
        const views = $(element).find('.tgme_widget_message_views').text();

        if (!content) return;

        messages.push(getMessageContent(content, date, views));
      });
      
      return messages
    } catch (error) {
      console.error('Ошибка парсинга:', error.message);
      return [];
    }
  }
}