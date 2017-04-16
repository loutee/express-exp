var update = document.getElementById('update')

update.addEventListener('click', () => {

  // Send PUT request here
  fetch('abilities', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Hero',
      'ability': 'Ability'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })

})
