var count=0;

var countValue=document.getElementById("count").innerHTML

function increment(){
    count=count+1;
    document.getElementById("count").innerHTML=count;
}



function reset(){
    count=count-count;
    document.getElementById("count").innerHTML=count;
}

//document.getElementById("count").innerHTML=count;


function decrement(){
    if(count>0){
        count=count-1
        document.getElementById("count").innerHTML=count;
    }
}
