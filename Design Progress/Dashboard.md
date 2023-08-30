# Dashboard模块
## 界面样式
![dashboard主界面](https://github.com/unsw-cse-comp3900-9900-23T2/capstone-project-9900h11bgogogo/assets/101880156/6425ed70-e5be-45ea-ab70-7eeceab085b5)
<img width="627" alt="业绩指标" src="https://github.com/unsw-cse-comp3900-9900-23T2/capstone-project-9900h11bgogogo/assets/101880156/51dc9e5b-3d13-42a7-9081-59e4ecee9c01">
<img width="565" alt="销售额表格" src="https://github.com/unsw-cse-comp3900-9900-23T2/capstone-project-9900h11bgogogo/assets/101880156/eb7698e1-520e-44e4-b19d-a0e884dde66e">
## （Customer Statistics 见手绘的主界面）
<img width="557" alt="遗忘提醒" src="https://github.com/unsw-cse-comp3900-9900-23T2/capstone-project-9900h11bgogogo/assets/101880156/d6608c75-ca2e-4481-b996-a9941253f947">



## 接口列表
### 请注意：后端设计时，除了业绩指标完成度之外的模块，做一个stuff和manager的区分，manager可以看到所有的数据统计，stuff只能看到自己的。
### 1.销售简报（Get: /localhost:8000/api/dashboard/salesbrief/）
#### 请求示例：
无
#### 响应示例：
```json
{
    "customer_amount": "100",
    "new_followup_amount": "32",
    "sales_amount": "10000"
}
```
#### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误

### 2.设置业绩指标（Post: /localhost:8000/api/dashboard/kpi/）
#### 请求示例：
```json
{
    "kpi": "100000"
}
```
#### 响应示例：
无
#### 响应状态码:
· 201: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误

### 3.查看业绩指标完成率（Get: /localhost:8000/api/dashboard/kpi/）
#### 请求示例：
无
#### 响应示例：
```json
{
    "kpi": "100000",
    "sales_amount": "72300",
    "percentage": "72.3%"
}
```
#### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误

### 4.销售额按月显示（Get: /localhost:8000/api/dashboard/amount/）
#### 请求示例：
无
#### 响应示例：
```json
{
  "sales": [
    {
      "month": "January",
      "revenue": 50000
    },
    {
      "month": "February",
      "revenue": 60000
    },
    {
      "month": "March",
      "revenue": 75000
    },
    ...
  ]
}
```
#### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误

### 5.客户遗忘提醒（Get: /localhost:8000/api/dashboard/reminder/）
#### 请求示例：
无
#### 响应示例：
```json
{
  "statistics": {
    "last_7_days": 25,
    "last_15_days": 50,
    "last_30_days": 80,
    "last_3_months": 120,
    "last_6_months": 200,
    "over_6_months": 50
  }
}
```
#### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误
### 6.客户分类统计
#### 6.1 根据跟进状态统计
`Get: /localhost:8000/api/dashboard/customerstatistic/follow_up_status`
##### 响应示例：
```json
{
  "statistics": {
    "existing": 25,
    "proposal": 50,
    "negotiation": 80,
    "closed-won": 120,
    "closed-lost": 200
  }
}
```
#### 6.2 根据客户类型统计
`Get: /localhost:8000/api/dashboard/customerstatistic/customer_type`
##### 响应示例：
```json
{
  "statistics": {
    "premier_customer": "25",
    "regular_customer": "50",
    "non_priority_customer": "80",
  }
}
```
#### 6.3 根据客户来源统计
`Get: /localhost:8000/api/dashboard/customerstatistic/lead_source`
##### 响应示例：
```json
{
  "statistics": {
    "direct_traffic": "25",
    "search_engine_optimization": "50",
    "social_media": "80",
    "email_marketing": "0",
    "offline_events": "0",
    "others": "0"
  }
}
```
#### 6.4 根据客户行业统计
`Get: /localhost:8000/api/dashboard/customerstatistic/customer_industry`
##### 响应示例：
```json
{
  "statistics": {
    "finance": "25",
    "service": "50",
    "information_technology": "80",
    "hospitality_and_tourism": "0",
    "education": "0",
    "media_and_entertainment": "0",
    "others": ""
  }
}
```

## 表设计
Table Name: 业绩指标表

| Column Name | Data Type | Description                                   |
|-------------|-----------|-----------------------------------------------|
| id          | INT       | Unique identifier for the performance record   |
| year        | INT       | Year for which the KPI is measured             |
| kpi         | VARCHAR   | Key Performance Indicator                      |
| user_id     | INT       | Foreign key referencing the Employee table     |
