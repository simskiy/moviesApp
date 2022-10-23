const opt = {
  adult: false,
  api_key: '26a5985902ec1ca50921e555b3baaab3',
  lang: 'en-US',
  page: 1,
}

export default class getResource {
  constructor() {
    this.baseUrl = 'https://api.themoviedb.org/3'
    this.searchMovieUrl = `/search/movie?api_key=${opt.api_key}&language=${opt.lang}&include_adult=${opt.adult}&page=${opt.page}`
    this.getConfigUrl = `/configuration?api_key=${opt.api_key}`
  }

  async getResource(request) {
    const res = await fetch(`${this.baseUrl}${this.searchMovieUrl}&query=${request}`)
    if (!res.ok) throw new Error(`Error: ${res.status}`)
    return await res.json()
  }

  async findMovies(request) {
    if (request.trim() === '') return []
    const movies = await this.getResource(request)
    return movies.results
  }

  async getImageUrl() {
    const config = await this.getConfig()
    const result = await config.json()
    return result
  }

  async nextPage(request) {
    this.opt.page++
    return await this.findMovies(request)
  }
}

/*
{
    "images": {
        "base_url": "http://image.tmdb.org/t/p/",
        "secure_base_url": "https://image.tmdb.org/t/p/",
        "backdrop_sizes": [
            "w300",
            "w780",
            "w1280",
            "original"
        ],
        "logo_sizes": [
            "w45",
            "w92",
            "w154",
            "w185",
            "w300",
            "w500",
            "original"
        ],
        "poster_sizes": [
            "w92",
            "w154",
            "w185",
            "w342",
            "w500",
            "w780",
            "original"
        ],
        "profile_sizes": [
            "w45",
            "w185",
            "h632",
            "original"
        ],
        "still_sizes": [
            "w92",
            "w185",
            "w300",
            "original"
        ]
    },
    "change_keys": [
        "adult",
        "air_date",
        "also_known_as",
        "alternative_titles",
        "biography",
        "birthday",
        "budget",
        "cast",
        "certifications",
        "character_names",
        "created_by",
        "crew",
        "deathday",
        "episode",
        "episode_number",
        "episode_run_time",
        "freebase_id",
        "freebase_mid",
        "general",
        "genres",
        "guest_stars",
        "homepage",
        "images",
        "imdb_id",
        "languages",
        "name",
        "network",
        "origin_country",
        "original_name",
        "original_title",
        "overview",
        "parts",
        "place_of_birth",
        "plot_keywords",
        "production_code",
        "production_companies",
        "production_countries",
        "releases",
        "revenue",
        "runtime",
        "season",
        "season_number",
        "season_regular",
        "spoken_languages",
        "status",
        "tagline",
        "title",
        "translations",
        "tvdb_id",
        "tvrage_id",
        "type",
        "video",
        "videos"
    ]
}
*/
