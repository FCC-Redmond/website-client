'use strict';

var app = app || {};

(module => {

  // const _API_URL_ = 'http://localhost:3000';
  const _API_URL_ = 'https://fccredmond.herokuapp.com';

  function Member() { }

  function errorCallback(err) {
    console.error(err);
  }

  Member.fetchAll = () => $.getJSON(_API_URL_ + '/api/v0/members').then(data => console.log(data)).catch(err => console.error(errorCallback(err)));

  Member.fetchMember = (lName) => $.getJSON(_API_URL_ + '/api/v0/members/' + lName).then(data => console.log(data)).catch(err => console.error(errorCallback(err)));

  Member.addMember = (member) => $.post(_API_URL_ + '/api/v0/members/add', member).catch(err => console.error(errorCallback(err)));

  Member.getSkill = (skill) => $.getJSON(_API_URL_ + '/api/v0/members/' + skill).then(data => console.log(data)).catch(err => console.error(errorCallback(err)));

  module.Member = Member;
  
})(app);