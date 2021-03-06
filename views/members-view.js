'use strict';

var app = app || {};

(module => {

  const opts = {
    lines: 13, // The number of lines to draw
    length: 38, // The length of each line
    width: 17, // The line thickness
    radius: 45, // The radius of the inner circle
    scale: 1, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#OOOOOO', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    opacity: 0.25, // Opacity of the lines
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: 'none', // Box-shadow for the lines
    position: 'absolute' // Element positioning
  };
  const spinner = new Spinner(opts);
  //ajax handlers
  $(document).ajaxStart(function () {
    let target = $("body")[0];
    spinner.spin(target);
  });

  $(document).ajaxStop(function () {
    spinner.stop();
  });
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
      <div id="${member._id}" class="member-info">
        <img class="avatar" src="${member.imageUrl}" alt="amber kim" />
        <div class="member-details">
          <h2><span name="firstName" value=${member.firstName}>${member.firstName}</span>&nbsp;<span name="lastName" value=${member.lastName}>${member.lastName}</span></h2>
          <p class="skills">${skills}</p>
          <ul>
            <li name="profileUrl" value="${member.profileUrl}">
              <a href="${member.profileUrl}">
                <i class="fas fa-user-circle"></i>
              </a>
            </li>
            <li name="portfolio" value="${member.portfolioUrl}">
              <a href="${member.portfolioUrl}">
                <i class="fas fa-book"></i>
              </a>
            </li>
            <li name="gitHubUrl" value="${member.gitHubUrl}">
              <a href="${member.gitHubUrl}">
                <i class="fab fa-github"></i>
              </a>
            </li>
            <li name="linkedInUrl" value="${member.linkedInUrl}">
              <a href="${member.linkedInUrl}">
                <i class="fab fa-linkedin-in"></i>
             </a>
            </li>
          </ul>
          <button name="delete" value="${member._id}">Delete</button>
          <button name="update" value="${member._id}">Edit</button>
          </div>
      </div>
      `
    );
  }

  memberView.displayUpdateMember = (id) => {
    let member = {};
    let test = $(`#${id}`).find('span,li').each((idx, element) => {
      console.log(element.getAttribute('name'));
      member[element.getAttribute('name')] = element.getAttribute('value');
    });
    $(`#${id}`).empty();
    $(`#${id}`).append(
      `
      <div id="${member._id}" class="member-info">
      <img class="avatar" src="${member.imageUrl}" alt="amber kim" />
      <div class="member-details">
        <h2><span name="firstName" value=${member.firstName}>${member.firstName}  </span>&nbsp;<span name="lastName" value=${member.lastName}>${member.lastName}</span></h2>
          <p class="skills">${skills}</p>
        <ul>
          <li name="profileUrl" value="${member.profileUrl}">
            <a href="${member.profileUrl}">
              <i class="fas fa-user-circle"></i>
           </a>
          </li>
          <li name="portfolio" value="${member.portfolioUrl}">
            <a href="${member.portfolioUrl}">
              <i class="fas fa-book"></i>
            </a>
          </li>
          <li name="gitHubUrl" value="${member.gitHubUrl}">
            <a href="${member.gitHubUrl}">
              <i class="fab fa-github"></i>
            </a>
          </li>
          <li name="linkedInUrl" value="${member.linkedInUrl}">
              <a href="${member.linkedInUrl}">
                <i class="fab fa-linkedin-in"></i>
             </a>
            </li>
          </ul>
          <button name="delete" value="${id}">Delete</button>
          <button name="update" value="${id}">Update</button>
          <button name="cancel" value="${id}">Cancel</button>
        </div>
      </div>
      `
    );
  };


  memberView.displayMultiple = (memberArr) => {
    console.log('in view display multiple', memberArr);
    console.log('memberArr length', memberArr.length);
    $("#member-display").empty();
    for (var i = 0; i < memberArr.length; i++) {
      console.log('in view display mult for loop member', memberArr[i]);
      memberView.displayMember(memberArr[i]);
    }
  }

  memberView.init = () => {
    app.Member.fetchAll().then(data => {
      memberView.displayMultiple(data.data);
    }).catch(err => console.log(err));
  }

  $("#add-member").on('click', (event) => {
    $("#new-member-profile").remove();
    $('#lName-input').after(`
    <div id="myModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <span class="close">&times;</span>
          <h2>Create Profile</h2>
        </div>
        <div class="modal-body">
          <form id="new-member-profile" action="">
          <input required name="firstName" placeholder="First Name" type="text">&nbsp;<input required type="text" name="lastName" placeholder="Last Name" ">
          <ul>
            <li name="skills">Skills:<input name="skills" type="text" placeholder="Your skills separated by comma" value=""></li>
            <li name="linkedInUrl">LinkedIn URL:<input name="linkedInUrl" type="url" value=""></li>
            <li name="gitHubUrl">GitHub URL: <input name="gitHubUrl" type="url" value=""></li>
            <li name="profileUrl">Profile URL: <input name="profileUrl" type="text" value=""></li>
            <li name="email">Email:<input required name="email" type="email" value=""></li>
          </ul>
          <button id="add-commit" type="submit" value="submit">Save</button>
        </form>
        </div>
      </div>
    </div>
    `);
    $("#new-member-profile").on("submit", formSubmitListener);
    let modal = $('#myModal')[0];
    modal.style.display = "block";
    $('span.close').on('click', (event) => {
      modal.style.display = "none";
      event.preventDefault();
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  });





  let formSubmitListener = (event) => {
    let newMember = {
      "memberProfile": {}
    };
    $('#new-member-profile').find('input').each((idx, element) => {
      newMember.memberProfile[element.getAttribute('name')] = element.value;
    });
    if ("skills" in newMember.memberProfile) {
      newMember.memberProfile.skills = newMember.memberProfile.skills.split(',');
    }
    app.Member.addMember(newMember).then(response => {
      console.log(response);
      memberView.init();
    }).catch(err => console.log(err));
    $("#new-member-profile").remove();
    let modal = $('#myModal')[0];
    modal.style.display = "none";
    event.preventDefault();
  };

  $("#member-display").on('click', 'button', (event) => {
    let name = event.target.name;
    let id = event.target.value;
    switch (name) {
      case "delete":
        app.Member.delete(id).then((data) => {
          console.log(data);
          memberView.init();
        }).catch(err => {
          console.log(err);
        });
        break;
      case "update":
        if (event.target.textContent == "Edit") {
          event.target.textContent = "Update";
          memberView.displayUpdateMember(id);
        } else if (event.target.textContent == "Update") {
          let member = {
            "memberProfile": {}
          };
          $(`#${id}`).find('input').each((idx, element) => {
            console.log(element.getAttribute('name') + ":" + element.value);
            member.memberProfile[element.getAttribute('name')] = element.value;
          });
          if ("skills" in member.memberProfile) {
            member.memberProfile.skills = member.memberProfile.skills.split(',');
          }
          app.Member.update(member, id.toString()).then(data => {
            console.log(data);
            memberView.init();
          }).catch(err => {
            console.log(err);
          });;

        }
        break;
      case "cancel":
        memberView.init();
        break;
      default:
        break;
    }
  });

  $("#skill-input").change(() => {
    console.log('skill input change');
    let skill = $("#skill-input").val();
    console.log('skill input value', skill);
    if (!skill || skill.length == 0) {
      memberView.init();
      return;
    }
    app.Member.getSkill(skill).then((data) => {
      if (data.success === false) {
        $("#member-display").empty();
        memberView.filterError();
      } else if (data.success === true) {
        console.log('get skill data', data.data);
        memberView.displayMultiple(data.data);
      }
    }).catch(err => console.log(err));
  });

  $("#lName-input").change(() => {
    let lName = $("#lName-input").val();
    if (!lName || lName.length == 0) {
      memberView.init();
      return;
    }
    app.Member.fetchMember(lName).then((data) => {
      if (data.success === false) {
        $("#member-display").empty();
        memberView.filterError();
      } else if (data.success === true) {
        let memberArr = data.data;
        $("#member-display").empty();
        memberView.displayMultiple(memberArr);
      }
    }).catch(err => console.log(err));
  });

  $('#cancel')

  module.memberView = memberView;

})(app);