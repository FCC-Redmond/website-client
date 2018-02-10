'use strict';

var app = app || {};

(module => {

  const _API_URL_ = 'http://localhost:3000';
  // const _API_URL_ = 'https://fccredmond.herokuapp.com';

  function Member() { }

  function errorCallback(err) {
    console.error(err);
  }

  Member.fetchAll = () => $.getJSON(_API_URL_ + '/api/v0/members').then(data => console.log(data)).catch(err => console.error(errorCallback(err)));

  Member.fetchMember = (lName) => $.getJSON(_API_URL_ + '/api/v0/members/' + lName).then(data => console.log(data)).catch(err => console.error(errorCallback(err)));

  Member.addMember = (member) => $.ajax(
    {
      "async": true,
      "crossDomain": true,
      "url": _API_URL_ + "/api/v0/members/add",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(member),
      "error": err => console.error(errorCallback(err))
    }
  ).done(function (response) {
    console.log(response);
  })

  Member.getSkill = (skills) => $.getJSON(_API_URL_ + '/api/v0/members?skills=' + encodeURIComponent(skills)).then(data => {
    console.log(data);
  }).catch(err => console.error(errorCallback(err)));

  module.Member = Member;
  
})(app);