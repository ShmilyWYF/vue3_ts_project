import Mock from "mockjs";
import {ArticleInterface, Tagsinterface} from "@/interface";
import {addOrEditTag, tags} from "@/mock/tagsApi/template";
import {addOrEditCategory, category} from "@/mock/categoryApi/template";
import store from "@/store";

// 定义随机占位符
Mock.Random.extend({
    tagsConstellations: tags.data,
    categoryConstellations: ["Docker", "JAVA", "C++"],
    category: function (date: any) {
        return this.pick(this.categoryConstellations, 1)
    },
    tagsList: function (data: any) {
        return this.pick(this.tagsConstellations, 1, 3)
    }
})

// mark文本
const content = "## 1.C++的安装\n\n> 以下命令基于CentOS环境。\n\n1. 下载工具\n\n   ```shell\n   yum install -y yum-utils\n   ```\n\n2. 设置镜像的仓库\n\n   ```shell\n   yum-config-manager \\\n       --add-repo \\\n       https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo  #配置阿里云的镜像\n   ```\n\n3. 更新yum软件包索引\n\n   ```shell\n   yum makecache fast\n   ```\n\n4. 安装docker相关配置\n\n   ```shell\n   yum install docker-ce docker-ce-cli containerd.io\n   ```\n\n5. 启动docker\n\n   ```shell\n   systemctl start docker\n   # 查看当前版本号，是否启动成功\n   docker version\n   # 设置开机自启动\n   systemctl enable docker\n   ```\n\n****\n\n## 2.安装mysql\n\n### 2.1 无挂载模式\n\n> 这种方式直接运行mysql之后，所有关于mysql的内容都在容器中，后续如果需要修改mysql的内容，需要手动进入容器内进行操作。且在宿主机上无备份，一旦容器被删除，数据也会被删除。\n\n```shell\ndocker pull mysql //下载MySQL镜像\ndocker run --name mysql --restart=always -p 3306:3306 -e MYSQL_ROOT_PASSWORD=密码 -d mysql //启动MySQL\n```\n\n### 2.2 数据卷挂载模式\n\n> 和**无挂载模式相对**，通过数据卷挂载的方式运行容器，将容器内的部分重要文件映射到宿主机上。直接操作宿主机对应的映射文件就能和容器内作同步，方便操作的同时还能保证容器内的数据在宿主机上有一个备份。\n>\n> 下面的命令分别对mysql的日志文件、配置文件、数据文件进行了映射，你也可以自己修改。\n\n```shell\ndocker run -d -p 3306:3306 --restart=always -v /auroras/mysql/log:/var/log/mysql -v /auroras/mysql/data:/var/lib/mysql -v /auroras/mysql/conf:/etc/mysql/conf.d  -e MYSQL_ROOT_PASSWORD=密码  --name mysql mysql\n```\n\n****\n\n## 3.安装redis\n\n```shell\ndocker pull redis //下载Redis镜像\ndocker run --name redis  --restart=always -p 6379:6379 -d redis --requirepass \"密码\" //启动Redis\n```\n\n## 4.安装rabbitmq\n\n```shell\ndocker pull rabbitmq:management //下载RabbitMQ镜像\ndocker run --name rabbit --restart=always -p 15672:15672 -p 5672:5672  -d  rabbitmq:management   //启动RabbitMQ,默认guest用户，密码也是guest。\n```\n\n## 5.安装elasticsearch\n\n```shell\ndocker pull elasticsearch:7.9.2\n```\n\n```shell\nmkdir -p  /home/elasticsearch/data/ \nmkdir -p  /home/elasticsearch/config/\n```\n\n### 5.1 编写配置文件\n\n```shell\necho 'http.host: 0.0.0.0\nhttp.cors.enabled: true\nhttp.cors.allow-origin: \"*\" '>>/home/elasticsearch/config/elasticsearch.yml\n```\n\n### 5.2 修改文件夹权限\n\n```shell\nchmod -R 777 /home/elasticsearch/\nls -l # 查看文件权限\n```\n\n### 5.3 启动elasticseach镜像\n\n```shell\ndocker run --name elasticsearch -p 9200:9200 \\\n -p 9300:9300 \\\n -e \"discovery.type=single-node\" \\\n -e ES_JAVA_OPTS=\"-Xms64m -Xmx128m\" \\\n  -v /home/elasticsearch/config/elasticsearch.yml:/usr/shellare/elasticsearch/config/elasticsearch.yml \\\n -v /home/elasticsearch/data:/usr/shellare/elasticsearch/data \\\n -v /home/elasticsearch/plugins:/usr/shellare/elasticsearch/plugins \\\n -d elasticsearch:7.9.2\n```\n\n接下来我们就是拿浏览器访问啦。\n\n在浏览器上输入：服务器IP地址:9200\n\n可能出现的问题：\n\n1. 启动成功，但是访问失败的话，查看一下安全组中映射端口是否已经打开。\n\n2. -e ES_JAVA_OPTS=\"-Xms64m -Xmx128m\"：配置内存大小出现了问题。（可试着调一下，docker玩不坏的，莫慌）\n\n3. 最后就还有可能是配置文件中出现了问题。\n\n   ```shell\n   echo 'http.host: 0.0.0.0\n   http.cors.enabled: true\n   http.cors.allow-origin: \"*\" '>>/home/elasticsearch/config/elasticsearch.yml\n   ```\n\n   `http.host: 0.0.0.0` 在冒号后面有一个空格的，这里的配置文件是`yml`格式,所以一定要严格按照`yml`格式来书写。\n\n安装ik分词器\n\n进入已经启动成功的elasticsearch容器。\n\n```shell\ndocker exec -it elasticsearch /bin/bash\n```\n\n```shell\n./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.9.2/elasticsearch-analysis-ik-7.9.2.zip\n```\n\nps: `安装的ik分词器的版本一定要与elasticsearch的版本保持一致`\n\n下载过程中如果遇到选择，直接输入 y回车就可以了。\n\n下载完成之后，退出去，重新启动elasticsearch容器。\n\n```shell\ndocker restart elasticsearch #  <容器名o容器id>   重启容器命令\n```\n\n测试ik分词器是否安装成功\n\n安装完成后，我们再来进行测试遍，看看有什么样的变化。\n\npostman post请求分词测试：`http://服务器IP地址:9200/_analyze`\n\n```json\n{\n\t\"tokenizer\":\"ik_smart\",// 分词器不同，这个地方也会有变化 具体的可能还需要去学习。\n\t\"text\":\"我爱技术\"\n}\n```\n\n结果\n\n```shell\n{\n    \"tokens\": [\n        {\n            \"token\": \"我\",\n            \"start_offset\": 0,\n            \"end_offset\": 1,\n            \"type\": \"CN_CHAR\",\n            \"position\": 0\n        },\n        {\n            \"token\": \"爱\",\n            \"start_offset\": 1,\n            \"end_offset\": 2,\n            \"type\": \"CN_CHAR\",\n            \"position\": 1\n        },\n        {\n            \"token\": \"技术\",\n            \"start_offset\": 2,\n            \"end_offset\": 4,\n            \"type\": \"CN_WORD\",\n            \"position\": 2\n        }\n    ]\n}\n```\n\n## 6.安装MaxWell(ElasticSearch同步数据）\n\n```sh\ndocker pull zendesk/maxwell //下载MaxWell镜像\ndocker run --name maxwell --restart=always  -d  zendesk/maxwell bin/maxwell  --user='数据库用户名' --password='数据库密码'  --host='IP地址'  --producer=rabbitmq --rabbitmq_user='MQ用户名' --rabbitmq_pass='MQ密码' --rabbitmq_host='IP地址' --rabbitmq_port='5672' --rabbitmq_exchange='maxwell_exchange'  --rabbitmq_exchange_type='fanout' --rabbitmq_exchange_durable='true' --filter='exclude: *.*, include: aurora.t_article.article_title = *, include: aurora.t_article.article_content = *, include: aurora.t_article.is_delete = *, include: aurora.t_article.status = *' //运行MaxWell\n```\n\n注意：上述命令中aurora为数据库名称。\n\n****\n\n## 7.填写aurora-springboot中的yml文件\n\n此处省略，操作比较简单，就是配置一些简单的ip+端口+用户名+密码，前提是服务器上对应的端口已经打开\n\n阿里云oss具体情况详见百度\n\nQQ互联具体情况详见百度\n\n这里就不赘述了\n\n## 8.打包运行后端项目\n\n1. 使用idea右侧Maven的package命令\n\n2. 在服务器的/usr/local/下面创建名为docker的文件夹\n\n3. 将打包好的jar包传到服务器上面的/usr/local/docker下面\n\n4. 编写Dockerfile,同时将编写好的Dockerfile传输到服务器的/usr/local/docker下面\n\n```dockerfile\nFROM openjdk:8\nVOLUME /tmp\nADD aurora-springboot-0.0.1.jar blog.jar\nENTRYPOINT [\"java\",\"-Djava.security.egd=file:/dev/./urandom\",\"-jar\",\"/blog.jar\"]\n```\n\n> 注意：Dockerfile文件只需要上传到指定目录下即可，不需要手动执行其他操作。\n\n5. 编写aurora-start.sh,同时将编写好的aurora-start.sh上传到服务器的/usr/local/docker下面\n\n```shell\n#源jar路径  \nSOURCE_PATH=/usr/local/docker\n#docker 镜像/容器名字或者jar名字 这里都命名为这个\nSERVER_NAME=aurora-springboot-0.0.1.jar\nTAG=latest\nSERVER_PORT=8080\n#容器id\nCID=$(docker ps | grep \"$SERVER_NAME\" | awk '{print $1}')\n#镜像id\nIID=$(docker images | grep \"$SERVER_NAME:$TAG\" | awk '{print $3}')\nif [ -n \"$CID\" ]; then\n  echo \"存在容器$SERVER_NAME, CID-$CID\"\n  docker stop $CID\n  docker rm $CID\nfi\n# 构建docker镜像\nif [ -n \"$IID\" ]; then\n  echo \"存在$SERVER_NAME:$TAG镜像，IID=$IID\"\n  docker rmi $IID\nelse\n  echo \"不存在$SERVER_NAME:$TAG镜像，开始构建镜像\"\n  cd $SOURCE_PATH\n  docker build -t $SERVER_NAME:$TAG .\nfi\necho \"$SERVER_NAME容器创建完成\"\n```\n\n**注意事项：sh文件需要用notepad++转为Unix格式**\n\n具体操作：点开notepad++中的编辑 ---> 文档格式转换 --->转为Unix \n\n6. cd到/usr/local/docker下面 ，执行如下命令打包docker镜像文件\n\n```shell\nsh aurora-start.sh\n```\n\n7. 启动容器\n\n```sh\ndocker run  --name aurora-springboot-0.0.1.jar -d -p 8080:8080 aurora-springboot-0.0.1.jar:latest\n```\n\n8. 这样后端项目就可以在服务器上跑起来了\n\n9. 访问测试(浏览器上访问)\n\n   ```shell\n   ip:8080/\n   ```\n\n****\n\n## 9.打包运行前端项目\n\n1. aurora-blog项目中，更改src/config/config.ts\n\n   ```typescript\n     captcha: {\n       TENCENT_CAPTCHA: '你自己的天御验证码'//用我的也行，但是防止我的使用量过多，导致无法验证，推荐使用自己的，毕竟我也没有充钱\n     },\n     qqLogin: {\n       QQ_APP_ID: '你自己的APP_ID',\n       QQ_REDIRECT_URI: 'https://你的前台域名/oauth/login/qq'\n     },\n   ```\n\n2. aurora-blog项目中，更改public/index.html\n\n   ```html\n   <script\n         src=\"http://connect.qq.com/qc_jssdk.js\"\n         data-appid=\"你自己的APP_ID\"\n         data-redirecturi=\"https://你的前台域名/oauth/login/qq\"></script>\n   ```\n\n3. 如果你的网站没有打算使用https,将aurora-blog/public/index.html和aurora-admin/public/index.html中下面这一行代码给注释掉\n\n   ```html\n   <meta http-equiv=\"Content-Security-Policy\" content=\"upgrade-insecure-requests\" />\n   ```\n\n4. 分别到aurora-blog和aurora-admin下面执行如下命令 (推荐关闭vscode的Eslint,本项目没有遵循Eslint的规范)\n\n   版本参考：npm版本为：8.3.1    vue-cli的版本为：5.0.6 （如果下列命令执行报错，可以尝试替换版本）\n\n   ```shell\n   npm install\n   npm run build\n   ```\n\n5. 在服务器的/usr/local/下面创建名为vue的文件夹，\n\n6. 将打包好的前台代码重命名为blog, 并传输到服务器的/usr/local/vue下面\n\n7. 将打包好的后台代码重命名为admin, 并传输到服务器的/usr/local/vue下面\n\n## 10.安装并启动nginx(没有开启https)\n\ntip: 在这之前，需要到域名提供商那里配置好域名，个人认为没有必要开启https,http完全够，并且省事儿。当然，如果想开启https的话，后面也有相应的教程。\n\n### 10.1 拉取nginx镜像\n\n```shell\ndocker pull nginx\n```\n\n### 10.2 在/usr/local/nginx下创建nginx.conf文件，格式如下\n\n```shell\nevents {\n    worker_connections  1024;\n}\n\nhttp {\n    include       mime.types;\n    default_type  application/octet-stream;\n    sendfile        on;\n    keepalive_timeout  65;\n\n    client_max_body_size     50m;\n    client_body_buffer_size  10m; \n    client_header_timeout    1m;\n    client_body_timeout      1m;\n\n    gzip on;\n    gzip_min_length  1k;\n    gzip_buffers     4 16k;\n    gzip_comp_level  4;\n    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;\n    gzip_vary on;\n\nserver {\n        listen       80;\n        server_name  前台域名;\n     \n        location / {\t\t\n            root   /usr/local/vue/blog;\n            index  index.html index.htm; \n            try_files $uri $uri/ /index.html;\t\n        }\n\t\t\t\n\tlocation ^~ /api/ {\t\t\n            proxy_pass http://你的ip:8080/;\n\t    proxy_set_header   Host             $host;\n            proxy_set_header   X-Real-IP        $remote_addr;\t\t\t\t\t\t\n            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;\n        }\n\t\t\n    }\n\t\nserver {\n        listen       80;\n        server_name  后台子域名;\n     \n        location / {\t\t\n            root   /usr/local/vue/admin;\n            index  index.html index.htm; \n            try_files $uri $uri/ /index.html;\t\n        }\n\t\t\t\n\tlocation ^~ /api/ {\t\t\n            proxy_pass http://你的ip:8080/;\n\t    proxy_set_header   Host             $host;\n            proxy_set_header   X-Real-IP        $remote_addr;\t\t\t\t\t\t\n            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;\n        }\n\t\t\n    }\n }\n```\n\n### 10.3 启动nginx\n\n```shell\ndocker run --name nginx --restart=always -p 80:80 -d -v /usr/local/nginx/nginx.conf:/etc/nginx/nginx.conf -v /usr/local/vue:/usr/local/vue nginx \n```\n\n****\n\n## 11.安装并启动nginx(开启https)\n\n### 11.1 修改配置文件\n\n> 要配置https，只需要对上面的配置文件`nginx.conf`的内容作如下修改即可。\n\n```bash\nevents {\n    worker_connections  1024;\n}\n\nhttp {\n    include       mime.types;\n    default_type  application/octet-stream;\n    sendfile        on;\n    keepalive_timeout  65;\n\n    client_max_body_size     50m;\n    client_body_buffer_size  10m; \t  \n    client_header_timeout    1m;\n    client_body_timeout      1m;\n\n    gzip on;\n    gzip_min_length  1k;\n    gzip_buffers     4 16k;\n    gzip_comp_level  4;\n    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;\n    gzip_vary on;\n\t\nserver {\n\n        listen  443 ssl;\n        server_name  你的前台域名(如：www.baidu.com);\n\n        ssl on;\n      ssl_certificate ssl证书文件位置; \n\tssl_certificate_key ssl证书文件位置; \n        ssl_session_timeout 5m;\n        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;\n        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;\n        ssl_prefer_server_ciphers on;\n\n       location / {\n            root   /usr/local/vue/blog;\n            index  index.html index.htm;\n            try_files $uri $uri/ /index.html;\n        }\n\t\t\n        location ^~ /api/ {\n            proxy_pass http://你的服务器公网IP:8080/;\n            proxy_set_header   Host             $host;\n            proxy_set_header   X-Real-IP        $remote_addr;\n            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;\n        }\n\n    }\n\nserver {\n\n        listen  443 ssl;\n        server_name 你的后台域名(如admin.baidu.com);\n\n        ssl on;\n       ssl_certificate ssl证书文件位置; \n\t\tssl_certificate_key ssl文件位置; \n        ssl_session_timeout 5m;\n        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;\n        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;\n        ssl_prefer_server_ciphers on;\n\n       location / {\n            root   /usr/local/vue/admin;\n            index  index.html index.htm;\n            try_files $uri $uri/ /index.html;\n        }\n\t\t\n        location ^~ /api/ {\n            proxy_pass http://你的服务器公网IP:8080/;\n            proxy_set_header   Host             $host;\n            proxy_set_header   X-Real-IP        $remote_addr;\n            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;\n        }\n\t\n    }\n\n\n\nserver {\n        listen       80;\n        server_name  前台域名;\n\t\t\n        rewrite ^(.*)$\thttps://$host$1\tpermanent;\n\t\t\n    }\n\t\nserver {\n        listen       80;\n        server_name  后台域名;\n     \n        rewrite ^(.*)$\thttps://$host$1\tpermanent;\n\t\t\n    }\t\n}\n```\n\n### 11.2 重新运行nginx\n\n> 由于开启https需要启用443端口，所以在前面(非https)的基础上，下面的运行命令新增了数据卷挂载的方式并打开了443端口。\n\n```bash\ndocker run --name nginx --restart=always -p 443:443 -p 80:80 -d -v /usr/local/nginx/nginx.conf:/etc/nginx/nginx.conf -v /usr/local/nginx/cert:/etc/nginx/cert -v /usr/local/vue:/usr/local/vue --privileged=true nginx\n```\n"

// 模拟数据
export const allArticle:{data:ArticleInterface[]} = Mock.mock({
    'data|40': [
        {
            "id": '@increment',
            "articleCover": "https://img0.baidu.com/it/u=2123036823,827931345&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1711126800&t=7513e705408c19133d6383c7ca27417b",
            "articleTitle": '@cname(3,5)',
            "articleContent": content,
            "isTop": 0,
            "isFeatured": '@integer(0,1)',
            "isDelete": 0,
            "author": {
                "id": null,
                "email": '2576572147@qq.com',
                "nickname": "wyf",
                "avatar": "https://static.linhaojun.top/aurora/avatar/52a81cd2772167b645569342e81ce312.jpg",
                "intro": '个人说明',
                "website": "https://www.linhaojun.top",
                "isSubscribe": null,
                "isDisable": null,
                "createTime": null,
                "updateTime": null
            },
            "categoryName": '@category',
            "tags": '@tagsList',
            "status": '@integer(1,3)',
            "type": '@integer(1,3)',
            "createTime": 1694627196,
            "updateTime": 1694627196,
        },
    ]
})

//获得专辑文章列表
export const getFeatureArticle = () => {
    const {TOP} = Mock.mock({
        'TOP': getLatestItem(true)[getLatestItem.length - 1]||[],
    })
    const {LIST} = Mock.mock({
        'LIST': getLatestItem(false).slice(-2)
    })
    return {
        Top: TOP,
        Featured: LIST
    }
}

// 按状态获取文章列表
export const getArticleListByStatus = ({status}: {status?:number},remove?:number) => {
    switch (Number(status)) {
        case 0:
            return {code:200,data:allArticle.data.filter(iten => iten.status == 0),message:'ok'}
        case 1:
            return {code:200,data:allArticle.data.filter(iten => iten.status == 1),message:'ok'}
        case 2:
            return {code:200,data:allArticle.data.filter(iten => iten.status == 2),message:'ok'}
    }
    return {code:200,data:allArticle.data.filter(iten => iten.isDelete == remove),message:'ok'}
}

//按标签id获得文章列表
export const getArticleListByTagsId = (obj:{tag:number}) => {
    let arr = allArticle.data.filter(item => {
        let key = item.tags?.findIndex(value => value.id == obj.tag)
        return key != -1;
    })
    return arr
}

// 根据类别名获取文章列表
export const getArticleListByCategory = (parameters:{category:string}) => {
    if (!parameters) {
        let arr = allArticle.data.filter(res => {
            return res.status != 3 && res.isDelete != 1
        })
        return arr
    } else {
        let arr = allArticle.data.filter(item => {
            if (item.status != 3 && item.isDelete != 1) {
                return item.categoryName.toLocaleUpperCase() == parameters.category.toLocaleUpperCase()
            }
        })
        return arr
    }
}

// 按字段更新文章属性
export const updateArticleByField = (obj:string) => {
    const {id,field,value} = <{id: number,field: string,value: any}>JSON.parse(obj)
        // 驼峰处理
        let key = field.replace(/_[a-z]/g, (value) => {
            return value.replace('_','').toUpperCase()
        })
        switch (key) {
            case 'isDelete': deleteArticle([id],value);break;
            case 'removeArticleTag': removeArticleTag(id,value);break;
            case 'tagName': addArticleTags(id,value);break;
            case 'categoryName': updateArticleCategory(id,value);break;
            default:
                let index = allArticle.data.findIndex(value => value.id == id);
                allArticle.data[index][key] = typeof allArticle.data[index][key] == 'object'? value:typeof allArticle.data[index][key] == 'string'?String(value):Number(value)
        }
        if(key == 'isFeatured'||'isTop'){
            store.commit('articleStore/SET_FEATURE_ARTICLE_DATA',getFeatureArticle())
        }
    return {code:200,message:'ok'}
}

// 根据id获取文章
export const ArticleById = ({id}:{id:number|string}): ArticleInterface => {
    let arr: ArticleInterface | undefined = allArticle.data.find((value) => {
        if (value.status != 3) {
            return value.id == id
        }
    })
    return arr ? arr : [] as any;
}

// 添加文章
export const AddArticle = (aritcleData: string) => {
    // 组合
    const obj: ArticleInterface = JSON.parse(aritcleData)
    // 查询是否存在分类
    let arr = category.data.findIndex(item => {
        return item.categoryName.toLocaleLowerCase() == obj.categoryName.toLocaleLowerCase()
    })
    // 不存在则添加
    if (arr == -1) {
        category.data.push({
            id: category.data.length + 1,
            categoryName: obj.categoryName,
            createTime: new Date(),
        })
    }
    // 查询tags是否存在不存在则添加新的tags
    if (obj.tags?.length != 0) {
        obj.tags!.forEach((item: any) => {
            addOrEditTag(JSON.stringify({tagName: item}))
        })
    }

    // 添加
    allArticle.data.push({
        "id": allArticle.data.length + 1,
        "articleCover": "https://static.linhaojun.top/aurora/articles/46a87c196a67850fd03370535fc52166.jpg",
        "articleTitle": obj.articleTitle,
        "articleContent": '',
        "isTop": obj.isTop,
        "isFeatured": obj.isFeatured,
        "isDelete": 0,
        "author": {
            "id": obj.author.id,
            "email": obj.author.email,
            "nickname": obj.author.nickname,
            "avatar": "https://static.linhaojun.top/aurora/avatar/52a81cd2772167b645569342e81ce312.jpg",
            "intro": obj.author.intro,
            "website": obj.author.website,
            "createTime": obj.author.createTime,
            "isDisable": 0,
        },
        "categoryName": obj.categoryName,
        "tags": tags.data.filter((item: { tagName: any; }) => {
            if (obj.tags!.includes(item.tagName)) {
                return item
            }
        }),
        "status": obj.status,
        "createTime": obj.createTime,
    })
    return allArticle;
}

// 更新文章
export const updateArticleInfo = (aritcleData: string) => {
    const articleInfo:ArticleInterface = <ArticleInterface>JSON.parse(aritcleData)
    let index:number = allArticle.data.findIndex(value => value.id == articleInfo.id)
    let tempTagsList: Tagsinterface[] = [];
    let tags:string[] = <ReturnType<()=>any[]>>articleInfo?.tags;
    if (tags.length != 0){
        tags.forEach((item: string) => {
            // 校验是否存在 不存在则添加进列表
            addOrEditTag(JSON.stringify({tagName: item}))
            tempTagsList.push(<Tagsinterface>allArticle.data[index].tags?.find(value => value.tagName == item))
        })
    }
    addOrEditCategory(JSON.stringify({categoryName:articleInfo.categoryName}))
    allArticle.data[index] = articleInfo
    allArticle.data[index].tags = tempTagsList
    return {message:'ok'}
}

// 根据文章id获取文章上下文
export const ArticleContentById = ({id}:{id:number}): string => {
    let index:number = allArticle.data.findIndex(value => value.id == id);
    return allArticle.data[index].articleContent
}

// 按Id删除文章标签
export const deleteArticleTagById = (obj: any) => {
    const {articleid, tagid} = JSON.parse(obj)
    let key = allArticle.data.findIndex(item => {
        return item.id == articleid
    })
    if (key != 0) {
        let allArticles = allArticle.data[key].tags;
        let tagindex = allArticles!.findIndex(item => {
            return item.id == tagid
        })
        allArticle.data[key].tags!.splice(tagindex, 1)
        return allArticle.data[key].tags;
    }
    return false
}

// 获取所有置顶项，对其进行排序，返回时间最新项
const getLatestItem = (type: boolean): ArticleInterface[] => {
    // 获取长度
    let arr = allArticle.data.filter(res => {
        if (res.status !== 3 && res.isDelete !== 1) {
            return type ? res.isTop == 1 && res.isFeatured == 1 : res.isFeatured == 1
        }
    }).sort((a: any, b: any) => {
        return a.createTime - b.createTime
    })
    return arr
}
// 给文章添加标签
const addArticleTags = (id:number, tagName:string) => {
    // 校验是否存在 不存在则添加进列表
    addOrEditTag(JSON.stringify({tagName: tagName}));
    let result: any = null
    allArticle.data.forEach((item, index) => {
        if (item.id == id) {
            // @ts-ignore
            let arr = allArticle.data[index].tags.filter(item => {
                return item.tagName?.toLocaleLowerCase() === tagName.toLocaleLowerCase()
            })
            // 文章是覅存在该标签
            if (arr.length > 0) {
                result = false
            } else {
                // 给文章添加标签
                let key = tags.data.findIndex((item: { tagName: string; }) => {
                    return item.tagName?.toLocaleLowerCase() === tagName.toLocaleLowerCase()
                })
                // @ts-ignore
                allArticle.data[index].tags.push(tags.data[key])
                result = allArticle.data[index].tags
            }
        }
    })
    return result
}

// 更新文章分类
const updateArticleCategory = (id:number,categoryName:string) => {
    // 校验是否存在 不存在则添加进列表
    addOrEditCategory(JSON.stringify({categoryName: categoryName}));
    let result: any = null
    let key = allArticle.data.findIndex(value => value.id == id)
    if (key != -1) {
        // 给文章添加标签
        let categoryKey = category.data.findIndex((item: { categoryName: string; }) => {
            return item.categoryName?.toLocaleLowerCase() === categoryName.toLocaleLowerCase()
        })
        // @ts-ignore
        allArticle.data[key].categoryName = category.data[categoryKey].categoryName
        result = allArticle.data[key].categoryName
    } else {
        return false
    }
    return result
}

//删除文章
const deleteArticle = (ids:number[],value:number = 1) => {
    let result = null;
    try {
        ids.forEach(item => {
            let key = allArticle.data.findIndex(value => value.id == item)
            if (key != -1) {
                allArticle.data[key].status = value == 1 ? 0:1
                allArticle.data[key].isDelete = Number(value)
            }
        })
        result = true
    } catch (e: any) {
        throw new Error(e)
    }
    return result
}

// 删除文章tag
const removeArticleTag =(id:number,tagId:number) =>{
    let index = allArticle.data.findIndex(value=>value.id == id);
    let key = allArticle.data[index].tags?.findIndex(value => value.id == tagId);
    if (key == -1||key == undefined){
        throw new Error('tagid不存在');
    }
    allArticle.data[index].tags!.splice(key,1)
}
