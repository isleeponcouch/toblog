import QueryBuilder from './query-builder'
import Loki from '@lokidb/loki'
import LokiFullTextSearch from '@lokidb/full-text-search'

LokiFullTextSearch.register()

const dirs = ["/","/articles","/articles/_wip"]
  let db, items

const $content = function () {
  let options = {}
  const paths = []
  Array.from(arguments).forEach((argument) => {
    if (typeof argument === 'string') {
      paths.push(argument)
    } else if (typeof argument === 'object') {
      options = argument
    }
  })

  const { text = false, deep = false } = options

  const path = `/${paths.join('/').replace(/\/+/g, '/')}`
  const isDir = !path || !!dirs.find(dir => dir === path)
  // Look for dir or path
  const query = isDir ? { dir: deep ? { $regex: new RegExp(`^${path}`) } : path } : { path }
  // Postprocess to get only first result (findOne)
  const postprocess = isDir ? [] : [data => data[0]]

  return new QueryBuilder({
    query: items.chain().find(query, !isDir),
    path,
    postprocess,
    text
  }, {
    fullTextSearchFields: ["title","description","slug","text"]
  })
}

export default (database) => {
  db = new Loki('content.db')
  db.loadJSONObject(database)
  items = db.getCollection('items')

  return $content
}
