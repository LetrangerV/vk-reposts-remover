// ==UserScript==
// @name remove_reposts
// @description Removes all reposts from links specified in config from vk news feed. 
// @author vstrokan
// @license MIT
// @version 1.0
// @include http://vk.com/feed
// ==/UserScript==

//Works in Firefox 43.0 (with installed GreaseMonkey plugin), Chromium 47.0.2526.73
(function() {
	//you can add your own links to vk pages you don't want to see reposts from.
	//TODO make an browser extension with web ui for editing link list. 
	var hrefs = [
		"http://vk.com/tnull",
		"http://vk.com/tproger"		
	];

	var target = document.querySelector('div#feed_rows');
	 
	var observer = new MutationObserver(function(mutations) {
	    mutations.forEach(function(mutation) {
	    	var addedPost = mutation.addedNodes[0];
	    	if (addedPost) {
	    		hideAllReposts(addedPost);
	    	} 
	    });    
	});
	 
	var config = { attributes: true, childList: true, characterData: true }
	observer.observe(target, config);

	function hideAllReposts(post) {
		var posts = document.querySelectorAll("div.feed_row");
		for (var idx = 0; idx < posts.length; idx++) {
			var post = posts[idx];
			var repostLink = post.querySelector("a.published_by");
			if (repostLink && isRequireToHidePostContainingLink(repostLink.href)) {
				post.style.display = "none";
			}
		}	
	} 

	function isRequireToHidePostContainingLink(href) {
		return hrefs.indexOf(href) != -1;
	}

	hideAllReposts();     
})();