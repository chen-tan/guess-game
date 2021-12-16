const Mock = require('mockjs')

const data = Mock.mock({
  'list|100': ['@city']
})

export default data.list;