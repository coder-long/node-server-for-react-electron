const fs = require('fs');
const path = require('path');
const _ = require('lodash')

const cfgFile = fs.readFileSync(path.resolve('public/config.json'), { encoding: 'utf-8' });

/*
  不能用 JSON.parse(JSON.stringify(cfgFile))
  原型上面没有对象的方法 hasOwnProperty
*/
const configFile = _.cloneDeep(JSON.parse(cfgFile));


module.exports = {
  getCfg(props) {
    return new Promise((resolve, reject) => {
      if (configFile.hasOwnProperty(props)) {
        resolve(configFile[props])
      } else {
        reject(`The property (${props}) does not exist in the configuration file.`)
      }
    })
  },
  syncGetCfg(props) {
    if (configFile.hasOwnProperty(props)) {
      return configFile[props];
    } else {
      throw `The property (${props}) does not exist in the configuration file.`
    }
  },
  setCfg(key, val) {
    configFile[key] = val;
    fs.writeFileSync(path.resolve('public/config.json'), JSON.stringify(configFile))
  }
}

