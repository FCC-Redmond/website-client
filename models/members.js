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
        "Cache-Control": "no-cache",
        "Postman-Token": "6f60d89d-34a3-8bfb-c2a6-9b4a9c6990b9"
      },
      "processData": false,
      "data": JSON.stringify(member)
    }
  ).done(function (response) {
    console.log(response);
  });

  Member.getSkill = (skill) => $.getJSON(_API_URL_ + '/api/v0/members/' + skill).then(data => console.log(data)).catch(err => console.error(errorCallback(err)));

  module.Member = Member;
  
})(app);