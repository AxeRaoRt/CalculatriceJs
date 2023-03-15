//console.log("Z");

var operation = false;

function addToString(elem){
    document.getElementById("sc").innerHTML += elem;
}

function resultat(){
    try{
        var str = document.getElementById("sc").innerHTML;
        str = eval(str);
        document.getElementById("sc").innerHTML = str;
        operation = true;
    }catch(SyntaxError){
        document.getElementById("sc").innerHTML = "Error";
        operation = true;
    }
}

function del(){
    if (operation == true){
        document.getElementById("sc").innerHTML = "";
        operation = false;
    }
    else{
        var str = document.getElementById("sc").innerHTML;
        str = str.substring(0, str.length-1); // on enleve la derniere valeur rentrée dans la string
        document.getElementById("sc").innerHTML = str;
    }
}