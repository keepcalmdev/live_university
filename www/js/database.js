
function set_data(key, value){
  var storage = window.localStorage;
  storage.setItem(key, value);
}

function get_data(key){
  var storage = window.localStorage;
  return JSON.parse(storage.getItem(key));
}

function get_data_no_json(key){
  var storage = window.localStorage;
  return storage.getItem(key);
}

function getGeralId() {
  return get_data('geral').id
}

function del_data(key){
  var storage = window.localStorage;
  storage.removeItem(key);
}

function reset_data(){
  window.localStorage.clear()
  window.location.href = 'index.html'
}

function reset_data_with_error(message){
  window.localStorage.clear()
  set_data("login_error", message);
  window.location.href = 'index.html'
}