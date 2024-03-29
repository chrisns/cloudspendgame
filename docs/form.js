var editor = new JSONEditor(document.getElementById('editor_holder'), {
  // ajax: true,
  theme: 'bootstrap4',
  disable_edit_json: true,
  disable_collapse: true,
  disable_properties: true,
  ajax: true,
  schema: {
    "$ref": "./schema.json"
  }
})


editor.on('change', function () {
  // Get an array of errors from the validator
  var errors = editor.validate()

  // var indicator = document.getElementById('submit')

  // if (errors.length)
  //   indicator.style.color = 'red'
  // else
  //   indicator.style.color = 'green'

})

$("button").click(() => {
  $("button").attr("disabled", true)
  $("button .spinner-border").css("display", "inline-block")
  $("div[data-schemapath='root.player']").slideDown()
  $.post({
    url: "https://blackfriday.cns.me",
    data: JSON.stringify(editor.getValue()),
    dataType: "json",
    contentType: "application/json",
  })
    .catch((error) => {
      alert(
        "Unable to fit minimum number of pods specified on the minimum number of nodes specified"
      );
    })
    .then((response) => {
      $("button").attr("disabled", false);
      $("div.score").show();
      $("button .spinner-border").hide();
      d3GUI(response);
    });
})

$("#front").click(() => {
  $("#front").hide()
  $("#intro").show()
})

$("#intro").click(() => {
  $("#intro").hide()
  $("#controls").show()
})
