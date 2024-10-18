//pytanie pierwsze
var fsa = 0;
var dfsd = prompt("Jak nazywał się najwazniejszy bog grecki?");
var sasa = prompt("Jak nazywał sie przywodca grecki ktory walczyl w bitwie pod Termopilami");
var fds = parseInt(prompt("W którym roku p.n.e odbyła się bitwa pod Termopilami?"));

//instrukcja sprawdzajaca odpowiedz
switch(dfsd) {
    //poprawne odpowiedzi
    case "zeus":
    case "Zeus":
    case "ZEUS":
        fsa++;
        alert("poprawna odpowiedz, masz: "+fsa +" punktów");
    break;

    default:
        ("zła odpowiedź, masz: "+fsa+" punktów");
}

//pytanie drugie
switch(sasa) {
        case "Leonidas":
        case "leonidas":
        case "Leonidas":
        case "Leonidas I":
            fsa++;
            document.write("poprawna odpowiedź, masz: "+fsa+" punktów");
        break;
        default:
            document.write("zła odpowiedź, masz: "+fsa+ " punktów");
    }


if(fds == 480) {
    fsa++;
        document.write("poprawna odpowiedz, masz: "+fsa +" punktów");
}

else {
    document.write("zła odpowiedź, masz: "+fsa+ " punktów");
}



