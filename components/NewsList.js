// do something!
const $root = document.querySelector("#root")// rootDOM


const pageSize = 5 // 가져올 아이템 갯수
const API_KEY = "1e1aa2f76b504b2d9b059a59414a00e6"




export const newsListLendar = async (category = 'all', page =1) => { // 뉴스 리스트 불러옴
    
    if (!!document.querySelector('.news-list-container')) { // 카테코리 버튼을 눌러서 category의 값이 새로 들어왔을 때 이미 만들어진 news-list-container가 있다면 지운다
        document.querySelector('.news-list-container').remove()
    }
    const $newsListContainer = document.createElement("div") // newsListContainer 생성

    $newsListContainer.className = "news-list-container" // newsListContainer className 부여
    $root.appendChild($newsListContainer)

    const $article = document.createElement("article") // section을 감싸는 article
    $article.className = "news-list"
    $newsListContainer.appendChild($article)

    const scllorObserver = document.createElement('div')
    scllorObserver.className = 'scroll-observer'
    scllorObserver.innerHTML = `<img src="img/ball-triangle.svg" alt="Loading..." />`
    $newsListContainer.appendChild(scllorObserver)

    const URL = `https://newsapi.org/v2/top-headlines?country=us&category=${category === "all" ? "" : category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}` // 뉴스 api 주소

    try {
        const response = await axios.get(URL)
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

