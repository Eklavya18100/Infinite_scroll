let posts_container=document.getElementById('posts-container');
let filter=document.getElementById('filter');
let loader=document.getElementById('loader');
let btn=document.getElementById('btn7');
let limit=5;
let page=2;
let arr=[];
async function getData(){
    let res=await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    let data=await res.json();
    uploadData(data);
}
function uploadData(data)
{   page++;
    data.forEach((ele)=>{
        arr.push(ele);
        let post=document.createElement('div');
        post.className='post';
        post.innerHTML=`<div class="number">${ele.id}</div>
        <div class="content7">
            <h1>${ele.title}</h1>
            <p>${ele.body}</p>
        </div>`
        posts_container.appendChild(post);
    })
}
function Filter(){
    arr.forEach(ele=>{
        if(!(ele.title.includes(filter.value)&&ele.body.includes(filter.value))){
            posts_container.children[ele.id-1].style.display ='none';
        }
        else{
            posts_container.children[ele.id-1].style.display ='block';
        }
    })

}
function showLoading(){
    loader.classList.add('show');
    setTimeout(()=>{
        loader.classList.remove('show');
        getData();
    },1000)
}
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
    if (scrollTop + clientHeight >= scrollHeight -5) {
      showLoading();
    }
  });
filter.addEventListener('input',Filter);