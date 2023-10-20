import Mock from "mockjs";

export const featureArticle = () => {
    return {
        TOP: {
            type: 'Docker',
            index: '# Docker',
            bgimg: 'https://static.linhaojun.top/aurora/articles/3ec095cd9b7bd3f766166a4db14160c6.jpg',
            title: 'docker入门',
            desc: '1.docker概述1.1 基本介绍Docker是一个开源的应用容器引擎，基于 Go 语言并遵从 Apache2.0 协议开源。Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux机器上也可以实现虚拟化容器是完全使用沙箱机制，相互之间不会有任何接口,更重要的是容器性能开销极低。Docker 从 17.03 版本之后分为 CE（Community Edition: 社区版） 和 EE（Enterprise Edition: 企业版），我们用社区版就可以了。官网1.2 应用场景Web 应用的自动化打包和发布。',
            to: '/articles/1',
            avatar: 'https://static.linhaojun.top/aurora/avatar/52a81cd2772167b645569342e81ce312.jpg',
            author: 'wyf',
            datatime: 1694627196,
            top: true,
        },
        LIST: [{
            type: 'Docker',
            index: '# Docker',
            bgimg: 'https://static.linhaojun.top/aurora/articles/fcb421837abd7e593fbfd359112bb26c.jpg',
            title: 'docker入门',
            desc: '1.docker概述1.1 基本介绍Docker是一个开源的应用容器引擎，基于 Go 语言并遵从 Apache2.0 协议开源。Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux机器上也可以实现虚拟化容器是完全使用沙箱机制，相互之间不会有任何接口,更重要的是容器性能开销极低。Docker 从 17.03 版本之后分为 CE（Community Edition: 社区版） 和 EE（Enterprise Edition: 企业版），我们用社区版就可以了。官网1.2 应用场景Web 应用的自动化打包和发布。',
            to: '/articles/2',
            avatar: 'https://static.linhaojun.top/aurora/avatar/52a81cd2772167b645569342e81ce312.jpg',
            author: 'wyf',
            datatime: 1694627196,
            top: false,
        }, {
            type: 'Docker',
            index: '# Docker',
            bgimg: 'https://static.linhaojun.top/aurora/articles/fcb421837abd7e593fbfd359112bb26c.jpg',
            title: 'docker入门',
            desc: '1.docker概述1.1 基本介绍Docker是一个开源的应用容器引擎，基于 Go 语言并遵从 Apache2.0 协议开源。Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux机器上也可以实现虚拟化容器是完全使用沙箱机制，相互之间不会有任何接口,更重要的是容器性能开销极低。Docker 从 17.03 版本之后分为 CE（Community Edition: 社区版） 和 EE（Enterprise Edition: 企业版），我们用社区版就可以了。官网1.2 应用场景Web 应用的自动化打包和发布。',
            to: '/articles/3',
            avatar: 'https://static.linhaojun.top/aurora/avatar/52a81cd2772167b645569342e81ce312.jpg',
            author: 'wyf',
            datatime: 1694627196,
            top: false,
        }]
    }
}

export const articleListByName = (parameters?: string):any => {
    if (parameters === 'ALL') {
        return Mock.mock({
            'data|20': [
                {
                    type: 'Docker',
                    index: '# Docker',
                    bgimg: 'https://static.linhaojun.top/aurora/articles/fcb421837abd7e593fbfd359112bb26c.jpg',
                    title: 'docker入门',
                    desc: '1.docker概述1.1 基本介绍Docker是一个开源的应用容器引擎，基于 Go 语言并遵从 Apache2.0 协议开源。Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux机器上也可以实现虚拟化容器是完全使用沙箱机制，相互之间不会有任何接口,更重要的是容器性能开销极低。Docker 从 17.03 版本之后分为 CE（Community Edition: 社区版） 和 EE（Enterprise Edition: 企业版），我们用社区版就可以了。官网1.2 应用场景Web 应用的自动化打包和发布。',
                    to: '/articles/11',
                    avatar: 'https://static.linhaojun.top/aurora/avatar/52a81cd2772167b645569342e81ce312.jpg',
                    author: 'wyf',
                    datatime: 1694627196,
                    top: false,
                },
            ]
        })
    } else {
        return Mock.mock({
            'data|2': [
                {
                    type: 'Docker',
                    index: '# Docker',
                    bgimg: 'https://static.linhaojun.top/aurora/articles/fcb421837abd7e593fbfd359112bb26c.jpg',
                    title: 'docker入门',
                    desc: '1.docker概述1.1 基本介绍Docker是一个开源的应用容器引擎，基于 Go 语言并遵从 Apache2.0 协议开源。Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux机器上也可以实现虚拟化容器是完全使用沙箱机制，相互之间不会有任何接口,更重要的是容器性能开销极低。Docker 从 17.03 版本之后分为 CE（Community Edition: 社区版） 和 EE（Enterprise Edition: 企业版），我们用社区版就可以了。官网1.2 应用场景Web 应用的自动化打包和发布。',
                    to: '/articles/12',
                    avatar: 'https://static.linhaojun.top/aurora/avatar/52a81cd2772167b645569342e81ce312.jpg',
                    author: 'wyf',
                    datatime: 1694627196,
                    top: false,
                },
            ]
        })
    }
}

export const articleListTag:any[] = [
    {
        articleCount: 1,
        categoryName:"Docker"
    },
    {
        articleCount: 5,
        categoryName:"JAVA"
    },
    {
        articleCount: 9,
        categoryName:"C++"
    }
]

export const ArticleAsideList = () => {
    return {
        introduction: {
            img:'src/assets/default-cover.jpg',
            nickname:'三个字',
            description:'一个疯狂的字符串',
            url:'https://github.com',
            childer:[
                {
                    count: articleListByName('ALL').data.length,
                    title:'文章'
                },
                {
                    count:'2',
                    title:'说说'
                },
                {
                    count:'14',
                    title:'分类'
                },
                {
                    count:'11',
                    title:'标签'
                }
            ]
        },
        commentsList,
        // 时间戳
        WebsiteInformation: [
            {
                title: '运行时间',
                value: 1697567729,
            },
            {
                title: '访问数量',
                value: '# Tag'
            },
        ],
        // 标签
        tags,
    }
}



const {commentsList} = Mock.mock({
    'commentsList|16': [
        {
            avatar: 'https://static.linhaojun.top/aurora/avatar/52a81cd2772167b645569342e81ce312.jpg',
            nickname: '@cname',
            date: '@date',
            Content: '@string("upper","10","35")',
        }
    ]
})

const {tags} = Mock.mock({
    'tags|16': [
        {
            type: 'info',
            label: '@name',
            url: 'article-list/@id'
        },
    ]
})
