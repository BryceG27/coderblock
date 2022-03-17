# Project for Coderblock

Realizzare una scena 3D che consenta di visualizzare due modelli (contenuti nella cartella <strong>dist</strong>)

## The bug

Vi è un piccolo ma fastidioso bug per il controllo della <i>scene</i>: <br>
    - Il controllo è in basso a sinistra. Solo da quel punto è possibile fare il pinch-in e il pinch-out oltre che a muovere la scena.

### How to make it work

Dopo la clonazione del progetto, l'unica cosa da installare è il pacchetto di node_modules tramite il comando <i>npm install</i>.

### What did I use

Per questo progetto, le tecnologie utilizzate sono:
<ul>

<li>
    HTML e CSS per la struttura
</li>
<li>
    Il framework <strong>Bootstrap</strong> per rendere l'interfaccia un po' più accattivante
</li>
<li>
    La libreria three.js per l'uso dei modelli e in particolare <br>
        - Il <strong>GTLFLoader</strong> per caricare e renderizzare i modelli <br>
        - Il <strong>CSS3DRenderer</strong> per trasformare un elemento HTML in un modello 3D <br>
</li>
<li>
    npm per scaricare le librerie necessarie e la configurazione di webpack per l'uso delle librerie
</li>

</ul>