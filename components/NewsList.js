// do something!
const root = document.querySelector('#root') // rootDOM
// pageSize에 5를 지정하면 5개의 뉴스를 취득한다.
const page = 1
const pageSize = 5
const API_KEY = '1e1aa2f76b504b2d9b059a59414a00e6'
const dataURL = `https://newsapi.org/v2/top-headlines?country=us&category=business&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`

const getData = async () =>{
   
    
    try{
       const response = await axios.get(dataURL) 
       const articles = response.data.articles
      
       articles.forEach((article)=>{
         const {url, urlToImage, title, content} = article// 필요한 정보 1.뉴스 url, 2.urlToImage , 3.제목, 4.내용
       console.log(content);

       const $newsListContainer = document.createElement('div')
    $newsListContainer.className = 'news-list-container'
    $newsListContainer.innerHTML = 
    `<article class="news-list">
        <section class="news-item">
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
        </section>
    </article>
    `
//   <div class="scroll-observer">
//     <img src="img/ball-triangle.svg" alt="Loading..." />
//   </div>

    
    root.appendChild($newsListContainer)
        })
    }catch(error){
        console.log(error);
    }
   
}

export const newsListLendar = ()=>{
    
}

const init = () => {
    getData()
}

  init()
