import { AxiosResponse } from 'axios'

export class WebStorageCache {
  public setCahce<T>(key: string, response: AxiosResponse<T>) {
    window.sessionStorage.setItem(key, JSON.stringify(response.data))
  }

  public getCache<T>(key: string): AxiosResponse<T> | undefined {
    const cache = window.sessionStorage.getItem(key)
    if (!cache) {
      return undefined
    }
    const sessionCache = JSON.parse(cache) as T

    return this.mapAxiosResponse(200, 'success', sessionCache)
  }

  private mapAxiosResponse<T>(
    status: number,
    statusText: string,
    data: T | undefined
  ): AxiosResponse<T> {
    return {
      headers: {},
      config: {},
      status,
      statusText,
      data,
    } as AxiosResponse<T>
  }
}
