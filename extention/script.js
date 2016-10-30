var icon = chrome.extension.getURL('icon-40.png');
var input = `
<div class="anon_compose">
  <img src=${icon}>
  <div>
    <span onclick="" class="anon_input" contenteditable="true">What's on your mind?</span>
  </div>
  <p style="display:inline-block;color:lightgrey;margin-top:10px;">This post will be completely anonymous. Speak your mind.</p>
  <button class="anon_submit" type="button" onclick="submitanonpost(this)">Post</button>
</div>
`;

var submitanonpost = (content) => {
  console.log(content)
}

$('#pagelet_composer').append(input);

var processinput = (form) => {
  alert(form);
}

$('#pagelet_composer a  _s0._44ma.img').attr('src',icon);



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
