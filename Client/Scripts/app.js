"use strict";
(function () {
    function confirmDelete() {
        $("a.delete").on("click", function (event) {
            if (!confirm("Are you sure?")) {
                event.preventDefault();
                location.href = '/clothing-list';
            }
        });
    }
    function Start() {
        console.log("App Started");
        if (!!window.performance && window.performance.navigation.type == 2) {
            window.location.reload();
        }
        confirmDelete();
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map