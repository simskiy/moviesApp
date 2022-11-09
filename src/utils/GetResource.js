export default class getResource {
  constructor() {
    this.base_url = new URL('https://api.themoviedb.org')
    this.api_key = '26a5985902ec1ca50921e555b3baaab3'
  }

  async #createGuestSession() {
    let guestUrl = new URL('3/authentication/guest_session/new', this.base_url)
    guestUrl.searchParams.append('api_key', this.api_key)
    let res = undefined
    try {
      res = await fetch(guestUrl)
    } catch {
      return false
    }
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

  async setGuestRate(movieId, guestId, value) {
    const url = `3/movie/${movieId}/rating`
    let setGuestRateUrl = new URL(url, this.base_url)
    setGuestRateUrl.searchParams.append('api_key', this.api_key)
    setGuestRateUrl.searchParams.set('guest_session_id', guestId)
    const res = await fetch(setGuestRateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: value }),
    })

    return await res.json()
  }

  async getGuestRateMovies(guestId) {
    let getGuestRateUrl = new URL(`3/guest_session/${guestId}/rated/movies`, this.base_url)
    getGuestRateUrl.searchParams.append('api_key', this.api_key)
    // getGuestRateUrl.searchParams.set('sort_by', 'created_at.asc')
    let res = undefined
    try {
      res = await fetch(getGuestRateUrl)
    } catch {
      return false
    }
    // res = await fetch(getGuestRateUrl)
    const movies = await res.json()
    return movies.results
  }

  async getGuestId(reset = false) {
    if (localStorage.getItem('guestId') === null || reset) {
      const res = await this.#createGuestSession()
      localStorage.setItem('guestId', res)
    }
    return localStorage.getItem('guestId')
  }

  async getGenres() {
    const genreUrl = new URL('3/genre/movie/list', this.base_url)
    let res = undefined
    genreUrl.searchParams.append('api_key', this.api_key)
    try {
      res = await fetch(genreUrl)
      if (!res.ok) throw new Error(`Error: ${res.status}`)
    } catch (err) {
      return false
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
    let findUrl = new URL('3/search/movie', this.base_url)
    this.#setParams(findUrl, { query: request })
    let res = undefined
    try {
      res = await fetch(findUrl)
      // if (!res.ok) throw new Error(`Error: ${res.status}`)
    } catch {
      return false
    }
    return await res.json()
  }

  async findMovies(request) {
    if (request.trim() === '') return []
    const movies = await this.getResource(request)
    return movies.results
  }

  async findMovieById(id) {
    const findUrl = new URL(`3/movie/${id}`, this.base_url)
    findUrl.searchParams.append('api_key', this.api_key)
    const res = await fetch(findUrl)
    return await res.json()
  }

  async nextPage(request) {
    this.opt.page++
    return await this.findMovies(request)
  }
}
