

const form = document.querySelector('form');
const input = document.querySelector('input');
const land = document.querySelector('.land');
const neighbours = document.querySelector('.neighbours');


const render = (search) => {
   
    const langString = search.name.official;
    langString.value = '';
    land.innerHTML = `<p>${langString}</p><p class="oren">страны соседи:</p>`;
    neighbours.textContent = '';


    const showlands = (addObj) => {
    const langName = addObj.name.official;
    neighbours.innerHTML += `<li>${langName}</li>
    `};


    const borders = search.borders;
    borders.forEach(item => {
    fetch(`https://restcountries.com/v3.1/alpha/${item}`)
    .then(response => response.json())  
    .then(data => {
    const [addObj] = data;    
    showlands(addObj);
    
})
});
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
   
    if(input.value){
    url = `https://restcountries.com/v3.1/name/${input.value}`
    }
    input.value = '';
    fetch(url)
    .then(response => { 
        if(!response.ok){
            neighbours.textContent = '';  
            land.textContent = '';   
            land.textContent = `неверное название страны`;}
    else{return response.json()};})
    .then(data => {
    const [search] = data;
    render(search);
    });
    })
