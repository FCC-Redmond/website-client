'use strict';

var app = app || {};

(module => {

  // const _API_URL_ = 'http://localhost:3000';
  const _API_URL_ = 'https://fccredmond.herokuapp.com';

  const Member = {};

  function errorCallback(err) {
    console.log(err);
  }

  Member.fetchAll = () => {
    return new Promise((resolve, reject) => {
      $.ajax({
        "async": true,
        "crossDomain": true,
        "url": _API_URL_ + "/api/v0/members/",
        "method": "GET",
        "headers": {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        "processData": false
      })
      .done(data => resolve(data))
      .fail(err => reject(err));
    });

  }

  Member.fetchMember = (lName) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        "async": true,
        "crossDomain": true,
        "url": _API_URL_ + "/api/v0/members/" + lName.toLowerCase(),
        "method": "GET",
        "headers": {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        "processData": false,
      })
      .done(data => resolve(data))
      .fail(err => reject(err));
    });
  }

  Member.addMember = (member) => {
    return new Promise((resolve, reject) => {
      $.ajax({
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
        "error": err => {
          console.log(errorCallback(err));;
          reject(err);
        }
      }).done(function (response) {
        console.log(JSON.stringify(member));
        resolve(response);
      })
    });
  }

  Member.update = (member, id) => {
    return new Promise((resolve, reject) => {
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
        .done(data => resolve(data))
        .fail(err => reject(err));
    });
  }

  Member.getSkill = (skill) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        "async": true,
        "crossDomain": true,
        "url": _API_URL_ + "/api/v0/members?skills=" + encodeURIComponent(skill),
        "method": "GET",
        "headers": {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        "processData": false,
      })
      .done(data => resolve(data))
      .fail(err => reject(err));
    });
  }

  Member.delete = (id) => {
    return new Promise((resolve, reject) => {
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
        .then(data => resolve(data))
        .catch(err => {
          errorCallback(err);
          reject(err);
        });
    });
  }


  module.Member = Member;

})(app);