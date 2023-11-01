import {RolesMenu} from '@/mock/menuApi/tempalte/menuTemplate'


const menuApi = [
  {
    url: '/menu/get',
    type: 'get',
    template:RolesMenu,
    code: Number(200),
    status: true,
    condition: true
  },
]

export default menuApi
