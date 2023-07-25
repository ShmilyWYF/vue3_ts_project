import template from '@/mock/template'

const userApi = [
  {
    url: '/user/login',
    type: 'get',
    template,
    code: Number(200),
    status: true,
    condition: true
  },
  {
    url: '/user/logout',
    type: 'get',
    template,
    code: Number(200),
    status: false,
    condition: false
  },
  {
    url: '/user/getInfo',
    type: 'get',
    template,
    code: Number(200),
    status: true,
    condition: true
  },
  {
    url: '/test',
    type: 'get',
    template,
    code: Number(200),
    status: true,
    condition: true
  }
]

export default userApi
