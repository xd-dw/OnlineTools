const $ = require('jquery');

module.exports = {
    onInput: function (input) {
        this.state = {
            ar2: ""
        };
    },

    onMount: function () {
        this.fetchPromise = Promise.resolve();
    },

    handleBeautifyJsonClick() {
        this.callJsonService();
    },

    callJsonService() {
        const state = this.state;

        const str = this.getEl("ar1").value;

        $.ajax({
            method: 'POST', // added,
            url: '/json/beautify/',
            contentType: 'application/json',
            data: str,
            success: function (data) {
                // var ret = jQuery.parseJSON(data);
                // $('#lblResponse').html(ret.msg);
                state.ar2 = data;
            },
            error: function (xhr, status, error) {
                console.log("Beautify json failed:", e);
                $('#lblResponse').html('Error connecting to the server.');
            }
        });
    }

}
