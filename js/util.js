/**
 * util.js Created by Taro on 2014/10/24.
 */

function assert(value, desc) {
  var li = document.createElement('li');
  li.className = value ? 'pass' : 'fail';
  li.appendChild(document.createTextNode(desc));
  document.getElementById('results').appendChild(li);
}