var socket = io();
var doTheThings = () => {
  createComposer();
  loadposts();
  $(".anon_submit").click( () => {
  var posttext = $('.anon_input').text();
  console.log('sent');
  var xhr= new XMLHttpRequest();   // new HttpRequest instance
  xhr.open("PUT", "https://gentrydemchak.com/createPost");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send({ text: posttext });
  xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              console.log(xhr.responseText);
    }
  }; // Implemented elsewhere.
  $.ajax({
  method: "PUT",
  url: "https://gentrydemchak.com/createPost",
  dataType: 'JSON',
  data: { text:posttext }
  })
  .done( ( msg ) => {
    console.log( "Data Saved: " + JSON.stringify(msg) );
  });
  });
}

var createComposer = () => {
  var icon = chrome.extension.getURL('icon-40.png');
  var input = `
  <div class="anon_compose">
    <img src=${icon}>
    <div>
      <span onclick="" class="anon_input" contenteditable="true">What's on your mind?</span>
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

// $("body").click( () => {
//     console.log("Hello World");
//     // submitAnonPost()
//     socket.emit('test message', $('anon_input').text());
// });




var loadposts = () => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              console.log(xhr.responseText);
    }
  }; // Implemented elsewhere.
  xhr.open("GET",'https://gentrydemchak.com/posts', true);
  xhr.send();
}


// function callOtherDomain() {
//   if(invocation) {
//     invocation.open('GET', url, true);
//     invocation.onreadystatechange = handler;
//     invocation.send();
//   }
// }


//test ajax request to server for posting new comment.
// function ajax(url, callback, data, x) {
// 	try {
// 		x = new(this.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
// 		x.open(data ? 'POST' : 'GET', url, 1);
// 		x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
// 		x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// 		x.onreadystatechange =  () => {
// 			x.readyState > 3 && callback && callback(x.responseText, x);
// 		};
// 		x.send(data)
// 	} catch (e) {
// 		window.console && console.log(e);
// 	}
// };

// document.addEventListener( () => {
//   var doc = $('body');
//   doc.addEventListener('click', () => {
//     console.log('clicked');
//   });
// })

doTheThings();

// var submitAnonPost = () => {
//   var content = $('.anon_input').text();
//   $.ajax({
//     type: "POST",
//     url: 'https://gentrydemchak.com/portfolio',
//     dataType: 'json',
//     data: {postText: content},
//     success: (response) => {
//       console.log(response);
//     },
//     error: (err) => {
//       console.log(err)
//     }
//   });
// }

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


// var observer = new MutationObserver(function(mutations) {
// 	// For the sake of...observation...let's output the mutation to console to see how this all works
// 	mutations.forEach(function(mutation) {
// 		console.log(mutation.type);
//     console.log(mutation);
// 	});
// });
//
// // Notify me of everything!
// var observerConfig = {
// 	attributes: true,
// 	childList: true,
// 	characterData: true
// };
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

// $('._3u13').
