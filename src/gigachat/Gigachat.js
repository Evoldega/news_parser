import GigaChat from 'gigachat';
import axios from 'axios';
import { Agent } from 'node:https';
import { v4 as uuidv4 } from 'uuid';

export class Gigachat {
  constructor() {
    this._client = null;
    this._token = null;
  }

  async getToken() {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Accept': 'application/json', 
        'RqUID': uuidv4(), 
        'Authorization': `Basic ${process.env.CHAT_AUTH_KEY}`
      },
      data: {
        'scope': 'GIGACHAT_API_PERS'
      }
    };
    try {
      const token = await axios.request(config);
      if (this._client) {
        this._client.accessToken = this._token;
      }

      this._token = token?.data?.access_token;

      if (this._client) {
        this._client.accessToken = this._token;
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
    }
    
  }

  async getClient() {
    
    await this.getToken();

    if (!this._client) {
      const httpsAgent = new Agent({
        rejectUnauthorized: false,
      });

      this._client = new GigaChat({
        timeout: 600,
        model: 'GigaChat',
        accessToken: this._token,
        scope: "GIGACHAT_API_PERS",
        httpsAgent
      });
    }

    return this._client;
  }

  async getModels() {
    const client = await this.getClient();
    return await client.getModels();
  }

  async getAnswer(sysPrompt, question) {
    const client = await this.getClient();
    const res = await client.chat({
      messages: [{ role: 'user', content: `${sysPrompt} ${question}` }],
    });
    
    return res?.choices[0]?.message?.content ?? "От модели ответа нет";    
  }

}