$(document).ready(function() {
    if (!window.console) window.console = {};
    if (!window.console.log) window.console.log = function() {};

    //form's validation
    $("#position_form").on("keypress", function(e) {
        if (e.keyCode == 13) {
            var form = $(this);
            var form_dict = form.formToDict();
            if (
                form_dict.position_x >= 0 && form_dict.position_x <= 100 &&
                form_dict.position_y >= 0 && form_dict.position_y <= 100
            ) {
                newPlace(form_dict);
                form.find("input[type=text]").val("").select();
            } else {
                alert("Incorrect coordinates")
            }

            return false;
        }
    });

    $(document).click(function(e) {
        position_x = e.pageX * 100 / $(window).width();
        position_y = e.pageY * 100 / $(window).height();
        newPlace({"position_y":position_y, "position_x":position_x});
        return false;
    });

});

//create json
jQuery.fn.formToDict = function() {
    var fields = this.serializeArray();
    var json = {}
    for (var i = 0; i < fields.length; i++) {
        json[fields[i].name] = fields[i].value;
    }
    if (json.next) delete json.next;
    return json;
};

// change position of icon
function newPlace(position_dict) {
    max_y = ($(window).width() - $("#icon_id").width()) * 100 / $(window).width();
    max_x = ($(window).height() - $("#icon_id").height()) * 100 / $(window).height();

    if (position_dict["position_y"] > max_x) {
        position_dict["position_y"] = max_x;
    }

    if (position_dict["position_x"] > max_y) {
        position_dict["position_x"] = max_y;
    }

}





