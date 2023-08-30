# 公海模块设计
## 1.UI设计
## 需要改动的Customer界面
<img width="1242" alt="Customer界面" src="https://github.com/unsw-cse-comp3900-9900-23T2/capstone-project-9900h11bgogogo/assets/101880156/5c16d1b4-5040-4f76-84cb-651e2bb1361e">

## 公海相关界面设计
<img width="1152" alt="公海主界面" src="https://github.com/unsw-cse-comp3900-9900-23T2/capstone-project-9900h11bgogogo/assets/101880156/1a6a07d2-8a56-4de3-8d62-b80f75cb9138">
<img width="951" alt="公海detail" src="https://github.com/unsw-cse-comp3900-9900-23T2/capstone-project-9900h11bgogogo/assets/101880156/e3d739bc-02f8-48a5-815e-b445e2fae2f7">

## 请注意！！：后端需要改动customer模块搜索的操作逻辑，在搜索之前首先排除掉principle为空的customer，再在剩下的customer里做筛选。
## 前端需要注意如果当前登陆的用户是staff，那么他们点击客户公海里的批量分配按钮和批量删除按钮会提示没有权限。如果是manager则三个按钮都有权限。

## 2. API接口文档
### 1. 移入公海（POST: /localhost:8000/api/publicpool/）
#### 请求示例：
```json
{
  "customer_id": ["13", "15"]
}
```
#### 响应示例：
无响应报文
#### 响应状态码:
· 201: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误

### 2. 公海查询（GET: /localhost:8000/api/publicpool/.....）
#### 请求示例：
`/localhost:8000/api/publicpool/?customer_type=A&lead_source=direct_traffic&customer_industry=information_technology&follow_up_status=negotiation`
- 将参数和参数值直接放入URL中通过GET请求发送即可，不需要传递请求json报文。
- 搜索功能可以选择的参数：`customer_type`, `lead_source`, `customer_industry`, `follow_up_status`。全部条件要加上all选项表示某个条件不做筛选，若用户选择了all则不需要传该参数和参数值。
#### 响应示例：
```json
[
  {
    "id": "1",
    "name": "John Doe",
    "landline": "59190000",
    "email": "johndoe@example.com",
    "mobile_phone": "0404730855",
    "customer_type": "A",
    "company_details": "qantas airways limited",
    "lead_source": "direct_traffic",
    "address": "",
    "customer_industry": "finance",
    "follow_up_status": "proposal"
  },
  {
    "id": "2",
    "name": "Jane Smith",
    "landline": "59220000",
    "email": "janesmith@example.com",
    "mobile_phone": "0404789652",
    "customer_type": "B",
    "company_details": "example company",
    "lead_source": "referral",
    "address": "",
    "customer_industry": "technology",
    "follow_up_status": "negotiation"
  }
]
```
#### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 404: 找不到资源
· 500: 服务器内部错误

### 3. 分配公海客户(PUT: /localhost:8000/api/publicpool/allocation)
将客户表中的principal字段从空改为传入值。
#### 请求示例：
```json
{
  "customer_id": ["13", "15", "18"],
  "principal": "Jane Smith"     //由经理输入分配staff name
}
```
#### 响应示例：
无
#### 响应状态码:
· 201: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误

### 4.领取公海客户（PUT: /localhost:8000/api/publicpool/pickup）
将客户表中的principal字段从空改为token中查到的user_name。
#### 请求示例：
```json
{
  "customer_id": ["13", "15", "18"]
}
```
通过改造旧接口来实现
#### 响应示例：
无
#### 响应状态码:
· 201: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误

### 5.删除公海客户（DELETE: /localhost:8000/api/publicpool/）
manager才有权限删除。
##### 请求示例：
```json
{
  "customer_id": ["13", "15", "18"]
}
```
##### 响应示例：
无响应报文
##### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 404: 找不到资源
· 500: 服务器内部错误

## 3.数据库表设计
沿用customer表
