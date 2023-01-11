// do something!
const page = 1
const pageSize = 5 // pageSize에 5를 지정하면 5개의 뉴스를 취득한다.
const API_KEY = "1e1aa2f76b504b2d9b059a59414a00e6"


const $newsListContainer = document.createElement("div")



export const newsListLendar = () => {
    const $root = document.querySelector("#root")// rootDOM
    $newsListContainer.className = "news-list-container"
    $root.appendChild($newsListContainer)

    articleLendar()
}

export const articleLendar = async (category = 'all') => {

    const dataURL = `https://newsapi.org/v2/top-headlines?country=us&category=${category === "all" ? "" : category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`

    const $article = document.createElement("article")
    $article.className = "news-list"
    $newsListContainer.appendChild($article)
    try {
        const response = await axios.get(dataURL)
        const articles = response.data.articles

        articles.forEach((article) => {
            const { url, urlToImage, title, content } = article // 필요한 정보 1.뉴스 url, 2.urlToImage , 3.제목, 4.내용
            const $newsItem = document.createElement("section")
            $newsItem.className = "news-item"
            $newsItem.innerHTML =
                `
                <div class="thumbnail">
                    <a href=${url} target="_blank" rel="noopener noreferrer">
                    <img
                        src=${urlToImage}
                        alt="thumbnail" />
                    </a>
                </div>
                <div class="contents">
                    <h2>
                    <a href=${url} target="_blank" rel="noopener noreferrer">
                    ${title}
                    </a>
                    </h2>
                    <p>
                    ${content}
                    </p>
                </div>
            `
            $article.appendChild($newsItem)
        })
    } catch (error) {
        console.log(error)
    }
}


// const choiceCategory()