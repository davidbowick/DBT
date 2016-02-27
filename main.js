/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window, Mustache */

define(function (require, exports, module) {
    "use strict";

    //Load Modules
    var LanguageManager = brackets.getModule("language/LanguageManager");
    
    CodeMirror.defineMode("dbt", function(config, parserConfig) {
        var mustacheOverlay = {
          token: function(stream, state) {
            var ch;
            if (stream.match("{")) {
              while ((ch = stream.next()) != null)
                if (stream.next() == "}") break;
              return "def";
            }
            if (stream.match("[")) {
              while ((ch = stream.next()) != null)
                if (stream.next() == "]") break;
              return "tag bracket";
            }
            while (stream.next() != null && !stream.match("{", false) && !stream.match("[", false)) {}
            return null;
          }
        };
        return CodeMirror.overlayMode(CodeMirror.getMode(config, parserConfig.backdrop || "text/html"), mustacheOverlay);
    });

    //Define the Language
    LanguageManager.defineLanguage("dbt", {
        name: "DBT",
        mode: "dbt",
        fileExtensions: ["dbt"]
    });
});