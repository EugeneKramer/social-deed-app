/**
 * Created by EK on 5/18/2016.
 */
$(function(){



    $.get( "/awards", function() {
        })
        .done(function(data) {
            $("#a").append(data.map(function(e,i){
                return createNewBadgeAwardHTML("AB",e)})
            );
            $('.marquee').marquee({
                pauseOnHover: true,
                duration: 20000,
                allowCss3Support: false
            });
            renderToolTips();
        })
        .fail(function() {
            console.log( "error" );
        });
    
    function createBadgeHTML(badges){
        "use strict";
        if(badges == null) return null;

        return $("<span/>").append(badges.map(function(badge, i){
            return $("<img/>").attr({"src":badge.badgeURL,
                "title": createBadgeTooltipHTML(badge.badgeTitle,badge.badgeDescription, badge.badgeURL),
                "height":"25px",
                "width":"25px",
                "data-toggle":"tooltip"});
        }));
    }

    /**
     * Generate the Bootstrap Tooltip HTML for badges.
     * @param badgeTitle Title of the badge
     * @param badgeDescriptions
     * @param badgeURL
     * @returns {*|string|String|jQuery}
     */
    function createBadgeTooltipHTML(badgeTitle, badgeDescription, badgeURL){
        "use strict";
        return $("<div/>").append($("<b/>").text(badgeTitle))
            .append($("<div/>")
                .append($("<img/>").attr({src:badgeURL,
                    height:"64px",
                    width:"64px"})))
            .append($("<div/>").text(badgeDescription)).html();
    }

    function createNewBadgeAwardHTML(name, badge){
        "use strict";
        return $("<li/>").append($("<span/>").text(name + " has been awarded the ")
            .append(createBadgeHTML([badge]) )
            .append($("<span/>").text("("+  badge.badgeTitle + ")! ")));
    }
});
