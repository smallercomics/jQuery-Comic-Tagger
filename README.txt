To use:
* Include jquery and jquery-comictagger.js to your pages.
* Add styles from jquery-comictagger.css, adapt as required.

Initialise by adding something like the following jquery your your comic pages:

<script type="text/javascript">
  $(document).ready(function(){
    $('#comictagger').comicTagger();
  });
</script>

Where #comictagger is an empty div that exists somewhere in the page, ie:

<div id="comictagger"></div>

You can override the various options by passing in a javascript object to the function. The defaults are shown below:

$('#comictagger').comicTagger({
  separator:" | ",            // what to put in between each item
  class_tag:"add_tag",        // class to add to 'Tag this comic'
  class_clearoff:"clear_off", // class to add to 'Clear tag' if disabled - ie there is no bookmark
  class_gotooff:"goto_off",   // class to add to 'Goto tag' if disabled - ie there is no bookmark
  class_clearon:"clear_on",   // class to add to 'Clear tag' if enabled - ie there is a bookmark
  class_gotoon:"goto_on",     // class to add to 'Goto tag' if enabled - ie there is a bookmark
  class_info:"info",          // class to add to 'Info?'
  comic_dir:"/",              // alter this if you run multiple comics in different directories on your site.
  text_tag:"Tag this comic",  // text to display for this 'button'
  text_goto:"Goto tag",       // text to display for this 'button'
  text_clear:"Clear tag",     // text to display for this 'button'
  text_info:"Info?",          // text to display for this 'button'
  text_info_pop:"To remember where you are, select 'Tag this comic', then later select 'Go to tag' to return to where you left off."
});