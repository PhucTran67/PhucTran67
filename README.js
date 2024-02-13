var spidol = new Audio('spidol.mp3');

$(document).ready(function () {
    // process bar
    setTimeout(function () {
        firstQuestion();
        // spidol.play();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }, 600);
});

function init() {
    $('#title').text(CONFIG.title);
    $('#desc').text(CONFIG.desc);
    $('#yes').text(CONFIG.btnYes);
    $('#no').text(CONFIG.btnNo);
}

function firstQuestion() {
    var audioDoaMa = new Audio('makeu.mp3');
    var audioNo = new Audio('no.mp3');

    $('.content').hide();
    Swal.fire({
        title: 'Hello embe👋',
        text: 'Chuẩn bị nhận quà chưaaa',
        imageUrl: 'cuteCat.jpg',
        background: '#fff url("iput-bg.jpg")',
        imageAlt: 'Custom image',
        confirmButtonText: 'Ròi ròi'
    }).then((result) => {
        if (result.value) {
            spidol.play();
            var audio = new Audio('tick.mp3');
            audio.play();
            Swal.fire({
                title: 'Gửi em : ',
                text: 'Valentine cũng tới gòi, năm nay thì có lẽ là 2 đứa phải xa nhau vì dính ngày mùng 5 Tết. Nên là anh mò làm món quà nhảy tặng bé trước nhá, chúc em có một ngày valentine vui vẻ, hạnh phúc. Năm nay là năm đầu tiên chúng ta cùng nhau đón Tết, đón 14/2 nên a mong là đến những năm sau sẽ cùng tiếp tục đón với nhau nhá. Yên tâm, a vẫn ở đây, luôn yêu em luôn như thế vì em chính là gia đình, là hạnh phúc anh. Em luôn là niềm tự hào, luôn là sự hãnh diện và a luôn tự tin khi a kể với mọi người về em. Anh yêu em, yêu em rất nhiềuu ❤️',
                imageUrl: 'baner.png',
                background: '#fff url("iput-bg.png")',
                imageAlt: 'Custom image',
                confirmButtonText: 'Trang kế bên'
            }).then((result) => {
                Swal.fire({
                    title: 'Chúc em một ngày Valentine vui vẻ hạnh phúc nhe. Vào lại sài gòn rồi mình cùng đi chơi nhá. Anh yêu em',
                    confirmButtonColor: '#83d0c9',
                    backdrop: `
                        rgba(0,0,123,0.4)
                        url("giphy2.gif")
                        left top
                        no-repeat
                        `,
                    onClose: () => {
                        window.location = CONFIG.messLink;
                    }
                });
            });
        }
    });
}

// switch button position
function switchButton() {
    var audio = new Audio('duck.mp3');
    audio.play();
    var leftNo = $('#no').css("left");
    var topNO = $('#no').css("top");
    var leftY = $('#yes').css("left");
    var topY = $('#yes').css("top");
    $('#no').css("left", leftY);
    $('#no').css("top", topY);
    $('#yes').css("left", leftNo);
    $('#yes').css("top", topNO);
}

// move random button position
function moveButton() {
    var audio = new Audio('Swish1.mp3');
    audio.play();
    var x = Math.random() * ($(window).width() - $('#no').width()) * 0.9;
    var y = Math.random() * ($(window).height() - $('#no').height()) * 0.9;
    var left = x + 'px';
    var top = y + 'px';
    $('#no').css("left", left);
    $('#no').css("top", top);
}

init();

var n = 0;
$('#no').mousemove(function () {
    if (n < 1)
        switchButton();
    if (n > 1)
        moveButton();
    n++;
});
$('#no').click(() => {
    if (screen.width >= 900)
        switchButton();
});

// generate text in input
function textGenerate() {
    var n = "";
    var text = " " + CONFIG.reply;
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout(textGenerate, 1);
}

// show popup
$('#yes').click(function () {
    var audio = new Audio('tick.mp3');
    audio.play();
    Swal.fire({
        title: CONFIG.question,
        html: true,
        width: 900,
        padding: '3em',
        html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate()  placeholder='Whyyy'>",
        background: '#fff url("iput-bg.jpg")',
        backdrop: `
              rgba(0,0,123,0.4)
              url("giphy2.gif")
              left top
              no-repeat
            `,
        confirmButtonColor: '#fe8a71',
        confirmButtonText: CONFIG.btnReply
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                confirmButtonText: CONFIG.btnAccept,
                background: '#fff url("iput-bg.jpg")',
                title: CONFIG.mess,
                text: CONFIG.messDesc,
                confirmButtonColor: '#83d0c9',
                onClose: () => {
                    window.location = CONFIG.messLink;
                }
            });
        }
    });
});
