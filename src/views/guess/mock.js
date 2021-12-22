const Mock = require('mockjs')

const data = Mock.mock({
  'list|100': ['@cword(2,3)']
})

export default data.list;