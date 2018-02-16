'use strict';

var app = app || {};

(module => {

  const memberView = {};

  memberView.filterError = () => {
    $("#member-display").append(
      `Waiting for valid input`
    );
  }

  memberView.displayMember = (member) => {
    let skills = member.skills.join(' | ');

    $("#member-display").append(
      `
      <h2>${member.firstName} ${member.lastName}</h2>
      <ul>
        <li>Skills: ${skills}</li>
        <li>LinkedIn URL: ${member.linkedInUrl}</li>
        <li>GitHub URL: ${member.gitHubUrl}</li>
        <li>Profile URL: ${member.profileUrl}</li>
        <li>Email: ${member.email}</li>
      </ul>
      `
    );
  }

  memberView.displayMultiple = (memberArr) => {
    $("#member-display").empty();
    let member = memberArr.data;
    for (var i = 0; i < member.length; i ++) {
      memberView.displayMember(member[i]);
    }
  }

  memberView.init = () => {
    app.Member.fetchAll(data => {
      memberView.displayMultiple(data);
    })
  }

  $("#skill-input").change(() => {
    let skill = $("#skill-input").val();
    if (!skill || skill.length == 0) {
      memberView.init();
      return;
    }
    app.Member.getSkill(skill, (data) => {
      if (data.success === false) {
        $("#member-display").empty();
        memberView.filterError();
      } else if (data.success === true) {
        memberView.displayMultiple(data);
      }
    });
  });

  $("#lName-input").change(() => {
    let lName = $("#lName-input").val();
    if (!lName || lName.length == 0) {
      memberView.init();
      return;
    }
    app.Member.fetchMember(lName, (data) => {
      if (data.success === false) {
        $("#member-display").empty();
        memberView.filterError();
      } else if (data.success === true) {
        let member = data.data;
        $("#member-display").empty();
        memberView.displayMember(member);
      }
    });
  });

  module.memberView = memberView;

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