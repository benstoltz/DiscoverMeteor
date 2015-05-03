Template.postsList.onRendered(function () {
    this.find('.wrapper')._uihooks = {

        insertElements: function (node, next) {
            $(node)
                .hide()
                .insertBefore(next)
                .fadeIn();
        },

        moveElement: function (node, next) {
            // Do nothing atm
            var $node = $(node), $next = $(next);
            var oldTop = $node.offset().top;
            var height = $node.outerHeight(true);

            // Find all the elements between next and node
            var $inBetween = $next.nextUntil(node);
            if ($inBetween.length === 0)
                $inBetween = $node.nextUntil(next);

            // Now put node in place
            $node.insertBefore(next);

            // Measure new top
            var newTop = $node.offset().top;

            // Move node *back* to where it was before
            $node
                .removeClass('animate')
                .css('top', oldTop - newTop);

            // Push every other element down (or up) to put them back
            $inBetween
                .removeClass('animate')
                .css('top', oldTop < newTop ? height : -1 * height);

            // Force a redraw
            $node.offset();

            // Reset everything to 0, animated
            $node.addClass('animate').css('top', 0);
            $inBetween.addClass('animate').css('top', 0);
        },

        removeElements: function (node) {
            $(node).fadeOut(function () {
                $(this).remove();
            });
        }
    }
});