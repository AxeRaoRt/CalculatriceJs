class BaseCalculator {
    constructor() {
     // Do some stuff
        this.operation = false;
        this.maListe = [];
     }

    addToString(elem){
        document.getElementById("sc").innerHTML += elem;
    }

    resultat(){
        try{
            var str = document.getElementById("sc").innerHTML;
            this.maListe.push(str);
            str = eval(str);
            document.getElementById("sc").innerHTML = str;
            this.operation = true;
        }catch(SyntaxError){
            document.getElementById("sc").innerHTML = "Error";
            this.operation = true;
        }
    }

    del(){
        if (this.operation == true){
            document.getElementById("sc").innerHTML = "";
            this.operation = false;
        }
        else{
            var str = document.getElementById("sc").innerHTML;
            str = str.substring(0, str.length-1); // on enleve la derniere valeur rentrée dans la string
            document.getElementById("sc").innerHTML = str;
        }
    }

    retour(){
        
        let elemRetire = this.maListe.pop();
        if (elemRetire == "" || elemRetire === undefined){
            document.getElementById("sc").innerHTML = "";
        }
        else{
            document.getElementById("sc").innerHTML = elemRetire;
        }
    }
}

let baseCalculator = new BaseCalculator();
    
