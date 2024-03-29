$('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 1000);
            return false;
        }
    }
});

var windowWidth = $(window).width();
if (windowWidth <= 799) {
    $(".right").each(function(i, el) {
        $(el).insertBefore($(el).prev());
    });
}

$(window).resize(function() {
    windowWidth = $(window).width();
    if (windowWidth <= 799) {
        $(".right").each(function(i, el) {
            $(el).insertBefore($(el).prev());
        });
    } else if (windowWidth >= 800) {
        $(".right").each(function(i, el) {
            $(el).insertAfter($(el).next());
        });
    }
});

$(window).on('scroll', function() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 500) {
        $("nav").css({
            "position": "fixed",
            "background-color": "rgba(34, 173, 129, 0.9)",
            "padding": "20px",
            "-webkit-box-shadow": "0px 10px 13px -4px rgba(0,0,0,0.6)",
            "-moz-box-shadow": "0px 10px 13px -4px rgba(0,0,0,0.6)",
            "box-shadow": "0px 10px 13px -4px rgba(0,0,0,0.6)"
        });
        $("#nav-container").addClass("scroll-hover");
    } else {
        $("nav").css({
            "position": "absolute",
            "background-color": "transparent",
            "padding": "40px 20px 40px 40px",
            "-webkit-box-shadow": "none",
            "-moz-box-shadow": "none",
            "box-shadow": "none"
        });
        $("#nav-container").removeClass("scroll-hover");
    }
});

$("#hamburger-button").click(function() {
    $("#full-nav").fadeIn("fast", function() {});
});

$("#close-button").click(function() {
    $("#full-nav").fadeOut("fast", function() {});
});

$("#full-nav-container ul li").click(function() {
    $("#full-nav").fadeOut("fast", function() {});
});

$(function() {
    var form = $("#contact-form");
    var formConfirmation = $("#form-confirmation");
    var overlay = $("#overlay");
    var messageOpen = false;
    var doneTimeout = null;
    var failTimeout = null;
    
    $(document).click(function() {
        if (messageOpen === true) {
            $(formConfirmation).css({
                "display": "none"
            });
            $(overlay).css({
                "display": "none"
            });
            doneTimeout != null ? clearTimeout(doneTimeout) : clearTimeout(failTimeout);
        }
    });
    
    $(form).submit(function(event) {
        event.preventDefault();
        var formData = $(form).serialize();
        $.ajax({
            type: "POST",
            url: $(form).attr("action"),
            data: formData
        }).done(function(response) {
            $(formConfirmation).html("<p>Success!</p><p>" + response + "</p>");
            $(overlay).css({
                "display": "block"
            });
            $(formConfirmation).css({
                "display": "block"
            });
            $(formConfirmation).removeClass("error");
            $(formConfirmation).addClass("success");
            $(formConfirmation).css({
                "top": "50%",
                "transform": "translate(-50%, -50%)"
            });
            messageOpen = true;
            $("#name").val("");
            $("#email").val("");
            $("#message").val("");
            doneTimeout = setTimeout(function() {
                $(formConfirmation).css({
                    "display": "none"
                });
                $(overlay).css({
                    "display": "none"
                });
            }, 5000);
        }).fail(function(data) {
            if (data.responseText !== "") {
                $(formConfirmation).html("<p>Error!</p><p>" + data.responseText + "</p>");
            } else {
                $(formConfirmation).html("<p>Error!</p><p>Uh-oh! Looks like an error occured. Please try again!</p>");
            }
            $(overlay).css({
                "display": "block"
            });
            $(formConfirmation).css({
                "display": "block"
            });
            $(formConfirmation).removeClass("success");
            $(formConfirmation).addClass("error");
            $(formConfirmation).css({
                "top": "50%",
                "transform": "translate(-50%, -50%)"
            });
            messageOpen = true;
            failTimeout = setTimeout(function() {
                $(formConfirmation).css({
                    "display": "none"
                });
                $(overlay).css({
                    "display": "none"
                });
            }, 5000);
        });
    })
});