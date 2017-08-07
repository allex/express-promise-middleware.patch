/**
 *
 * Patch for fix fallback in express middlewares using promise API (async/await)
 *
 * Authors:
 *  Allex Wang <allex.wxn@gmail.com> (http://iallex.com/)
 */

'use strict'

var Layer = require('express/lib/router/layer')
var isPromise = function (o) { return !!o && typeof o.then === 'function' && !!o.catch }

// fix fallback in express middlewares using async/await
Layer.prototype.handle_request = function handle (req, res, next) {
  var fn = this.handle

  if (fn.length > 3) {
    // not a standard request handler
    return next()
  }

  try {
    var r = fn(req, res, next)
    if (isPromise(r)) {
      Promise.resolve(r).catch(next)
    }
  } catch (err) {
    next(err)
  }
}
