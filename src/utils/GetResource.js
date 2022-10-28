export default class getResource {
  constructor() {
    this.url = new URL('https://api.themoviedb.org')
    this.api_key = '26a5985902ec1ca50921e555b3baaab3'
    this.guestId = null
  }

  async createGuestSession() {
    let guestUrl = new URL('3/authentication/guest_session/new', this.url)
    guestUrl.searchParams.append('api_key', this.api_key)
    const res = await fetch(guestUrl)
    if (!res.ok) throw new Error(`Error: ${res.status}`)
    const data = await res.json()
    this.guestId = data.guest_session_id
  }

  async setGuestId() {
    if (localStorage.getItem('guestId') === null) {
      await this.createGuestSession()
      localStorage.setItem('guestId', this.guestId)
    }
  }

  setParams(url, params) {
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

  async getGenres() {
    let genreUrl = new URL('3/genre/movie/list', this.url)
    genreUrl.searchParams.append('api', this.api_key)
    const res = await fetch(genreUrl)
    if (!res.ok) throw new Error(`Error: ${res.status}`)
    return await res.json()
  }

  async getResource(request) {
    let findUrl = new URL('3/search/movie', this.url)
    this.setParams(findUrl, { query: request })
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
