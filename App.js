// do something!

import { navLendar } from "./components/Nav.js";
import { newsListLendar } from "./components/NewsList.js";

navLendar() // navBar 렌더링

newsListLendar() // newsList 렌더링


const categoryButtons = document.querySelectorAll('.category-item') // 카테고리 버튼의 array

categoryButtons.forEach((button) => {

    button.addEventListener('click', (e) => {
        const prevChooseButton = document.querySelector('.category-item.active')

        if (e.target.className === 'category-item active') return // 현재 선택 된 탭이랑 똑같은 버튼을 누르면 return 해주는 예외처리

        prevChooseButton.classList.remove('active')
        e.target.classList.add('active')

        const category = e.target.id

        newsListLendar(category)

    })
})

const observer = new IntersectionObserver((entries)=>{
    let page = 1
    entries.forEach((entry)=>{
        if(entry.intersectionRatio > 0){
            setTimeout(()=>{
                newsListLendar('',++page) 
            },100)
        }
    })
    
}) // 스크롤의 위치가 밑바닥이 되면 자동으로 로딩
observer.observe(document.querySelector('.scroll-observer'))

// console.log(document.querySelector('.scroll-observer'));
