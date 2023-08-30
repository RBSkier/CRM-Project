# API接口文档
## 身份验证
API 访问需要在请求头中包含有效的 API 密钥。
`Authorization: Token {API_KEY}`

## 接口列表
### 1.新增客户（POST: /localhost:8000/api/customer/customers/）
#### 请求示例：
```json
{
  "name": "John Doe",
  "landline": "59190000",
  "email": "johndoe@example.com",
  "mobile_phone": "0404730855",
  "customer_type": "A",
  "company_details": "quntas airways limited",
  "lead_source": "direct_traffic",
  "address": "",
  "customer_industry": "finance",
  "follow_up_status": "proposal",
  "principal": "Jane Smith"
}
```
#### 响应示例：
无响应报文
#### 响应状态码:
· 201: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误
*该接口不返回json，只返回响应状态码提示处理结果
### 2.搜索客户（GET: /localhost:8000/api/customer/customers/?param1=value1&param2=value2...）

#### 请求示例：
`/localhost:8000/api/customer/customers/?customer_type=A&lead_source=direct_traffic&customer_industry=information_technology&follow_up_status=negotiation`
- 将参数和参数值直接放入URL中通过GET请求发送即可，不需要传递请求json报文。
- 搜索功能可以选择的参数：`customer_type`, `lead_source`, `customer_industry`, `follow_up_status`。全部条件要加上all选项表示某个条件不做筛选，若用户选择了all则不需要传该参数和参数值。
#### 响应示例：
无响应报文
#### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误
*该接口不返回json，只返回响应状态码提示处理结果
### 3.查看客户详情（GET: /localhost:8000/api/customer/detail/{customer_id}/）
#### 请求示例：
不需要请求体，将客户对应的customer_id放在url中进行请求。
#### 响应示例：
```json
{
  "id": "12345",
  "name": "John Doe",
  "landline": "59190000",
  "email": "johndoe@example.com",
  "mobile_phone": "0404730855",
  "customer_type": "A",
  "company_details": "quntas airways limited",
  "lead_source": "direct_traffic",
  "address": "123 Main Street, City",
  "customer_industry": "finance",
  "follow_up_status": "proposal",
  "principal": "Jane Smith"
  "follow_up_log": [
    {
      "title": "Initial Contact"
      "time": "2023-06-15T09:30:00Z",
      "principal": "Jane Smith",
      "customer": "John Doe",
      "content": "Called the customer to greet and introduce company products.",
      "next_time": "2023-06-20T14:00:00Z"
    },
    {
      "title": "Product Demo"
      "time": "2023-06-20T14:00:00Z",
      "principal": "Jane Smith",
      "customer": "John Doe",
      "content": "Scheduled an online product demonstration meeting to showcase product features and advantages to the customer.",
      "next_time": "2023-06-25T11:00:00Z"
    },
    {
      "title": "Quote Response"
      "time": "2023-06-25T11:00:00Z",
      "principal": "Jane Smith",
      "customer": "John Doe",
      "content": "Replied to the customer's quote request, providing detailed pricing and commercial terms.",
      "next_time": " 2023-06-28T15:30:00Z"
    }
  ]
}
```
#### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误
### 4.删除用户（DELETE: /localhost:8000/api/customer/customers/{customer_id}/）
#### 请求示例：
`/localhost:8000/api/customer/customers/33856`
#### 响应示例：
无响应报文
#### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 404: 找不到资源
· 500: 服务器内部错误
### 5.更新客户（PUT: /localhost:8000/api/customer/customers/update/）
#### 请求示例：
```json
{
  "id": "12345",
  "name": "John Doe",
  "landline": "59190000",
  "email": "johndoe@example.com",
  "mobile_phone": "0404730855",
  "customer_type": "A",
  "company_details": "quntas airways limited",
  "lead_source": "direct_traffic",
  "address": "",
  "customer_industry": "finance",
  "follow_up_status": "proposal",
  "principal": "Jane Smith"
}
```
#### 响应示例：
无响应报文
#### 响应状态码:
· 201: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误
### 6.写跟进日志（POST: /localhost:8000/api/customer/follow-up/）
```json
{
    "title": "Initial Contact"
    "time": "2023-06-15T09:30:00Z",
    "principal": "Jane Smith",
    "customer": "John Doe",
    "content": "Called the customer to greet and introduce company products.",
    "next_time": "2023-06-20T14:00:00Z",
    "customer_id": "23413"
}
```
#### 响应示例：
无响应报文
#### 响应状态码:
· 201: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误


