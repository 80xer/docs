function log() {
    var args = arguments,
        p,
        str,
        cnt = 0;

    for (var i = 0; i < arguments.length; i++) {
        str = arguments[i]
        if (str !== undefined && str.toString() === '[object Object]' && typeof str === 'object') {
            for (var prop in str) {
                if (str.hasOwnProperty(prop)) {
                    cnt++;
                    log(prop + " : " + str[prop]);
                }
                if (cnt === 0) {
                    p = document.createElement("P");
                    p.textContent = log.idx++ + " : " + str;
                    document.querySelectorAll('#output')[0].appendChild(p);
                }
            }
        } else {
            p = document.createElement("P");
            p.textContent = log.idx++ + " : " + str;
            document.querySelectorAll('#output')[0].appendChild(p);
        }
    }

    return log;
    
}

log.idx = 1;

log.init = function() {
    log.idx = 1;
    p = document.createElement("HR");
    document.querySelectorAll('#output')[0].appendChild(p);
    return log;
}