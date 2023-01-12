// do something!
const $root = document.querySelector("#root")// rootDOM
const pageSize = 5 // 가져올 아이템 갯수
const API_KEY = "5486c6d87dde412c813cb72122eccc94"
let page = 1


export const articleRendar = async (category = 'all', page=1)=>{
    
    const URL =`https://newsapi.org/v2/top-headlines?country=kr&category=${category === 'all' ? '' : category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`

    try {
        
        const response = await axios.get(URL)
        const articles = response.data.articles

        articles.forEach((article) => {
            
            const { url, urlToImage, title, description} = article // 필요한 정보 1.뉴스 url, 2.urlToImage , 3.제목, 4.내용
            
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
                    ${description}
                    </p>
                </div>
            `
            const $article = document.querySelector('article')
            $article.appendChild($newsItem)
        })
    } catch (error) {
        console.log(error)
    }
    
}



export const newsListLendar = ()=> { // 뉴스 리스트 불러옴
    
    
    const $newsListContainer = document.createElement("div") // newsListContainer 생성
    $newsListContainer.className = "news-list-container" // newsListContainer className 부여
    $root.appendChild($newsListContainer)

    const $article = document.createElement("article") // section을 감싸는 article
    $article.className = "news-list"
    $newsListContainer.appendChild($article)

    articleRendar()

    const scllorObserver =  document.createElement('div')
    scllorObserver.className = 'scroll-observer'
    scllorObserver.innerHTML = `<img src="img/ball-triangle.svg" alt="Loading..." />`
    $newsListContainer.appendChild(scllorObserver)
    observer.observe(document.querySelector('.scroll-observer'))
}



const observer = new IntersectionObserver((entries)=>{
    const currentCategory = document.querySelector('.active')
    const category = currentCategory.id
    
    entries.forEach((entry)=>{
        
        if(entry.intersectionRatio > 0 && window.scrollY !== 0){ // observer에 닿으면 실행
            page ++
            setTimeout(()=>{
                
                articleRendar(category, page) 
            },1000)
        }
        
    })
    
    }) // 스크롤의 위치가 밑바닥이 되면 자동으로 로딩
    









