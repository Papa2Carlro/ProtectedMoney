const site = 'http://localhost:3000/api/script/client/'
const name = 'asicfox'

const url = site + name

const data = fetch(url)
  .then((response) => {
    return response.json()
  })
  .catch(err => {
    alert('Error script')
  })

data.then(data => {
  if (data.ok) {
    const script = document.createElement('script')
    script.src = data.script

    document.body.insertBefore(script, null)

    if (data.style) {
      const style = document.createElement('link')
      style.href = data.style
      style.rel = 'stylesheet'
      style.type = 'text/css'

      document.head.insertBefore(style, null)
    }
  }
})
