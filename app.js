const search= document.getElementById('search');
const matchList = document.getElementById('match-list');

//search the states.json and filter it 
const searchStates= async searchText =>{

    const res = await fetch('in.json');
    const states=  await res.json();

    console.log(states);


//get matches to current text input

let matches = states.filter(state=>{
    const regex = new RegExp(`^${searchText}`,'gi');
    return state.city.match(regex) || state.admin_name.match(regex);
});




console.log(matches);

if (searchText.length ===0){
    matches= [];
    matchList.innerHTML='';
}
console.log(matches);


outputHtml(matches);

};


//show results in html

const outputHtml= matches =>{

    if( matches.length > 0){
        const html  = matches.map(match =>
            `
            <div class="card card-body mb-1">
            <h4> ${match.city} (${match.admin_name} , <span class=" text-primary">
            ${match.capital}</span>)</h4>
            <small> Lat: ${match.lat}/ Long: ${match.lng}</small>
            </div>
            `
            ).join('');

            matchList.innerHTML= html ;

            console.log(html);
    }
};

search.addEventListener('input', ()=> searchStates(search.value));

