const zmhTime = document.getElementById("zmh-clock");

function zmhCTZF(e, m) { return new Date(("string" == typeof e ? new Date(e) : e).toLocaleString("en-US", { timeZone: m })) }

function zmhTZ() { return zmhCTZF(new Date, zmhTime.title) }

function zmhAZ(e) { return e < 10 && (e = "0" + e), e }

function zmhF() { let e = zmhTZ(),
        m = e.getHours(),
        t = e.getMinutes(),
        n = e.getSeconds();
    zmhTime.innerText = 12 == m ? zmhAZ(m) + ":" + zmhAZ(t) + ":" + zmhAZ(n) + " PM" : m > 12 ? zmhAZ(m) - 12 + ":" + zmhAZ(t) + ":" + zmhAZ(n) + " PM" : 0 == m ? zmhAZ(12) + ":" + zmhAZ(t) + ":" + zmhAZ(n) + " AM" : zmhAZ(m) + ":" + zmhAZ(t) + ":" + zmhAZ(n) + " AM", setTimeout(zmhF, 1e3) }
zmhF();