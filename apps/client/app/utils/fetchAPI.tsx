import { cookies } from 'next/headers';

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

class HttpUtil {
  static async fetchAPI(
    path: string,
    method: Methods,
    tag?: string,
    body?: any
  ) {
    const accessToken = cookies().get('accessToken')?.value;
    const token = accessToken;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    };

    if (method === Methods.GET && tag) {
      headers.next = JSON.stringify({ tags: [tag] }); // Serialize the object to JSON string
    }

    const options: RequestInit = {
      method: method,
      headers: headers,
      credentials: 'include',
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(process.env.STOOD_API + path, options);

    if (!res.ok) {
      throw new Error('Failed to fetch data' + path);
    }

    const data = await res.json();

    return data;
  }

  static async get(path: string, tag?: string) {
    return await this.fetchAPI(path, Methods.GET, tag);
  }

  static async post(path: string, body?: any) {
    return await this.fetchAPI(path, Methods.POST, undefined, body);
  }

  static async put(path: string, body?: any) {
    return await this.fetchAPI(path, Methods.PUT, undefined, body);
  }

  static async patch(path: string, body?: any) {
    return await this.fetchAPI(path, Methods.PATCH, undefined, body);
  }

  static async delete(path: string) {
    return await this.fetchAPI(path, Methods.DELETE);
  }
}

export default HttpUtil;
