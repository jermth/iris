(function() {
    var uriPrefix = Iris.dataURI();
    var widget = Iris.Widget.create({
        name: "Data"
    });

    widget.render = function(divId, args) {
        var div = document.getElementById(divId);
        div.innerHTML = '';
        var path = args.hasOwnProperty('path') ? args['path'] : '/species/at/chromosomes';
        if (args.hasOwnProperty('API')) {
            uriPrefix = args['API'];
        } else {
            uriPrefix = '';
        }

        $.getJSON('/service/list', function(services) {
            //		div.appendChild(document.createElement('pre')).innerHTML = syntaxHighlight(JSON.stringify(services, undefined, 4));
            var sel = document.createElement('select');
            var seen = {};
            for (var i in services) {
                var srv = services[i];
                if (seen[srv.name]) {
                    continue;
                }
                var opt = document.createElement('option');
                opt.value = srv.uri;
                opt.text = srv.name;
                if (opt.value === uriPrefix) {
                    opt.selected = true;
                }
                sel.add(opt, null);
                seen[srv.name] = 1;
            }
            var opt = document.createElement('option');
            opt.text = "custom";
            opt.value = "";
            sel.add(opt, null);

            div.appendChild(sel);
            var input = document.createElement('input');
            input.value = path;
            div.appendChild(input);
            var button = document.createElement('input');
            button.setAttribute("type", "button");
            button.setAttribute('value', 'load');
            button.onclick = function() {
                widget.render(divId, {
                    API: sel.value,
                    path: input.value
                })
            };
            div.appendChild(button);
            getJSON(path, function(obj) {
                var str = JSON.stringify(obj, undefined, 4);
                div.appendChild(document.createElement('pre')).innerHTML = syntaxHighlight(str);
            });
        });
    }

    function syntaxHighlight(json) {
        json = json
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return json
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    function getJSON(path, callback) {
        $.getJSON(uriPrefix + path, callback);
    }

})();
