

( function () {
	window.addEventListener( 'tizenhwkey', function( ev ) {
		if( ev.keyName === "back" ) {
			
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			
		}
	} );
} () );



var inc = 0;  // Incremento del contador.
var h = 0;
var rh;
var rm; // minuts

var tm; // total minuts
var z; // // Add a '0' to numbers lower than 10.


function r(el, deg) {
    el.setAttribute('transform', 'rotate('+ deg +' 50 50)')
  }







(function(){
   var progressBar,
      progressBarWidget,
      resultDiv,
      value,
      direction,
      rotaryDetentHandler = function(e) {
         // Get rotary direction
         direction = e.detail.direction;

         if (direction === "CW") {
            // Right direction
        	if(inc < 1440) {
        		inc = inc + 1; // Incrementar el contador.
        	}else{ 
        		inc = 0;
        	}
        	
        	 
        	 
            if (parseInt(progressBarWidget.value(), 10) < 100) {
               value = parseInt(progressBarWidget.value(), 10) + 10;
            } else {
               value = 100;
               
        	 value++;
            }
            
            
         } else if (direction === "CCW") {
            // Left direction

         	if (inc > 0) {
         		inc = inc - 1; // Decrementa el contador.
         	}
         	 
            if (parseInt(progressBarWidget.value(), 10) > 0) {
               value = parseInt(progressBarWidget.value(), 10) - 10;
            } else {
               value = 0;
            }
            
        	 value--;
         }
         
         // Añadir '+' si el incremento es positivo.
         //if (inc>0) var s = "+"; else var s = "";
         //document.getElementById("vInc").innerHTML=s+inc; // Actualizar el visualizador de incremento.
      	 //document.getElementById("vInc").innerHTML=rh+":"+z+rm+"tm:"+tm+" inc:"+inc;
        // document.getElementById("vInc").innerHTML=rh+":"+z+rm+"tm:"+tm+" inc:"+inc;
     	//document.getElementById("vInc").innerHTML="Pon las "+rh+":"+z+rm;
         var ah = Math.floor(inc/60);
         //if (ah === 0) {ah = "12";}
         var am = inc%60;
         if (am<10) { am = "0"+am;}
         document.getElementById("vInc").innerHTML=ah+":"+am; //inc;

         
       //  r(min, 6*inc);
        // h=inc%60;
       //  r(hour, 30*(h) + inc/2)
         r(min, 6*inc)
         // r(hour, 30*(d.getHours()%12) + d.getMinutes()/2)
         r(hour, 30*(h) + inc/2)

         /*
     	if(hom===0){

            r(hour, 6*inc);
     	}else{

            r(min, 6*inc);
     	}
         */
         //resultDiv.innerText = value + "%";
         progressBarWidget.value(value);
      };	

   document.addEventListener("pagebeforeshow", function() {
      resultDiv = document.getElementById("result");

      progressBar = document.getElementById("circleprogress");
      progressBarWidget = new tau.widget.CircleProgressBar(progressBar, {size: "large"});
      resultDiv.innerText = progressBarWidget.value() + "%";

      // Add rotarydetent handler to document
      document.addEventListener("rotarydetent", rotaryDetentHandler);
   });

   document.addEventListener("pagehide", function() {
      progressBarWidget.destroy();
      document.removeEventListener("rotarydetent", rotaryDetentHandler);
   });
}());


function checkTime(){
	//tm = (h%12)*60+m;
    if (inc == tm){
    	alert("OK");
    	 randomTime();
    }else{
    	//alert("KO");
    	var dif=tm-inc;
    	document.getElementById("vInc").innerHTML="Error:"+dif+" minutos.";

    	
    }
}

function randomTime(){
	tm = 0 ; // Time in minutes.
    
	 rh = Math.floor((Math.random() * 23));
     rm = Math.floor((Math.random() * 59));
     z = "";
    if (rm<10){ z="0";} // Add a '0' to numbers lower than 10.
    
	tm = (rh%12)*60+rm;

	//document.getElementById("vInc").innerHTML=rh+":"+z+rm+"tm:"+tm+" inc:"+inc;
	document.getElementById("vInc").innerHTML="Pon las "+rh+":"+z+rm;
}

function randomClock(){
	
	inc = Math.floor((Math.random() * 1440));

    r(min, 6*inc)
    // r(hour, 30*(d.getHours()%12) + d.getMinutes()/2)
    r(hour, 30*(h) + inc/2)

    var ah = Math.floor(inc/60);
    //if (ah === 0) {ah = "12";}
    var am = inc%60;
    if (am<10) { am = "0"+am;}
    document.getElementById("vInc").innerHTML=ah+":"+am; //inc;
	
}

function vcont(){
 
 //checkTime();
 randomClock();

}

document.addEventListener("click", vcont);
//randomTime();


