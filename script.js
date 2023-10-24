let commentData = {
  currentUser: {
    image: "./images/avatars/image-juliusomo.webp",
  },
  comments: [],
};

let sendButton = document.querySelector(".send-cta");
let commentTextArea = document.querySelector(".commentTextArea");
let commentWrapper = document.querySelector(".commentWrapper");

async function loadInitialComments() {
  let result = await fetch("./data.json");
  let data = await result.json();
  data.comments.forEach((comment) => {
    let commentCardHTML =
      "<div class='scoreCounter d-flex align-items-center flex-lg-column flex-md-column me-lg-4 me-md-4'><button class='btn'>+</button><span class='score'>" +
      comment.score +
      "</span><button class='btn'>-</button></div><div class='userInfoWrapper mb-3 mb-sm-3'><div class='userInfo d-flex mb-3'>";
    commentCardHTML +=
      "<span class='userProfileImg d-inline-block me-3 me-sm-3'><img src='" +
      comment.user.image.webp +
      "' alt='' class='img-fluid'></span> <span class='userName me-3 me-sm-3'>" +
      comment.user.username +
      "</span> <span class='commentDate'>" +
      comment.createdAt +
      "</span></div><p class='userComment'>" +
      comment.content +
      "</p></div><button class='btn d-flex align-items-center position-absolute reply-cta'><img src='./images/icon-reply.svg' alt=''>Replay</button>";
    let li = document.createElement("li");
    li.classList =
      "replyCard d-flex p-3 p-sm-3 p-md-4 p-lg-4 rounded w-100 bg-light flex-wrap flex-sm-wrap flex-md-nowrap flex-lg-nowrap mb-3 position-relative";
    li.innerHTML = commentCardHTML;
    li.setAttribute("data-commentId", comment.id);

    commentWrapper.insertBefore(li, commentWrapper.children[0]);
  });
}

loadInitialComments().then(() => {
  let replyButton = document.querySelectorAll(".reply-cta");
  replyButton.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      let anotherreplay = document.querySelector(".replayCard");
      if (anotherreplay) anotherreplay.remove();
      let addCommentCard =
        "<span class='userProfileImg d-inline-block order-2 order-sm-2 order-md-1 mt-3 mt-sm-3 mt-md-0 mt-lg-0'><img src='./images/avatars/image-juliusomo.webp' alt='' class='img-fluid '></span><div class='commentControl mx-0 mx-sm-0 mx-md-3 mx-lg-3 order-1 order-sm-1 order-md-2'><form><div class='form-group'><textarea class='form-control commentTextArea' id='exampleFormControlTextarea1' rows='3' placeholder='Add a comment...'></textarea></div></form></div> <span class='ctaWrapper order-3 order-sm-3 order-md-3 ms-auto mt-3 mt-sm-3 mt-md-0 mt-lg-0'><button class='btn btn-primary w-100 px-3 py-2 send-cta'>Reply</button></span>";
      let div = document.createElement("div");
      div.classList =
        "addCommentCard replayCard d-flex p-3 p-sm-3 p-md-4 p-lg-4 rounded w-100 bg-light flex-wrap flex-sm-wrap mt-3";
      div.innerHTML = addCommentCard;
      commentWrapper.insertBefore(div, commentWrapper.children[index + 1]);
    });
  });
});

sendButton.addEventListener("click", sendHandler);

function sendHandler() {
  if (!commentTextArea.value) throw new Error("Value is empty")
  let li = document.createElement("li");
  li.classList =
    "replyCard d-flex p-3 p-sm-3 p-md-4 p-lg-4 rounded w-100 bg-light flex-wrap flex-sm-wrap flex-md-nowrap flex-lg-nowrap mb-3 position-relative";
  li.innerHTML =
    "<div class='scoreCounter d-flex align-items-center flex-lg-column flex-md-column me-lg-4 me-md-4'><button class='btn'>+</button><span class='score'>12</span><button class='btn'>-</button></div><div class='userInfoWrapper mb-3 mb-sm-3'><div class='userInfo d-flex mb-3'><span class='userProfileImg d-inline-block me-3 me-sm-3'><img src='./images/avatars/image-juliusomo.webp' alt='' class='img-fluid'></span> <span class='userName me-3 me-sm-3'>juliusomo</span> <span class='commentDate'>" +
    Date(Date.now()) +
    "</span></div><p class='userComment'>" +
    commentTextArea.value +
    "</p></div><button class='btn d-flex align-items-center position-absolute reply-cta'><img src='./images/icon-reply.svg' alt=''>Replay</button>";
  commentWrapper.insertBefore(
    li,
    commentWrapper.children[commentWrapper.children.length - 1]
  );
}
