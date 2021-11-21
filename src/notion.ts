export default class Notion {
  token: string;
  apiBase: string;

  constructor() {
    this.token = null;
    this.apiBase = "https://api.notion.com/v1/";
  }

  botId2iid(botId: string):string {
    return botId.replace(/-/g, "");
  };

  tokenizedHeaders() {
    return {
      "Content-Type": "application/json",
      "Notion-Version": "2021-05-13",
      Authorization: `Bearer ${this.token}`,
    };
  }

  async requestToken(botId: string) {
    const url = "https://www.notion.so/api/v3/getBotToken";
    const body = { botId: botId };
    const headers = {
      Accept: "application/json, */*",
      "Content-type": "application/json",
    };
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: headers,
      credentials: "include",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  }

  async createPage(_data: any, dbid: string) {
    const databaseId = this.botId2iid(dbid);
    const data = await _data;
    const title = data.title;
    const abst = data.abst;
    const paperUrl = data.url;
    try {
      const url = this.apiBase + "pages";
      const parent = {
        type: "database_id",
        database_id: databaseId,
      };
      const properties = {
        Title: {
          id: "title",
          type: "title",
          title: [{ text: { content: title } }],
        },
        Status: {
          id: "status",
          type: "select",
          select: { name: "NOT YET" },
        },
        URL: {
          id: "url",
          type: "url",
          url: paperUrl,
        },
        Abstract: {
          id: "abstract",
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: { content: abst},
              annotations: {
                bold: false,
                italic: true,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
              },
              plain_text: abst,
            },
          ],
        },
      };
      const body = {
        parent: parent,
        properties: properties,
      };
      console.log("DE",body);
      const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: this.tokenizedHeaders(),
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log("notion debug:", data);
      return data;
    } catch (err) {
      console.log("notion debug ERROR:", err);
      throw err;
    }
  }

  async retrieveDatabase() {
    try {
      const url = this.apiBase + "databases";
      const headers = this.tokenizedHeaders();
      const res = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: headers,
      });
      const data = await res.json();
      return data.results
    } catch (err) {
      console.log("[ERR] " + err);
      throw err;
    }
  }
}
