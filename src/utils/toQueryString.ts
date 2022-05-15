
/* Examples
  const obj = { foo: 'bar', baz: 'tor' };
  toQueryString(obj)    => ?foo=bar&baz=tor

  const query = { page: 1, limit: 20 };
  toQueryString(query)  => ?page=1&limit=20
*/

const toQueryString = (object: any) => {
  let query = "?";

  query += new URLSearchParams(object);

  return query;
};

export default toQueryString;
