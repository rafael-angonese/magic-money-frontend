/* Examples
  const obj = { foo: 'bar', baz: 'tor' };
  const query = { page: 1, limit: 20 };
  toQueryString(obj)    => ?foo=bar&baz=tor
  toQueryString(query)  => ?page=1&limit=20
*/

export interface IQuery {
  [key: string]: number | number[] | string | string[]
}

const toQueryString = (object: IQuery) => {
  let query = '?'
  if (typeof object === 'object') {
    query += Object.keys(object)
      .map((key) => {
        if (Array.isArray(object[key])) {
          const arrayAux = object[key] as Array<string>
          return arrayAux
            .map((item) => {
              return `${key}=${encodeURIComponent(item.toString())}`
            })
            .join('&')
        } else {
          return `${key}=${encodeURIComponent(
            object[key] ? object[key].toString() : '',
          )}`
        }
      })
      .join('&')
  }

  return query
}

export default toQueryString

// alternative when Array to many keys
// const toQueryString = (object: IQuery) => {
//   let query = '?'
//   if (typeof object === 'object') {
//     query += Object.keys(object)
//       .map((key) => {
//         return `${key}=${encodeURIComponent(
//           object[key] ? object[key].toString() : ''
//         )}`
//       })
//       .join('&')
//   }

//   return query
// }
