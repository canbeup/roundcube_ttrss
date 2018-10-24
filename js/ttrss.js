var ttrss = {
	loadLastFeeds: function(){
		// if(locStore.get('ttrss.last.feeds')!==null) ttrss.load.feeds(locStore.get('ttrss.last.feeds'));
		// else ttrss.load.folder();
		ttrss.load.folder();
	},
	loadLastHeadlines: function(){
		if(locStore.get('ttrss.last.headlines')!==null) ttrss.load.headlines(locStore.get('ttrss.last.headlines'), locStore.get('ttrss.last.headlines.view_mode'));
	},
	load: {
		folder: function(){
			$('#mailboxlist').load('./?_task=ttrss&_action=getTree');
			locStore.set('ttrss.last.feeds', null);
		},
		feeds: function(id){
			$('#mailboxlist').load('./?_task=ttrss&_action=getFeeds&id=' + id);
			locStore.set('ttrss.last.feeds', id);
		},
		headlines: function(id, view_mode){
			if(view_mode===undefined||view_mode===null) view_mode = '';
			$('#messagelist-content').load('./?_task=ttrss&_action=getHeadlines&id=' + id + '&view_mode=' + view_mode);
			locStore.set('ttrss.last.headlines', id);
			locStore.set('ttrss.last.headlines.view_mode', view_mode);
			$('#mailboxlist .selected').removeClass('selected');
			$('#trsCAT' + id).addClass('selected');
		},
		article: function(id, feed_ids){
			$('#messagelist tbody tr.selected.expended.focused').removeClass('selected expended focused');
			$('#trsHL' + id).addClass('selected expended focused');
			$('#messagecontframe').attr('src', './?_task=ttrss&_action=getArticle&id=' + id);
			$('#trsHL' + id).removeClass('unread');
			$('#messagecontframe').on('load', function(){ ttrss.loadLastFeeds(); });
			locStore.set('trs.last.article.feed_ids', feed_ids);
		}
	},
	article: {
		toggle: {
			read: function(id, mode){
				if(mode===undefined){
					mode = '';
				}else{
					if(mode===null) mode = '';
					else if(mode) mode = '&mode=' + 1;
					else if(!mode) mode = '&mode=' + 0;
					else mode = '&mode=' + mode;
				}
				$('#trsHL' + id).toggleClass('unread');
				$.ajax({ url: './?_task=ttrss&_action=updateArticle&id=' + id + '&field=2' + mode })
				 .done(function(html){ ttrss.loadLastFeeds(); });
			},
			star: function(id, mode){
				if(mode===undefined){
					mode = '';
				}else{
					if(mode===null) mode = '';
					else if(mode) mode = '&mode=' + 1;
					else if(!mode) mode = '&mode=' + 0;
					else mode = '&mode=' + mode;
				}
				$('#trsHL' + id).toggleClass('flagged');
				$('#trsHL' + id + ' .flag #flagicnrcmrowOTE').toggleClass('unflagged');
				$('#trsHL' + id + ' .flag #flagicnrcmrowOTE').toggleClass('flagged');
				$.ajax({ url: './?_task=ttrss&_action=updateArticle&id=' + id + '&field=0' + mode })
				 .done(function(html){ ttrss.loadLastFeeds(); });
			}
		},
		next: function(){
			var id = $('#messagelist-content tr.selected').next('tr').attr('id');
			if(id===undefined) id = $('#messagelist-content tbody tr:first').attr('id');
			id = id.substring(5);
			ttrss.load.article(id, locStore.get('ttrss.last.article.feed_ids'));
		},
		previous: function(){
			var id = $('#messagelist-content tr.selected').prev('tr').attr('id');
			if(id===undefined) id = $('#messagelist-content tr:last').attr('id');
			id = id.substring(5);
			ttrss.load.article(id, locStore.get('ttrss.last.article.feed_ids'));
		}
	}
};

$(function(){
	// $('.header-title.username').html(rcmail.env.ttrss_username);
	ttrss.loadLastFeeds();
	ttrss.loadLastHeadlines();
});