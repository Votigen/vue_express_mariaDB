# 供应链管理系统

#### 介绍
个人express+Vue+Uniapp前后端项目

#### 软件架构
后端:express+node.js
手机端:Uniapp+Uni UI
网页端:Vue+Element UI
数据库:maria

#### 安装教程
1.  在frontend_vue中执行 npm i	
2.  在backend_end中执行 npm i
3.  导入sql文件至maria(数据库),并且命名为scmproject,建议maria端口号为3307,root 密码为123123(也可以更改backend/.env中的数据库密码和端口)
4.  在backend_end中 npm start
5.  在frontend_vue中执行 npm i

#### 使用注意
1.  按照 数据库 > 后端 > 前端 的顺序运行
3.  建议不运行frontend_uniapp,同时运行frontend_vue和frontend_uniapp可能存在端口冲突,因此教程中没有(等待懒狗作者后续更新)
4.  部分功能未完善,可能运行不了