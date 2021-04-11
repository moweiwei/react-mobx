/* eslint-disable consistent-return */
const cookie = (n, v, p) => {
  if (typeof v !== 'undefined') {
    window.document.cookie = `${[n, '=', encodeURIComponent(v)].join(
      ''
    )};path=${p || '/'}`
  } else {
    v = window.document.cookie.match(new RegExp(`(?:\\s|^)${n}\\=([^;]*)`))
    return v ? decodeURIComponent(v[1]) : null
  }
}

export default cookie
