document.addEventListener("DOMContentLoaded",load);
var l=[];
//creation des objet contenant la note et le valeur de checkbox(true or false)
function note(x,y){
    this.valeur=x;//note
    this.croix=y;//valeur checkbox
}
function load(){
    // fonction creation des notes 
    function create_input(data){
            var todo=document.createElement("div");
            todo.className="todo";
            var text=document.createElement("input");
            text.className="txt";
            text.type="text";
            var modif=document.createElement("div");
            modif.className="modif";
            var baddel=document.createElement("i");//icone pour modifier
            baddel.className="fas fa-edit";
            var fassakh=document.createElement("i");//icone pour supprimer
            fassakh.className="fas fa-trash-alt";
            var done=document.createElement("input");//checkbox 
            done.type="checkbox";
            done.className="check";
            modif.appendChild(baddel);//ajouter icone modification dans la 1ere div parent
            modif.appendChild(fassakh);//ajouter icone suppression dans la 1ere divparent
            todo.appendChild(done);//ajouter checkbox au div parent
            todo.appendChild(text);//ajouter text au div parent
            todo.appendChild(modif);//ajouter 1er div parent au div parent
            text.value=data.valeur;//text prend note de l'objet
            done.checked=data.croix;//checkbox s'il est coché ou non de l'objet
            if(data.croix){
                text.classList.add("barré");//si valeur true alors le text sera barré
            }
            text.readOnly=true;//le champ du note est accessible seulement en lecture
            document.querySelector(".d").appendChild(todo);//ajout du div parent au div pricipal du todolist
            var modify=true;
            var oldval="";//variable contenant valeur ancienne en cas de changement du contenu d'une note
            //modifier task
            baddel.addEventListener('click',function edit(){
                if(modify){
                    oldval=(this.closest(".todo")).querySelector('input[type="text"]').value;
                    text.readOnly=false;
                    modify=false;
                }
                else {
                    var moninput=(this.closest(".todo")).querySelector('input[type="text"]');
                    if(moninput.value.trim()!=""){
                        function check_value(obj){
                            return obj.valeur===oldval;
                        }
                        var indice_modif=l.findIndex(check_value);
                        text.readOnly=true;
                        modify=true;
                        //modification de valeur dans tableau s'il est modifié dans input
                        l[indice_modif].valeur=moninput.value.trim();
                        //console.log(l);     
                        localStorage.setItem("todolist",JSON.stringify(l));
                    }
                    else{
                        alert("you can't make the note empty you can delete it if you want")
                        }
                }
            });
                //supprimer task
            fassakh.addEventListener('click',function supp(){
                var suppr=confirm("Do you really want to delete this note?");
                if(suppr){
                        //cherche l'input a travers le div parent 
                        var champ=(this.closest(".todo")).querySelector('input[type="text"]');
                        function check_note(objet){
                            return objet.valeur===champ.value;
                        }
                        //cherche l'indice de l'objet contenant le task
                        var indice=l.findIndex(check_note);
                        l.splice(indice,1);//effacer l'element
                        localStorage.setItem("todolist",JSON.stringify(l));//maj localstorage
                        this.closest(".todo").remove();//effacer le div
                }
            });
            //cocher task
            done.addEventListener('change',function check(){
                    text.classList.toggle("barré");//pour barrer le text s'il est non barré ou l'inverse
                    //recherche de valeur cocher pour changer la valeur dans tableau l et maj localstorage
                    var mot=(this.closest(".todo")).querySelector('input[type="text"]').value;
                    for(var objet of l ){
                        if(objet.valeur===mot){
                            objet.croix=this.checked;
                        }
                    }
                    localStorage.setItem("todolist",JSON.stringify(l));
            })
    }
    //pour eviter les doublons
    function eviter_doublons(tab,doublon){
        for(var v of tab){
            if(v.valeur===doublon)
                return true;
        }
        return false;
    }
    // importation from localstorage
    var d=localStorage.getItem("todolist");
    if(d){
        //récuperation du tableau contenant les anciennes taches
        l=JSON.parse(d);
        for(var input of l){
            //ajout des tacches dans todolist
            create_input(input);
        }
    }
    document.querySelector("#zid").addEventListener('click',function plus(){
        var ekteb=(document.querySelector("#ekteb").value).trim();
        if(ekteb){
            //alert en cas de task existant
            if(eviter_doublons(l,ekteb)){
                alert("task already exists");
            }
            else{
            //ajouter un note initialement non coché
                var note1=new note(ekteb,false);
                l.push(note1);
            //enregistrement avec localstorage
                localStorage.setItem("todolist",JSON.stringify(l));
            //creation du note
                create_input(note1);
            //vider input principal aprés l'ajout d'un task
                document.querySelector("#ekteb").value="";
            }
        }
        else{
            //alerte en cas d'ajout d'un task vide
            alert("your task is empty!");
        }
    });
}