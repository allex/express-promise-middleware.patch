# express-promise-middleware.patch

Patch express fallback lost with promisify middleware.

## Usage

npm i --save express-promise-middleware.patch

```js

// this will eventually ensure express handing middleware with async/await fallback
require('express-promise-middleware.patch')

router.get('/user/:id', async (req, res, next) => {
  const user = await getUserFromDb({ id: req.params.id })
  res.json(user);
})
```

## License

[MIT](LICENSE)

