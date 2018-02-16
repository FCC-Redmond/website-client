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
      <h2><div name="firstName">${member.firstName}</div><div name="lastName">${member.lastName}</div></h2>
      <ul id="${member._id}">
        <li name="skills">Skills: ${skills}</li>
        <li name="linkedInUrl">LinkedIn URL: ${member.linkedInUrl}</li>
        <li name="gitHubUrl">GitHub URL: ${member.gitHubUrl}</li>
        <li name="profileUrl">Profile URL: ${member.profileUrl}</li>
        <li name="email">Email: ${member.email}</li>
      </ul>
      <button name="delete" value="${member._id}">Delete</button>
      <button name="update" value="${member._id}">Update</button>
      `
    );
  }

  memberView.displayUpdateMember = (id) => {
    let member = {};
    $('#' + id).children('h2,li').each((idx) => {
      console.log($(this).data['name']);
    });
    $('#' + id).empty();
    $('#' + id).append(
      `
      <h2><input type="text" value="${member.firstName}">&nbsp;<input type="text" value="${member.lastName}"></h2>
        <li>Skills:<input type="text" value="${member.skills}"></li>
        <li>LinkedIn URL:<input type="text" value="${member.linkedInUrl}"></li>
        <li>GitHub URL: <input type="text" value="${member.gitHubUrl}"></li>
        <li>Profile URL: <input type="text" value="${member.profileUrl}"></li>
        <li>Email:<input type="text" value="${member.email}"></li>
      </ul>
      <button name="delete" value="${member._id}">Delete</button>
      <button name="update" value="${member._id}">Update</button>
      `
    );
  };
  memberView.displayMultiple = (memberArr) => {
    $("#member-display").empty();
    let member = memberArr.data;
    for (var i = 0; i < member.length; i++) {
      memberView.displayMember(member[i]);
    }
  }

  memberView.init = () => {
    app.Member.fetchAll(data => {
      memberView.displayMultiple(data);
    })
  }

  $("#member-display").on('click', 'button', (event) => {
    let name = event.target.name;
    let id = event.target.value;
    switch (name) {
      case "delete": app.Member.delete(id, (data) => {
        console.log(data);
        memberView.init();
      });
        break;
      case "update": memberView.displayUpdateMember(id); break;
      default: break;
    }
  });

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