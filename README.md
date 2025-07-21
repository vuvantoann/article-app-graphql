## Phần truy vấn bộ lọc cho dự án

```graphql
query (
  $sortKey: String
  $sortValue: String
  $currentPage: Int
  $limitItem: Int
  $filterKey: String
  $filterValue: String
  $keyword: String
) {
  getListArticle(
    sortKey: $sortKey
    sortValue: $sortValue
    currentPage: $currentPage
    limitItem: $limitItem
    filterKey: $filterKey
    filterValue: $filterValue
    keyword: $keyword
  ) {
    id
    title
    avatar
    description
    category {
      id
    }
  }
}
```

## Phần đăng ký người dùng

```graphql
mutation ($fullName: String, $email: String, $password: String) {
  registerUser(
    user: { fullName: $fullName, email: $email, password: $password }
  ) {
    id
    fullName
    email
    token
    code
    message
  }
}
```
