let post_like_btn=$('.post-likes a');

post_like_btn.on('click',function(e){
    // e.preventDefault();
    let this_container=$(this).parent();
    let this_span=$(this_container).children("span");
    let count=$(this_span).html();
    count++;
    $(this_span).html(count);
})