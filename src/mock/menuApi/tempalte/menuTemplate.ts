import Mock from 'mockjs'

export default Mock.mock(
    [
        {
            id: '1',
            pid: '1',
            title: '教务管理',
            path: '/educate',
            value: '@string',
            icon: [''],
            'children': [
                {
                    id: '11',
                    pid: '11',
                    title: '学员中心-桃李云帮',
                    path: '/student',
                    value: '@string',
                    icon: [''],
                },
                {
                    id: '12',
                    pid: '12',
                    title: '班级管理-桃李云帮',
                    path: '/studentEnroll',
                    value: '@string',
                    icon: [''],
                },
                {
                    id: '13',
                    pid: '13',
                    title: '课表管理-桃李云帮',
                    path: '/class',
                    value: '@string',
                    icon: [''],
                }
            ]
        },
        {
            id: '2',
            pid: '2',
            title: '教务管理',
            path: '/educates',
            value: '@string',
            icon: [''],
            'children': [
                {
                    id: '21',
                    pid: '21',
                    title: '学员中心-桃李云帮',
                    path: '/students',
                    value: '@string',
                    icon: [''],
                },
                {
                    id: '22',
                    pid: '12',
                    title: '班级管理-桃李云帮',
                    path: '/studentEnrolls',
                    value: '@string',
                    icon: [''],
                },
                {
                    id: '23',
                    pid: '13',
                    title: '课表管理-桃李云帮',
                    path: '/classs',
                    value: '@string',
                    icon: [''],
                }
            ]
        },
    ]
)



