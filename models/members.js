'use strict';

var app = app || {};

(module => {

  const _API_URL_ = 'https://localhost:3000';

  function Member() { }

  function errorCallback(err) {
    console.error(err);
  }

  Member.fetchAll = (callback) => $.getJSON(_API_URL_ + '/api/v0/members/list').then(data => {
    console.log('data ', data);
    callback(data)
  }).catch(errorCallback);

  module.Member = Member;
  
})(app);