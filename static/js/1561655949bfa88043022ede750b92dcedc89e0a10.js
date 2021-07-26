Array.prototype.rnd = function() {
    return this[Math.floor((Math.random() * this.length))];
}


var listUserAccept = [];
var generatorData = {
    username: '',
};
var generatorConsoleData = new Array({
    id: 0,
    text: 'Connecting to OnlyFans server. Sent control packet type is 7 (Outgoing-Call-Request)'
}, {
    id: 1,
    text: 'Validating user \'<strong>{username}</strong>\''
}, {
    id: 2,
    text: 'Generating SHA-256 verification strings: <span class="console-progress" data-goal="100">0</span>%'
}, {
    id: 3,
    text: 'Validating blocks [1-512]: <span class="console-progress" data-goal="512">0</span>'
}, {
    id: 4,
    text: 'Connecting to OnlyFans server. Outgoing call established (call ID 0, peer\'s call ID 19319)'
}, {
    id: 5,
    text: 'Establishing connection: <span class="console-progress" data-goal="100">0</span>%'
}, {
    id: 6,
    text: 'Connection successful on port 31337'
}, {
    id: 7,
    text: 'Creating account: <span class="console-progress" data-goal="100">0</span>%'
}, {
    id: 8,
    text: 'Extracting data: <span class="console-progress" data-goal="100">0</span>%'
}, {
    id: 9,
    text: 'Calculating CRC values'
}, {
    id: 10,
    text: 'Packing data: <span class="console-progress" data-goal="100">0</span>%'
}, {
    id: 11,
    text: 'Injecting script. Sending <span class="console-progress" data-goal="100">0</span>%'
}, {
    id: 12,
    text: 'Checking server response...'
}, {
    id: 13,
    text: 'Upgrading to Premium: <span class="console-progress" data-goal="100">0</span>%'
}, {
    id: 14,
    text: 'Upgrading to Premium: Done'
}, {
    id: 15,
    text: 'Verifying Account: <span class="console-progress" data-goal="88">0</span>%'
});

function generatorConsoleInit() {
    $('#button-generate').click(function() {
        $('#form-error-list').addClass('hidden');
        generatorData.username = $('#generator-form-username').val();
        if (!generatorData.username || generatorData.username.trim() == '') {
            $('#form-error-list').removeClass('hidden');
            return;
        }
        $('#generator-form-username').prop('readonly', true);
        $('#button-generate-container').addClass('hidden');
        $('#generator-console').removeClass('hidden');
        $('html, body').animate({
            scrollTop: $("#generator-console").offset().top - 20
        }, 400);
        generatorConsoleStep(-1);
    });
}

function generatorConsoleStep(id) {
    var spanProgress = $('#generator-console > div:last > .console-progress');
    if (spanProgress.length == 0 || $(spanProgress).data('goal') == $(spanProgress).text()) {
        id = id + 1;
        if (id >= generatorConsoleData.length) {
            setTimeout(generatorDialogShow, 1500);
            return false;
        }
        var html = '<div class="generator-console-row">' + generatorConsoleData[id].text + '</div>';
        if (html.indexOf('') >= 0) {
            html = html.replace('{username}', generatorData.username);
        }
        var e = $('#generator-console')[0];
        $(e).append(html).animate({
            scrollTop: e.scrollHeight
        }, 100);
        setTimeout(generatorConsoleStep, html.indexOf('console-progress') >= 0 ? 0 : 500 + Math.floor(Math.random() * 1500), id);
    } else {
        var curr = parseInt($(spanProgress).text()) + Date.now() % 20;
        var goal = $(spanProgress).data('goal');
        $(spanProgress).text(curr <= goal ? curr : goal);
        setTimeout(generatorConsoleStep, 25 + Date.now() % 100, id);
    }
}

function generatorDialogShow() {
    $('#verify-dialog').removeClass('hidden');
}

function recaptchaClick(offer) {
    
    document.getElementById('recaptcha-checkbox').style.display = 'none';
    document.getElementById('recaptcha-spinfast').style.display = 'block';
    setTimeout(function() {
        document.getElementById('recaptcha-spinlong').style.display = 'block';
        console.log(generatorData.username);

        if (listUserAccept.indexOf(generatorData.username) >= 0) {
            setTimeout(function() {
                document.getElementById('recaptcha-spinlong').style.display = 'none';
                document.getElementById('recaptcha-checkmark').style.display = 'block';

                var html = $('#recaptcha-resolved-text').html();
                html = html.replace('{username}', generatorData.username);
                $('#recaptcha-resolved-text').html(html);

                setTimeout(function() {
                    $('#recaptcha-container').addClass('hidden');
                    $('#username-verified').css({
                        'display': 'table'
                    });
                }, 1000);
            }, 2500);
        } else {
            setTimeout(function() {
                document.getElementById('recaptcha-spinlong').style.display = 'block';
                setTimeout(function() {
                    $('.offers-section').slideDown();
                }, 1500);
            }, 400);
        }
    }, 400);
}

function commentDate(element, offset) {
    var d=new Date();
    d.setDate(d.getDate() - offset);
    var monthname=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
    element.html(d.getDate() + " " + monthname[d.getMonth()] + " " + d.getFullYear());
}

$(document).ready(function() {
    recentActivityLoop();
    recentActivityTimerLoop();
    generatorConsoleInit();

    $('#generator-form-platform').change(function() {
        var html = '';
        switch ($('#generator-form-platform option:selected').val()) {
            case 'android':
                html = '<img src="../bucket.cpabuild.com/uploads/153078131683e5c0a1a85a482f96ae3319467c35de.png" />';
                break;
            case 'ios':
                html = '<img src="../bucket.cpabuild.com/uploads/15594149702b68027dd3fa830d4633873bb4e3d2de.png" />';
                break;
        }
        $('#generator-form-platform-label').html(html);
    });

    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        $("#generator-form-platform").val('ios');
        $('#generator-form-platform').change();
    }
    
    // Last-update
    var d = new Date();
    d.setDate(d.getDate() - 4);
    var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    var monthname = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    $('#last-update').html(weekday[d.getDay()] + ", " + d.getDate() + " " + monthname[d.getMonth()] + " " + d.getFullYear());
    
    // Comments 
    commentDate($('#c1'), 1);
    commentDate($('#c2'), 2);
    commentDate($('#c3'), 2);
    commentDate($('#c4'), 2);
    commentDate($('#c5'), 6);
    commentDate($('#c6'), 7);
    commentDate($('#c7'), 8);
    commentDate($('#c8'), 8);
    commentDate($('#c9'), 8);
    commentDate($('#c10'), 8);
    commentDate($('#c11'), 10);
    commentDate($('#c12'), 10);
    commentDate($('#c13'), 10);
});
