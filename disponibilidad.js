var sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQaK8eKnkhhQ8Culv1_Z8VlQPDUFd2hvfpLnoBBA_3izrjXZ2TjvbB7WT1DJXaazr7q6KU3ghXi6mlv/pub?output=csv';
var xhr = new XMLHttpRequest();
xhr.open('GET', sheetUrl, true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var filas = xhr.responseText.split('\r').join('').split('\n');
        for (var i = 1; i < filas.length; i++) {
            var fila = filas[i].trim();
            if (fila !== '') {
                var columnas = fila.split(',');
                if (columnas.length >= 3) {
                    var id = columnas[0].replace(/['"]+/g, '').trim();
                    var status = columnas[2].replace(/['"]+/g, '').trim().toLowerCase();
                    var hs = eTour.getComponent('lote_' + id);
                    if (hs) {
                        hs.set('visible', true);
                        if (status === 'vendido') {
                            hs.set('color', 16711680);
                            hs.set('alpha', 0.6);
                        } else if (status === 'disponible') {
                            hs.set('color', 65280);
                            hs.set('alpha', 0.4);
                        }
                    }
                }
            }
        }
    }
};
xhr.send();