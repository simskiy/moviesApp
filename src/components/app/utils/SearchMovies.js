export default class SearchMovies {
  async getResource(request) {
    const opt = {
      adult: false,
      api_key: '26a5985902ec1ca50921e555b3baaab3',
      lang: 'en-US',
    }
    const baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${opt.api_key}&language=${opt.lang}&include_adult=${opt.adult}`

    const res = await fetch(`${baseUrl}&query=${request}`)
    if (!res.ok) throw new Error(`Error: ${res.status}`)
    const body = await res.json()
    return body
  }

  findMovies(request) {
    return this.getResource(request).then((movies) => movies.results)
  }
}
