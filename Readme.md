### pkg配置
```
//方式一 pkg . // 打包后生成的文件通过下面的pkg配置 文件名称就是name
"bin": {
    "www": "./bin/www"  //告诉package.json,我的bin叫www,它可执行的文件路径是bin/www.js
  },
"pkg": {
    "scripts": [
      "build/**/*.js",
      "socket/**/*.js"
    ],
    "assets": [
      "views/**/*",
      "public/**/*"
    ],
    "targets": [
      "node14-linux-arm64"
    ],
    "outputPath": "dist"
  }



//方式二 手写  "pkg1": " pkg -t win ./bin/www --out-path=dist1/"   //只指定了路径 没有指定包名
              "pkg1": "pkg -t win ./bin/www -o=dist1/cache"  //指定在dist文件夹 生成的文件叫cache

```

- script 要打包的js文件
- assets 要打包的静态文件
- targets 打包成的目标文件
  - 第一个 node范围  ((node8), node10, node12, node14, node16 or latest)
  - 第二个 platform  (alpine, linux, linuxstatic, win, macos, (freebsd))
  - 第三个 发行版    (x64, arm64, (armv6, armv7)）

- 打包成的app exe的名称是上面的name

