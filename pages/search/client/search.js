Template.search.events({
  'click #searchbutton'(elt, instance) {
    const search = $('#search').val();
    var searchurl = "https://www.google.com/search?q="+search;
    window.open(searchurl);
  }
})
