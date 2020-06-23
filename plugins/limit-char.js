import Vue from 'vue'

const limitedChar = (value, limit, separator = '...') => {
  return limitChar(value, limit, separator);
};

function limitChar(str, limit, separator) {
  if(str.length > limit)
    str = str.substring(0,limit) + " " + separator
  return str
}

Vue.filter('limitChar', limitedChar)
