
    // mute unmute btn
 
    
         $('#volume-slider').on('input', function (e) {
            var range = e.target.value;
            if( range > 1) {
                $('#volume-icon').addClass('mute') 
            } else {
                $('#volume-icon').removeClass('mute')
            }
        });


    $('#muting').on('click',function(){
        $('#muting').toggleClass('mute');
    })
    $('#muting__red').on('click',function(){
        $('#muting__red').toggleClass('mute')
    })
    
    $('#muting__redmic').on('click',function(){
        $('#muting__redmic').toggleClass('mute')
    })
    $('#mic_mute').on('click',function(){
        $('#mic_mute').toggleClass('mute');
    })
    $('#camera').on('click',function(){
        $('#camera').toggleClass('mute');
    })


    // Options for the toast
    var options = {
        text: "Happy!",
        duration: 1000,
        callback: function(){
            this.remove();
            Toastify.reposition();
        }
    };
    document.getElementById('new-toast').addEventListener('click', function () {
        Toastify({
            text: "confirm time!",
            duration: 1000
        }).showToast();
    });
