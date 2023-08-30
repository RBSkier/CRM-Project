# 产品模块设计
## UI设计
![91688992377](assets/91688992377.jpg)
![101688992377](assets/101688992377.jpg)
![product_detial](assets/product_detial.png)



## 2.API接口文档
### 身份验证
API 访问需要在请求头中包含有效的 API 密钥。
`Authorization: Token {API_KEY}`

### 接口列表
#### 1.新增产品（POST: /localhost:8000/api/products）
##### 请求示例：
```json
{
  "product_name": "iPhone 13",
  "product_category": "Electronic",
  "product_description": "The latest flagship smartphone from Apple",
  "product_unit": "piece",
  "product_code": "ABC123",
  "price": 6999.00,
  "cost": 4500.00,
  "inventory_quantity": 500,
  "sales_region": "华东地区"
}
```
##### 响应示例：
无响应报文
##### 响应状态码:
· 201: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误
#### 2.搜索产品(GET: /products/?product_name=iPhone13%20pro&product_category=Electronic&price_min=5000&price_max=8000)

##### 请求示例：
`/products/?product_category=Electronic&price_min=5000&price_max=8000`空格要转成%20

##### 响应示例：
```json
{
  "products": [
    {
      "product_id": 1001,
      "product_name": "iPhone 13",
      "product_category": "Electronic",
      "product_description": "The latest flagship smartphone from Apple",
      "product_unit": "piece",
      "product_code": "ABC123",
      "price": 6999.00,
      "cost": 4500.00,
      "inventory_quantity": 500,
      "sales_region": "华东地区"
    },
    {
      "product_id": 1002,
      "product_name": "Samsung Galaxy S21",
      "product_category": "Electronic",
      "product_description": "High-end Android smartphone from Samsung",
      "product_unit": "piece",
      "product_code": "DEF456",
      "price": 6999.00,
      "cost": 5000.00,
      "inventory_quantity": 300,
      "sales_region": "华南地区"
    }
  ]
}
```
#### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误
#### 3.查看产品详情（GET: /localhost:8000/api/products/{product_id}）
##### 请求示例：
无请求报文
##### 响应示例：
```json
{
  "product_id": 1001,
  "product_name": "iPhone 13",
  "product_category": "Electronic",
  "product_description": "The latest flagship smartphone from Apple",
  "product_unit": "piece",
  "product_code": "ABC123",
  "price": 6999.00,
  "cost": 4500.00,
  "inventory_quantity": 500,
  "sales_region": "华东地区",
  "sales_records": [
    {
      "sales_id": 1,
      "sales_person": "staff",
      "sales_quantity": 10,
      "sales_date": "2023-07-20T14:00:00Z"
    },
    {
      "sales_id": 2,
      "sales_person": "staff",
      "sales_quantity": 5,
      "sales_date": "2023-07-20T14:00:00Z"
    }
  ]
}
```
##### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误
#### 4.删除产品（DELETE: /localhost:8000/api/products/{product_id}）
##### 请求示例：
`/localhost:8000/api/products/33856`
##### 响应示例：
无响应报文
##### 响应状态码:
· 200: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 404: 找不到资源
· 500: 服务器内部错误
#### 5.新增销售流水（POST: /localhost:8000/api/products/{product_id}）
##### 请求示例：
```json
{
  "sales_person": "staff",
  "sales_quantity": 8,
  "sales_date": "2023-07-20T14:00:00Z"
}
```
##### 响应示例：
无响应报文
##### 响应状态码:
· 201: 请求成功
· 400: 请求参数有误
· 401: 未经授权访问
· 500: 服务器内部错误

## 3.数据库表设计

---
**Table Name**: Products
| Field Name       | Data Type                | Field Description                     | Example               |
|------------------|--------------------------|---------------------------------------|-----------------------|
| product_id       | INT(11) PRIMARY KEY AUTO_INCREMENT | Unique identifier for each product     | 1001                  |
| product_name     | VARCHAR(255)             | Name of the product                    | "iPhone 13"           |
| product_category | VARCHAR(255)             | Category or type of the product        | "Electronic", "Apparel", "Home Applications", "Furniture" |
| product_description | TEXT                  | Description of the product              | "The latest flagship smartphone from Apple"  |
| product_unit     | VARCHAR(50)              | Unit of measurement for the product     | "piece", "unit", "set" |
| product_code     | VARCHAR(50)              | Unique code assigned to the product     | "ABC123"              |
| price            | DECIMAL(10,2)            | Sale price of each product             | 6999.00               |
| cost             | DECIMAL(10,2)            | Production cost of each product        | 4500.00               |
| inventory_quantity | INT(11)                | Current quantity of the product in the warehouse | 500          |
| sales_region     | VARCHAR(255)             | Region or market where the product is sold | "华东地区"            |

**Table Name**: SalesRecords

| Field Name       | Data Type                | Field Description                     | Example               |
|------------------|--------------------------|---------------------------------------|-----------------------|
| sales_id         | INT(11) PRIMARY KEY AUTO_INCREMENT | Unique identifier for each sales record | 1                     |
| sales_person     | VARCHAR(255)             | Name of the salesperson                | 1            |
| product_code     | VARCHAR(50)              | Unique code assigned to the product     | "ABC123"              |
| sales_quantity   | INT(11)                  | Quantity of the product sold           | 10                    |
| sales_date       | DATE                     | Date of the sale                       | "2023-07-20T14:00:00Z"          |

该表设计了一个产品销售流水记录表，包括以下字段：销售记录编号（sales_id），销售人员（sales_person），产品编号（product_code），销售数量（sales_quantity），销售日期（sales_date）。

          

