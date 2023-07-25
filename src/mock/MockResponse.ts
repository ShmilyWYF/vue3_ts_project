export default class MockResponse {
  private url: string
  private type: string
  private readonly data: {}[]
  private readonly code: number
  private readonly status: boolean
  private readonly condition: boolean

  public constructor (url: string, type: string, template: {}[], code: number, status: boolean, condition: boolean) {
    this.url = url
    this.type = type
    this.data = template
    this.condition = condition
    this.status = status
    this.code = code
  }

  public response () {
    return this.condition ? {
      code: this.code,
      status: this.status,
      message: '请求数据成功',
      content: {
        total: this.data.length,
        data: this.data
      }
    } : {
      code: this.code,
      status: this.status,
      message: '请求数据失败'
    }
  }

  public mock () {
  }
}
