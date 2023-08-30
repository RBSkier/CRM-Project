# 表&字段定义

# 表 & 字段定义

## 数据库表定义

### customer_info

| 字段名 | 类型 | 描述 |
| ------ | ---- | ---- |
| id | 整数 | 客户ID |
| Name | 字符串 | 客户名称 |
| landline | 字符串 | 座机电话 |
| email | 字符串 | 电子邮件 |
| mobile_phone | 字符串 | 手机号码 |
| customer_type | 字符串 | 客户类型 |
| company_details | 字符串 | 公司详情 |
| lead_source | 字符串 | 销售线索来源 |
| address | 字符串 | 地址 |
| customer_industry | 字符串 | 客户所属行业 |
| follow_up_status | 字符串 | 跟进状态 |
| principal | 字符串 | 负责人 |

### follow_up_info

| 字段名 | 类型 | 描述 |
| ------ | ---- | ---- |
| id | 整数 | 跟进记录ID |
| time | 日期时间 | 跟进时间 |
| principal | 字符串 | 负责人 |
| customer | 字符串 | 客户名称 |
| title | 字符串 | 跟进标题 |
| content | 字符串 | 跟进内容 |
| next_time | 日期时间 | 下次跟进时间 |
| customer_id | 整数 | 外键：关联customer_info表中的id字段 |

## 字段值定义

### customer_type
- A: 高级客户 (Premier Customer)
- B: 普通客户 (Regular Customer)
- C: 非优先客户 (Non-Priority Customer)

### lead source
- direct_traffic: 直接访问
- search_engine_optimization: 搜索引擎优化 (SEO)
- social_media: 社交媒体
- email_marketing: 电子邮件营销
- offline_events: 线下活动
- others: 其他来源

### customer industry
- finance: 金融
- service: 服务
- information_technology: 信息技术
- hospitality_and_tourism: 酒店和旅游
- education: 教育
- media_and_entertainment: 媒体和娱乐
- others: 其他行业

### follow_up_status
- existing: 已存在
- proposal: 提案
- negotiation: 协商
- closed-won: 成交
- closed-lost: 成交失败
- others: 其他状态
