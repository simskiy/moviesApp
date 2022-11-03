export default class getResource {
  constructor() {
    this.url = new URL('https://api.themoviedb.org')
    this.api_key = '26a5985902ec1ca50921e555b3baaab3'
  }

  async #createGuestSession() {
    let guestUrl = new URL('3/authentication/guest_session/new', this.url)
    guestUrl.searchParams.append('api_key', this.api_key)
    const res = await fetch(guestUrl)
    if (!res.ok) throw new Error(`Error: ${res.status}`)
    const data = await res.json()
    return data.guest_session_id
  }

  #setParams(url, params) {
    const defaultOpt = {
      adult: false,
      api_key: this.api_key,
      // lang: 'en-US',
      page: 1,
    }
    params = { ...defaultOpt, ...params }
    for (let key in params) {
      url.searchParams.set(key, params[key])
    }
  }

  async getGuestId(reset = false) {
    if (localStorage.getItem('guestId') === null || reset) {
      const res = await this.#createGuestSession()
      localStorage.setItem('guestId', res)
    }
    return localStorage.getItem('guestId')
  }

  async getGenres() {
    let genreUrl = new URL('3/genre/movie/list', this.url)
    let res = undefined
    genreUrl.searchParams.append('api_key', this.api_key)
    try {
      res = await fetch(genreUrl)
      if (!res.ok) throw new Error(`Error: ${res.status}`)
    } catch (err) {
      console.log(err)
    }
    const data = await res.json()
    const out = data.genres.reduce((obj, curr) => {
      const id = curr.id
      const name = curr.name
      return { ...obj, ...{ [id]: name } }
    }, {})
    return out
  }

  async getResource(request) {
    let findUrl = new URL('3/search/movie', this.url)
    this.#setParams(findUrl, { query: request })
    const res = await fetch(findUrl)
    if (!res.ok) throw new Error(`Error: ${res.status}`)
    return await res.json()
  }

  async findMovies(request) {
    if (request.trim() === '') return []
    const movies = await this.getResource(request)
    return movies.results
  }

  async nextPage(request) {
    this.opt.page++
    return await this.findMovies(request)
  }
}
