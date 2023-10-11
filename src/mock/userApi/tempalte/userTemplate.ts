import Mock from 'mockjs'

export default Mock.mock(
  {
    'item|100': [
      {
        id: '@cname',
        label: '@ctitle',
        'sex|1': ['男', '女'],
        value: '@string',
        'status|1': ['published', 'draft', 'deleted'],
        time: '@datetime',
        pageNum: '@integer(0,100)',
        'active|1': [true, false]
      }
    ]
  }
)
