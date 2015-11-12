function checkForActionsBar() {
  var ul = document.querySelector('.settings_area');

  if (!ul) { return; }
  if ($(ul).find('.points-parent').length) { return; }

  $('<li class="project actions item points-parent"><nav><a class="story-points velocity">0</a></nav></li>').prependTo($('.project.actions'));
}

chrome.extension.sendMessage({}, function() { // jshint ignore:line
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      var points = 0;

      $('body').on('DOMSubtreeModified', function() {
        checkForActionsBar();
      });

      $('body').on('click', '.selector', function() {
        var $this = $(this);
        var $parent = $this.parent();
        var storyPoints = parseInt($parent.find('.meta span').text());

        if (!$this.hasClass('selected') && storyPoints > 0) {
          points += storyPoints;
        } else if (storyPoints > 0) {
          points -= storyPoints;
        }

        $('.story-points').text(points);
      });
    }
  }, 10);
});
