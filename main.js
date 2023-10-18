//Les tableaux 

let chansons = [];
let playlist = [];


// 1) ---------------------- Les fonctiions de la Liste de chansons ----------------------

//La fonction qui ajoute une chanson dans la Liste de chansons
//La référence sur cette fonction du code HTML

function ajouterChansonDansListe() {
   
    const chanson = créerNouvelleChanson();

    if(chanson !== null) {
        chansons.push(chanson);

        // créer une ligne (un élément pour la chanson) dans la liste de chansons
        const ligneChanson = document.createElement('div');
        ligneChanson.classList.add('ligne-info-chanson');

        // créer toutes les cellules d'une ligne (un élément pour la chanson) dans la liste de chansons
        const celluleTitre = document.createElement('div');
        celluleTitre.classList.add('cellule-chanson');
        celluleTitre.classList.add('one');

        const celluleArtiste = document.createElement('div');
        celluleArtiste.classList.add('cellule-chanson');
        celluleArtiste.classList.add('two');

        const celluleDurée = document.createElement('div');
        celluleDurée.classList.add('cellule-chanson');
        celluleDurée.classList.add('three');

        const celluleCheckbox = document.createElement('div');
        celluleCheckbox.classList.add('cellule-chanson');
        celluleCheckbox.classList.add('three');

        const celluleBouton = document.createElement('div');
        celluleBouton.classList.add('cellule-chanson');
        celluleBouton.classList.add('four');

        //ajouter un nom, un artiste and une durée dans une ligne de la chanson dans la liste de chansons  
        celluleTitre.textContent = chanson.titre;
        celluleArtiste.textContent = chanson.artiste;
        celluleDurée.textContent = chanson.durée;
        
        //créer un checkbox dans une ligne de la chanson dans la liste de chansons
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.onchange = event => ajouterChansonDansPlaylist(event, chanson);

        //créer un bouton Supprimer dans une ligne de la chanson dans la liste de chansons
        const bouton = document.createElement('button');
        bouton.textContent = 'x';
        bouton.onclick = event => supprimerChansonDansPlaylist(event, chanson);

        //ajouter un checkbox dans une cellule d'une ligne de la chanson dans la liste de chansons
        celluleCheckbox.appendChild(checkBox);

        //ajouter un bouton Supprimer dans une cellule d'une ligne de la chanson dans la liste de chansons
        celluleBouton.appendChild(bouton);

        //ajouter toutes les cellules dans une ligne de la chanson dans la liste de chansons
        ligneChanson.appendChild(celluleTitre);
        ligneChanson.appendChild(celluleArtiste);
        ligneChanson.appendChild(celluleDurée);
        ligneChanson.appendChild(celluleCheckbox);
        ligneChanson.appendChild(celluleBouton);
        
        // ajouter une ligne de la chanson dans la liste de chansons
        const listeDeChansons = document.querySelector('#liste-chansons');
        listeDeChansons.appendChild(ligneChanson);
    }
}

//La fonction (le gestionnaire d'événements) suppression d'une chanson de la Liste de lecture (Playlist) et de Liste de chansons
function supprimerChansonDansPlaylist(event, chanson) {
    const targitElementBouton = event.target;

    // ID à une ligne ajouter (div)
    const idChansonPlaylist = chanson.artiste + '-' + chanson.titre;
    const ligneTitreChansonPlaylist = document.getElementById(idChansonPlaylist);

    if(ligneTitreChansonPlaylist !== null) {
        ligneTitreChansonPlaylist.remove();
        removeElementDeTableaux(chanson, playlist);
        MontrerInformationsPlaylist(playlist);  
    }

    targitElementBouton.parentElement.parentElement.remove();
    removeElementDeTableaux(chanson, chansons);
}


// 2) ---------------------- Les fonctiions de la Liste de lecture ----------------------

//La fonction (le gestionnaire d'événements) de la Liste de lecture (Playlist)

function ajouterChansonDansPlaylist(event, chanson) {

    // créer une ligne (un élément pour la chanson) dans la liste de chansons
    let ligneTitreChanson = document.createElement('div');
    ligneTitreChanson.classList.add('titre-chanson-playlist');
    ligneTitreChanson.textContent = chanson.titre;

    // assign  ID à une ligne ajouter (div)
    ligneTitreChanson.id = chanson.artiste + '-' + chanson.titre;

    const targitElementCheckBox = event.target;
    const listeDeChansons = document.querySelector('#playlist');
    
    if(event.target.checked) {
        listeDeChansons.appendChild(ligneTitreChanson);    
        targitElementCheckBox.parentElement.parentElement.classList.toggle('sélectionné');
        playlist.push(chanson);
    } 
    else {
        ligneTitreChanson = document.getElementById(ligneTitreChanson.id);
        ligneTitreChanson.remove();
        targitElementCheckBox.parentElement.parentElement.classList.toggle('sélectionné'); 
        removeElementDeTableaux(chanson, playlist);
    } 
    MontrerInformationsPlaylist(playlist);        
}

//Helpers pour les fonctions de la Liste de chansons et de la Liste de lecture 

//Supprimer l'élément de tableau d'un tableau
function removeElementDeTableaux(obj, tableau) {
    tableau.splice(positionElementDansTableau(obj, tableau), 1); 
}

//La recheche un indice de tableau par titre et artiste dans le tableau 
function positionElementDansTableau(obj, tableau) {
    return tableau.findIndex(element => element.titre === obj.titre && element.artiste === obj.artiste);
}



// 3) ---------------------- Les fonctions du formulaire d’ajout d'une chanson ----------------------

//La fonction du formulaire d’ajout de chanson
function créerNouvelleChanson() {

    const formulaire = document.querySelector('form');
    
    const champTitre = formulaire.elements['titre-chanson'];
    const champArtist = formulaire.elements['artiste-chanson'];
    const champDurée = formulaire.elements['durée-chanson'];
   
    const chanson = {
        titre: champTitre.value,
        artiste: champArtist.value,
        durée: champDurée.value
    };

    if (chansonExiste(chanson, chansons)) {
        alert('Attention: une chanson du même nom et du même artiste existe!');
        return null;
    } 

    //clear les inputs champs
    champTitre.value = null;
    champArtist.value = null;
    champDurée.value = 0;

    return chanson;
}


//La fonction-Validateur
//Helper pour la fonction du formulaire d’ajout de chanson

function chansonExiste(chanson, tableau) {
    const contains = tableau.some(element => element.titre === chanson.titre && element.artiste === chanson.artiste);
    return contains;
}


// 4) ---------------------- Les fonctions des Informations de la liste de lecture ----------------------

//La fonction de la réfléction de toutes les Informations de la liste de lecture

function MontrerInformationsPlaylist() {

    const duréeChansonsPlaylist = document.getElementById('durée-chansons-playlist');
    const plusLongueChanson = document.getElementById('plus-longue-chanson');
    const plusCourteChanson = document.getElementById('plus-courte-chanson');

    duréeChansonsPlaylist.textContent = 'Durée : ' + duréeFormator(duréeChansonsSecondesPlaylist(playlist));
    plusLongueChanson.textContent = 'Plus longue chanson : ' + titrePlusLongueChanson(playlist);
    plusCourteChanson.textContent = 'Plus courte chanson : ' + titrePlusCourteChanson(playlist);
}

// Titre de la plus longue chanson
function titrePlusLongueChanson(tableau) {
    let max = Math.max(...tableau.map(element => element.durée));
    let chansonDuréeMax = tableau.find(element => parseInt(element.durée) === max);

    return max !== Infinity && tableau.length > 0 ? chansonDuréeMax.titre : '';
}

// Titre de la plus courte chanson
function titrePlusCourteChanson(tableau) {
    const min = Math.min(...tableau.map(element => element.durée));
    const chansonDuréeMin = tableau.find(element => parseInt(element.durée) === min);
    return min !== Infinity && tableau.length > 0 ? chansonDuréeMin.titre : '';
}

// La durée sommaire de toutes les chansons
function duréeChansonsSecondesPlaylist(tableau) {
    const sum = tableau.reduce((accumulator, element) => {
        return accumulator + parseInt(element.durée);
    }, 0);
    return tableau.length > 0 ? sum : 0;
}

 // Le formateur du temps
function duréeFormator(secondes) {

    // la logique d'affaire: obtenir la quantité de secondes, de minutes et de heures 
    const heures = Math.trunc(secondes / 3600);
    const minutes = Math.trunc((secondes % 3600) / 60);
    secondes = (secondes % 3600) % 60;

    // La logique de singulier ou de pluriel.  texte de seconde(S), de minute(S) et de heure(S)
    let texteHeures;
    let texteMinutes;
    let texteSeconds;

    if (heures === 1) {
        texteHeures = 'heure';
    }
    else {
        texteHeures = 'heures';
    }

    if (minutes === 1) {
        texteMinutes = 'minute';
    }
    else {
        texteMinutes = 'minutes';
    }

    if (secondes === 1) {
        texteSeconds = 'seconde';
    }
    else {
        texteSeconds = 'secondes';
    }

    // La logique de formation de sorti
    if(heures !== 0 && minutes !== 0 & secondes !== 0) {
        return heures + ' ' + texteHeures + ' ' + minutes + ' ' + texteMinutes + ' ' + secondes + ' ' + texteSeconds;
    } 
    else if (heures === 0 && minutes !== 0 & secondes !== 0) {
        return minutes + ' ' + texteMinutes + ' ' + secondes + ' ' + texteSeconds;
    } 
    else if (heures === 0 && minutes === 0 & secondes !== 0) {
        return secondes + ' ' + texteSeconds;
    }
    else if (heures !== 0 && minutes === 0 & secondes !== 0) {
        return heures + ' ' + texteHeures + ' ' + secondes + ' ' + texteSeconds;
    }
    else if (heures !== 0 && minutes !== 0 & secondes === 0) {
        return heures + ' ' + texteHeures + ' ' + minutes + ' ' + texteMinutes;
    }
    else if (heures === 0 && minutes !== 0 & secondes === 0) {
        return minutes + ' ' + texteMinutes;
    }
    else if(heures !== 0 && minutes === 0 & secondes === 0) {
        return heures + ' ' + texteHeures;
    } 
    else {
        return '';
    } 
}
