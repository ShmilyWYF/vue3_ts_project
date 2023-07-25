import userApi from '@/mock/userApi'
import orderApi from '@/mock/orderApi'
import MockHandler from '@/mock/MockHandler'

const mocks = [
  userApi,
  orderApi
]
export const mockXHR = () => {
  MockHandler.mockOption(mocks)
}
