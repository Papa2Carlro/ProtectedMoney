const fs = require('fs')
const rootPath = require('app-root-path').path + '/public/'

const contentScript = `
  const s = s => s * 1000;
  setInterval(() => alert('Тестовый срок закончился, оплатите что бы продолжить пользоваться'), s(4));`

const contentStyle = `
  body {
      position: relative;
  }
  
  body::after {
      content: 'Тестовый срок закончился, оплатите что бы продолжить пользоваться';
  
      position: fixed;
      top: 0;
      left: 0;
  
      width: 100vw;
      height: 100vh;
  
      background: beige;
  
      display: flex;
      align-content: center;
      justify-content: center;
  
      font-size: 60px;
      font-weight: bold;
      line-height: 80px;
  }`

module.exports = (script, style) => {
  const pathScript = rootPath + script
  fs.writeFileSync(pathScript, contentScript, {encoding:'utf8',flag:'w'})

  if (style) {
    const pathStyle = rootPath + style
    fs.writeFileSync(pathStyle, contentStyle, {encoding:'utf8',flag:'w'})
  }
}