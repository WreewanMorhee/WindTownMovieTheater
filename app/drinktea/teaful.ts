
var t = require('react')
let e = []
function r(r = {}, n) {
  let o = (function () {
      let t = {}
      return {
        s(e, r) {
          'function' == typeof r && (t[e] || (t[e] = new Set()), t[e].add(r))
        },
        n(e, r) {
          Object.keys(t).forEach(n => {
            ;(e.startsWith(n) || n.startsWith(e)) && t[n].forEach(t => t(r))
          })
        },
        u(e, r) {
          'function' == typeof r &&
            (t[e].delete(r), 0 === t[e].size && delete t[e])
        },
      }
    })(),
    u = r
  o.s('.', n)
  let i = {
      t: [],
      o(e, r, n, o) {
        let u = u => {
          let i = r.length - 1,
            f = r.length
              ? r.reduce((t, e, r) => (r === i ? t[e](n, o) : t[e]), l)
              : l(n, o)
          /*#__PURE__*/ return t.createElement(e, { ...u, store: f })
        }
        return (u.displayName = `withStore(${e.displayName || e.name})`), u
      },
      get(t, e) {
        return this.t.push(e), 'prototype' === e ? {} : new Proxy(t, i)
      },
      apply(e, r, n) {
        let o = e(),
          i = n[0],
          f = n[1],
          l = this.t.slice()
        if (((this.t = []), 3 === o)) return this.o(n[0], l, n[1], n[2])
        if (!l.length) {
          let t = a()
          return 2 === o && p('.', f), 4 === o ? t(i) : [u, t]
        }
        let c = l.join('.'),
          s = a(c),
          y = h(c),
          b =
            void 0 !== i &&
            !(function (t) {
              return h(t, (t = {}, e, r, n) =>
                r === n.length - 1 ? e in t : t[e]
              )
            })(l)
        return 4 === o
          ? s(i)
          : (b && ((y = i), (u = S(u, l, y))),
            2 === o &&
              (t.useEffect(() => {
                b && s(y)
              }, []),
              p('.' + c, f)),
            [y, s])
      },
    },
    f = t => new Proxy(() => t, i),
    l = f(2),
    c = f(1),
    s = f(3),
    y = f(4)
  function p(e, r) {
    let n = t.useReducer(() => [])[1]
    t.useEffect(
      () => (
        o.s(e, n),
        o.s('.', r),
        () => {
          o.u(e, n), o.u('.', r)
        }
      ),
      [e]
    )
  }
  function a(t = '') {
    let e = Array.isArray(t) ? t : t.split('.')
    return r => {
      let n = u,
        i = r
      'function' == typeof r && (i = r(h(t))),
        (u = t ? S(u, e, i) : i),
        o.n('.' + t, { prevStore: n, store: u })
    }
  }
  function h(t, e = (t, e) => t?.[e]) {
    return t ? (Array.isArray(t) ? t : t.split('.')).reduce(e, u) : u
  }
  function S(t, [e, ...r], n) {
    let o = Array.isArray(t) ? [...t] : { ...t }
    return (o[e] = r.length ? S(t[e], r, n) : n), o
  }
  return e.reduce(
    (t, e) => {
      let r = e(t, o)
      return 'object' == typeof r ? { ...t, ...r } : t
    },
    { useStore: l, getStore: c, withStore: s, setStore: y }
  )
}
;(r.ext = t => e.push(t)), (module.exports = r)

