import axios, { AxiosResponse } from "axios";

export class HttpModule {
  api_key: string;

  constructor(apiKey: string) {
    this.api_key = apiKey;
  }

  async post(url: string, data: object): Promise<AxiosResponse> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.api_key}`,
    };

    try {
      const response = await axios.post(url, JSON.stringify(data), { headers });

      if (response.status === 500) {
        throw new Error("Server error");
      }

      try {
        // const response_data = response.data;

        return response;
      } catch (error) {
        throw new Error("Unable to parse JSON response");
      }
    } catch (error) {
      throw new Error("Unable to contact API server");
    }
  }
}
