import MockResponse from '@/mock/MockResponse'
import {mock} from 'mockjs'

class MockHandler extends MockResponse {

  public constructor (url: string, type: string, template: {}[], code: number, status: boolean, condition: boolean) {
    super(url, type, template, code, status, condition)
  }

  public static mockOption (options: any) {
    // 获得解析模板
    const mockTemplate = this.createMockTemplate(options)
    // 返回实例
    const mock = this.createInstance(mockTemplate)
    // 将实例批量初始化
    mock.forEach((res: any) => {
      res.init(res)
    })
  }

  /**
   * 初始化模板
   * @param option
   * @private
   */
  private init (option: any) {
    // 返回对象实例模板
    const mockState = option.mockState(option)
    // 执行对象
    option.starter(mockState)
  }

  /**
   * 解析数据模板
   * @param option
   */
  private static createMockTemplate (option: any): [] {
    let arr: any = []
    for (let optionKey in option) {
      Object.keys(option[optionKey]).reduce((prev: any, curr: any) => {
        arr.push(prev[curr])
        prev[curr] = curr
        return prev
      }, option[optionKey])
    }
    return arr
  }



  private static createInstance (options: any) {
    let arr: any = []
    options.forEach((res: any) => {
      arr.push(new MockHandler(res.url, res.type, res.template, res.code, res.status, res.condition))
    })
    return arr
  }

  private mockState (options: any) {
    return {
      url: RegExp(options.url),
      type: options.type,
      response: options.response(),
    }
  }

  private starter (options: any) {
    mock(options.url, options.type, options.response)
  }

}

export default MockHandler
