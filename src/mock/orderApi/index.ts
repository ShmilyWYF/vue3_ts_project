import template from '@/mock/template'

const orderApi = [
  {
    url: '/order/get',
    type: 'get',
    template,
    code: Number(200),
    status: true,
    condition: true
  },
  {
    url: '/order/list',
    type: 'get',
    template,
    code: Number(200),
    status: false,
    condition: false
  },
  {
    url: '/order/getInfo',
    type: 'get',
    template,
    code: Number(200),
    status: true,
    condition: true
  }
]

export default orderApi
