/**
 * Created by EK on 5/18/2016.
 */

var $ = require('cheerio');

//TODO - validate that it's an image url, valid title
function badgeStruct(badgeURL,badgeTitle, badgeDescription){
    "use strict";
    this.badgeURL = badgeURL;
    this.badgeTitle = badgeTitle;
    this.badgeDescription = badgeDescription;
}

function createBadgeHTML(badges){
    "use strict";
    if(badges == null) return null;

    return $("<span/>").append(badges.map(function(badge, i){
        console.log("D");
        console.log(badge);
        return $("<img/>").attr({"src":badge.badgeURL,
            "title": createBadgeTooltipHTML(badge.badgeTitle,badge.badgeDescription, badge.badgeURL),
            "height":"25px",
            "width":"25px",
            "data-toggle":"tooltip"})
    })).toString();
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
        .append($("<div/>").text(badgeDescription)).toString();
}
function createNewBadgeAwardHTML(name, badge){
    "use strict";
    return $("<span/>").html(name + " has been awarded the " + createBadgeHTML([badge]) +"("+  badge.badgeTitle + ")!");
}

module.exports.badgeStruct = badgeStruct;
module.exports.createBadgeHTML = createBadgeHTML;
module.exports.createBadgeTooltipHTML = createBadgeTooltipHTML;
module.exports.createNewBadgeAwardHTML = createNewBadgeAwardHTML;