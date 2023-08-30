*整体设计参考悟空CRM系统（72crm.com）
# 1.UI设计
## 相关界面
## 任务主界面
<img width="1044" alt="任务主界面" src="https://github.com/unsw-cse-comp3900-9900-23T2/capstone-project-9900h11bgogogo/assets/101880156/970d5af2-a642-4b63-9c5a-72ff28db5b2d">

## 任务主界面（筛选功能）
<img width="1038" alt="任务主界面（筛选功能）" src="https://github.com/unsw-cse-comp3900-9900-23T2/capstone-project-9900h11bgogogo/assets/101880156/09dd0abe-3dce-4284-82bd-c567e553ec86">

## 新建任务界面
<img width="921" alt="新建任务界面" src="https://github.com/unsw-cse-comp3900-9900-23T2/capstone-project-9900h11bgogogo/assets/101880156/0c182404-5cfe-42e5-af1f-64f3f61c762b">

## 任务详情界面
<img width="955" alt="任务详情面" src="https://github.com/unsw-cse-comp3900-9900-23T2/capstone-project-9900h11bgogogo/assets/101880156/db1ab7b6-21d6-49b3-be68-c69cbc3e382c">

## 模块首页
![模块首页](assets/16881153493972.jpg)
## 新建任务
![](assets/16881154353041.jpg)
## 任务详情页
![](assets/16881158445065.jpg)

# 2.API接口文档
## 身份验证
API 访问需要在请求头中包含有效的 API 密钥。
`Authorization: Token {API_KEY}`

## 接口列表
### 1.新增任务（POST: /localhost:8000/api/tasks/）
#### 请求示例：
```json
{
  "task_title": "Complete Customer Research Report",
  "task_description": "This task requires completing a customer research report to gain further insights into our target customers and provide strategic and market development directions for the sales team.",
  "priority": "High",
  "start_date": "2023-06-15T09:30:00Z",
  "due_date": "2023-06-20T14:00:00Z",
  "status": "uncompleted",
  "principal": "John Smith",
  "sub_task": [
        {
          "title": "Gather customer demographic data",
          "status": "uncompleted"
        },
        {
          "title": "Analyze customer purchasing behavior",
          "status": "uncompleted"
        },
        {
          "title": "Identify key customer needs and preferences",
          "status": "uncompleted"
        },
        {
          "title": "Summarize research findings",
          "status": "uncompleted"
        },
        {
          "title": "Provide market development recommendations",
          "status": "uncompleted"
        }
    ]
}
```
- status字段传过来写死是uncompleted即可。principal直接前端手动输出。
#### 响应示例：
无响应报文
#### 响应状态码:
· 201: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误
### 2.搜索任务（GET: /localhost:8000/api/tasks/?param1=value1&param2=value2...）

#### 请求示例：
`http://localhost:8000/api/tasks/?task_title=Organize%20Team%20Building%20Event`
- 传参中，如果参数值包含空格，空格需要转成%20。
- 搜索功能可以选择的参数：`task_title`, `principal`, `due_date`, `priority`。
- 通过task_title搜索需要实现模糊查询。
- priority 包含四种：`All`, `Low`, `Medium`, `High`
#### 响应示例：
```json
[
  {
    "task_id": "1",
    "task_title": "Complete Customer Research Report",
    "task_description": "This task requires completing a customer research report to gain further insights into our target customers and provide strategic and market development directions for the sales team.",
    "priority": "High",
    "start_date": "2023-06-15T09:30:00Z",
    "due_date": "2023-06-20T14:00:00Z",
    "status": "uncompleted",
    "principal": "John Smith",
    "sub_task_amount": 4
  },
  {
    "task_id": "2",
    "task_title": "Prepare Sales Presentation",
    "task_description": "This task involves preparing a sales presentation to showcase our products and services to potential clients.",
    "priority": "Medium",
    "start_date": "2023-06-18T10:00:00Z",
    "due_date": "2023-06-22T12:30:00Z",
    "status": "uncompleted",
    "principal": "Jane Doe",
    "sub_task_amount": 3
  },
  {
    "task_id": "3",
    "task_title": "Follow up with Leads",
    "task_description": "This task involves following up with leads generated from the recent marketing campaign to convert them into potential customers.",
    "priority": "High",
    "start_date": "2023-06-21T14:00:00Z",
    "due_date": "2023-06-25T17:00:00Z",
    "status": "uncompleted",
    "principal": "Mike Johnson",
    "sub_task_amount": 2
  }
]
```
- 返回报文不包含sub_task的具体内容，只统计sub_task的数量。具体内容通过点击具体任务后显示。
#### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误
### 3.查看任务详情（GET: /localhost:8000/api/tasks/{task_id}/）
#### 请求示例：
无请求报文
#### 响应示例：
```json
{
    "task_id": "1",
    "task_title": "Complete Customer Research Report",
    "task_description": "This task requires completing a customer research report to gain further insights into our target customers and provide strategic and market development directions for the sales team.",
    "priority": "High",
    "start_date": "2023-06-21T14:00:00Z",
    "due_date": "2023-06-25T17:00:00Z",
    "status": "uncompleted",
    "principal": "Mike Johnson",
    "sub_task": [
        {
          "sub_task_id": "1",
          "title": "Gather customer demographic data",
          "status": "uncompleted"
        },
        {
          "sub_task_id": "2",
          "title": "Analyze customer purchasing behavior",
          "status": "uncompleted"
        },
        {
          "sub_task_id": "3",
          "title": "Identify key customer needs and preferences",
          "status": "uncompleted"
        },
        {
          "sub_task_id": "4",
          "title": "Summarize research findings",
          "status": "uncompleted"
        },
        {
          "sub_task_id": "5",
          "title": "Provide market development recommendations",
          "status": "uncompleted"
        }
    ]
}
```
#### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误
### 4.删除任务（DELETE: /localhost:8000/api/tasks/{task_id}/）
#### 请求示例：
`/localhost:8000/api/task/tasks/33856`
#### 响应示例：
无响应报文
#### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 404: 找不到资源
· 500: 服务器内部错误
### 5.更新任务状态（PUT: /localhost:8000/api/tasks/{task_id}/）
#### 请求示例：
```json
{
    "status": "completed"
}
```
- 任务状态只有uncompleted、completed两种。
#### 响应示例：
无响应报文
#### 响应状态码:
· 201: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误
### 6.更新子任务状态
（PUT: /localhost:8000/api/tasks/sub_tasks/{sub_task_id}/）
```json
{
    "status": "completed"
}
```
- 任务状态只有uncompleted、completed两种。
# 3.数据库表设计

**Task表设计文档:**

表名：Task

| 字段名          | 类型           | 主键  | 外键   | 不可空 | 描述                                |
| --------------- | -------------- | ----- | ------ | ------ | ----------------------------------- |
| task_id         | INT            | 是    |        | 是     | 任务ID                              |
| task_title      | VARCHAR(255)   |       |        | 是     | 任务标题                            |
| task_description| TEXT           |       |        | 是     | 任务描述                            |
| priority        | VARCHAR(50)    |       |        | 是     | 优先级                              |
| start_date      | DATETIME       |       |        | 是     | 开始日期                            |
| due_date        | DATETIME       |       |        | 是     | 截止日期                            |
| status          | VARCHAR(50)    |       |        | 是     | 任务状态                            |
| principal       | VARCHAR(255)   |       |        | 是     | 负责人                              |

**Sub_Task表设计文档:**

表名：Sub_Task

| 字段名          | 类型          | 主键  | 外键  | 不可空 | 描述                                |
| --------------- | ------------- | ----- | ----- | ------ | ----------------------------------- |
| sub_task_id     | INT           | 是    |       | 是     | 子任务ID                            |
| status          | VARCHAR(50)   |       |       | 是     | 子任务状态                          |
| task_id         | INT           |       | Task  | 是     | 所属任务ID，关联Task表的主键        |
