// FRONT-END (CLIENT) JAVASCRIPT HERE
let ul = null //null reference to ul, need to load the page before manipulating stuff in the DOM, want global scope so all fns can access
const list = null
const submit = async function( event ) { //submit function
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const item = document.querySelector( '#item' ),
        count = document.querySelector( '#count' ),
        cost = document.querySelector( '#cost' ),
        json = { item: item.value, count: count.value, cost: cost.value },
        body = JSON.stringify( json )
  
  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  const arr = await response.json()
  //add onto things here
  //console.log( arr ) //can run json parse here
  loadList(arr)
}

const loadList = function(arr){
  ul.innerHTML = ''
  total = 0
  for (let i of arr){
    if(i.item === ''){
      continue
    }
      const li = document.createElement( 'li' )
      li.className = "listli"
      li.id = "listitem" + i+1 // first list item has an id of 1 and so on
      li.innerText = i.item + " x " + i.count + " = $" + (i.cost * i.count)//this updates
      ul.appendChild( li )
      const delbutton = document.createElement( 'button' )
      delbutton.id = "itembutton" + i+1
      delbutton.className = "itembutton"
      delbutton.innerText = "X"
      //delbutton.onclick = delete(id) how to implement? async with param
      li.appendChild(delbutton)
      total += (i.count * i.cost)
  }
  tdisp = document.getElementById('tdisp')
  tdisp.innerText = 'Total is ' + total
  tdisp.hidden = false
}

window.onload = function() {
  const submitbutton = document.querySelector('.submitbutton')
  submitbutton.onclick = submit
  ul = document.createElement( 'ul')
  ul.id = 'mainlist'
  document.body.appendChild( ul )
}
