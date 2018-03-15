// Callback function
const doAjax = (ev) => {
  const elemId = ev.editableElement.id;
  $.ajax({
    url: "/ajaxphi",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ [elemId] : ev.newValue })})
    .fail(function(err){
      console.log(err);
    })

  const alert = document.querySelector('.alert');
  alert.querySelector('span').innerHTML = `<b>${ev.editableElement.id}</b>: <b>${ev.oldValue}</b> has become <b>${ev.newValue}</b>`;
  alert.classList.toggle('hidden');
  alert.classList.toggle('ajax-done');
  setTimeout(() => {
    alert.classList.toggle('ajax-done');
    alert.classList.toggle('hidden');
  }, 2000);
}


$(function(){

  $('.editable').editable({
    onChange: doAjax
  });

});

//souce: https://www.jqueryscript.net/text/Edit-In-Place-Plugin-jQuery.html
