var posts = [];
var nextStream = 0;
var nextPost = 1;

var doTheThings = () => {
  createComposer();
  loadposts();
  posteventlistener();
  composeEditListener();
  reload();
}

var createComposer = () => {
  var icon = chrome.extension.getURL('icon-40.png');
  var input = `
  <div class="anon_compose">
    <img src=${icon}>
    <div>
      <span class="anon_input" contenteditable="true">What's on your mind?</span>
    </div>
    <p style="display:inline-block;color:lightgrey;margin-top:10px;">This post will be completely anonymous. Speak your mind.</p>
    <button class="anon_submit" id="postButton" type="button">Post</button>
  </div>
  `;
  $('#pagelet_composer').append(input);

  // $('#pagelet_composer a  _s0._44ma.img').attr('src',icon);
  // document.addEventListener('DOMContentLoaded', function() {
  //   var postButton = $('#postButton');
  //   // onClick's logic below:
  //   postButton.addEventListener('click', () => {
  //       console.log('post button pressed');
  //       submitAnonPost();
  //   });
  // });
}

var loadposts = () => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // console.log(JSON.parse(xhr.responseText));
      posts = JSON.parse(xhr.responseText);
      // console.log(posts.posts[0]);
      console.log(posts);
      for(let i = 0; i<posts.posts.length; i++){
        populate(posts.posts[i],'#substream_0');
      }
    }
  }; // Implemented elsewhere.
  xhr.open("GET",'https://gentrydemchak.com/posts', true);
  xhr.send();
}

var populate = (post,targetid) => {
  // console.log(post);
  var icon = chrome.extension.getURL('icon-40.png');
  let text = post.text;
  let time = post.time;
  console.log('appending post');
  $(targetid).append(
    `
    <div class="anon_compose anon_container">
      <img src=${icon}>
      <div>
        <span class="anon_text">${text}</span>
      </div>
      <p style="display:inline-block;color:lightgrey;margin-top:10px;">${time}</p>
    </div>
    `
  )
}

var posteventlistener = () => {
  $(".anon_submit").click( () => {
    var posttext = $('.anon_input').text();
    console.log('sent');
    $.ajax({
      method: "PUT",
      url: "https://gentrydemchak.com/createPost",
      dataType: 'JSON',
      data: { text:posttext }
    })
    .done( ( msg ) => {
        console.log(msg);
        populate(msg,'#substream_0');
        $('.anon_input').text('What\'s on your mind?');
    });
  });
}

var composeEditListener = () => {
  var composing = false;
  $('.anon_input').click( () => {
    var t = $('.anon_input').text();
    if(t == 'What\'s on your mind?'){
      composing = true;
    }
    if(composing){
      $('.anon_input').text('');
    } else {
      $('.anon_input').text('What\'s on your mind?');
    }
  });

}

var reload = () => {
  $('#u_0_3').click( () => {
    window.setTimeout(doTheThings,3000);
  });
}

window.onload = () => {
  doTheThings();
};



var processinput = (form) => {
  alert(form);
}

// var target = $('#u_ps_0_0_13');
// var target = $("div[id~='u_ps_']");
//
// var target = $("div[id~='u_ps_']")
//     .filter(function() {
//         return this.id.match(/\bu_ps_\b/);
//     });
//
// var observer = new MutationObserver( (mutations) => {
//   mutations.forEach( (mutation) => {
//     console.log(mutation.type);
//   });
// });


var observer = new MutationObserver(function(mutations) {
	//collect each new post that the feed loads
	mutations.forEach(function(mutation) {
    var substreams = [];
		var numposts = mutation
      .target
      .childNodes[0]
      .childNodes[1]
      .childNodes[0]
      .childNodes[0]
      .childNodes[1]
      .childNodes[1]
      .childNodes[1]
      .childNodes[0]
      .childNodes[3]
      .childNodes[0]
      .childNodes[3]
      .childNodes[0]
      .childNodes.length

    //log the html of each new post
    for(var i = 0; i<numposts;i++){
      substreams.push(
        mutation
        .target
        .childNodes[0]
        .childNodes[1]
        .childNodes[0]
        .childNodes[0]
        .childNodes[1]
        .childNodes[1]
        .childNodes[1]
        .childNodes[0]
        .childNodes[3]
        .childNodes[0]
        .childNodes[3]
        .childNodes[0]
        .childNodes[i]
      );
    }

    // for(var j = 0; j<substreams.length;j++){
    //   if(j < posts.length){
    //     console.log(substreams[j])
    //     populate(posts[j],substreams[j]);
    //   }
    // }
    // console.log(posts);
    console.log(`next post:${nextPost} and post length:${posts.posts.length}`);
    if(nextPost < posts.posts.length){
      var el = substreams[nextStream];
      var id = $(el).attr('id');
      populate(posts.posts[nextPost],`#${id}`);
      nextPost++
      nextStream++
    }

	});
});

// Notify me of everything!
var observerConfig = {
	attributes: true,
	childList: true,
	characterData: true
};

// Node, config
// In this case we'll listen to all changes to body and child nodes
var targetNode = document.body;
observer.observe(targetNode, observerConfig);

//
// // Node, config
// // In this case we'll listen to all changes to body and child nodes
// var targetNode = document.body;
// observer.observe(targetNode, observerConfig);

// configuration of the observer:
// var config = { attributes: true, childList: true, characterData: true };
//
// // pass in the target node, as well as the observer options
// observer.observe(target, config);
//
// // later, you can stop observing
// observer.disconnect();




var switchbutton = `<button class="switch_submit anon_submit" onclick="switchopsttype()">Anon</button>`
$('#pagelet_composer ._ei_ > div.clearfix').append(switchbutton);

var switched = false;
var switchposttype = () => {
  //hide the original post box
  //show the anon post box
  if(switched !== true){
    $('#pagelet_composer').css('display','none');
    $('#pagelet_composer').append(input);
  }

}
