'use strict';

var app = app || {};

(module => {

  // const _API_URL_ = 'http://localhost:3000';
  const _API_URL_ = 'https://fccredmond.herokuapp.com';

  const Member = {};

  function errorCallback(err) {
    console.error(err);
  }

  Member.fetchAll = (callback) => $.getJSON(_API_URL_ + '/api/v0/members').then(data => {
    callback(data);
  }).catch(err => console.error(errorCallback(err)));

  Member.fetchMember = (lName, callback) => $.getJSON(_API_URL_ + '/api/v0/members/' + lName.toLowerCase()).then(data => {
    callback(data);
  }).catch(err => console.error(errorCallback(err)));

  Member.addMember = (member) => $.ajax({
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
  }).done(function (response) {
    console.log(response);
  })

  Member.update = (member, id) =>
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": _API_URL_ + "/api/v0/members/" + id,
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(member)
    })
    .done(data => console.log(data))
    .fail(err => errorCallback(err));

  Member.getSkill = (skill, callback) => $.getJSON(_API_URL_ + '/api/v0/members?skills=' + encodeURIComponent(skill)).then(
    data => {
      callback(data);
      console.log(data);
    }
  ).catch(err => console.error(errorCallback(err)));

  Member.delete = (id, callback) =>
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": _API_URL_ + "/api/v0/members/" + id,
      "method": "DELETE",
      "headers": {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
      "processData": false,
    })
    .then(data => callback(data))
    .catch(errorCallback);

  module.Member = Member;

})(app);


// let user = {
// 	"memberProfile": {
// 		"skills":["JavaScript", "NodeJs", "ExpressJs", "MongoDB"],
// 		"lastName": "Kim",
// 		"firstName": "Amber",
// 		"linkedInUrl": "",
// 		"gitHubUrl": "",
// 		"profileUrl": "",
// 		"email": "ambergkim10@gmail.com",
// 		"_id": 5a839ea26aa4f73c79d8386e
// 	}
// }