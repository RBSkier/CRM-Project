# 排行榜模块
## 1. UI设计
![8771690622839_ pic_hd](https://github.com/unsw-cse-comp3900-9900-23T2/capstone-project-9900h11bgogogo/assets/101880156/e72765c3-7637-4afc-b319-97ec9b8adb1b)

## 2. 接口设计
### 1. 排行榜（GET: /localhost:8000/api/rank/）
- 只需要显示前10名
- 积分计算规则（要用弹窗的形式显示在页面上）：每一个客户2积分、每跟进1次1积分、每销售1w得5积分。
#### 请求示例：
无
#### 响应示例：
```json
[
  {
    "rank": 1,
    "name": "John",
    "score": 1000
  },
  {
    "rank": 2,
    "name": "Alice",
    "score": 950
  },
  {
    "rank": 3,
    "name": "Bob",
    "score": 900
  },
  {
    "rank": 4,
    "name": "Emma",
    "score": 850
  },
  {
    "rank": 5,
    "name": "Tom",
    "score": 800
  },
  {
    "rank": 6,
    "name": "Lucy",
    "score": 750
  },
  {
    "rank": 7,
    "name": "David",
    "score": 700
  },
  {
    "rank": 8,
    "name": "Sophia",
    "score": 650
  },
  {
    "rank": 9,
    "name": "Jack",
    "score": 600
  },
  {
    "rank": 10,
    "name": "Olivia",
    "score": 550
  }
]
```
#### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 404: 找不到资源
· 500: 服务器内部错误

### 2. 个人排名查询（GET: /localhost:8000/api/rank/myself/）
#### 响应示例：
```json
{
    "user_name": "",
    "rank": "",
    "score": ""
}
```
#### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 404: 找不到资源
· 500: 服务器内部错误
