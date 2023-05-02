class BaseCalculator {
    constructor() {
     // Do some stuff
        this.operation = false;   // utilisé pour effacer les opérations
        this.maListe = [];
        this.compteur = 0;  // permet de compter les si on est au premier appuie sur le bouton 
        this.start = 0; 
        this.end = 0;
        this.time;
     }

    addToString(elem){
        document.getElementById("sc").innerHTML += elem;
        if (this.compteur === 0){
            this.start = Date.now();
        }
        this.compteur += 1;
    }

    resultat(){
        try{
            var str = document.getElementById("sc").innerHTML;
            this.maListe.push(str);
            str = eval(str);
            document.getElementById("sc").innerHTML = str;

            this.end = Date.now();
            this.compteur = 0;   // on remet à 0 une fois appuyer sur "="
            
            this.SendDataSuccess();  // on envoie le temps de succès au server

            this.operation = true;
        }catch(SyntaxError){
            document.getElementById("sc").innerHTML = "Error";

            this.SendDataError(); // on envoie le temps d'erreur au server

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

    TimeTaken(){
        console.log(this.end - this.start);
        this.time = this.end - this.start;   // on calcule le temps entre 2 instants
        return this.time;
    }

    SendDataError(){
        let dataraw = {
            "timeTakenMs": baseCalculator.TimeTaken()
            };

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/error", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(dataraw));

        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const data = xhr.response;
                console.log(data);
            } else {
                console.log(`Error: ${xhr.status}`);
            }
        };
    }

    SendDataSuccess(){
        
        let dataraw = {
            "timeTakenMs": baseCalculator.TimeTaken()
            };

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/sucess", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(dataraw));

        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const data = xhr.response;
                console.log(data);
            } else {
                console.log(`Error: ${xhr.status}`);
            }
        };
    }
}

let baseCalculator = new BaseCalculator();


    